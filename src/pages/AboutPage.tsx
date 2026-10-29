import React from 'react';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => (
  <main id="main-content" className="flex-1 bg-background py-10 sm:py-16">
    <article className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
      <header className="space-y-4 border-b border-border/70 pb-8">
        <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">About Open Tickets</h1>
        <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
          Open Tickets is an event-ticketing platform serving events in South Africa. Its public website lists event information, ticket categories, venue details and purchase options, with ticket delivery and account access instructions sent to buyers after checkout.
        </p>
      </header>
      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">Find an event</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">Browse the event listings, open an event page to review its date, venue, description and ticket categories, then follow the official checkout flow to purchase.</p>
        <a href="https://opentickets.co.za/" className="font-semibold text-accent-emphasis underline">Visit the official Open Tickets website</a>
      </section>
      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">Digital tickets and support</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">The Open Tickets help pages explain ticket delivery, supported downloads and wallet options. Check your order confirmation email for the ticket links and instructions specific to your event.</p>
        <ul className="list-disc space-y-2 pl-5 text-sm text-muted-foreground">
          <li>General enquiries: <a className="underline" href="mailto:info@opentickets.co.za">info@opentickets.co.za</a></li>
          <li>Ticket and order support: <a className="underline" href="mailto:tickets@opentickets.co.za">tickets@opentickets.co.za</a></li>
        </ul>
      </section>
      <section className="space-y-3">
        <h2 className="font-heading text-xl font-bold text-foreground">For event organisers</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">For event and ticketing enquiries, use the official Open Tickets support channels. This project is a locally bundled website prototype and does not connect to Open Tickets’ private booking or payment systems.</p>
        <Link to="/contact" className="font-semibold text-accent-emphasis underline">Contact information</Link>
      </section>
      <section className="space-y-3 rounded-3xl border border-border/80 bg-surface p-6 shadow-card">
        <h2 className="font-heading text-xl font-bold text-foreground">Official company and policy information</h2>
        <p className="text-sm leading-relaxed text-muted-foreground">For current corporate details, privacy terms, cancellation rules and the legally binding terms, please consult the official Open Tickets website.</p>
        <div className="flex flex-wrap gap-4 text-sm font-semibold text-accent-emphasis underline">
          <a href="https://opentickets.co.za/page/privacy-policy">Privacy policy</a>
          <a href="https://opentickets.co.za/page/terms-and-conditions">Terms and conditions</a>
        </div>
      </section>
    </article>
  </main>
);
