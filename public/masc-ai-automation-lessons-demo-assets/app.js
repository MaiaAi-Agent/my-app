const links = [...document.querySelectorAll('[data-lesson]')];
const sections = [...document.querySelectorAll('.lesson')];
function activate(id) { links.forEach(link=>{const active=link.getAttribute('href')==='#'+id;link.classList.toggle('active',active);if(active)link.setAttribute('aria-current','location');else link.removeAttribute('aria-current');}); }
activate((location.hash||'#lesson-1').slice(1));
const observer = new IntersectionObserver(entries=>{const visible=entries.filter(e=>e.isIntersecting).sort((a,b)=>a.boundingClientRect.top-b.boundingClientRect.top);if(visible.length)activate(visible[0].target.id);},{rootMargin:'-10% 0px -55% 0px',threshold:0});
sections.forEach(section=>observer.observe(section));
links.forEach(link=>link.addEventListener('click',()=>activate(link.hash.slice(1))));
