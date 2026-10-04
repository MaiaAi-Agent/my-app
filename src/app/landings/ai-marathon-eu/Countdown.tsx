"use client";

import { useEffect, useState } from "react";
import styles from "./ai-marathon-eu.module.css";

const MINUTE = 60_000;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

/** Фактичний таймер до першого ефіру. Після старту зникає. Рахується на клієнті, щоб сторінка лишалась статичною. */
export default function Countdown({
  target,
  label,
}: {
  target: string;
  label: string;
}) {
  const [left, setLeft] = useState<number | null>(null);

  useEffect(() => {
    const end = new Date(target).getTime();
    const tick = () => setLeft(end - Date.now());
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, [target]);

  if (left !== null && left <= 0) return null;

  const parts =
    left === null
      ? null
      : [
          { n: Math.floor(left / DAY), unit: "дн" },
          { n: Math.floor((left % DAY) / HOUR), unit: "год" },
          { n: Math.floor((left % HOUR) / MINUTE), unit: "хв" },
        ];

  return (
    <div className={styles.countdown} role="timer" aria-label={label}>
      <p className={styles.countdownLabel}>{label}</p>
      <div className={styles.countdownRow} aria-hidden={parts === null}>
        {(
          parts ?? [
            { n: 0, unit: "дн" },
            { n: 0, unit: "год" },
            { n: 0, unit: "хв" },
          ]
        ).map((p) => (
          <div
            key={p.unit}
            className={styles.countdownCell}
            style={parts ? undefined : { visibility: "hidden" }}
          >
            <span className={styles.countdownNum}>
              {String(p.n).padStart(2, "0")}
            </span>
            <span className={styles.countdownUnit}>{p.unit}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
