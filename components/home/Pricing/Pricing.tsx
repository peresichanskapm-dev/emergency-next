import Image from "next/image";
import s from "./Pricing.module.scss";

const PACKAGE = [
  "Участь у науковій програмі прекурсу",
  "Участь у панельні дискусії",
  "Панельна дискусія",
  "Coffee break",
  "Сертифікат учасника з балами БПР",
];

export default function Pricing() {
  return (
    <section id="pricing" className={s.pricing}>
      <div className={s.inner}>
        <h2 className={s.heading}>Вартість участі</h2>

        <div className={s.layout}>
          <div className={s.cards}>
            {/* Early Owl — red tier */}
            <article className={`${s.card} ${s.cardEarly}`}>
              <span className={s.tab}>01/07 — 27/08</span>
              <h3 className={s.cardTitle}>Early Owl</h3>
              <div className={s.cardAside}>
                <span className={s.price}>8 000 грн</span>
                <p className={s.cardNote}>
                  Спеціальна вартість для перших учасників
                </p>
              </div>
            </article>

            {/* Lazy Owl — standard tier */}
            <article className={`${s.card} ${s.cardLazy}`}>
              <span className={s.tab}>27/08 — 11/09</span>
              <h3 className={s.cardTitle}>Lazy Owl</h3>
              <div className={s.cardAside}>
                <span className={s.price}>10 000 грн</span>
              </div>
            </article>
          </div>

          <div className={s.package}>
            <h3 className={s.packageTitle}>У пакеті входить</h3>
            <ul className={s.packageList}>
              {PACKAGE.map((item) => (
                <li key={item} className={s.packageItem}>
                  <Image
                    src="/img/about/plus-red.png"
                    alt=""
                    aria-hidden="true"
                    width={13}
                    height={13}
                    className={s.plus}
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <button type="button" className={s.buyBtn}>
              Придбати
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
