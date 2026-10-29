import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Calendar,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Phone,
  ShieldCheck,
  Sparkles,
  Ticket,
  User,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthPage: React.FC<{ mode: 'login' | 'register' }> = ({ mode }) => {
  const { signIn } = useApp();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [identifier, setIdentifier] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPw, setConfirmPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const isLogin = mode === 'login';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!isLogin && password !== confirmPw) {
      setError('Passwords do not match.');
      return;
    }
    const email = identifier.includes('@')
      ? identifier.trim()
      : `${identifier.trim().replace(/\s+/g, '')}@opentickets.co.za`;
    const rawName = isLogin
      ? identifier.split('@')[0] || 'Open Tickets Member'
      : name.trim() || 'Open Tickets Member';
    const parts = rawName.split(' ');
    const firstName = parts[0] || 'Open Tickets';
    const lastName = parts.slice(1).join(' ') || 'Member';

    signIn({
      firstName,
      lastName,
      email,
      phone: phone.trim() || '',
      username: firstName.toLowerCase(),
    });
    navigate('/profile/tickets');
  };

  return (
    <main id="main-content" className="min-h-dvh bg-background text-foreground">
      <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
        {/* Left Media Scrim Panel (100% Open Tickets /login & /register design) */}
        <aside className="relative hidden overflow-hidden bg-pine text-paper lg:flex lg:flex-col lg:justify-between lg:p-12">
          <img
            src={
              isLogin
                ? 'media/auth/featured-events-banner.png'
                : 'media/auth/theatre-comedy-banner.png'
            }
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-55"
          />
          <div aria-hidden="true" className="bg-auth-media-scrim pointer-events-none absolute inset-0" />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-32 -left-24 size-96 rounded-full bg-volt/20 blur-3xl"
          />

          <div className="relative flex items-center justify-between">
            <Link to="/" aria-label="Open Tickets home" className="inline-flex items-center">
              <img src="assets/logo/opentickets-logo-for-dark.svg" alt="Open Tickets" className="h-7 w-auto" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-paper/10 px-3.5 py-1.5 text-xs font-medium text-paper backdrop-blur-md transition hover:bg-paper/20"
            >
              <ArrowLeft className="size-3.5" />
              Back to site
            </Link>
          </div>

          <div className="relative max-w-md space-y-6">
            <p className="inline-flex items-center gap-2 rounded-full bg-volt/15 px-3 py-1 text-xs font-semibold tracking-wider text-volt uppercase ring-1 ring-volt/30">
              {isLogin ? 'Live across South Africa' : 'Join Open Tickets'}
            </p>
            <h2 className="font-heading text-3xl leading-tight font-extrabold tracking-tight text-paper xl:text-4xl">
              {isLogin
                ? 'Every concert, comedy night, and match, one tap away.'
                : 'Your front-row pass to everything live.'}
            </h2>
            <p className="text-sm leading-relaxed text-paper/75">
              {isLogin
                ? 'Keep your QR tickets, transfers, and event reminders synced across every device.'
                : 'Create a free account to book faster, hold seats, and get early-bird drops before they sell out.'}
            </p>

            <ul className="space-y-3 pt-2 text-sm text-paper/85">
              <li className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-volt/15 text-volt">
                  <Ticket className="size-4" />
                </span>
                {isLogin ? 'Instant QR tickets, offline-ready' : 'One-tap checkout with saved details'}
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-volt/15 text-volt">
                  {isLogin ? <ShieldCheck className="size-4" /> : <Calendar className="size-4" />}
                </span>
                {isLogin ? 'Verified organizers and secure checkout' : 'Personalized event alerts'}
              </li>
              <li className="flex items-center gap-3">
                <span className="flex size-8 items-center justify-center rounded-lg bg-volt/15 text-volt">
                  <Sparkles className="size-4" />
                </span>
                {isLogin ? 'Early access to headline drops' : 'Manage and transfer tickets anytime'}
              </li>
            </ul>
          </div>

          <p className="relative text-xs text-paper/55">
            © 2026 Open Tickets · Trusted live-event ticketing in South Africa
          </p>
        </aside>

        {/* Right Form Panel */}
        <section className="flex flex-col justify-between px-4 py-8 sm:px-8 lg:px-12 lg:py-12">
          <div className="flex items-center justify-between lg:hidden">
            <Link to="/" aria-label="Open Tickets home" className="inline-flex items-center">
              <img src="assets/logo/opentickets-logo-for-light.svg" alt="Open Tickets" className="h-6 w-auto dark:hidden" />
              <img src="assets/logo/opentickets-logo-for-dark.svg" alt="Open Tickets" className="hidden h-6 w-auto dark:block" />
            </Link>
            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-full bg-foreground/6 px-3 py-1.5 text-xs font-medium text-foreground transition hover:bg-foreground/10"
            >
              <ArrowLeft className="size-3.5" />
              Home
            </Link>
          </div>

          <div className="mx-auto my-auto w-full max-w-md py-8">
            <div className="space-y-2">
              <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                {isLogin ? 'Welcome back' : 'Create your account'}
              </h1>
              <p className="text-sm text-muted-foreground">
                {isLogin
                  ? 'Sign in with your email or South Africa mobile number to access your tickets.'
                  : 'Sign up in seconds to book, save, and manage tickets.'}
              </p>
            </div>

            {error && (
              <div className="mt-4 rounded-xl bg-danger/12 px-4 py-2.5 text-xs font-semibold text-danger">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">
                    Full name
                  </label>
                  <div className="relative">
                    <User className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      className="h-12 w-full rounded-xl bg-foreground/8 pr-3.5 pl-10 text-sm text-foreground outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="mb-1.5 block text-xs font-semibold text-foreground">
                  {isLogin ? 'Email or phone number' : 'Email'}
                </label>
                <div className="relative">
                  <Mail className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={isLogin ? 'text' : 'email'}
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={isLogin ? 'you@example.com or 01XXXXXXXXX' : 'you@example.com'}
                    className="h-12 w-full rounded-xl bg-foreground/8 pr-3.5 pl-10 text-sm text-foreground outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent"
                  />
                </div>
              </div>

              {!isLogin && (
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">
                    Mobile number
                  </label>
                  <div className="relative">
                    <Phone className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className="h-12 w-full rounded-xl bg-foreground/8 pr-3.5 pl-10 text-sm text-foreground outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                  </div>
                </div>
              )}

              <div className={!isLogin ? 'grid gap-4 sm:grid-cols-2' : ''}>
                <div>
                  <label className="mb-1.5 block text-xs font-semibold text-foreground">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                    <input
                      type={showPw ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder={isLogin ? '••••••••' : 'Min. 6 characters'}
                      className="h-12 w-full rounded-xl bg-foreground/8 pr-10 pl-10 text-sm text-foreground outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPw((s) => !s)}
                      aria-label={showPw ? 'Hide password' : 'Show password'}
                      className="absolute top-1/2 right-2.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-lg text-muted-foreground hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                    >
                      {showPw ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                    </button>
                  </div>
                </div>

                {!isLogin && (
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Confirm
                    </label>
                    <div className="relative">
                      <Lock className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                      <input
                        type={showPw ? 'text' : 'password'}
                        required
                        value={confirmPw}
                        onChange={(e) => setConfirmPw(e.target.value)}
                        placeholder="Repeat password"
                        className="h-12 w-full rounded-xl bg-foreground/8 pr-3.5 pl-10 text-sm text-foreground outline-none transition focus:bg-surface focus:ring-2 focus:ring-accent"
                      />
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="opentickets-glow inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-sm font-bold cursor-pointer"
              >
                {isLogin ? 'Sign in' : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {isLogin ? (
                <>
                  New to Open Tickets?{' '}
                  <Link
                    to="/register"
                    className="font-semibold text-accent-emphasis underline-offset-4 hover:underline"
                  >
                    Create an account
                  </Link>
                </>
              ) : (
                <>
                  Already have an account?{' '}
                  <Link
                    to="/login"
                    className="font-semibold text-accent-emphasis underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </p>
          </div>

          <p className="text-center text-xs text-muted-foreground lg:text-left">
            By continuing, you agree to Open Tickets’s{' '}
            <Link to="/terms" className="underline underline-offset-2 hover:text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link to="/privacy" className="underline underline-offset-2 hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
        </section>
      </div>
    </main>
  );
};
