/* masc-ss-deeplink.js — передача UTM-міток у SmartSender через глибоке посилання (Telegram).
   Той самий механізм, що на next.masc.space/ads/... (розібрано з їхнього JS):
     1) збираємо з URL utm_source/utm_medium/utm_campaign/utm_content/utm_term/utm_placement/clientID/gclid
        + client_user_agent + client_ip_address + cookies _fbp/_fbc;
     2) POST на https://<project>.customer.smartsender.eu/api/i/store → отримуємо { id };
     3) перед переходом переписуємо payload глибокого посилання: start = base64( base64_decode(start) + "|" + id );
     4) вже тоді йдемо на t.me — SmartSender читає id, дістає збережені мітки і пише їх у контакт.

   Використання: <script src="/masc-ss-deeplink.js"></script>
   Кліки по будь-якому <a href*="t.me/|telegram.me/"></a> перехоплюються автоматично.
   Для програмного переходу (редирект) — window.MASC_SS.deepLink(url) → Promise<url>. */
(() => {
  const STORE_URL = 'https://mageek.customer.smartsender.eu/api/i/store';
  const KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term', 'utm_placement', 'clientID', 'gclid'];
  const TIMEOUT_MS = 2500;

  const variables = {};
  const params = new URLSearchParams(window.location.search);
  const stored = (window.MASC_UTM && window.MASC_UTM.get) ? window.MASC_UTM.get() : {};

  KEYS.forEach((k) => {
    const v = params.get(k) || stored[k];
    if (v) variables[k] = v;
  });
  variables.client_user_agent = navigator.userAgent;

  function readCookie(name, key, retries) {
    let left = typeof retries === 'number' ? retries : 50;
    const tick = () => {
      const m = document.cookie.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()[\]\\/+^])/g, '\\$1') + '=([^;]*)'));
      const value = m ? decodeURIComponent(m[1]) : undefined;
      if (typeof value !== 'undefined') variables[key] = value;
      else if (left > 0) { left--; setTimeout(tick, 200); }
    };
    tick();
  }

  const ipReady = (async () => {
    try {
      const res = await fetch('https://api.ipify.org/?format=json');
      variables.client_ip_address = (await res.json()).ip;
    } catch (err) {
      console.error('MASC_SS ip fetch error:', err);
    }
  })();

  readCookie('_fbp', 'fbp');
  readCookie('_fbc', 'fbc');

  function extractStart(url) {
    const query = String(url).split('?')[1];
    if (!query) return null;
    for (const part of query.split('&')) {
      const pair = part.split('=');
      if (pair[0] === 'start' && pair[1]) return pair[1];
    }
    return null;
  }

  function rebuildLink(url, payload, id) {
    const [base, query] = String(url).split('?');
    const start = btoa(atob(payload) + '|' + id).replace(/=/g, '');
    const rest = (query || '').split('&').map((part) => (part.split('=')[0] === 'start' ? 'start=' + start : part)).join('&');
    return base + '?' + rest;
  }

  async function store() {
    await Promise.race([ipReady, new Promise((r) => setTimeout(r, 800))]);
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);
    try {
      const res = await fetch(STORE_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Requested-With': 'XMLHttpRequest' },
        body: JSON.stringify({ range: {}, scope: {}, variables }),
        signal: controller.signal,
      });
      if (!res.ok) throw new Error('store request failed: ' + res.status);
      const data = await res.json();
      if (data == null || data.id == null) throw new Error('store id missing');
      return data.id;
    } finally {
      clearTimeout(timer);
    }
  }

  /* Повертає href із дописаним id. При будь-якій помилці — вихідний href. */
  async function deepLink(url) {
    const payload = extractStart(url);
    if (!payload) return url;
    try {
      return rebuildLink(url, payload, await store());
    } catch (err) {
      console.error('Smartsender deep link error:', err);
      return url;
    }
  }

  let busy = false;

  function onClick(event) {
    const target = event.target instanceof Element ? event.target : null;
    const link = target && target.closest('a[href*="//t.me/"], a[href*="//telegram.me/"]');
    if (!link) return;
    const href = link.href;
    if (!extractStart(href)) return;
    event.preventDefault();
    if (busy) return;
    busy = true;
    deepLink(href)
      .then((next) => { window.location.href = next; })
      .finally(() => { busy = false; });
  }

  document.addEventListener('click', onClick);
  window.addEventListener('pageshow', () => { busy = false; });

  window.MASC_SS = { deepLink, variables, extractStart, rebuildLink };
})();
