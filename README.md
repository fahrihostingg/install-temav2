# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Glassmorphism v4.0 Pro Master
> **Tema Pterodactyl Panel v1.15+ dengan Paparan Tab Pelayan & Pengurus Fail Sempurna di Telefon Bimbit (Persis Seperti Laptop), Bebas Teks Terpotong, Butang Tidak Terhimpit, dan Installer Mandiri.**

---

## 🔑 Kunci Lisensi / Password Sah Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**

---

## ✨ Pembaikan & Naik Taraf Utama (Versi 4.0):

1. **Pembaikan Paparan Telefon Bimbit Menjadi Sama Persis Seperti Laptop (`1000023063.jpg` vs `ba3c43f6-8670-4fbf-a8de-9ed4fe252196`)**:
   - **Punca Tab Terpotong Jadi 2 Huruf (`Co`, `Fil`, `Da`, `Sc`):** Sebelum ini selector kad pelayan (`a[href*="/server/"]`) secara tidak sengaja turut menggayakan pautan tab sub-navigasi pelayan dan fail. Pada skrin telefon, gaya kad memaksa tab bersaiz besar sehingga kesemua 10 tab terhimpit dan teks dipotong ke 2 huruf.
   - **Penyelesaian v4.0:**
     - Selector kad pelayan dihadkan **100% khusus untuk senarai pelayan di Dashboard sahaja**.
     - Tab navigasi pelayan kini menyokong **tatalan mendatar licin (*smooth horizontal swipe*)** dengan paparan nama penuh: **Console, Files, Databases, Schedules, Users, Backups, Network, Startup, Settings, Activity** sama persis seperti pada paparan laptop!
     - Tiada lagi dua garisan melintang aneh di atas dan bawah bar tab.
     - Kotak sempadan (*border*) aneh pada baris fail dan breadcrumb `home / container` telah dibuang sepenuhnya, menjadikan senarai fail kemas, bersih, dan elegan.

2. **Pembaikan Butang Modal Tidak Terhimpit di Telefon (`1000023030.jpg`)**:
   - Pada skrin telefon, butang *"Simpan Pengaturan"* dan *"Reset Default"* disusun menegak dengan kelebaran penuh (100%), sangat selesa ditekan ibu jari tanpa sebarang teks terlipat.

3. **Installer 100% Mandiri (*Self-Contained*) & Bebas Ralat Lisensi**:
   - Pakej tema dimampatkan terus ke dalam fail `install.sh`. Boleh dijalankan dari mana-mana folder atau terus melalui arahan curl.
   - Pengesahan kata laluan selamat daripada konflik pembolehubah sistem Linux `$PWD`.

4. **Simpanan Pautan Kekal Sepenuhnya Selepas Refresh**:
   - Dwi-storan serentak (*LocalStorage + settings.json*) memastikan tiada medan yang menjadi kosong selepas *refresh*.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1 (Ekstrak ZIP):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v4.0-master.zip
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

Selepas selesai, buka semula panel anda di telefon dan komputer riba, kemudian tekan **`Ctrl + F5`** (atau *clear cache* pelayar telefon).

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
