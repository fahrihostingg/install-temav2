# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Animated v2.1
> **Tema Pterodactyl Panel v1.15+ dengan Proteksi Password Lisensi, Floating Theme Customizer, dan Perbaikan Logo Login Otomatis.**

---

## 🔑 Kunci Lisensi / Password Instalasi
Tema ini dilindungi sistem verifikasi kata laluan. Semasa menjalankan `install.sh`, masukkan salah satu password sah berikut:
- **`PAHRI2026`**
- **`FAKRULDEV`**
*(Kata laluan boleh ditukar atau ditambah pada baris 20 fail `install.sh`)*.

---

## 📍 Di Mana Butang Pengaturan Tema Terletak?

Untuk memastikan butang tidak lagi terlindung atau terlepas pandang:
1. **Di Sudut Kiri Bawah (Bottom-Left)**:
   - Terdapat **Butang Terapung (Floating Pill FAB)** berwarna neon ungu-sian dengan teks **`🎨 Tema Setting`**.
   - *Mengapa di kiri?* Kerana di sudut kanan bawah terdapat widget Google reCAPTCHA yang menutupi skrin. Meletakkannya di kiri memastikan ia 100% bebas dari halangan!
2. **Di Halaman Login (`/auth/login`)**:
   - Terdapat butang pantas di **Sudut Kanan Atas**: **`✨ Ubah Tema & Logo`**.
3. **Di Dashboard Klien (`/`)**:
   - Terdapat butang **`🎨 Tema`** di bar navigasi atas (Navbar) bersebelahan nama pengguna.
4. **Di Bahagian Admin Panel (`/admin/*`)**:
   - Terdapat menu **`🎨 Tema & Logo Setting`** di Sidebar sebelah kiri.

---

## 🏷️ Bagaimana Logo Login Berfungsi?

1. **Logo Dipaparkan Tepat Di Atas "Login to Continue"**:
   - Jika anda belum menetapkan logo custom, sistem akan secara automatik memaparkan **Emblem Neon Cyberpunk "PAHRI CLOUD"** beranimasi, jadi kotak login tidak akan kosong lagi.
2. **Menukar ke Logo Anda Sendiri**:
   - Klik butang **`Tema Setting`** -> Buka tab **`Logo & Brand`**.
   - Masukkan link URL gambar logo anda (format PNG, SVG, JPG, atau WebP dari Imgur / hosting anda).
   - Laraskan saiz ketinggian logo (30px - 120px) dan aktifkan efek pendaran cahaya neon (*glow*).
   - Klik **`Simpan Pengaturan`**; logo pada halaman login akan serta-merta berubah tanpa perlu refresh!

---

## 🚀 Panduan Pemasangan di VPS

### 1. Masuk sebagai root & pergi ke folder /root
```bash
sudo su
cd /root
```

### 2. Muat Turun & Ekstrak Tema
```bash
unzip install-temav2-main.zip
cd install-temav2-main
```

### 3. Jalankan Installer
```bash
chmod +x install.sh
bash install.sh
```
*Masukkan password lisensi:* `PAHRI2026` atau `FAKRULDEV`

### 4. Buka Browser & Bersihkan Cache
Buka `https://panel.fakrulafif.com` lalu tekan **Ctrl + F5**. Butang tema dan logo akan terus kelihatan!

---

## 🔄 Cara Uninstall / Restore ke Default
```bash
cd /root/install-temav2-main
chmod +x uninstall.sh
bash uninstall.sh
```

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
