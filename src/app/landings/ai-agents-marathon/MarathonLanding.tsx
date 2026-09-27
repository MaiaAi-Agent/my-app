"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  BENEFITS,
  PROGRAM,
  SOURCE,
} from "./content";
import styles from "./marathon.module.css";

const WEBHOOK_URL = process.env.NEXT_PUBLIC_WEBHOOK_URL;
const START_DATE = process.env.NEXT_PUBLIC_MARATHON_START;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function MarathonLanding() {
  const [audience, setAudience] = useState<Audience>("switcher");
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
    if (!WEBHOOK_URL) {
      console.error("NEXT_PUBLIC_WEBHOOK_URL is not set");
      setError("Реєстрація тимчасово недоступна. Спробуй трохи пізніше.");
      setStatus("error");
      return;
    }

    setStatus("sending");
    setError("");
    try {
      const response = await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value,
          audience,
          source: SOURCE,
          timestamp: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo} aria-label="MASC — на початок">
            MASC
          </a>
          <a href="#register" className={styles.headerCta}>
            Записатися
          </a>
        </div>
      </header>

      <main id="top" className={styles.main}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <p className={styles.eyebrow}>Безкоштовний онлайн-марафон · 3 дні</p>
          <h1 id="hero-title" className={styles.title}>
            Навчись будувати AI-агентів за 3 дні
          </h1>
          <p className={styles.subtitle}>
            Без коду і без досвіду в програмуванні. За три дні пройдеш шлях від
            основ до власного агента, інтегрованого з твоїми інструментами.
          </p>
          <fieldset className={styles.toggle}>
            <legend className={styles.srOnly}>Обери, хто ти</legend>
            {AUDIENCE_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={styles.toggleBtn}
                data-audience={key}
                aria-pressed={audience === key}
                onClick={() => setAudience(key)}
              >
                {AUDIENCES[key].label}
              </button>
            ))}
          </fieldset>
        </section>

        <section
          className={styles.audienceCard}
          data-audience={audience}
          aria-live="polite"
          aria-labelledby="audience-title"
        >
          <h2 id="audience-title" className={styles.audienceTitle}>
            {current.title}
          </h2>
          <p className={styles.audienceText}>{current.text}</p>
        </section>

        <section aria-labelledby="benefits-title">
          <h2 id="benefits-title" className={styles.sectionTitle}>
            Чому цей марафон
          </h2>
          <ul className={styles.grid}>
            {BENEFITS.map((b) => (
              <li key={b.title} className={styles.card}>
                <span className={styles.icon} aria-hidden="true">
                  {b.icon}
                </span>
                <h3 className={styles.cardTitle}>{b.title}</h3>
                <p className={styles.cardText}>{b.text}</p>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="program-title">
          <h2 id="program-title" className={styles.sectionTitle}>
            Програма
          </h2>
          <ol className={styles.program}>
            {PROGRAM.map((d, i) => (
              <li key={d.day} className={styles.day}>
                <span className={styles.dayNum} aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p className={styles.dayLabel}>{d.day}</p>
                  <h3 className={styles.cardTitle}>{d.title}</h3>
                  <ul className={styles.topics}>
                    {d.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section
          id="register"
          className={styles.register}
          aria-labelledby="register-title"
        >
          <h2 id="register-title" className={styles.sectionTitle}>
            Реєстрація на марафон
          </h2>

          {status === "success" ? (
            <output className={styles.success}>
              <span className={styles.check} aria-hidden="true">
                ✓
              </span>
              <p>Дякуємо! Перевір email.</p>
            </output>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
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
                aria-describedby={status === "error" ? "form-error" : undefined}
              />

              <label className={styles.label} htmlFor="audience">
                Я —
              </label>
              <select
                id="audience"
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
                className={styles.submit}
                disabled={status === "sending"}
              >
                {status === "sending"
                  ? "Надсилаємо…"
                  : "Розпочати марафон (безкоштовно)"}
              </button>
            </form>
          )}

          <p className={styles.note}>
            {START_DATE
              ? `Стартує ${START_DATE}. Місця обмежені!`
              : "Місця обмежені! Дату старту надішлемо на email."}
          </p>
        </section>
      </main>

      <footer className={styles.footer}>
        © {new Date().getFullYear()} MASC Automation School
      </footer>
    </div>
  );
}
