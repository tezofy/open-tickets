import React from 'react';

type LegalType = 'privacy' | 'terms' | 'refund-policy' | 'refund-guarantee';
const pages: Record<LegalType, { title: string; intro: string; url: string; label: string }> = {
  privacy: { title: 'Privacy Policy', intro: 'The official Open Tickets privacy policy describes the handling of personal information for its website, wallet and ticketing services. Read the current policy on the official site for the authoritative and complete version.', url: 'https://opentickets.co.za/page/privacy-policy', label: 'Read the official Privacy Policy' },
  terms: { title: 'Terms and Conditions', intro: 'The official terms include event entry, cancellation, refunds and venue conditions. Terms can change and may vary by event, so review the current official terms and the event organiser’s rules before purchase.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Read the official Terms and Conditions' },
  'refund-policy': { title: 'Refund & Cancellation Policy', intro: 'Refunds and cancellations are governed by the official terms and any event-specific rules. Check the current policy on Open Tickets or contact ticket support before making a booking.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Review official cancellation terms' },
  'refund-guarantee': { title: 'Refund Information', intro: 'This prototype does not provide or sell a separate refund-guarantee product. For the applicable cancellation and refund rules, use the official Open Tickets terms and contact support about a specific order.', url: 'https://opentickets.co.za/page/terms-and-conditions', label: 'Review official refund terms' },
};

export const LegalPage: React.FC<{ type: LegalType }> = ({ type }) => {
  const page = pages[type];
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
