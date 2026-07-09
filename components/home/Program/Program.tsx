import s from "./Program.module.scss";

type Slot = {
  time: string;
  title: string;
  sub: string;
  speaker: string;
};

const SLOTS: Slot[] = [
  {
    time: "10:00—10:15",
    title: "Досьє на ускладнення:",
    sub: "Класифікатор і картотека доказів",
    speaker: "Волошина-Андрашко Інга",
  },
  {
    time: "10:15—11:00",
    title: "Головний інформатор:",
    sub: "УЗД-діагностика. Збір доказів та ексклюзивні знімки з місця подій",
    speaker: "Ірина Мота",
  },
  {
    time: "11:00—12:00",
    title: "Підозрюваний #1 — склад злочину:",
    sub: "На лаві підсудних колагеностимулятори",
    speaker: "Ярослав Лата",
  },
  {
    time: "12:00—12:30",
    title: "Сам собі сценарист — сам собі режисер:",
    sub: "Персональний досвід ускладнень лікаря і пацієнта",
    speaker: "Гавловська Женя",
  },
  {
    time: "12:30—13:00",
    title: "Періорбітальна ділянка:",
    sub: "Коли помилка коштує надто дорого",
    speaker: "Діогенова Марта",
  },
];

export default function Program() {
  return (
    <section id="program" className={s.program}>
      <div className={s.inner}>
        <h2 className={s.heading}>Програма</h2>

        <ul className={s.list}>
          {SLOTS.map((slot) => (
            <li key={slot.time} className={s.row}>
              <span className={s.time}>{slot.time}</span>
              <div className={s.body}>
                <h3 className={s.title}>{slot.title}</h3>
                <p className={s.sub}>{slot.sub}</p>
              </div>
              <span className={s.speaker}>{slot.speaker}</span>
            </li>
          ))}
        </ul>

        <div className={s.lunch}>Обід</div>

        <div className={s.actions}>
          <button type="button" className={s.moreBtn}>
            Дивитись всю програму
          </button>
        </div>
      </div>
    </section>
  );
}
