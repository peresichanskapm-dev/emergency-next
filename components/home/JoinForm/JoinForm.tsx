"use client";

import Image from "next/image";
import s from "./JoinForm.module.scss";

export default function JoinForm() {
    return (
        <section id="join" className={s.section}>
            <div className={s.inner}>

                {/* Ліва колонка із зображенням */}
                <div className={s.imageWrapper}>
                    <Image
                        src="/img/join/form-image.png"
                        alt="Emergency+ Протоколи ускладнень"
                        width={600}
                        height={700}
                        sizes="(max-width: 992px) 100vw, 50vw"
                        className={s.image}
                    />
                </div>

                {/* Права колонка з формою */}
                <div className={s.formWrapper}>
                    <h2 className={s.heading}>Готові долучитись до події?</h2>

                    <form className={s.form} onSubmit={(e) => e.preventDefault()}>
                        <input
                            type="text"
                            className={s.input}
                            placeholder="ІМ'Я ТА ПРІЗВИЩЕ*"
                            required
                        />

                        <input
                            type="email"
                            className={s.input}
                            placeholder="EMAIL*"
                            required
                        />

                        <input
                            type="tel"
                            className={s.input}
                            placeholder="+38 (0XX) XXX XX XX"
                            required
                        />

                        <button type="submit" className={s.submitBtn}>
                            Надіслати
                        </button>
                    </form>
                </div>

            </div>
        </section>
    );
}