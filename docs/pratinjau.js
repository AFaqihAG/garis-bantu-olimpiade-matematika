/* Pratinjau gambar: tautan <a class="perbesar" href="gambar-besar.jpg"> dibuka
   di atas halaman (bukan pindah halaman atau mengunduh). Tambahkan class "panjang"
   untuk gambar halaman buku, agar tampil selebar layar dan bisa digulir.
   Tutup dengan tombol Tutup, tombol Esc, atau klik di luar gambar.
   Tanpa JavaScript, tautan tetap membuka gambarnya biasa. */
(function () {
  var tautan = document.querySelectorAll("a.perbesar");
  if (!tautan.length || typeof HTMLDialogElement !== "function") return;

  var dialog = document.createElement("dialog");
  dialog.className = "pratinjau";
  dialog.innerHTML =
    '<button class="tutup" type="button">Tutup</button>' +
    '<figure><img alt=""><figcaption></figcaption></figure>';
  document.body.appendChild(dialog);

  var gambar = dialog.querySelector("img");
  var keterangan = dialog.querySelector("figcaption");

  function tutup() { dialog.close(); }

  dialog.querySelector(".tutup").addEventListener("click", tutup);
  dialog.addEventListener("click", function (e) {
    if (e.target === dialog || e.target.tagName === "FIGURE") tutup();
  });
  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("pratinjau-buka");
    gambar.removeAttribute("src");
  });

  Array.prototype.forEach.call(tautan, function (a) {
    a.addEventListener("click", function (e) {
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      var kecil = a.querySelector("img");
      var alt = kecil ? kecil.alt : "";
      dialog.classList.toggle("panjang", a.classList.contains("panjang"));
      gambar.src = a.href;
      gambar.alt = alt;
      keterangan.textContent = alt;
      document.documentElement.classList.add("pratinjau-buka");
      dialog.showModal();
      dialog.scrollTop = 0;
    });
  });
})();
