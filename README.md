# 🌌 Premium Dark Theme — Pterodactyl

Tema premium glassmorphism + gradient untuk Pterodactyl Panel 1.x.

## ✨ Features
- 🌑 Dark mode elegan
- 💎 Glassmorphism cards
- 🎨 Animated gradient background
- ⚡ Smooth hover + ripple effect
- 🎯 Custom scrollbar
- 🔤 Google Inter font
- 📱 Responsive

## 🖥️ Requirements
- Pterodactyl Panel 1.x
- Ubuntu 20.04+ / Debian 11+ / CentOS 8+ / Rocky / Alma
- Root access
- PHP 8.0+

## 🚀 Install (1 Command)

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/USER/theme-repo/main/install.sh)
```

Kau akan diminta **password** (dapat dari admin).

## 🗑 Uninstall

```bash
bash <(curl -fsSL https://raw.githubusercontent.com/USER/theme-repo/main/uninstall.sh)
```

Backup auto-disimpan di `/root/theme_backup_YYYYMMDD_HHMMSS/`

## 🔧 Troubleshooting

**Tema tak muncul?**
```bash
systemctl restart pterodactyl* nginx
cd /var/www/pterodactyl && php artisan view:clear
```

**Permission error?**
```bash
chown -R www-data:www-data /var/www/pterodactyl
```

**Nak tukar warna?**
Edit `/var/www/pterodactyl/public/themes/premium/css/premium.css`
Ubah bahagian `:root { --accent: ... }`

## 📝 License
Private — redistribution tak dibenarkan.