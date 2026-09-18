/**
 * FAKRULDEV & FAHRI HOSTING - LUXURY PREMIUM ANIMATED THEME (v2.2 FIXED)
 * Pterodactyl Panel Luxury Glassmorphism & Admin Sidebar Integration
 */

(function () {
  'use strict';

  // Default theme settings
  const defaultSettings = {
    primary_color: '#6366f1',
    primary_glow: 'rgba(99, 102, 241, 0.45)',
    theme_mode: 'dark',
    dashboard_bg: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2070&auto=format&fit=crop',
    login_bg: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop',
    bg_overlay_opacity: '0.75',
    login_logo: '',
    navbar_logo: '',
    logo_height: '60',
    logo_glow: true,
    card_blur: '16',
    card_opacity: '0.85',
    animated_bg: true,
    card_tilt: true,
    glow_effects: true,
    announcement_enabled: true,
    announcement_text: '🔥 <b>Selamat Datang!</b> Panel Cloud & Game Server siap digunakan 24/7. Hubungi admin untuk bantuan teknis.',
    announcement_type: 'gradient',
    announcement_marquee: true,
    custom_css: '',
    allow_user_customizer: true
  };

  let activeSettings = Object.assign({}, defaultSettings);

  // Helper: Hex to RGB
  function hexToRgb(hex) {
    hex = (hex || '#6366f1').replace('#', '');
    if (hex.length === 3) {
      hex = hex.split('').map(c => c + c).join('');
    }
    const num = parseInt(hex, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  // 1. Initialize Background DOM Containers
  function initBackgroundDOM() {
    if (!document.getElementById('premium-bg-container')) {
      const bg = document.createElement('div');
      bg.id = 'premium-bg-container';

      const overlay = document.createElement('div');
      overlay.id = 'premium-bg-overlay';
      bg.appendChild(overlay);

      document.body.prepend(bg);
    }

    if (!document.getElementById('premium-glow-orb-1')) {
      const orb1 = document.createElement('div');
      orb1.id = 'premium-glow-orb-1';
      orb1.className = 'premium-glow-orb premium-glow-orb-1';
      document.body.prepend(orb1);

      const orb2 = document.createElement('div');
      orb2.id = 'premium-glow-orb-2';
      orb2.className = 'premium-glow-orb premium-glow-orb-2';
      document.body.prepend(orb2);
    }
  }

  // 2. Apply Dynamic Theme CSS Variables & Overrides
  function applyTheme(settings) {
    activeSettings = Object.assign({}, activeSettings, settings);

    const rgb = hexToRgb(activeSettings.primary_color || '#6366f1');
    const rgbStr = `${rgb.r}, ${rgb.g}, ${rgb.b}`;
    const glowStr = `rgba(${rgbStr}, 0.45)`;

    const root = document.documentElement;
    root.style.setProperty('--theme-primary', activeSettings.primary_color);
    root.style.setProperty('--theme-primary-rgb', rgbStr);
    root.style.setProperty('--theme-glow', glowStr);
    root.style.setProperty('--theme-card-blur', `${activeSettings.card_blur || 16}px`);
    root.style.setProperty('--theme-card-bg', `rgba(17, 24, 39, ${activeSettings.card_opacity || 0.85})`);

    // Background Container
    const bgContainer = document.getElementById('premium-bg-container');
    const bgOverlay = document.getElementById('premium-bg-overlay');
    const isLoginPage = window.location.pathname.includes('/auth/');

    if (bgContainer && bgOverlay) {
      const bgImg = isLoginPage 
        ? (activeSettings.login_bg || activeSettings.dashboard_bg || '')
        : (activeSettings.dashboard_bg || '');

      if (bgImg) {
        bgContainer.style.backgroundImage = `url('${bgImg}')`;
      } else {
        bgContainer.style.backgroundImage = 'none';
      }

      bgOverlay.style.background = `rgba(11, 15, 25, ${activeSettings.bg_overlay_opacity || 0.75})`;
    }

    // Toggle Ambient Orbs
    const orb1 = document.getElementById('premium-glow-orb-1');
    const orb2 = document.getElementById('premium-glow-orb-2');
    if (orb1 && orb2) {
      const showOrbs = activeSettings.animated_bg !== false;
      orb1.style.display = showOrbs ? 'block' : 'none';
      orb2.style.display = showOrbs ? 'block' : 'none';
      orb1.style.background = activeSettings.primary_color;
    }

    // Dynamic Style Tag
    let styleTag = document.getElementById('premium-dynamic-theme-style');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'premium-dynamic-theme-style';
      document.head.appendChild(styleTag);
    }

    styleTag.innerHTML = `
      :root {
        --theme-primary: ${activeSettings.primary_color} !important;
        --theme-primary-rgb: ${rgbStr} !important;
        --theme-glow: ${glowStr} !important;
      }
      button.btn-primary, button[type="submit"], .bg-primary-500, .bg-blue-600 {
        background: linear-gradient(135deg, ${activeSettings.primary_color} 0%, rgba(${rgbStr}, 0.85) 100%) !important;
      }
      .border-primary-500, .border-blue-500 {
        border-color: ${activeSettings.primary_color} !important;
      }
      .text-primary-500, .text-blue-500, .text-cyan-400 {
        color: ${activeSettings.primary_color} !important;
      }
      ${activeSettings.custom_css || ''}
    `;

    // Apply Logo Fix & Announcement
    injectOrUpdateLoginLogo();
    updateNavbarLogo();
    updateAnnouncement();
  }

  // 3. Guaranteed Login Logo Fix (Supports Custom Image & Default Cyber Emblem)
  function injectOrUpdateLoginLogo() {
    const isLoginPage = window.location.pathname.includes('/auth/');
    if (!isLoginPage) return;

    // Find the title "Login to Continue" or login card
    let titleEl = null;
    const elements = document.querySelectorAll('h1, h2, h3, h4, div, p');
    for (let i = 0; i < elements.length; i++) {
      const text = elements[i].textContent ? elements[i].textContent.trim() : '';
      if (text === 'Login to Continue') {
        titleEl = elements[i];
        break;
      }
    }

    const container = document.querySelector('div[class*="LoginFormContainer"]') ||
                      document.querySelector('div[class*="LoginContainer"]') ||
                      document.querySelector('form[class*="LoginForm"]') ||
                      document.querySelector('#app form');

    if (!titleEl && !container) return;

    const targetParent = titleEl ? titleEl.parentNode : container;
    const targetBefore = titleEl || targetParent.firstChild;

    let logoWrapper = document.getElementById('premium-login-logo-box');
    if (!logoWrapper) {
      logoWrapper = document.createElement('div');
      logoWrapper.id = 'premium-login-logo-box';
      logoWrapper.className = 'premium-login-logo-wrapper';
      targetParent.insertBefore(logoWrapper, targetBefore);
    }

    const logoUrl = (activeSettings.login_logo || '').trim();
    const logoHeight = activeSettings.logo_height || '60';
    const logoGlow = activeSettings.logo_glow !== false;
    const glowFilter = logoGlow ? `filter: drop-shadow(0 0 16px var(--theme-glow));` : '';

    if (logoUrl) {
      logoWrapper.innerHTML = `
        <img id="premium-login-logo-img" 
             class="premium-custom-login-logo" 
             src="${logoUrl}" 
             alt="Panel Logo" 
             style="max-height: ${logoHeight}px; max-width: 260px; object-fit: contain; ${glowFilter}" />
      `;
    } else {
      logoWrapper.innerHTML = `
        <div class="premium-default-logo-badge" style="${glowFilter}" title="Klik butang tema untuk mengganti logo ini">
          <svg class="premium-svg-animated-emblem" viewBox="0 0 80 80" width="58" height="58">
            <defs>
              <linearGradient id="pEmblemGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="var(--theme-primary, #6366f1)"/>
                <stop offset="100%" stop-color="#06b6d4"/>
              </linearGradient>
            </defs>
            <polygon points="40,8 72,26 72,54 40,72 8,54 8,26" fill="rgba(99, 102, 241, 0.18)" stroke="url(#pEmblemGrad)" stroke-width="2.5" />
            <polygon points="40,18 62,31 62,49 40,62 18,49 18,31" fill="none" stroke="url(#pEmblemGrad)" stroke-width="1.5" stroke-dasharray="4,2" />
            <path d="M40 25 L40 55 M27 40 L53 40" stroke="url(#pEmblemGrad)" stroke-width="3" stroke-linecap="round" />
            <circle cx="40" cy="40" r="5" fill="#06b6d4" />
          </svg>
          <span class="premium-logo-text-title">PAHRI CLOUD</span>
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

  // 5. Announcement Bar Component
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
          <button id="premium-announcement-close" class="announcement-close-btn" title="Tutup Pengumuman">
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
      } else {
        document.body.prepend(bar);
      }

      document.getElementById('premium-announcement-close').addEventListener('click', function () {
        bar.classList.remove('announcement-active');
        sessionStorage.setItem('premium_announcement_dismissed', 'true');
      });
    }

    const isDismissed = sessionStorage.getItem('premium_announcement_dismissed') === 'true';
    const isEnabled = activeSettings.announcement_enabled && !isDismissed && activeSettings.announcement_text.trim() !== '';

    if (isEnabled) {
      bar.className = `announcement-theme-${activeSettings.announcement_type || 'gradient'} announcement-active`;
      const textEl = document.getElementById('premium-announcement-text');
      if (textEl) {
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

  // 7. Inject Sidebar Item Under "Application API" (Sesuai Saiz & Format Asal Admin)
  function injectAdminSidebarItem() {
    if (!window.location.pathname.startsWith('/admin')) return;

    // Remove any accidental floating button or header pill from admin page
    const existingFab = document.getElementById('premium-theme-fab');
    if (existingFab) existingFab.remove();

    const existingTopBtn = document.getElementById('premium-top-setting-btn');
    if (existingTopBtn) existingTopBtn.remove();

    const existingNavBtn = document.getElementById('premium-nav-theme-btn');
    if (existingNavBtn) existingNavBtn.remove();

    if (document.getElementById('admin-theme-sidebar-item')) return;

    // Search for "Application API" in the sidebar
    const allLinks = document.querySelectorAll('aside.main-sidebar .sidebar-menu a, .sidebar a');
    let targetLi = null;

    for (let i = 0; i < allLinks.length; i++) {
      const link = allLinks[i];
      const text = (link.textContent || '').trim();
      const href = link.getAttribute('href') || '';
      if (text.includes('Application API') || href.includes('/admin/api')) {
        targetLi = link.closest('li');
        break;
      }
    }

    // Fallback if not found: search for "Settings"
    if (!targetLi) {
      for (let i = 0; i < allLinks.length; i++) {
        const link = allLinks[i];
        const text = (link.textContent || '').trim();
        if (text === 'Settings') {
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
          <i class="fa fa-paint-brush"></i> <span>Theme Settings</span>
        </a>
      `;

      // Insert directly after Application API
      targetLi.parentNode.insertBefore(themeLi, targetLi.nextSibling);

      document.getElementById('admin-theme-sidebar-link').addEventListener('click', function (e) {
        e.preventDefault();
        openThemeModal();
      });
    }
  }

  // 8. Inject Theme Buttons for Client & Login (Compact Fixed Size)
  function injectClientButtons() {
    const isLoginPage = window.location.pathname.includes('/auth/');
    const isAdminPage = window.location.pathname.startsWith('/admin');

    if (isAdminPage) {
      // In Admin, do NOT inject floating button or top pill!
      return;
    }

    // A. Compact Floating Circular Button (Bottom-Left)
    let fab = document.getElementById('premium-theme-fab');
    if (!fab) {
      fab = document.createElement('div');
      fab.id = 'premium-theme-fab';
      fab.title = 'Pengaturan Tema';
      fab.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
      document.body.appendChild(fab);
      fab.addEventListener('click', openThemeModal);
    }

    // B. Top-Right Corner Button on Login Page
    if (isLoginPage && !document.getElementById('premium-top-setting-btn')) {
      const topBtn = document.createElement('div');
      topBtn.id = 'premium-top-setting-btn';
      topBtn.className = 'premium-top-setting-btn';
      topBtn.innerHTML = '<i class="fa-solid fa-palette"></i> <span>Ubah Tema & Logo</span>';
      document.body.appendChild(topBtn);
      topBtn.addEventListener('click', openThemeModal);
    }

    // C. Navbar Button on Client Dashboard (SPA)
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

  // 9. Build Theme Settings Modal (Available everywhere)
  function buildThemeModal() {
    if (document.getElementById('premium-settings-modal-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'premium-settings-modal-overlay';
    overlay.innerHTML = `
      <div id="premium-settings-modal">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fa-solid fa-palette"></i>
            <span>Pengaturan Tema Luxury & Logo Panel</span>
          </div>
          <button id="premium-modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="tab-colors"><i class="fa-solid fa-droplet"></i> Warna & Aksen</button>
          <button class="modal-tab-btn" data-tab="tab-bg"><i class="fa-solid fa-image"></i> Background</button>
          <button class="modal-tab-btn" data-tab="tab-logo"><i class="fa-solid fa-shield-cat"></i> Logo & Brand</button>
          <button class="modal-tab-btn" data-tab="tab-announcement"><i class="fa-solid fa-bullhorn"></i> Pengumuman</button>
          <button class="modal-tab-btn" data-tab="tab-effects"><i class="fa-solid fa-sparkles"></i> Animasi</button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: WARNA -->
          <div id="tab-colors" class="tab-pane active">
            <div class="form-group">
              <label class="form-label">Warna Utama (Primary Accent)</label>
              <span class="form-subtext">Klik preset warna mewah berikut untuk pratinjau langsung:</span>
              <div class="color-presets-grid">
                <div class="color-preset-pill" style="background: #6366f1;" data-color="#6366f1" title="Indigo Luxury"></div>
                <div class="color-preset-pill" style="background: #8b5cf6;" data-color="#8b5cf6" title="Cyber Violet"></div>
                <div class="color-preset-pill" style="background: #06b6d4;" data-color="#06b6d4" title="Neon Cyan"></div>
                <div class="color-preset-pill" style="background: #10b981;" data-color="#10b981" title="Emerald Glow"></div>
                <div class="color-preset-pill" style="background: #f43f5e;" data-color="#f43f5e" title="Crimson Ruby"></div>
                <div class="color-preset-pill" style="background: #f59e0b;" data-color="#f59e0b" title="Sunset Gold"></div>
                <div class="color-preset-pill" style="background: #3b82f6;" data-color="#3b82f6" title="Electric Blue"></div>
                <div class="color-preset-pill" style="background: #ec4899;" data-color="#ec4899" title="Neon Pink"></div>
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Custom HEX Color</label>
              <div class="custom-color-row">
                <input type="color" id="cfg-primary-picker" class="color-picker-input" value="${activeSettings.primary_color}">
                <input type="text" id="cfg-primary-hex" class="input-text" style="width: 140px;" value="${activeSettings.primary_color}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Tingkat Efek Kaca (Glass Blur): <span id="val-blur" class="range-val-badge">${activeSettings.card_blur}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-card-blur" class="input-range" min="0" max="30" value="${activeSettings.card_blur}">
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Kepekatan Kartu (Card Opacity): <span id="val-opacity" class="range-val-badge">${Math.round(activeSettings.card_opacity * 100)}%</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-card-opacity" class="input-range" min="30" max="100" value="${Math.round(activeSettings.card_opacity * 100)}">
              </div>
            </div>
          </div>

          <!-- TAB 2: BACKGROUND -->
          <div id="tab-bg" class="tab-pane">
            <div class="form-group">
              <label class="form-label">URL Wallpaper Background Dashboard</label>
              <span class="form-subtext">Masukkan link gambar (JPG/PNG/WebP/GIF) untuk latar dashboard.</span>
              <input type="text" id="cfg-dashboard-bg" class="input-text" placeholder="https://..." value="${activeSettings.dashboard_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">URL Wallpaper Halaman Login</label>
              <span class="form-subtext">Kosongkan jika ingin mengikuti background dashboard.</span>
              <input type="text" id="cfg-login-bg" class="input-text" placeholder="https://..." value="${activeSettings.login_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Kegelapan Lapisan Overlay: <span id="val-overlay" class="range-val-badge">${Math.round(activeSettings.bg_overlay_opacity * 100)}%</span></label>
              <span class="form-subtext">Tingkat kegelapan di atas wallpaper agar teks dan kartu server tetap terbaca jelas.</span>
              <div class="slider-container">
                <input type="range" id="cfg-bg-overlay" class="input-range" min="10" max="95" value="${Math.round(activeSettings.bg_overlay_opacity * 100)}">
              </div>
            </div>
          </div>

          <!-- TAB 3: LOGO & BRAND -->
          <div id="tab-logo" class="tab-pane">
            <div class="form-group">
              <label class="form-label">URL Logo Halaman Login (PNG/JPG/SVG/WebP)</label>
              <span class="form-subtext">Logo ini akan otomatis dipasang di atas form login. Jika dikosongkan, logo emblem default Pahri Cloud akan digunakan.</span>
              <input type="text" id="cfg-login-logo" class="input-text" placeholder="https://i.imgur.com/your-logo.png" value="${activeSettings.login_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">URL Logo Navbar Dashboard</label>
              <span class="form-subtext">Logo di pojok navigasi atas dashboard server.</span>
              <input type="text" id="cfg-navbar-logo" class="input-text" placeholder="https://..." value="${activeSettings.navbar_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Ukuran / Tinggi Logo: <span id="val-logo-height" class="range-val-badge">${activeSettings.logo_height || 60}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-logo-height" class="input-range" min="30" max="120" value="${activeSettings.logo_height || 60}">
              </div>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Efek Cahaya Neon Logo (Glow)</div>
                <div style="font-size:12px; color:#64748b;">Pendaran pendar cahaya lembut di sekeliling logo</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-logo-glow" ${activeSettings.logo_glow ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 4: ANNOUNCEMENT -->
          <div id="tab-announcement" class="tab-pane">
            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Aktifkan Banner Pengumuman</div>
                <div style="font-size:12px; color:#64748b;">Menampilkan siaran berita di atas dashboard</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-enabled" ${activeSettings.announcement_enabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="form-group">
              <label class="form-label">Teks Pengumuman</label>
              <textarea id="cfg-announcement-text" class="input-text" rows="3" style="resize:vertical;">${activeSettings.announcement_text || ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Gaya Banner</label>
              <select id="cfg-announcement-type" class="input-text">
                <option value="gradient" ${activeSettings.announcement_type === 'gradient' ? 'selected' : ''}>Luxury Gradient Accent</option>
                <option value="info" ${activeSettings.announcement_type === 'info' ? 'selected' : ''}>Cyan Info Alert</option>
                <option value="warning" ${activeSettings.announcement_type === 'warning' ? 'selected' : ''}>Sunset Warning</option>
                <option value="danger" ${activeSettings.announcement_type === 'danger' ? 'selected' : ''}>Crimson Urgent Alert</option>
              </select>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Teks Berjalan (Running Marquee)</div>
                <div style="font-size:12px; color:#64748b;">Animasi teks bergerak halus horizontal</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-marquee" ${activeSettings.announcement_marquee ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 5: ANIMASI -->
          <div id="tab-effects" class="tab-pane">
            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Animated Ambient Glow Orbs</div>
                <div style="font-size:12px; color:#64748b;">Pendaran bola cahaya dinamis mengapung di latar belakang</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-animated-bg" ${activeSettings.animated_bg ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Efek Angkat & Animasi Kartu (3D Hover Lift)</div>
                <div style="font-size:12px; color:#64748b;">Kartu server terangkat dengan bayangan neon saat kursor diarahkan</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-card-tilt" ${activeSettings.card_tilt ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
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

    // Bindings
    document.getElementById('premium-modal-close').addEventListener('click', closeThemeModal);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeThemeModal();
    });

    // Tab Switching
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

    // Color Presets
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

    // Color Picker Live
    const picker = document.getElementById('cfg-primary-picker');
    const hexInput = document.getElementById('cfg-primary-hex');
    picker.addEventListener('input', (e) => {
      hexInput.value = e.target.value;
      applyTheme(Object.assign({}, activeSettings, { primary_color: e.target.value }));
    });
    hexInput.addEventListener('input', (e) => {
      if (/^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
        picker.value = e.target.value;
        applyTheme(Object.assign({}, activeSettings, { primary_color: e.target.value }));
      }
    });

    // Sliders Live Preview
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

    // Save Handler
    document.getElementById('premium-btn-save').addEventListener('click', () => {
      const payload = {
        primary_color: hexInput.value,
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
        animated_bg: document.getElementById('cfg-animated-bg').checked,
        card_tilt: document.getElementById('cfg-card-tilt').checked,
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
        showToast('Pengaturan Tema Berhasil Disimpan!', 'fa-check-double');
        closeThemeModal();
      })
      .catch(err => {
        showToast('Tersimpan di Browser (Local Storage)', 'fa-floppy-disk');
        closeThemeModal();
      });
    });

    // Reset Handler
    document.getElementById('premium-btn-reset').addEventListener('click', () => {
      if (confirm('Kembalikan semua pengaturan tema ke nilai default?')) {
        applyTheme(defaultSettings);
        localStorage.removeItem('premium_pterodactyl_settings');

        fetch('/themes/premium/api/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(defaultSettings)
        }).then(() => {
          showToast('Tema Dikembalikan ke Default!', 'fa-rotate-left');
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

  // 10. MutationObserver for React Hydration & Admin Page Transitions
  function setupWatcher() {
    const observer = new MutationObserver(() => {
      injectOrUpdateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
      injectAdminSidebarItem();
      injectClientButtons();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    let count = 0;
    const interval = setInterval(() => {
      injectOrUpdateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
      injectAdminSidebarItem();
      injectClientButtons();
      count++;
      if (count > 10) clearInterval(interval);
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
        console.log('Menggunakan konfigurasi cache lokal:', err);
      })
      .finally(() => {
        injectAdminSidebarItem();
        injectClientButtons();
        setupWatcher();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

})();
