"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  FORMAT,
  PROGRAM,
  SOURCE,
  SPEAKERS,
  START,
} from "./content";
import Icon from "./Icon";
import VoiceGraphic from "./VoiceGraphic";
import styles from "./voice.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function VoiceCourseLanding() {
  const [audience, setAudience] = useState<Audience>("freelancers");
  const [email, setEmail] = useState("");
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
    } catch (err) {
      console.error(err);
      setError(
        "Не вдалося надіслати заявку. Перевір з'єднання і спробуй ще раз.",
      );
      setStatus("error");
    }
  };

  const current = AUDIENCES[audience];
  const startLine = `Старт ${START.date} о ${START.time}`;

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
            <a href="#program">Програма</a>
            <a href="#speakers">Спікери</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Реєстрація
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
                Voice Agents Course · жива група
              </p>
              <h1 id="hero-title" className={styles.title}>
                Навчись створювати надійних{" "}
                <span className={styles.accent}>Voice AI агентів</span>
              </h1>
              <p className={styles.subtitle}>
                Хайп минув — почалася реальна робота. За 3 дні в живій групі
                пройдеш шлях від основ до налаштованого голосового агента і
                розберешся, як монетизувати ці навички.
              </p>
              <ul className={styles.chips} aria-label="Дата і формат">
                <li className={styles.chipAccent}>{START.date}</li>
                <li className={styles.chipAccent}>{START.time}</li>
                <li className={styles.chip}>3 дні</li>
                <li className={styles.chip}>Live online</li>
              </ul>
              <a href="#register" className={styles.cta}>
                Зареєструватися на курс
                <Icon name="arrow" className={styles.btnIcon} />
              </a>
              <p className={styles.heroNote}>
                Деталі й доступ надішлемо на email.
              </p>
            </div>
            <VoiceGraphic className={styles.heroArt} />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="why-title">
          <div className={styles.container}>
            <div className={styles.quote}>
              <p className={styles.quoteLabel}>Висновок живого ефіру</p>
              <h2 id="why-title" className={styles.quoteTitle}>
                Бізнес більше не купує «цікаву фічу». Він платить за{" "}
                <span className={styles.accent}>процеси</span>
              </h2>
              <p className={styles.quoteText}>
                Нещодавно ми провели ефір-дискусію з практиками та розробниками
                AI-агентів — Сергієм та Алексом. Головне: компанії платять за
                конкретні процеси, економію часу та автоматизацію рутини. На
                курсі вчимося будувати саме таких Voice-агентів — надійних, а не
                демонстраційних.
              </p>
            </div>
          </div>
        </section>

        <section
          id="audience"
          className={styles.section}
          aria-labelledby="audience-heading"
        >
          <div className={styles.container}>
            <h2 id="audience-heading" className={styles.h2}>
              Курс для тебе, якщо ти…
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

        <section className={styles.section} aria-labelledby="format-title">
          <div className={styles.container}>
            <h2 id="format-title" className={styles.h2}>
              Формат
            </h2>
            <ul className={styles.grid}>
              {FORMAT.map((f) => (
                <li key={f.title} className={styles.card}>
                  <span className={styles.iconTile}>
                    <Icon name={f.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{f.title}</h3>
                  <p className={styles.cardText}>{f.text}</p>
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
              Що буде <span className={styles.accent}>на курсі</span>
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

        <section
          id="speakers"
          className={styles.section}
          aria-labelledby="speakers-title"
        >
          <div className={styles.container}>
            <h2 id="speakers-title" className={styles.h2}>
              Спікери
            </h2>
            <ul className={styles.speakers}>
              {SPEAKERS.map((s) => (
                <li key={s.name} className={styles.speaker}>
                  <span className={styles.avatar} aria-hidden="true">
                    {s.initial}
                  </span>
                  <div>
                    <p className={styles.speakerLabel}>Спікер курсу</p>
                    <h3 className={styles.speakerName}>{s.name}</h3>
                    <p className={styles.cardText}>{s.role}</p>
                    <ul className={styles.tags}>
                      {s.tags.map((t) => (
                        <li key={t}>{t}</li>
                      ))}
                    </ul>
                  </div>
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
                  Час для реальної роботи
                </h2>
                <p className={styles.cardText}>
                  Залиш email — надішлемо деталі курсу і доступ до живої групи.
                  {` ${startLine}.`}
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
                      : "Зареєструватися на курс"}
                    <Icon name="arrow" className={styles.btnIcon} />
                  </button>
                  <p className={styles.formNote}>{startLine}</p>
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
            Розвивайся вже сьогодні
          </a>
        </div>
      </footer>
    </div>
  );
}
