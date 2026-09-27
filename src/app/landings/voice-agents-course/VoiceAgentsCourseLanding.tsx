'use client';
import { useState } from 'react';
import styles from './voice-agents-course.module.css';
import { HERO, AUDIENCES, CURRICULUM, SPEAKERS, BENEFITS, CAMPAIGN, SOURCE } from './content';

export default function VoiceAgentsCourseLanding() {
  const [email, setEmail] = useState('');
  const [audience, setAudience] = useState('freelancers');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const currentAudience = AUDIENCES[audience as keyof typeof AUDIENCES];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setError('');
    try {
      const r = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, audience, source: SOURCE })
      });
      if (r.ok) { setSuccess(true); setEmail(''); setTimeout(() => setSuccess(false), 5000); }
      else { const d = await r.json(); setError(d.error || 'Error'); }
    } catch { setError('Connection error'); }
    finally { setLoading(false); }
  };

  return <div className={styles.page}>
    <nav className={styles.nav}>
      <div className={styles.navInner}>
        <div className={styles.logo}>🔊 MASC Voice Agents</div>
        <button className={styles.navCta} onClick={() => (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus()}>
          Записатися
        </button>
      </div>
    </nav>

    <section className={styles.hero}>
      <div className={styles.badge}>{HERO.badge}</div>
      <h1 className={styles.h1}>{HERO.title}</h1>
      <p className={styles.subtitle}>{HERO.subtitle}</p>

      <div className={styles.audienceToggle}>
        {Object.values(AUDIENCES).map((a) => (
          <button
            key={a.key}
            className={`${styles.toggleBtn} ${audience === a.key ? styles.active : ''}`}
            onClick={() => setAudience(a.key)}
            aria-pressed={audience === a.key}
          >
            {a.buttonLabel}
          </button>
        ))}
      </div>

      <div className={styles.audienceBox}>
        <h2 className={styles.h2}>{currentAudience.title}</h2>
        <p>{currentAudience.description}</p>
      </div>

      <div className={styles.campaignInfo}>
        <div className={styles.chip}>📅 {CAMPAIGN.startDate}</div>
        <div className={styles.chip}>🕐 {CAMPAIGN.startTime}</div>
        <div className={styles.chip}>👥 {CAMPAIGN.format}</div>
      </div>

      <button className={styles.ctaPrimary} onClick={() => (document.querySelector('input[type="email"]') as HTMLInputElement)?.focus()}>
        {HERO.cta} →
      </button>

      <p className={styles.smallText}>{HERO.note}</p>
    </section>

    <section className={styles.section}>
      <h2 className={styles.h2}>Хто вчитиме</h2>
      <div className={styles.speakersGrid}>
        {SPEAKERS.map((s) => (
          <div key={s.name} className={styles.card}>
            <div className={styles.speakerInitial}>{s.name[0]}</div>
            <h3 className={styles.h3}>{s.name}</h3>
            <p className={styles.small}>{s.role}</p>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <h2 className={styles.h2}>Чому цей курс</h2>
      <div className={styles.benefitsGrid}>
        {BENEFITS.map((b, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.benefitIcon}>{b.icon}</div>
            <h3 className={styles.h3}>{b.title}</h3>
            <p className={styles.small}>{b.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <h2 className={styles.h2}>Програма</h2>
      <div className={styles.curriculumGrid}>
        {CURRICULUM.map((d) => (
          <div key={d.day} className={styles.card}>
            <div className={styles.dayNumber}>0{d.day}</div>
            <h3 className={styles.h3}>{d.title}</h3>
            <ul className={styles.topicList}>
              {d.topics.map((t, i) => <li key={i}>{t}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>

    <section className={styles.section}>
      <div className={styles.formContainer}>
        <h2 className={styles.h2}>Запишись на курс</h2>
        {success ? (
          <div className={styles.successBox}>
            <div className={styles.successIcon}>✓</div>
            <p className={styles.h3}>Дякуємо за реєстрацію!</p>
            <p className={styles.small}>Перевір email для деталей</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.form}>
            <input type="email" placeholder="Твій email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} required />
            <select value={audience} onChange={(e) => setAudience(e.target.value)} className={styles.select}>
              {Object.values(AUDIENCES).map((a) => (
                <option key={a.key} value={a.key}>{a.formLabel}</option>
              ))}
            </select>
            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Надсилаю...' : 'Записатися'}
            </button>
            {error && <output className={styles.error} role="alert">{error}</output>}
          </form>
        )}
        <p className={styles.smallText}>Місця обмежені!</p>
      </div>
    </section>

    <footer className={styles.footer}>
      <p>{HERO.note}</p>
    </footer>
  </div>;
}
