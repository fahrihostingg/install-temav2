#!/bin/bash
# ==============================================================================
# SCRIPT INSTALLER TEMA PREMIUM LUXURY & HIGH-PERFORMANCE v3.6 PRO MASTER
# Protected Edition - Terminal Luxury & Hacker-Style Output
# Developed for Pterodactyl Panel v1.x (v1.15+ Compatible)
# By FakrulDev & Fahri Hosting
# ==============================================================================

# Definisi Warna Terminal Cyberpunk / Luxury
CYAN='\033[1;36m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
PURPLE='\033[1;35m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m' # No Color

clear

# ------------------------------------------------------------------------------
# BANNER ASCII ART CYBERPUNK MEWAH
# ------------------------------------------------------------------------------
echo -e "${CYAN}"
cat << "BANNER"
  ███████╗ █████╗ ██╗  ██╗██████╗ ██╗   ██╗██╗     ██████╗ ███████╗██╗   ██╗
  ██╔════╝██╔══██╗██║ ██╔╝██╔══██╗██║   ██║██║     ██╔══██╗██╔════╝██║   ██║
  █████╗  ███████║█████╔╝ ██████╔╝██║   ██║██║     ██║  ██║█████╗  ██║   ██║
  ██╔══╝  ██╔══██║██╔═██╗ ██╔══██╗██║   ██║██║     ██║  ██║██╔══╝  ╚██╗ ██╔╝
  ██║     ██║  ██║██║  ██╗██║  ██║╚██████╔╝███████╗██████╔╝███████╗ ╚████╔╝ 
  ╚═╝     ╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚═════╝ ╚══════╝  ╚═══╝  
BANNER
echo -e "${NC}"

echo -e "${PURPLE}╔═════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${PURPLE}║${WHITE}           ⚡ FAHRI HOSTING × FAKRULDEV — THEME SUITE PRO ⚡             ${PURPLE}║${NC}"
echo -e "${PURPLE}║${CYAN}         Luxury Glassmorphism & High-Performance Suite for Panel        ${PURPLE}║${NC}"
echo -e "${PURPLE}╚═════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. VERIFIKASI KUNCI LISENSI
# ------------------------------------------------------------------------------
VALID_PASSWORDS=("fakrul!2808" "fakruldev" "pahri" "fahri" "PAHRI2026" "FAKRULDEV" "FAKRUL2026")

echo -e "${YELLOW}┌── [ 🔒 SISTEM KESELAMATAN & LISENSI ] ──────────────────────────────────┐${NC}"
echo -e "${YELLOW}│${NC} Pakej ini dilindungi khusus untuk pelanggan berlesen sah.              ${YELLOW}│${NC}"
echo -e "${YELLOW}└────────────────────────────────────────────────────────────────────────┘${NC}"
echo ""

AUTHENTICATED=0
ATTEMPTS=0
MAX_ATTEMPTS=3

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
  echo -ne "${CYAN}🔑 Sila masukkan Password Lisensi: ${NC}"
  read -s RAW_INPUT
  echo ""
  USER_INPUT=$(echo "$RAW_INPUT" | tr -d '\r\n[:space:]')

  echo -ne "${BLUE}[ ⏳ ] Mengesahkan kunci keselamatan...${NC}"
  sleep 0.5

  for PWD in "${VALID_PASSWORDS[@]}"; do
    if [ "$USER_INPUT" == "$PWD" ]; then
      AUTHENTICATED=1
      break 2
    fi
  done

  ATTEMPTS=$((ATTEMPTS + 1))
  REMAINING=$((MAX_ATTEMPTS - ATTEMPTS))

  echo -e "\r${RED}[ ✕ ] Kunci lisensi tidak sah! Sila cuba lagi.${NC}"
  if [ $REMAINING -gt 0 ]; then
    echo -e "${GRAY}Peluang percubaan berbaki: ${REMAINING}/${MAX_ATTEMPTS}${NC}\n"
  fi
done

if [ $AUTHENTICATED -ne 1 ]; then
  echo ""
  echo -e "${RED}╔═════════════════════════════════════════════════════════════════════════╗${NC}"
  echo -e "${RED}║           AKSES DITOLAK! Percubaan melebihi had keselamatan.            ║${NC}"
  echo -e "${RED}╚═════════════════════════════════════════════════════════════════════════╝${NC}"
  exit 1
