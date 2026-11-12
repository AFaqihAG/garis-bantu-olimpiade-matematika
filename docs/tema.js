/* Tombol tema di masthead: beralih antara terang (default) dan gelap.
   Pilihan disimpan di localStorage dengan kunci "tema". */
(function () {
  var root = document.documentElement;
  var tombol = document.querySelector(".tema");
  if (!tombol) return;

  function tampilkan(gelap) {
    tombol.textContent = gelap ? "Light" : "Dark";
    tombol.setAttribute("aria-label", gelap ? "Ganti ke mode terang" : "Ganti ke mode gelap");
  }

  tampilkan(root.getAttribute("data-theme") === "dark");
  tombol.hidden = false;

  tombol.addEventListener("click", function () {
    var gelap = root.getAttribute("data-theme") !== "dark";
    if (gelap) root.setAttribute("data-theme", "dark");
    else root.removeAttribute("data-theme");
    try { localStorage.setItem("tema", gelap ? "dark" : "light"); } catch (e) {}
    tampilkan(gelap);
  });
})();
