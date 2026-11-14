/* Pratinjau gambar di atas halaman (bukan pindah halaman atau mengunduh).

   1. Satu gambar: <a class="perbesar" href="gambar-besar.jpg"><img alt="..."></a>
      Dipakai untuk sampul.
   2. Pratinjau isi buku: <a class="lihat-isi" href=".../01.webp"
        data-galeri="../img/pratinjau/sma-0/" data-jumlah="16"
        data-judul="Jilid 0" data-unduh="<tautan PDF>" data-total="81">
      Gambar bernama 01.webp, 02.webp, ... di folder data-galeri.
      Dibalik dengan tombol, panah kiri/kanan, atau geser di ponsel.

   Tutup dengan tombol Tutup, Esc, atau klik di luar gambar.
   Tanpa JavaScript, tautan tetap membuka gambarnya (halaman pertama). */
(function () {
  var pemicu = document.querySelectorAll("a.perbesar, a.lihat-isi");
  if (!pemicu.length || typeof HTMLDialogElement !== "function") return;

  var dialog = document.createElement("dialog");
  dialog.className = "pratinjau";
  dialog.innerHTML =
    '<div class="bilah">' +
      '<span class="posisi" aria-live="polite"></span>' +
      '<a class="unduh-pdf" hidden>Unduh PDF</a>' +
      '<button class="tutup" type="button">Tutup</button>' +
    '</div>' +
    '<figure><img alt=""><figcaption></figcaption></figure>' +
    '<div class="akhir" hidden></div>' +
    '<div class="navigasi" hidden>' +
      '<button class="mundur" type="button" aria-label="Halaman sebelumnya">‹ Sebelumnya</button>' +
      '<button class="maju" type="button" aria-label="Halaman berikutnya">Berikutnya ›</button>' +
    '</div>';
  document.body.appendChild(dialog);

  var $ = function (sel) { return dialog.querySelector(sel); };
  var gambar = $("img"), keterangan = $("figcaption"), posisi = $(".posisi");
  var unduh = $(".unduh-pdf"), akhir = $(".akhir"), navigasi = $(".navigasi");
  var figur = $("figure"), mundur = $(".mundur"), maju = $(".maju");

  var galeri = null; /* { folder, jumlah, judul, unduh, total } */
  var indeks = 0;    /* 0..jumlah; indeks == jumlah adalah layar penutup */

  function nama(i) { return galeri.folder + (i < 9 ? "0" : "") + (i + 1) + ".webp"; }

  function tampilkan() {
    var penutup = indeks === galeri.jumlah;
    figur.hidden = penutup;
    akhir.hidden = !penutup;
    if (!penutup) {
      gambar.src = nama(indeks);
      gambar.alt = galeri.judul + ", halaman pratinjau " + (indeks + 1);
      posisi.textContent = galeri.judul + " · " + (indeks + 1) + " / " + galeri.jumlah;
      if (indeks + 1 < galeri.jumlah) new Image().src = nama(indeks + 1);
    } else {
      posisi.textContent = galeri.judul + " · selesai";
    }
    mundur.disabled = indeks === 0;
    maju.disabled = penutup;
    dialog.scrollTop = 0;
  }

  function geser(arah) {
    if (!galeri) return;
    var baru = indeks + arah;
    if (baru < 0 || baru > galeri.jumlah) return;
    indeks = baru;
    tampilkan();
  }

  function buka(a) {
    var kecil = a.querySelector("img");
    if (a.classList.contains("lihat-isi")) {
      galeri = {
        folder: a.getAttribute("data-galeri"),
        jumlah: parseInt(a.getAttribute("data-jumlah"), 10) || 1,
        judul: a.getAttribute("data-judul") || "",
        unduh: a.getAttribute("data-unduh"),
        total: a.getAttribute("data-total")
      };
      indeks = 0;
      dialog.classList.add("panjang");
      keterangan.textContent = "";
      unduh.href = galeri.unduh; unduh.hidden = !galeri.unduh;
      navigasi.hidden = false;
      akhir.innerHTML = "";
      var p = document.createElement("p");
      p.textContent = "Pratinjau berisi " + galeri.jumlah + " halaman pilihan" +
        (galeri.total ? " dari " + galeri.total + " halaman." : ".") +
        " Untuk membaca selengkapnya, unduh PDF-nya.";
      var t = document.createElement("a");
      t.className = "tombol"; t.href = galeri.unduh; t.textContent = "Unduh PDF " + galeri.judul;
      akhir.appendChild(p); akhir.appendChild(t);
      tampilkan();
    } else {
      galeri = null;
      dialog.classList.toggle("panjang", a.classList.contains("panjang"));
      figur.hidden = false; akhir.hidden = true; navigasi.hidden = true; unduh.hidden = true;
      gambar.src = a.href;
      gambar.alt = kecil ? kecil.alt : "";
      keterangan.textContent = gambar.alt;
      posisi.textContent = "";
    }
    document.documentElement.classList.add("pratinjau-buka");
    dialog.showModal();
    dialog.scrollTop = 0;
  }

  $(".tutup").addEventListener("click", function () { dialog.close(); });
  mundur.addEventListener("click", function () { geser(-1); });
  maju.addEventListener("click", function () { geser(1); });
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target === figur) dialog.close();
  });
  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") { e.preventDefault(); geser(1); }
    else if (e.key === "ArrowLeft") { e.preventDefault(); geser(-1); }
  });
  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("pratinjau-buka");
    gambar.removeAttribute("src");
    galeri = null;
  });

  /* Geser di layar sentuh: hanya gerakan yang jelas mendatar, agar gulir tetap normal. */
  var awalX = null, awalY = 0;
  dialog.addEventListener("touchstart", function (e) {
    if (e.touches.length !== 1) { awalX = null; return; }
    awalX = e.touches[0].clientX; awalY = e.touches[0].clientY;
  }, { passive: true });
  dialog.addEventListener("touchend", function (e) {
    if (awalX === null) return;
    var dx = e.changedTouches[0].clientX - awalX, dy = e.changedTouches[0].clientY - awalY;
    awalX = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > 2 * Math.abs(dy)) geser(dx < 0 ? 1 : -1);
  });

  Array.prototype.forEach.call(pemicu, function (a) {
    a.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      buka(a);
    });
  });
})();
