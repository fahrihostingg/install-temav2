/**
 * FAKRULDEV & FAHRI HOSTING - LUXURY PREMIUM ANIMATED THEME (v2.0)
 * Pterodactyl Panel Luxury Glassmorphism & Animated Suite
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
    logo_height: '50',
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
    hex = hex.replace('#', '');
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

  // 1. Initialize DOM Background & Canvas
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

  // 2. Apply Dynamic Styles & CSS Variables
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
    const isLoginPage = window.location.pathname.includes('/auth/login') || window.location.pathname.includes('/auth/password');

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

    // Dynamic Style Tag for React UI Overrides
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
        background: linear-gradient(135deg, ${activeSettings.primary_color} 0%, rgba(${rgbStr}, 0.8) 100%) !important;
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
    updateLoginLogo();
    updateNavbarLogo();
    updateAnnouncement();
  }

  // 3. Fix & Update Login Logo
  function updateLoginLogo() {
    const isLoginPage = window.location.pathname.includes('/auth/');
    if (!isLoginPage) return;

    const logoUrl = activeSettings.login_logo;
    const logoHeight = activeSettings.logo_height || '55';
    const logoGlow = activeSettings.logo_glow !== false;

    // Search for login container
    const loginForm = document.querySelector('div[class*="LoginFormContainer"]') ||
                      document.querySelector('div[class*="LoginContainer"]') ||
                      document.querySelector('form[class*="LoginForm"]') ||
                      document.querySelector('#app form');

    if (!loginForm) return;

    let existingWrapper = document.getElementById('premium-login-logo-box');

    if (logoUrl && logoUrl.trim() !== '') {
      // Hide standard Pterodactyl SVG if present
      const standardSvgs = loginForm.querySelectorAll('svg');
      standardSvgs.forEach(svg => {
        if (!svg.closest('#premium-login-logo-box')) {
          svg.style.display = 'none';
        }
      });

      if (!existingWrapper) {
        existingWrapper = document.createElement('div');
        existingWrapper.id = 'premium-login-logo-box';
        existingWrapper.className = 'premium-login-logo-wrapper';
        
        const img = document.createElement('img');
        img.id = 'premium-login-logo-img';
        img.className = 'premium-custom-login-logo';
        img.alt = 'Logo';
        existingWrapper.appendChild(img);

        // Prepend to login box
        loginForm.prepend(existingWrapper);
      }

      const imgEl = document.getElementById('premium-login-logo-img');
      if (imgEl) {
        if (imgEl.src !== logoUrl) {
          imgEl.src = logoUrl;
        }
        imgEl.style.maxHeight = `${logoHeight}px`;
        imgEl.style.filter = logoGlow ? `drop-shadow(0 0 16px var(--theme-glow))` : 'none';
      }
    } else {
      // If no custom logo, show default SVG and remove custom wrapper
      if (existingWrapper) {
        existingWrapper.remove();
      }
      const standardSvgs = loginForm.querySelectorAll('svg');
      standardSvgs.forEach(svg => {
        svg.style.display = '';
      });
    }
  }

  // 4. Update Navbar Logo on Dashboard
  function updateNavbarLogo() {
    if (window.location.pathname.includes('/auth/')) return;
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

      // Hide default SVG icon if present inside brand link
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
    if (window.location.pathname.includes('/auth/')) return;

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

      // Insert under navbar or at top of #app
      const app = document.getElementById('app');
      const nav = document.querySelector('#app nav') || document.querySelector('header');
      if (nav && nav.parentNode) {
        nav.parentNode.insertBefore(bar, nav.nextSibling);
      } else if (app) {
        app.prepend(bar);
      } else {
        document.body.prepend(bar);
      }

      // Close handler
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
        if (activeSettings.announcement_marquee) {
          textEl.className = 'announcement-marquee';
        } else {
          textEl.className = 'announcement-static';
        }
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

  // 7. Inject Floating Settings Button & Modal
  function injectSettingsUI() {
    if (document.getElementById('premium-theme-fab')) return;

    // Floating Button
    const fab = document.createElement('div');
    fab.id = 'premium-theme-fab';
    fab.title = 'Pengaturan Tema Luxury';
    fab.innerHTML = '<i class="fa-solid fa-wand-magic-sparkles"></i>';
    document.body.appendChild(fab);

    // Modal Overlay & Structure
    const overlay = document.createElement('div');
    overlay.id = 'premium-settings-modal-overlay';
    overlay.innerHTML = `
      <div id="premium-settings-modal">
        <div class="modal-header">
          <div class="modal-title">
            <i class="fa-solid fa-palette"></i>
            <span>Pengaturan Tema Luxury & Animasi</span>
          </div>
          <button id="premium-modal-close" class="modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
        </div>

        <div class="modal-tabs">
          <button class="modal-tab-btn active" data-tab="tab-colors"><i class="fa-solid fa-droplet"></i> Warna & Aksen</button>
          <button class="modal-tab-btn" data-tab="tab-bg"><i class="fa-solid fa-image"></i> Background</button>
          <button class="modal-tab-btn" data-tab="tab-logo"><i class="fa-solid fa-shield-cat"></i> Logo & Brand</button>
          <button class="modal-tab-btn" data-tab="tab-announcement"><i class="fa-solid fa-bullhorn"></i> Pengumuman</button>
          <button class="modal-tab-btn" data-tab="tab-effects"><i class="fa-solid fa-sparkles"></i> Efek & Animasi</button>
        </div>

        <div class="modal-body">
          <!-- TAB 1: WARNA -->
          <div id="tab-colors" class="tab-pane active">
            <div class="form-group">
              <label class="form-label">Warna Utama (Primary Brand Accent)</label>
              <span class="form-subtext">Pilih palet warna mewah instan atau pilih warna custom.</span>
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
              <label class="form-label">URL Background Dashboard</label>
              <span class="form-subtext">Masukkan link gambar (JPG/PNG/WebP/GIF) untuk latar dashboard.</span>
              <input type="text" id="cfg-dashboard-bg" class="input-text" placeholder="https://example.com/wallpaper.jpg" value="${activeSettings.dashboard_bg || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">URL Background Halaman Login</label>
              <span class="form-subtext">Kosongkan jika ingin mengikuti background dashboard.</span>
              <input type="text" id="cfg-login-bg" class="input-text" placeholder="https://example.com/login-bg.jpg" value="${activeSettings.login_bg || ''}">
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
              <label class="form-label">URL Logo Halaman Login</label>
              <span class="form-subtext">Logo ini akan otomatis menggantikan icon burung default Pterodactyl di form login.</span>
              <input type="text" id="cfg-login-logo" class="input-text" placeholder="https://example.com/logo.png" value="${activeSettings.login_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">URL Logo Navbar Dashboard</label>
              <span class="form-subtext">Logo di pojok kiri atas navbar navigasi server.</span>
              <input type="text" id="cfg-navbar-logo" class="input-text" placeholder="https://example.com/navbar-logo.png" value="${activeSettings.navbar_logo || ''}">
            </div>

            <div class="form-group">
              <label class="form-label">Tinggi Logo Login: <span id="val-logo-height" class="range-val-badge">${activeSettings.logo_height || 50}px</span></label>
              <div class="slider-container">
                <input type="range" id="cfg-logo-height" class="input-range" min="30" max="110" value="${activeSettings.logo_height || 50}">
              </div>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Efek Cahaya Neon Logo (Glow)</div>
                <div style="font-size:12px; color:#64748b;">Memberikan pendaran cahaya elegan di sekitar logo</div>
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
                <div style="font-size:12px; color:#64748b;">Menampilkan banner broadcast di atas dashboard</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-enabled" ${activeSettings.announcement_enabled ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="form-group">
              <label class="form-label">Teks Pengumuman (Mendukung HTML & Emojis)</label>
              <textarea id="cfg-announcement-text" class="input-text" rows="3" style="resize:vertical;">${activeSettings.announcement_text || ''}</textarea>
            </div>

            <div class="form-group">
              <label class="form-label">Gaya Tampilan Banner</label>
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
                <div style="font-size:12px; color:#64748b;">Animasi teks bergerak horizontal secara halus</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-announcement-marquee" ${activeSettings.announcement_marquee ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>
          </div>

          <!-- TAB 5: EFEK & ANIMASI -->
          <div id="tab-effects" class="tab-pane">
            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Animated Ambient Glow Orbs</div>
                <div style="font-size:12px; color:#64748b;">Efek pendaran bola cahaya dinamis mengapung di latar belakang</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-animated-bg" ${activeSettings.animated_bg ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="toggle-row">
              <div>
                <div style="font-size:13.5px; font-weight:700;">Efek Angkat & Animasi Kartu Server (Hover Lift)</div>
                <div style="font-size:12px; color:#64748b;">Transisi halus dan elevasi 3D saat kursor mendekati kartu server</div>
              </div>
              <label class="toggle-switch">
                <input type="checkbox" id="cfg-card-tilt" ${activeSettings.card_tilt ? 'checked' : ''}>
                <span class="toggle-slider"></span>
              </label>
            </div>

            <div class="form-group">
              <label class="form-label">Custom CSS Tambahan</label>
              <span class="form-subtext">Tambahkan kode CSS khusus jika ingin kustomisasi lebih lanjut.</span>
              <textarea id="cfg-custom-css" class="input-text" rows="3" style="font-family: var(--theme-mono); font-size: 12px;" placeholder=".my-custom-class { ... }">${activeSettings.custom_css || ''}</textarea>
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

    // Event Bindings for Modal
    fab.addEventListener('click', () => {
      overlay.classList.add('modal-active');
    });

    document.getElementById('premium-modal-close').addEventListener('click', () => {
      overlay.classList.remove('modal-active');
    });

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.classList.remove('modal-active');
      }
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

    // Color Presets Click
    overlay.querySelectorAll('.color-preset-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        const color = pill.getAttribute('data-color');
        document.getElementById('cfg-primary-picker').value = color;
        document.getElementById('cfg-primary-hex').value = color;
        overlay.querySelectorAll('.color-preset-pill').forEach(p => p.classList.remove('active'));
        pill.classList.add('active');
        // Live preview
        applyTheme(Object.assign({}, activeSettings, { primary_color: color }));
      });
    });

    // Color Picker Input Live Preview
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

    // Blur Slider Live Preview
    const blurSlider = document.getElementById('cfg-card-blur');
    const blurVal = document.getElementById('val-blur');
    blurSlider.addEventListener('input', (e) => {
      blurVal.textContent = `${e.target.value}px`;
      applyTheme(Object.assign({}, activeSettings, { card_blur: e.target.value }));
    });

    // Opacity Slider Live Preview
    const opacitySlider = document.getElementById('cfg-card-opacity');
    const opacityVal = document.getElementById('val-opacity');
    opacitySlider.addEventListener('input', (e) => {
      opacityVal.textContent = `${e.target.value}%`;
      applyTheme(Object.assign({}, activeSettings, { card_opacity: (e.target.value / 100).toFixed(2) }));
    });

    // Overlay Slider Live Preview
    const overlaySlider = document.getElementById('cfg-bg-overlay');
    const overlayVal = document.getElementById('val-overlay');
    overlaySlider.addEventListener('input', (e) => {
      overlayVal.textContent = `${e.target.value}%`;
      applyTheme(Object.assign({}, activeSettings, { bg_overlay_opacity: (e.target.value / 100).toFixed(2) }));
    });

    // Logo Height Slider Live Preview
    const logoHeightSlider = document.getElementById('cfg-logo-height');
    const logoHeightVal = document.getElementById('val-logo-height');
    logoHeightSlider.addEventListener('input', (e) => {
      logoHeightVal.textContent = `${e.target.value}px`;
      applyTheme(Object.assign({}, activeSettings, { logo_height: e.target.value }));
    });

    // Save Button Handler
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

      // Apply locally immediately
      applyTheme(payload);
      localStorage.setItem('premium_pterodactyl_settings', JSON.stringify(activeSettings));

      // Post to Server API
      fetch('/themes/premium/api/settings.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })
      .then(res => res.json())
      .then(data => {
        showToast('Pengaturan Tema Berhasil Disimpan!', 'fa-check-double');
        overlay.classList.remove('modal-active');
      })
      .catch(err => {
        console.warn('Simpan ke API server gagal, disimpan secara lokal di browser.', err);
        showToast('Tersimpan di Browser (Local Storage)', 'fa-floppy-disk');
        overlay.classList.remove('modal-active');
      });
    });

    // Reset Button Handler
    document.getElementById('premium-btn-reset').addEventListener('click', () => {
      if (confirm('Kembalikan semua pengaturan ke nilai default tema?')) {
        applyTheme(defaultSettings);
        localStorage.removeItem('premium_pterodactyl_settings');

        fetch('/themes/premium/api/settings.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(defaultSettings)
        }).then(() => {
          showToast('Tema Dikembalikan ke Default!', 'fa-rotate-left');
          overlay.classList.remove('modal-active');
        });
      }
    });
  }

  // 8. MutationObserver for React Hydration & Route Changes
  function setupReactWatcher() {
    const observer = new MutationObserver(() => {
      updateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true
    });

    // Interval checks for initial 5 seconds
    let attempts = 0;
    const interval = setInterval(() => {
      updateLoginLogo();
      updateNavbarLogo();
      updateAnnouncement();
      attempts++;
      if (attempts >= 10) clearInterval(interval);
    }, 500);
  }

  // 9. Main Bootstrap Routine
  function bootstrap() {
    initBackgroundDOM();

    // Check Local Storage first for instant zero-flash render
    const localCached = localStorage.getItem('premium_pterodactyl_settings');
    if (localCached) {
      try {
        const parsed = JSON.parse(localCached);
        applyTheme(parsed);
      } catch (e) {}
    } else {
      applyTheme(defaultSettings);
    }

    // Fetch from Server API
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
        injectSettingsUI();
        setupReactWatcher();
      });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootstrap);
  } else {
    bootstrap();
  }

})();
