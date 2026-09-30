"use client";

import { type FormEvent, useEffect, useState } from "react";
import AgentGraphic from "./AgentGraphic";
import styles from "./ai-mini-course.module.css";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  BENEFITS,
  FAQ,
  PROGRAM,
  REQUIREMENTS,
  SOURCE,
  SPEAKER,
} from "./content";
import Icon from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function MiniCourseLanding() {
  const [audience, setAudience] = useState<Audience>("career");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError("Перевір, будь ласка, email — схоже, в ньому помилка.");
      setStatus("error");
      return;
    }
    if (!consent) {
      setError("Постав позначку згоди, щоб ми могли надіслати доступ.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value, audience, source: SOURCE }),
      });
      if (response.status === 503) {
        setError("Реєстрація тимчасово недоступна. Спробуй трохи пізніше.");
        setStatus("error");
        return;
      }
      if (!response.ok)
        throw new Error(`/api/lead responded ${response.status}`);
      setStatus("success");
      setEmail("");
      setConsent(false);
    } catch (err) {
      console.error(err);
      setError(
        "Не вдалося надіслати заявку. Перевір з'єднання і спробуй ще раз.",
      );
      setStatus("error");
    }
  };

  const current = AUDIENCES[audience];
  const note = "Після реєстрації надішлемо доступ до мінікурсу.";

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo} aria-label="MASC — на початок">
            <span className={styles.logoMark}>MASC</span>
            <span className={styles.logoTag}>
              Marketing
              <br />
              Automation School
            </span>
          </a>
          <nav className={styles.nav} aria-label="Розділи сторінки">
            <a href="#audience">Для кого</a>
            <a href="#program">Програма</a>
            <a href="#faq">Питання</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Почати
            <Icon name="arrow" className={styles.btnIcon} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div>
              <p className={styles.badge}>
                <span className={styles.dot} aria-hidden="true" />
                Безкоштовний мінікурс
              </p>
              <h1 id="hero-title" className={styles.title}>
                Спробуй роботу{" "}
                <span className={`${styles.accent} ${styles.nowrap}`}>
                  AI-автоматизатора
                </span>{" "}
                на віртуальному клієнті
              </h1>
              <p className={styles.subtitle}>
                Три дні, три практики. Створиш першого AI-агента в Telegram і
                зрозумієш, чи хочеш рухатися далі.
              </p>
              <ul className={styles.chips} aria-label="Формат">
                <li className={styles.chipAccent}>3 дні</li>
                <li className={styles.chip}>3 практики</li>
                <li className={styles.chip}>Самостійно</li>
                <li className={styles.chip}>Безкоштовно</li>
              </ul>
              <a href="#register" className={styles.cta}>
                Почати безкоштовно
                <Icon name="arrow" className={styles.btnIcon} />
              </a>
              <p className={styles.heroNote}>{note}</p>
            </div>
            <AgentGraphic className={styles.heroArt} />
          </div>
        </section>

        <section
          id="audience"
          className={styles.section}
          aria-labelledby="audience-heading"
        >
          <div className={styles.container}>
            <h2 id="audience-heading" className={styles.h2}>
              Мінікурс для тебе, якщо ти…
            </h2>
            <fieldset className={styles.toggle}>
              <legend className={styles.srOnly}>Обери, хто ти</legend>
              {AUDIENCE_ORDER.map((key) => (
                <button
                  key={key}
                  type="button"
                  className={styles.toggleBtn}
                  aria-pressed={audience === key}
                  onClick={() => setAudience(key)}
                >
                  <span className={styles.iconTile}>
                    <Icon name={AUDIENCES[key].icon} />
                  </span>
                  {AUDIENCES[key].formLabel}
                </button>
              ))}
            </fieldset>
            <div className={styles.audienceCard} aria-live="polite">
              <h3 className={styles.audienceTitle}>{current.title}</h3>
              <p className={styles.audienceText}>{current.text}</p>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="benefits-title">
          <div className={styles.container}>
            <h2 id="benefits-title" className={styles.h2}>
              Як це <span className={styles.accent}>працює</span>
            </h2>
            <ul className={styles.grid}>
              {BENEFITS.map((b) => (
                <li key={b.title} className={styles.card}>
                  <span className={styles.iconTile}>
                    <Icon name={b.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{b.title}</h3>
                  <p className={styles.cardText}>{b.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="program"
          className={styles.section}
          aria-labelledby="program-title"
        >
          <div className={styles.container}>
            <h2 id="program-title" className={styles.h2}>
              Що буде <span className={styles.accent}>в мінікурсі</span>
            </h2>
            <ol className={styles.program}>
              {PROGRAM.map((d, i) => (
                <li key={d.day} className={styles.day}>
                  <span className={styles.dayNum} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <p className={styles.dayLabel}>{d.day}</p>
                  <h3 className={styles.cardTitle}>{d.title}</h3>
                  <ul className={styles.topics}>
                    {d.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="speaker-title">
          <div className={styles.container}>
            <h2 id="speaker-title" className={styles.h2}>
              Твій <span className={styles.accent}>спікер</span>
            </h2>
            <div className={styles.audienceCard}>
              <h3 className={styles.audienceTitle}>{SPEAKER.name}</h3>
              <p className={styles.dayLabel}>{SPEAKER.role}</p>
              <p className={styles.audienceText}>{SPEAKER.text}</p>
              <ul className={styles.topics}>
                {SPEAKER.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="requirements-title"
        >
          <div className={styles.container}>
            <h2 id="requirements-title" className={styles.h2}>
              Що потрібно від тебе
            </h2>
            <div className={styles.audienceCard}>
              <ul className={styles.topics}>
                {REQUIREMENTS.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section
          id="faq"
          className={styles.section}
          aria-labelledby="faq-title"
        >
          <div className={styles.container}>
            <h2 id="faq-title" className={styles.h2}>
              Часті питання
            </h2>
            <ul className={styles.grid}>
              {FAQ.map((f) => (
                <li key={f.q} className={styles.card}>
                  <h3 className={styles.cardTitle}>{f.q}</h3>
                  <p className={styles.cardText}>{f.a}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="register"
          className={styles.section}
          aria-labelledby="register-title"
        >
          <div className={styles.container}>
            <div className={styles.register}>
              <div className={styles.registerIntro}>
                <h2 id="register-title" className={styles.h2}>
                  Не треба вгадувати, чи це твоє
                </h2>
                <p className={styles.cardText}>
                  Залиш email — відкриємо доступ до мінікурсу. Три практики
                  покажуть, чи хочеш рухатися в AI-автоматизацію далі.
                </p>
              </div>

              {status === "success" ? (
                <output className={styles.success}>
                  <span className={styles.check} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <span>Дякуємо! Перевір email.</span>
                </output>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <label className={styles.label} htmlFor="email">
                    Твій email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    placeholder="name@company.com"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    aria-invalid={
                      status === "error" && !EMAIL_RE.test(email.trim())
                    }
                    aria-describedby={
                      status === "error" ? "form-error" : undefined
                    }
                  />

                  <label className={styles.label} htmlFor="audience-select">
                    Я —
                  </label>
                  <select
                    id="audience-select"
                    name="audience"
                    className={styles.input}
                    value={audience}
                    onChange={(e) => setAudience(e.target.value as Audience)}
                  >
                    {AUDIENCE_ORDER.map((key) => (
                      <option key={key} value={key}>
                        {AUDIENCES[key].formLabel}
                      </option>
                    ))}
                  </select>

                  <label className={styles.consent} htmlFor="consent">
                    <input
                      id="consent"
                      name="consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                    />
                    <span>
                      Погоджуюсь отримувати навчальні та інформаційні
                      повідомлення від MASC (Telegram, email).
                    </span>
                  </label>

                  {status === "error" && (
                    <p id="form-error" className={styles.error} role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.cta}
                    disabled={status === "sending"}
                  >
                    {status === "sending"
                      ? "Надсилаємо…"
                      : "Почати безкоштовно"}
                    <Icon name="arrow" className={styles.btnIcon} />
                  </button>
                  <p className={styles.formNote}>{note}</p>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span className={styles.logoMark}>MASC</span>
          <span className={styles.footerTag}>
            Люди. Ідеї. AI-агенти.
            <br />
            Реальні навички для реальних задач.
          </span>
          <a href="#register" className={styles.footerLink}>
            Почати мінікурс
          </a>
        </div>
      </footer>
    </div>
  );
}
