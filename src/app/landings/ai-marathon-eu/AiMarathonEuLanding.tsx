"use client";

import Image from "next/image";
import { type FormEvent, useEffect, useState } from "react";
import styles from "./ai-marathon-eu.module.css";
import logo from "./assets/logo-light.png";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  BONUSES,
  EVENT,
  EVENT_START,
  FAQ,
  FOOTER_COPY,
  FORM_COPY,
  PLANS,
  PROGRAM,
  SECTION_COPY,
  SOURCE,
  SPEAKER,
} from "./content";
import Icon from "./Icon";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_content",
  "utm_term",
] as const;
const PAID_URL = process.env.NEXT_PUBLIC_PAID_URL?.trim();

type Status = "idle" | "sending" | "success" | "error";
type Countdown = { days: number; hours: number; minutes: number } | null;

function readUtm(): Record<string, string> | undefined {
  const params = new URLSearchParams(window.location.search);
  const utm: Record<string, string> = {};
  for (const key of UTM_KEYS) {
    const value = params.get(key);
    if (value) utm[key] = value;
  }
  return Object.keys(utm).length ? utm : undefined;
}

function getCountdown(): Countdown {
  const distance = new Date(EVENT_START).getTime() - Date.now();
  if (distance <= 0) return null;
  return {
    days: Math.floor(distance / 86_400_000),
    hours: Math.floor((distance / 3_600_000) % 24),
    minutes: Math.floor((distance / 60_000) % 60),
  };
}

function Eyebrow({ children }: { children: string }) {
  return <p className={styles.eyebrow}>{children}</p>;
}

function PaidButton({ className }: { className?: string }) {
  if (!PAID_URL) {
    return (
      <button
        type="button"
        className={className ?? styles.secondaryCta}
        disabled
      >
        {EVENT.paidSoon}
      </button>
    );
  }

  return (
    <a href={PAID_URL} className={className ?? styles.secondaryCta}>
      {EVENT.paidCta}
      <Icon name="arrow" className={styles.buttonIcon} />
    </a>
  );
}

