// Paste the registration URL here. All registration buttons will use it.
const REGISTRATION_URL = 'https://telegram.me/MaGeek2Bot?start=ZGw6MzQ1NDUy';
if (REGISTRATION_URL) document.querySelectorAll('[data-registration]').forEach(button => {
 button.href = REGISTRATION_URL;
 button.removeAttribute('role');
});
