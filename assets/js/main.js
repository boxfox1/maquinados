/* =========================================================
FILE: /assets/js/main.js  (maquinados.boxfox1.com) — V3 stable
- menu móvil
- modal privacidad estable
- scroll lock con contador
- lightbox gallery
========================================================= */
(function () {
  const header = document.querySelector("[data-cabecera]");
  const navBtn = document.querySelector("[data-navbtn]");
  const panel = document.querySelector("[data-panel]");

  // Shadow header
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-shadow", window.scrollY > 6);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // Scroll lock counter (panel + modal + lightbox)
  let lockCount = 0;
  const lockScroll = () => {
    lockCount += 1;
    if (lockCount === 1) document.documentElement.style.overflow = "hidden";
  };
  const unlockScroll = () => {
    lockCount = Math.max(0, lockCount - 1);
    if (lockCount === 0) document.documentElement.style.overflow = "";
  };

  // Panel móvil
  const isPanelOpen = () => panel && panel.classList.contains("is-open");
  const setPanel = (open) => {
    if (!panel || !navBtn) return;
    const willOpen = !!open;
    const isOpenNow = isPanelOpen();
    if (willOpen === isOpenNow) return;

    panel.classList.toggle("is-open", willOpen);
    panel.setAttribute("aria-hidden", willOpen ? "false" : "true");
    navBtn.setAttribute("aria-expanded", willOpen ? "true" : "false");

    if (willOpen) lockScroll();
    else unlockScroll();
  };

  if (navBtn && panel) {
    navBtn.addEventListener("click", () => setPanel(!isPanelOpen()));

    panel.addEventListener("click", (e) => {
      const a = e.target.closest("a");
      if (a) setPanel(false);
    });

    document.addEventListener("click", (e) => {
      if (!isPanelOpen()) return;
      const clickedBtn = navBtn.contains(e.target);
      const clickedPanel = panel.contains(e.target);
      if (!clickedBtn && !clickedPanel) setPanel(false);
    });
  }

  // Modal privacidad
  const modal = document.getElementById("privacyModal");
  const openers = document.querySelectorAll("[data-open-privacy]");
  const closers = modal ? modal.querySelectorAll("[data-modal-close]") : [];
  let lastFocusEl = null;

  const isModalOpen = () => modal && modal.classList.contains("is-open");

  const openModal = (triggerEl) => {
    if (!modal || isModalOpen()) return;

    lastFocusEl = triggerEl || document.activeElement;

    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    lockScroll();

    const closeBtn = modal.querySelector("[data-modal-close]");
    if (closeBtn) closeBtn.focus({ preventScroll: true });
  };

  const closeModal = () => {
    if (!modal || !isModalOpen()) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    unlockScroll();

    if (lastFocusEl && typeof lastFocusEl.focus === "function") {
      lastFocusEl.focus({ preventScroll: true });
    }
    lastFocusEl = null;
  };

  openers.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      openModal(el);
    })
  );

  closers.forEach((el) =>
    el.addEventListener("click", (e) => {
      e.preventDefault();
      closeModal();
    })
  );

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target && e.target.hasAttribute("data-modal-close")) {
        e.preventDefault();
        closeModal();
      }
    });
  }

  // Lightbox
  const lb = document.getElementById("lightbox");
  const lbImg = document.getElementById("lbImg");
  const lbCap = document.getElementById("lbCap");
  const btnClose = lb ? lb.querySelector(".lb-close") : null;
  const btnPrev = lb ? lb.querySelector(".lb-prev") : null;
  const btnNext = lb ? lb.querySelector(".lb-next") : null;

  const items = Array.from(document.querySelectorAll('img[data-gallery="maquinados"]'));
  let idx = 0;

  const isLBOpen = () => lb && lb.classList.contains("open");

  const openLB = (i) => {
    if (!lb || !lbImg || !items.length) return;

    idx = ((i % items.length) + items.length) % items.length;
    const el = items[idx];
    if (!el) return;

    lbImg.src = el.currentSrc || el.src;
    lbImg.alt = el.alt || "Imagen";
    if (lbCap) lbCap.textContent = el.alt || "";

    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    lockScroll();
  };

  const closeLB = () => {
    if (!lb || !lbImg || !isLBOpen()) return;

    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    lbImg.src = "";
    unlockScroll();
  };

  const prev = () => openLB(idx - 1);
  const next = () => openLB(idx + 1);

  if (lb && items.length) {
    items.forEach((img, i) => {
      img.addEventListener("click", (e) => {
        e.preventDefault();
        openLB(i);
      });
      const fig = img.closest("figure");
      if (fig) {
        fig.addEventListener("click", (e) => {
          if (e.target === img) return;
          e.preventDefault();
          openLB(i);
        });
      }
    });

    btnClose && btnClose.addEventListener("click", closeLB);
    btnPrev && btnPrev.addEventListener("click", prev);
    btnNext && btnNext.addEventListener("click", next);

    lb.addEventListener("click", (e) => {
      const clickedButton = e.target.closest(".lb-btn");
      const clickedImage = e.target === lbImg;
      if (!clickedButton && !clickedImage && e.target === lb) closeLB();
    });
  }

  // ESC cierra: modal primero, luego lightbox, luego panel
  window.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;

    if (isModalOpen()) {
      closeModal();
      return;
    }
    if (isLBOpen()) {
      closeLB();
      return;
    }
    if (isPanelOpen()) setPanel(false);
  });
})();