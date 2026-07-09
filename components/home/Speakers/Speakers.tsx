"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./Speakers.module.scss";

type Speaker = {
  slug: string;
  name: string;
  role: string;
};

/* The polaroid frame (white border, rounded corners, empty caption area) is
   baked into each export. We only overlay the name + role onto that footer.
   Photos go in public/img/speakers/<slug>.png (see the note in chat). */
const SPEAKERS: Speaker[] = [
  {
    slug: "egor-kolodchenko",
    name: "Єгор Колодченко",
    role: "Дерматолог вищої категорії",
  },
  {
    slug: "inga-voloshyna-andrashko",
    name: "Інга Волошина-Андрашко",
    role: "Лікар-дерматолог, спеціаліст естетичної медицини",
  },
  {
    slug: "iryna-mota",
    name: "Ірина Мота",
    role: "Лікар-радіолог, провідний спеціаліст з УЗД",
  },
  {
    slug: "egor-kolodchenko",
    name: "Єгор Колодченко",
    role: "Дерматолог вищої категорії",
  },
  {
    slug: "inga-voloshyna-andrashko",
    name: "Інга Волошина-Андрашко",
    role: "Лікар-дерматолог, спеціаліст естетичної медицини",
  },
  {
    slug: "iryna-mota",
    name: "Ірина Мота",
    role: "Лікар-радіолог, провідний спеціаліст з УЗД",
  },
];

/* Natural export size (measured — all 3 share the same template) */
const IMG_W = 397;
const IMG_H = 492;

export default function Speakers() {
  /* Mobile is a swipeable row (per the mockup) with a progress line — same
     pattern as Topics. On ≥768px the row becomes a static grid and the
     progress bar is hidden, so the scroll math simply never shows. */
  const viewportRef = useRef<HTMLDivElement>(null);
  const [fill, setFill] = useState(1 / SPEAKERS.length);

  const update = useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;
    setFill(el.scrollWidth > 0 ? (el.clientWidth + el.scrollLeft) / el.scrollWidth : 1);
  }, []);

  useEffect(() => {
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [update]);

  return (
    <section id="speakers" className={s.speakers}>
      <div className={s.inner}>
        <h2 className={s.heading}>Спікери</h2>
      </div>

      <div ref={viewportRef} className={s.viewport} onScroll={update}>
        <ul className={s.grid}>
          {SPEAKERS.map((sp, i) => (
            <li key={`${sp.slug}-${i}`} className={s.card}>
              <Image
                src={`/img/speakers/${sp.slug}.png`}
                alt={sp.name}
                width={IMG_W}
                height={IMG_H}
                sizes="(max-width: 768px) 100vw, (max-width: 992px) 50vw, 400px"
                className={s.cardImg}
              />
              <div className={s.caption}>
                <h3 className={s.name}>{sp.name}</h3>
                <p className={s.role}>{sp.role}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className={s.container}>
        <div className={s.progress}>
          <div className={s.progressFill} style={{ width: `${fill * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
