# Data, Decoded. — Portfolio Landing Page

Landing page portofolio satu halaman dengan arah visual **modern digital studio / dashboard editorial**. Dibuat tanpa framework dan tanpa dependency build — cukup HTML, CSS, dan JavaScript.

## Menjalankan

Buka `index.html` langsung di browser (double-click), atau jalankan server lokal:

```powershell
python -m http.server 8000
```

lalu buka `http://localhost:8000`.

Font (Space Grotesk, Instrument Serif, JetBrains Mono) dimuat dari Google Fonts, jadi sambungkan internet saat membuka halaman. Jika font gagal dimuat, halaman tetap memakai fallback system font.

## File

| File | Isi |
| --- | --- |
| `index.html` | Struktur halaman, teks, kartu proyek, dan dialog |
| `styles.css` | Semua styling, palet warna, animasi, responsive layout |
| `main.js` | Jam live WIB, reveal on scroll, counter, modal proyek, menu, grid |
| `favicon.svg` | Ikon situs |

## Personalisasi cepat

1. **Nama, peran, lokasi, email**
   Cari `Naurah Nazhifah` dan `hello@naurah.design` di `index.html`, lalu ganti. Email juga muncul di `mailto:` dan menu mobile.
2. **Tautan sosial**
   Cari `LinkedIn`, `GitHub`, dan `Instagram` di bagian contact (`index.html`). Saat ini tautannya masih mengarah ke halaman utama platform — ganti dengan URL profil kamu.
3. **Proyek**
   - Kartu dan visual ada di `index.html`, di dalam blok `.projects`.
   - Isi detail saat kartu diklik ada di `main.js`, objek `cases` (`retail`, `civic`, `kopi`, `notes`).
4. **Statistik & skill**
   Angka di `.about-stats` memakai atribut `data-count`. Bar skill memakai custom property `--value` pada elemen `.bar`.
5. **Foto / potret**
   Saat ini potret dibuat dari tipografi dan bentuk CSS (`.poster`) supaya tetap terlihat rapi tanpa foto. Untuk memakai foto asli, ganti isi `.poster` dengan `<img>` dan sesuaikan CSS-nya.
6. **Warna**
   Semua warna ada di blok `:root` pada `styles.css`:
   - `--lime: #92F56E`
   - `--red: #A1020F`
   - `--orange: #D18034`
   - `--sand: #E8BE97`
   - ditambah kertas hangat `--paper: #F4EFE6` dan tinta `--ink: #17130F`.

   Kata italic besar di permukaan terang memakai `--orange`; di section gelap (Process, Contact) memakai `--lime`. Merah dipakai sangat hemat sebagai aksen kecil (nav aktif, status, label, titik chart), bukan sebagai blok besar. Permukaan besar seperti section process dan kartu Civic Flow memakai `--ink`, mengikuti referensi warna contact section.

## Interaksi

- Klik kartu proyek untuk membuka **case file** (modal).
- Tekan **G** di desktop untuk menampilkan grid 12 kolom; klik ikon grid di header juga bisa.
- Menu full-screen di mobile.
- Jam Indonesia (WIB) diperbarui otomatis.
- Mendukung `prefers-reduced-motion` dan navigasi keyboard.

## Catatan penting

Nama diambil dari file CV di folder induk, sementara **isi proyek, angka statistik, nama klien, dan detail pencapaian adalah placeholder**. Ganti dengan data dan pengalaman nyata sebelum dipublikasikan. Teks saat ini berbahasa Inggris agar terasa seperti studio digital internasional; bisa diterjemahkan ke Bahasa Indonesia tanpa mengubah layout.
