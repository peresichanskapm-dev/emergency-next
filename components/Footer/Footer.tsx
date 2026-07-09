import Image from "next/image";
import Link from "next/link";
import s from "./Footer.module.scss";

export default function Footer() {
    return (
        <footer className={s.footer}>
            <div className={s.inner}>

                {/* ВЕРХНЯ ЧАСТИНА: Контакти */}
                <div className={s.top}>
                    <div className={s.contactsLeft}>
                        <h3 className={s.heading}>Залишились питання?</h3>
                        <p className={s.text}>Зв'яжіть з нами за телефоном:</p>
                        <div className={s.person}>
                            <a href="tel:+380997039656" className={s.link}>+380 99 703 96 56</a>
                            <span className={s.name}>Рената</span>
                        </div>

                        <p className={s.text}>Або напишіть нам у соцмережах:</p>
                        <div className={s.socials}>
                            <a href="#" target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
                                <Image
                                    src="/img/instagram.svg"
                                    alt="Instagram"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
                                <Image
                                    src="/img/facebook.svg"
                                    alt="Facebook"
                                    width={20}
                                    height={20}
                                />
                            </a>
                            <a href="#" target="_blank" rel="noopener noreferrer" className={s.socialIcon}>
                                <Image
                                    src="/img/telegram.svg"
                                    alt="Telegram"
                                    width={20}
                                    height={20}
                                />
                            </a>
                        </div>
                    </div>

                    <div className={s.contactsRight}>
                        <h3 className={s.heading}>Бажаєте стати партнером заходу?</h3>
                        <p className={s.text}>
                            Звертайтеся за телефоном <a href="tel:+380951584830" className={s.link}>+380 95 158 48 30</a>
                        </p>
                        <span className={s.name}>Вікторія</span>
                    </div>
                </div>

                {/* СЕРЕДНЯ ЧАСТИНА: Логотип і Навігація */}
                <div className={s.middle}>
                    <div className={s.logoWrapper}>
                        <Image
                            src="/img/logo.svg"
                            alt="Emergency+ Протоколи терапії ускладнень"
                            width={200}
                            height={40}
                            className={s.logo}
                        />
                    </div>

                    <nav className={s.nav}>
                        <Link href="#about" className={s.navLink}>Про конгрес</Link>
                        <Link href="#program" className={s.navLink}>Програма</Link>
                        <Link href="#pricing" className={s.navLink}>Ціни</Link>
                        <Link href="#partners" className={s.navLink}>Партнери</Link>
                    </nav>
                </div>

                {/* НИЖНЯ ЧАСТИНА: Копірайт */}
                <div className={s.bottom}>
                    <div className={s.copyright}>
                        <p>Emergency 2026. All rights reserved.</p>
                        <p>Made & Developed by Vau.agency.</p>
                    </div>

                    <div className={s.placeholders}>
                        <div className={s.placeholderItem}>
                            <span className={s.placeholderPhone}>38 (068) 000 00 00</span>
                            <span className={s.placeholderName}>Ім'я та прізвище</span>
                        </div>
                        <div className={s.placeholderItem}>
                            <span className={s.placeholderPhone}>38 (068) 000 00 00</span>
                            <span className={s.placeholderName}>Ім'я та прізвище</span>
                        </div>
                    </div>
                </div>

            </div>
        </footer>
    );
}