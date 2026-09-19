# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v3.7 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Installer Mandiri (Self-Contained / Boleh Dijalankan via Curl Langsung), Animasi Singkat & Elegan Tanpa Ralat, dan Simpanan Pautan Kekal.**

---

## 🔑 Kunci Lisensi / Password Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Terkini (Versi 3.7):

1. **Penyelesaian Ralat Langkah 3/5: "Folder sumber tema tidak lengkap!" (`image_a2b6c1.png`)**:
   - **Punca Ralat:** Apabila skrip dijalankan dari luar direktori atau melalui arahan satu baris `curl`, fail `install.sh` tidak menemui folder `theme/` di direktori semasa.
   - **Penyelesaian v3.7:**
     - Skrip `install.sh` kini **100% Mandiri (*Self-Contained / Standalone*)**. Semua aset tema (CSS, JS, API, settings, dan blade wrapper) telah dipakejkan terus ke dalam skrip.
     - Sekiranya folder tema fizikal tidak dikesan, skrip akan mengekstrak aset terbenam secara automatik ke folder sementara.
     - Skrip kini boleh dijalankan dari mana-mana lokasi, sama ada di dalam folder, dari `/root`, mahupun melalui `bash <(curl -fsSL ...)`.

2. **Animasi Diperhalusi (Singkat, Bersih, Keren & Bebas Glitch `image_a24e5e.jpg`)**:
   - **Pembaikan Garisan Menyerong di Kotak Carian:** Pemuat *spinner* telah dikunci ketat pada saiz bulat padat 32px. Tiada lagi masalah garisan berputar atau kesan visual pelik yang memotong kotak carian.
   - **Animasi Singkat (0.2s):** Efek pergerakan berlebihan telah dibuang dan digantikan dengan animasi mikro yang pantas dan selesa di mata.

3. **Penyimpanan Pautan & Data Kekal Sepenuhnya Selepas Refresh (`image_a1c71d.png`)**:
   - Fungsi automatik `syncSettingsToModal()` memulihkan semua URL logo, wallpaper, saiz, dan teks setiap kali pelayar disegarkan atau menu admin dibuka.

4. **Kad Login Seimbang & Proporsional Sesuai Garisan Pengguna (`image_a14e40.jpg`)**:
   - Bersaiz lebar 680px dengan ketinggian padat dan logo kemas di hadapan wallpaper angkasa.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1 (Disyorkan - Ekstrak ZIP):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v3.7-master.zip
cd install-temav2-main
chmod +x install.sh
bash install.sh
```

### Kaedah 2 (Jalankan dari mana-mana folder / GitHub):
```bash
bash install.sh
# Atau jika menggunakan curl dari repo anda:
bash <(curl -fsSL https://raw.githubusercontent.com/.../install.sh)
```
*Masukkan password:* **`fakrul!2808`** atau **`PAHRI2026`**.

Selepas selesai, buka semula panel anda di pelayar web dan tekan **`Ctrl + F5`** (Hard Refresh).

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
