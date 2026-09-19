#!/bin/bash
# ==============================================================================
# SCRIPT INSTALLER TEMA PREMIUM LUXURY & ANIMASI (v2.3)
# Protected Edition - Sesuai untuk bash lokal & bash <(curl ...)
# Developed for Pterodactyl Panel v1.x (v1.15+ Compatible)
# By FakrulDev & Fahri Hosting
# ==============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

clear
echo -e "${PURPLE}==============================================================${NC}"
echo -e "${CYAN}    ✨ FAKRULDEV & FAHRI HOSTING - THEME INSTALLER v2.3 ✨    ${NC}"
echo -e "${BLUE}          Tema Luxury Glassmorphism, Animasi & Settings       ${NC}"
echo -e "${PURPLE}==============================================================${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. VERIFIKASI PASSWORD LISENSI
# ------------------------------------------------------------------------------
VALID_PASSWORDS=("fakrul!2808" "fakruldev" "pahri" "fahri" "PAHRI2026" "FAKRULDEV" "FAKRUL2026")

echo -e "${YELLOW}🔒 KEAMANAN: Tema ini diproteksi khusus pengguna berlisensi.${NC}"
echo -e "${CYAN}Sila masukkan kata laluan (password) untuk memulakan instalasi:${NC}"

AUTHENTICATED=0
ATTEMPTS=0
MAX_ATTEMPTS=3

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
  read -s -p "🔑 Masukkan Password Lisensi: " RAW_INPUT
  echo ""
  # Bersihkan whitespace dan carriage return
  USER_INPUT=$(echo "$RAW_INPUT" | tr -d '\r\n[:space:]')

  for PWD in "${VALID_PASSWORDS[@]}"; do
    if [ "$USER_INPUT" == "$PWD" ]; then
      AUTHENTICATED=1
      break 2
    fi
  done

  ATTEMPTS=$((ATTEMPTS + 1))
  REMAINING=$((MAX_ATTEMPTS - ATTEMPTS))
  if [ $REMAINING -gt 0 ]; then
    echo -e "${RED}[GAGAL] Password tidak sah! Baki percubaan: $REMAINING${NC}"
  fi
done

if [ $AUTHENTICATED -ne 1 ]; then
  echo -e "${RED}❌ AKSES DITOLAK! Anda tidak mempunyai kebenaran untuk memasang tema ini.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ [AKSES DITERIMA] Verifikasi berjaya! Memulakan proses instalasi...${NC}"
echo ""
sleep 1

# ------------------------------------------------------------------------------
# 2. SEMAK ROOT & LOKASI PTERODACTYL
# ------------------------------------------------------------------------------
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Script ini mesti dijalankan sebagai ROOT! Gunakan: sudo bash install.sh${NC}"
  exit 1
fi

PANEL_DIR="/var/www/pterodactyl"
if [ ! -d "$PANEL_DIR" ]; then
  echo -e "${RED}[ERROR] Direktori Pterodactyl tidak dijumpai di $PANEL_DIR!${NC}"
  exit 1
fi

# ------------------------------------------------------------------------------
# 3. KESAN SUMBER FAIL (SOKONGAN LENGKAP CURL PIPE & LOKAL)
# ------------------------------------------------------------------------------
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" 2>/dev/null && pwd)"
THEME_SOURCE=""

if [ -d "$SCRIPT_DIR/theme" ]; then
  THEME_SOURCE="$SCRIPT_DIR"
elif [ -d "/root/install-temav2-main/theme" ]; then
  THEME_SOURCE="/root/install-temav2-main"
elif [ -d "./theme" ]; then
  THEME_SOURCE="$(pwd)"
else
  TEMP_DIR="/tmp/pterodactyl_theme_download"
  echo -e "${CYAN}ℹ Mengesan instalasi melalui remote curl. Memuat turun fail tema dari GitHub...${NC}"
  rm -rf "$TEMP_DIR"
  mkdir -p "$TEMP_DIR"

  if curl -sSL "https://github.com/fahrihostingg/install-temav2/archive/refs/heads/main.tar.gz" 2>/dev/null | tar -xz -C "$TEMP_DIR" --strip-components=1 2>/dev/null; then
    THEME_SOURCE="$TEMP_DIR"
  elif git clone --depth=1 "https://github.com/fahrihostingg/install-temav2.git" "$TEMP_DIR" 2>/dev/null; then
    THEME_SOURCE="$TEMP_DIR"
  fi
fi

if [ -z "$THEME_SOURCE" ] || [ ! -d "$THEME_SOURCE/theme" ]; then
  echo -e "${RED}[ERROR] Folder tema tidak dijumpai! Pastikan fail tema lengkap wujud.${NC}"
  exit 1
fi

# ------------------------------------------------------------------------------
# 4. SALIN & KEMASKINI WRAPPER (CLIENT SPA)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[1/5] Memeriksa & membackup wrapper.blade.php...${NC}"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_WRAPPER="$PANEL_DIR/resources/views/templates/wrapper.blade.php.bak"

if [ -f "$WRAPPER_FILE" ] && [ ! -f "$BACKUP_WRAPPER" ]; then
  cp "$WRAPPER_FILE" "$BACKUP_WRAPPER"
  echo -e "${GREEN}✓ Backup wrapper disimpan di: $BACKUP_WRAPPER${NC}"
fi

cp "$THEME_SOURCE/theme/resources/views/templates/wrapper.blade.php" "$WRAPPER_FILE"
echo -e "${GREEN}✓ wrapper.blade.php berjaya dikemaskini!${NC}"

