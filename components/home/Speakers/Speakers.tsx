"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import s from "./Speakers.module.scss";

type Speaker = {
  img: string;
  name: string;
  role: string;
};

/* Raw portrait photos (public/img/speakers/…) shown in a CSS "polaroid":
   white frame + caption footer. The photo is cropped to a uniform window via
   object-fit, so sources of any size/ratio share one card shape.
   Order + names (Прізвище Ім'я) + short roles from the program table. */
const SPEAKERS: Speaker[] = [
  {
    img: "/img/speakers/inga-voloshyna-andrashko.png",
    name: "Волошина-Андрашко Інга",
    role: "Лікар-дерматолог, спеціаліст естетичної медицини",
  },
  {
    img: "/img/speakers/iryna-mota.jpg",
    name: "Мота Ірина",
    role: "Лікар-радіолог, провідний спеціаліст з УЗД",
  },
  {
    img: "/img/speakers/yaroslav-lata.png",
    name: "Лата Ярослав",
    role: "Пластичний хірург, дерматокосметолог",
  },
  {
    img: "/img/speakers/yevheniia-havlovska.png",
    name: "Гавловська Євгенія",
    role: "Хірург-оториноларинголог, дерматокосметолог",
  },
  {
    img: "/img/speakers/marta-diogenova.png",
    name: "Діогенова Марта",
    role: "Пластичний хірург, офтальмолог",
  },
  {
    img: "/img/speakers/egor-kolodchenko.png",
    name: "Колодченко Єгор",
    role: "К.м.н., дерматолог вищої категорії",
  },
  {
    img: "/img/speakers/andrii-zimenkovskyi.png",
    name: "Зіменковський Андрій",
    role: "Лікар-дерматовенеролог, спеціаліст естетичної медицини",
  },
  {
    img: "/img/speakers/anna-funikova.png",
    name: "Фунікова Анна",
    role: "Лікар-дерматовенеролог, косметолог",
  },
  {
    img: "/img/speakers/khrystyna-yurevych.png",
    name: "Юревич Христина",
    role: "Лікар-косметолог, щелепно-лицевий хірург",
  },
  {
    img: "/img/speakers/viktoriia-radkevych.png",
    name: "Радкевич Вікторія",
    role: "Лікар-хірург, пластичний хірург, дерматовенеролог",
  },
  {
    img: "/img/speakers/kseniia-palamarenko.png",
    name: "Паламаренко Ксенія",
    role: "Лікар-дерматолог",
  },
];

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
          {SPEAKERS.map((sp) => (
            <li key={sp.img} className={s.card}>
              <div className={s.imgWrap}>
                <Image
                  src={sp.img}
                  alt={sp.name}
                  fill
                  sizes="(max-width: 768px) 80vw, (max-width: 992px) 45vw, 400px"
                  className={s.cardImg}
                />
              </div>
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
