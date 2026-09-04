"use client";

import { useEffect, useState } from "react";
import s from "./Promo.module.scss";

const DEADLINE = new Date(2026, 8, 6, 0, 0, 0);

type Remaining = { hours: number; minutes: number; seconds: number };

function getRemaining(): Remaining {
  const totalSeconds = Math.max(0, Math.floor((DEADLINE.getTime() - Date.now()) / 1000));
  return {
    hours: Math.floor(totalSeconds / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

// Standard 7-segment letters: a=top, b=top-right, c=bottom-right, d=bottom,
// e=bottom-left, f=top-left, g=middle.
const SEGMENTS = ["a", "b", "c", "d", "e", "f", "g"] as const;

const DIGIT_SEGMENTS: Record<number, string> = {
  0: "abcdef",
  1: "bc",
  2: "abged",
  3: "abgcd",
  4: "fgbc",
  5: "afgcd",
  6: "afgedc",
  7: "abc",
  8: "abcdefg",
  9: "abcdfg",
};

const SEGMENT_CLASS: Record<(typeof SEGMENTS)[number], string> = {
  a: "endTop",
  b: "sideRightTop",
  c: "sideRightBottom",
  d: "endBottom",
  e: "sideLeftBottom",
  f: "sideLeftTop",
  g: "middle",
};

function Digit({ value }: { value: number }) {
  const on = new Set((DIGIT_SEGMENTS[value] ?? "").split(""));
  return (
    <span className={s.digit}>
      {SEGMENTS.map((seg) => (
        <span
          key={seg}
          className={`${s.seg} ${s[SEGMENT_CLASS[seg]]} ${on.has(seg) ? s.on : ""}`}
        />
      ))}
    </span>
  );
}

function DigitPair({ value }: { value: number }) {
  const [tens, ones] = pad(value).split("").map(Number);
  return (
    <span className={s.pair}>
      <Digit value={tens} />
      <Digit value={ones} />
    </span>
  );
}

function Colon() {
  return (
    <span className={s.colon}>
      <span className={s.colonDot} />
      <span className={s.colonDot} />
    </span>
  );
}

export default function Promo() {
  const [time, setTime] = useState<Remaining>({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const id = setInterval(() => setTime(getRemaining()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={s.promo}>
      <div className={s.inner}>
        <p className={s.text}>
          Спеціальна знижка
          <br />
          до 06.09 - <span className={s.price}>9 999 грн</span>
        </p>

        <div className={s.countdown} role="timer" aria-label="Час до завершення знижки">
          <DigitPair value={time.hours} />
          <Colon />
          <DigitPair value={time.minutes} />
          <Colon />
          <DigitPair value={time.seconds} />
        </div>
      </div>
    </section>
  );
}
