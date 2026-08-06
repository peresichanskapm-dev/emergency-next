import Image from "next/image";
import s from "./Bpr.module.scss";

export default function Bpr() {
    return (
        <section id="bpr" className={s.bpr}>
            <div className={s.inner}>

                {/* Ліва колонка з сертифікатом */}
                <div className={s.imageWrapper}>
                    <Image
                        src="/img/bpr/certificate.png"
                        alt="Сертифікат БПР"
                        width={756}
                        height={942}
                        sizes="(max-width: 992px) 100vw, 50vw"
                        className={s.certificateImg}
                    />
                </div>

                {/* Права колонка з текстом */}
                <div className={s.content}>
                    <h2 className={s.heading}>Бали БПР</h2>

                    <p className={s.highlight}>
                        <span className={s.redText}>Участь у конгресі Emergency+</span> — це не лише нові знання
                        та практичний досвід, а й можливість отримати 15 балів
                        БПР для свого професійного розвитку.
                    </p>

                    <p className={s.desc}>
                        Участь у конгресі Emergency+ передбачає нарахування
                        балів безперервного професійного розвитку (БПР),
                        відповідно до чинних вимог професійного навчання
                        медичних працівників.
                    </p>
                </div>

            </div>
        </section>
    );
}