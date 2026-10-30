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
   - `--bg: #0A0405`
   - `--paper: #F2E3C6`
   - `--muted: #1A090B66`
   - `--gold: #C9A25A` (dipakai lewat alias `--lime`)
   - `--rouge: #8E0B13`
   - `--rouge-deep: #4B080C`
   - `--gold-soft: #E5CD96`

   Tema **Moulin Rouge**: latar hitam keoxblood dengan glow radial merah tua, teks dan kartu champagne, aksen emas pada tombol/titik/detail chart, serta crimson pada ticker, visual Civic Flow, orb poster, dan hero dialog. `--muted` tetap menjadi lapisan netral untuk kartu identitas, poster About, dan visual Retail Pulse.

## Monogram

Huruf awal **N** di kartu identitas dan poster About adalah SVG inline, bukan teks font. Siluetnya diambil dari **Cinzel Decorative Black** (lisensi OFL) dengan tambahan dua bintang empat sudut sebagai inlay. Untuk huruf awal berikutnya, pertahankan sistem yang sama: serif kontras tinggi dengan swash, satu atau dua bintang di batang huruf, lalu susun lapisannya seperti ini:

- Kartu identitas: emas (`--gold`) → crimson (`--rouge`) → ink, dengan bintang champagne.
- Poster About: bayangan emas → rouge-deep, dengan bintang champagne.

Font **Luna Morta** asli tidak disertakan karena lisensi komersial; gaya di atas adalah interpretasi yang aman untuk dipakai.

## Interaksi

- Klik kartu proyek untuk membuka **case file** (modal).
- Tekan **G** di desktop untuk menampilkan grid 12 kolom; klik ikon grid di header juga bisa.
- Menu full-screen di mobile.
- Jam Indonesia (WIB) diperbarui otomatis.
- Mendukung `prefers-reduced-motion` dan navigasi keyboard.

## Catatan penting

Nama diambil dari file CV di folder induk, sementara **isi proyek, angka statistik, nama klien, dan detail pencapaian adalah placeholder**. Ganti dengan data dan pengalaman nyata sebelum dipublikasikan. Teks saat ini berbahasa Inggris agar terasa seperti studio digital internasional; bisa diterjemahkan ke Bahasa Indonesia tanpa mengubah layout.
