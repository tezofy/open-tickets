import React from 'react';
import {
  AlertCircle,
  ArrowRight,
  ArrowUpRight,
  CalendarClock,
  Check,
  CircleHelp,
  FileCheck2,
  LifeBuoy,
  Mail,
  ReceiptText,
  RefreshCcw,
  ShieldCheck,
  Sparkles,
  Ticket,
} from 'lucide-react';

type LegalType = 'privacy' | 'terms' | 'refund-policy' | 'refund-guarantee';
type PageData = { title: string; intro: string; url: string; label: string };

const pages: Record<LegalType, PageData> = {
  privacy: { title: 'Privacy Policy', intro: 'The official Open Tickets privacy policy describes the handling of personal information for its website, wallet and ticketing services. Read the current policy on the official site for the authoritative and complete version.', url: 'https://opentickets.co.za/page/privacy-policy', label: 'Read the official Privacy Policy' },
  terms: { title: 'Terms and Conditions', intro: 'The official terms include event entry, cancellation, refunds and venue conditions. Terms can change and may vary by event, so review the current official terms and the event organiser’s rules before purchase.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Read the official Terms and Conditions' },
  'refund-policy': { title: 'Refund & Cancellation Policy', intro: 'Refunds and cancellations are governed by the official terms and any event-specific rules. Check the current policy on Open Tickets or contact ticket support before making a booking.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Review official cancellation terms' },
  'refund-guarantee': { title: 'Refund Information', intro: 'This prototype does not provide or sell a separate refund-guarantee product. For the applicable cancellation and refund rules, use the official Open Tickets terms and contact support about a specific order.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Review official refund terms' },
};

