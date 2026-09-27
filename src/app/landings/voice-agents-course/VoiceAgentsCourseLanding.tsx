'use client';
import { useState } from 'react';
import { HERO, AUDIENCES, CURRICULUM, SPEAKERS, BENEFITS, CAMPAIGN, SOURCE } from './content';

const styles = `
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0e0e0f; color: #f5f3ee; font-family: system-ui; }
  nav { border-bottom: 1px solid #2a2a2c; position: sticky; top: 0; padding: 16px 24px; background: #0e0e0f; }
  nav > div { max-width: 1120px; margin: 0 auto; display: flex; justify-content: space-between; align-items: center; }
  nav button { padding: 8px 24px; background: #f7a91c; color: #1a1206; border: none; border-radius: 8px; cursor: pointer; font-weight: 600; }
  .main { max-width: 1120px; margin: 0 auto; padding: 80px 24px; }
  h1 { font-size: 56px; font-weight: bold; margin-bottom: 24px; color: #f7a91c; }
  .subtitle { font-size: 20px; color: #b5b1a8; margin-bottom: 32px; }
  .tabs { display: inline-flex; gap: 8px; background: rgba(42, 42, 44, 0.5); padding: 8px; border-radius: 8px; margin-bottom: 48px; }
  .tabs button { padding: 8px 16px; border: none; background: transparent; color: #b5b1a8; cursor: pointer; border-radius: 6px; }
  .tabs button.active { background: #2a2a2c; color: #f5f3ee; }
  .box { margin-bottom: 64px; padding: 32px; border-radius: 16px; border: 1px solid #2a2a2c; background: rgba(247, 169, 28, 0.05); }
  .box h2 { font-size: 32px; margin-bottom: 16px; color: #f7a91c; }
  .grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-bottom: 64px; }
  .card { padding: 24px; background: #161617; border: 1px solid #2a2a2c; border-radius: 12px; }
  .card h3 { margin-bottom: 8px; color: #f5f3ee; }
  .card p { color: #b5b1a8; }
  .icon { font-size: 32px; margin-bottom: 16px; }
  h2 { font-size: 32px; margin-bottom: 32px; text-align: center; color: #f7a91c; }
  .program { margin-bottom: 64px; }
  .program-item { padding: 24px; background: #161617; border: 1px solid #2a2a2c; border-radius: 8px; margin-bottom: 16px; display: flex; gap: 16px; }
  .day { width: 48px; height: 48px; border-radius: 50%; background: rgba(247, 169, 28, 0.15); border: 2px solid #f7a91c; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #f7a91c; flex-shrink: 0; }
  .form { max-width: 448px; margin: 0 auto; background: #161617; padding: 32px; border-radius: 16px; border: 1px solid #2a2a2c; }
  .form h2 { text-align: left; margin-bottom: 24px; }
  input, select { width: 100%; padding: 12px; margin-bottom: 16px; background: #2a2a2c; border: 1px solid #2a2a2c; color: #f5f3ee; border-radius: 8px; }
  button[type="submit"] { width: 100%; padding: 16px; font-weight: bold; border: none; border-radius: 8px; background: #f7a91c; color: #1a1206; cursor: pointer; font-size: 16px; }
  .success { text-align: center; padding: 32px; }
  .success-icon { font-size: 32px; margin-bottom: 16px; }
  .foot { text-align: center; color: #8a8681; font-size: 14px; margin-top: 24px; }
  .chip { display: inline-block; padding: 8px 16px; background: rgba(247, 169, 28, 0.1); border: 1px solid #f7a91c; border-radius: 24px; margin-right: 8px; margin-bottom: 16px; color: #f5f3ee; }
  .cta { width: 100%; padding: 16px; background: #f7a91c; color: #1a1206; border: none; border-radius: 8px; font-weight: bold; font-size: 18px; cursor: pointer; margin-bottom: 16px; }
`;