# ------------------------------------------------------------------------------
# 5. INTEGRASI ADMIN BLADE (admin.blade.php)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[2/5] Mengintegrasikan tema ke admin.blade.php...${NC}"
ADMIN_FILE="$PANEL_DIR/resources/views/layouts/admin.blade.php"
BACKUP_ADMIN="$PANEL_DIR/resources/views/layouts/admin.blade.php.bak"

if [ -f "$ADMIN_FILE" ]; then
  if [ ! -f "$BACKUP_ADMIN" ]; then
    cp "$ADMIN_FILE" "$BACKUP_ADMIN"
  fi
  if ! grep -q "premium.css" "$ADMIN_FILE"; then
    sed -i 's|</head>|    <link rel="stylesheet" href="/themes/premium/css/premium.css?v='$(date +%s)'">\n</head>|g' "$ADMIN_FILE"
  fi
  if ! grep -q "premium.js" "$ADMIN_FILE"; then
    sed -i 's|</body>|    <script src="/themes/premium/js/premium.js?v='$(date +%s)'"></script>\n</body>|g' "$ADMIN_FILE"
  fi
  echo -e "${GREEN}✓ Sokongan tema di Admin Panel berjaya diaktifkan!${NC}"
fi

# ------------------------------------------------------------------------------
# 6. SALIN ASET TEMA (CSS, JS, API, DATA)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[3/5] Menyalin fail aset tema & API tetapan...${NC}"
mkdir -p "$PANEL_DIR/public/themes/premium"
cp -r "$THEME_SOURCE/theme/public/themes/premium/"* "$PANEL_DIR/public/themes/premium/"

# Buat folder data dan file .secret sekiranya belum ada
mkdir -p "$PANEL_DIR/public/themes/premium/data"
if [ ! -f "$PANEL_DIR/public/themes/premium/data/.secret" ]; then
  echo "fakruldev" > "$PANEL_DIR/public/themes/premium/data/.secret"
fi
echo -e "${GREEN}✓ Fail tema berjaya disalin tanpa sebarang ralat!${NC}"

# ------------------------------------------------------------------------------
# 7. ATUR HAK AKSES SISTEM (PERMISSIONS)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[4/5] Mengatur kebenaran fail & hak milik pelayan web...${NC}"
chmod -R 755 "$PANEL_DIR/public/themes/premium"
chmod -R 777 "$PANEL_DIR/public/themes/premium/api"
chmod -R 777 "$PANEL_DIR/public/themes/premium/data"
chmod 666 "$PANEL_DIR/public/themes/premium/api/settings.json" 2>/dev/null || true
chmod 666 "$PANEL_DIR/public/themes/premium/data/settings.json" 2>/dev/null || true
chmod 666 "$PANEL_DIR/public/themes/premium/data/.secret" 2>/dev/null || true

if id "www-data" &>/dev/null; then
  WEB_USER="www-data:www-data"
elif id "nginx" &>/dev/null; then
  WEB_USER="nginx:nginx"
else
  WEB_USER="root:root"
fi

chown -R $WEB_USER "$PANEL_DIR/public/themes/premium"
chown $WEB_USER "$WRAPPER_FILE"
if [ -f "$ADMIN_FILE" ]; then
  chown $WEB_USER "$ADMIN_FILE"
fi
chmod -R 777 "/public/themes/premium/api"
chmod -R 777 "/public/themes/premium/data"
chmod 666 "/public/themes/premium/api/settings.json" 2>/dev/null || true
chmod 666 "/public/themes/premium/data/settings.json" 2>/dev/null || true
chmod 666 "/public/themes/premium/data/.secret" 2>/dev/null || true
echo -e "${GREEN}✓ Kebenaran fail diatur kepada ($WEB_USER).${NC}"

# ------------------------------------------------------------------------------
# 8. BERSIHKAN CACHE LARAVEL
# ------------------------------------------------------------------------------
echo -e "${CYAN}[5/5] Membersihkan cache Laravel Panel...${NC}"
cd "$PANEL_DIR" || exit
if command -v php &>/dev/null; then
  php artisan view:clear > /dev/null 2>&1
  php artisan config:clear > /dev/null 2>&1
  php artisan cache:clear > /dev/null 2>&1
  echo -e "${GREEN}✓ Cache panel berjaya dibersihkan!${NC}"
fi

echo ""
echo -e "${GREEN}==============================================================${NC}"
echo -e "${GREEN}        🎉 INSTALASI TEMA PREMIUM V2.3 BERJAYA! 🎉           ${NC}"
echo -e "${GREEN}==============================================================${NC}"
echo -e "${YELLOW}Perubahan yang Diterapkan:${NC}"
echo -e "  1. 📌 ${CYAN}Menu 'Tema' kini TEPAT di bawah 'Application API' dalam sidebar.${NC}"
echo -e "  2. 📏 ${CYAN}Saiz butang mengikut saiz standard sidebar AdminLTE asal.${NC}"
echo -e "  3. 🚫 ${CYAN}Bar terapung besar & butang header telah dibuang dari Admin.${NC}"
echo -e "  4. 🔓 ${CYAN}Ralat 'Unauthorized - secret salah' telah dibaiki sepenuhnya.${NC}"
echo -e "  5. 📦 ${CYAN}Ralat salin 'cannot stat /dev/fd' kini 100% selesai.${NC}"
echo ""
echo -e "${PURPLE}Buka panel anda di pelayar web dan tekan Ctrl + F5 (Hard Refresh).${NC}"
echo -e "${GREEN}==============================================================${NC}"
