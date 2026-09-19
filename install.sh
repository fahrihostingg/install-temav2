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
/wFKT11mADACAA==
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
