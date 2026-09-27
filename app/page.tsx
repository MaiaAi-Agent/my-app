'use client';
import { useState } from 'react';

const styles = `* { margin: 0; padding: 0; }
body { background: linear-gradient(to bottom, #0f172a, #1e293b, #0f172a); color: white; font-family: system-ui; }
nav { border-bottom: 1px solid rgba(148, 163, 184, 0.2); position: sticky; top: 0; padding: 16px 24px; }
nav > div { max-width: 1280px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
nav button { padding: 8px 24px; background: #2563eb; color: white; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
.main { max-width: 1280px; margin: 0 auto; padding: 80px 24px; }
h1 { font-size: 56px; font-weight: bold; margin-bottom: 24px; background: linear-gradient(to right, #60a5fa, #a855f7); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.subtitle { font-size: 20px; color: #cbd5e1; margin-bottom: 32px; }
.tabs { display: inline-flex; gap: 8px; background: rgba(30, 41, 59, 0.5); padding: 8px; border-radius: 8px; margin-bottom: 48px; }
.tabs button { padding: 8px 16px; border: none; background: transparent; color: #94a3b8; cursor: pointer; border-radius: 6px; }
.tabs button.active { background: #334155; color: white; }
.box { margin-bottom: 64px; padding: 32px; border-radius: 16px; border: 1px solid #334155; background: rgba(37, 99, 235, 0.1); }
.box h2 { font-size: 32px; margin-bottom: 16px; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 64px; }
.card { padding: 24px; border-radius: 12px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; }
.card h3 { margin-bottom: 8px; font-weight: bold; }
.card p { color: #94a3b8; }
.icon { font-size: 32px; margin-bottom: 16px; }
.program h2 { font-size: 32px; margin-bottom: 32px; text-align: center; }
.program-item { padding: 24px; background: rgba(30, 41, 59, 0.5); border: 1px solid #334155; border-radius: 8px; margin-bottom: 16px; display: flex; gap: 16px; }
.day { width: 48px; height: 48px; border-radius: 50%; background: rgba(37, 99, 235, 0.2); border: 2px solid #3b82f6; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #93c5fd; flex-shrink: 0; }
.form { max-width: 448px; margin: 0 auto; background: linear-gradient(to bottom, #1e293b, #0f172a); padding: 32px; border-radius: 16px; border: 1px solid #334155; }
.form h2 { margin-bottom: 24px; font-size: 24px; }
input, select { width: 100%; padding: 12px; margin-bottom: 16px; background: #334155; border: 1px solid #475569; color: white; border-radius: 8px; }
button[type="submit"] { width: 100%; padding: 16px; font-weight: bold; border: none; border-radius: 8px; color: white; cursor: pointer; font-size: 18px; }
.success { text-align: center; padding: 32px; }
.success-icon { font-size: 32px; margin-bottom: 16px; }
.foot { text-align: center; color: #64748b; font-size: 14px; margin-top: 24px; }`;

export default function Page() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [aud, setAud] = useState('switcher');

  const cfg = { switcher: { t: 'IT-спеціалісти', d: 'Без коду', c: '#2563eb' }, digital: { t: 'Digital-ці', d: 'Масштаб', c: '#7e22ce' }, business: { t: 'Бізнесмени', d: 'Економія', c: '#22c55e' } };
  const cur = cfg[aud as keyof typeof cfg];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    try {
      const r = await fetch('https://n8n.mageek.club/webhook/site-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, audience: aud, source: 'landing', timestamp: new Date().toISOString() }) });
      if (r.ok) { setSubmitted(true); setEmail(''); setTimeout(() => setSubmitted(false), 5000); }
    } catch (e) {}
  };

  return (<>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <nav><div><span style={{ fontSize: '20px', fontWeight: 'bold' }}>MASC</span><button onClick={() => (document.querySelector('input') as any)?.focus()}>Записатися</button></div></nav>
    <div className="main">
      <h1>3-Денний Марафон AI</h1>
      <p className="subtitle">Навчись будувати AI-агентів</p>
      <div className="tabs">
        {Object.entries(cfg).map(([k]) => <button key={k} className={aud === k ? 'active' : ''} onClick={() => setAud(k)}>{k === 'switcher' ? 'IT' : k === 'digital' ? 'Digital' : 'Бізнес'}</button>)}
      </div>
      <div className="box"><h2>{cur.t}</h2><p>{cur.d}</p></div>
      <div className="grid">
        <div className="card"><div className="icon">✓</div><h3>Без коду</h3></div>
        <div className="card"><div className="icon">⏱</div><h3>3 дні</h3></div>
        <div className="card"><div className="icon">⚡</div><h3>Практика</h3></div>
      </div>
      <div className="program">
        <h2>Програма</h2>
        {['Основи', 'Агент', 'Інтеграція'].map((t, i) => <div key={i} className="program-item"><div className="day">{i + 1}</div><div><h3>День {i + 1}</h3><p>{t}</p></div></div>)}
      </div>
      <div className="form">
        <h2>Розпочни</h2>
        {submitted ? <div className="success"><div className="success-icon">✓</div><p>Дякуємо!</p></div> : <form onSubmit={submit}>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <select value={aud} onChange={e => setAud(e.target.value)}><option value="switcher">IT</option><option value="digital">Digital</option><option value="business">Бізнес</option></select>
          <button type="submit" style={{ background: cur.c }}>Записатися</button>
        </form>}
        <p className="foot">Місця обмежені!</p>
      </div>
    </div>
  </>);
}
