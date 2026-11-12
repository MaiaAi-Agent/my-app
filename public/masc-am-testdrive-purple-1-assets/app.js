
(function () {
  const CONFIG = window.MASC_TESTDRIVE_PURPLE_1 || { ctaUrl: '' };
  const PANELS = ["<div class=\"day-meta\"><span>Fillout</span><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-clock3 lucide-clock-3\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 6v6h4\"></path></svg>30–40 хв</span></div><div class=\"day-visual\"><div class=\"big-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"56\" height=\"56\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-mail\" aria-hidden=\"true\"><path d=\"m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7\"></path><rect x=\"2\" y=\"4\" width=\"20\" height=\"16\" rx=\"2\"></rect></svg></div><div class=\"visual-dots\">•••</div><div class=\"check-sphere\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg></div><span class=\"sticker\">ЗРОБИШ САМ ✦</span></div><h3>Форма запису та автоматичний email</h3><p>Створиш онлайн-форму запису на консультацію й налаштуєш лист, який клієнт отримує одразу після заявки.</p><div class=\"result\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg><span><b>Результат:</b> <!-- -->Опублікована форма, яка вже працює.</span></div>", "<div class=\"day-meta\"><span>Fillout + Make + Google Sheets</span><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-clock3 lucide-clock-3\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 6v6h4\"></path></svg>35–45 хв</span></div><div class=\"day-visual\"><div class=\"big-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"56\" height=\"56\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-workflow\" aria-hidden=\"true\"><rect width=\"8\" height=\"8\" x=\"3\" y=\"3\" rx=\"2\"></rect><path d=\"M7 11v4a2 2 0 0 0 2 2h4\"></path><rect width=\"8\" height=\"8\" x=\"13\" y=\"13\" rx=\"2\"></rect></svg></div><div class=\"visual-dots\">•••</div><div class=\"check-sphere\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg></div><span class=\"sticker\">ЗРОБИШ САМ ✦</span></div><h3>Перша автоматизація в Make.com</h3><p>Розберешся, що таке сценарій, тригер і модуль. З’єднаєш форму з таблицею.</p><div class=\"result\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg><span><b>Результат:</b> <!-- -->Клієнт натискає «Надіслати» — і заявка сама з’являється в Google Sheets.</span></div>", "<div class=\"day-meta\"><span>Make + AI + Google Sheets</span><span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-clock3 lucide-clock-3\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"10\"></circle><path d=\"M12 6v6h4\"></path></svg>35–45 хв</span></div><div class=\"day-visual\"><div class=\"big-icon\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"56\" height=\"56\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"1.4\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle></svg></div><div class=\"visual-dots\">•••</div><div class=\"check-sphere\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg></div><span class=\"sticker\">ЗРОБИШ САМ ✦</span></div><h3>Додаємо AI-помічника</h3><p>Підключиш AI до сценарію та напишеш промпт з чіткими правилами. AI читатиме заявку й готуватиме чернетку відповіді під кожного клієнта.</p><div class=\"result\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"18\" height=\"18\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg><span><b>Результат:</b> <!-- -->Готова AI-автоматизація від заявки до персональної відповіді.</span></div>"];
  const DEMO_BEFORE = "<div class=\"clinic-head\"><div class=\"snow\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle></svg></div><div>Snow Therapy<small>ПРОСТІР ПСИХОЛОГІЧНОЇ ДОПОМОГИ</small></div><span class=\"live-dot\"></span></div><div class=\"demo-label\">ІНТЕРАКТИВНА ДЕМОНСТРАЦІЯ</div><div class=\"request\"><span>Заявка на консультацію</span><strong>Олена · онлайн-зустріч</strong><p>Хочу дізнатися про доступний час консультації.</p></div><button class=\"demo-button\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-play\" aria-hidden=\"true\"><path d=\"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z\"></path></svg> <!-- -->Запустити автоматизацію<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-right\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path></svg></button><div class=\"demo-flow \"><div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-table2 lucide-table-2\" aria-hidden=\"true\"><path d=\"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18\"></path></svg><span>Google Sheets<small>Очікує на заявку</small></span></div><div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle></svg><span>AI-помічник<small>Підготує персональну відповідь</small></span></div></div><small class=\"demo-disclaimer\">Приклад роботи системи · демонстраційні дані</small><div class=\"note-sticker\">Рутина?<br>Вже не твоя ↗</div>";
  const DEMO_AFTER = "<div class=\"clinic-head\"><div class=\"snow\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30\" height=\"30\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle></svg></div><div>Snow Therapy<small>ПРОСТІР ПСИХОЛОГІЧНОЇ ДОПОМОГИ</small></div><span class=\"live-dot\"></span></div><div class=\"demo-label\">ІНТЕРАКТИВНА ДЕМОНСТРАЦІЯ</div><div class=\"request\"><span>Заявка на консультацію</span><strong>Олена · онлайн-зустріч</strong><p>Хочу дізнатися про доступний час консультації.</p></div><button class=\"demo-button\"><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg> <!-- -->Спробувати ще раз<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-arrow-right\" aria-hidden=\"true\"><path d=\"M5 12h14\"></path><path d=\"m12 5 7 7-7 7\"></path></svg></button><div class=\"demo-flow done\"><div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-table2 lucide-table-2\" aria-hidden=\"true\"><path d=\"M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18\"></path></svg><span>Заявку збережено<small>Новий рядок у таблиці</small></span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg></div><div><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-sparkles\" aria-hidden=\"true\"><path d=\"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z\"></path><path d=\"M20 2v4\"></path><path d=\"M22 4h-4\"></path><circle cx=\"4\" cy=\"20\" r=\"2\"></circle></svg><span>Чернетка відповіді готова<small>«Олено, дякуємо за вашу заявку…»</small></span><svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" stroke-linecap=\"round\" stroke-linejoin=\"round\" class=\"lucide lucide-check\" aria-hidden=\"true\"><path d=\"M20 6 9 17l-5-5\"></path></svg></div></div><small class=\"demo-disclaimer\">Приклад роботи системи · демонстраційні дані</small><div class=\"note-sticker\">Рутина?<br>Вже не твоя ↗</div>";

  function bindTabs() {
    const tabs = Array.from(document.querySelectorAll('.tabs [role="tab"]'));
    const panel = document.querySelector('.day-content');
    if (!tabs.length || !panel) return;
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        tabs.forEach((t, i) => {
          const active = i === index;
          t.classList.toggle('active', active);
          t.setAttribute('aria-selected', active ? 'true' : 'false');
        });
        panel.innerHTML = PANELS[index];
      });
    });
  }

  function bindDemo() {
    const button = document.querySelector('.demo-button');
    const board = document.querySelector('.demo-board');
    if (!button || !board) return;
    let done = false;
    button.addEventListener('click', () => {
      done = !done;
      board.innerHTML = done ? DEMO_AFTER : DEMO_BEFORE;
      bindDemo();
    }, { once: true });
  }

  function openModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) return;
    backdrop.hidden = false;
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    const backdrop = document.querySelector('.modal-backdrop');
    if (!backdrop) return;
    backdrop.hidden = true;
    document.body.style.overflow = '';
  }

  function resolveDestination() {
    const raw = (CONFIG.ctaUrl || '').trim();
    if (!raw) return '';
    if (/t\.me|telegram\.me/.test(raw) && window.MASC_SS?.deepLink) return window.MASC_SS.deepLink(raw);
    if (window.MASC_UTM?.append) return window.MASC_UTM.append(raw);
    return raw;
  }

  function bindCtas() {
    document.querySelectorAll('button.button').forEach((btn) => {
      btn.addEventListener('click', async (event) => {
        event.preventDefault();
        const href = await resolveDestination();
        if (!href) { openModal(); return; }
        window.location.href = href;
      });
    });

    const close = document.querySelector('.modal .close');
    if (close) close.addEventListener('click', closeModal);
    const backdrop = document.querySelector('.modal-backdrop');
    if (backdrop) {
      backdrop.addEventListener('click', (event) => { if (event.target === backdrop) closeModal(); });
    }
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeModal(); });
  }

  bindTabs();
  bindDemo();
  bindCtas();
})();