export default function VoiceAgentsCourseLanding() {
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('freelancers');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const aud = AUDIENCES[audience as keyof typeof AUDIENCES];

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    try {
      const r = await fetch('/api/lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, audience, source: SOURCE }) });
      if (r.ok) { setSuccess(true); setEmail(''); setTimeout(() => setSuccess(false), 5000); }
    } catch {}
    setLoading(false);
  };

  return <>
    <style dangerouslySetInnerHTML={{ __html: styles }} />
    <nav><div><span style={{ fontSize: '20px', fontWeight: 'bold' }}>🔊 MASC</span><button onClick={() => (document.querySelector('input') as any)?.focus()}>Записатися</button></div></nav>
    <div className="main">
      <div style={{ marginBottom: '80px' }}>
        <div style={{ display: 'inline-block', background: 'rgba(247, 169, 28, 0.1)', border: '1px solid #f7a91c', borderRadius: '8px', padding: '8px 16px', marginBottom: '16px', color: '#f7a91c', fontSize: '12px', fontWeight: 'bold' }}>{HERO.badge}</div>
        <h1>{HERO.title}</h1>
        <p className="subtitle">{HERO.subtitle}</p>

        <div className="tabs">
          {Object.values(AUDIENCES).map((a) => (
            <button key={a.key} className={audience === a.key ? 'active' : ''} onClick={() => setAudience(a.key)}>
              {a.buttonLabel}
            </button>
          ))}
        </div>

        <div className="box">
          <h2>{aud.title}</h2>
          <p>{aud.description}</p>
        </div>

        <div>
          {[`📅 ${CAMPAIGN.startDate}`, `🕐 ${CAMPAIGN.startTime}`, `👥 ${CAMPAIGN.format}`].map((c, i) => (
            <div key={i} className="chip">{c}</div>
          ))}
        </div>

        <button className="cta" onClick={() => (document.querySelector('input') as any)?.focus()}>
          {HERO.cta} →
        </button>

        <p style={{ color: '#8a8681', fontSize: '14px' }}>{HERO.note}</p>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <h2>Хто вчитиме</h2>
        <div className="grid">
          {SPEAKERS.map((s) => (
            <div key={s.name} className="card">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'rgba(247, 169, 28, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', color: '#f7a91c', marginBottom: '16px' }}>
                {s.name[0]}
              </div>
              <h3>{s.name}</h3>
              <p>{s.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginBottom: '64px' }}>
        <h2>Чому цей курс</h2>
        <div className="grid">
          {BENEFITS.map((b, i) => (
            <div key={i} className="card">
              <div className="icon">{b.icon}</div>
              <h3>{b.title}</h3>
              <p>{b.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="program">
        <h2>Програма</h2>
        {CURRICULUM.map((d) => (
          <div key={d.day} className="program-item">
            <div className="day">0{d.day}</div>
            <div>
              <h3>{d.title}</h3>
              <ul style={{ marginLeft: '20px', color: '#b5b1a8' }}>
                {d.topics.map((t, i) => <li key={i}>{t}</li>)}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="form">
        <h2>Запишись на курс</h2>
        {success ? (
          <div className="success">
            <div className="success-icon">✓</div>
            <p style={{ fontSize: '18px', fontWeight: '600', marginBottom: '8px' }}>Дякуємо за реєстрацію!</p>
            <p style={{ color: '#b5b1a8' }}>Перевір email</p>
          </div>
        ) : (
          <form onSubmit={submit}>
            <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <select value={audience} onChange={(e) => setAudience(e.target.value)}>
              {Object.values(AUDIENCES).map((a) => (
                <option key={a.key} value={a.key}>{a.formLabel}</option>
              ))}
            </select>
            <button type="submit" disabled={loading} style={{ opacity: loading ? 0.5 : 1 }}>
              {loading ? 'Надсилаю...' : 'Записатися'}
            </button>
          </form>
        )}
        <p className="foot">Місця обмежені!</p>
      </div>
    </div>
  </>;
}
