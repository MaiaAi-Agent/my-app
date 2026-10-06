/* Integration contract: define window.MASC_REGISTER = async (data) => ({success:true, redirectUrl:'https://...'}).
   Only return success after the registration service accepts the request. No data is stored in this preview. */
const modal = document.getElementById('registration-modal');
let trigger;
document.querySelectorAll('[data-register]').forEach(button => button.addEventListener('click', () => {
  trigger = button;
  modal.showModal();
  document.body.classList.add('modal-open');
}));
modal.querySelector('.close').addEventListener('click', () => modal.close());
modal.addEventListener('click', event => {
  if (event.target === modal) {
    const rect = modal.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) modal.close();
  }
});
modal.addEventListener('close', () => {
  document.body.classList.remove('modal-open');
  trigger?.focus();
});
document.querySelectorAll('.registration-form').forEach(form => {
  form.addEventListener('submit', async event => {
    event.preventDefault();
    const status = form.querySelector('.form-status');
    if (typeof window.MASC_REGISTER !== 'function') {
      status.textContent = 'Форма ще не приймає заявки. Будь ласка, спробуй пізніше.';
      return;
    }
    const submit = form.querySelector('[type="submit"]');
    const payload = Object.fromEntries(new FormData(form));
    payload.name = payload.name.trim();
    payload.email = payload.email.trim();
    payload.source = form.dataset.source;
    if (!payload.name) { status.textContent = 'Будь ласка, введи своє ім’я.'; return; }
    submit.disabled = true;
    submit.textContent = 'Реєструємо…';
    status.textContent = '';
    try {
      const result = await window.MASC_REGISTER(payload);
      if (!result?.success) throw new Error('Registration not accepted');
      status.textContent = 'Ти зареєстрований! До зустрічі на тест-драйві.';
      form.reset();
      if (result.redirectUrl) {
        const target = new URL(result.redirectUrl, location.href);
        if (target.protocol === 'https:' || target.origin === location.origin) location.assign(target.href);
      }
    } catch {
      status.textContent = 'Не вдалося надіслати заявку. Спробуй ще раз.';
    } finally {
      submit.disabled = false;
      submit.textContent = 'Зареєструватись';
    }
  });
});
