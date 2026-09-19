/**
 * FAKRULDEV & FAHRI HOSTING - THEME SUITE v2.6 (FULL GLASSMORPHISM & CONSOLE)
 * Pterodactyl Panel Luxury Transparent Suite - Complete Overhaul
 */

(function () {
  'use strict';

  let isMutating = false;
  let debounceTimer = null;

  // Default theme settings
  const defaultSettings = {
    primary_color: '#6366f1',
    secondary_color: '#06b6d4',
    theme_mode: 'dark',
    dashboard_bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    login_bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    bg_overlay_opacity: '0.65',
    login_logo: '',
    navbar_logo: '',
    logo_height: '70',
    logo_glow: true,
    card_blur: '14',
    card_opacity: '0.72',
    announcement_enabled: true,
    announcement_text: '🔥 <b>Selamat Datang!</b> Panel Cloud & Game Server siap digunakan 24/7. Hubungi admin untuk bantuan teknis.',
    announcement_type: 'gradient',
    announcement_marquee: true,
    custom_css: ''
  };

  let activeSettings = Object.assign({}, defaultSettings);

  // 10 One-Click Complete Theme Templates
  const themeTemplates = {
    cold: {
      name: 'Cold Glacier',
      primary: '#38bdf8',
      secondary: '#0284c7',
      bg: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop',
      blur: '16',
      opacity: '0.68'
    },
    hacker: {
      name: 'Cyber Matrix',
      primary: '#00ff66',
      secondary: '#059669',
      bg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
      blur: '10',
      opacity: '0.78'
    },
    soft: {
      name: 'Soft Lavender',
      primary: '#c084fc',
      secondary: '#f472b6',
      bg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
      blur: '18',
      opacity: '0.65'
    },
    cyberpunk: {
      name: 'Cyberpunk 2077',
      primary: '#f43f5e',
      secondary: '#06b6d4',
      bg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2047&auto=format&fit=crop',
      blur: '14',
      opacity: '0.72'
    },
    luxury_gold: {
      name: 'Obsidian Gold',
      primary: '#f59e0b',
      secondary: '#fbbf24',
      bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
      blur: '14',
      opacity: '0.75'
    },
    bloodmoon: {
      name: 'Bloodmoon Crimson',
      primary: '#e11d48',
      secondary: '#9f1239',
      bg: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=2070&auto=format&fit=crop',
      blur: '14',
      opacity: '0.74'
    },
    deep_ocean: {
      name: 'Deep Ocean',
      primary: '#0ea5e9',
      secondary: '#6366f1',
      bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      blur: '14',
      opacity: '0.70'
    },
    electric: {
      name: 'Electric Violet',
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      bg: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
      blur: '14',
      opacity: '0.72'
    },
    emerald: {
      name: 'Emerald Mint',
      primary: '#10b981',
      secondary: '#14b8a6',
      bg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=2070&auto=format&fit=crop',
      blur: '14',
      opacity: '0.70'
    },
    sunset: {
      name: 'Sunset Twilight',
      primary: '#f97316',
      secondary: '#ec4899',
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      blur: '14',
      opacity: '0.70'
    }
  };

  function hexToRgb(hex) {
    hex = (hex || '#6366f1').replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16) || 0;
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  // 1. Initialize Full-Screen Fixed Wallpaper
  function initBackgroundDOM() {
    if (!document.getElementById('premium-bg-container')) {
      const bg = document.createElement('div');
      bg.id = 'premium-bg-container';

      const overlay = document.createElement('div');
      overlay.id = 'premium-bg-overlay';
      bg.appendChild(overlay);

      document.body.prepend(bg);
    }
  }

  // 2. Apply Theme CSS Variables & Wallpaper
  function applyTheme(settings) {
    activeSettings = Object.assign({}, activeSettings, settings);

    const primaryRgb = hexToRgb(activeSettings.primary_color || '#6366f1');
    const secondaryRgb = hexToRgb(activeSettings.secondary_color || '#06b6d4');
    const pRgbStr = `${primaryRgb.r}, ${primaryRgb.g}, ${primaryRgb.b}`;
    const sRgbStr = `${secondaryRgb.r}, ${secondaryRgb.g}, ${secondaryRgb.b}`;
    const glowStr = `rgba(${pRgbStr}, 0.45)`;

    const root = document.documentElement;
    root.style.setProperty('--theme-primary', activeSettings.primary_color);
    root.style.setProperty('--theme-primary-rgb', pRgbStr);
    root.style.setProperty('--theme-secondary', activeSettings.secondary_color);
    root.style.setProperty('--theme-secondary-rgb', sRgbStr);
    root.style.setProperty('--theme-glow', glowStr);
    root.style.setProperty('--theme-card-blur', `${activeSettings.card_blur || 14}px`);
    root.style.setProperty('--theme-card-bg', `rgba(15, 23, 42, ${activeSettings.card_opacity || 0.72})`);

    // Full-Screen Wallpaper
    const bgContainer = document.getElementById('premium-bg-container');
    const bgOverlay = document.getElementById('premium-bg-overlay');
    const isLoginPage = window.location.pathname.includes('/auth/');

    if (bgContainer && bgOverlay) {
      const bgImg = isLoginPage 
        ? (activeSettings.login_bg || activeSettings.dashboard_bg || '')
        : (activeSettings.dashboard_bg || '');

      if (bgImg && !bgContainer.style.backgroundImage.includes(bgImg)) {
        bgContainer.style.backgroundImage = `url('${bgImg}')`;
      }
      bgOverlay.style.background = `rgba(11, 15, 25, ${activeSettings.bg_overlay_opacity || 0.65})`;
    }

    let styleTag = document.getElementById('premium-dynamic-theme-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'premium-dynamic-theme-style';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      :root {
        --theme-primary: ${activeSettings.primary_color} !important;
        --theme-primary-rgb: ${pRgbStr} !important;
        --theme-secondary: ${activeSettings.secondary_color} !important;
        --theme-secondary-rgb: ${sRgbStr} !important;
        --theme-glow: ${glowStr} !important;
      }
      button.btn-primary, button[type="submit"], .bg-primary-500, .bg-blue-600 {
        background: linear-gradient(135deg, ${activeSettings.primary_color} 0%, ${activeSettings.secondary_color} 100%) !important;
      }
      .border-primary-500, .border-blue-500 {
        border-color: ${activeSettings.primary_color} !important;
      }
      .text-primary-500, .text-blue-500, .text-cyan-400 {
        color: ${activeSettings.primary_color} !important;
      }
      ${activeSettings.custom_css || ''}
    `;

    runPageEnhancements();
  }

  // 3. Guaranteed Login Logo Fix (Inside Unified Form Card, 100% URL Matching)
  function injectOrUpdateLoginLogo() {
    const isLoginPage = window.location.pathname.includes('/auth/');
    if (!isLoginPage) return;

    // Search for "Login to Continue" title
    let titleEl = null;
    const allHeaders = document.querySelectorAll('h1, h2, h3, h4');
    for (let i = 0; i < allHeaders.length; i++) {
      const txt = (allHeaders[i].textContent || '').trim();
      if (txt.includes('Login to Continue')) {
        titleEl = allHeaders[i];
        break;
      }
    }

    if (!titleEl) return;

    const parentCard = titleEl.parentNode;
    let logoBox = document.getElementById('premium-login-logo-box');

    if (!logoBox) {
      logoBox = document.createElement('div');
      logoBox.id = 'premium-login-logo-box';
      logoBox.className = 'premium-login-logo-wrapper';
      parentCard.insertBefore(logoBox, titleEl);
    } else if (logoBox.nextSibling !== titleEl) {
      parentCard.insertBefore(logoBox, titleEl);
    }

    const logoUrl = (activeSettings.login_logo || '').trim();
    const logoHeight = activeSettings.logo_height || '70';
    const logoGlow = activeSettings.logo_glow !== false;
    const glowFilter = logoGlow ? `filter: drop-shadow(0 0 16px var(--theme-glow));` : '';

    if (logoUrl) {
      const curImg = logoBox.querySelector('#premium-login-logo-img');
      if (curImg && curImg.src === logoUrl) return;

      logoBox.innerHTML = `
        <img id="premium-login-logo-img" 
             class="premium-custom-login-logo" 
             src="${logoUrl}" 
             alt="Logo" 
             style="max-height: ${logoHeight}px; max-width: 250px; width: auto; height: auto; object-fit: contain; margin: 0 auto; display: block; ${glowFilter}" />
      `;
    } else {
      if (logoBox.querySelector('.premium-default-logo-badge')) return;

      logoBox.innerHTML = `
        <div class="premium-default-logo-badge" style="${glowFilter}" title="Tetapkan logo di Tetapan Tema">
          <svg class="premium-svg-animated-emblem" viewBox="0 0 80 80" width="56" height="56">
            <defs>
              <linearGradient id="pEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--theme-primary, #6366f1)"/>
                <stop offset="100%" stop-color="var(--theme-secondary, #06b6d4)"/>
              </linearGradient>
            </defs>
            <polygon points="40,8 72,26 72,54 40,72 8,54 8,26" fill="rgba(99, 102, 241, 0.18)" stroke="url(#pEmblemGrad)" stroke-width="2.5" />
            <polygon points="40,18 62,31 62,49 40,62 18,49 18,31" fill="none" stroke="url(#pEmblemGrad)" stroke-width="1.5" stroke-dasharray="4,2" />
            <path d="M40 25 L40 55 M27 40 L53 40" stroke="url(#pEmblemGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="40" cy="40" r="5" fill="var(--theme-secondary, #06b6d4)" />
          </svg>
          <span class="premium-logo-text-title">TEMA PANEL</span>
        </div>
      `;
    }
  }

  // 4. Update Navbar Logo on Dashboard
  function updateNavbarLogo() {
    if (window.location.pathname.includes('/auth/') || window.location.pathname.startsWith('/admin')) return;
    const navLogoUrl = activeSettings.navbar_logo || activeSettings.login_logo;
    if (!navLogoUrl || navLogoUrl.trim() === '') return;

    const navBrand = document.querySelector('#app nav a[href="/"]') ||
                     document.querySelector('header a[href="/"]');
    if (!navBrand) return;

    let customNavImg = document.getElementById('premium-navbar-logo-img');
    if (!customNavImg) {
      customNavImg = document.createElement('img');
      customNavImg.id = 'premium-navbar-logo-img';
      customNavImg.className = 'premium-navbar-logo';
      customNavImg.alt = 'Panel Logo';

      const defaultSvg = navBrand.querySelector('svg');
      if (defaultSvg) defaultSvg.style.display = 'none';

      navBrand.prepend(customNavImg);
    }

    if (customNavImg.src !== navLogoUrl) {
      customNavImg.src = navLogoUrl;
    }
  }

  // 5. Announcement Bar
  function updateAnnouncement() {
    if (window.location.pathname.includes('/auth/') || window.location.pathname.startsWith('/admin')) return;

    let bar = document.getElementById('premium-announcement-bar');
    if (!bar) {
      bar = document.createElement('div');
      bar.id = 'premium-announcement-bar';
      bar.innerHTML = `
        <div class="announcement-inner">
          <span class="announcement-badge"><i class="fa-solid fa-bullhorn"></i> INFO</span>
          <div class="announcement-content-wrapper">
            <span id="premium-announcement-text" class="announcement-text"></span>
          </div>
          <button id="premium-announcement-close" class="announcement-close-btn" title="Tutup">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `;

      const app = document.getElementById('app');
      const nav = document.querySelector('#app nav') || document.querySelector('header');
      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(bar, nav.nextSibling);
      } else if (app) {
        app.prepend(bar);
      }

      document.getElementById('premium-announcement-close').addEventListener('click', function () {
        bar.classList.remove('announcement-active');
        sessionStorage.setItem('premium_announcement_dismissed', 'true');
      });
    }

    const isDismissed = sessionStorage.getItem('premium_announcement_dismissed') === 'true';
    const isEnabled = activeSettings.announcement_enabled && !isDismissed && (activeSettings.announcement_text || '').trim() !== '';

    if (isEnabled) {
      bar.className = `announcement-theme-${activeSettings.announcement_type || 'gradient'} announcement-active`;
      const textEl = document.getElementById('premium-announcement-text');
      if (textEl && textEl.innerHTML !== activeSettings.announcement_text) {
        textEl.innerHTML = activeSettings.announcement_text;
        textEl.className = activeSettings.announcement_marquee ? 'announcement-marquee' : 'announcement-static';
      }
    } else {
      bar.classList.remove('announcement-active');
    }
  }

  // 6. Toast Notification Helper
  function showToast(msg, icon = 'fa-circle-check') {
    let toast = document.getElementById('premium-toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'premium-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = `<i class="fa-solid ${icon}" style="color: var(--theme-primary);"></i> <span>${msg}</span>`;
    toast.style.display = 'flex';
    setTimeout(() => {
      toast.style.display = 'none';
    }, 3500);
  }

  // 7. Inject Admin Sidebar Item: ONLY 1 BUTTON DIRECTLY UNDER "Application API"
  function injectAdminSidebarItem() {
    if (!window.location.pathname.startsWith('/admin')) return;

    if (document.getElementById('admin-theme-sidebar-item')) return;

    const allLinks = document.querySelectorAll('aside.main-sidebar .sidebar-menu a, .sidebar a');
    let targetLi = null;

    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      const text = (link.textContent || '').trim().toLowerCase();
      const href = link.getAttribute('href') || '';
      if (text.includes('application api') || href.includes('/admin/api')) {
        targetLi = link.closest('li');
        break;
      }
    }

    if (!targetLi) {
      for (let i = 0; i < allLinks.length; i++) {
        const link = allLinks[i];
        const text = (link.textContent || '').trim().toLowerCase();
        if (text === 'settings' || link.getAttribute('href')?.includes('/admin/settings')) {
          targetLi = link.closest('li');
          break;
        }
      }
    }

    if (targetLi && targetLi.parentNode) {
      const themeLi = document.createElement('li');
      themeLi.id = 'admin-theme-sidebar-item';
      themeLi.innerHTML = `
        <a href="#" id="admin-theme-sidebar-link" title="Buka Pengaturan Tema">
          <i class="fa fa-palette"></i> <span>Tema</span>
        </a>
      `;

      targetLi.parentNode.insertBefore(themeLi, targetLi.nextSibling);

      document.getElementById('admin-theme-sidebar-link').addEventListener('click', function (e) {
        e.preventDefault();
        openThemeModal();
      });
    }
  }

  // 8. Inject Theme Buttons for Client & Login (Compact 42px Circle)
  function injectClientButtons() {
    const isLoginPage = window.location.pathname.includes('/auth/');
    const isAdminPage = window.location.pathname.startsWith('/admin');

    if (isAdminPage) return;

    let fab = document.getElementById('premium-theme-fab');
    if (!fab) {
      fab = document.createElement('div');
      fab.id = 'premium-theme-fab';
      fab.title = 'Pengaturan Tema';
      fab.innerHTML = '<i class="fa-solid fa-palette"></i>';
      document.body.appendChild(fab);
      fab.addEventListener('click', openThemeModal);
    }

    if (isLoginPage && !document.getElementById('premium-top-setting-btn')) {
      const topBtn = document.createElement('div');
      topBtn.id = 'premium-top-setting-btn';
      topBtn.className = 'premium-top-setting-btn';
      topBtn.innerHTML = '<i class="fa-solid fa-palette"></i> <span>Tema</span>';
      document.body.appendChild(topBtn);
      topBtn.addEventListener('click', openThemeModal);
    }

    if (!isLoginPage && !isAdminPage) {
      const navContainer = document.querySelector('#app nav > div') || document.querySelector('#app nav');
      if (navContainer && !document.getElementById('premium-nav-theme-btn')) {
        const navBtn = document.createElement('button');
        navBtn.id = 'premium-nav-theme-btn';
        navBtn.className = 'premium-top-setting-btn';
        navBtn.style.position = 'relative';
        navBtn.style.top = '0';
        navBtn.style.right = '0';
        navBtn.style.marginRight = '12px';
        navBtn.innerHTML = '<i class="fa-solid fa-palette"></i> <span>Tema</span>';
        navBtn.addEventListener('click', (e) => {
          e.preventDefault();
          openThemeModal();
        });
        navContainer.appendChild(navBtn);
      }
    }
  }

  // 9. Build Theme Settings Modal
  function buildThemeModal() {
    if (document.getElementById('premium-settings-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'premium-settings-modal-overlay';
    overlay.innerHTML = `
      <div id="premium-settings-modal">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fa-solid fa-palette"></i>
            <span>Pengaturan Tema & Logo Panel</span>
          </div>
          <button id="premium-modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="tab-templates"><i class="fa-solid fa-wand-magic-sparkles"></i> Template 1-Klik</button>
          <button class="modal-tab-btn" data-tab="tab-colors"><i class="fa-solid fa-droplet"></i> Warna & Mix</button>
          <button class="modal-tab-btn" data-tab="tab-logo"><i class="fa-solid fa-shield-cat"></i> Logo & Brand</button>
          <button class="modal-tab-btn" data-tab="tab-bg"><i class="fa-solid fa-image"></i> Wallpaper</button>
          <button class="modal-tab-btn" data-tab="tab-announcement"><i class="fa-solid fa-bullhorn"></i> Pengumuman</button>
          <button class="modal-tab-btn" data-tab="tab-effects"><i class="fa-solid fa-sliders"></i> Efek Kaca</button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: 10 TEMPLATES (COLD, HACKER, SOFT, CYBERPUNK, LUXURY, DLL) -->
          <div id="tab-templates" class="tab-pane active">
            <div class="form-group">
              <label class="form-label">Pilih Template Tema Siap Pakai (1-Klik)</label>
              <span class="form-subtext">Klik mana-mana template untuk memuat tema dan latar belakang serta-merta:</span>
              <div class="templates-preset-grid">
                <div class="template-preset-card" data-template="cold">
                  <div class="template-card-icon">❄️</div>
                  <div class="template-card-title">Cold Glacier</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#38bdf8;"></span>
                    <span class="template-card-dot" style="background:#0284c7;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="hacker">
                  <div class="template-card-icon">💻</div>
                  <div class="template-card-title">Cyber Matrix</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#00ff66;"></span>
                    <span class="template-card-dot" style="background:#059669;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="soft">
                  <div class="template-card-icon">🌸</div>
                  <div class="template-card-title">Soft Lavender</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#c084fc;"></span>
                    <span class="template-card-dot" style="background:#f472b6;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="cyberpunk">
                  <div class="template-card-icon">🔮</div>
                  <div class="template-card-title">Cyberpunk 2077</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#f43f5e;"></span>
                    <span class="template-card-dot" style="background:#06b6d4;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="luxury_gold">
                  <div class="template-card-icon">👑</div>
                  <div class="template-card-title">Obsidian Gold</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#f59e0b;"></span>
                    <span class="template-card-dot" style="background:#fbbf24;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="bloodmoon">
                  <div class="template-card-icon">🩸</div>
                  <div class="template-card-title">Bloodmoon</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#e11d48;"></span>
                    <span class="template-card-dot" style="background:#9f1239;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="deep_ocean">
                  <div class="template-card-icon">🌊</div>
                  <div class="template-card-title">Deep Ocean</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#0ea5e9;"></span>
                    <span class="template-card-dot" style="background:#6366f1;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="electric">
                  <div class="template-card-icon">⚡</div>
                  <div class="template-card-title">Electric Violet</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#8b5cf6;"></span>
                    <span class="template-card-dot" style="background:#3b82f6;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="emerald">
                  <div class="template-card-icon">🍃</div>
                  <div class="template-card-title">Emerald Mint</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#10b981;"></span>
                    <span class="template-card-dot" style="background:#14b8a6;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="sunset">
                  <div class="template-card-icon">🌅</div>
                  <div class="template-card-title">Sunset Twilight</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#f97316;"></span>
                    <span class="template-card-dot" style="background:#ec4899;"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 2: WARNA, MIXCOLOR & KUSTOM -->
          <div id="tab-colors" class="tab-pane">
            <div class="form-group">
              <label class="form-label">Pilihan Mix Color (Gradien Dwi-Warna)</label>
              <div class="mix-colors-grid">
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #8b5cf6, #06b6d4);" data-p="#8b5cf6" data-s="#06b6d4">Cyber Pulse</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #00ff66, #0ea5e9);" data-p="#00ff66" data-s="#0ea5e9">Matrix Cyan</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #f43f5e, #f59e0b);" data-p="#f43f5e" data-s="#f59e0b">Fire & Gold</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #ec4899, #8b5cf6);" data-p="#ec4899" data-s="#8b5cf6">Sakura Neon</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #38bdf8, #10b981);" data-p="#38bdf8" data-s="#10b981">Arctic Mint</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #f97316, #e11d48);" data-p="#f97316" data-s="#e11d48">Molten Lava</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #eab308, #84cc16);" data-p="#eab308" data-s="#84cc16">Lime Gold</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #6366f1, #06b6d4);" data-p="#6366f1" data-s="#06b6d4">Royal Azure</div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Pilihan Warna Tunggal</label>
              <div class="color-presets-grid">
                <div class="color-preset-pill" style="background: #6366f1;" data-color="#6366f1"></div>
                <div class="color-preset-pill" style="background: #8b5cf6;" data-color="#8b5cf6"></div>
                <div class="color-preset-pill" style="background: #a855f7;" data-color="#a855f7"></div>
                <div class="color-preset-pill" style="background: #d946ef;" data-color="#d946ef"></div>
                <div class="color-preset-pill" style="background: #ec4899;" data-color="#ec4899"></div>
                <div class="color-preset-pill" style="background: #f43f5e;" data-color="#f43f5e"></div>
                <div class="color-preset-pill" style="background: #ef4444;" data-color="#ef4444"></div>
                <div class="color-preset-pill" style="background: #f97316;" data-color="#f97316"></div>
                <div class="color-preset-pill" style="background: #f59e0b;" data-color="#f59e0b"></div>
                <div class="color-preset-pill" style="background: #eab308;" data-color="#eab308"></div>
                <div class="color-preset-pill" style="background: #84cc16;" data-color="#84cc16"></div>
                <div class="color-preset-pill" style="background: #10b981;" data-color="#10b981"></div>
                <div class="color-preset-pill" style="background: #14b8a6;" data-color="#14b8a6"></div>
                <div class="color-preset-pill" style="background: #06b6d4;" data-color="#06b6d4"></div>
                <div class="color-preset-pill" style="background: #0ea5e9;" data-color="#0ea5e9"></div>
                <div class="color-preset-pill" style="background: #3b82f6;" data-color="#3b82f6"></div>
              </div>
            </div>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-top: 4px;">
              <div class="form-group">
                <label class="form-label">Warna Utama (Primary)</label>
                <div style="display: flex; gap: 8px;">
                  <input type="color" id="cfg-primary-picker" class="color-picker-input" value="${activeSettings.primary_color}">
                  <input type="text" id="cfg-primary-hex" class="input-text" value="${activeSettings.primary_color}">
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Warna Sekunder (Mix)</label>
                <div style="display: flex; gap: 8px;">
                  <input type="color" id="cfg-secondary-picker" class="color-picker-input" value="${activeSettings.secondary_color || '#06b6d4'}">
                  <input type="text" id="cfg-secondary-hex" class="input-text" value="${activeSettings.secondary_color || '#06b6d4'}">
                </div>
              </div>
            </div>
          </div>

          <!-- TAB 3: LOGO & BRAND (100% MENGIKUT LINK URL DENGAN PRATINJAU LANGSUNG) -->
          <div id="tab-logo" class="tab-pane">
            <div class="form-group">
              <label class="form-label">URL Logo Halaman Login (PNG/JPG/SVG/WebP/GIF)</label>
              <span class="form-subtext">Tampal pautan gambar logo anda (Imgur, direct link, dll):</span>
              <input type="text" id="cfg-login-logo" class="input-text" placeholder="https://i.imgur.com/example.png" value="${activeSettings.login_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Pratinjau Logo Login (Live Preview)</label>
              <div id="logo-preview-container" class="logo-preview-box"></div>
            </div>

            <div class="form-group">
              <label class="form-label">URL Logo Navbar Dashboard</label>
              <input type="text" id="cfg-navbar-logo" class="input-text" placeholder="https://..." value="${activeSettings.navbar_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Ketinggian / Saiz Logo: <span id="val-logo-height" class="range-val-badge">${activeSettings.logo_height || 70}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-logo-height" class="input-range" min="30" max="130" value="${activeSettings.logo_height || 70}">
              </div>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13px; font-weight:700;">Efek Cahaya Neon Logo (Glow)</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-logo-glow" ${activeSettings.logo_glow ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 4: WALLPAPER BACKGROUND PENUH -->
          <div id="tab-bg" class="tab-pane">
            <div class="form-group">
              <label class="form-label">URL Wallpaper Dashboard (Full-Screen)</label>
              <span class="form-subtext">Gambar akan meliputi seluruh skrin secara penuh di belakang kad lutsinar:</span>
              <input type="text" id="cfg-dashboard-bg" class="input-text" placeholder="https://..." value="${activeSettings.dashboard_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">URL Wallpaper Halaman Login</label>
              <input type="text" id="cfg-login-bg" class="input-text" placeholder="https://..." value="${activeSettings.login_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Kegelapan Lapisan Overlay: <span id="val-overlay" class="range-val-badge">${Math.round(activeSettings.bg_overlay_opacity * 100)}%</span></label>
              <span class="form-subtext">Kurangkan peratusan jika mahukan gambar wallpaper lebih jelas & terang:</span>
              <div class="slider-container">
                <input type="range" id="cfg-bg-overlay" class="input-range" min="10" max="95" value="${Math.round(activeSettings.bg_overlay_opacity * 100)}">
              </div>
            </div>
          </div>

          <!-- TAB 5: ANNOUNCEMENT -->
          <div id="tab-announcement" class="tab-pane">
            <div class="toggle-row">
              <div>
                <div style="font-size:13px; font-weight:700;">Aktifkan Banner Pengumuman</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-enabled" ${activeSettings.announcement_enabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="form-group">
              <label class="form-label">Teks Pengumuman</label>
              <textarea id="cfg-announcement-text" class="input-text" rows="3">${activeSettings.announcement_text || ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Gaya Banner</label>
              <select id="cfg-announcement-type" class="input-text">
                <option value="gradient" ${activeSettings.announcement_type === 'gradient' ? 'selected' : ''}>Luxury Gradient</option>
                <option value="info" ${activeSettings.announcement_type === 'info' ? 'selected' : ''}>Cyan Info Alert</option>
                <option value="warning" ${activeSettings.announcement_type === 'warning' ? 'selected' : ''}>Sunset Warning</option>
                <option value="danger" ${activeSettings.announcement_type === 'danger' ? 'selected' : ''}>Crimson Urgent</option>
              </select>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13px; font-weight:700;">Teks Berjalan (Marquee)</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-marquee" ${activeSettings.announcement_marquee ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 6: EFEK KACA & TRANSPARAN -->
          <div id="tab-effects" class="tab-pane">
            <div class="form-group">
              <label class="form-label">Ketelusan Kad (Card Opacity): <span id="val-opacity" class="range-val-badge">${Math.round(activeSettings.card_opacity * 100)}%</span></label>
              <span class="form-subtext">Rendahkan untuk membuat kad lebih lutsinar (transparent) supaya wallpaper nampak jelas:</span>
              <div class="slider-container">
                <input type="range" id="cfg-card-opacity" class="input-range" min="30" max="95" value="${Math.round(activeSettings.card_opacity * 100)}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tingkat Efek Kaca (Glass Blur): <span id="val-blur" class="range-val-badge">${activeSettings.card_blur}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-card-blur" class="input-range" min="0" max="25" value="${activeSettings.card_blur}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Custom CSS Tambahan</label>
              <textarea id="cfg-custom-css" class="input-text" rows="3" style="font-family: var(--theme-mono); font-size: 12px;">${activeSettings.custom_css || ''}</textarea>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button id="premium-btn-reset" class="btn-luxury btn-outline">
            <i class="fa-solid fa-rotate-left"></i> Reset Default
          </button>
          <div style="display: flex; gap: 10px;">
            <button id="premium-btn-save" class="btn-luxury btn-primary">
              <i class="fa-solid fa-floppy-disk"></i> Simpan Pengaturan
            </button>
          </div>
        </div>
      </div>
    `;

    document.body.appendChild(overlay);

    document.getElementById('premium-modal-close').addEventListener('click', closeThemeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeThemeModal();
    });

    // Tab Navigation
    const tabButtons = overlay.querySelectorAll('.modal-tab-btn');
    const tabPanes = overlay.querySelectorAll('.tab-pane');
    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        tabButtons.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        btn.classList.add('active');
        const target = document.getElementById(btn.getAttribute('data-tab'));
        if (target) target.classList.add('active');
      });
    });

    // Template 1-Click
    overlay.querySelectorAll('.template-preset-card').forEach(card => {
      card.addEventListener('click', () => {
        const key = card.getAttribute('data-template');
        const t = themeTemplates[key];
        if (!t) return;

        overlay.querySelectorAll('.template-preset-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');

        document.getElementById('cfg-primary-picker').value = t.primary;
        document.getElementById('cfg-primary-hex').value = t.primary;
        document.getElementById('cfg-secondary-picker').value = t.secondary;
        document.getElementById('cfg-secondary-hex').value = t.secondary;
        document.getElementById('cfg-dashboard-bg').value = t.bg;
        document.getElementById('cfg-card-blur').value = t.blur;
        document.getElementById('val-blur').textContent = `${t.blur}px`;
        document.getElementById('cfg-card-opacity').value = Math.round(t.opacity * 100);
        document.getElementById('val-opacity').textContent = `${Math.round(t.opacity * 100)}%`;

        applyTheme(Object.assign({}, activeSettings, {
          primary_color: t.primary,
          secondary_color: t.secondary,
          dashboard_bg: t.bg,
          card_blur: t.blur,
          card_opacity: t.opacity
        }));
      });
    });

    // Mix Color Click
    overlay.querySelectorAll('.mix-color-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const p = pill.getAttribute('data-p');
        const s = pill.getAttribute('data-s');
        document.getElementById('cfg-primary-picker').value = p;
        document.getElementById('cfg-primary-hex').value = p;
        document.getElementById('cfg-secondary-picker').value = s;
        document.getElementById('cfg-secondary-hex').value = s;

        overlay.querySelectorAll('.mix-color-pill').forEach(c => c.classList.remove('active'));
        pill.classList.add('active');

        applyTheme(Object.assign({}, activeSettings, { primary_color: p, secondary_color: s }));
      });
    });

    // Single Color Click
    overlay.querySelectorAll('.color-preset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const color = pill.getAttribute('data-color');
        document.getElementById('cfg-primary-picker').value = color;
        document.getElementById('cfg-primary-hex').value = color;
        overlay.querySelectorAll('.color-preset-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        applyTheme(Object.assign({}, activeSettings, { primary_color: color }));
      });
    });

    // Color Pickers
    const pPicker = document.getElementById('cfg-primary-picker');
    const pHex = document.getElementById('cfg-primary-hex');
    pPicker.addEventListener('input', (e) => {
      pHex.value = e.target.value;
      applyTheme(Object.assign({}, activeSettings, { primary_color: e.target.value }));
    });
    pHex.addEventListener('input', (e) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
        pPicker.value = e.target.value;
        applyTheme(Object.assign({}, activeSettings, { primary_color: e.target.value }));
      }
    });

    const sPicker = document.getElementById('cfg-secondary-picker');
    const sHex = document.getElementById('cfg-secondary-hex');
    sPicker.addEventListener('input', (e) => {
      sHex.value = e.target.value;
      applyTheme(Object.assign({}, activeSettings, { secondary_color: e.target.value }));
    });
    sHex.addEventListener('input', (e) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
        sPicker.value = e.target.value;
        applyTheme(Object.assign({}, activeSettings, { secondary_color: e.target.value }));
      }
    });

    // Logo Live Preview Box
    const logoInput = document.getElementById('cfg-login-logo');
    const previewContainer = document.getElementById('logo-preview-container');

    function updatePreviewBox(url) {
      if (url && url.trim() !== '') {
        previewContainer.innerHTML = `<img src="${url.trim()}" class="logo-preview-img" alt="Pratinjau Logo" onerror="this.parentNode.innerHTML='<span class=\\'logo-preview-empty\\'><i class=\\'fa-solid fa-triangle-exclamation\\' style=\\'color:#f43f5e;\\'></i> URL Gambar tidak sah</span>';" />`;
      } else {
        previewContainer.innerHTML = `<span class="logo-preview-empty"><i class="fa-solid fa-circle-info"></i> Tiada URL (Emblem 'TEMA PANEL' akan digunakan)</span>`;
      }
    }

    updatePreviewBox(activeSettings.login_logo);

    logoInput.addEventListener('input', (e) => {
      const url = e.target.value.trim();
      updatePreviewBox(url);
      applyTheme(Object.assign({}, activeSettings, { login_logo: url }));
    });

    // Sliders
    const blurSlider = document.getElementById('cfg-card-blur');
    const blurVal = document.getElementById('val-blur');
    blurSlider.addEventListener('input', (e) => {
      blurVal.textContent = `${e.target.value}px`;
      applyTheme(Object.assign({}, activeSettings, { card_blur: e.target.value }));
    });

    const opacitySlider = document.getElementById('cfg-card-opacity');
    const opacityVal = document.getElementById('val-opacity');
    opacitySlider.addEventListener('input', (e) => {
      opacityVal.textContent = `${e.target.value}%`;
      applyTheme(Object.assign({}, activeSettings, { card_opacity: (e.target.value / 100).toFixed(2) }));
    });

    const overlaySlider = document.getElementById('cfg-bg-overlay');
    const overlayVal = document.getElementById('val-overlay');
    overlaySlider.addEventListener('input', (e) => {
      overlayVal.textContent = `${e.target.value}%`;
      applyTheme(Object.assign({}, activeSettings, { bg_overlay_opacity: (e.target.value / 100).toFixed(2) }));
    });

    const logoHeightSlider = document.getElementById('cfg-logo-height');
    const logoHeightVal = document.getElementById('val-logo-height');
    logoHeightSlider.addEventListener('input', (e) => {
      logoHeightVal.textContent = `${e.target.value}px`;
      applyTheme(Object.assign({}, activeSettings, { logo_height: e.target.value }));
    });

    // Save Button
    document.getElementById('premium-btn-save').addEventListener('click', () => {
      const payload = {
        primary_color: pHex.value,
        secondary_color: sHex.value,
        card_blur: blurSlider.value,
        card_opacity: (opacitySlider.value / 100).toFixed(2),
        dashboard_bg: document.getElementById('cfg-dashboard-bg').value.trim(),
        login_bg: document.getElementById('cfg-login-bg').value.trim(),
        bg_overlay_opacity: (overlaySlider.value / 100).toFixed(2),
        login_logo: document.getElementById('cfg-login-logo').value.trim(),
        navbar_logo: document.getElementById('cfg-navbar-logo').value.trim(),
        logo_height: logoHeightSlider.value,
        logo_glow: document.getElementById('cfg-logo-glow').checked,
        announcement_enabled: document.getElementById('cfg-announcement-enabled').checked,
        announcement_text: document.getElementById('cfg-announcement-text').value,
        announcement_type: document.getElementById('cfg-announcement-type').value,
        announcement_marquee: document.getElementById('cfg-announcement-marquee').checked,
        custom_css: document.getElementById('cfg-custom-css').value
      };

      applyTheme(payload);
      localStorage.setItem('premium_pterodactyl_settings', JSON.stringify(activeSettings));

      fetch('/themes/premium/api/settings.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        showToast('Pengaturan Tema Berjaya Disimpan!', 'fa-check-double');
        closeThemeModal();
      })
      .catch(err => {
        showToast('Pengaturan Tema Berjaya Disimpan (Lokal)', 'fa-floppy-disk');
        closeThemeModal();
      });
    });

    // Reset Button
    document.getElementById('premium-btn-reset').addEventListener('click', () => {
      if (confirm('Kembalikan semua tetapan tema ke nilai asal?')) {
        applyTheme(defaultSettings);
        localStorage.removeItem('premium_pterodactyl_settings');

        fetch('/themes/premium/api/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(defaultSettings)
        }).then(() => {
          showToast('Tema Dikembalikan ke Asal!', 'fa-rotate-left');
          closeThemeModal();
        });
      }
    });
  }

  function openThemeModal() {
    buildThemeModal();
    const overlay = document.getElementById('premium-settings-modal-overlay');
    if (overlay) {
      overlay.classList.add('modal-active');
    }
  }
  window.openThemeModal = openThemeModal;

  function closeThemeModal() {
    const overlay = document.getElementById('premium-settings-modal-overlay');
    if (overlay) {
      overlay.classList.remove('modal-active');
    }
  }

  // 10. Run Page Enhancements (Controlled & Zero-Lag)
  function runPageEnhancements() {
    isMutating = true;
    try {
      injectOrUpdateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
      injectAdminSidebarItem();
      injectClientButtons();
    } finally {
      setTimeout(() => {
        isMutating = false;
      }, 50);
    }
  }

  // 11. Throttled Watcher (Zero Lag, Max 4 checks per second)
  function setupWatcher() {
    const observer = new MutationObserver(() => {
      if (isMutating) return;
      if (debounceTimer) return;

      debounceTimer = setTimeout(() => {
        debounceTimer = null;
        runPageEnhancements();
      }, 250);
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    let count = 0;
    const interval = setInterval(() => {
      runPageEnhancements();
      count++;
      if (count >= 4) clearInterval(interval);
    }, 400);
  }

  // 12. Main Bootstrap
  function bootstrap() {
    initBackgroundDOM();
    buildThemeModal();

    const cached = localStorage.getItem('premium_pterodactyl_settings');
    if (cached) {
      try {
        applyTheme(JSON.parse(cached));
      } catch (e) {}
    } else {
      applyTheme(defaultSettings);
    }

    fetch('/themes/premium/api/settings.php')
      .then(res => res.json())
      .then(data => {
        if (data && data.success && data.settings) {
          applyTheme(data.settings);
          localStorage.setItem('premium_pterodactyl_settings', JSON.stringify(data.settings));
        }
      })
      .catch(err => {
        console.log('Menggunakan konfigurasi cache tempatan:', err);
      })
      .finally(() => {
        runPageEnhancements();
        setupWatcher();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

})();