const RefundPolicyPage: React.FC<{ page: PageData }> = ({ page }) => (
  <main id="main-content" className="ot-refund-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
    <section className="ot-refund-hero" aria-labelledby="refund-policy-title">
      <img src="media/refund-policy-ai.jpg" alt="Customer care specialist reviewing event refund information with a guest" />
      <div className="ot-refund-hero-shade" aria-hidden="true" />
      <span className="ot-refund-hero-cut ot-refund-hero-cut-left" aria-hidden="true" />
      <span className="ot-refund-hero-cut ot-refund-hero-cut-right" aria-hidden="true" />
      <div className="ot-refund-hero-copy">
        <p><Sparkles className="size-3.5" /> OPEN TICKETS · OFFICIAL INFORMATION</p>
        <h1 id="refund-policy-title">Refund &amp;<br />Cancellation Policy</h1>
        <span>Understand where to find the current rules, what information to prepare and how to get help with a specific booking.</span>
      </div>
      <div className="ot-refund-hero-badges">
        <span><ShieldCheck className="size-4" /> Authoritative source linked</span>
        <span><FileCheck2 className="size-4" /> Event terms may vary</span>
      </div>
    </section>

    <section className="ot-refund-trust" aria-label="Policy highlights">
      <span><ReceiptText className="size-4" /><strong>Check your event terms</strong><small>Rules can differ by booking</small></span>
      <span><CalendarClock className="size-4" /><strong>Keep order details ready</strong><small>It helps support find your purchase</small></span>
      <span><LifeBuoy className="size-4" /><strong>Official help available</strong><small>Contact ticket support for your case</small></span>
    </section>

    <div className="ot-refund-layout">
      <article className="ot-refund-content">
        <section className="ot-refund-notice">
          <span><AlertCircle className="size-5" /></span>
          <div><small>IMPORTANT NOTICE</small><h2>Always use the current official terms</h2><p>This page is a clear navigation guide, not legal advice. Refund eligibility and cancellation outcomes are determined by the official Open Tickets terms, the event organiser’s rules and the circumstances of the booking.</p></div>
        </section>

        <section id="policy-overview" className="ot-refund-section">
          <header><span><FileCheck2 className="size-5" /></span><div><small>SECTION 01</small><h2>What determines the outcome?</h2></div></header>
          <p>Before requesting assistance, review the official policy and the terms shown for your event. The applicable response may depend on why the booking changed and the event-specific conditions accepted at checkout.</p>
          <div className="ot-refund-scenarios">
            <div><span><RefreshCcw className="size-4" /></span><strong>Event changes</strong><p>Check the official event communication for cancellation, rescheduling or venue changes.</p></div>
            <div><span><Ticket className="size-4" /></span><strong>Your booking</strong><p>Review the event’s own conditions and the ticket category attached to your order.</p></div>
            <div><span><CircleHelp className="size-4" /></span><strong>Your circumstances</strong><p>Contact ticket support when the published information does not answer your specific question.</p></div>
          </div>
        </section>

        <section id="request-help" className="ot-refund-section">
          <header><span><Mail className="size-5" /></span><div><small>SECTION 02</small><h2>How to request help</h2></div></header>
          <ol className="ot-refund-steps">
            <li><span>01</span><div><strong>Review the official terms</strong><p>Read the current cancellation and refund provisions, plus the event description.</p></div><Check className="size-4" /></li>
            <li><span>02</span><div><strong>Gather your booking details</strong><p>Have the order number, purchaser name, checkout email, event and ticket category ready.</p></div><Check className="size-4" /></li>
            <li><span>03</span><div><strong>Contact ticket support</strong><p>Explain what happened clearly and include the relevant booking details in your message.</p></div><Check className="size-4" /></li>
            <li><span>04</span><div><strong>Follow the case guidance</strong><p>Use the instructions provided by the official support team for your specific order.</p></div><Check className="size-4" /></li>
          </ol>
        </section>

        <section id="prepare" className="ot-refund-section">
          <header><span><ReceiptText className="size-5" /></span><div><small>SECTION 03</small><h2>What to include in your message</h2></div></header>
          <div className="ot-refund-checklist">
            {['Order or transaction number', 'Purchaser’s full name', 'Email and phone used at checkout', 'Event name and event date', 'Ticket quantity and category', 'A concise explanation of the issue'].map((item) => <span key={item}><Check className="size-3.5" />{item}</span>)}
          </div>
          <div className="ot-refund-security"><ShieldCheck className="size-5" /><p><strong>Protect your information</strong><span>Never send card details, passwords or one-time PINs when requesting assistance.</span></p></div>
        </section>
      </article>

      <aside className="ot-refund-side">
        <section className="ot-refund-official-card">
          <span><FileCheck2 className="size-5" /></span>
          <small>AUTHORITATIVE SOURCE</small>
          <h2>Read the official policy</h2>
          <p>The Open Tickets source is maintained separately and should be consulted for the complete, current terms.</p>
          <a href={page.url} target="_blank" rel="noreferrer">{page.label}<ArrowUpRight className="size-4" /></a>
        </section>
        <nav className="ot-refund-index" aria-label="Policy page sections">
          <small>ON THIS PAGE</small>
          <a href="#policy-overview"><span>01</span>What determines the outcome?</a>
          <a href="#request-help"><span>02</span>How to request help</a>
          <a href="#prepare"><span>03</span>What to include</a>
        </nav>
        <section className="ot-refund-support">
          <LifeBuoy className="size-5" />
          <div><strong>Questions about an order?</strong><p>Contact the Open Tickets support team with your booking details.</p><a href="mailto:tickets@opentickets.co.za">tickets@opentickets.co.za <ArrowRight className="size-3.5" /></a></div>
        </section>
      </aside>
    </div>
  </main>
);

export const LegalPage: React.FC<{ type: LegalType }> = ({ type }) => {
  const page = pages[type];
  if (type === 'refund-policy') return <RefundPolicyPage page={page} />;

  return (
    <main id="main-content" className="flex-1 bg-background py-10 sm:py-16">
      <article className="mx-auto max-w-3xl space-y-7 px-4 sm:px-6">
        <header className="space-y-3 border-b border-border/70 pb-7">
          <p className="text-xs font-bold tracking-[0.16em] text-accent-emphasis uppercase">Open Tickets · Official information</p>
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">{page.title}</h1>
          <p className="text-sm leading-relaxed text-muted-foreground">{page.intro}</p>
        </header>
        <section className="rounded-3xl border border-border/80 bg-surface p-6 shadow-card sm:p-8">
          <h2 className="text-lg font-bold text-foreground">Please use the official source</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">This page is part of a locally bundled prototype. It is not legal advice and is not a substitute for the official Open Tickets policy. The official source is maintained by Open Tickets and should be consulted for current terms.</p>
          <a href={page.url} target="_blank" rel="noreferrer" className="mt-5 inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-bold text-primary-foreground">{page.label}</a>
        </section>
        <p className="text-xs text-muted-foreground">For booking or ticket support: <a className="underline" href="mailto:tickets@opentickets.co.za">tickets@opentickets.co.za</a></p>
      </article>
    </main>
  );
};
