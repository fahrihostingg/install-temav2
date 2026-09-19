# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v3.8 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Pembaikan Penuh Pengesahan Lisensi Password, Pengekstrakan Mandiri (Self-Contained), Animasi Singkat & Bebas Glitch, dan Kad Login Proporsional.**

---

## 🔑 Kunci Lisensi / Password Sah Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Utama (Versi 3.8):

1. **Pembaikan Ralat Verifikasi Password Lisensi (`image_a3235a.png`)**:
   - **Punca Masalah:** Ralat terminal `line 76: [: -gt: unary operator expected` berlaku kerana pembolehubah persekitaran `$PWD` bertembung dengan pembolehubah Bash, menyebabkan input kata laluan tidak dibandingkan dengan betul.
   - **Penyelesaian v3.8:**
     - Logik semakan kata laluan ditulis semula dengan pembolehubah selamat (`$KEY`), semakan bersyarat yang ketat (`[ "$ATTEMPTS" -lt "$MAX_ATTEMPTS" ]`), dan pembersihan aksara rapi.
     - Kata laluan kini **100% tepat dan disahkan serta-merta** tanpa ralat sintaks unary.

2. **Installer 100% Mandiri (*Self-Contained*)**:
   - Semua fail tema (CSS, JS, API, settings, dan blade wrapper) dimampatkan dan dibenamkan terus ke dalam fail `install.sh`.
   - Skrip boleh dijalankan terus dari mana-mana folder, sama ada secara tempatan atau melalui snippet:
     `bash <(curl -fsSL https://raw.githubusercontent.com/.../install.sh)`

3. **Animasi Singkat, Elegan & Bebas Glitch (`image_a24e5e.jpg`)**:
   - Spinner pemuatan dihadkan pada bulatan kemas 32px (tiada lagi garisan menyerong berputar di atas modal carian).
   - Animasi mikro sepantas 0.2s pada hover kad, butang, dan penunjuk status.

4. **Penyimpanan Pautan Kekal Sepenuhnya Selepas Refresh (`image_a1c71d.png`)**:
   - Dwi-storan serentak (*LocalStorage + settings.json*) memastikan tiada medan yang menjadi kosong selepas *refresh*.

5. **Kad Login Proporsional Sesuai Garisan Pengguna (`image_a14e40.jpg`)**:
   - Lebar 680px, ruang dalaman yang megah, logo kemas (~150px), dan tajuk yang jelas di hadapan wallpaper angkasa.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1 (Ekstrak ZIP):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v3.8-master.zip
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
