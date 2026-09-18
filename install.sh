#!/bin/bash
# ==============================================================================
# SCRIPT INSTALLER TEMA PREMIUM LUXURY & ANIMASI (v2.0)
# Developed for Pterodactyl Panel v1.x
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
echo -e "${CYAN}    ✨ FAKRULDEV & FAHRI HOSTING - THEME INSTALLER v2.0 ✨    ${NC}"
echo -e "${BLUE}          Tema Luxury Glassmorphism, Animasi & Settings       ${NC}"
echo -e "${PURPLE}==============================================================${NC}"
echo ""

# 1. Check Root Privileges
if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Script ini harus dijalankan sebagai ROOT! Gunakan: sudo bash install.sh${NC}"
  exit 1
fi

# 2. Check Pterodactyl Panel Directory
PANEL_DIR="/var/www/pterodactyl"
if [ ! -d "$PANEL_DIR" ]; then
  echo -e "${RED}[ERROR] Direktori Pterodactyl tidak ditemukan di $PANEL_DIR!${NC}"
  echo -e "${YELLOW}Pastikan Pterodactyl sudah terpasang di server ini.${NC}"
  exit 1
fi

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${CYAN}[1/5] Membuat Backup wrapper.blade.php asli...${NC}"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php.bak"

if [ -f "$WRAPPER_FILE" ]; then
  if [ ! -f "$BACKUP_FILE" ]; then
    cp "$WRAPPER_FILE" "$BACKUP_FILE"
    echo -e "${GREEN}✓ Backup berhasil disimpan di: $BACKUP_FILE${NC}"
  else
    echo -e "${YELLOW}ℹ File backup sudah ada, melewati pembuatan backup baru.${NC}"
  fi
fi

echo -e "${CYAN}[2/5] Memasang File Tema & Aset Frontend...${NC}"
mkdir -p "$PANEL_DIR/public/themes/premium"
cp -r "$SCRIPT_DIR/theme/public/themes/premium/"* "$PANEL_DIR/public/themes/premium/"
cp "$SCRIPT_DIR/theme/resources/views/templates/wrapper.blade.php" "$WRAPPER_FILE"
echo -e "${GREEN}✓ Aset tema berhasil disalin ke Pterodactyl!${NC}"

echo -e "${CYAN}[3/5] Mengatur Hak Akses & Permission File Settings...${NC}"
# Setup permissions
chmod -R 755 "$PANEL_DIR/public/themes/premium"
SETTINGS_JSON="$PANEL_DIR/public/themes/premium/api/settings.json"
if [ -f "$SETTINGS_JSON" ]; then
  chmod 777 "$SETTINGS_JSON"
fi
chmod 777 "$PANEL_DIR/public/themes/premium/api"

# Determine web server user (www-data / nginx / apache)
if id "www-data" &>/dev/null; then
  WEB_USER="www-data:www-data"
elif id "nginx" &>/dev/null; then
  WEB_USER="nginx:nginx"
else
  WEB_USER="root:root"
fi

chown -R $WEB_USER "$PANEL_DIR/public/themes/premium"
chown $WEB_USER "$WRAPPER_FILE"
echo -e "${GREEN}✓ Izin akses web server diatur ke ($WEB_USER).${NC}"

echo -e "${CYAN}[4/5] Membersihkan Cache Laravel Panel...${NC}"
cd "$PANEL_DIR" || exit
if command -v php &>/dev/null; then
  php artisan view:clear > /dev/null 2>&1
  php artisan config:clear > /dev/null 2>&1
  php artisan cache:clear > /dev/null 2>&1
  echo -e "${GREEN}✓ Cache tampilan panel berhasil dibersihkan!${NC}"
else
  echo -e "${YELLOW}ℹ Perintah PHP tidak ditemukan di PATH, silakan jalankan 'php artisan view:clear' manual jika perlu.${NC}"
fi

echo -e "${CYAN}[5/5] Finalisasi Instalasi...${NC}"
echo ""
echo -e "${GREEN}==============================================================${NC}"
echo -e "${GREEN}        🎉 INSTALASI TEMA PREMIUM V2.0 BERHASIL! 🎉           ${NC}"
echo -e "${GREEN}==============================================================${NC}"
echo -e "${YELLOW}Fitur Baru yang Tersedia:${NC}"
echo -e "  1. 🎨 ${CYAN}Tombol Setting Tema (Floating FAB di pojok kanan bawah)${NC}"
echo -e "  2. 🌈 ${CYAN}Ganti Warna Aksen & Color Presets (Indigo, Violet, Cyan, dll)${NC}"
echo -e "  3. 🖼️ ${CYAN}Ubah Wallpaper Background Dashboard & Halaman Login${NC}"
echo -e "  4. 🏷️ ${CYAN}Fix Logo Login - Otomatis mengganti logo default Pterodactyl${NC}"
echo -e "  5. 📢 ${CYAN}Banner Pengumuman (Teks berjalan / Running Marquee)${NC}"
echo -e "  6. ✨ ${CYAN}Animasi Halus, Efek Cahaya Neon, Glassmorphism & Hover 3D${NC}"
echo ""
echo -e "${PURPLE}Buka panel Anda di browser dan lakukan refresh (Ctrl + F5).${NC}"
echo -e "${GREEN}==============================================================${NC}"
