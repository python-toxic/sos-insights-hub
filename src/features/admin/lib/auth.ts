/**
 * Mock auth for the admin panel. Replace with real auth when wiring Cloud.
 *
 * Password reset flow (client-only):
 *  1. User submits the admin recovery email.
 *  2. If it matches RECOVERY_ADMIN_EMAIL, an OTP is generated and "sent"
 *     to OTP_DELIVERY_EMAIL. With no backend wired, the OTP is surfaced
 *     in the UI via requestPasswordResetOtp's return value (so the
 *     admin can copy it). When an email transport is added later, wire
 *     it inside sendOtpEmail() — the rest of the flow stays the same.
 */
const AUTH_KEY = "sos.admin.auth.v1";
const EMAIL_KEY = "sos.admin.email";
const PASSWORD_KEY = "sos.admin.password.v1";
const OTP_KEY = "sos.admin.otp.v1";

export const ADMIN_USERNAME = "SOS@admin";
export const ADMIN_DEFAULT_PASSWORD = "SOS@admin123";

// Email allowed to initiate a password reset.
export const RECOVERY_ADMIN_EMAIL = "rsmarineacademy@gmail.com";
// Inbox that receives the OTP.
export const OTP_DELIVERY_EMAIL = "toxicpython4748@gmail.com";

const OTP_TTL_MS = 10 * 60 * 1000; // 10 minutes

function currentPassword(): string {
  if (typeof window === "undefined") return ADMIN_DEFAULT_PASSWORD;
  return localStorage.getItem(PASSWORD_KEY) ?? ADMIN_DEFAULT_PASSWORD;
}

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function login(email: string, password: string): boolean {
  if (email.trim() === ADMIN_USERNAME && password === currentPassword()) {
    localStorage.setItem(AUTH_KEY, "1");
    localStorage.setItem(EMAIL_KEY, email);
    return true;
  }
  return false;
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function currentEmail(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(EMAIL_KEY) ?? "";
}

/* -------------------- Password reset (OTP) -------------------- */

type OtpRecord = { code: string; expiresAt: number };

function generateOtp(): string {
  return String(Math.floor(100000 + Math.random() * 900000));
}

/**
 * Placeholder email sender. Replace the body when an email transport
 * (EmailJS, Resend, Lovable Cloud Emails, etc.) is configured.
 */
async function sendOtpEmail(_otp: string): Promise<boolean> {
  // No-op until an email transport is wired. Returning false signals
  // the UI to show the OTP on screen so the admin can still recover.
  return false;
}

export type OtpRequestResult = {
  ok: boolean;
  delivered: boolean; // true if email transport succeeded
  otp?: string;       // returned only when delivered === false (fallback)
  error?: string;
};

export async function requestPasswordResetOtp(
  email: string,
): Promise<OtpRequestResult> {
  if (email.trim().toLowerCase() !== RECOVERY_ADMIN_EMAIL.toLowerCase()) {
    return { ok: false, delivered: false, error: "Email not recognised." };
  }
  const code = generateOtp();
  const record: OtpRecord = { code, expiresAt: Date.now() + OTP_TTL_MS };
  localStorage.setItem(OTP_KEY, JSON.stringify(record));

  const delivered = await sendOtpEmail(code);
  return delivered
    ? { ok: true, delivered: true }
    : { ok: true, delivered: false, otp: code };
}

export function verifyOtp(code: string): boolean {
  const raw = localStorage.getItem(OTP_KEY);
  if (!raw) return false;
  try {
    const record = JSON.parse(raw) as OtpRecord;
    if (Date.now() > record.expiresAt) return false;
    return record.code === code.trim();
  } catch {
    return false;
  }
}

export function resetPassword(code: string, newPassword: string): boolean {
  if (!verifyOtp(code)) return false;
  if (newPassword.length < 6) return false;
  localStorage.setItem(PASSWORD_KEY, newPassword);
  localStorage.removeItem(OTP_KEY);
  return true;
}
