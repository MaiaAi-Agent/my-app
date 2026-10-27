"use client";

import { type FormEvent, useEffect, useState } from "react";
import {
  AUDIENCE_ORDER,
  AUDIENCES,
  type Audience,
  CALL_TOPICS,
  COMPARE,
  FAQ,
  FLAGMAN_BONUS,
  SOURCE,
  TIERS,
} from "./content";
import Icon from "./Icon";
import styles from "./masc-club.module.css";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "sending" | "success" | "error";

export default function ClubLanding() {
  const [tier, setTier] = useState<Audience>("allin");
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
        body: JSON.stringify({ email: value, audience: tier, source: SOURCE }),
      });
      if (response.status === 503) {
        setError("Заявка тимчасово недоступна. Спробуй трохи пізніше.");
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

  const current = AUDIENCES[tier];

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
            <a href="#tiers">Тарифи</a>
            <a href="#live">Живі дзвони</a>
            <a href="#flagman">Проходиш курс?</a>
          </nav>
          <a href="#register" className={styles.headerCta}>
            Приєднатись
            <Icon name="arrow" className={styles.btnIcon} />
          </a>
        </div>
      </header>

      <main id="top">
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.container}>
            <p className={styles.badge}>
              <span className={styles.dot} aria-hidden="true" />
              Клуб MASC за підпискою
            </p>
            <h1 id="hero-title" className={styles.title}>
              Бібліотека, живі дзвони і{" "}
              <span className={styles.accent}>ком&apos;юніті</span> одним
              підписом
            </h1>
            <p className={styles.subtitle}>
              Вся база знань школи, регулярні живі дзвони за темами і середовище
              людей, які будують кар&apos;єру в автоматизації.
            </p>
            <ul className={styles.chips} aria-label="Формат">
              <li className={styles.chipAccent}>Від 0 грн</li>
              <li className={styles.chip}>Живі дзвони щотижня</li>
              <li className={styles.chip}>Мастермайнд</li>
            </ul>
            <a href="#tiers" className={styles.cta}>
              Почати безкоштовно
              <Icon name="arrow" className={styles.btnIcon} />
            </a>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="problem-title">
          <div className={styles.container}>
            <h2 id="problem-title" className={styles.h2}>
              Знайомо?
            </h2>
            <ul className={styles.grid}>
              <li className={styles.card}>
                <span className={styles.iconTile}>
                  <Icon name="clock" />
                </span>
                <h3 className={styles.cardTitle}>Курс закінчився</h3>
                <p className={styles.cardText}>
                  Матеріали залишились, але імпульс і ритм — зникли.
                </p>
              </li>
              <li className={styles.card}>
                <span className={styles.iconTile}>
                  <Icon name="check" />
                </span>
                <h3 className={styles.cardTitle}>Підтримка закінчилась</h3>
                <p className={styles.cardText}>
                  Питання з&apos;являються, а запитати більше нема в кого.
                </p>
              </li>
              <li className={styles.card}>
                <span className={styles.iconTile}>
                  <Icon name="bolt" />
                </span>
                <h3 className={styles.cardTitle}>Розвиток зупинився</h3>
                <p className={styles.cardText}>
                  Інструменти змінюються щомісяця — самотужки за ними не
                  встигнути.
                </p>
              </li>
            </ul>
          </div>
        </section>

        <section
          id="tiers"
          className={styles.section}
          aria-labelledby="tiers-title"
        >
          <div className={styles.container}>
            <h2 id="tiers-title" className={styles.h2}>
              Обери свій <span className={styles.accent}>рівень участі</span>
            </h2>
            <ul className={styles.tiers}>
              {TIERS.map((t) => (
                <li
                  key={t.key}
                  className={`${styles.tierCard}${t.featured ? ` ${styles.tierFeatured}` : ""}`}
                >
                  {t.badge && <span className={styles.tierBadge}>{t.badge}</span>}
                  <h3 className={styles.cardTitle}>{t.name}</h3>
                  <p className={styles.tierPrice}>{t.price}</p>
                  {(t.price6 || t.price12) && (
                    <ul className={styles.tierPrices}>
                      {t.price6 && <li>{t.price6}</li>}
                      {t.price12 && <li>{t.price12}</li>}
                    </ul>
                  )}
                  <ul className={styles.topics}>
                    {t.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                  <a
                    href="#register"
                    className={t.featured ? styles.cta : styles.ctaSecondary}
                    onClick={() => {
                      if (t.key !== "free") setTier(t.key as Audience);
                    }}
                  >
                    {t.cta}
                    <Icon name="arrow" className={styles.btnIcon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="compare"
          className={styles.section}
          aria-labelledby="compare-title"
        >
          <div className={styles.container}>
            <h2 id="compare-title" className={styles.h2}>
              Курс чи клуб? <span className={styles.accent}>Разом — найкраще</span>
            </h2>
            <ul className={styles.grid}>
              {COMPARE.map((c) => (
                <li key={c.title} className={styles.card}>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardText}>{c.tagline}</p>
                  <ul className={styles.topics}>
                    {c.points.map((p) => (
                      <li key={p}>{p}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="live"
          className={styles.section}
          aria-labelledby="live-title"
        >
          <div className={styles.container}>
            <h2 id="live-title" className={styles.h2}>
              Живі дзвони <span className={styles.accent}>щотижня</span>
            </h2>
            <ul className={styles.grid}>
              {CALL_TOPICS.map((c) => (
                <li key={c.title} className={styles.card}>
                  <span className={styles.iconTile}>
                    <Icon name={c.icon} />
                  </span>
                  <h3 className={styles.cardTitle}>{c.title}</h3>
                  <p className={styles.cardText}>{c.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section
          id="flagman"
          className={styles.section}
          aria-labelledby="flagman-title"
        >
          <div className={styles.container}>
            <h2 id="flagman-title" className={styles.h2}>
              Проходиш <span className={styles.accent}>флагманський курс?</span>
            </h2>
            <p className={styles.cardText}>
              Доступ до клубу вже включений у пакет флагмана як бонус:
            </p>
            <ul className={styles.flagmanList}>
              {FLAGMAN_BONUS.map((f) => (
                <li key={f.pkg} className={styles.flagmanRow}>
                  <span className={styles.flagmanPkg}>{f.pkg}</span>
                  <span className={styles.flagmanBonus}>{f.bonus}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.section} aria-labelledby="faq-title">
          <div className={styles.container}>
            <h2 id="faq-title" className={styles.h2}>
              Часті питання
            </h2>
            <ul className={styles.faqList}>
              {FAQ.map((f) => (
                <li key={f.q} className={styles.faqItem}>
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
                  Почни з безкоштовного доступу
                </h2>
                <p className={styles.cardText}>
                  Залиш email — надішлемо доступ до безкоштовної частини клубу.
                  Оплату обраного тарифу налаштуємо після заявки.
                </p>
                <h3 className={styles.audienceTitle}>{current.title}</h3>
                <p className={styles.audienceText}>{current.text}</p>
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

                  <label className={styles.label} htmlFor="tier-select">
                    Обери тариф
                  </label>
                  <select
                    id="tier-select"
                    name="audience"
                    className={styles.input}
                    value={tier}
                    onChange={(e) => setTier(e.target.value as Audience)}
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
                      : "Приєднатись до клубу"}
                    <Icon name="arrow" className={styles.btnIcon} />
                  </button>
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
