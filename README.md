# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v3.5 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Penyimpanan Pautan Kekal (Tiada Reset Kosong Lepas Refresh), Animasi Loading & Visual Lengkap, Kad Login Proporsional, dan Kawalan Khusus Admin.**

---

## 🔑 Kunci Lisensi / Password Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Terkini (Versi 3.5):

1. **Pautan & Data Kekal Sepenuhnya Selepas Refresh (`image_a1c71d.png`)**:
   - **Punca Medan Menjadi Kosong:** Sebelum ini borang modal tidak menyelaraskan (*sync*) data tetapan yang telah dimuat turun dari storan/pelayan ke dalam kotak input setelah modal dibina, mengakibatkan medan kelihatan kosong selepas pelayar dimuat semula.
   - **Penyelesaian v3.5:**
     - Ditambah fungsi `syncSettingsToModal()` yang secara automatik mengisi semula semua URL logo, wallpaper, saiz, dan tetapan ke dalam borang sebaik sahaja modal dibuka atau halaman disegarkan.
     - Menggunakan sistem dwi-storan serentak (*Dual Storage: LocalStorage + Server File settings.json*) dengan kawalan `Cache-Control: no-cache`, memastikan semua pautan kekal utuh sehingga anda menukarnya sendiri.

2. **Koleksi Animasi Moden & Efek Visual Pro**:
   - 🌀 **Animasi Loading Neon (Orbital Spinner):** Semua penunjuk pemuatan (*loading spinner*) panel kini berputar dengan dwi-garisan neon bercahaya (*glowing orbital ring*).
   - ⚡ **Jalur Kemajuan Shimmer (Progress Beam):** Garisan pemuatan di bahagian atas skrin memancar dengan kilauan gradien bergerak (*neon shimmer*).
   - ✨ **Efek Bernafas Bercahaya (Floating Glow):** Kad login mempunyai kesan cahaya bernafas halus yang terapung di hadapan wallpaper angkasa.
   - 🟢 **Denyutan Status Pelayan (Online Pulse):** Penunjuk status pelayan hijau berdenyut dengan cahaya neon aktif.
   - 👑 **Lencana PRO Berdenyut:** Lencana `PRO` Tema Panel di sidebar admin berdenyut secara elegan.

3. **Kad Login Selesa & Proporsional Sesuai Garisan Pengguna (`image_a14e40.jpg`)**:
   - Saiz kad ditetapkan pada lebar **680px** dengan ruang dalaman yang luas, logo kemas (~150px), dan tajuk yang jelas.

---

## 🚀 Panduan Pemasangan Semula di VPS

```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v3.5-master.zip
cd install-temav2-main
chmod +x install.sh
bash install.sh
```
*Masukkan password:* **`fakrul!2808`** atau **`PAHRI2026`**.

Selepas selesai, buka semula panel anda di pelayar web dan tekan **`Ctrl + F5`** (Hard Refresh).

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
