"use client";

import { type FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import {
  AGENDA,
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  COMMUNITY_PHOTOS,
  HERO_IMAGE,
  OUTCOMES,
  SOURCE,
  SPEAKERS,
  START,
} from "./content";
import Icon from "./Icon";
import styles from "./voice.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function VoiceWebinarLanding() {
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
            <a href="#agenda">Що буде</a>
            <a href="#speakers">Спікери</a>
            <a href="#outcomes">Результат</a>
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
                Прямий ефір · Voice AI агенти
              </p>
              <h1 id="hero-title" className={styles.title}>
                Voice AI агенти: хайп минув — почалася реальна робота
              </h1>
              <p className={styles.subtitle}>
                Ефіри з практиками та розробниками AI-агентів Сергієм та
                Алексом. Бізнес більше не купує «цікаву фічу» — він платить за
                процеси, економію часу й автоматизацію рутини. Розберемо, як
                створювати надійних Voice-агентів і монетизувати цю навичку.
              </p>
              <ul className={styles.chips} aria-label="Дата і формат">
                <li className={styles.chipAccent}>{START.date}</li>
                <li className={styles.chipAccent}>{START.time}</li>
                <li className={styles.chip}>3 ефіри</li>
                <li className={styles.chip}>Live online</li>
              </ul>
              <p className={styles.heroNote}>
                Посилання на ефір надішлемо на email після реєстрації
              </p>
              <a href="#register" className={styles.cta}>
                Зареєструватися на ефір
                <Icon name="arrow" className={styles.btnIcon} />
              </a>
            </div>
            <div className={styles.heroImageWrap}>
              <Image
                src={HERO_IMAGE}
                alt="Voice AI Agents — мікрофон з хвилями та AI-схемами"
                width={520}
                height={293}
                className={styles.heroArt}
                priority
                unoptimized
              />
            </div>
          </div>
        </section>

        <section
          id="agenda"
          className={styles.section}
          aria-labelledby="agenda-title"
        >
          <div className={styles.container}>
            <h2 id="agenda-title" className={styles.h2}>
              Що буде <span className={styles.accent}>на ефірі</span>
            </h2>
            <p className={styles.lead}>
              Три ефіри — від основ до монетизації. Без обіцянок швидкого
              доходу: тільки те, як це працює на практиці.
            </p>
            <ul className={styles.grid}>
              {AGENDA.map((a) => (
                <li key={a.day} className={styles.card}>
                  <span className={styles.iconTile}>
                    <Icon name={a.icon} />
                  </span>
                  <p className={styles.dayLabel}>{a.day}</p>
                  <h3 className={styles.cardTitle}>{a.title}</h3>
                  <p className={styles.cardText}>{a.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="speakers"
          className={styles.section}
          aria-labelledby="speakers-title"
        >
          <div className={styles.container}>
            <h2 id="speakers-title" className={styles.h2}>
              Спікери <span className={styles.accent}>ефіру</span>
            </h2>
            <ul className={styles.speakers}>
              {SPEAKERS.map((s) => (
                <li key={s.name} className={styles.speaker}>
                  {s.photo ? (
                    <Image
                      src={s.photo}
                      alt={s.name}
                      width={80}
                      height={80}
                      className={styles.avatarPhoto}
                      unoptimized
                    />
                  ) : (
                    <span className={styles.avatar} aria-hidden="true">
                      {s.initial}
                    </span>
                  )}
                  <div>
                    <p className={styles.speakerLabel}>Спікер ефіру</p>
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
          id="outcomes"
          className={styles.section}
          aria-labelledby="outcomes-title"
        >
          <div className={styles.container}>
            <h2 id="outcomes-title" className={styles.h2}>
              Що стане зрозуміло{" "}
              <span className={styles.accent}>після ефіру</span>
            </h2>
            <p className={styles.lead}>
              Не універсальний рецепт, а послідовність рішень, яку можна
              приміряти до своєї ситуації.
            </p>
            <ol className={styles.steps}>
              {OUTCOMES.map((o) => (
                <li key={o.title} className={styles.step}>
                  <span className={styles.iconTile}>
                    <Icon name={o.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{o.title}</h3>
                  <p className={styles.cardText}>{o.text}</p>
                </li>
              ))}
            </ol>

            <h3 className={styles.subhead} id="audience-heading">
              Кому буде корисно
            </h3>
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
                  {AUDIENCES[key].title}
                </button>
              ))}
            </fieldset>
            <div className={styles.audienceCard} aria-live="polite">
              <p className={styles.audienceText}>{current.text}</p>
            </div>
          </div>
        </section>

        <section className={styles.communitySection} aria-labelledby="community-title">
          <div className={styles.container}>
            <h2 id="community-title" className={styles.h2}>
              MASC — <span className={styles.accent}>спільнота практиків</span>
            </h2>
            <p className={styles.lead}>
              4 500+ випускників. Живі ефіри, розбори кейсів, практичні завдання — без теорії заради теорії.
            </p>
            <div className={styles.communityGrid}>
              {COMMUNITY_PHOTOS.map((photo) => (
                <div key={photo.src} className={styles.communityPhotoWrap}>
                  <Image
                    src={photo.src}
                    alt={photo.alt}
                    width={530}
                    height={354}
                    className={styles.communityPhoto}
                    unoptimized
                  />
                </div>
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
                  Зареєструйся на ефір
                </h2>
                <p className={styles.cardText}>
                  Залиш email — надішлемо посилання на ефір і нагадаємо перед
                  стартом. {startLine}.
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
                      : "Зареєструватися на ефір"}
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