fi

echo -e "\r${GREEN}[ ✓ ] KUNCI LISENSI SAH: Akses Dibenarkan (VIP Master Key Activated)!   ${NC}"
echo ""

# ------------------------------------------------------------------------------
# 2. STATUS STEP PROGRESS BOX
# ------------------------------------------------------------------------------
echo -e "${PURPLE}┌── [ PROSES PEMASANGAN PTERODACTYL THEME ] ─────────────────────────────┐${NC}"
echo -e "${PURPLE}│${NC}                                                                         ${PURPLE}│${NC}"

# LANGKAH 1: KESAN DIREKTORI PANEL
echo -ne "${PURPLE}│${NC}  [ 1/5 ] 🔍 Mengesan Direktori Pterodactyl Panel...                    "
sleep 0.3

PANEL_DIR=""
if [ -d "/var/www/pterodactyl" ]; then
  PANEL_DIR="/var/www/pterodactyl"
elif [ -d "/var/www/panel" ]; then
  PANEL_DIR="/var/www/panel"
elif [ -d "/var/www/ptero" ]; then
  PANEL_DIR="/var/www/ptero"
else
  read -p "Masukkan laluan penuh panel (cth: /var/www/pterodactyl): " CUSTOM_DIR
  if [ -d "$CUSTOM_DIR" ]; then
    PANEL_DIR="$CUSTOM_DIR"
  else
    echo -e "\r${PURPLE}│${RED}  [ 1/5 ] ✕ Ralat: Direktori panel tidak ditemui!                       ${PURPLE}│${NC}"
    echo -e "${PURPLE}└────────────────────────────────────────────────────────────────────────┘${NC}"
    exit 1
  fi
fi
echo -e "\r${PURPLE}│${GREEN}  [ 1/5 ] ✓ Direktori Panel Dikesan: ${PANEL_DIR}              ${PURPLE}│${NC}"

# LANGKAH 2: BACKUP
echo -ne "${PURPLE}│${NC}  [ 2/5 ] 📦 Membuat Sandaran Keselamatan (Backup Asal)...               "
sleep 0.3

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
THEME_SRC="$SCRIPT_DIR/theme"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_FILE="${WRAPPER_FILE}.bak_orig"

if [ -f "$WRAPPER_FILE" ] && [ ! -f "$BACKUP_FILE" ]; then
  cp "$WRAPPER_FILE" "$BACKUP_FILE"
fi
echo -e "\r${PURPLE}│${GREEN}  [ 2/5 ] ✓ Sandaran Fail Asal Sedia (.bak_orig)                        ${PURPLE}│${NC}"

# LANGKAH 3: MEMASANG ASSET
echo -ne "${PURPLE}│${NC}  [ 3/5 ] 🚀 Menyuntik Enjin CSS/JS & Tetapan Tema...                   "
sleep 0.4

mkdir -p "$PANEL_DIR/public/themes/premium/css"
mkdir -p "$PANEL_DIR/public/themes/premium/js"
mkdir -p "$PANEL_DIR/public/themes/premium/api"
mkdir -p "$PANEL_DIR/public/themes/premium/data"

if [ -d "$THEME_SRC" ]; then
  cp -r "$THEME_SRC/public/themes/premium/"* "$PANEL_DIR/public/themes/premium/"
  if [ -f "$THEME_SRC/resources/views/templates/wrapper.blade.php" ]; then
    cp "$THEME_SRC/resources/views/templates/wrapper.blade.php" "$WRAPPER_FILE"
  fi
else
  echo -e "\r${PURPLE}│${RED}  [ 3/5 ] ✕ Ralat: Folder sumber tema tidak lengkap!                    ${PURPLE}│${NC}"
  echo -e "${PURPLE}└────────────────────────────────────────────────────────────────────────┘${NC}"
  exit 1
fi

ADMIN_FILE="$PANEL_DIR/resources/views/layouts/admin.blade.php"
if [ -f "$ADMIN_FILE" ]; then
  if ! grep -q "premium.css" "$ADMIN_FILE"; then
    sed -i '/<\/head>/i \    <link rel="stylesheet" href="/themes/premium/css/premium.css?v=3.6">\n    <script src="/themes/premium/js/premium.js?v=3.6" defer></script>' "$ADMIN_FILE"
  fi
