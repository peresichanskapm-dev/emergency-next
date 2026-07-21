const NAME_PATTERN = /^[А-ЩЬЮЯЄІЇҐа-щьюяєіїґA-Za-z'’\- ]+$/;
const PHONE_PATTERN = /^(?:\+380|380|0)\d{9}$/;
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizePhone(value: string): string {
    return value.replace(/[^\d+]/g, "");
}

export function validateName(value: string): string | null {
    const trimmed = value.trim().replace(/\s+/g, " ");
    if (!trimmed) return "Вкажіть ім'я та прізвище";
    if (!NAME_PATTERN.test(trimmed)) return "Ім'я має містити лише літери";
    const words = trimmed.split(" ").filter((word) => word.length >= 2);
    if (words.length < 2) return "Вкажіть ім'я та прізвище повністю";
    return null;
}

export function validatePhone(value: string): string | null {
    const normalized = normalizePhone(value);
    if (!normalized) return "Вкажіть номер телефону";
    if (!PHONE_PATTERN.test(normalized)) return "Введіть коректний номер телефону";
    return null;
}

export function validateEmail(value: string): string | null {
    const trimmed = value.trim();
    if (!trimmed) return "Вкажіть email";
    if (!EMAIL_PATTERN.test(trimmed)) return "Введіть коректний email";
    return null;
}

export type LeadFieldErrors = {
    name?: string;
    phone?: string;
    email?: string;
};

export function validateLead(fields: { name: string; phone: string; email: string }): LeadFieldErrors {
    const errors: LeadFieldErrors = {};
    const nameError = validateName(fields.name);
    const phoneError = validatePhone(fields.phone);
    const emailError = validateEmail(fields.email);
    if (nameError) errors.name = nameError;
    if (phoneError) errors.phone = phoneError;
    if (emailError) errors.email = emailError;
    return errors;
}
