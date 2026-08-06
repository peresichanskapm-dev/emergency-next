import Image from "next/image";
import s from "./Hero.module.scss";

export default function Hero() {
  return (
    <section id="hero" className={s.hero}>
      <div className={s.inner}>
        {/* Date / venue */}
        <div className={s.meta}>
          <span className={s.metaCell}>10 вересня 2026</span>
          <span className={s.metaCell}>Emily Resort</span>
        </div>

        {/* Hand print + newspaper texture — decorative */}
        <div className={s.visual}>
          <div className={s.visualInner}>
            <Image
              src="/img/hero/newspaper.png"
              alt=""
              aria-hidden="true"
              width={545}
              height={685}
              className={s.newspaper}
            />
            <Image
              src="/img/hero/hand.png"
              alt=""
              aria-hidden="true"
              width={551}
              height={738}
              priority
              className={s.hand}
            />

            {/* БПР badge — mobile placement */}
            <Image
              src="/img/hero/badge-mobile.svg"
              alt="15 балів БПР"
              width={155}
              height={80}
              className={s.badgeMobile}
            />
          </div>
        </div>

        {/* Title + copy + CTA */}
        <div className={s.body}>
          <h1 className={s.title}>
            Прекурс про ускладнення
            <br />в <span className={s.accent}>естетичній медицині</span>
          </h1>

          <p className={s.subtitle}>
            Реальні клінічні кейси. Практичні алгоритми дій.{" "}
            <br className={s.br} />
            Відверта професійна розмова про ситуації, які неможливо{" "}
            <br className={s.br} />
            передбачити, але до яких необхідно бути готовим.
          </p>

          <div className={s.actions}>
            <a
              href="https://secure.wayforpay.com/button/b80f677e3ef75"
              target="_blank"
              rel="noopener noreferrer"
              className={s.cta}
            >
              Зареєструватися
            </a>

            {/* БПР badge — desktop placement */}
            <Image
              src="/img/hero/badge-desktop.svg"
              alt="15 балів БПР"
              width={245}
              height={94}
              className={s.badgeDesktop}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
