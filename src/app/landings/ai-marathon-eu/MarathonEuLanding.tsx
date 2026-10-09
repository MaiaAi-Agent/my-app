"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import styles from "./ai-marathon-eu.module.css";
import logoLight from "./assets/logo-light.png";
import Countdown from "./Countdown";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  BONUSES,
  FAQ,
  FOOTER,
  HERO,
  PROGRAM,
  REGISTER,
  SOURCE,
  SPEAKER,
  SPEAKER_PHOTO,
  START_AT,
  TARIFFS,
  TODO,
} from "./content";
import Icon from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Посилання на оплату (Stripe). Вшивається під час збірки. Порожнє = стан «скоро».
const RAW_PAID_URL = process.env.NEXT_PUBLIC_PAID_URL?.trim();
const PAID_URL = RAW_PAID_URL?.startsWith("https://") ? RAW_PAID_URL : "";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;

/** UTM-мітки з адреси сторінки (реклама Meta); порожні не передаємо. */
function readUtm(): Record<string, string> | undefined {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return Object.keys(utm).length ? utm : undefined;
}

type Status = "idle" | "sending" | "success" | "error";

function PaidButton({ className }: { className: string }) {
  if (PAID_URL) {
    return (
      <a href={PAID_URL} className={className} rel="noopener">
        {TARIFFS.paid.cta}
        <Icon name="arrow" className={styles.btnIcon} />
      </a>
    );
  }
  return (
    <button type="button" className={className} disabled>
      {TARIFFS.paid.soon}
    </button>
  );
}

