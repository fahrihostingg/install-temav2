/**
 * FAKRULDEV & FAHRI HOSTING - THEME SUITE v3.3 PRO MASTER
 * Pterodactyl Panel Luxury Glassmorphism & High-Performance Suite
 * Full Wallpaper Transparency | Ultra-Compact Login Card | Admin-Only Controls
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
    bg_overlay_opacity: '0.50',
    login_logo: '',
    navbar_logo: '',
    logo_height: '85',
    logo_glow: true,
    card_blur: '12',
    card_opacity: '0.38',
    announcement_enabled: true,
    announcement_text: '🔥 <b>Selamat Datang!</b> Panel Cloud & Game Server siap digunakan 24/7. Hubungi admin untuk bantuan teknis.',
    announcement_type: 'gradient',
    announcement_marquee: false,
    custom_css: ''
  };

  let activeSettings = Object.assign({}, defaultSettings);

  // 12 One-Click Complete Theme Templates
  const themeTemplates = {
    cold: {
      name: 'Cold Glacier',
      primary: '#38bdf8',
      secondary: '#0284c7',
      bg: 'https://images.unsplash.com/photo-1483921020237-2ff51e8e4b22?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.38'
    },
    hacker: {
      name: 'Cyber Matrix',
      primary: '#00ff66',
      secondary: '#059669',
      bg: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop',
      blur: '10',
      opacity: '0.42'
    },
    soft: {
      name: 'Soft Lavender',
      primary: '#c084fc',
      secondary: '#f472b6',
      bg: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?q=80&w=2094&auto=format&fit=crop',
      blur: '14',
      opacity: '0.35'
    },
    cyberpunk: {
      name: 'Cyberpunk 2077',
      primary: '#f43f5e',
      secondary: '#06b6d4',
      bg: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2047&auto=format&fit=crop',
      blur: '12',
      opacity: '0.40'
    },
    luxury_gold: {
      name: 'Obsidian Gold',
      primary: '#f59e0b',
      secondary: '#fbbf24',
      bg: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2064&auto=format&fit=crop',
      blur: '12',
      opacity: '0.40'
    },
    bloodmoon: {
      name: 'Bloodmoon Crimson',
      primary: '#e11d48',
      secondary: '#9f1239',
      bg: 'https://images.unsplash.com/photo-1507499739999-097706ad8914?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.40'
    },
    deep_ocean: {
      name: 'Deep Ocean',
      primary: '#0ea5e9',
      secondary: '#6366f1',
      bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.38'
    },
    electric: {
      name: 'Electric Violet',
      primary: '#8b5cf6',
      secondary: '#3b82f6',
      bg: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.40'
    },
    emerald: {
      name: 'Emerald Mint',
      primary: '#10b981',
      secondary: '#14b8a6',
      bg: 'https://images.unsplash.com/photo-1511497584788-87676104235f?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.38'
    },
    sunset: {
      name: 'Sunset Twilight',
      primary: '#f97316',
      secondary: '#ec4899',
      bg: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2073&auto=format&fit=crop',
      blur: '12',
      opacity: '0.38'
    },
    midnight: {
      name: 'Midnight Phantom',
      primary: '#64748b',
      secondary: '#38bdf8',
      bg: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop',
      blur: '16',
      opacity: '0.35'
    },
    toxic: {
      name: 'Toxic Neon',
      primary: '#a3e635',
      secondary: '#06b6d4',
      bg: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?q=80&w=2070&auto=format&fit=crop',
      blur: '12',
      opacity: '0.40'
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
    root.style.setProperty('--theme-card-blur', `${activeSettings.card_blur || 12}px`);
    root.style.setProperty('--theme-card-opacity', activeSettings.card_opacity || '0.38');
    root.style.setProperty('--theme-card-bg', `rgba(11, 15, 25, ${activeSettings.card_opacity || 0.38})`);

    // Full-Screen Wallpaper (Login background falls back safely to space wallpaper, NEVER replaces small logo)
    const bgContainer = document.getElementById('premium-bg-container');
    const bgOverlay = document.getElementById('premium-bg-overlay');
    const isLoginPage = window.location.pathname.includes('/auth/');

    const defaultSpaceBg = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop';
    const bgImg = isLoginPage 
      ? (activeSettings.login_bg || defaultSpaceBg)
      : (activeSettings.dashboard_bg || defaultSettings.dashboard_bg);

    if (bgImg) {
      if (bgContainer && !bgContainer.style.backgroundImage.includes(bgImg)) {
        bgContainer.style.backgroundImage = `url('${bgImg}')`;
      }
      document.body.style.backgroundImage = `url('${bgImg}')`;
      document.body.style.backgroundSize = 'cover';
      document.body.style.backgroundPosition = 'center center';
      document.body.style.backgroundAttachment = 'fixed';
    }

    if (bgOverlay) {
      bgOverlay.style.background = `rgba(11, 15, 25, ${activeSettings.bg_overlay_opacity || 0.50})`;
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
        --theme-card-opacity: ${activeSettings.card_opacity || 0.38} !important;
        --theme-card-bg: rgba(11, 15, 25, ${activeSettings.card_opacity || 0.38}) !important;
        --theme-card-blur: ${activeSettings.card_blur || 12}px !important;
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
      /* Pastikan Kad Pelayan di Dashboard Telus Kaca 100% Ikut Tema */
      a[class*="ServerRow"], div[class*="ServerRow"], [class*="ServerRow"], a[href*="/server/"] {
        background: rgba(11, 15, 25, ${activeSettings.card_opacity || 0.38}) !important;
        background-color: rgba(11, 15, 25, ${activeSettings.card_opacity || 0.38}) !important;
        border-left-color: ${activeSettings.primary_color} !important;
      }
      ${activeSettings.custom_css || ''}
    `;

    runPageEnhancements();
  }

  // 3. Guaranteed Login Logo Replacement (HANYA menukar logo kecil di dalam kad login)
  function updateLoginLogo() {
    if (!window.location.pathname.includes('/auth/')) return;

    const loginImg = document.querySelector('div[class*="LoginFormContainer"] img, form img');
    const logoUrl = (activeSettings.login_logo || '').trim();
    const logoHeight = activeSettings.logo_height || '85';
    const logoGlow = activeSettings.logo_glow !== false;
    const glowFilter = logoGlow ? `drop-shadow(0 0 12px var(--theme-glow))` : 'none';

    if (loginImg) {
      if (logoUrl) {
        if (loginImg.src !== logoUrl) {
          loginImg.src = logoUrl;
        }
        loginImg.style.maxHeight = `${logoHeight}px`;
        loginImg.style.maxWidth = '100px';
        loginImg.style.width = 'auto';
        loginImg.style.height = 'auto';
        loginImg.style.objectFit = 'contain';
        loginImg.style.display = 'block';
        loginImg.style.margin = '0 auto';
        loginImg.style.filter = glowFilter;
      } else {
        loginImg.style.maxHeight = `${logoHeight}px`;
        loginImg.style.maxWidth = '100px';
        loginImg.style.objectFit = 'contain';
        loginImg.style.filter = glowFilter;
      }
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

  // 5. Announcement Bar Component (Never wraps close button)
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
      if (nav && nav.nextElementSibling) {
        nav.parentNode.insertBefore(bar, nav.nextElementSibling);
      } else if (nav && nav.parentNode) {
        nav.parentNode.appendChild(bar);
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

  // 7. Inject Admin Sidebar Item: ONLY 1 BUTTON DIRECTLY UNDER "Application API" (PRO DESIGN)
  function injectAdminSidebarItem() {
    if (!window.location.pathname.startsWith('/admin')) return;

    // Bersihkan sebarang butang terapung yang tidak diingini
    const stray = ['#premium-theme-fab', '.premium-top-setting-btn', '#premium-nav-theme-btn'];
    stray.forEach(s => document.querySelectorAll(s).forEach(e => e.remove()));

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
          <div>
            <i class="fa fa-palette"></i> <span>Tema Panel</span>
          </div>
          <span class="admin-theme-pro-badge">PRO</span>
        </a>
      `;

      targetLi.parentNode.insertBefore(themeLi, targetLi.nextSibling);

      document.getElementById('admin-theme-sidebar-link').addEventListener('click', function (e) {
        e.preventDefault();
        openThemeModal();
      });
    }
  }

  // 8. Build Theme Settings Modal (Only Injected/Opened on Admin Panel)
  function buildThemeModal() {
    if (document.getElementById('premium-settings-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'premium-settings-modal-overlay';
    overlay.innerHTML = `
      <div id="premium-settings-modal">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fa-solid fa-palette"></i>
            <span>Pengaturan Tema & Logo Panel (v3.3 Pro)</span>
          </div>
          <button id="premium-modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="tab-templates"><i class="fa-solid fa-wand-magic-sparkles"></i> 12 Template Tema</button>
          <button class="modal-tab-btn" data-tab="tab-colors"><i class="fa-solid fa-droplet"></i> Warna & Mix</button>
          <button class="modal-tab-btn" data-tab="tab-logo"><i class="fa-solid fa-shield-cat"></i> Logo Kecil Login</button>
          <button class="modal-tab-btn" data-tab="tab-bg"><i class="fa-solid fa-image"></i> Wallpaper</button>
          <button class="modal-tab-btn" data-tab="tab-announcement"><i class="fa-solid fa-bullhorn"></i> Pengumuman</button>
          <button class="modal-tab-btn" data-tab="tab-effects"><i class="fa-solid fa-sliders"></i> Kaca & Pelayan</button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: 12 TEMPLATES -->
          <div id="tab-templates" class="tab-pane active">
            <div class="form-group">
              <label class="form-label">Pilih Template Tema Siap Pakai (1-Klik)</label>
              <span class="form-subtext">Klik template pilihan untuk memuat padanan warna, wallpaper dan gaya kaca secara pantas:</span>
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

                <div class="template-preset-card" data-template="midnight">
                  <div class="template-card-icon">🌌</div>
                  <div class="template-card-title">Midnight Phantom</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#64748b;"></span>
                    <span class="template-card-dot" style="background:#38bdf8;"></span>
                  </div>
                </div>

                <div class="template-preset-card" data-template="toxic">
                  <div class="template-card-icon">☣️</div>
                  <div class="template-card-title">Toxic Neon</div>
                  <div class="template-card-palette">
                    <span class="template-card-dot" style="background:#a3e635;"></span>
                    <span class="template-card-dot" style="background:#06b6d4;"></span>
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
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #a855f7, #ec4899);" data-p="#a855f7" data-s="#ec4899">Amethyst Pink</div>
                <div class="mix-color-pill" style="background: linear-gradient(135deg, #14b8a6, #3b82f6);" data-p="#14b8a6" data-s="#3b82f6">Teal Ocean</div>
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
                <div class="color-preset-pill" style="background: #a3e635;" data-color="#a3e635"></div>
                <div class="color-preset-pill" style="background: #64748b;" data-color="#64748b"></div>
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

          <!-- TAB 3: LOGO KECIL LOGIN (HANYA MENUKAR LOGO KECIL, BUKAN WALLPAPER) -->
          <div id="tab-logo" class="tab-pane">
            <div class="form-group">
              <label class="form-label">URL Logo Kecil Login (Hanya Menukar Logo di Kad, BUKAN Wallpaper)</label>
              <span class="form-subtext">Pautan ini <b>HANYA</b> menukar ikon/logo kecil pada kad login. Gambar latar belakang penuh dikawal berasingan di Tab Wallpaper:</span>
              <input type="text" id="cfg-login-logo" class="input-text" placeholder="https://i.imgur.com/logo-kecil.png" value="${activeSettings.login_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Pratinjau Logo Kecil (Live Preview)</label>
              <div id="logo-preview-container" class="logo-preview-box"></div>
            </div>

            <div class="form-group">
              <label class="form-label">URL Logo Navbar Dashboard</label>
              <input type="text" id="cfg-navbar-logo" class="input-text" placeholder="https://..." value="${activeSettings.navbar_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Ketinggian Logo Kecil: <span id="val-logo-height" class="range-val-badge">${activeSettings.logo_height || 85}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-logo-height" class="input-range" min="45" max="130" value="${activeSettings.logo_height || 85}">
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
              <label class="form-label">URL Wallpaper Dashboard & Server (Penuh Skrin)</label>
              <span class="form-subtext">Latar belakang penuh yang akan menyatu secara lutsinar di belakang kad pelayan:</span>
              <input type="text" id="cfg-dashboard-bg" class="input-text" placeholder="https://..." value="${activeSettings.dashboard_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Preset Wallpaper Pantas</label>
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px;">
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop">Motherboard Circuit</button>
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop">Deep Space Earth</button>
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=2047&auto=format&fit=crop">Cyber City</button>
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=2070&auto=format&fit=crop">Violet Waves</button>
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=2070&auto=format&fit=crop">Matrix Code</button>
                <button type="button" class="btn-luxury btn-outline quick-bg-btn" data-bg="https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2070&auto=format&fit=crop">Dark Mountains</button>
              </div>
            </div>

            <div class="form-group" style="margin-top: 12px;">
              <label class="form-label">URL Wallpaper Halaman Login (Penuh Skrin)</label>
              <span class="form-subtext">Gambar latar belakang penuh untuk skrin login (bukan logo kecil):</span>
              <input type="text" id="cfg-login-bg" class="input-text" placeholder="https://..." value="${activeSettings.login_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Kegelapan Lapisan Overlay: <span id="val-overlay" class="range-val-badge">${Math.round(activeSettings.bg_overlay_opacity * 100)}%</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-bg-overlay" class="input-range" min="10" max="95" value="${Math.round(activeSettings.bg_overlay_opacity * 100)}">
              </div>
            </div>
          </div>

          <!-- TAB 5: ANNOUNCEMENT (DENGAN PILIHAN WARNA LENGKAP) -->
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

            <div class="form-group" style="margin-top: 10px;">
              <label class="form-label">Teks Pengumuman</label>
              <textarea id="cfg-announcement-text" class="input-text" rows="3">${activeSettings.announcement_text || ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Pilihan Warna Banner Pengumuman</label>
              <select id="cfg-announcement-type" class="input-text">
                <option value="gradient" ${activeSettings.announcement_type === 'gradient' ? 'selected' : ''}>Theme Gradient (Menyatu dengan tema)</option>
                <option value="info" ${activeSettings.announcement_type === 'info' ? 'selected' : ''}>Cyan Info Alert</option>
                <option value="emerald" ${activeSettings.announcement_type === 'emerald' ? 'selected' : ''}>Emerald Hijau (Success)</option>
                <option value="warning" ${activeSettings.announcement_type === 'warning' ? 'selected' : ''}>Sunset Amber (Warning)</option>
                <option value="danger" ${activeSettings.announcement_type === 'danger' ? 'selected' : ''}>Crimson Merah (Urgent Alert)</option>
                <option value="midnight" ${activeSettings.announcement_type === 'midnight' ? 'selected' : ''}>Midnight Obsidian (Gelap Kaca)</option>
                <option value="purple" ${activeSettings.announcement_type === 'purple' ? 'selected' : ''}>Royal Violet</option>
              </select>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13px; font-weight:700;">Teks Berjalan (Marquee)</div>
                <div style="font-size:11px; color:#94a3b8;">Nyahaktifkan untuk teks kekal diam (statik) yang kemas & mudah dibaca serta-merta.</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-marquee" ${activeSettings.announcement_marquee ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 6: EFEK KACA & TRANSPARAN KAD PELAYAN -->
          <div id="tab-effects" class="tab-pane">
            <div class="form-group">
              <label class="form-label">Ketelusan Kad Pelayan (Dashboard): <span id="val-opacity" class="range-val-badge">${Math.round(activeSettings.card_opacity * 100)}%</span></label>
              <span class="form-subtext">Rendahkan untuk membuat kad pelayan di dashboard menyatu sepenuhnya dengan wallpaper latar:</span>
              <div class="slider-container">
                <input type="range" id="cfg-card-opacity" class="input-range" min="15" max="80" value="${Math.round(activeSettings.card_opacity * 100)}">
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

    // 12 Templates Click Handler
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

    // Quick Wallpapers
    overlay.querySelectorAll('.quick-bg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const bgUrl = btn.getAttribute('data-bg');
        document.getElementById('cfg-dashboard-bg').value = bgUrl;
        applyTheme(Object.assign({}, activeSettings, { dashboard_bg: bgUrl }));
        showToast('Wallpaper Berjaya Ditukar!');
      });
    });

    // Mix Colors
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

    // Single Colors
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
        previewContainer.innerHTML = `<span class="logo-preview-empty"><i class="fa-solid fa-circle-info"></i> Tiada URL (Maskot Asal Bercahaya Digunakan)</span>`;
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

  // 9. Run Page Enhancements (Controlled & Zero-Lag)
  function runPageEnhancements() {
    isMutating = true;
    try {
      updateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
      injectAdminSidebarItem();
    } finally {
      setTimeout(() => {
        isMutating = false;
      }, 50);
    }
  }

  // 10. Throttled Watcher (Zero Lag)
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

  // 11. Main Bootstrap
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
