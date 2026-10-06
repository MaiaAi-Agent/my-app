"use client";

import { type FormEvent, useEffect, useState } from "react";
import { HERO_IMAGE, PROGRAM, REASONS, SOURCE, STATS } from "./content";
import Icon from "./Icon";
import styles from "./testdrive.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[0-9\s()-]{10,19}$/;

type Status = "idle" | "sending" | "success" | "error";

export default function TestdriveLanding() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  useEffect(() => {
    if (status !== "success") return;
    const timer = setTimeout(() => setStatus("idle"), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  const utm = () => {
    if (typeof window === "undefined") return undefined;
    const params = new URLSearchParams(window.location.search);
    const utm: Record<string, string> = {};
    for (const key of [
      "utm_source",
      "utm_medium",
      "utm_campaign",
      "utm_content",
      "utm_term",
    ]) {
      const value = params.get(key);
      if (value) utm[key] = value;
    }
    return Object.keys(utm).length ? utm : undefined;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const n = name.trim();
    const value = email.trim();
    const p = phone.trim();
    if (n.length < 2) {
      setError("Вкажи, будь ласка, своє ім'я.");
      setStatus("error");
      return;
    }
    if (!EMAIL_RE.test(value)) {
      setError("Перевір, будь ласка, email — схоже, в ньому помилка.");
      setStatus("error");
      return;
    }
    if (!PHONE_RE.test(p)) {
      setError("Перевір, будь ласка, номер телефону.");
      setStatus("error");
      return;
    }
    setStatus("sending");
    setError("");
    try {
      const response = await fetch("/api/testdrive-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, email: value, phone: p, source: SOURCE, utm: utm() }),
      });
      if (response.status === 503) {
        setError("Реєстрація тимчасово недоступна. Спробуй трохи пізніше.");
        setStatus("error");
        return;
      }
      if (!response.ok)
        throw new Error(`/api/testdrive-lead responded ${response.status}`);
      setStatus("success");
      setName("");
      setEmail("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setError(
        "Не вдалося надіслати заявку. Перевір з'єднання і спробуй ще раз.",
      );
      setStatus("error");
    }
  };

  const cta = (
    <>
      Зареєструватись
      <Icon name="arrow" className={styles.btnIcon} />
    </>
  );

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
            <a href="#why">Навіщо</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Зареєструватись
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
                Безкоштовний тест-драйв · Старт: 13 жовтня
              </p>
              <h1 id="hero-title" className={styles.title}>
                Додай розробку{" "}
                <span className={styles.accent}>AI-агентів</span> до своїх
                послуг та для клієнтів
              </h1>
              <p className={styles.subtitle}>
                За розробку одного АІ-агента замовник готовий платити від
                $30/годину. Розберися, як застосовувати ці сценарії у власній
                роботі та клієнтських проєктах.
              </p>
              <ul className={styles.chips} aria-label="Формат">
                <li className={styles.chipAccent}>Безкоштовний тест-драйв</li>
                <li className={styles.chipAccent}>Три дні</li>
                <li className={styles.chip}>Старт: 13 жовтня</li>
              </ul>
              <a href="#register" className={styles.cta}>
                {cta}
              </a>
              <p className={styles.heroNote}>Місця обмежені!</p>
            </div>
            <div className={styles.heroImageWrap}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={HERO_IMAGE}
                alt="Digital-фахівець працює над AI-агентами"
                className={styles.heroImg}
              />
            </div>
          </div>
        </section>

        <section
          id="program"
          className={styles.section}
          aria-labelledby="program-title"
        >
          <div className={styles.container}>
            <h2 id="program-title" className={styles.h2}>
              Три дні — три приклади{" "}
              <span className={styles.accent}>майбутньої послуги</span>
            </h2>
            <ol className={styles.program}>
              {PROGRAM.map((d, i) => (
                <li key={d.day} className={styles.day}>
                  <span className={styles.dayNum} aria-hidden="true">
                    0{i + 1}
                  </span>
                  <span className={styles.iconTile}>
                    <Icon name={d.icon} />
                  </span>
                  <p className={styles.dayLabel}>{d.day}</p>
                  <h3 className={styles.cardTitle}>{d.title}</h3>
                  <p className={styles.cardText}>{d.text}</p>
                </li>
              ))}
            </ol>
            <div className={styles.programCta}>
              <a href="#register" className={styles.cta}>
                {cta}
              </a>
            </div>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="stats-title"
        >
          <div className={styles.container}>
            <h2 id="stats-title" className={styles.srOnly}>
              Цифри попиту на AI-агентів
            </h2>
            <ul className={styles.statsGrid}>
              {STATS.map((s) => (
                <li key={s.value} className={styles.statCard}>
                  <p className={styles.statValue}>{s.value}</p>
                  <p className={styles.statLabel}>{s.label}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="why" className={styles.section} aria-labelledby="why-title">
          <div className={styles.container}>
            <h2 id="why-title" className={styles.h2}>
              Навіщо тобі реєструватись на{" "}
              <span className={styles.accent}>тест-драйв</span>
            </h2>
            <ul className={styles.grid}>
              {REASONS.map((r) => (
                <li key={r.title} className={styles.card}>
                  <span className={styles.iconTile}>
                    <Icon name={r.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{r.title}</h3>
                  <p className={styles.cardText}>{r.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          className={styles.section}
          aria-labelledby="prize-title"
        >
          <div className={styles.container}>
            <div className={styles.prize}>
              <span className={styles.iconTile}>
                <Icon name="gift" />
              </span>
              <div>
                <h2 id="prize-title" className={styles.h2}>
                  Виграй повний курс <span className={styles.accent}>АІ-агенти</span>!
                </h2>
                <p className={styles.cardText}>
                  Розіграємо курс АІ-агенти серед тих, хто здасть усі домашні
                  завдання та буде присутній на ефірі.
                </p>
              </div>
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
                  Забери місце на тест-драйві
                </h2>
                <p className={styles.cardText}>
                  Залиш контакти — надішлемо доступ і нагадаємо про старт 13
                  жовтня.
                </p>
              </div>

              {status === "success" ? (
                <output className={styles.success}>
                  <span className={styles.check} aria-hidden="true">
                    <Icon name="check" />
                  </span>
                  <span>Дякуємо! Ми тобі напишемо.</span>
                </output>
              ) : (
                <form
                  className={styles.form}
                  onSubmit={handleSubmit}
                  noValidate
                >
                  <label className={styles.label} htmlFor="name">
                    Твоє ім'я
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    placeholder="Іван"
                    className={styles.input}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    aria-describedby={
                      status === "error" ? "form-error" : undefined
                    }
                  />

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

                  <label className={styles.label} htmlFor="phone">
                    Твій телефон
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    required
                    placeholder="+380…"
                    className={styles.input}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    aria-invalid={
                      status === "error" && !PHONE_RE.test(phone.trim())
                    }
                    aria-describedby={
                      status === "error" ? "form-error" : undefined
                    }
                  />

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
                    {status === "sending" ? "Надсилаємо…" : cta}
                  </button>
                  <p className={styles.formNote}>Місця обмежені!</p>
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
