/**
 * Mock auth for the admin panel. Replace with real auth when wiring Cloud.
 */
const AUTH_KEY = "sos.admin.auth.v1";
const EMAIL_KEY = "sos.admin.email";

export const ADMIN_USERNAME = "SOS@admin";
export const ADMIN_PASSWORD = "SOS@admin123";

export function isAuthed(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(AUTH_KEY) === "1";
}

export function login(email: string, password: string): boolean {
  if (email.trim() === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
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
