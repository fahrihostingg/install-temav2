# 🌟 FakrulDev & Fahri Hosting - Tema Premium Luxury & Animated v2.3
> **Tema Pterodactyl Panel v1.15+ dengan Integrasi Kemas Sidebar Admin (Bawah Application API), Resolusi Ralat Curl /dev/fd, dan Pembaikan Ralat Secret/License.**

---

## 🔑 Kunci Lisensi / Password Instalasi
Semasa menjalankan `install.sh`, masukkan salah satu kata laluan yang sah:
- **`fakrul!2808`**
- **`fakruldev`**
- **`pahri`**
- **`fahri`**
- **`PAHRI2026`**
*(Kata laluan boleh ditukar pada baris 20 fail `install.sh`)*.

---

## 🛠️ Pembaikan Utama dalam v2.3:

1. **Hanya 1 Butang TEMA di Bawah Application API**:
   - Di bahagian Admin Panel (`/admin/*`), butang **`Tema`** kini terletak kemas tepat di bawah **`Application API`** dalam menu *sidebar* kiri.
   - Saiznya 100% mengikut saiz asal menu sidebar Pterodactyl/AdminLTE (tidak besar, saiz teks dan ikon sama persis).
   - Bar gergasi di bawah skrin dan butang di header atas telah dipadamkan sepenuhnya dari Admin.

2. **Memperbaiki Ralat `Unauthorized — secret salah`**:
   - Skrip `settings.php` kini menyokong penyimpanan secara terus tanpa menyekat pentadbir dengan `.secret`.
   - Menekan butang **SAVE SETTINGS** kini akan terus berjaya disimpan ke server tanpa sebarang ralat.

3. **Memperbaiki Log Ralat VPS `cp: cannot stat '/dev/fd/...'`**:
   - Punca ralat berlaku kerana arahan `bash <(curl ...)` dijalankan dari fail paip sementara Linux (`/dev/fd/63`).
   - Skrip `install.sh` kini secara automatik memuat turun arkib tema lengkap dari repositori GitHub sekiranya dijalankan melalui curl, memastikan semua fail tema disalin dengan sempurna tanpa ralat.

---

## 🚀 Panduan Pemasangan di VPS

### Kaedah 1: Menggunakan Perintah 1-Baris (Curl):
```bash
bash <(curl -fsSL https://raw.githubusercontent.com/fahrihostingg/install-temav2/main/install.sh)
```
*Masukkan salah satu password:* `fakrul!2808` atau `PAHRI2026`

---

### Kaedah 2: Pemasangan Manual (Zip):
```bash
sudo su
cd /root
rm -rf install-temav2-main
unzip install-temav2-v2.3-fixed.zip
cd install-temav2-main
chmod +x install.sh
bash install.sh
```

Selepas pemasangan selesai, buka panel di pelayar web dan tekan **Ctrl + F5** (Hard Refresh).

---
**Hak Cipta © FakrulDev & Fahri Hosting.**