export default function AiMarathonEuLanding() {
  const [audience, setAudience] = useState<Audience>("specialist");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState<Countdown>(null);

  useEffect(() => {
    setCountdown(getCountdown());
    const timer = window.setInterval(
      () => setCountdown(getCountdown()),
      60_000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (status !== "success") return;
    const timer = window.setTimeout(() => setStatus("idle"), 5000);
    return () => window.clearTimeout(timer);
  }, [status]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = email.trim();
    if (!EMAIL_RE.test(value)) {
      setError(FORM_COPY.invalidEmail);
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
        setError(FORM_COPY.unavailable);
        setStatus("error");
        return;
      }
      if (!response.ok) {
        throw new Error(`/api/lead responded ${response.status}`);
      }
      setEmail("");
      setStatus("success");
    } catch (submitError) {
      console.error(submitError);
      setError(FORM_COPY.error);
      setStatus("error");
    }
  };

  const currentAudience = AUDIENCES[audience];

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a href="#top" className={styles.logo} aria-label="MASC — на початок">
            <Image
              src={logo}
              alt="MASC — Marketing Automation School"
              priority
            />
          </a>
          <nav className={styles.nav} aria-label="Розділи сторінки">
            <a href="#audience">Для кого</a>
            <a href="#program">Програма</a>
            <a href="#plans">Тарифи</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Реєстрація
            <Icon name="arrow" className={styles.buttonIcon} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.container}>
            <Eyebrow>{EVENT.eyebrow}</Eyebrow>
            <fieldset className={styles.heroToggle}>
              <legend className={styles.srOnly}>Обери аудиторію</legend>
              {AUDIENCE_ORDER.map((key) => (
                <button
                  key={key}
                  type="button"
                  aria-pressed={audience === key}
                  onClick={() => setAudience(key)}
                >
                  {AUDIENCES[key].label}
                </button>
              ))}
            </fieldset>

            <div className={styles.heroGrid}>
              <div className={styles.heroCopy}>
                <h1 id="hero-title" className={styles.heroTitle}>
                  {currentAudience.heroTitle}
                </h1>
                <p className={styles.heroText}>{currentAudience.heroText}</p>
                <ul className={styles.chips} aria-label="Деталі марафону">
                  <li>{EVENT.dates}</li>
                  <li>{EVENT.time}</li>
                  <li>{EVENT.platform}</li>
                </ul>
                <div className={styles.heroActions}>
                  <a href="#register" className={styles.primaryCta}>
                    {EVENT.freeCta}
                    <Icon name="arrow" className={styles.buttonIcon} />
                  </a>
                  <PaidButton />
                </div>
              </div>

              <div className={styles.countdownPanel}>
                <span className={styles.countdownLabel}>До першого ефіру</span>
                <time dateTime={EVENT_START} className={styles.countdownDate}>
                  13.10 / 19:00
                </time>
                {countdown ? (
                  <div
                    className={styles.countdown}
                    role="timer"
                    aria-live="off"
                  >
                    <span>
                      <b>{String(countdown.days).padStart(2, "0")}</b>
                      днів
                    </span>
                    <span>
                      <b>{String(countdown.hours).padStart(2, "0")}</b>
                      годин
                    </span>
                    <span>
                      <b>{String(countdown.minutes).padStart(2, "0")}</b>
                      хвилин
                    </span>
                  </div>
                ) : (
                  <p className={styles.countdownEnded}>Марафон уже стартував</p>
                )}
              </div>
            </div>

            <div className={styles.heroBonuses}>
              <span className={styles.heroBonusLabel}>У тарифі €39</span>
              <span>Записи трьох ефірів</span>
              <span>2 бонусні курси</span>
            </div>
          </div>
        </section>

        <section id="audience" className={styles.section}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.audienceEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>
              {SECTION_COPY.audienceTitle}
            </h2>
            <div className={styles.audienceLayout}>
              <div className={styles.audienceToggle}>
                {AUDIENCE_ORDER.map((key) => (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={audience === key}
                    onClick={() => setAudience(key)}
                  >
                    <Icon name={AUDIENCES[key].icon} />
                    {AUDIENCES[key].label}
                  </button>
                ))}
              </div>
              <ul className={styles.recognitionList} aria-live="polite">
                {currentAudience.recognition.map((item) => (
                  <li key={item}>
                    <Icon name="check" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.lightSection}`}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.bonusesEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.bonusesTitle}</h2>
            <div className={styles.twoColumnGrid}>
              {BONUSES.map((bonus, index) => (
                <article key={bonus.title} className={styles.bonusItem}>
                  <span className={styles.itemIndex}>0{index + 1}</span>
                  <Icon name={bonus.icon} />
                  <h3>{bonus.title}</h3>
                  <p>{bonus.text}</p>
                </article>
              ))}
            </div>
            <p className={styles.sectionNote}>{SECTION_COPY.bonusesNote}</p>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.speakerEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.speakerTitle}</h2>
            <div className={styles.speakerGrid}>
              <div className={styles.speakerPlaceholder}>
                <Icon name="user" />
                <span>{SPEAKER.photoPlaceholder}</span>
              </div>
              <div className={styles.speakerCopy}>
                <p className={styles.speakerLabel}>{SPEAKER.label}</p>
                <h3>{SPEAKER.name}</h3>
                <ul>
                  {SPEAKER.facts.map((fact) => (
                    <li key={fact}>{fact}</li>
                  ))}
                </ul>
                <blockquote>«{SPEAKER.quote}»</blockquote>
              </div>
            </div>
          </div>
        </section>

        <section
          id="program"
          className={`${styles.section} ${styles.lightSection}`}
        >
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.programEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.programTitle}</h2>
            <ol className={styles.programGrid}>
              {PROGRAM.map((item, index) => (
                <li key={item.day}>
                  <span className={styles.dayNumber}>0{index + 1}</span>
                  <p className={styles.dayLabel}>{item.day}</p>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <div className={styles.dayResult}>
                    <span>{SECTION_COPY.resultLabel}</span>
                    <strong>{item.result}</strong>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="plans" className={styles.section}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.plansEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.plansTitle}</h2>
            <div className={styles.plansGrid}>
              {PLANS.map((plan) => (
                <article
                  key={plan.key}
                  className={`${styles.plan} ${plan.key === "paid" ? styles.planFeatured : ""}`}
                >
                  <p className={styles.planLabel}>{`// ${plan.label}`}</p>
                  <div className={styles.planHeading}>
                    <h3>{plan.title}</h3>
                    <strong>{plan.price}</strong>
                  </div>
                  <ul>
                    {plan.features.map((feature) => (
                      <li key={feature}>
                        <Icon name="check" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  {plan.key === "paid" ? (
                    <PaidButton className={styles.planCta} />
                  ) : (
                    <a href="#register" className={styles.planCta}>
                      {EVENT.freeCta}
                      <Icon name="arrow" className={styles.buttonIcon} />
                    </a>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.lightSection}`}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.faqEyebrow}</Eyebrow>
            <h2 className={styles.sectionTitle}>{SECTION_COPY.faqTitle}</h2>
            <div className={styles.faqList}>
              {FAQ.map((item) => (
                <details key={item.question}>
                  <summary>{item.question}</summary>
                  <p>{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="register" className={styles.registerSection}>
          <div className={`${styles.container} ${styles.registerGrid}`}>
            <div>
              <Eyebrow>{FORM_COPY.eyebrow}</Eyebrow>
              <h2 className={styles.sectionTitle}>{FORM_COPY.title}</h2>
              <p className={styles.registerText}>{FORM_COPY.text}</p>
            </div>
            {status === "success" ? (
              <output className={styles.success}>
                <Icon name="check" />
                <span>{FORM_COPY.success}</span>
              </output>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <label htmlFor="marathon-email">{FORM_COPY.emailLabel}</label>
                <input
                  id="marathon-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  inputMode="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  aria-invalid={
                    status === "error" && !EMAIL_RE.test(email.trim())
                  }
                  aria-describedby={
                    status === "error" ? "form-error" : undefined
                  }
                />
                <label htmlFor="audience-select">
                  {FORM_COPY.audienceLabel}
                </label>
                <select
                  id="audience-select"
                  name="audience"
                  value={audience}
                  onChange={(event) =>
                    setAudience(event.target.value as Audience)
                  }
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
                  className={styles.primaryCta}
                  disabled={status === "sending"}
                >
                  {status === "sending" ? FORM_COPY.sending : EVENT.freeCta}
                  <Icon name="arrow" className={styles.buttonIcon} />
                </button>
              </form>
            )}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div className={styles.container}>
            <Eyebrow>{SECTION_COPY.finalEyebrow}</Eyebrow>
            <h2>{SECTION_COPY.finalTitle}</h2>
            <p>{SECTION_COPY.finalText}</p>
            <a href="#register" className={styles.primaryCta}>
              {EVENT.freeCta}
              <Icon name="arrow" className={styles.buttonIcon} />
            </a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.container}>
          <Image src={logo} alt="MASC" />
          <p>{FOOTER_COPY}</p>
        </div>
      </footer>

      <div className={styles.stickyBar}>
        <a href="#register" className={styles.stickyPrimary}>
          Безкоштовно
        </a>
        <PaidButton className={styles.stickySecondary} />
      </div>
    </div>
  );
}
