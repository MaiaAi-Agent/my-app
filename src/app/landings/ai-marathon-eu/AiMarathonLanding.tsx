"use client";

import { type FormEvent, useEffect, useState } from "react";
import AgentGraphic from "./AgentGraphic";
import styles from "./ai-marathon.module.css";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  BENEFITS,
  BOT_URL,
  DATES,
  EXAMPLES,
  FAQ,
  PROGRAM,
  SPEAKER,
  TARIFFS,
  VARIANTS,
  type Variant,
} from "./content";
import Icon from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function AiMarathonLanding({ variant }: { variant: Variant }) {
  const config = VARIANTS[variant];
  const [audience, setAudience] = useState<Audience>("specialist");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  // Реклама для групи Б веде на ?a=career, для групи А на ?a=specialist.
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get("a");
    if (param === "career" || param === "specialist") setAudience(param);
  }, []);

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
        body: JSON.stringify({
          email: value,
          audience,
          source: config.source,
        }),
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
  const [titleStart, titleAccent, titleEnd] = current.heroTitle;
  const note = `Безкоштовний тариф без запису. Платний (${config.price}) із записом і 2 бонусами.`;

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
            <a href="#tariffs">Тарифи</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Записатися
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
                Живий онлайн-марафон
              </p>
              <h1 id="hero-title" className={styles.title}>
                {titleStart}
                <span className={styles.accent}>{titleAccent}</span>
                {titleEnd}
              </h1>
              <p className={styles.subtitle}>{current.heroSubtitle}</p>
              <ul className={styles.chips} aria-label="Формат">
                <li className={styles.chipAccent}>{DATES}</li>
                <li className={styles.chip}>19:00 за Києвом</li>
                <li className={styles.chip}>Live online · Zoom</li>
                <li className={styles.chip}>Безкоштовний тариф</li>
              </ul>
              <a href="#register" className={styles.cta}>
                Зареєструватись безкоштовно
                <Icon name="arrow" className={styles.btnIcon} />
              </a>
              <p className={styles.heroNote}>{config.timeNote}</p>
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
              Марафон для тебе, якщо ти…
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
                  {AUDIENCES[key].label}
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
              Чому цей марафон
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
              Що буде <span className={styles.accent}>на марафоні</span>
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
              Спікер: <span className={styles.accent}>{SPEAKER.name}</span>
            </h2>
            <div className={styles.speaker}>
              <ul className={styles.topics}>
                {SPEAKER.facts.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <blockquote className={styles.quote}>{SPEAKER.quote}</blockquote>
            </div>
            <ul className={`${styles.grid} ${styles.examples}`}>
              {EXAMPLES.map((ex) => (
                <li key={ex.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{ex.title}</h3>
                  <p className={styles.cardText}>{ex.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="tariffs"
          className={styles.section}
          aria-labelledby="tariffs-title"
        >
          <div className={styles.container}>
            <h2 id="tariffs-title" className={styles.h2}>
              Обери, як брати участь
            </h2>
            <div className={styles.tariffGrid}>
              <article className={`${styles.tariff} ${styles.tariffPaid}`}>
                <h3 className={styles.cardTitle}>{TARIFFS.paid.name}</h3>
                <p className={styles.tariffPrice}>{config.price}</p>
                <ul className={styles.tariffList}>
                  {TARIFFS.paid.items.map((it) => (
                    <li key={it.text}>
                      <Icon name="check" className={styles.tariffIcon} />
                      {it.text}
                    </li>
                  ))}
                </ul>
                {config.payEnv ? (
                  <a
                    href={config.payEnv}
                    className={styles.cta}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Взяти запис і бонуси
                    <Icon name="arrow" className={styles.btnIcon} />
                  </a>
                ) : (
                  <button type="button" className={styles.cta} disabled>
                    Оплата скоро буде доступна
                  </button>
                )}
              </article>
              <article className={styles.tariff}>
                <h3 className={styles.cardTitle}>{TARIFFS.free.name}</h3>
                <p className={styles.tariffPrice}>0</p>
                <ul className={styles.tariffList}>
                  {TARIFFS.free.items.map((it) => (
                    <li
                      key={it.text}
                      className={it.included ? undefined : styles.tariffOff}
                    >
                      <Icon
                        name={it.included ? "check" : "close"}
                        className={styles.tariffIcon}
                      />
                      {it.text}
                    </li>
                  ))}
                </ul>
                <a href="#register" className={styles.ctaGhost}>
                  Зареєструватись безкоштовно
                </a>
              </article>
            </div>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <div className={styles.container}>
            <h2 id="faq-title" className={styles.h2}>
              Часті запитання
            </h2>
            <div className={styles.faq}>
              {FAQ.map((f) => (
                <details key={f.q} className={styles.faqItem}>
                  <summary>{f.q}</summary>
                  <p className={styles.cardText}>{f.a}</p>
                </details>
              ))}
            </div>
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
                  Залиш email — надішлемо посилання на ефіри й нагадаємо про
                  старт {DATES}. Три вечори практики покажуть, чи хочеш рухатися
                  далі.
                </p>
              </div>

              {status === "success" ? (
                <output className={styles.success}>
                  <span className={styles.check} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <span>Дякуємо! Перевір email.</span>
                  {BOT_URL && (
                    <a
                      href={BOT_URL}
                      className={styles.ctaGhost}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Перейти в Telegram-бот
                    </a>
                  )}
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
                      : "Зареєструватись безкоштовно"}
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
            Розвивайся вже сьогодні
          </a>
        </div>
      </footer>
    </div>
  );
}
