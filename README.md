# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Animated v2.0
> **Tema Pterodactyl Panel v1.x Ultra-Modern, Glassmorphism, Penuh Animasi, & Dilengkapi Menu Pengaturan Tema Interaktif.**

---

## ✨ Fitur-Fitur Unggulan (New & Upgraded)

1. **🎨 Tombol Tema Setting Interaktif (Floating Action Button & Modal Luxury)**
   - Tombol mengambang (FAB) elegan di pojok kanan bawah beranimasi rotasi & pendaran cahaya.
   - Panel modal glassmorphism mewah dengan 5 tab pengaturan lengkap.
   - **Simpan ke Server API (`settings.json`)**: Pengaturan tersimpan permanen di server dan dapat diterapkan ke semua pengunjung, plus auto-fallback ke `localStorage`.
   - **Live Preview Real-Time**: Perubahan warna, efek blur, dan slider langsung terlihat seketika saat diatur.

2. **🌈 Kustomisasi Warna & Palet (Color Customizer)**
   - Pilihan preset warna instan: *Cyber Violet, Indigo Luxury, Neon Cyan, Emerald Glow, Crimson Ruby, Sunset Gold, Electric Blue, Neon Pink*.
   - Color Picker bebas (mendukung semua kode HEX/RGB).
   - Pengaturan tingkat kepekatan kartu (*card opacity*) dan tingkat blur kaca (*glass blur*).

3. **🖼️ Custom Background Dashboard & Halaman Login**
   - Mendukung input URL gambar/wallpaper resolusi tinggi (Unsplash, Imgur, direct link, atau GIF animasi).
   - Opsi terpisah untuk background dashboard dan background halaman login.
   - Slider pengatur kegelapan *overlay* (agar teks dan statistik server tetap sangat nyaman dibaca).

4. **🏷️ Fix Logo Login Otomatis (Mengikuti Pengaturan)**
   - **Masalah Terpecahkan**: Di versi sebelumnya, form login Pterodactyl yang menggunakan React Single Page Application (SPA) sering menolak atau menimpa logo kustom saat dirender.
   - **Solusi v2.0**: Menggunakan `MutationObserver` cerdas yang memantau hydration React secara real-time. Logo SVG burung bawaan Pterodactyl otomatis digantikan secara mulus dengan gambar logo kustom Anda.
   - Slider pengatur tinggi/ukuran logo login (30px - 110px).
   - Efek pendaran cahaya (*neon glow*) pada logo yang bisa diaktifkan/dinonaktifkan.
   - Logo navbar di dashboard juga otomatis diperbarui!

5. **📢 Banner Pengumuman Dinamis (Announcement / Running Text)**
   - Menampilkan pengumuman penting bagi semua pengguna panel.
   - Mendukung format teks berjalan halus (*running marquee*) atau teks statis.
   - Mendukung format teks HTML & Emojis.
   - Pilihan variasi gaya: *Luxury Gradient, Cyan Info, Amber Warning, Crimson Urgent Alert*.
   - Tombol tutup/dismiss yang ramah pengguna.

6. **✨ Efek Animasi & Glassmorphism Keren**
   - *Animated Ambient Glow Orbs*: Pendaran bola cahaya dinamis mengapung di latar belakang dengan transisi fluid.
   - *3D Card Hover & Elevate*: Kartu server terangkat dengan bayangan neon saat kursor diarahkan.
   - *Pulse Status Indicator*: Lampu indikator status server (Running, Starting, Stopped) berkedip halus dengan efek pendaran cahaya.
   - Scrollbar kustom futuristik dengan aksen warna tema.
   - Input custom CSS tambahan langsung dari modal pengaturan.

---

## 🚀 Panduan Instalasi Cepat

### Langkah 1: Masuk ke VPS via SSH
Masuk sebagai user `root`:
```bash
sudo su
```

### Langkah 2: Download & Ekstrak Tema
Pindah ke direktori utama atau `/root`:
```bash
cd /root
```
Ekstrak arsip `install-temav2-main.zip`:
```bash
unzip install-temav2-main.zip
cd install-temav2-main
```

### Langkah 3: Jalankan Installer Otomatis
Beri izin eksekusi dan jalankan:
```bash
chmod +x install.sh
bash install.sh
```

Installer otomatis akan:
1. Membackup file `wrapper.blade.php` bawaan Pterodactyl ke `wrapper.blade.php.bak`.
2. Menyalin seluruh aset tema ke `/var/www/pterodactyl/public/themes/premium`.
3. Mengatur hak akses file `settings.json` dan `settings.php` agar dapat ditulis oleh web server.
4. Membersihkan cache view Laravel (`php artisan view:clear`).

---

## 🛠️ Panduan Konfigurasi Melalui Web UI

1. Buka Pterodactyl Panel Anda di browser (misal: `https://panel.domainanda.com`).
2. Tekan **Ctrl + F5** (Hard Refresh) untuk membersihkan cache lama browser Anda.
3. Klik tombol **Tongkat Ajaib / Palette** di pojok kanan bawah.
4. Pilih warna, masukkan link wallpaper, logo, atau tulis pengumuman sesuai keinginan Anda.
5. Klik **"Simpan Pengaturan"**. Halaman akan langsung terupdate seketika!

---

## 🔄 Cara Menghapus Tema (Uninstall / Restore)

Jika Anda ingin mengembalikan tampilan Pterodactyl ke tema standar original:
```bash
cd /root/install-temav2-main
chmod +x uninstall.sh
bash uninstall.sh
```

---

**Dibuat dan Dioptimalkan oleh FakrulDev & Fahri Hosting.**
