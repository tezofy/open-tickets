import React from 'react';
import { ArrowUpRight, Mail, MessageCircle, Ticket } from 'lucide-react';

const channels = [
  { icon: Mail, label: 'General enquiries', detail: 'info@opentickets.co.za', href: 'mailto:info@opentickets.co.za' },
  { icon: Ticket, label: 'Ticket & order support', detail: 'tickets@opentickets.co.za', href: 'mailto:tickets@opentickets.co.za' },
  { icon: MessageCircle, label: 'Official support page', detail: 'opentickets.co.za/support', href: 'https://opentickets.co.za/support' },
];

export const ContactPage: React.FC = () => (
  <main id="main-content" className="flex-1 bg-background py-10 sm:py-16">
    <div className="mx-auto max-w-5xl space-y-8 px-4 sm:px-6">
      <header className="max-w-2xl space-y-3">
        <p className="text-xs font-bold tracking-[0.18em] text-accent-emphasis uppercase">Open Tickets support</p>
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-5xl">How can we help?</h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">For an existing booking, include your transaction number, event name and the checkout email address when contacting support.</p>
      </header>
      <section className="grid gap-4 md:grid-cols-3">
        {channels.map(({ icon: Icon, label, detail, href }) => (
          <a key={label} href={href} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined} className="group rounded-3xl border border-border/80 bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:shadow-elevated">
            <span className="grid size-11 place-items-center rounded-2xl bg-accent/15 text-accent-emphasis"><Icon className="size-5" /></span>
            <h2 className="mt-5 text-base font-bold text-foreground">{label}</h2>
            <p className="mt-1 break-words text-sm text-muted-foreground">{detail}</p>
            <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-accent-emphasis">Open channel <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5" /></span>
          </a>
        ))}
      </section>
      <section className="rounded-3xl bg-pine p-6 text-paper shadow-card sm:p-9">
        <h2 className="font-heading text-xl font-bold">Ticket support checklist</h2>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-paper/75">To help the support team find your booking, provide your transaction number (if available), purchaser name, checkout email and phone, event name, number of tickets and ticket category. Do not email card details or passwords.</p>
      </section>
    </div>
  </main>
);
