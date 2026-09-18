/* ============================================================
   PREMIUM THEME - JS Enhancements
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  const font = document.createElement('link');
  font.rel = 'stylesheet';
  font.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap';
  document.head.appendChild(font);

  const cards = document.querySelectorAll('.card, .box, .panel');
  cards.forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(10px)';
    setTimeout(() => {
      card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, i * 60);
  });

  document.querySelectorAll('.btn, button').forEach(btn => {
    btn.addEventListener('click', function(e) {
      const r = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      r.style.cssText = `
        position:absolute;
        border-radius:50%;
        background:rgba(255,255,255,0.4);
        width:${size}px;height:${size}px;
        left:${e.clientX - rect.left - size/2}px;
        top:${e.clientY - rect.top - size/2}px;
        transform:scale(0);
        animation:ripple 0.6s ease-out;
        pointer-events:none;
      `;
      if (getComputedStyle(this).position === 'static') this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(r);
      setTimeout(() => r.remove(), 600);
    });
  });

  const style = document.createElement('style');
  style.textContent = `@keyframes ripple { to { transform: scale(2.5); opacity: 0; } }`;
  document.head.appendChild(style);

  const sidebar = document.querySelector('#sidebar, .sidebar, aside');
  if (sidebar) {
    const clock = document.createElement('div');
    clock.style.cssText = `
      padding: 12px 16px;
      margin: 12px;
      background: rgba(99,102,241,0.1);
      border-radius: 10px;
      font-size: 12px;
      color: #8892b0;
      text-align: center;
      border: 1px solid rgba(120,140,220,0.15);
    `;
    sidebar.appendChild(clock);

    const updateClock = () => {
      const now = new Date();
      clock.textContent = now.toLocaleString('en-MY', {
        hour: '2-digit', minute: '2-digit', second: '2-digit',
        day: '2-digit', month: 'short'
      });
    };
    updateClock();
    setInterval(updateClock, 1000);
  }

  console.log('%c✓ Premium Theme Loaded', 'color:#8b5cf6;font-weight:bold;font-size:14px;');
});