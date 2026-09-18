#!/bin/bash
# ==============================================================================
# SCRIPT UNINSTALL TEMA PREMIUM (v2.0)
# Restore Pterodactyl Panel to Default Theme
# ==============================================================================

RED='\033[0;31m'
GREEN='\033[0;32m'
CYAN='\033[0;36m'
YELLOW='\033[1;33m'
NC='\033[0m'

clear
echo -e "${YELLOW}==============================================================${NC}"
echo -e "${YELLOW}          UNINSTALLER TEMA PREMIUM PTERODACTYL                ${NC}"
echo -e "${YELLOW}==============================================================${NC}"

if [ "$EUID" -ne 0 ]; then
  echo -e "${RED}[ERROR] Script ini harus dijalankan sebagai ROOT! Gunakan: sudo bash uninstall.sh${NC}"
  exit 1
fi

PANEL_DIR="/var/www/pterodactyl"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php.bak"

echo -e "${CYAN}[1/3] Mengembalikan wrapper.blade.php original dari backup...${NC}"
if [ -f "$BACKUP_FILE" ]; then
  cp "$BACKUP_FILE" "$WRAPPER_FILE"
  echo -e "${GREEN}✓ File wrapper asli berhasil dipulihkan.${NC}"
else
  echo -e "${YELLOW}⚠️ Backup tidak ditemukan. wrapper.blade.php dibiarkan tetap ada.${NC}"
fi

echo -e "${CYAN}[2/3] Menghapus file aset tema premium...${NC}"
rm -rf "$PANEL_DIR/public/themes/premium"
echo -e "${GREEN}✓ Folder /public/themes/premium berhasil dihapus.${NC}"

echo -e "${CYAN}[3/3] Membersihkan Cache Laravel...${NC}"
cd "$PANEL_DIR" || exit
if command -v php &>/dev/null; then
  php artisan view:clear > /dev/null 2>&1
  php artisan config:clear > /dev/null 2>&1
  php artisan cache:clear > /dev/null 2>&1
  echo -e "${GREEN}✓ Cache berhasil dibersihkan!${NC}"
fi

echo ""
echo -e "${GREEN}==============================================================${NC}"
echo -e "${GREEN}         PENGHAPUSAN TEMA BERHASIL DISELESAIKAN!              ${NC}"
echo -e "${GREEN}  Pterodactyl Panel telah dikembalikan ke tampilan standar.   ${NC}"
echo -e "${GREEN}==============================================================${NC}"
