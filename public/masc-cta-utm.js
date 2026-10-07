/* masc-cta-utm.js — додає збережені UTM-мітки (див. /masc-utm.js) до посилань на бота/реєстрацію.
   Підключати ПІСЛЯ /masc-utm.js. Переписує href кожного <a>, чий хост є у window.MASC_CTA_HOSTS
   (типово: link.masc.space, telegram.me, t.me).

   Навіщо: лендінг у режимі "тільки кнопка" веде прямо в Telegram-бота, а deep link несе лише один
   токен `start` — тому мітка доїде тільки якщо кінцевий ресурс сам розбирає ?utm_* (SmartSender
   «Інструменти росту» / deep link із передачею UTM). На самій URL мітки мають бути присутні завжди. */
(() => {
  const HOSTS = window.MASC_CTA_HOSTS || ['link.masc.space'];

  const rewrite = () => {
    if (!window.MASC_UTM || typeof window.MASC_UTM.append !== 'function') return;
    document.querySelectorAll('a[href]').forEach((a) => {
      if (a.dataset.utmDone === '1') return;
      let url;
      try {
        url = new URL(a.getAttribute('href'), location.href);
      } catch {
        return;
      }
      if (!HOSTS.includes(url.hostname)) return;
      a.href = window.MASC_UTM.append(url.href);
      a.dataset.utmDone = '1';
    });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rewrite);
  else rewrite();
})();
