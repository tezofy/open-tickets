import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Clock3,
  Hash,
  Layers3,
  LifeBuoy,
  Mail,
  MessageCircle,
  Search,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Ticket,
  UserRound,
} from 'lucide-react';

const channels = [
  {
    icon: Ticket,
    eyebrow: 'EXISTING BOOKING',
    label: 'Ticket & order support',
    detail: 'For missing tickets, transfers, QR codes and help with an order.',
    action: 'tickets@opentickets.co.za',
    href: 'mailto:tickets@opentickets.co.za',
  },
  {
    icon: Mail,
    eyebrow: 'GENERAL QUESTIONS',
    label: 'General enquiries',
    detail: 'For partnerships, event information and questions not linked to an order.',
    action: 'info@opentickets.co.za',
    href: 'mailto:info@opentickets.co.za',
  },
  {
    icon: MessageCircle,
    eyebrow: 'OFFICIAL HELP',
    label: 'Support centre',
    detail: 'Visit the official Open Tickets support page for additional guidance.',
    action: 'Open support page',
    href: 'https://opentickets.co.za/support',
  },
];

const checklist = [
  { icon: Hash, label: 'Transaction number', copy: 'If one was provided' },
  { icon: UserRound, label: 'Purchaser name', copy: 'As entered at checkout' },
  { icon: Mail, label: 'Checkout email', copy: 'The exact email used' },
  { icon: Smartphone, label: 'Phone number', copy: 'Including country code' },
  { icon: CalendarDays, label: 'Event name', copy: 'Plus the event date' },
  { icon: Layers3, label: 'Ticket details', copy: 'Quantity and category' },
];

export const ContactPage: React.FC = () => (
  <main id="main-content" className="ot-contact-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
    <section className="ot-contact-hero" aria-labelledby="contact-page-title">
      <img src="media/contact-support-ai.jpg" alt="Open Tickets customer care specialist ready to help" />
      <div className="ot-contact-hero-shade" aria-hidden="true" />
      <span className="ot-contact-hero-cut ot-contact-hero-cut-left" aria-hidden="true" />
      <span className="ot-contact-hero-cut ot-contact-hero-cut-right" aria-hidden="true" />

      <div className="ot-contact-hero-copy">
        <p><Sparkles className="size-3.5" /> OPEN TICKETS SUPPORT</p>
        <h1 id="contact-page-title">How can we help?</h1>
        <span>Choose the right support channel and include your booking details so our team can help you faster.</span>
      </div>

      <div className="ot-contact-hero-trust">
        <span><ShieldCheck className="size-4" /> Official support channels</span>
        <span><Clock3 className="size-4" /> Clear, human guidance</span>
      </div>
    </section>

    <section className="ot-contact-shortcuts" aria-label="Quick help links">
      <Link to="/faq"><span><Search className="size-4" /></span><div><small>QUICK ANSWERS</small><strong>Browse FAQs</strong></div><ArrowRight className="size-4" /></Link>
      <Link to="/find-my-tickets"><span><Ticket className="size-4" /></span><div><small>TICKET LOOKUP</small><strong>Find my tickets</strong></div><ArrowRight className="size-4" /></Link>
      <a href="mailto:tickets@opentickets.co.za"><span><LifeBuoy className="size-4" /></span><div><small>ORDER SUPPORT</small><strong>Email the team</strong></div><ArrowRight className="size-4" /></a>
    </section>

    <div className="ot-contact-content">
      <section className="ot-contact-channels" aria-labelledby="support-channels-title">
        <div className="ot-contact-section-heading">
          <div>
            <small>CHOOSE A ROUTE</small>
            <h2 id="support-channels-title">Start with the right team</h2>
          </div>
          <span>03 official channels</span>
        </div>

        <div className="ot-contact-channel-grid">
          {channels.map(({ icon: Icon, eyebrow, label, detail, action, href }, index) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noreferrer' : undefined}
              className="ot-contact-channel"
            >
              <span className="ot-contact-channel-number">{String(index + 1).padStart(2, '0')}</span>
              <span className="ot-contact-channel-icon"><Icon className="size-5" /></span>
              <small>{eyebrow}</small>
              <h3>{label}</h3>
              <p>{detail}</p>
              <span className="ot-contact-channel-action">{action}<ArrowUpRight className="size-4" /></span>
            </a>
          ))}
        </div>
      </section>

      <section className="ot-contact-checklist" aria-labelledby="support-checklist-title">
        <span className="ot-contact-checklist-cut ot-contact-checklist-cut-left" aria-hidden="true" />
        <span className="ot-contact-checklist-cut ot-contact-checklist-cut-right" aria-hidden="true" />
        <header>
          <span><Ticket className="size-5" /></span>
          <div><small>SUPPORT PASS</small><h2 id="support-checklist-title">Help us find your booking</h2></div>
          <b>OT / HELP</b>
        </header>
        <p className="ot-contact-checklist-intro">Include these details in your message. Complete information helps the team locate your order and respond accurately.</p>
        <div className="ot-contact-checklist-grid">
          {checklist.map(({ icon: Icon, label, copy }) => (
            <div key={label}>
              <span><Icon className="size-4" /></span>
              <p><strong>{label}</strong><small>{copy}</small></p>
              <Check className="size-3.5" />
            </div>
          ))}
        </div>
        <div className="ot-contact-security-note">
          <ShieldCheck className="size-5" />
          <p><strong>Keep your account secure</strong><span>Never send card details, passwords or one-time PINs by email.</span></p>
        </div>
      </section>
    </div>
  </main>
);
