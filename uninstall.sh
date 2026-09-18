#!/bin/bash
# ==============================================================================
# SCRIPT UNINSTALL TEMA PREMIUM (v2.1)
# Restore Pterodactyl Panel to Default
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
  echo -e "${RED}[ERROR] Script ini mesti dijalankan sebagai ROOT! Gunakan: sudo bash uninstall.sh${NC}"
  exit 1
fi

PANEL_DIR="/var/www/pterodactyl"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_WRAPPER="$PANEL_DIR/resources/views/templates/wrapper.blade.php.bak"

ADMIN_FILE="$PANEL_DIR/resources/views/layouts/admin.blade.php"
BACKUP_ADMIN="$PANEL_DIR/resources/views/layouts/admin.blade.php.bak"

echo -e "${CYAN}[1/4] Memulihkan wrapper.blade.php dari backup...${NC}"
if [ -f "$BACKUP_WRAPPER" ]; then
  cp "$BACKUP_WRAPPER" "$WRAPPER_FILE"
  echo -e "${GREEN}✓ wrapper.blade.php original berjaya dipulihkan.${NC}"
fi

echo -e "${CYAN}[2/4] Memulihkan admin.blade.php dari backup...${NC}"
if [ -f "$BACKUP_ADMIN" ]; then
  cp "$BACKUP_ADMIN" "$ADMIN_FILE"
  echo -e "${GREEN}✓ admin.blade.php original berjaya dipulihkan.${NC}"
fi

echo -e "${CYAN}[3/4] Memadam fail aset tema...${NC}"
rm -rf "$PANEL_DIR/public/themes/premium"
echo -e "${GREEN}✓ Folder /public/themes/premium berjaya dipadam.${NC}"

echo -e "${CYAN}[4/4] Membersihkan cache Laravel...${NC}"
cd "$PANEL_DIR" || exit
if command -v php &>/dev/null; then
  php artisan view:clear > /dev/null 2>&1
  php artisan config:clear > /dev/null 2>&1
  php artisan cache:clear > /dev/null 2>&1
  echo -e "${GREEN}✓ Cache panel berjaya dibersihkan!${NC}"
fi

echo ""
echo -e "${GREEN}==============================================================${NC}"
echo -e "${GREEN}         TEMA BERJAYA DIBUANG & PANEL DIKEMBALIKAN!           ${NC}"
echo -e "${GREEN}==============================================================${NC}"
