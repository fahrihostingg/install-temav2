#!/bin/bash
# ============================================================
#   PREMIUM THEME INSTALLER - Pterodactyl 1.x
#   Support: Ubuntu / Debian / CentOS / RHEL / Rocky / Alma
#   Author : YourName
#   Repo   : https://github.com/USER/theme-repo
# ============================================================

set -e

THEME_NAME="Premium Dark"
THEME_VERSION="1.0.0"
GITHUB_USER="USERNAME_KAU"
GITHUB_REPO="theme-repo"
GITHUB_BRANCH="main"
PASSWORD_HASH="CHANGE_ME_HASH"
PANEL_PATH="/var/www/pterodactyl"

R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'
C='\033[0;36m'; M='\033[0;35m'; W='\033[1;37m'; N='\033[0m'

ok()   { echo -e "${G}  ✓${N} $1"; }
info() { echo -e "${C}  ➜${N} $1"; }
warn() { echo -e "${Y}  ⚠${N} $1"; }
fail() { echo -e "${R}  ✗${N} $1"; exit 1; }
line() { echo -e "${M}  ──────────────────────────────────────────${N}"; }

banner() {
clear
echo -e "${M}"
cat << "EOF"
   ██████╗ ██████╗ ███████╗███╗   ███╗██╗██╗   ██╗███╗   ███╗
   ██╔══██╗██╔══██╗██╔════╝████╗ ████║██║██║   ██║████╗ ████║
   ██████╔╝██████╔╝█████╗  ██╔████╔██║██║██║   ██║██╔████╔██║
   ██╔═══╝ ██╔══██╗██╔══╝  ██║╚██╔╝██║██║██║   ██║██║╚██╔╝██║
   ██║     ██║  ██║███████╗██║ ╚═╝ ██║██║╚██████╔╝██║ ╚═╝ ██║
   ╚═╝     ╚═╝  ╚═╝╚══════╝╚═╝     ╚═╝╚═╝ ╚═════╝ ╚═╝     ╚═╝
EOF
echo -e "${N}"
echo -e "        ${W}${THEME_NAME}${N} ${Y}v${THEME_VERSION}${N}"
echo -e "        ${C}Premium Theme Installer${N}"
echo -e "        ${C}for Pterodactyl Panel${N}\n"
}

[[ $EUID -ne 0 ]] && fail "Run sebagai root: sudo bash install.sh"

detect_os() {
  if [[ -f /etc/os-release ]]; then
    . /etc/os-release
    OS=$ID
    OS_VER=$VERSION_ID
  else
    fail "Tak dapat detect OS."
  fi

  case "$OS" in
    ubuntu|debian) PKG="apt" ;;
    centos|rhel|rocky|almalinux|fedora) PKG="yum" ;;
    *) warn "OS $OS tak tested. Cubaan tetap diteruskan..." ; PKG="apt" ;;
  esac
}

banner
line
info "Tema premium — perlu password."
echo -ne "${C}  Password: ${N}"
read -rs INPUT
echo

INPUT_HASH=$(echo -n "$INPUT" | sha256sum | cut -d' ' -f1)
[[ "$INPUT_HASH" != "$PASSWORD_HASH" ]] && fail "Password salah."
ok "Password sah"

detect_os
line
info "Menyemak Pterodactyl panel..."

if [[ ! -d "$PANEL_PATH" ]]; then
  for p in /var/www/pterodactyl /srv/pterodactyl /home/pterodactyl /opt/pterodactyl; do
    [[ -f "$p/artisan" ]] && PANEL_PATH="$p" && break
  done
fi

[[ ! -d "$PANEL_PATH" ]] && fail "Panel Pterodactyl tak jumpa."
[[ ! -f "$PANEL_PATH/artisan" ]] && fail "Bukan Pterodactyl panel (artisan tak jumpa)."
[[ ! -f "$PANEL_PATH/composer.json" ]] && fail "composer.json tak jumpa — panel corrupt?"

PT_VERSION=$(cd "$PANEL_PATH" && php artisan --version 2>/dev/null | grep -oP 'Laravel Framework \K[0-9.]+' || echo "unknown")
ok "Panel dijumpai: $PANEL_PATH"
ok "Laravel: $PT_VERSION"

WEB_USER="www-data"
for u in www-data nginx apache httpd; do
  id "$u" &>/dev/null && WEB_USER="$u" && break
done
ok "Web user: $WEB_USER"

line
info "Menyemak dependencies..."

MISSING=()
for c in curl unzip tar; do
  command -v $c &>/dev/null || MISSING+=($c)
done

