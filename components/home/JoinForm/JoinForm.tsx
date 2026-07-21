"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { validateLead, type LeadFieldErrors } from "@/lib/leadValidation";
import s from "./JoinForm.module.scss";

type Status = "idle" | "submitting" | "success" | "error";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"] as const;
type UtmKey = (typeof UTM_KEYS)[number];

export default function JoinForm() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState<Status>("idle");
    const [fieldErrors, setFieldErrors] = useState<LeadFieldErrors>({});
    const utmRef = useRef<Partial<Record<UtmKey, string>>>({});

    function clearFieldError(key: keyof LeadFieldErrors) {
        setFieldErrors((prev) => {
            if (!(key in prev)) return prev;
            const next = { ...prev };
            delete next[key];
            return next;
        });
    }

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const collected: Partial<Record<UtmKey, string>> = {};
        for (const key of UTM_KEYS) {
            const value = params.get(key);
            if (value) collected[key] = value;
        }
        utmRef.current = collected;
    }, []);

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const errors = validateLead({ name, phone, email });
        setFieldErrors(errors);
        if (Object.keys(errors).length > 0) {
            return;
        }

        setStatus("submitting");

        try {
            const res = await fetch("/api/lead", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name,
                    email,
                    phone,
                    formName: "Форма на основному сайті",
                    ...utmRef.current,
                }),
            });

            if (!res.ok) {
                const body = await res.json().catch(() => null);
                if (body?.fieldErrors) {
                    setFieldErrors(body.fieldErrors);
                    setStatus("idle");
                    return;
                }
                throw new Error("Request failed");
            }

            setStatus("success");
            setName("");
            setEmail("");
            setPhone("");
            setFieldErrors({});
        } catch {
            setStatus("error");
        }
    }

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

                    {status === "success" ? (
                        <p className={s.statusMessage}>
                            Дякуємо! Заявку надіслано, ми зв&apos;яжемось з вами найближчим часом.
                        </p>
                    ) : (
                        <form className={s.form} onSubmit={handleSubmit} noValidate>
                            <div className={s.field}>
                                <input
                                    type="text"
                                    className={s.input}
                                    placeholder="ІМ'Я ТА ПРІЗВИЩЕ*"
                                    value={name}
                                    onChange={(e) => {
                                        setName(e.target.value);
                                        clearFieldError("name");
                                    }}
                                    required
                                />
                                {fieldErrors.name && (
                                    <p className={s.fieldError}>{fieldErrors.name}</p>
                                )}
                            </div>

                            <div className={s.field}>
                                <input
                                    type="email"
                                    className={s.input}
                                    placeholder="EMAIL*"
                                    value={email}
                                    onChange={(e) => {
                                        setEmail(e.target.value);
                                        clearFieldError("email");
                                    }}
                                    required
                                />
                                {fieldErrors.email && (
                                    <p className={s.fieldError}>{fieldErrors.email}</p>
                                )}
                            </div>

                            <div className={s.field}>
                                <input
                                    type="tel"
                                    className={s.input}
                                    placeholder="+38 (0XX) XXX XX XX"
                                    value={phone}
                                    onChange={(e) => {
                                        setPhone(e.target.value);
                                        clearFieldError("phone");
                                    }}
                                    required
                                />
                                {fieldErrors.phone && (
                                    <p className={s.fieldError}>{fieldErrors.phone}</p>
                                )}
                            </div>

                            <button type="submit" className={s.submitBtn} disabled={status === "submitting"}>
                                {status === "submitting" ? "Надсилаємо..." : "Надіслати"}
                            </button>

                            {status === "error" && (
                                <p className={s.errorMessage}>
                                    Щось пішло не так. Спробуйте ще раз або зателефонуйте нам напряму.
                                </p>
                            )}
                        </form>
                    )}
                </div>

            </div>
        </section>
    );
}