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
