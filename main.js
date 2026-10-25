/* ============================================================
   DATA, DECODED. — interactions
   ============================================================ */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const canHover = window.matchMedia("(hover: hover)").matches;
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

  /* year + live clocks --------------------------------------- */
  const yearEl = $("#year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const clockEls = $$(".js-clock");
  const clockFormatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Jakarta",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  });
  const updateClocks = () => {
    const time = clockFormatter.format(new Date());
    clockEls.forEach((el) => { el.textContent = time; });
  };
  updateClocks();
  setInterval(updateClocks, 1000);

  /* hero micro decode ---------------------------------------- */
  const decodeEl = $(".js-decode");
  if (decodeEl && !reduceMotion) {
    const finalText = decodeEl.dataset.text || decodeEl.textContent.trim();
    const glyphs = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#/<>_";
    const frames = 26;
    let frame = 0;
    const timer = setInterval(() => {
      frame += 1;
      const settled = Math.floor((frame / frames) * finalText.length);
      decodeEl.textContent = finalText
        .split("")
        .map((char, i) => {
          if (char === " " || i < settled) return char;
          return glyphs[Math.floor(Math.random() * glyphs.length)];
        })
        .join("");
      if (frame >= frames) {
        clearInterval(timer);
        decodeEl.textContent = finalText;
      }
    }, 34);
  }

  /* scroll reveals ------------------------------------------- */
  const revealItems = $$("[data-reveal]");
  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -6% 0px" }
    );
    revealItems.forEach((el) => revealObserver.observe(el));
  }

  /* capability bars ------------------------------------------ */
  const barsEl = $("[data-bars]");
  if (barsEl) {
    if (reduceMotion || !("IntersectionObserver" in window)) {
      barsEl.classList.add("is-visible");
    } else {
      const barsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            barsEl.classList.add("is-visible");
            barsObserver.disconnect();
          });
        },
        { threshold: 0.35 }
      );
      barsObserver.observe(barsEl);
    }
  }

  /* animated counters ---------------------------------------- */
  const statsEl = $(".about-stats");
  if (statsEl) {
    const counters = $$("[data-count]", statsEl);
    const runCounter = (el) => {
      const target = parseFloat(el.dataset.count);
      const decimals = (el.dataset.count.split(".")[1] || "").length;
      const suffix = el.dataset.suffix || "";
      const pad = parseInt(el.dataset.pad || "0", 10);
      if (Number.isNaN(target)) return;
      if (reduceMotion) {
        el.textContent = String(target.toFixed(decimals)).padStart(pad, "0") + suffix;
        return;
      }
      const duration = 1400;
      const start = performance.now();
      const step = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        let value = (target * eased).toFixed(decimals);
        if (pad) value = value.padStart(pad, "0");
        el.textContent = value + suffix;
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    if (reduceMotion || !("IntersectionObserver" in window)) {
      counters.forEach(runCounter);
    } else {
      const statsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            counters.forEach(runCounter);
            statsObserver.disconnect();
          });
        },
        { threshold: 0.4 }
      );
      statsObserver.observe(statsEl);
    }
  }

  /* draw SVG paths ------------------------------------------- */
  const drawPaths = $$(".draw-path");
  if (!reduceMotion && drawPaths.length) {
    drawPaths.forEach((path) => {
      const length = path.getTotalLength();
      path.style.strokeDasharray = `${length}`;
      path.style.strokeDashoffset = `${length}`;
    });
    const drawObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          $$(".draw-path", entry.target).forEach((path) => {
            path.style.strokeDashoffset = "0";
          });
          drawObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.3 }
    );
    $$(".project").forEach((project) => drawObserver.observe(project));
  }

  /* id card pointer tilt ------------------------------------- */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach((card) => {
      const layer = $("[data-tilt-layer]", card);
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width - 0.5;
        const py = (event.clientY - rect.top) / rect.height - 0.5;
        card.style.setProperty("--tilt-x", `${(-py * 2.2).toFixed(2)}deg`);
        card.style.setProperty("--tilt-y", `${(px * 2.6).toFixed(2)}deg`);
        if (layer) {
          layer.style.setProperty("--mx", px.toFixed(3));
          layer.style.setProperty("--my", py.toFixed(3));
        }
      });
      card.addEventListener("pointerleave", () => {
        card.style.setProperty("--tilt-x", "0deg");
        card.style.setProperty("--tilt-y", "0deg");
        if (layer) {
          layer.style.setProperty("--mx", "0");
          layer.style.setProperty("--my", "0");
        }
      });
    });
  }

  /* custom cursor -------------------------------------------- */
  if (finePointer && !reduceMotion) {
    const cursor = $("#cursor");
    if (cursor) {
      document.body.classList.add("has-cursor");
      let hasMoved = false;
      const moveCursor = (event) => {
        cursor.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
        if (!hasMoved) {
          hasMoved = true;
          cursor.classList.add("is-on");
        }
      };
      window.addEventListener("pointermove", moveCursor, { passive: true });
      document.addEventListener("pointerleave", () => {
        cursor.classList.remove("is-on");
        hasMoved = false;
      });
      document.addEventListener("pointerover", (event) => {
        if (event.target.closest("a, button, [data-case-open], .project")) {
          cursor.classList.add("is-hover");
        }
      });
      document.addEventListener("pointerout", (event) => {
        if (event.target.closest("a, button, [data-case-open], .project")) {
          cursor.classList.remove("is-hover");
        }
      });
    }
  }

  /* header, progress, scrollspy ----------------------------- */
  const header = $("#siteHeader");
  const progress = $("#scrollProgress");
  let scrollQueued = false;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) header.classList.toggle("is-scrolled", y > 12);
    if (progress) {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = `${max > 0 ? Math.min((y / max) * 100, 100) : 0}%`;
    }
    scrollQueued = false;
  };
  window.addEventListener(
    "scroll",
    () => {
      if (scrollQueued) return;
      scrollQueued = true;
      requestAnimationFrame(onScroll);
    },
    { passive: true }
  );
  onScroll();

  const navLinks = $$("[data-nav]");
  const spySections = navLinks
    .map((link) => $(link.getAttribute("href")))
    .filter(Boolean);
  if (spySections.length && "IntersectionObserver" in window) {
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          navLinks.forEach((link) => {
            link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
          });
        });
      },
      { rootMargin: "-38% 0px -55% 0px", threshold: 0 }
    );
    spySections.forEach((section) => spy.observe(section));
  }

  /* grid overlay --------------------------------------------- */
  const gridToggle = $("#gridToggle");
  const gridOverlay = $("#gridOverlay");
  let gridOn = false;
  const setGrid = (on) => {
    gridOn = on;
    if (gridOverlay) gridOverlay.classList.toggle("is-on", on);
    if (gridToggle) gridToggle.setAttribute("aria-pressed", String(on));
  };
  if (gridToggle) gridToggle.addEventListener("click", () => setGrid(!gridOn));

  /* dialogs -------------------------------------------------- */
  const menuDialog = $("#menuDialog");
  const menuBtn = $("#menuBtn");
  const syncBodyLock = () => {
    const openDialog = $("dialog[open]");
    document.body.classList.toggle("is-locked", Boolean(openDialog));
    document.body.classList.toggle("dialog-open", Boolean(openDialog));
    if (menuBtn && menuDialog) {
      menuBtn.setAttribute("aria-expanded", String(menuDialog.open));
    }
  };

  const openMenu = () => {
    if (!menuDialog) return;
    menuDialog.showModal();
    syncBodyLock();
  };
  if (menuBtn && menuDialog) {
    menuBtn.addEventListener("click", openMenu);
    $$("[data-menu-close]", menuDialog).forEach((btn) =>
      btn.addEventListener("click", () => menuDialog.close())
    );
    $$("[data-menu-link]", menuDialog).forEach((link) =>
      link.addEventListener("click", () => menuDialog.close())
    );
    menuDialog.addEventListener("close", syncBodyLock);
    menuDialog.addEventListener("click", (event) => {
      if (event.target === menuDialog) menuDialog.close();
    });
  }

  /* case files ----------------------------------------------- */
  const cases = {
    retail: {
      index: "01",
      title: "Retail Pulse",
      kicker: "Analytics dashboard / commerce",
      summary: "One live trading view for a 14-store fashion retailer — stock, sell-through and margin in a single Monday-morning glance.",
      brief: "Fourteen stores, six channels, and a Monday trade meeting powered by screenshots and stale spreadsheets. The team could see last week's sales, but not what to do about this week's stock.",
      decode: "I rebuilt the sales model around three questions: what's selling, what's stuck, and what's about to run out. A single trading dashboard surfaced sell-through, weeks of cover and margin alerts — with one shared definition of revenue.",
      result: "The Monday report went from four hours to twelve minutes. More importantly, the team started arguing about decisions instead of arguing about numbers.",
      specs: [["Role", "Data analyst & dashboard designer"], ["Timeline", "6 weeks / 2026"], ["Stack", "SQL · BigQuery · Tableau · Figma"]],
      outcomes: [["−94%", "Reporting time"], ["14", "Stores, one view"], ["12 min", "Monday ritual"]],
      tags: ["SQL", "BigQuery", "Tableau", "Figma"],
      accent: "sand"
    },
    civic: {
      index: "02",
      title: "Civic Flow",
      kicker: "Data story / public data",
      summary: "An interactive essay tracing 1.2 million commuter trips through the city — and the twelve corridors carrying most of them.",
      brief: "A public mobility dataset with 1.2 million rows and no obvious story. My brief to myself: make the invisible shape of a commute legible to someone with thirty seconds and no data background.",
      decode: "I cleaned and clustered the trips, then built a scroll-driven essay around one idea: the city runs on twelve corridors. Maps, small multiples and annotations reveal where the network works — and where it quietly fails.",
      result: "A 200MB file became a five-minute read. The finished piece became my most-shared experiment, and a reusable template for future public-data stories.",
      specs: [["Role", "Data analyst & visual designer"], ["Timeline", "8 weeks / 2025"], ["Stack", "Python · GeoPandas · D3.js"]],
      outcomes: [["1.2M", "Trips traced"], ["12", "Key corridors"], ["05 min", "Reading time"]],
      tags: ["Python", "GeoPandas", "D3.js", "Data story"],
      accent: "red"
    },
    kopi: {
      index: "03",
      title: "Kopi Ledger",
      kicker: "Product concept / finance tool",
      summary: "A calm, glanceable ledger that helps independent coffee shops see margin per cup — without a single spreadsheet.",
      brief: "Independent cafés juggle rising bean prices with gut-feel pricing. Most tools show revenue; almost none show the margin hiding inside every cup.",
      decode: "I designed a one-screen ledger around a single number: margin per cup. The interface pairs a simple daily close with ingredient costs and a visual breakdown, so owners can adjust a price before the month is gone.",
      result: "A working prototype tested with three café owners. The verdict: the first finance tool they didn't need a tutorial for.",
      specs: [["Role", "Product designer & front-end"], ["Timeline", "5 weeks / 2025"], ["Stack", "React · TypeScript · Supabase"]],
      outcomes: [["68%", "Average margin"], ["03", "Cafés tested"], ["00", "Spreadsheets"]],
      tags: ["React", "TypeScript", "Supabase", "Product"],
      accent: "ink"
    },
    notes: {
      index: "04",
      title: "Field Notes",
      kicker: "Self-initiated / editorial data journal",
      summary: "A visual journal: one public dataset, one story, one issue at a time. No dashboards — just the joy of looking closely.",
      brief: "A monthly excuse to practise the part of data work I love most: noticing. Each issue starts with a public dataset and a question that won't leave me alone.",
      decode: "Twelve issues so far — from rainfall rhythms to the geography of night buses. Each one is designed as a small, printed-feeling spread, built to be read in five minutes and kept for longer.",
      result: "A growing library of visual essays, and a reliable way to stay curious between client projects.",
      specs: [["Role", "Editor, designer & builder"], ["Timeline", "Ongoing / 2026—now"], ["Stack", "Svelte · SVG · Editorial"]],
      outcomes: [["12", "Issues shipped"], ["12", "Open datasets"], ["01", "Curious habit"]],
      tags: ["Svelte", "SVG", "Editorial", "Open data"],
      accent: "orange"
    }
  };
  const caseOrder = ["retail", "civic", "kopi", "notes"];

  const caseDialog = $("#caseDialog");
  let activeCase = null;

  const fillCase = (key) => {
    const data = cases[key];
    if (!caseDialog || !data) return;
    activeCase = key;
    caseDialog.dataset.accent = data.accent;
    const set = (id, value) => {
      const el = $(`#${id}`);
      if (el) el.textContent = value;
    };
    set("caseFileIndex", data.index);
    set("caseIndex", data.index);
    set("caseKicker", data.kicker);
    set("caseTitle", data.title);
    set("caseSummary", data.summary);
    set("caseBrief", data.brief);
    set("caseDecode", data.decode);
    set("caseResult", data.result);

    const specs = $("#caseSpecs");
    if (specs) {
      specs.replaceChildren(
        ...data.specs.map(([label, value]) => {
          const wrap = document.createElement("div");
          const dt = document.createElement("dt");
          const dd = document.createElement("dd");
          dt.textContent = label;
          dd.textContent = value;
          wrap.append(dt, dd);
          return wrap;
        })
      );
    }
    const outcomes = $("#caseOutcomes");
    if (outcomes) {
      outcomes.replaceChildren(
        ...data.outcomes.map(([value, label]) => {
          const wrap = document.createElement("div");
          wrap.className = "case-dialog__outcome";
          const strong = document.createElement("strong");
          const span = document.createElement("span");
          strong.textContent = value;
          span.textContent = label;
          wrap.append(strong, span);
          return wrap;
        })
      );
    }
    const tags = $("#caseTags");
    if (tags) {
      tags.replaceChildren(
        ...data.tags.map((tag) => {
          const li = document.createElement("li");
          li.textContent = tag;
          return li;
        })
      );
    }
  };

  const openCase = (key) => {
    if (!caseDialog || !cases[key]) return;
    fillCase(key);
    if (!caseDialog.open) caseDialog.showModal();
    caseDialog.scrollTop = 0;
    syncBodyLock();
  };

  $$("[data-case-open]").forEach((btn) => {
    btn.addEventListener("click", () => openCase(btn.dataset.caseOpen));
  });
  if (caseDialog) {
    $$("[data-case-close]", caseDialog).forEach((btn) =>
      btn.addEventListener("click", () => caseDialog.close())
    );
    caseDialog.addEventListener("close", syncBodyLock);
    caseDialog.addEventListener("click", (event) => {
      if (event.target === caseDialog) caseDialog.close();
    });
    const prevBtn = $("[data-case-prev]", caseDialog);
    const nextBtn = $("[data-case-next]", caseDialog);
    const cycle = (dir) => {
      if (!activeCase) return;
      const current = caseOrder.indexOf(activeCase);
      const next = (current + dir + caseOrder.length) % caseOrder.length;
      fillCase(caseOrder[next]);
      caseDialog.scrollTop = 0;
    };
    if (prevBtn) prevBtn.addEventListener("click", () => cycle(-1));
    if (nextBtn) nextBtn.addEventListener("click", () => cycle(1));
  }

  /* keyboard shortcuts --------------------------------------- */
  document.addEventListener("keydown", (event) => {
    const tag = document.activeElement ? document.activeElement.tagName : "";
    const typing = /INPUT|TEXTAREA|SELECT/.test(tag);
    const dialogOpen = Boolean($("dialog[open]"));
    if ((event.key === "g" || event.key === "G") && !typing && !event.metaKey && !event.ctrlKey && !event.altKey && !dialogOpen) {
      event.preventDefault();
      setGrid(!gridOn);
    }
    if (event.key === "Escape" && gridOn && !dialogOpen) {
      setGrid(false);
    }
  });

  /* keep footer/contact time fresh in view ------------------- */
  if (canHover) document.documentElement.classList.add("can-hover");
})();
