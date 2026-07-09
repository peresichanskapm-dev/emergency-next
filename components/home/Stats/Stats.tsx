import { Fragment } from "react";
import s from "./Stats.module.scss";

const ITEMS = [
  "11 спікерів",
  "7+ годин клінічних розборів",
  "Панельна дискусія",
  "Реальні кейси",
  "Сертифікат учасника з балами БПР",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={s.group} aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span className={s.item}>{item}</span>
          <span className={s.sep} aria-hidden="true" />
        </Fragment>
      ))}
    </div>
  );
}

export default function Stats() {
  return (
    <section className={s.stats}>
      <div className={s.inner}>
        <h2 className={s.heading}>
          Кожне ускладнення залишає сліди,
          <br />
          готові піти по них разом?
        </h2>
      </div>

      <div className={s.marquee}>
        <div className={s.track}>
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
