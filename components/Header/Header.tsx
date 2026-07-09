"use client";

import { useState } from "react";
import Image from "next/image";
import s from "./Header.module.scss";

const NAV_LINKS = [
  { label: "Квитки", href: "#tickets" },
  { label: "Програма", href: "#program" },
  { label: "Спікери", href: "#speakers" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <a
          href="#"
          className={s.logo}
          aria-label="emergency+ — протоколи терапії ускладнень"
        >
          <Image
            src="/img/header/logo.png"
            alt="emergency+"
            width={261}
            height={50}
            priority
            className={s.logoImg}
          />
        </a>

        <nav className={s.nav}>
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={s.navLink}>
              {link.label}
            </a>
          ))}
        </nav>

        <a href="#register" className={s.cta}>
          Зареєструватися
        </a>

        <button
          type="button"
          className={`${s.burger} ${open ? s.burgerOpen : ""}`}
          aria-label={open ? "Закрити меню" : "Відкрити меню"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {open && (
        <div className={s.mobileMenu}>
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={s.mobileLink}
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <a href="#register" className={s.mobileCta} onClick={close}>
            Зареєструватися
          </a>
        </div>
      )}
    </header>
  );
}
