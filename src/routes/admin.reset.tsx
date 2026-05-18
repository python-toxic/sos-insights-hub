import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import {
  OTP_DELIVERY_EMAIL,
  requestPasswordResetOtp,
  resetPassword,
  verifyOtp,
} from "@/features/admin/lib/auth";

export const Route = createFileRoute("/admin/reset")({
  head: () => ({ meta: [{ title: "Reset Password — SOS India Admin" }] }),
  component: AdminReset,
});

type Step = "email" | "otp" | "password" | "done";

function maskEmail(e: string) {
  const [u, d] = e.split("@");
  if (!u || !d) return e;
  return u.slice(0, 2) + "•••@" + d;
}

function AdminReset() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [pwd, setPwd] = useState("");
  const [pwd2, setPwd2] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [shownOtp, setShownOtp] = useState<string | null>(null);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setInfo("");
    setBusy(true);
    const res = await requestPasswordResetOtp(email);
    setBusy(false);
    if (!res.ok) {
      setError(res.error ?? "Unable to send code.");
      return;
    }
    if (res.delivered) {
      setInfo(`A 6-digit code was sent to ${maskEmail(OTP_DELIVERY_EMAIL)}.`);
    } else if (res.otp) {
      setShownOtp(res.otp);
      setInfo(
        "Email delivery isn't configured yet. Use the code shown below to continue.",
      );
    }
    setStep("otp");
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!verifyOtp(otp)) {
      setError("Invalid or expired code.");
      return;
    }
    setStep("password");
  };

  const handleResetPwd = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (pwd.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (pwd !== pwd2) {
      setError("Passwords do not match.");
      return;
    }
    if (!resetPassword(otp, pwd)) {
      setError("Could not reset password. Please restart the flow.");
      return;
    }
    setStep("done");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <div className="w-full max-w-sm rounded-lg border border-border bg-background p-8 shadow-sm">
        <div className="text-center">
          <div className="text-base font-semibold text-foreground">
            SOS India
          </div>
          <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">
            Reset Admin Password
          </div>
        </div>

        {step === "email" && (
          <form onSubmit={handleSendOtp} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Enter admin email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@example.com"
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={busy}
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-60"
            >
              {busy ? "Sending..." : "Send OTP"}
            </button>
            <Link
              to="/admin"
              className="block text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Back to sign in
            </Link>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleVerifyOtp} className="mt-8 space-y-4">
            {info && (
              <p className="rounded-md bg-muted px-3 py-2 text-xs text-muted-foreground">
                {info}
              </p>
            )}
            {shownOtp && (
              <div className="rounded-md border border-dashed border-border bg-muted/40 px-3 py-2 text-center">
                <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                  Your code
                </div>
                <div className="mt-1 font-mono text-lg tracking-[0.4em] text-foreground">
                  {shownOtp}
                </div>
              </div>
            )}
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Enter 6-digit OTP
              </label>
              <input
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-center font-mono text-base tracking-[0.4em] outline-none focus:border-primary"
                required
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Verify code
            </button>
            <button
              type="button"
              onClick={() => {
                setStep("email");
                setOtp("");
                setShownOtp(null);
                setInfo("");
                setError("");
              }}
              className="block w-full text-center text-xs text-muted-foreground hover:text-foreground"
            >
              Use a different email
            </button>
          </form>
        )}

        {step === "password" && (
          <form onSubmit={handleResetPwd} className="mt-8 space-y-4">
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                New password
              </label>
              <input
                type="password"
                value={pwd}
                onChange={(e) => setPwd(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            <div>
              <label className="mb-1.5 block text-xs font-medium text-foreground">
                Confirm new password
              </label>
              <input
                type="password"
                value={pwd2}
                onChange={(e) => setPwd2(e.target.value)}
                className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus:border-primary"
                required
              />
            </div>
            {error && <p className="text-xs text-destructive">{error}</p>}
            <button
              type="submit"
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Update password
            </button>
          </form>
        )}

        {step === "done" && (
          <div className="mt-8 space-y-4 text-center">
            <p className="text-sm text-foreground">
              Password updated successfully.
            </p>
            <button
              onClick={() => navigate({ to: "/admin" })}
              className="h-10 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Go to sign in
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
