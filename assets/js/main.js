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
      const a = e.target.closest("a");
      if (a) nav.classList.remove("open");
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
  const footerWhats = $("#footerWhats");

  const defaultWA =
    "Hola, quiero cotizar un maquinado. Enviaré plano/muestra. ¿Qué información necesitas (material, tolerancias, cantidad, fecha)?";

  [btnWhatsTop, footerWhats].forEach((el) => {
    if (el) el.href = waText(defaultWA);
  });

  // Lightbox gallery
  const lb = $("#lightbox");
  const lbImg = $("#lbImg");
  const lbCap = $("#lbCap");

  const btnClose = lb ? lb.querySelector(".lb-close") : null;
  const btnPrev = lb ? lb.querySelector(".lb-prev") : null;
  const btnNext = lb ? lb.querySelector(".lb-next") : null;

  const items = Array.from(
    document.querySelectorAll('img[data-gallery="maquinados"]'),
  );

  let idx = 0;
  let prevBodyOverflow = "";

  function setScrollLock(lock) {
    // Important: lock/unlock scroll safely
    if (lock) {
      prevBodyOverflow = document.body.style.overflow || "";
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = prevBodyOverflow;
    }
  }

  function openLB(i) {
    if (!lb || !lbImg || !items.length) return;

    idx = ((i % items.length) + items.length) % items.length;
    const el = items[idx];
    if (!el) return;

    lbImg.src = el.currentSrc || el.src;
    lbImg.alt = el.alt || "Imagen";
    if (lbCap) lbCap.textContent = el.alt || "";

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    setScrollLock(true);
  }

  function closeLB() {
    if (!lb || !lbImg) return;

    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    setScrollLock(false);
  }

  function prev() {
    if (!items.length) return;
    openLB(idx - 1);
  }

  function next() {
    if (!items.length) return;
    openLB(idx + 1);
  }

  if (lb && items.length) {
    // Make images & figures clickable (móvil)
    items.forEach((img, i) => {
      img.style.cursor = "zoom-in";
      img.addEventListener("click", (e) => {
        e.preventDefault();
        openLB(i);
      });

      const fig = img.closest("figure");
      if (fig) {
        fig.style.cursor = "zoom-in";
        fig.addEventListener("click", (e) => {
          // evita doble disparo
          if (e.target === img) return;
          e.preventDefault();
          openLB(i);
        });
      }
    });

    btnClose && btnClose.addEventListener("click", closeLB);
    btnPrev && btnPrev.addEventListener("click", prev);
    btnNext && btnNext.addEventListener("click", next);

    // Cerrar si dan click en el fondo (no sobre la imagen/botones)
    lb.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".lb-btn");
      const clickedImage = e.target === lbImg;
      if (!clickedButton && !clickedImage && e.target === lb) closeLB();
    });

    // Teclado
    window.addEventListener("keydown", (e) => {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLB();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    });

    // Seguridad: si por cualquier razón el lightbox pierde el estado,
    // re-habilita scroll
    window.addEventListener("focus", () => {
      if (!lb.classList.contains("open")) setScrollLock(false);
    });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden && lb.classList.contains("open")) return;
      if (!lb.classList.contains("open")) setScrollLock(false);
    });
  } else {
    // Si no hay lightbox, asegúrate que nunca quede scroll bloqueado
    document.body.style.overflow = "";
  }
  // Seguridad: nunca dejar el body sin scroll si el lightbox NO está abierto
  setInterval(() => {
    const lb = document.getElementById("lightbox");
    if (!lb || !lb.classList.contains("open")) {
      if (document.body.style.overflow === "hidden")
        document.body.style.overflow = "";
    }
  }, 500);
  /* ==============================
   WhatsApp flotante delayed
============================== */

window.addEventListener("load", () => {
  const waFloat = document.querySelector(".wa-float");

  if (!waFloat) return;

  waFloat.style.opacity = "0";
  waFloat.style.transform = "translateY(20px)";
  waFloat.style.pointerEvents = "none";

  setTimeout(() => {
    waFloat.style.transition = "all .45s ease";
    waFloat.style.opacity = "1";
    waFloat.style.transform = "translateY(0)";
    waFloat.style.pointerEvents = "auto";
  }, 4000); // 4 segundos
});

})();
