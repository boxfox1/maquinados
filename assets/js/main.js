(() => {
  const $ = (s) => document.querySelector(s);

  // Year
  const y = $("#y");
  if (y) y.textContent = new Date().getFullYear();

  // Mobile nav
  const navBtn = $(".navbtn");
  const nav = $(".nav");

  if (navBtn && nav) {
    navBtn.addEventListener("click", () => {
      const open = nav.classList.toggle("open");
      navBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });

    nav.addEventListener("click", (e) => {
      if (e.target && e.target.tagName === "A") nav.classList.remove("open");
    });

    document.addEventListener("click", (e) => {
      const inside = nav.contains(e.target) || navBtn.contains(e.target);
      if (!inside) nav.classList.remove("open");
    });
  }

  // WhatsApp link with origin
  const origin = "maquinados.boxfox1.com";
  const phone = "524444989198";
  const waBase = `https://wa.me/${phone}`;
  const waText = (msg) =>
    `${waBase}?text=${encodeURIComponent(`[${origin}] ${msg}`)}`;

  const btnWhatsTop = $("#btnWhatsTop");
  const btnWhatsBottom = $("#btnWhatsBottom");
  const footerWhats = $("#footerWhats");

  const defaultWA =
    "Hola, quiero cotizar un maquinado. Enviaré plano/muestra. ¿Qué información necesitas (material, tolerancias, cantidad, fecha)?";

  [btnWhatsTop, btnWhatsBottom, footerWhats].forEach((el) => {
    if (el) el.href = waText(defaultWA);
  });

  // Lightbox gallery
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  const btnClose = lb ? lb.querySelector(".lb-close") : null;
  const btnPrev = lb ? lb.querySelector(".lb-prev") : null;
  const btnNext = lb ? lb.querySelector(".lb-next") : null;

  const items = Array.from(
    document.querySelectorAll('img[data-gallery="maquinados"]'),
  );

  let idx = 0;
  let prevOverflow = "";

  function openLB(i) {
    if (!lb || !lbImg || !items.length) return;
    idx = i;

    const el = items[idx];
    if (!el) return;

    lbImg.src = el.currentSrc || el.src;
    lbImg.alt = el.alt || "Imagen";
    if (lbCap) lbCap.textContent = el.alt || "";

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");

    prevOverflow = document.body.style.overflow || "";
    document.body.style.overflow = "hidden";
  }

  function closeLB() {
    if (!lb || !lbImg) return;
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = prevOverflow;
    lbImg.src = "";
  }

  function prev() {
    if (!items.length) return;
    openLB((idx - 1 + items.length) % items.length);
  }

  function next() {
    if (!items.length) return;
    openLB((idx + 1) % items.length);
  }

  if (lb && items.length) {
    items.forEach((img, i) => {
      img.addEventListener("click", () => openLB(i));
    });

    if (btnClose) btnClose.addEventListener("click", closeLB);
    if (btnPrev) btnPrev.addEventListener("click", prev);
    if (btnNext) btnNext.addEventListener("click", next);

    lb.addEventListener("click", (e) => {
      if (e.target === lb) closeLB();
    });

    window.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });
  }
})();
