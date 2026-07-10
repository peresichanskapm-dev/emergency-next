"use client";

import { useState } from "react";
import s from "./Program.module.scss";

type Slot = {
  time: string;
  title: string;
  sub?: string;
  speaker?: string;
};

/* Ранкова частина — прев'ю, завжди видиме (до обіду) */
const MORNING: Slot[] = [
  {
    time: "10:00—10:15",
    title: "Досьє на ускладнення:",
    sub: "Класифікатор і картотека доказів. Зміни ринку, класифікація та частота ускладнень.",
    speaker: "Волошина-Андрашко Інга",
  },
  {
    time: "10:15—11:00",
    title: "Головний інформатор:",
    sub: "УЗД-діагностика. Збір доказів та ексклюзивні знімки з місця подій.",
    speaker: "Мота Ірина",
  },
  {
    time: "11:00—12:00",
    title: "Підозрюваний #1 — склад злочину:",
    sub: "На лаві підсудних колагеностимулятори.",
    speaker: "Лата Ярослав",
  },
  {
    time: "12:00—12:30",
    title: "Сам собі сценарист — сам собі режисер:",
    sub: "Мій персональний досвід ускладнень як лікаря, так і пацієнта.",
    speaker: "Гавловська Євгенія",
  },
  {
    time: "12:30—13:00",
    title: "Періорбітальна ділянка:",
    sub: "Коли помилка коштує надто дорого.",
    speaker: "Діогенова Марта",
  },
];

/* Денна частина — розгортається кнопкою «Дивитись всю програму» */
const AFTERNOON: Slot[] = [
  {
    time: "14:00—14:40",
    title: "Підозрюваний № 2 — апаратні ускладнення:",
    sub: "Сліди «гарячих розбірок», або Куди зник об'єм?",
    speaker: "Колодченко Єгор",
  },
  {
    time: "14:40—15:00",
    title: "Ряд клінічних випадків ускладнень після апаратних процедур.",
    speaker: "Зіменковський Андрій",
  },
  {
    time: "15:00—15:40",
    title: "Підозрюваний № 3:",
    sub: "Чи такий безпечний агент — гіалуронова кислота? Протокол знешкодження.",
    speaker: "Фунікова Анна",
  },
  {
    time: "15:40—16:00",
    title: "Філер у губах:",
    sub: "Ліквідувати чи помилувати?",
    speaker: "Юревич Христина",
  },
  {
    time: "16:00—16:40",
    title: "Досвідчений детектив у розплутуванні особливо тяжких злочинів.",
    speaker: "Радкевич Вікторія",
  },
  {
    time: "16:40—17:20",
    title: "Особливо небезпечні:",
    sub: "Пошук прихованих доказів рідкісних ускладнень.",
    speaker: "Волошина-Андрашко Інга",
  },
  {
    time: "17:20—17:50",
    title: "Слідами філерів:",
    sub: "Детективні хроніки ін'єкційних ускладнень. Анатомічний kahoot.",
    speaker: "Паламаренко Ксенія",
  },
  {
    time: "17:50",
    title: "Клуб детективів:",
    sub: "Розбір клінічних доказів та алібі препаратів.",
  },
];

function Row({ slot }: { slot: Slot }) {
  return (
    <li className={s.row}>
      <span className={s.time}>{slot.time}</span>
      <div className={s.body}>
        <h3 className={s.title}>{slot.title}</h3>
        {slot.sub && <p className={s.sub}>{slot.sub}</p>}
      </div>
      {slot.speaker && <span className={s.speaker}>{slot.speaker}</span>}
    </li>
  );
}

export default function Program() {
  const [expanded, setExpanded] = useState(false);

  return (
    <section id="program" className={s.program}>
      <div className={s.inner}>
        <h2 className={s.heading}>Програма</h2>

        <ul className={s.list}>
          {MORNING.map((slot) => (
            <Row key={slot.time} slot={slot} />
          ))}
        </ul>

        <div className={s.lunch}>
          Обід
          <span className={s.lunchNote}>Діагностика УЗ в режимі живого часу</span>
        </div>

        {expanded && (
          <ul className={`${s.list} ${s.listMore}`}>
            {AFTERNOON.map((slot) => (
              <Row key={slot.time} slot={slot} />
            ))}
          </ul>
        )}

        <div className={s.actions}>
          <button
            type="button"
            className={s.moreBtn}
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
          >
            {expanded ? "Згорнути" : "Дивитись всю програму"}
          </button>
        </div>
      </div>
    </section>
  );
}
