const tabs = Array.from(document.querySelectorAll('#program [role="tab"]'));
function selectDay(selected) {
  for (const tab of tabs) {
    const active = tab === selected;
    tab.classList.toggle('active', active);
    tab.setAttribute('aria-selected', String(active));
    tab.tabIndex = active ? 0 : -1;
    document.getElementById(tab.getAttribute('aria-controls')).hidden = !active;
  }
}
tabs.forEach((tab, index) => {
  tab.addEventListener('click', () => selectDay(tab));
  tab.addEventListener('keydown', event => {
    const next = {ArrowRight: index+1, ArrowDown: index+1, ArrowLeft: index-1, ArrowUp: index-1, Home: 0, End: tabs.length-1}[event.key];
    if (next === undefined) return;
    event.preventDefault();
    const target = tabs[(next + tabs.length) % tabs.length];
    selectDay(target);
    target.focus();
  });
});
