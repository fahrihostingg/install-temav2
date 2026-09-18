#!/bin/bash
# ==============================================================================
# SCRIPT INSTALLER TEMA PREMIUM LUXURY & ANIMASI (v2.1)
# Protected Edition - Hanya Pengguna Terotorisasi
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
echo -e "${CYAN}    ✨ FAKRULDEV & FAHRI HOSTING - THEME INSTALLER v2.1 ✨    ${NC}"
echo -e "${BLUE}          Tema Luxury Glassmorphism, Animasi & Settings       ${NC}"
echo -e "${PURPLE}==============================================================${NC}"
echo ""

# ------------------------------------------------------------------------------
# 1. VERIFIKASI PASSWORD LISENSI (HANYA YANG TAHU PASSWORD BOLEH INSTALL)
# ------------------------------------------------------------------------------
# Password yang diizinkan (boleh tambah atau tukar di sini):
VALID_PASSWORDS=("PAHRI2026" "FAKRULDEV" "PAHRI" "FAKRUL2026")

echo -e "${YELLOW}🔒 KEAMANAN: Tema ini diproteksi khusus pengguna berlisensi.${NC}"
echo -e "${CYAN}Sila masukkan kata laluan (password) untuk memulakan instalasi:${NC}"

AUTHENTICATED=0
ATTEMPTS=0
MAX_ATTEMPTS=3

while [ $ATTEMPTS -lt $MAX_ATTEMPTS ]; do
  read -s -p "🔑 Masukkan Password Lisensi: " USER_INPUT
  echo ""

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
  echo -e "${YELLOW}Sila hubungi FakrulDev / Fahri Hosting untuk mendapatkan kata laluan rasmi.${NC}"
  exit 1
fi

echo -e "${GREEN}✓ [AKSES DITERIMA] Verifikasi berjaya! Memulakan proses instalasi...${NC}"
echo ""
sleep 1

# ------------------------------------------------------------------------------
# 2. SEMAK HAK AKSES ROOT & DIREKTORI PTERODACTYL
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

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# ------------------------------------------------------------------------------
# 3. BACKUP & PASANG PADA CLIENT WRAPPER (wrapper.blade.php)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[1/5] Memeriksa & membackup wrapper.blade.php...${NC}"
WRAPPER_FILE="$PANEL_DIR/resources/views/templates/wrapper.blade.php"
BACKUP_WRAPPER="$PANEL_DIR/resources/views/templates/wrapper.blade.php.bak"

if [ -f "$WRAPPER_FILE" ]; then
  if [ ! -f "$BACKUP_WRAPPER" ]; then
    cp "$WRAPPER_FILE" "$BACKUP_WRAPPER"
    echo -e "${GREEN}✓ Backup wrapper disimpan di: $BACKUP_WRAPPER${NC}"
  fi
fi

cp "$SCRIPT_DIR/theme/resources/views/templates/wrapper.blade.php" "$WRAPPER_FILE"
echo -e "${GREEN}✓ wrapper.blade.php berjaya dikemaskini!${NC}"

# ------------------------------------------------------------------------------
# 4. PASANG PADA ADMIN LAYOUT (admin.blade.php) SUPAYA TEMA JUGA MUNCUL DI ADMIN
# ------------------------------------------------------------------------------
echo -e "${CYAN}[2/5] Menyemak admin.blade.php...${NC}"
ADMIN_FILE="$PANEL_DIR/resources/views/layouts/admin.blade.php"
BACKUP_ADMIN="$PANEL_DIR/resources/views/layouts/admin.blade.php.bak"

if [ -f "$ADMIN_FILE" ]; then
  if [ ! -f "$BACKUP_ADMIN" ]; then
    cp "$ADMIN_FILE" "$BACKUP_ADMIN"
  fi
  # Pastikan link tema masuk ke dalam admin layout jika belum ada
  if ! grep -q "premium.css" "$ADMIN_FILE"; then
    sed -i 's|</head>|    <link rel="stylesheet" href="/themes/premium/css/premium.css?v='$(date +%s)'">\n</head>|g' "$ADMIN_FILE"
  fi
  if ! grep -q "premium.js" "$ADMIN_FILE"; then
    sed -i 's|</body>|    <script src="/themes/premium/js/premium.js?v='$(date +%s)'"></script>\n</body>|g' "$ADMIN_FILE"
  fi
  echo -e "${GREEN}✓ Sokongan tema di bahagian Admin Panel berjaya diaktifkan!${NC}"
fi

# ------------------------------------------------------------------------------
# 5. SALIN ASET TEMA (CSS, JS, API SETTINGS)
# ------------------------------------------------------------------------------
echo -e "${CYAN}[3/5] Menyalin fail aset tema & API tetapan...${NC}"
mkdir -p "$PANEL_DIR/public/themes/premium"
cp -r "$SCRIPT_DIR/theme/public/themes/premium/"* "$PANEL_DIR/public/themes/premium/"
echo -e "${GREEN}✓ Fail tema berjaya disalin ke /public/themes/premium/${NC}"

# ------------------------------------------------------------------------------
# 6. ATUR PERMISSION & HAK AKSES SISTEM
# ------------------------------------------------------------------------------
echo -e "${CYAN}[4/5] Mengatur hak akses & permission settings.json...${NC}"
chmod -R 755 "$PANEL_DIR/public/themes/premium"
SETTINGS_JSON="$PANEL_DIR/public/themes/premium/api/settings.json"
if [ -f "$SETTINGS_JSON" ]; then
  chmod 777 "$SETTINGS_JSON"
fi
chmod 777 "$PANEL_DIR/public/themes/premium/api"

# Tentukan web server user
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
echo -e "${GREEN}✓ Hak milik sistem ditetapkan kepada ($WEB_USER).${NC}"

# ------------------------------------------------------------------------------
# 7. BERSIHKAN CACHE LARAVEL
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
echo -e "${GREEN}        🎉 INSTALASI TEMA PREMIUM V2.1 BERJAYA! 🎉           ${NC}"
echo -e "${GREEN}==============================================================${NC}"
echo -e "${YELLOW}Panduan Akses Menu Pengaturan Tema:${NC}"
echo -e "  1. 🎨 ${CYAN}Butang terapung 'Tema Setting' ada di Sudut Kiri Bawah (Bottom-Left).${NC}"
echo -e "     ${YELLOW}(Kedudukan di kiri memastikan ia TIDAK terlindung oleh badge reCAPTCHA di kanan).${NC}"
echo -e "  2. ✨ ${CYAN}Di Halaman Login: Ada butang 'Ubah Tema & Logo' di Sudut Kanan Atas.${NC}"
echo -e "  3. 🏷️ ${CYAN}Logo Login: Jika belum ada URL custom, logo emblem 'PAHRI CLOUD' akan dipaparkan.${NC}"
echo -e "     ${YELLOW}Untuk tukar: Klik butang tema -> Tab 'Logo & Brand' -> Masukkan URL logo anda.${NC}"
echo -e "  4. 🛠️ ${CYAN}Di Admin Panel (/admin): Terdapat pautan 'Tema & Logo Setting' di menu sidebar.${NC}"
echo ""
echo -e "${PURPLE}Buka panel anda di browser dan tekan Ctrl + F5 (Hard Refresh).${NC}"
echo -e "${GREEN}==============================================================${NC}"
