(() => {
  const config = window.MASC_CONFIG || {};
  let destination = null;
  try { const url = new URL(config.botUrl); if (url.protocol === 'https:') destination = url.href; } catch {}
  const go = document.getElementById('go');
  const notice = document.getElementById('notice');
  const navigate = () => { if (destination) window.location.assign(destination); else { notice.textContent = 'Посилання на бот незабаром з’явиться. Спробуйте перейти трохи пізніше.'; notice.hidden = false; } };
  go.addEventListener('click', navigate);
  if (!destination) return;
  const seconds = Math.max(1, Number(config.redirectSeconds) || 5);
  const deadline = Date.now() + seconds * 1000;
  const count = document.getElementById('count');
  const fill = document.getElementById('fill');
  count.hidden = false; count.style.display = 'block';
  const tick = () => { const remaining = Math.max(0, deadline - Date.now()); count.textContent = `Перенаправимо через ${Math.ceil(remaining / 1000)} с`; fill.style.width = `${100 * (1 - remaining / (seconds * 1000))}%`; if (!remaining) { clearInterval(timer); navigate(); } };
  const timer = setInterval(tick, 150); tick();
})();