fi
echo -e "\r${PURPLE}│${GREEN}  [ 3/5 ] ✓ Fail Tema, Wrapper & Enjin Admin Berjaya Disuntik!          ${PURPLE}│${NC}"

# LANGKAH 4: PERMISSIONS
echo -ne "${PURPLE}│${NC}  [ 4/5 ] 🛡️  Mengatur Hak Milik Pelayan Web & Kebenaran Fail...        "
sleep 0.3

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

chmod -R 755 "$PANEL_DIR/public/themes/premium"
chmod -R 777 "$PANEL_DIR/public/themes/premium/api"
chmod -R 777 "$PANEL_DIR/public/themes/premium/data"
chmod 666 "$PANEL_DIR/public/themes/premium/api/settings.json" 2>/dev/null || true
chmod 666 "$PANEL_DIR/public/themes/premium/data/settings.json" 2>/dev/null || true
chmod 666 "$PANEL_DIR/public/themes/premium/data/.secret" 2>/dev/null || true
echo -e "\r${PURPLE}│${GREEN}  [ 4/5 ] ✓ Hak Milik Diatur ($WEB_USER) & Data Terbuka (777)            ${PURPLE}│${NC}"

# LANGKAH 5: CLEAR CACHE
echo -ne "${PURPLE}│${NC}  [ 5/5 ] ⚡ Membersihkan Cache Laravel Panel...                         "
sleep 0.4

cd "$PANEL_DIR" || exit
if command -v php &>/dev/null; then
  php artisan view:clear > /dev/null 2>&1
  php artisan config:clear > /dev/null 2>&1
  php artisan cache:clear > /dev/null 2>&1
fi
echo -e "\r${PURPLE}│${GREEN}  [ 5/5 ] ✓ Semua Cache Paparan Laravel Berjaya Dibersihkan!            ${PURPLE}│${NC}"

echo -e "${PURPLE}│${NC}                                                                         ${PURPLE}│${NC}"
echo -e "${PURPLE}└── [ SELESAI 100% ] ─────────────────────────────────────────────────────┘${NC}"
echo ""

# ------------------------------------------------------------------------------
# KAD RANGKUMAN PENYELESAIAN (LUXURY FINISH BOX)
# ------------------------------------------------------------------------------
echo -e "${CYAN}╔═════════════════════════════════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║${WHITE}                 🎉 PEMASANGAN TEMA BERJAYA DISELESAIKAN! 🎉            ${CYAN}║${NC}"
echo -e "${CYAN}╠═════════════════════════════════════════════════════════════════════════╣${NC}"
echo -e "${CYAN}║${NC}                                                                         ${CYAN}║${NC}"
echo -e "${CYAN}║${GREEN}  • Status Lesen     : AKTIF & SAH (Pro Master Edition)                  ${CYAN}║${NC}"
echo -e "${CYAN}║${WHITE}  • Versi Tema       : v3.6 PRO MASTER (Refined Animations & Persistence) ${CYAN}║${NC}"
echo -e "${CYAN}║${CYAN}  • Pengarang        : FakrulDev & Fahri Hosting                         ${CYAN}║${NC}"
echo -e "${CYAN}║${YELLOW}  • Panel Domain     : https://panel.fakrulafif.com                      ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}                                                                         ${CYAN}║${NC}"
echo -e "${CYAN}║${WHITE}  📌 PANDUAN PENTING PENGGUNA:                                            ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  1. Buka pelayar web dan tekan kekunci:                                 ${CYAN}║${NC}"
echo -e "${CYAN}║${YELLOW}     👉 [ Ctrl + F5 ] (Hard Refresh)                                     ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  2. Untuk mengubah tema, logo, wallpaper & banner:                      ${CYAN}║${NC}"
echo -e "${CYAN}║${WHITE}     👉 Log masuk akaun Admin -> Menu Sidebar Kiri -> ${CYAN}Tema Panel (PRO)${NC}   ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}  3. Semua pautan data kini kekal tersimpan secara automatik!            ${CYAN}║${NC}"
echo -e "${CYAN}║${NC}                                                                         ${CYAN}║${NC}"
echo -e "${CYAN}╚═════════════════════════════════════════════════════════════════════════╝${NC}"
echo ""
