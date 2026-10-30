import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  LifeBuoy,
  LockKeyhole,
  Mail,
  Phone,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket,
  UserCheck,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { formatZAR } from '../data/events';

export const FindMyTicketsPage: React.FC = () => {
  const { tickets } = useApp();
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [value, setValue] = useState('');
  const [step, setStep] = useState<'lookup' | 'otp' | 'results'>('lookup');
  const [otp, setOtp] = useState('482910');

  const handleContinue = (event: React.FormEvent) => {
    event.preventDefault();
    if (!value.trim()) return;
    setStep('otp');
  };

  const handleVerifyOtp = (event: React.FormEvent) => {
    event.preventDefault();
    if (otp.trim().length < 4) return;
    setStep('results');
  };

  const matchedTickets = tickets.filter((ticket) => {
    const query = value.trim().toLowerCase();
    if (!query) return true;
    return ticket.attendeeEmail.toLowerCase().includes(query)
      || ticket.attendeePhone.toLowerCase().includes(query)
      || tickets.length > 0;
  });

  const stepIndex = step === 'lookup' ? 1 : step === 'otp' ? 2 : 3;

  return (
    <main id="main-content" className="ot-find-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
      <section className="ot-find-hero" aria-labelledby="find-tickets-title">
        <img src="media/find-tickets-ai.jpg" alt="Event guest retrieving a digital ticket on a phone" />
        <div className="ot-find-hero-shade" aria-hidden="true" />
        <span className="ot-find-hero-cut ot-find-hero-cut-left" aria-hidden="true" />
        <span className="ot-find-hero-cut ot-find-hero-cut-right" aria-hidden="true" />

        <div className="ot-find-hero-copy">
          <p><Sparkles className="size-3.5" /> SECURE TICKET LOOKUP</p>
          <h1 id="find-tickets-title">Find my tickets</h1>
          <span>Recover guest purchases securely with the email address or mobile number used at checkout.</span>
        </div>

        <div className="ot-find-hero-badges">
          <span><ShieldCheck className="size-4" /> One-time verification</span>
          <span><Clock3 className="size-4" /> Takes about a minute</span>
        </div>
      </section>

      <section className="ot-find-trust" aria-label="Ticket lookup benefits">
        <span><LockKeyhole className="size-4" /><strong>Private lookup</strong><small>Your orders stay protected</small></span>
        <span><UserCheck className="size-4" /><strong>No account needed</strong><small>Perfect for guest checkout</small></span>
        <span><QrCode className="size-4" /><strong>QR ready</strong><small>Open your ticket after verification</small></span>
      </section>

      <div className="ot-find-layout">
        <section className="ot-find-console" aria-label="Find purchased tickets">
          <span className="ot-find-console-cut ot-find-console-cut-left" aria-hidden="true" />
          <span className="ot-find-console-cut ot-find-console-cut-right" aria-hidden="true" />

          <header className="ot-find-console-head">
            <div>
              <small>GUEST ACCESS PASS</small>
              <h2>{step === 'lookup' ? 'Start your lookup' : step === 'otp' ? 'Verify it’s you' : 'Your tickets are ready'}</h2>
            </div>
            <b>OT / FIND / ZA</b>
          </header>

          <div className="ot-find-progress" aria-label={`Step ${stepIndex} of 3`}>
            {['Your details', 'Verify', 'Tickets'].map((label, index) => (
              <div key={label} className={index + 1 <= stepIndex ? 'is-active' : ''}>
                <span>{index + 1 < stepIndex ? <Check className="size-3" /> : index + 1}</span>
                <small>{label}</small>
              </div>
            ))}
          </div>

          <div className="ot-find-console-body">
            {step === 'lookup' && (
              <form onSubmit={handleContinue} className="ot-find-form">
                <div className="ot-find-intro">
                  <h3>How should we find your order?</h3>
                  <p>Use the same contact detail you entered when purchasing your tickets.</p>
                </div>

                <div role="radiogroup" aria-label="Lookup method" className="ot-find-mode">
                  <button type="button" role="radio" aria-checked={mode === 'email'} className={mode === 'email' ? 'is-active' : ''} onClick={() => { setMode('email'); setValue(''); }}>
                    <span><Mail className="size-4" /></span><div><strong>Email address</strong><small>Use your checkout email</small></div><i />
                  </button>
                  <button type="button" role="radio" aria-checked={mode === 'phone'} className={mode === 'phone' ? 'is-active' : ''} onClick={() => { setMode('phone'); setValue(''); }}>
                    <span><Phone className="size-4" /></span><div><strong>Mobile number</strong><small>Use your checkout phone</small></div><i />
                  </button>
                </div>

                <label className="ot-find-field" htmlFor="guest-lookup-input">
                  <span>{mode === 'email' ? 'Email address' : 'Mobile phone number'}</span>
                  <div>{mode === 'email' ? <Mail className="size-4" /> : <Phone className="size-4" />}
                    <input id="guest-lookup-input" type={mode === 'email' ? 'email' : 'tel'} required value={value} onChange={(event) => setValue(event.target.value)} placeholder={mode === 'email' ? 'you@example.com' : '+27 XX XXX XXXX'} />
                  </div>
                </label>

                <button type="submit" className="ot-find-primary">Send verification code <ArrowRight className="size-4" /></button>
                <p className="ot-find-privacy"><LockKeyhole className="size-3.5" /> We only use this detail to locate and protect your order.</p>
              </form>
            )}

            {step === 'otp' && (
              <form onSubmit={handleVerifyOtp} className="ot-find-form ot-find-otp-form">
                <span className="ot-find-otp-icon"><Mail className="size-6" /></span>
                <div className="ot-find-intro">
                  <h3>Check your {mode === 'email' ? 'inbox' : 'messages'}</h3>
                  <p>We sent a six-digit verification code to <strong>{value}</strong>.</p>
                </div>
                <label className="ot-find-field" htmlFor="otp-code">
                  <span>One-time verification code</span>
                  <div className="ot-find-code-field"><LockKeyhole className="size-4" /><input id="otp-code" type="text" inputMode="numeric" required maxLength={6} value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} /></div>
                </label>
                <p className="ot-find-demo">Prototype code: <strong>482910</strong></p>
                <div className="ot-find-form-actions">
                  <button type="button" onClick={() => setStep('lookup')}><ArrowLeft className="size-4" /> Back</button>
                  <button type="submit" className="ot-find-primary">Verify & show tickets <ArrowRight className="size-4" /></button>
                </div>
              </form>
            )}

            {step === 'results' && (
              <div className="ot-find-results">
                <div className="ot-find-success"><CheckCircle2 className="size-5" /><div><strong>Verification complete</strong><span>Found {matchedTickets.length} order(s) linked to your lookup.</span></div></div>
                <div className="ot-find-ticket-list">
                  {matchedTickets.map((ticket) => (
                    <article key={ticket.id}>
                      <span className="ot-find-ticket-icon"><Ticket className="size-5" /></span>
                      <div><small>{ticket.orderNumber}</small><h3>{ticket.eventTitle}</h3><p>{ticket.seatCategory} × {ticket.quantity} · {formatZAR(ticket.totalPaid)}</p></div>
                      <Link to="/profile/tickets">Open QR <ArrowRight className="size-3.5" /></Link>
                    </article>
                  ))}
                </div>
                <button type="button" className="ot-find-search-again" onClick={() => setStep('lookup')}><ArrowLeft className="size-3.5" /> Search another email or phone</button>
              </div>
            )}
          </div>
        </section>

        <aside className="ot-find-guide">
          <div className="ot-find-guide-title"><span><Ticket className="size-5" /></span><div><small>HOW IT WORKS</small><h2>Three simple steps</h2></div></div>
          <ol>
            <li><span>01</span><div><strong>Enter your details</strong><p>Use the email or phone number from checkout.</p></div></li>
            <li><span>02</span><div><strong>Verify securely</strong><p>Enter the one-time code we send you.</p></div></li>
            <li><span>03</span><div><strong>Access your ticket</strong><p>Open the QR ticket linked to your order.</p></div></li>
          </ol>
          <div className="ot-find-guide-help"><LifeBuoy className="size-5" /><div><strong>Still can’t find it?</strong><p>Our support team can help locate your booking.</p><Link to="/contact">Contact support <ArrowRight className="size-3.5" /></Link></div></div>
        </aside>
      </div>
    </main>
  );
};
