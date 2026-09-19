#!/bin/bash
# ==============================================================================
# SCRIPT INSTALLER TEMA PREMIUM LUXURY & HIGH-PERFORMANCE v3.8 PRO MASTER
# Self-Contained Edition - Sesuai untuk bash lokal & bash <(curl ...)
# Developed for Pterodactyl Panel v1.x (v1.15+ Compatible)
# By FakrulDev & Fahri Hosting
# ==============================================================================

CYAN='\033[1;36m'
BLUE='\033[1;34m'
GREEN='\033[1;32m'
PURPLE='\033[1;35m'
YELLOW='\033[1;33m'
RED='\033[1;31m'
WHITE='\033[1;37m'
GRAY='\033[0;90m'
NC='\033[0m'

clear

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

while [ "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]; do
  echo -ne "${CYAN}🔑 Sila masukkan Password Lisensi: ${NC}"
  read -s RAW_INPUT
  echo ""
  USER_INPUT=$(echo "$RAW_INPUT" | tr -d '\r\n[:space:]')

  echo -ne "${BLUE}[ ⏳ ] Mengesahkan kunci keselamatan...${NC}"
  sleep 0.4

  for KEY in "${VALID_PASSWORDS[@]}"; do
    if [ "$USER_INPUT" == "$KEY" ]; then
      AUTHENTICATED=1
      break 2
    fi
  done

  ATTEMPTS=$((ATTEMPTS + 1))
  REMAINING=$((MAX_ATTEMPTS - ATTEMPTS))

  echo -e "\r${RED}[ ✕ ] Kunci lisensi tidak sah! Sila cuba lagi.                            ${NC}"
  if [ "$REMAINING" -gt 0 ]; then
    echo -e "${GRAY}Peluang percubaan berbaki: ${REMAINING}/${MAX_ATTEMPTS}${NC}\n"
  fi
done

if [ "$AUTHENTICATED" -ne 1 ]; then
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
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_FILE="${WRAPPER_FILE}.bak_orig"

if [ -f "$WRAPPER_FILE" ] && [ ! -f "$BACKUP_FILE" ]; then
  cp "$WRAPPER_FILE" "$BACKUP_FILE"
fi
echo -e "\r${PURPLE}│${GREEN}  [ 2/5 ] ✓ Sandaran Fail Asal Sedia (.bak_orig)                        ${PURPLE}│${NC}"

# LANGKAH 3: MEMASANG ASSET TEMA (DENGAN PENYAHKODAN AUTOMATIK / STANDALONE SUPPORT)
echo -ne "${PURPLE}│${NC}  [ 3/5 ] 🚀 Menyuntik Enjin CSS/JS & Tetapan Tema...                   "
sleep 0.4

mkdir -p "$PANEL_DIR/public/themes/premium/css"
mkdir -p "$PANEL_DIR/public/themes/premium/js"
mkdir -p "$PANEL_DIR/public/themes/premium/api"
mkdir -p "$PANEL_DIR/public/themes/premium/data"

THEME_SRC=""
if [ -d "$SCRIPT_DIR/theme" ]; then
  THEME_SRC="$SCRIPT_DIR/theme"
elif [ -d "$(pwd)/theme" ]; then
  THEME_SRC="$(pwd)/theme"
elif [ -d "$(pwd)/install-temav2-main/theme" ]; then
  THEME_SRC="$(pwd)/install-temav2-main/theme"
elif [ -d "/root/install-temav2-main/theme" ]; then
  THEME_SRC="/root/install-temav2-main/theme"
fi

TEMP_EXTRACT=""
if [ -z "$THEME_SRC" ] || [ ! -d "$THEME_SRC" ]; then
  TEMP_EXTRACT="/tmp/ptero_theme_pkg_$$"
  mkdir -p "$TEMP_EXTRACT"
  base64 -d << 'PAYLOAD_EOF' | tar -xz -C "$TEMP_EXTRACT" 2>/dev/null
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
CAIA
PAYLOAD_EOF
  if [ -d "$TEMP_EXTRACT/theme" ]; then
    THEME_SRC="$TEMP_EXTRACT/theme"
  fi
fi

if [ -d "$THEME_SRC" ]; then
  cp -r "$THEME_SRC/public/themes/premium/"* "$PANEL_DIR/public/themes/premium/"
  if [ -f "$THEME_SRC/resources/views/templates/wrapper.blade.php" ]; then
    cp "$THEME_SRC/resources/views/templates/wrapper.blade.php" "$WRAPPER_FILE"
  fi
  [ -n "$TEMP_EXTRACT" ] && [ -d "$TEMP_EXTRACT" ] && rm -rf "$TEMP_EXTRACT"
else
  echo -e "\r${PURPLE}│${RED}  [ 3/5 ] ✕ Ralat: Folder sumber tema tidak ditemui!                    ${PURPLE}│${NC}"
  echo -e "${PURPLE}└────────────────────────────────────────────────────────────────────────┘${NC}"
  exit 1
fi

ADMIN_FILE="$PANEL_DIR/resources/views/layouts/admin.blade.php"
if [ -f "$ADMIN_FILE" ]; then
  if ! grep -q "premium.css" "$ADMIN_FILE"; then
    sed -i '/<\/head>/i \    <link rel="stylesheet" href="/themes/premium/css/premium.css?v=3.8">\n    <script src="/themes/premium/js/premium.js?v=3.8" defer></script>' "$ADMIN_FILE"
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
echo -e "${CYAN}║${WHITE}  • Versi Tema       : v3.8 PRO MASTER (Fixed Auth & Standalone Engine)   ${CYAN}║${NC}"
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
