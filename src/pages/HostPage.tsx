import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  QrCode,
  ShieldCheck,
  Sparkles,
  Wallet,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HostPage: React.FC = () => {
  const { notify } = useApp();
  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [eventType, setEventType] = useState('Music / Concert');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orgName.trim() || !contactEmail.trim()) return;
    setSubmitted(true);
    notify('This preview does not submit enquiries. Please email info@opentickets.co.za.', 'info');
  };

  return (
    <main id="main-content" className="flex-1 bg-background text-foreground">
      {/* Exact Open Tickets /host Hero Section */}
      <section className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 sm:py-24">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/30 bg-accent/10 px-3.5 py-1 text-xs font-semibold tracking-wider text-accent-emphasis uppercase">
          <Sparkles className="size-3.5" />
          Open Tickets for Organizers
        </span>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Host an event
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground sm:text-base">
          This page is a prototype enquiry form. For current organiser services and event listings, contact Open Tickets through its official website.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/contact"
            className="opentickets-glow inline-flex h-12 items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold"
          >
            Contact us
            <ArrowRight className="size-4" />
          </Link>
          <a
            href="#organizer-onboarding"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-border bg-surface px-6 text-sm font-semibold text-foreground hover:border-accent"
          >
            Contact Open Tickets
          </a>
        </div>
      </section>

      {/* Capabilities Grid */}
      <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            {
              icon: QrCode,
              title: 'High-Speed Gate Scanning',
              desc: 'Multi-gate QR scanner app with offline sync and duplicate-scan prevention for stadium-scale crowds.',
            },
            {
              icon: Wallet,
              title: 'Local & Global Payments',
              desc: 'Accept 1Voucher, Banking App, Nagad, Visa, Mastercard, and AMEX out of the box with transparent settlement.',
            },
            {
              icon: BarChart3,
              title: 'Live Sales Analytics',
              desc: 'Track ticket velocity, tier capacity, promo codes, and attendee demographics in real time.',
            },
            {
              icon: ShieldCheck,
              title: 'Queue & Bot Protection',
              desc: 'Built-in virtual waiting rooms keep high-demand concert and sports drops smooth and fair.',
            },
          ].map((feat) => {
            const Icon = feat.icon;
            return (
              <div
                key={feat.title}
                className="rounded-3xl border border-border/70 bg-surface p-6 shadow-card"
              >
                <div className="grid size-11 place-items-center rounded-2xl bg-pine text-volt">
                  <Icon className="size-5" />
                </div>
                <h2 className="mt-4 text-base font-bold text-foreground">{feat.title}</h2>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{feat.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Quick Organizer Onboarding Card */}
        <div
          id="organizer-onboarding"
          className="mt-12 rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-10"
        >
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center">
            <div className="space-y-3 lg:col-span-5">
              <h2 className="font-heading text-2xl font-extrabold text-foreground">
                Organiser enquiries
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                For current information about listing an event, contact Open Tickets using its official support channels.
              </p>
              <ul className="space-y-2 pt-1 text-xs font-medium text-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent-emphasis" />
                  Public event listings include ticket categories and event information
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent-emphasis" />
                  Event-specific entry requirements are shown on event pages
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-accent-emphasis" />
                  Contact the official support team for organiser enquiries
                </li>
              </ul>
            </div>

            <div className="lg:col-span-7">
              {submitted ? (
                <div className="rounded-2xl bg-accent/15 p-6 text-center">
                  <CheckCircle2 className="mx-auto size-10 text-accent-emphasis" />
                  <h3 className="mt-3 text-base font-bold text-foreground">
                    This is a local prototype
                  </h3>
                  <p className="mt-1 text-xs text-muted-foreground">
                    No enquiry was sent. Please contact <a className="underline" href="mailto:info@opentickets.co.za">info@opentickets.co.za</a> directly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Organization / Brand name *
                    </label>
                    <input
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      placeholder="e.g. Local Event Organiser"
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Work email or phone *
                    </label>
                    <input
                      type="text"
                      required
                      value={contactEmail}
                      onChange={(e) => setContactEmail(e.target.value)}
                      placeholder="organizer@company.com"
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Event category
                    </label>
                    <select
                      value={eventType}
                      onChange={(e) => setEventType(e.target.value)}
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    >
                      <option>Music / Concert</option>
                      <option>Sports / Tournament</option>
                      <option>Conference / Expo</option>
                      <option>Theatre / Comedy</option>
                      <option>Festival / Campus Event</option>
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      className="opentickets-glow h-12 w-full rounded-xl text-sm font-bold cursor-pointer"
                    >
                      Get started as an Organizer
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
