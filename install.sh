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
68/6s/6sP1/65/8HZWiomwAwAgA=
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
