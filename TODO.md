# Daftar pekerjaan

Daftar ini mencatat pekerjaan yang masih perlu dilakukan untuk situs dan alur kerja buku. Centang `[x]` setiap butir yang selesai, dan tambahkan butir baru di bagian yang sesuai.

Penanda pelaksana:
- **(Penulis)**: dikerjakan pemilik buku.
- **(Claude)**: bisa diminta ke Claude dalam sesi berikutnya.

Urutan yang disarankan: bagian 1 dan 2 dulu karena tidak menunggu konten, lalu bagian 3 dan 4 begitu konten jilid tersedia.

## 1. Catatan aturan proyek

- [ ] **(Claude)** Buat `CLAUDE.md` di root repository berisi:
  - aturan desain: aksen biru konstruksi `#315878`, merah hanya untuk ralat, garis putus-putus hanya di diagram, satu warna sampul per jenjang;
  - cara rilis PDF dan cara menambah ralat;
  - gaya bahasa situs (bahasa Indonesia lugas, tanpa tanda pisah panjang);
  - alur kerja: branch, pull request, lalu merge ke `main`;
  - kewajiban menaikkan angka `?v=` setiap kali `docs/style.css` atau `docs/tema.js` berubah.

## 2. Pemeriksaan otomatis (GitHub Actions)

- [ ] **(Claude)** Pemeriksaan tautan rusak di `docs/` pada setiap pull request, termasuk tautan unduh PDF.
- [ ] **(Claude)** Pelapor placeholder: daftar semua teks `[...]` yang masih tersisa di halaman.
- [ ] **(Claude)** Peringatan bila `docs/style.css` atau `docs/tema.js` berubah tetapi angka `?v=` di halaman tidak dinaikkan.

## 3. Konten jilid SMA

Untuk setiap jilid (Jilid 0 sampai 3 dan Cheatsheet Teorema):

- [ ] **(Penulis)** Judul, ringkasan dua kalimat, dan tingkat (misalnya pemula, menengah).
- [ ] **(Penulis)** Tiga materi utama dan daftar judul bab.
- [ ] **(Penulis)** Bidang materi dominan, untuk menentukan figur sampul.
- [ ] **(Penulis)** Satu atau dua halaman contoh dari PDF (PNG, lebar sekitar 1000 px): satu halaman soal dan satu halaman pembahasan.
- [ ] **(Penulis)** Satu kalimat spesifik untuk beranda: cakupan topik, asal soal, jumlah contoh.
- [ ] **(Claude)** Masukkan semua konten di atas ke `docs/index.html` dan `docs/sma/index.html`, ganti placeholder, dan sesuaikan figur sampul per jilid.

Cara menyerahkan: kirim semuanya dalam satu pesan atau satu file teks. Tidak perlu rapi.

## 4. Alur rilis PDF

Saat ini satu rilis harus diubah manual di dua tempat (`docs/index.html` dan `docs/sma/index.html`).

- [ ] **(Claude)** Pindahkan data rilis ke satu file data (`docs/_data/jilid.yml`) yang dibaca Jekyll bawaan GitHub Pages, sehingga satu rilis cukup mengubah satu file. Perlu menghapus `docs/.nojekyll` dan memastikan halaman tetap tampil sama.

Alur rilis setelah itu:

1. **(Penulis)** Buat release di GitHub dengan tag `sma-v<versi>` (misalnya `sma-v0.1`) dan unggah PDF dengan nama `GBOM-SMA-Jilid-<n>-<versi>.pdf` atau `GBOM-SMA-Cheatsheet-<versi>.pdf`.
2. **(Penulis)** Beri tahu Claude, misalnya: "Rilis SMA v0.1, jilid 0 dan 1."
3. **(Claude)** Perbarui versi, tanggal, jumlah halaman, ukuran berkas, dan halaman ralat; buat pull request lalu merge.

## 5. Alur ralat

1. **(Penulis)** Cek jawaban Google Form secara berkala, misalnya seminggu sekali.
2. **(Penulis)** Konfirmasi kesalahannya, lalu teruskan ke Claude atau catat sebagai Issue.
3. **(Claude)** Tambahkan ke tabel di `docs/ralat/index.html` dengan kolom "Diperbaiki di" berisi "belum".
4. **(Penulis)** Perbaiki di sumber buku dan rilis versi baru.
5. **(Claude)** Ganti "belum" dengan nomor versi perbaikannya.

## 6. Penyempurnaan tampilan

- [ ] **(Claude)** Di layar ponsel sempit, pindahkan tombol Dark/Light ke baris judul agar tidak turun ke baris kedua navigasi (opsional).
- [ ] **(Claude)** Favicon.
- [ ] **(Claude)** Gambar pratinjau dan meta Open Graph untuk tautan yang dibagikan di WhatsApp atau media sosial.
- [ ] **(Penulis)** Tentukan warna sampul untuk jenjang SMP (usulan sementara: `#3d2f4f`).

## 7. Sebelum label "uji coba" dicabut

- [ ] Semua placeholder `[...]` sudah terisi dan pelapor placeholder bersih.
- [ ] Rilis PDF asli sudah tersedia di GitHub Releases.
- [ ] **(Claude)** Hapus pita "Edisi uji coba" di semua halaman dan kata "dummy" di info unduhan.
- [ ] **(Claude)** Hapus catatan uji coba di `README.md` dan `sma/README.md`.
