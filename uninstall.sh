#!/bin/bash
# ============================================================
#   PREMIUM THEME UNINSTALLER
# ============================================================

set -e

PANEL_PATH="/var/www/pterodactyl"

R='\033[0;31m'; G='\033[0;32m'; Y='\033[1;33m'; C='\033[0;36m'; N='\033[0m'
ok()   { echo -e "${G}  ✓${N} $1"; }
info() { echo -e "${C}  ➜${N} $1"; }
fail() { echo -e "${R}  ✗${N} $1"; exit 1; }

[[ $EUID -ne 0 ]] && fail "Run sebagai root."

BACKUP=$(ls -td /root/theme_backup_* 2>/dev/null | head -n1)
[[ -z "$BACKUP" ]] && fail "Tiada backup dijumpai kat /root/"

echo "↻ Restore dari: $BACKUP"

if [[ -d "$BACKUP/views" ]]; then
  rm -rf "$PANEL_PATH/resources/views"
  cp -r "$BACKUP/views" "$PANEL_PATH/resources/views"
  ok "Views restored"
fi

if [[ -d "$BACKUP/public" ]]; then
  for item in "$BACKUP/public"/*; do
    base=$(basename "$item")
    rm -rf "$PANEL_PATH/public/$base"
    cp -r "$item" "$PANEL_PATH/public/"
  done
  ok "Public files restored"
fi

rm -rf "$PANEL_PATH/public/themes/premium"
ok "Theme folder removed"

WEB_USER="www-data"
for u in www-data nginx apache httpd; do
  id "$u" &>/dev/null && WEB_USER="$u" && break
done
chown -R "$WEB_USER:$WEB_USER" "$PANEL_PATH" 2>/dev/null || true

cd "$PANEL_PATH"
php artisan view:clear
php artisan cache:clear
php artisan config:clear
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo
echo -e "${G}  ✓ Tema asal dipulihkan!${N}"
echo -e "${C}  Refresh panel kau sekarang.${N}\n"