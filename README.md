# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v3.9 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Reka Bentuk Responsif Mudah Alih (Butang Tidak Terhimpit di Telefon), Installer Mandiri (Self-Contained), dan Penyimpanan Pautan Kekal.**

---

## 🔑 Kunci Lisensi / Password Sah Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Terkini (Versi 3.9):

1. **Pembaikan Butang Terhimpit di Paparan Telefon Bimbit (`1000023030.jpg`)**:
   - **Punca Masalah:** Pada skrin telefon yang sempit, kedua-dua butang diletakkan bersebelahan tanpa ruang mencukupi, menyebabkan teks terlipat ke baris kedua (*Reset Default* dan *Simpan Pengaturan*) dan butang menjadi sempit/terhimpit.
   - **Penyelesaian v3.9:**
     - **Di Skrin Telefon (`max-width: 600px`):** Butang disusun secara menegak (*full-width 100%*). Butang utama **"Simpan Pengaturan"** berada di atas dengan saiz besar dan mudah ditekan oleh ibu jari, manakala butang **"Reset Default"** berada di bawahnya.
     - Ditambah `white-space: nowrap !important;` bagi memastikan teks kekal sebaris dan tidak terlipat.
     - **Di Skrin Laptop / Desktop:** Butang kekal tersusun rapi secara mendatar (*side-by-side*) seperti biasa.
     - Kad template tema disusun kepada 2 lajur kemas pada paparan telefon (tidak lagi memanjang ke bawah).
     - Butang tutup **`✕`** modal kini dipaparkan dengan warna putih cerah dan jelas di telefon pintar.

2. **Installer 100% Mandiri (*Self-Contained*) & Pengesahan Kata Laluan Pantas**:
   - Semua fail tema dipakejkan terus ke dalam fail `install.sh`.
   - Boleh dijalankan dari mana-mana folder atau melalui snippet curl tanpa ralat kekurangan fail.
   - Pembolehubah keselamatan selamat daripada sebarang konflik pembolehubah Bash `$PWD`.

3. **Penyimpanan Pautan & Data Kekal Sepenuhnya Selepas Refresh**:
   - Data URL logo, wallpaper, saiz, dan teks pengumuman kekal tersimpan rapi dan tidak akan menjadi kosong lagi selepas pelayar disegarkan (*refresh*).

4. **Animasi Singkat & Bebas Glitch**:
   - Animasi mikro sepantas 0.2s pada butang dan kad pelayan tanpa sebarang gangguan garisan melintang pada kotak carian.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1 (Ekstrak ZIP):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v3.9-master.zip
cd install-temav2-main
chmod +x install.sh
bash install.sh
```

### Kaedah 2 (Jalankan terus fail install.sh dari mana-mana folder):
```bash
chmod +x install.sh
bash install.sh
```
*Masukkan password sah:* **`fakrul!2808`** atau **`PAHRI2026`**.

Selepas selesai, buka semula panel anda di pelayar web dan tekan **`Ctrl + F5`** (Hard Refresh).

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
