"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./Topics.module.scss";

type Topic = {
  num: string;
  title: string;
  desc: string;
  /* Just the file + its real pixel size (for a correct aspect ratio). All
     icons share one automatic style in .img — no per-card CSS needed, so
     adding a topic is just another entry here. */
  image?: { src: string; width: number; height: number };
};

const TOPICS: Topic[] = [
  {
    num: "01",
    title: "Досьє на ускладнення",
    desc: "Класифікатор і картотека доказів",
    image: { src: "/img/topics/clipboard.png", width: 374, height: 430 },
  },
  {
    num: "02",
    title: "Головний інформатор",
    desc: "УЗД-діагностика. Збір доказів та ексклюзивні знімки з місця подій",
    image: { src: "/img/topics/ultrasound.png", width: 591, height: 551 },
  },
  {
    num: "03",
    title: "Слідами філерів",
    desc: "Детективні хроніки ін'єкційних ускладнень",
    image: { src: "/img/topics/syringe.png", width: 235, height: 235 },
  },
  {
    num: "04",
    title: "Підозрюваний №1",
    desc: "Колагеностимулятори",
    image: { src: "/img/topics/molecule.png", width: 280, height: 280 },
  },
  {
    num: "05",
    title: "Сам собі сценарист",
    desc: "Сам собі режисер",
    image: { src: "/img/topics/clapperboard.png", width: 235, height: 235 },
  },
  {
    num: "06",
    title: "Періорбітальна ділянка",
    desc: "Коли помилка коштує надто дорого",
    image: { src: "/img/topics/eye.png", width: 211, height: 211 },
  },
  {
    num: "07",
    title: "Підозрюваний №2",
    desc: "Апаратні ускладнення",
    image: { src: "/img/topics/device.png", width: 209, height: 192 },
  },
  {
    num: "08",
    title: "Підозрюваний №3",
    desc: "Гіалуронова кислота. Протокол знешкодження",
    image: { src: "/img/topics/hyaluronic-acid.png", width: 217, height: 199 },
  },
  {
    num: "09",
    title: "Філер у губах",
    desc: "Ліквідувати чи помилувати?",
    image: { src: "/img/topics/lips.png", width: 257, height: 257 },
  },
  {
    num: "10",
    title: "Досвідчений детектив у розплутуванні особливо тяжких злочинів",
    desc: "Досвід хірурга",
    image: { src: "/img/topics/surgical-tools.png", width: 224, height: 242 },
  },
  {
    num: "11",
    title: "Особливо небезпечні",
    desc: "Пошук прихованих доказів рідкісних ускладнень",
    image: { src: "/img/topics/fingerprint.png", width: 175, height: 192 },
  },
];

export default function Topics() {
  const viewportRef = useRef<HTMLDivElement>(null);
  /* Progress-bar fill = (visible + scrolled) / total, so it starts partly
     filled (like the mockup) and reaches 100% at the end of the row */
  const [fill, setFill] = useState(1 / TOPICS.length);

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

  /* Mouse drag-to-scroll (touch scrolls natively) */
  const drag = useRef({ startX: 0, startLeft: 0, active: false });

  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = viewportRef.current;
    if (!el) return;
    drag.current = { startX: e.clientX, startLeft: el.scrollLeft, active: true };
    el.setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    const el = viewportRef.current;
    if (!el || !drag.current.active) return;
    el.scrollLeft = drag.current.startLeft - (e.clientX - drag.current.startX);
  };

  const endDrag = (e: React.PointerEvent) => {
    const el = viewportRef.current;
    if (!el || !drag.current.active) return;
    drag.current.active = false;
    el.releasePointerCapture(e.pointerId);
  };

  return (
    <section id="topics" className={s.topics}>
      <h2 className={s.heading}>Ключові теми прекурсу</h2>

      <div
        ref={viewportRef}
        className={s.viewport}
        onScroll={update}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
      >
        <div className={s.track}>
          {TOPICS.map((topic) => (
            <article key={topic.num} className={s.card}>
              {topic.image && (
                <Image
                  src={topic.image.src}
                  alt=""
                  aria-hidden="true"
                  width={topic.image.width}
                  height={topic.image.height}
                  className={s.img}
                />
              )}
              <span className={s.num}>{topic.num}</span>
              <h3 className={s.title}>{topic.title}</h3>
              <p className={s.desc}>{topic.desc}</p>
            </article>
          ))}
        </div>
      </div>

      <div className={s.container}>
        <div className={s.progress}>
          <div className={s.progressFill} style={{ width: `${fill * 100}%` }} />
        </div>
      </div>
    </section>
  );
}
