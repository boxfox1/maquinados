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

  // Form => mailto with origin in subject/body
  const form = $("#quoteForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const fd = new FormData(form);

      const name = (fd.get("name") || "").toString().trim();
      const company = (fd.get("company") || "").toString().trim();
      const phoneVal = (fd.get("phone") || "").toString().trim();
      const city = (fd.get("city") || "").toString().trim();
      const msg = (fd.get("msg") || "").toString().trim();

      const subject = `[${origin}] Cotización técnica`;
      const body = [
        `Origen: ${origin}`,
        "",
        `Nombre: ${name}`,
        `Empresa: ${company}`,
        `Tel/WhatsApp: ${phoneVal}`,
        `Ciudad: ${city}`,
        "",
        "Descripción / requisitos:",
        msg,
        "",
        "Adjuntos: enviar plano (PDF/DWG/STEP) en el correo o por WhatsApp.",
      ].join("\n");

      const mailto = `mailto:info@boxfox1.com?subject=${encodeURIComponent(
        subject,
      )}&body=${encodeURIComponent(body)}`;

      window.location.href = mailto;
    });
  }
})();
