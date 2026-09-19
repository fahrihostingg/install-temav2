# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v4.1 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Kad Pelayan Telus Kaca 100% Menyatu dengan Wallpaper Ikut Tema, Tab Sub-Navigasi Sempurna di Telefon & Laptop, dan Installer Mandiri.**

---

## 🔑 Kunci Lisensi / Password Sah Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Terkini (Versi 4.1):

1. **Kad Pelayan di Dashboard Kembali 100% Telus Kaca Menyatu Ikut Tema (`image_a41b98.jpg`)**:
   - **Punca Masalah:** Dalam versi sebelum ini, selector kad dihadkan dengan cara yang menyebabkan elemen senarai pelayan tidak sepadan, lalu kembali ke warna kelabu padu (*default* Pterodactyl).
   - **Penyelesaian v4.1:**
     - Ditambah selector dwi-lapisan pintar: `body.on-dashboard a[href^="/server/"]` dan `a[href^="/server/"]:not(nav *):not([class*="SubNavigation"] *):not([class*="FileManager"] *)`.
     - Fungsi JS `enhanceDashboardServerCards()` memastikan kad pelayan pada Dashboard utama (`/`) **100% telus kaca (*frosted glass 35% opacity* dengan *blur 12px*)** menampakkan wallpaper litar motherboard menyatu di belakang kad.
     - Garisan aksen neon di sebelah kiri kad (`border-left: 5px`) menyala terang mengikut warna tema pilihan anda (`--theme-primary`).
     - Kad pelayan kini telus sepenuhnya pada Dashboard tanpa menjejaskan paparan kemas tab dan fail di dalam halaman pelayan (`image_a41bf6.jpg`).

2. **Tab Navigasi & Pengurus Fail Sempurna di Telefon Bimbit & Laptop (`image_a41bf6.jpg`)**:
   - Tab navigasi menyokong tatalan mendatar licin (*horizontal swipe*) dengan teks penuh: **Console, Files, Databases, Schedules, Users, Backups, Network, Startup, Settings, Activity**.
   - Baris fail dan breadcrumb bersih tanpa kotak sempadan berlebihan.

3. **Installer 100% Mandiri (*Self-Contained*) & Pengesahan Kata Laluan Pantas**:
   - Semua fail tema dipakejkan terus ke dalam fail `install.sh`. Boleh dijalankan dari mana-mana folder atau terus melalui arahan curl.

4. **Simpanan Pautan & Data Kekal Sepenuhnya Selepas Refresh**:
   - Dwi-storan serentak (*LocalStorage + settings.json*) memastikan tiada medan yang menjadi kosong selepas *refresh*.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1 (Ekstrak ZIP):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v4.1-master.zip
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

Selepas selesai, buka semula panel anda dan tekan **`Ctrl + F5`** (Hard Refresh). Kad pelayan di Dashboard kini telus kaca sepenuhnya mengikut tema!

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
