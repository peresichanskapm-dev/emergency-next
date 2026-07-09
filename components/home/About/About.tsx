import Image from "next/image";
import s from "./About.module.scss";

const FEATURES = [
  "Програма побудована навколо реальних клінічних випадків, досвіду практикуючих лікарів та доказових підходів до вирішення складних ситуацій.",
  "Разом зі спікерами ми розглянемо найпоширеніші та найнебезпечніші ускладнення після ін'єкційних та апаратних процедур, обговоримо роль УЗД-діагностики, алгоритми прийняття рішень та сучасні протоколи ведення пацієнтів.",
  "Від ускладнень до профілактики. Від реакції на проблему — до прогнозованого та безпечного результату. Саме такий підхід лежить в основі сучасної терапевтичної естетики.",
];

export default function About() {
  return (
    <section id="about" className={s.about}>
      {/* Torn white paper edge — seam from the white section above */}
      <Image
        src="/img/about/torn-edge.png"
        alt=""
        aria-hidden="true"
        width={1440}
        height={100}
        className={s.tornTop}
      />

      <div className={s.inner}>
        {/* Dossier — a manila folder built from two stacked white panels:
            a back panel (carries the tab, peeks above) + a front pocket that
            holds the content and peeks below. */}
        <div className={s.cardStack}>
          <div className={s.cardBack} aria-hidden="true" />

          {/* "COMING SOON" flyer — sandwiched BETWEEN the two panels: over the
              back panel, tucked behind the front pocket. Tilt is baked into
              the PNG, so no CSS rotation. */}
          <Image
            src="/img/about/photo-flyer.png"
            alt=""
            aria-hidden="true"
            width={424}
            height={498}
            className={`${s.photo} ${s.photoFlyer}`}
          />

          <span className={s.tab}>Про прекурс</span>

          <div className={s.card}>
            {/* Detective photo + binder clip — in front of the card (and flyer) */}
            <Image
              src="/img/about/photo-detective.png"
              alt=""
              aria-hidden="true"
              width={230}
              height={264}
              className={`${s.photo} ${s.photoDetective}`}
            />
            <Image
              src="/img/about/clip.png"
              alt=""
              aria-hidden="true"
              width={140}
              height={155}
              className={s.clip}
            />

            <p className={s.intro}>
            Ускладнення — це частина практики кожного лікаря. Але саме
            готовність їх вчасно розпізнати, правильно діагностувати та
            ефективно коригувати визначає рівень професіоналізму спеціаліста.
          </p>

          <h2 className={s.heading}>
            Emergency — це{" "}
            <span className={s.circled}>одноденний інтенсив,</span> присвячений
            ускладненням в естетичній медицині та сучасним підходам до їх
            діагностики, профілактики й корекції.
          </h2>

          <div className={s.features}>
            {FEATURES.map((text) => (
              <div key={text} className={s.feature}>
                <Image
                  src="/img/about/plus-red.png"
                  alt=""
                  aria-hidden="true"
                  width={13}
                  height={13}
                  className={s.plus}
                />
                <p className={s.featureText}>{text}</p>
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
