import { NextResponse } from "next/server";
import { validateLead } from "@/lib/leadValidation";

type LeadPayload = {
    name?: string;
    phone?: string;
    email?: string;
    formName?: string;
    utm_source?: string;
    utm_medium?: string;
    utm_campaign?: string;
    utm_term?: string;
    utm_content?: string;
};

const UTM_FIELDS = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
] as const;

function escapeHtml(value: string) {
    return value
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
    const token = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!token || !chatId) {
        console.error("TELEGRAM_BOT_TOKEN or TELEGRAM_CHAT_ID is not set");
        return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    let payload: LeadPayload;
    try {
        payload = await request.json();
    } catch {
        return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    const name = payload.name?.trim() ?? "";
    const phone = payload.phone?.trim() ?? "";
    const email = payload.email?.trim() ?? "";

    const fieldErrors = validateLead({ name, phone, email });
    if (Object.keys(fieldErrors).length > 0) {
        return NextResponse.json({ error: "Invalid fields", fieldErrors }, { status: 400 });
    }

    const lines = [
        "🔔 Нова заявка з сайту:",
        `Форма: ${escapeHtml(payload.formName?.trim() || "Форма на основному сайті")}`,
        `Ім'я: ${escapeHtml(name)}`,
        `Телефон: ${escapeHtml(phone)}`,
    ];

    lines.push(`Email: ${escapeHtml(email)}`);

    for (const key of UTM_FIELDS) {
        const value = payload[key]?.trim();
        if (value) {
            lines.push(`${key}: ${escapeHtml(value)}`);
        }
    }

    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            chat_id: chatId,
            text: lines.join("\n"),
            parse_mode: "HTML",
        }),
    });

    if (!telegramRes.ok) {
        const errorBody = await telegramRes.text();
        console.error("Telegram API error:", errorBody);
        return NextResponse.json({ error: "Failed to send message" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
}