export default function MarathonEuLanding() {
  const [audience, setAudience] = useState<Audience>("specialist");
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
      setError("Постав позначку згоди, щоб ми могли зареєструвати тебе.");
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
          source: SOURCE,
          utm: readUtm(),
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

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <a href="#top" className={styles.logo} aria-label="MASC — на початок">
            <Image
              src={logoLight}
              alt="MASC — Marketing Automation School"
              className={styles.logoImg}
              priority
            />
          </a>
          <a href="#register" className={styles.headerCta}>
            Зареєструватись
            <Icon name="arrow" className={styles.btnIcon} />
          </a>
        </div>
      </header>

      <main id="top">
        {/* HERO */}
        <section
          className={`${styles.section} ${styles.dark} ${styles.hero}`}
          aria-labelledby="hero-title"
        >
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroMain}>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowText}>{HERO.eyebrow}</span>
              </p>

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
                    {AUDIENCES[key].label}
                  </button>
                ))}
              </fieldset>

              <h1 id="hero-title" className={styles.title}>
                {current.title.before}{" "}
                <span className={styles.accent}>{current.title.accent}</span>{" "}
                {current.title.after}
              </h1>
              <p className={styles.subtitle}>{current.subtitle}</p>

              <div className={styles.heroActions}>
                <a href="#register" className={styles.btnPrimary}>
                  {HERO.ctaFree}
                  <Icon name="arrow" className={styles.btnIcon} />
                </a>
                <a href="#tariffs" className={styles.btnOutline}>
                  {HERO.ctaPaid}
                </a>
              </div>
              <p className={styles.heroNote}>{HERO.note}</p>
            </div>

            <aside className={styles.schedule} aria-label="Розклад ефірів">
              <p className={styles.scheduleHead}>
                <Icon name="video" className={styles.scheduleIcon} />
                Живі ефіри · 19:00 за Києвом
              </p>
              <ol className={styles.scheduleList}>
                {PROGRAM.days.map((d, i) => (
                  <li key={d.date} className={styles.scheduleRow}>
                    <span className={styles.scheduleNum} aria-hidden="true">
                      {13 + i}
                    </span>
                    <span className={styles.scheduleText}>
                      <span className={styles.scheduleDate}>{d.date}</span>
                      <span className={styles.scheduleTitle}>{d.title}</span>
                    </span>
                  </li>
                ))}
              </ol>
              <Countdown target={START_AT} label={HERO.countdownLabel} />
            </aside>
          </div>
        </section>

        {/* BONUSES */}
        <section
          className={`${styles.section} ${styles.light}`}
          aria-labelledby="bonuses-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>{BONUSES.eyebrow}</span>
            </p>
            <h2 id="bonuses-title" className={styles.h2}>
              {BONUSES.title}
            </h2>
            <ul className={styles.cols3}>
              {BONUSES.items.map((b) => (
                <li key={b.title} className={styles.cell}>
                  <span className={styles.iconBox}>
                    <Icon name={b.icon} />
                  </span>
                  <h3 className={styles.h3}>{b.title}</h3>
                  <p className={styles.text}>{b.text}</p>
                </li>
              ))}
            </ul>
            <p className={styles.sectionNote}>{BONUSES.note}</p>
          </div>
        </section>

        {/* FOR WHOM */}
        <section
          className={`${styles.section} ${styles.dark}`}
          aria-labelledby="audience-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>Для кого</span>
            </p>
            <h2 id="audience-title" className={styles.h2}>
              {current.recognizeTitle}
            </h2>
            <p className={styles.audienceTag}>Показано для: {current.label}</p>
            <ul
              className={`${styles.cols3} ${current.recognize.length === 4 ? styles.cols4 : ""}`}
              aria-live="polite"
            >
              {current.recognize.map((r) => (
                <li key={r.text} className={styles.cell}>
                  <span className={styles.iconBox}>
                    <Icon name={r.icon} />
                  </span>
                  <p className={styles.textLg}>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* SPEAKER */}
        <section
          className={`${styles.section} ${styles.light}`}
          aria-labelledby="speaker-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>{SPEAKER.eyebrow}</span>
            </p>
            <h2 id="speaker-title" className={styles.h2}>
              {SPEAKER.title}
            </h2>
            <div className={styles.speaker}>
              {SPEAKER_PHOTO ? (
                <Image
                  src={SPEAKER_PHOTO}
                  alt={`${SPEAKER.name}, спікер марафону`}
                  width={600}
                  height={750}
                  className={styles.speakerPhoto}
                />
              ) : (
                <div
                  className={styles.photoTodo}
                  role="img"
                  aria-label="Тут буде фото спікера"
                >
                  <Icon name="user" className={styles.photoTodoIcon} />
                  <span className={styles.todo}>[{TODO.speakerPhoto}]</span>
                </div>
              )}
              <div>
                <h3 className={styles.speakerName}>{SPEAKER.name}</h3>
                <p className={styles.speakerRole}>{SPEAKER.role}</p>
                <ul className={styles.facts}>
                  {SPEAKER.facts.map((f) => (
                    <li key={f}>
                      <Icon name="check" className={styles.factIcon} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <blockquote className={styles.approach}>
                  <p className={styles.approachLabel}>
                    {SPEAKER.approachLabel}
                  </p>
                  <p className={styles.approachText}>{SPEAKER.approach}</p>
                </blockquote>
              </div>
            </div>
          </div>
        </section>

        {/* PROGRAM */}
        <section
          className={`${styles.section} ${styles.dark}`}
          aria-labelledby="program-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>{PROGRAM.eyebrow}</span>
            </p>
            <h2 id="program-title" className={styles.h2}>
              {PROGRAM.title}
            </h2>
            <ol className={styles.cols3}>
              {PROGRAM.days.map((d, i) => (
                <li key={d.title} className={`${styles.cell} ${styles.day}`}>
                  <span className={styles.dayNum} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <p className={styles.dayDate}>{d.date}</p>
                  <h3 className={styles.h3}>{d.title}</h3>
                  <p className={styles.text}>{d.text}</p>
                  <ul className={styles.topics}>
                    {d.topics.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                  <p className={styles.dayResult}>
                    <span className={styles.dayResultLabel}>
                      {PROGRAM.resultLabel}
                    </span>
                    {d.result}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* TARIFFS */}
        <section
          id="tariffs"
          className={`${styles.section} ${styles.light}`}
          aria-labelledby="tariffs-title"
        >
          <div className={styles.container}>
            <p className={styles.eyebrow}>
              <span className={styles.eyebrowText}>{TARIFFS.eyebrow}</span>
            </p>
            <h2 id="tariffs-title" className={styles.h2}>
              {TARIFFS.title}
            </h2>
            <div className={styles.tariffs}>
              <article className={`${styles.tariff} ${styles.tariffPaid}`}>
                <h3 className={styles.tariffName}>{TARIFFS.paid.name}</h3>
                <p className={styles.price}>{TARIFFS.paid.price}</p>
                <ul className={styles.tariffList}>
                  {TARIFFS.rows.map((r) => (
                    <li key={r.text} className={styles.tariffRow}>
                      <Icon
                        name={r.paid ? "check" : "minus"}
                        className={styles.tariffIcon}
                      />
                      <span>
                        {r.text}
                        {!r.paid && (
                          <span className={styles.srOnly}> — не входить</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <PaidButton className={styles.btnPrimary} />
              </article>

              <article className={`${styles.tariff} ${styles.tariffFree}`}>
                <h3 className={styles.tariffName}>{TARIFFS.free.name}</h3>
                <p className={styles.price}>{TARIFFS.free.price}</p>
                <ul className={styles.tariffList}>
                  {TARIFFS.rows.map((r) => (
                    <li
                      key={r.text}
                      className={`${styles.tariffRow} ${r.free ? "" : styles.tariffOff}`}
                    >
                      <Icon
                        name={r.free ? "check" : "minus"}
                        className={styles.tariffIcon}
                      />
                      <span>
                        {r.text}
                        {!r.free && (
                          <span className={styles.srOnly}> — не входить</span>
                        )}
                      </span>
                    </li>
                  ))}
                </ul>
                <a href="#register" className={styles.btnOutlineInk}>
                  {TARIFFS.free.cta}
                  <Icon name="arrow" className={styles.btnIcon} />
                </a>
              </article>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section
          className={`${styles.section} ${styles.dark}`}
          aria-labelledby="faq-title"
        >
          <div className={`${styles.container} ${styles.faqWrap}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowText}>{FAQ.eyebrow}</span>
              </p>
              <h2 id="faq-title" className={styles.h2}>
                {FAQ.title}
              </h2>
            </div>
            <div className={styles.faqList}>
              {FAQ.items.map((item) => (
                <details key={item.q} className={styles.faqItem}>
                  <summary className={styles.faqSummary}>
                    <span>{item.q}</span>
                    <Icon name="chevron" className={styles.faqChevron} />
                  </summary>
                  <p
                    className={`${styles.faqAnswer} ${"todo" in item && item.todo ? styles.todo : ""}`}
                  >
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* FINAL CTA + FORM */}
        <section
          id="register"
          className={`${styles.section} ${styles.cta}`}
          aria-labelledby="register-title"
        >
          <div className={`${styles.container} ${styles.ctaGrid}`}>
            <div>
              <p className={styles.eyebrow}>
                <span className={styles.eyebrowText}>13–15 жовтня · 19:00</span>
              </p>
              <h2 id="register-title" className={styles.h2Cta}>
                {REGISTER.title}
              </h2>
              <p className={styles.ctaText}>{REGISTER.text}</p>
              <p className={styles.ctaHint}>
                {REGISTER.paidHint}{" "}
                <a href="#tariffs" className={styles.ctaLink}>
                  {REGISTER.paidLink}
                </a>
              </p>
            </div>

            <div className={styles.formCard}>
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
                    <span>{REGISTER.consent}</span>
                  </label>

                  {status === "error" && (
                    <p id="form-error" className={styles.error} role="alert">
                      {error}
                    </p>
                  )}

                  <button
                    type="submit"
                    className={styles.btnInk}
                    disabled={status === "sending"}
                  >
                    {status === "sending" ? "Надсилаємо…" : TARIFFS.free.cta}
                    <Icon name="arrow" className={styles.btnIcon} />
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      <footer className={`${styles.dark} ${styles.footer}`}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <Image
            src={logoLight}
            alt="MASC — Marketing Automation School"
            className={styles.logoImg}
          />
          <p className={styles.footerTag}>
            {FOOTER.tagLine1}
            <br />
            {FOOTER.tagLine2}
          </p>
        </div>
      </footer>
    </div>
  );
}
