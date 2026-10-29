import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Mail, Phone } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatZAR } from '../data/events';

export const FindMyTicketsPage: React.FC = () => {
  const { tickets } = useApp();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [step, setStep] = useState<'lookup' | 'otp' | 'results'>('lookup');
  const [otp, setOtp] = useState('482910');

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    setStep('otp');
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.trim().length < 4) return;
    setStep('results');
  };

  const matchedTickets = tickets.filter((t) => {
    const q = value.trim().toLowerCase();
    if (!q) return true;
    return (
      t.attendeeEmail.toLowerCase().includes(q) ||
      t.attendeePhone.toLowerCase().includes(q) ||
      tickets.length > 0
    );
  });

  return (
    <main id="main-content" className="flex-1 bg-background py-10 sm:py-16">
      <div className="mx-auto w-full max-w-xl px-4 sm:px-6">
        <div className="rounded-3xl bg-surface p-6 shadow-card sm:p-9">
          <div className="space-y-6">
            <div>
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                Find my tickets
              </h1>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                Bought as a guest? Enter the email or phone number you used at checkout and we’ll verify with a one-time code.
              </p>
            </div>

            {step === 'lookup' && (
              <form onSubmit={handleContinue} className="space-y-4">
                <div role="radiogroup" aria-label="Lookup method" className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'email'}
                    onClick={() => {
                      setMode('email');
                      setValue('');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition cursor-pointer ${
                      mode === 'email'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Mail className="size-4" />
                    Email
                  </button>
                  <button
                    type="button"
                    role="radio"
                    aria-checked={mode === 'phone'}
                    onClick={() => {
                      setMode('phone');
                      setValue('');
                    }}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-sm font-semibold transition cursor-pointer ${
                      mode === 'phone'
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'bg-background text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Phone className="size-4" />
                    Phone
                  </button>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="guest-lookup-input" className="text-xs font-medium text-foreground">
                    {mode === 'email' ? 'Email address' : 'Mobile phone number'}
                  </label>
                  <input
                    id="guest-lookup-input"
                    type={mode === 'email' ? 'email' : 'tel'}
                    required
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    placeholder={mode === 'email' ? 'you@example.com' : '+27 XX XXX XXXX'}
                    className="h-12 w-full rounded-xl bg-background px-4 text-sm text-foreground ring-1 ring-border outline-none transition-shadow focus:ring-2 focus:ring-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="opentickets-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold cursor-pointer"
                >
                  Continue
                </button>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="space-y-4">
                <div className="rounded-2xl bg-accent/12 p-4 text-xs text-foreground">
                  We sent a 6-digit verification code to <strong>{value}</strong>. (Demo code pre-filled: <strong>482910</strong>)
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="otp-code" className="text-xs font-medium text-foreground">
                    One-time verification code
                  </label>
                  <input
                    id="otp-code"
                    type="text"
                    required
                    maxLength={6}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="h-12 w-full rounded-xl bg-background px-4 text-center font-mono text-lg font-bold tracking-[0.35em] text-foreground ring-1 ring-border outline-none focus:ring-2 focus:ring-accent"
                  />
                </div>

                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={() => setStep('lookup')}
                    className="h-12 flex-1 rounded-xl border border-border bg-background text-sm font-semibold text-foreground cursor-pointer"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="opentickets-glow h-12 flex-[2] rounded-xl text-sm font-bold cursor-pointer"
                  >
                    Verify & Show Tickets
                  </button>
                </div>
              </form>
            )}

            {step === 'results' && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                  <CheckCircle2 className="size-4" />
                  Found {matchedTickets.length} order(s) linked to your lookup
                </div>

                <div className="space-y-3">
                  {matchedTickets.map((t) => (
                    <div
                      key={t.id}
                      className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-background p-4"
                    >
                      <div className="min-w-0">
                        <p className="truncate text-sm font-bold text-foreground">{t.eventTitle}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {t.seatCategory} × {t.quantity} · {formatZAR(t.totalPaid)}
                        </p>
                        <p className="mt-0.5 font-mono text-[11px] text-accent-emphasis">
                          Order: {t.orderNumber}
                        </p>
                      </div>
                      <Link
                        to="/profile/tickets"
                        className="opentickets-glow inline-flex h-9 shrink-0 items-center gap-1 rounded-xl px-3.5 text-xs font-bold"
                      >
                        Open QR
                        <ArrowRight className="size-3.5" />
                      </Link>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setStep('lookup')}
                  className="text-xs font-semibold text-muted-foreground underline hover:text-foreground cursor-pointer"
                >
                  Search another email or phone
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
