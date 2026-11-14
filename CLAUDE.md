# CLAUDE.md

Catatan aturan proyek untuk sesi Claude berikutnya. Baca sebelum mengubah apa pun.

## Isi repo

Repo ini berisi situs unduhan buku *Garis Bantu Olimpiade Matematika* (GitHub Pages dari folder `docs/`) dan tempat laporan kesalahan. Naskah buku tidak ada di sini; PDF hanya ada di GitHub Releases.

- `docs/index.html`: beranda, rak buku berisi sampul tiap jilid.
- `docs/sma/index.html`: detail jilid SMA (ringkasan, daftar bab, tombol Unduh PDF dan Lihat isi).
- `docs/smp/index.html`: jenjang SMP, belum tersedia.
- `docs/ralat/index.html`: daftar koreksi per jilid.
- `docs/style.css`, `docs/tema.js` (tombol Dark/Light), `docs/pratinjau.js` (pratinjau gambar).
- `docs/img/`: sampul, halaman pratinjau isi (`pratinjau/`), favicon, gambar pratinjau tautan (`og.png`).
- `TODO.md`: daftar pekerjaan. Centang butir yang selesai.

Situs ditulis HTML statis tanpa build. `docs/.nojekyll` membuat GitHub Pages tidak menjalankan Jekyll.

## Aturan desain

- Teks hitam/abu-abu. Aksen biru `#315878` (`--aksen`) hanya untuk tautan dan tombol.
- Merah (`--koreksi`) hanya untuk ralat. Jangan menambah warna lain.
- Huruf teks TeX Gyre Pagella, sama dengan buku (`docs/fonts/`, lisensi GUST). Menu, label, dan keterangan kecil memakai font sistem.
- Sampul memakai gambar asli halaman pertama PDF, bukan buatan sendiri:
  - `docs/img/sampul-sma-<n>.jpg`, lebar 480 px, untuk tampilan di halaman;
  - `docs/img/sampul-sma-<n>-besar.jpg`, lebar 1000 px, untuk pratinjau saat sampul diklik.
- Halaman pratinjau isi: `docs/img/pratinjau/sma-<n>/01.webp`, `02.webp`, ..., lebar 1000 px.
- Mode terang adalah default. Setiap perubahan tampilan harus dicek di mode terang dan gelap, dan di lebar ponsel.
- Favicon: huruf G tebal Pagella putih di kotak biru aksen, tanpa hiasan lain (garis tipis buram di 16 px).

### Pratinjau (`docs/pratinjau.js`)

Semua pratinjau terbuka di atas halaman, tanpa pindah halaman atau mengunduh. Tutup dengan tombol Tutup, Esc, atau klik di luar gambar. Tanpa JavaScript, tautannya tetap membuka gambar biasa.

- **Sampul diperbesar**: `<a class="perbesar" href="../img/sampul-sma-<n>-besar.jpg"><img class="sampul" ...></a>`.
- **Lihat isi**: tombol `<a class="tombol kedua lihat-isi" ...>` di samping Unduh PDF. Atributnya: `data-galeri` (folder gambar), `data-jumlah` (banyak gambar), `data-judul`, `data-unduh` (tautan PDF, sama dengan tombol Unduh), `data-total` (jumlah halaman PDF). Dibalik dengan tombol, panah kiri/kanan, atau geser di ponsel. Setelah halaman terakhir muncul ajakan mengunduh PDF.

PDF di Releases tidak bisa dibaca langsung oleh situs (GitHub tidak mengizinkan CORS), jadi pratinjau memakai gambar halaman yang disimpan di repo.

Halaman pratinjau yang dipilih (sekitar 15 sampai 20 per jilid): sampul, kata pengantar, daftar isi, cara memakai, peta materi atau bekal, enam halaman pertama Bab 1, dan satu halaman Bedah Soal. Buat dengan:

```bash
pdftoppm -f <hlm> -l <hlm> -scale-to-x 1000 -scale-to-y -1 -png <pdf> tmp
```

lalu ubah ke WebP kualitas 72 (Pillow) dengan nama berurutan `01.webp`, `02.webp`, ... Sekitar 80 KB per halaman.

### Angka `?v=` (penting)

Setiap kali `docs/style.css`, `docs/tema.js`, atau `docs/pratinjau.js` berubah, naikkan angka `?v=` pada tautannya di **semua** halaman yang memuatnya, agar browser tidak memakai versi lama dari cache.

## Gaya bahasa situs

- Bahasa Indonesia lugas, sapaan "Anda" di situs.
- Jangan memakai tanda pisah panjang (—). Pakai titik, koma, atau titik dua.
- Jangan menambah klaim yang tidak tertulis di buku.

## Alur kerja Git

1. Kerjakan di branch, bukan langsung di `main`.
2. Buat pull request ke `main`. Workflow `Cek tautan` (`.github/workflows/cek-tautan.yml`) harus hijau.
3. Merge dengan squash, judul diakhiri nomor PR, misalnya `Tambah ... (#13)`.

`Cek tautan` memakai lychee untuk memeriksa berkas lokal, penanda `#bagian`, tautan unduh PDF, dan tautan luar. Tautan `issues/new` dikecualikan karena GitHub membalas 403 untuk pengunjung yang belum login.

## Rilis PDF

1. Penulis membuat release dengan tag `sma-v<versi>` (misalnya `sma-v0.1`) dan mengunggah `GBOM-SMA-Jilid-<n>-<versi>.pdf` atau `GBOM-SMA-Cheatsheet-<versi>.pdf`.
2. Claude memperbarui:
   - tautan unduh di `docs/index.html` (rak buku) **dan** `docs/sma/index.html` (blok "DATA RILIS SMA"); keduanya harus sama;
   - baris meta di `docs/sma/index.html`: versi, jumlah halaman, ukuran berkas (pakai koma desimal, misalnya `0,7 MB`);
   - teks "Berlaku untuk" di `docs/ralat/index.html`;
   - tabel status di `README.md` dan `sma/README.md`.
3. Bila isi PDF berubah, buat ulang halaman pratinjau isi jilid itu.
4. Untuk jilid yang baru pertama kali rilis: ambil sampul dari halaman pertama PDF (`pdftoppm -f 1 -l 1 -scale-to-x 480 -scale-to-y -1 -jpeg`, dan sekali lagi lebar 1000 untuk versi `-besar`), isi judul, ringkasan, daftar bab, dan halaman pratinjau isi. Ganti `entri belum` dan `sampul kosong` dengan entri lengkap seperti Jilid 0 dan 1.
5. Bila sampul baru ingin tampil di pratinjau tautan, buat ulang `docs/img/og.png` (1200×630).

Jumlah halaman dan ukuran diambil dari PDF rilis, bukan ditebak.

## Ralat

1. Penulis mengonfirmasi kesalahan dari Google Form atau Issue.
2. Claude menambah baris ke tabel jilid terkait di `docs/ralat/index.html` (contoh format ada di komentar "DATA RALAT"). Kolom "Diperbaiki di" berisi `belum`.
3. Setelah versi perbaikan rilis, ganti `belum` dengan nomor versinya.

## Lisensi

Buku: CC BY-NC-ND 4.0 (`LICENSE`). Jangan menulis apa pun di situs yang bertentangan dengan lisensi ini.
