import { Fragment } from "react";
import s from "./WhyAttend.module.scss";

/* Each item is two fixed lines (line breaks match the mockup) */
const ITEMS: [string, string][] = [
  ["Реальні клінічні", "кейси без прикрас"],
  ["Практичні алгоритми", "роботи з ускладненнями"],
  ["Розбір складних випадків", "від провідних експертів"],
  ["УЗД-діагностика в", "естетичній медицині"],
  ["Відповіді на питання, які не", "обговорюють на базових навчаннях"],
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={s.group} aria-hidden={hidden || undefined}>
      {ITEMS.map(([line1, line2]) => (
        <Fragment key={line1}>
          <span className={s.sep} aria-hidden="true" />
          <span className={s.item}>
            {line1}
            <br />
            {line2}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

export default function WhyAttend() {
  return (
    <section id="why" className={s.why}>
      <h2 className={s.heading}>Чому варто взяти участь</h2>

      {/* Running ticker — "бігуча строка" per the Figma annotation */}
      <div className={s.marquee}>
        <div className={s.track}>
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
