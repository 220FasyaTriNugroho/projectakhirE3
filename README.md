# 📖 VirtualDiary - Kelompok E3

> **"Determination is the beginning of success."**

**VirtualDiary** adalah aplikasi buku harian digital berbasis web yang mengusung konsep **Skeuomorphism** (meniru objek dunia nyata). Aplikasi ini mensimulasikan pengalaman menulis di atas buku fisik dengan fitur animasi membalik halaman (*flipbook*), kunci kombinasi visual, dan tekstur kertas vintage.

Dibangun sebagai **Final Project Teknologi Server**, 

---

## ✨ Fitur Utama (Key Features)

### 1. 🎨 Visual & Interaktif
- **Realistic Flip Animation:** Efek membalik halaman 2D yang halus menggunakan CSS 3D Transforms.
- **Vintage Aesthetics:** Desain antarmuka menyerupai buku kulit "Toddi" dengan ornamen emas dan tekstur kayu.
- **3 Tema Kertas:** Pengguna dapat memilih jenis kertas saat menulis:
  - 📜 **Classic:** Kertas tua kekuningan.
  - 🌑 **Midnight:** Mode gelap modern.
  - 🌸 **Lavender:** Nuansa ungu pastel.

### 2. ✍️ Pengalaman Menulis (User Experience)
- **Split-Screen Live Preview:** Saat menulis atau mengedit, layar terbagi dua. Sisi kiri untuk mengetik, sisi kanan menampilkan *preview* langsung di atas kertas pilihan.
- **Kartu Anggota:** Desain form Login & Register yang menyerupai kartu perpustakaan klasik.

### 3. 🛡️ Sistem & Keamanan
- **Autentikasi User:** Sistem Login/Register/Logout menggunakan `express-session`.
- **Proteksi CRUD:**
  - Hanya pemilik cerita yang bisa melihat tombol **Edit** dan **Hapus**.
  - Validasi di sisi server (Backend) untuk mencegah manipulasi ID.
- **Anti-Cache Logout:** Mencegah tombol "Back" browser mengembalikan user ke sesi login setelah logout.

---

## 🛠️ Teknologi yang Digunakan

| Komponen | Teknologi |
| :--- | :--- |
| **Backend** | Node.js (Express.js) |
| **Frontend** | EJS (Templating), Tailwind CSS, Vanilla JS |
| **Database** | MySQL 8.0 |
| **Server** | Nginx (Reverse Proxy) |
| **Container** | Docker & Docker Compose |

---

## 🚀 Cara Menjalankan (Installation)

Pastikan **Docker** dan **Docker Compose** sudah terinstall di komputer Anda.

1. **Clone Repository**
   ```bash
   git clone https://github.com/220FasyaTriNugroho/projectakhirE3 
   cd projectakhirE3