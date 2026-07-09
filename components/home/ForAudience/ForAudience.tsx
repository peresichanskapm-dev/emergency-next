import { Fragment } from "react";
import Image from "next/image";
import s from "./ForAudience.module.scss";

const ITEMS = [
  "Дерматологи",
  "Лікарі естетичної медицини",
  "Пластичні хірурги",
  "Косметологи з медичною освітою",
  "Сертифікат учасника з балами БПР",
];

function MarqueeGroup({ hidden = false }: { hidden?: boolean }) {
  return (
    <div className={s.group} aria-hidden={hidden || undefined}>
      {ITEMS.map((item) => (
        <Fragment key={item}>
          <span className={s.sep} aria-hidden="true" />
          <span className={s.item}>{item}</span>
        </Fragment>
      ))}
    </div>
  );
}

export default function ForAudience() {
  return (
    <section id="for-audience" className={s.forAudience}>
      {/* Torn dark paper edge — seam tearing from the dark Program above */}
      <Image
        src="/img/common/torn-edge-dark.png"
        alt=""
        aria-hidden="true"
        width={1440}
        height={100}
        className={s.tornTop}
      />

      <div className={s.inner}>
        <h2 className={s.heading}>Для кого цей прекурс</h2>
      </div>

      {/* Running ticker of audience categories ("бігуча строка") */}
      <div className={s.marquee}>
        <div className={s.track}>
          <MarqueeGroup />
          <MarqueeGroup hidden />
        </div>
      </div>
    </section>
  );
}
