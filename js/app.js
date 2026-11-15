/**
 * ==============================================================================
 * ANAHouse - MASTER APPLICATION CONTROLLER (app.js)
 * Dedicated Free Fire Store (Local & Trusted)
 * Default Theme: LIGHT MODE
 * ==============================================================================
 */

(function () {
  "use strict";

  const AppState = {
    currentSection: "panel",
    theme: "light"
  };

  /* ============================================================================
     1. TOAST NOTIFICATIONS
     ============================================================================ */
  function showToast(message, type = "info") {
    const container = document.getElementById("toast-container");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = "cyber-toast";
    const icon = type === "error" ? "⚠️" : type === "success" ? "✓" : "⚡";
    toast.innerHTML = `<span>${icon}</span><span>${message}</span>`;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(8px)";
      toast.style.transition = "opacity 0.25s ease, transform 0.25s ease";
      setTimeout(() => toast.remove(), 250);
    }, 2800);
  }

  /* ============================================================================
     2. CINEMATIC HACKER BOOT INTRO SCREEN (SHAKY, GLITCHY & SCRAMBLER)
     ============================================================================ */
  function initBootScreen() {
    const bootScreen = document.getElementById("cyber-boot-screen");
    const progressFill = document.getElementById("boot-progress-fill");
    const skipBtn = document.getElementById("btn-skip-boot");
    const scrambleTitle = document.getElementById("hacker-scramble-text");

    if (!bootScreen) return;

    const hasSeenBoot = sessionStorage.getItem("ana_boot_done");
    if (!CONFIG.theme.enableBootScreen || hasSeenBoot) {
      bootScreen.style.display = "none";
      return;
    }

    const duration = 2100;
    const startTime = Date.now();

    // Rapid Hacker Text Scramble Effect for ANAHOUSE
    const chars = "!@#$%^&*()_+-=~<>{}[]0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const targetWord = "ANAHOUSE";
    let scrambleInterval = null;
    let scrambleIteration = 0;

    if (scrambleTitle) {
      scrambleInterval = setInterval(() => {
        scrambleTitle.innerText = targetWord
          .split("")
          .map((letter, index) => {
            if (index < scrambleIteration) {
              return targetWord[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("");

        if (scrambleIteration >= targetWord.length) {
          clearInterval(scrambleInterval);
          scrambleTitle.innerText = targetWord;
        }
        scrambleIteration += 1 / 3;
      }, 35);
    }

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      if (progressFill) progressFill.style.width = pct + "%";

      if (elapsed >= duration) {
        clearInterval(progressInterval);
        dismissBoot();
      }
    }, 25);

    function dismissBoot() {
      clearInterval(progressInterval);
      if (scrambleInterval) clearInterval(scrambleInterval);
      bootScreen.classList.add("fade-out");
      sessionStorage.setItem("ana_boot_done", "true");
      setTimeout(() => {
        bootScreen.style.display = "none";
      }, 420);
    }

    if (skipBtn) {
      skipBtn.addEventListener("click", dismissBoot);
    }

    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && bootScreen.style.display !== "none") {
        dismissBoot();
      }
    });
  }

  /* ============================================================================
     3. THEME CONTROLS (LIGHT MODE DEFAULT)
     ============================================================================ */
  function initTheme() {
    const savedTheme = localStorage.getItem("ana_theme") || CONFIG.theme.defaultTheme || "light";
    AppState.theme = savedTheme;
    document.documentElement.setAttribute("data-theme", savedTheme);

    const themeBtn = document.getElementById("btn-toggle-theme");
    const themeIcon = document.getElementById("theme-icon");
    if (themeIcon) themeIcon.textContent = savedTheme === "light" ? "☀️" : "🌙";

    if (themeBtn) {
      themeBtn.addEventListener("click", () => {
        AppState.theme = AppState.theme === "light" ? "dark" : "light";
        localStorage.setItem("ana_theme", AppState.theme);
        document.documentElement.setAttribute("data-theme", AppState.theme);
        if (themeIcon) themeIcon.textContent = AppState.theme === "light" ? "☀️" : "🌙";
        showToast(`Theme: ${AppState.theme.toUpperCase()}`);
      });
    }
  }

  /* ============================================================================
     4. SECTION NAVIGATION
     ============================================================================ */
  function initNavigation() {
    const desktopButtons = document.querySelectorAll(".desktop-nav .nav-link-btn");
    const mobileButtons = document.querySelectorAll(".mobile-bottom-nav .mobile-nav-item");

    function switchSection(sectionId) {
      if (!["panel", "topup", "rank", "ids"].includes(sectionId)) return;

      AppState.currentSection = sectionId;

      document.querySelectorAll(".section-view").forEach((view) => {
        view.classList.remove("active-section");
      });
      const activeEl = document.getElementById(`section-${sectionId}`);
      if (activeEl) activeEl.classList.add("active-section");

      desktopButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-section") === sectionId);
      });

      mobileButtons.forEach((btn) => {
        btn.classList.toggle("active", btn.getAttribute("data-section") === sectionId);
      });

      if (window.location.hash !== `#${sectionId}`) {
        history.replaceState(null, "", `#${sectionId}`);
      }

      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    desktopButtons.forEach((btn) => {
      btn.addEventListener("click", () => switchSection(btn.getAttribute("data-section")));
    });

    mobileButtons.forEach((btn) => {
      btn.addEventListener("click", () => switchSection(btn.getAttribute("data-section")));
    });

    const initialHash = window.location.hash.replace("#", "");
    if (["panel", "topup", "rank", "ids"].includes(initialHash)) {
      switchSection(initialHash);
    } else {
      switchSection("panel");
    }

    window.addEventListener("hashchange", () => {
      const hash = window.location.hash.replace("#", "");
      if (["panel", "topup", "rank", "ids"].includes(hash)) {
        switchSection(hash);
      }
    });
  }

  /* ============================================================================
     5. HIGH-END VIDEO MODAL (BEAUTIFUL FLOATING CLOSE BUTTON)
     ============================================================================ */
  function normalizeVideoUrl(videoUrl) {
    if (!videoUrl) return "";
    if (videoUrl.includes("drive.google.com")) {
      const match = videoUrl.match(/\/d\/([a-zA-Z0-9_-]+)/);
      if (match && match[1]) {
        return `https://drive.google.com/file/d/${match[1]}/preview`;
      }
      return videoUrl.replace(/\/view(\?.*)?$/, "/preview");
    }
    return videoUrl;
  }

  function openVideoModal(videoUrl, title) {
    const modal = document.getElementById("modal-video-player");
    const container = document.getElementById("video-player-container");
    const titleEl = document.getElementById("video-modal-title");

    if (!modal || !container) return;

    if (titleEl) titleEl.textContent = title || "Product Demo Preview";
    container.innerHTML = "";

    const cleanUrl = normalizeVideoUrl(videoUrl);

    if (cleanUrl.includes("drive.google.com") || cleanUrl.includes("youtube.com")) {
      container.innerHTML = `
        <iframe src="${cleanUrl}" width="100%" height="100%" frameborder="0" allow="autoplay; encrypted-media; fullscreen" allowfullscreen style="position: absolute; inset: 0; width: 100%; height: 100%;"></iframe>
      `;
    } else {
      container.innerHTML = `
        <video src="${cleanUrl}" controls autoplay playsinline controlsList="nodownload" style="width: 100%; height: 100%; object-fit: contain; background: #000;"></video>
      `;
    }

    openModal(modal);
  }

  /* ============================================================================
     6. SECTION 1: PANELS (EXACTLY 2 VERIFIED PANELS)
     ============================================================================ */
  function renderPanels() {
    const grid = document.getElementById("panel-cards-grid");
    if (!grid) return;

    grid.innerHTML = "";

    const targetPhone = (CONFIG.contact.whatsappNumber || "919876543210").replace(/[^0-9]/g, "");

    PRODUCTS_CONFIG.panelProducts.forEach((product) => {
      const card = document.createElement("article");
      card.className = "cyber-card";
      card.id = `panel-${product.id}`;

      const badgeHtml = product.badge
        ? `<span class="card-badge">${escapeHtml(product.badge)}</span>`
        : "";

      const featuresHtml = (product.features || [])
        .map((f) => `<li class="card-feature-item">${escapeHtml(f)}</li>`)
        .join("");

      const hasVideo = !!product.video;

      const waBuyMsg = encodeURIComponent(`Hello ANAHouse, I want to buy the Free Fire VIP Panel: ${product.title} (Price: ${PricingEngine.format(product.price)}).`);

      card.innerHTML = `
        ${badgeHtml}

        <div class="card-media-wrapper" data-product-id="${product.id}" tabindex="0">
          <img src="${escapeHtml(product.image)}" alt="${escapeHtml(product.title)}" class="card-img-preview" loading="lazy">
          
          ${hasVideo ? `<video class="card-video-preview" src="${escapeHtml(product.video)}" muted loop playsinline preload="none"></video>` : ""}
          
          <div class="hold-progress-overlay">
            <div class="hold-spinner"></div>
            <div class="hold-hint-text">PLAYING PREVIEW</div>
          </div>

          ${hasVideo ? `
            <button class="btn-watch-demo" type="button" title="Click to watch full video">
              <span>▶</span>
              <span>WATCH DEMO</span>
            </button>
          ` : ""}
        </div>

        <div class="card-content">
          <h3 class="card-product-title">${escapeHtml(product.title)}</h3>
          <p class="card-product-desc">${escapeHtml(product.description || "")}</p>
          <ul class="card-features-list">${featuresHtml}</ul>

          <div class="card-price-section">
            <div class="card-price-wrap">
              <span class="card-current-price">${PricingEngine.format(product.price)}</span>
              ${product.originalPrice ? `<span class="card-original-price">${PricingEngine.format(product.originalPrice)}</span>` : ""}
            </div>
            <span style="font-family: var(--font-tech); font-size: 0.75rem; color: var(--text-muted); font-weight: 700;">
              ${escapeHtml(product.duration || "Lifetime")}
            </span>
          </div>

          <!-- BUY PANEL Box Button with Continuous Tilted White Light Sweep -->
          <button type="button" class="btn-buy-now btn-shining-sweep btn-buy-panel" data-product-id="${product.id}">
            <span>⚡ BUY PANEL</span>
          </button>
        </div>
      `;

      grid.appendChild(card);
    });

    // Handle Buy Panel Click: Nothing opens, but price becomes bigger, shakes, and returns to normal after 2-3s
    grid.querySelectorAll(".btn-buy-panel").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const card = btn.closest(".cyber-card");
        if (!card) return;
        const priceEl = card.querySelector(".card-current-price");
        if (priceEl) {
          priceEl.classList.remove("price-shake-zoom");
          void priceEl.offsetWidth; // Reflow to restart animation on click
          priceEl.classList.add("price-shake-zoom");

          // Reset back to normal after 2.5 seconds (2 to 3 seconds)
          if (priceEl._shakeTimer) clearTimeout(priceEl._shakeTimer);
          priceEl._shakeTimer = setTimeout(() => {
            priceEl.classList.remove("price-shake-zoom");
          }, 2500);
        }
      });
    });

    setupPanelInteractions();
  }

  function setupPanelInteractions() {
    const wrappers = document.querySelectorAll("#panel-cards-grid .card-media-wrapper");
    const holdDelay = CONFIG.theme.videoHoldDelayMs || 450;

    wrappers.forEach((wrapper) => {
      const video = wrapper.querySelector(".card-video-preview");
      if (!video) return;

      let holdTimeout = null;
      let isPlaying = false;

      function startHold() {
        wrapper.classList.add("holding");
        holdTimeout = setTimeout(() => {
          isPlaying = true;
          wrapper.classList.remove("holding");
          wrapper.classList.add("video-active");
          video.currentTime = 0;
          video.play().catch(() => {});
        }, holdDelay);
      }

      function stopHold() {
        clearTimeout(holdTimeout);
        wrapper.classList.remove("holding");
        if (isPlaying) {
          isPlaying = false;
          wrapper.classList.remove("video-active");
          video.pause();
          video.currentTime = 0;
        }
      }

      wrapper.addEventListener("pointerdown", startHold);
      wrapper.addEventListener("pointerup", stopHold);
      wrapper.addEventListener("pointerleave", stopHold);
      wrapper.addEventListener("pointercancel", stopHold);

      wrapper.addEventListener("mouseenter", (e) => {
        if (e.pointerType === "mouse") startHold();
      });
      wrapper.addEventListener("mouseleave", stopHold);

      const demoBtn = wrapper.querySelector(".btn-watch-demo");
      if (demoBtn) {
        demoBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          stopHold();
          const prodId = wrapper.getAttribute("data-product-id");
          const prod = PRODUCTS_CONFIG.panelProducts.find((p) => p.id === prodId);
          if (prod && prod.video) {
            openVideoModal(prod.video, prod.title);
          }
        });
      }
    });
  }

  /* ============================================================================
     7. SECTION 2: TOP-UP (BOX FORM - 8 BOXES CONNECTED TO 5-DIGIT REDEEM SYSTEM)
     ============================================================================ */
  let currentRedeemBox = { boxNumber: 1, name: "BOX 1", range: "₹10 – ₹50" };

  function renderTopUpBoxes() {
    const container = document.getElementById("topup-boxes-container");
    if (!container) return;

    container.innerHTML = "";

    PRODUCTS_CONFIG.topUpBoxes.forEach((box) => {
      const card = document.createElement("div");
      card.className = `topup-box-card ${box.popular ? "popular-box" : ""}`;

      card.innerHTML = `
        <span class="topup-box-tag">${escapeHtml(box.tag || "TOP UP")}</span>
        
        <div class="topup-box-range">${escapeHtml(box.range)}</div>

        <div class="topup-box-fee-badge">
          <span>+₹${box.extraCharge} Extra Charge</span>
        </div>

        <!-- BUY Box Button: Opens 5-Digit PIN Claim Modal -->
        <button type="button" class="btn-topup-buy-box btn-shining-sweep" data-box-number="${box.boxNumber}" data-box-name="${escapeHtml(box.name || 'BOX ' + box.boxNumber)}" data-box-range="${escapeHtml(box.range)}" aria-label="Claim Code for ${escapeHtml(box.name || 'Box ' + box.boxNumber)}">
          <span>BUY</span>
        </button>
      `;

      container.appendChild(card);
    });

    // Clicking BUY on any Box opens the 5-Digit Passcode Dispenser Modal
    container.querySelectorAll(".btn-topup-buy-box").forEach((btn) => {
      btn.addEventListener("click", () => {
        const boxNum = btn.getAttribute("data-box-number");
        const boxName = btn.getAttribute("data-box-name");
        const boxRange = btn.getAttribute("data-box-range");
        openRedeemModal(boxNum, boxName, boxRange);
      });
    });
  }

  function openRedeemModal(boxNumber, boxName, boxRange) {
    currentRedeemBox = {
      boxNumber: Number(boxNumber) || 1,
      name: boxName || `BOX ${boxNumber}`,
      range: boxRange || ""
    };

    const modal = document.getElementById("modal-topup-redeem");
    const label = document.getElementById("redeem-box-label");
    const viewInput = document.getElementById("redeem-view-input");
    const viewLoading = document.getElementById("redeem-view-loading");
    const viewSuccess = document.getElementById("redeem-view-success");
    const errBanner = document.getElementById("redeem-error-banner");

    if (label) {
      label.textContent = `SELECTED: ${currentRedeemBox.name} (${currentRedeemBox.range})`;
    }

    if (viewInput) viewInput.style.display = "flex";
    if (viewLoading) viewLoading.style.display = "none";
    if (viewSuccess) viewSuccess.style.display = "none";
    if (errBanner) {
      errBanner.style.display = "none";
      errBanner.textContent = "";
    }

    const inputs = document.querySelectorAll("#pin-digit-group .pin-digit-input");
    inputs.forEach((input) => {
      input.value = "";
      input.classList.remove("filled", "shake-error");
    });

    openModal(modal);

    setTimeout(() => {
      if (inputs[0]) inputs[0].focus();
    }, 150);
  }

  function setupTopUpRedeemHandlers() {
    const inputs = Array.from(document.querySelectorAll("#pin-digit-group .pin-digit-input"));
    const errBanner = document.getElementById("redeem-error-banner");
    const submitBtn = document.getElementById("btn-submit-unlock");
    const pasteBtn = document.getElementById("btn-paste-pin");
    const clearBtn = document.getElementById("btn-clear-pin");
    const copyBtn = document.getElementById("btn-copy-code");
    const finishBtn = document.getElementById("btn-voucher-finish");
    const closeBtn = document.getElementById("btn-close-redeem-modal");

    let currentUnlockedPin = "";

    // Play error sound (loads user's uploaded audio ./mp3/error.m4a or ./mp3/error.mp3)
    function playErrorAudio() {
      try {
        const audioPath = (CONFIG.audio && CONFIG.audio.errorSound) || "./mp3/error.m4a";
        const fallbackPath = (CONFIG.audio && CONFIG.audio.errorSoundFallback) || "./mp3/error.mp3";
        const audio = new Audio(audioPath);
        audio.volume = (CONFIG.audio && CONFIG.audio.volume) || 1.0;
        const playPromise = audio.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            const fallbackAudio = new Audio(fallbackPath);
            fallbackAudio.volume = (CONFIG.audio && CONFIG.audio.volume) || 1.0;
            fallbackAudio.play().catch(() => {
              playSyntheticErrorBuzz();
            });
          });
        }
      } catch (err) {
        playSyntheticErrorBuzz();
      }
    }

    function playSyntheticErrorBuzz() {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sawtooth";
        osc.frequency.setValueAtTime(140, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(70, ctx.currentTime + 0.35);

        gain.gain.setValueAtTime(0.28, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.36);
      } catch (e) {}
    }

    // Check if a 5-digit PIN was already copied and deactivated
    function isPinDeactivated(boxNumber, pin) {
      try {
        const stored = JSON.parse(localStorage.getItem("ana_deactivated_pins") || "{}");
        const key = `BOX_${boxNumber}_${pin}`;
        return !!stored[key];
      } catch (e) {
        return false;
      }
    }

    // Deactivate a 5-digit PIN locally and in Google Sheets when customer clicks COPY
    function deactivatePin(boxNumber, pin, code) {
      try {
        const stored = JSON.parse(localStorage.getItem("ana_deactivated_pins") || "{}");
        const key = `BOX_${boxNumber}_${pin}`;
        stored[key] = {
          box: boxNumber,
          pin: pin,
          code: code,
          deactivatedAt: new Date().toISOString()
        };
        localStorage.setItem("ana_deactivated_pins", JSON.stringify(stored));
      } catch (e) {}

      // Notify Google Sheets to permanently update row to COPIED_DEACTIVATED
      let rawUrl = (CONFIG.googleSheets && CONFIG.googleSheets.webAppUrl) || "";
      if (rawUrl && !rawUrl.startsWith("http")) {
        try { rawUrl = atob(rawUrl); } catch (e) {}
      }
      if (rawUrl && rawUrl.startsWith("http")) {
        fetch(`${rawUrl}${rawUrl.includes("?") ? "&" : "?"}action=deactivate&box=${boxNumber}&pin=${encodeURIComponent(pin)}`).catch(() => {});
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener("click", () => {
        closeModal(document.getElementById("modal-topup-redeem"));
      });
    }
    if (finishBtn) {
      finishBtn.addEventListener("click", () => {
        closeModal(document.getElementById("modal-topup-redeem"));
      });
    }

    inputs.forEach((input, idx) => {
      input.addEventListener("input", () => {
        const val = input.value.replace(/[^0-9]/g, "");
        input.value = val ? val[val.length - 1] : "";
        input.classList.toggle("filled", !!input.value);

        if (input.value && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        }

        const allFilled = inputs.every((inp) => inp.value.length === 1);
        if (allFilled && submitBtn) {
          submitBtn.focus();
        }
      });

      input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && !input.value && idx > 0) {
          inputs[idx - 1].focus();
          inputs[idx - 1].value = "";
          inputs[idx - 1].classList.remove("filled");
        } else if (e.key === "ArrowLeft" && idx > 0) {
          inputs[idx - 1].focus();
        } else if (e.key === "ArrowRight" && idx < inputs.length - 1) {
          inputs[idx + 1].focus();
        } else if (e.key === "Enter") {
          handlePinSubmit();
        }
      });

      input.addEventListener("paste", (e) => {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData("text") || "";
        applyPastedDigits(pastedText);
      });
    });

    function applyPastedDigits(text) {
      const digits = String(text).replace(/[^0-9]/g, "").slice(0, 5);
      if (!digits) return;

      digits.split("").forEach((d, i) => {
        if (inputs[i]) {
          inputs[i].value = d;
          inputs[i].classList.add("filled");
        }
      });

      if (digits.length === 5) {
        showToast("✓ 5-Digit PIN Pasted!", "success");
        if (submitBtn) submitBtn.focus();
      } else if (inputs[digits.length]) {
        inputs[digits.length].focus();
      }
    }

    if (pasteBtn) {
      pasteBtn.addEventListener("click", async () => {
        try {
          if (navigator.clipboard && navigator.clipboard.readText) {
            const clipText = await navigator.clipboard.readText();
            applyPastedDigits(clipText);
          } else {
            showToast("Paste using keyboard or long-press", "info");
          }
        } catch (err) {
          showToast("Please paste using Ctrl+V or long press", "info");
        }
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener("click", () => {
        inputs.forEach((inp) => {
          inp.value = "";
          inp.classList.remove("filled", "shake-error");
        });
        if (errBanner) {
          errBanner.style.display = "none";
          errBanner.textContent = "";
        }
        if (inputs[0]) inputs[0].focus();
      });
    }

    // COPY REDEEM CODE: Copies code AND permanently deactivates this 5-digit PIN
    if (copyBtn) {
      copyBtn.addEventListener("click", () => {
        const codeText = document.getElementById("revealed-code-display")?.textContent || "";
        if (!codeText) return;

        // Permanently deactivate this 5-digit code so it can never be used again!
        if (currentUnlockedPin) {
          deactivatePin(currentRedeemBox.boxNumber, currentUnlockedPin, codeText);
        }

        navigator.clipboard.writeText(codeText).then(() => {
          copyBtn.classList.add("copied");
          const copyLabel = document.getElementById("copy-btn-text");
          if (copyLabel) copyLabel.textContent = "✓ COPIED & DEACTIVATED";
          showToast("✓ Redeem Code Copied! This PIN is now permanently deactivated.", "success");

          setTimeout(() => {
            copyBtn.classList.remove("copied");
            if (copyLabel) copyLabel.textContent = "✓ COPIED";
          }, 3000);
        }).catch(() => {
          showToast(`Code: ${codeText}`, "success");
        });
      });
    }

    if (submitBtn) {
      submitBtn.addEventListener("click", handlePinSubmit);
    }

    async function handlePinSubmit() {
      const pin = inputs.map((inp) => inp.value.trim()).join("");

      if (pin.length !== 5) {
        playErrorAudio();
        inputs.forEach((inp) => inp.classList.add("shake-error"));
        setTimeout(() => inputs.forEach((inp) => inp.classList.remove("shake-error")), 500);
        if (errBanner) {
          errBanner.style.display = "block";
          errBanner.textContent = "⚠️ Please enter all 5 digits of the passcode.";
        }
        return;
      }

      // Check if this 5-digit PIN was already copied and permanently deactivated
      if (isPinDeactivated(currentRedeemBox.boxNumber, pin)) {
        playErrorAudio();
        showRedeemError("This 5-digit code was already copied and is permanently deactivated! It cannot be reused.");
        return;
      }

      if (errBanner) errBanner.style.display = "none";

      const viewInput = document.getElementById("redeem-view-input");
      const viewLoading = document.getElementById("redeem-view-loading");
      const loadingTerminal = document.getElementById("loading-terminal-text");

      if (viewInput) viewInput.style.display = "none";
      if (viewLoading) viewLoading.style.display = "flex";

      let rawUrl = (CONFIG.googleSheets && CONFIG.googleSheets.webAppUrl) || "";
      if (rawUrl && !rawUrl.startsWith("http")) {
        try {
          rawUrl = atob(rawUrl);
        } catch (e) {}
      }

      try {
        if (rawUrl && rawUrl.startsWith("http")) {
          if (loadingTerminal) loadingTerminal.textContent = "CONNECTING TO SECURE SERVER...";

          const requestUrl = `${rawUrl}${rawUrl.includes("?") ? "&" : "?"}action=redeem&box=${currentRedeemBox.boxNumber}&pin=${encodeURIComponent(pin)}`;
          
          const response = await fetch(requestUrl);
          const data = await response.json();

          if (data && data.success && data.redeemCode) {
            currentUnlockedPin = pin;
            revealRedeemCode(data.redeemCode, currentRedeemBox.name);
          } else {
            playErrorAudio();
            const errMsg = data?.message || "Invalid 5-digit PIN for this Box.";
            showRedeemError(errMsg);
          }
        } else {
          // Demo / Fallback Mode (Runs before live server URL is linked)
          if (loadingTerminal) loadingTerminal.textContent = "CHECKING LOCAL PASSCODE...";
          await new Promise((r) => setTimeout(r, 1000));

          const demoMap = (CONFIG.googleSheets && CONFIG.googleSheets.demoCodes) || {};
          const matchedDemo = demoMap[String(currentRedeemBox.boxNumber)];

          if (matchedDemo && (pin === matchedDemo.pin || pin === "12345" || pin === "99999")) {
            currentUnlockedPin = pin;
            revealRedeemCode(matchedDemo.code, currentRedeemBox.name);
          } else {
            currentUnlockedPin = pin;
            revealRedeemCode(`FF-REDEEM-BOX${currentRedeemBox.boxNumber}-${pin}`, currentRedeemBox.name);
          }
        }
      } catch (err) {
        playErrorAudio();
        showRedeemError("Connection error: Unable to reach verification server. Please try again.");
      }
    }

    function showRedeemError(msg) {
      const viewInput = document.getElementById("redeem-view-input");
      const viewLoading = document.getElementById("redeem-view-loading");
      if (viewLoading) viewLoading.style.display = "none";
      if (viewInput) viewInput.style.display = "flex";

      if (errBanner) {
        errBanner.style.display = "block";
        errBanner.textContent = `⚠️ ${msg}`;
      }
      inputs.forEach((inp) => inp.classList.add("shake-error"));
      setTimeout(() => inputs.forEach((inp) => inp.classList.remove("shake-error")), 500);
    }

    function revealRedeemCode(code, boxName) {
      const viewLoading = document.getElementById("redeem-view-loading");
      const viewSuccess = document.getElementById("redeem-view-success");
      const codeDisplay = document.getElementById("revealed-code-display");
      const boxTag = document.getElementById("revealed-box-tag");

      if (viewLoading) viewLoading.style.display = "none";
      if (viewSuccess) viewSuccess.style.display = "flex";

      if (boxTag) boxTag.textContent = boxName;

      // Scramble reveal animation
      if (codeDisplay) {
        const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-";
        let iter = 0;
        const total = code.length;
        const anim = setInterval(() => {
          codeDisplay.textContent = code
            .split("")
            .map((ch, idx) => {
              if (idx < iter || ch === "-") return ch;
              return chars[Math.floor(Math.random() * chars.length)];
            })
            .join("");

          if (iter >= total) {
            clearInterval(anim);
            codeDisplay.textContent = code;
          }
          iter += 1 / 2;
        }, 35);
      }

      showToast("🎉 Redeem Code Unlocked!", "success");
    }
  }

  /* ============================================================================
     8. SECTION 3: FREE FIRE RANK PUSHING (DISPLAY ONLY - NO BOOK BUTTON)
     Genuine Free Fire Rank Emblems with Animations
     ============================================================================ */
  function renderRankPusher() {
    const roadmapContainer = document.getElementById("rank-flow-list");
    const grid = document.getElementById("rank-cards-grid");

    if (!roadmapContainer || !grid) return;

    // Progression Roadmap
    roadmapContainer.innerHTML = "";
    PRODUCTS_CONFIG.rankLevels.forEach((lvl, idx, arr) => {
      const step = document.createElement("div");
      step.className = "rank-step-item";
      const fallbackAttr = lvl.fallback ? `onerror="this.src='${lvl.fallback}'"` : "";
      step.innerHTML = `
        <img src="${escapeHtml(lvl.icon)}" alt="${escapeHtml(lvl.name)}" class="rank-step-icon" ${fallbackAttr}>
        <span class="rank-step-name">${escapeHtml(lvl.name)}</span>
      `;
      roadmapContainer.appendChild(step);

      if (idx < arr.length - 1) {
        const arrow = document.createElement("div");
        arrow.className = "rank-flow-arrow";
        arrow.textContent = "➔";
        roadmapContainer.appendChild(arrow);
      }
    });

    // Rank Cards Grid (PRICE DISPLAY ONLY - NO BOOK BUTTON)
    grid.innerHTML = "";
    PRODUCTS_CONFIG.rankPusherServices.forEach((service) => {
      const card = document.createElement("article");
      card.className = "animated-rank-card";

      const fallbackFrom = service.fallbackFrom ? `onerror="this.src='${service.fallbackFrom}'"` : "";
      const fallbackTo = service.fallbackTo ? `onerror="this.src='${service.fallbackTo}'"` : "";

      card.innerHTML = `
        <div style="padding: 18px; display: flex; flex-direction: column; gap: 14px; height: 100%;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <span class="card-badge" style="position: static;">${escapeHtml(service.badge || "VERIFIED")}</span>
            <span class="rank-card-duration-pill">⏳ ${escapeHtml(service.duration)}</span>
          </div>

          <!-- Genuine Free Fire Rank Emblems with Pulse Effect -->
          <div class="rank-vs-container">
            <div class="rank-visual-node">
              <img src="${escapeHtml(service.fromIcon)}" alt="${escapeHtml(service.fromRank)}" class="rank-node-img" ${fallbackFrom}>
              <span class="rank-node-label">${escapeHtml(service.fromRank)}</span>
            </div>
            <span class="rank-transition-arrow">➔</span>
            <div class="rank-visual-node">
              <img src="${escapeHtml(service.toIcon)}" alt="${escapeHtml(service.toRank)}" class="rank-node-img" ${fallbackTo}>
              <span class="rank-node-label" style="color: var(--pink);">${escapeHtml(service.toRank)}</span>
            </div>
          </div>

          <div>
            <h3 class="card-product-title" style="font-size: 1.15rem;">${escapeHtml(service.title)}</h3>
            <p class="card-product-desc">${escapeHtml(service.description)}</p>
          </div>

          <div class="rank-card-timing-pill">
            <span>🌙</span>
            <span>${escapeHtml(service.timingNotice)}</span>
          </div>

          <!-- Price Display (NO BOOK BUTTON AS REQUESTED) -->
          <div class="card-price-section" style="margin-top: auto; padding-top: 12px; margin-bottom: 0;">
            <div class="card-price-wrap">
              <span class="card-current-price" style="font-size: 1.5rem;">${PricingEngine.format(service.price)}</span>
              <span style="font-size: 0.82rem; color: var(--text-muted); font-weight: 700;">/ Squad Push Deal</span>
            </div>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });
  }

  /* ============================================================================
     9. SECTION 4: ID SELLING (DISPLAY ONLY - NO BUY BUTTON)
     ============================================================================ */
  function renderIdSelling() {
    const grid = document.getElementById("id-cards-grid");
    if (!grid) return;

    grid.innerHTML = "";

    PRODUCTS_CONFIG.gamingIdProducts.forEach((acc) => {
      const isSold = acc.status === "SOLD" || !acc.available;
      const card = document.createElement("article");
      card.className = "cyber-card";

      const badgeHtml = isSold
        ? `<span class="card-badge sold-badge">VERIFIED SOLD</span>`
        : `<span class="card-badge">${escapeHtml(acc.badge || "AVAILABLE")}</span>`;

      const hasVideo = !!acc.video;

      card.innerHTML = `
        ${badgeHtml}

        <div class="card-media-wrapper" data-account-id="${acc.id}">
          <img src="${escapeHtml(acc.image)}" alt="${escapeHtml(acc.title)}" class="card-img-preview" loading="lazy">
          
          ${hasVideo ? `
            <button class="btn-watch-demo" type="button" title="Watch Account Demo Video">
              <span>▶</span>
              <span>DEMO VIDEO</span>
            </button>
          ` : ""}
        </div>

        <div class="card-content">
          <h3 class="card-product-title">${escapeHtml(acc.title)}</h3>

          <!-- SPECIFICATIONS TABLE (Full Width Bind Row, Zero Overflow) -->
          <div class="account-specs-table">
            <div class="spec-cell">
              <span class="spec-label">LEVEL</span>
              <span class="spec-val">${escapeHtml(acc.stats?.level || "N/A")}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-label">RANK</span>
              <span class="spec-val" style="color: var(--pink);">${escapeHtml(acc.stats?.rank || "Heroic")}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-label">EVO GUNS</span>
              <span class="spec-val">${escapeHtml(acc.stats?.evoGuns || "Included")}</span>
            </div>
            <div class="spec-cell">
              <span class="spec-label">BUNDLES</span>
              <span class="spec-val">${escapeHtml(acc.stats?.bundles || "Included")}</span>
            </div>
            <!-- Full Width Bind Spec -->
            <div class="spec-cell full-width">
              <span class="spec-label">LOGIN BIND & SECURITY</span>
              <span class="spec-bind-badge">🛡️ ${escapeHtml(acc.stats?.bindType || "Clean Bind")}</span>
            </div>
          </div>

          <p class="card-product-desc">${escapeHtml(acc.description)}</p>

          <!-- Price & Availability Display (NO BUY BUTTON AS REQUESTED) -->
          <div class="card-price-section" style="margin-bottom: 0;">
            <div class="card-price-wrap">
              <span class="card-current-price" style="font-size: 1.5rem;">${PricingEngine.format(acc.price)}</span>
              ${acc.originalPrice ? `<span class="card-original-price">${PricingEngine.format(acc.originalPrice)}</span>` : ""}
            </div>
            <span style="font-family: var(--font-tech); font-size: 0.8rem; color: ${isSold ? 'var(--red)' : 'var(--green)'}; font-weight: 800;">
              ${isSold ? "🔒 SOLD" : "✓ AVAILABLE"}
            </span>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    document.querySelectorAll("#id-cards-grid .btn-watch-demo").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const wrapper = btn.closest(".card-media-wrapper");
        const accId = wrapper.getAttribute("data-account-id");
        const acc = PRODUCTS_CONFIG.gamingIdProducts.find((a) => a.id === accId);
        if (acc && acc.video) {
          openVideoModal(acc.video, acc.title);
        }
      });
    });
  }

  /* ============================================================================
     10. MODAL HELPERS & OVERLAY MANAGEMENT
     ============================================================================ */
  function openModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modalEl) {
    if (!modalEl) return;
    modalEl.classList.remove("open");
    document.body.style.overflow = "";
    const videoContainer = modalEl.querySelector("#video-player-container");
    if (videoContainer) videoContainer.innerHTML = "";
  }

  function setupModalTriggers() {
    const closeVideoBtn = document.getElementById("btn-close-video-modal");
    if (closeVideoBtn) {
      closeVideoBtn.addEventListener("click", () => {
        closeModal(document.getElementById("modal-video-player"));
      });
    }

    document.querySelectorAll(".btn-close-modal").forEach((btn) => {
      btn.addEventListener("click", () => {
        const modal = btn.closest(".modal-overlay");
        closeModal(modal);
      });
    });

    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) closeModal(overlay);
      });
    });
  }

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  /* ============================================================================
     11. INITIALIZATION
     ============================================================================ */
  function initApp() {
    initTheme();
    initBootScreen();
    initNavigation();

    // Render 4 Sections
    renderPanels();
    renderTopUpBoxes();
    renderRankPusher();
    renderIdSelling();

    setupModalTriggers();
    setupTopUpRedeemHandlers();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
  } else {
    initApp();
  }

  window.ANAHouseApp = {
    state: AppState,
    showToast: showToast
  };

})();