if [[ ${#MISSING[@]} -gt 0 ]]; then
  warn "Install: ${MISSING[*]}"
  if [[ "$PKG" == "apt" ]]; then
    apt-get update -qq
    apt-get install -y -qq "${MISSING[@]}"
  else
    yum install -y -q "${MISSING[@]}"
  fi
fi
ok "Dependencies OK"

command -v php &>/dev/null || fail "PHP tak install."
ok "PHP: $(php -v | head -n1 | cut -d' ' -f2)"

line
BACKUP="/root/theme_backup_$(date +%Y%m%d_%H%M%S)"
info "Backup → $BACKUP"
mkdir -p "$BACKUP"

[[ -d "$PANEL_PATH/resources/views" ]] && cp -r "$PANEL_PATH/resources/views" "$BACKUP/views" 2>/dev/null || true

mkdir -p "$BACKUP/public"
if [[ -d "$PANEL_PATH/public" ]]; then
  for item in "$PANEL_PATH/public"/*; do
    base=$(basename "$item")
    [[ "$base" == "assets" ]] && continue
    cp -r "$item" "$BACKUP/public/" 2>/dev/null || true
  done
fi

ok "Backup selesai"

line
TMP="/tmp/theme_$$"
mkdir -p "$TMP"
URL="https://github.com/${GITHUB_USER}/${GITHUB_REPO}/archive/refs/heads/${GITHUB_BRANCH}.zip"

info "Download tema dari GitHub..."
info "$URL"
curl -fsSL -o "$TMP/t.zip" "$URL" || fail "Download gagal. Check repo/branch."
ok "Download selesai ($(du -h "$TMP/t.zip" | cut -f1))"

info "Extract..."
unzip -q "$TMP/t.zip" -d "$TMP/x" || fail "Extract gagal."
SRC=$(find "$TMP/x" -mindepth 1 -maxdepth 1 -type d | head -n1)
[[ -z "$SRC" ]] && fail "Struktur zip tak sah."
[[ ! -d "$SRC/theme" ]] && fail "Folder 'theme/' tak jumpa dalam repo."
ok "Extract selesai"

line
info "Install theme files..."

info "  → Copy CSS/JS assets..."
mkdir -p "$PANEL_PATH/public/themes/premium/css"
mkdir -p "$PANEL_PATH/public/themes/premium/js"
cp -rf "$SRC/theme/public/themes/premium/." "$PANEL_PATH/public/themes/premium/"
ok "  Assets installed"

info "  → Copy views..."
if [[ -d "$SRC/theme/resources/views" ]]; then
  if [[ -f "$PANEL_PATH/resources/views/templates/wrapper.blade.php" ]]; then
    cp "$PANEL_PATH/resources/views/templates/wrapper.blade.php" \
       "$BACKUP/wrapper.blade.php.original"
  fi
  cp -rf "$SRC/theme/resources/views/." "$PANEL_PATH/resources/views/"
  ok "  Views installed"
fi

line
info "Menyemak injection CSS..."

WRAPPER="$PANEL_PATH/resources/views/templates/wrapper.blade.php"
if [[ -f "$WRAPPER" ]]; then
  if ! grep -q "themes/premium/css" "$WRAPPER"; then
    info "  → Inject CSS link ke wrapper..."
    sed -i 's|</head>|<link rel="stylesheet" href="/themes/premium/css/premium.css?v=1.0.0">\n</head>|' "$WRAPPER" 2>/dev/null || \
      warn "  Gagal inject, user perlu manual tambah link"
    ok "  CSS injected"
  else
    ok "  CSS sudah ada"
  fi

  if ! grep -q "themes/premium/js" "$WRAPPER"; then
    info "  → Inject JS script ke wrapper..."
    sed -i 's|</body>|<script src="/themes/premium/js/premium.js?v=1.0.0" defer></script>\n</body>|' "$WRAPPER" 2>/dev/null || \
      warn "  Gagal inject JS"
    ok "  JS injected"
  else
    ok "  JS sudah ada"
  fi
fi

line
info "Fix permissions..."
chown -R "$WEB_USER:$WEB_USER" "$PANEL_PATH" 2>/dev/null || warn "chown warning (boleh ignore)"
chmod -R 755 "$PANEL_PATH/storage" "$PANEL_PATH/bootstrap/cache" 2>/dev/null || true
chmod -R 755 "$PANEL_PATH/public/themes" 2>/dev/null || true
ok "Permissions OK"

line
info "Clear cache panel..."
cd "$PANEL_PATH"

php artisan view:clear   >/dev/null 2>&1 || true
php artisan cache:clear  >/dev/null 2>&1 || true
php artisan config:clear >/dev/null 2>&1 || true
php artisan route:clear  >/dev/null 2>&1 || true

php artisan config:cache >/dev/null 2>&1 || true
php artisan route:cache  >/dev/null 2>&1 || true
php artisan view:cache   >/dev/null 2>&1 || true

ok "Cache cleared & rebuilt"

echo
line
echo -e "${G}"
cat << "EOF"
      ╔══════════════════════════════════════╗
      ║      ✓  INSTALLATION SUCCESS  ✓      ║
      ╚══════════════════════════════════════╝
EOF
echo -e "${N}"
line
echo -e "  ${W}Tema${N}    : ${C}${THEME_NAME}${N}"
echo -e "  ${W}Versi${N}   : ${C}${THEME_VERSION}${N}"
echo -e "  ${W}Panel${N}   : ${C}${PANEL_PATH}${N}"
echo -e "  ${W}Backup${N}  : ${Y}${BACKUP}${N}"
echo -e "  ${W}Web User${N}: ${C}${WEB_USER}${N}"
line
echo
echo -e "${G}  Langkah seterusnya:${N}"
echo -e "  ${W}1.${N} Refresh panel kau (CTRL+SHIFT+R)"
echo -e "  ${W}2.${N} Kalau tak nampak perubahan, restart:"
echo -e "     ${C}systemctl restart pterodactyl* nginx${N}"
echo -e "  ${W}3.${N} Uninstall:"
echo -e "     ${C}bash <(curl -fsSL https://raw.githubusercontent.com/${GITHUB_USER}/${GITHUB_REPO}/main/uninstall.sh)${N}"
echo
echo -e "${G}  🔥 Selamat guna tema premium!${N}\n"

rm -rf "$TMP" 2>/dev/null || true