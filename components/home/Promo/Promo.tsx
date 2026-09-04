import Countdown from "@/components/Countdown/Countdown";
import s from "./Promo.module.scss";

export default function Promo() {
  return (
    <section className={s.promo}>
      <div className={s.inner}>
        <p className={s.text}>
          Спеціальна знижка
          <br />
          до 06.09 - <span className={s.price}>9 999 грн</span>
        </p>

        <Countdown />
      </div>
    </section>
  );
}
