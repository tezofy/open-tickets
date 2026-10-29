import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import { FAQ_SECTIONS } from '../data/legalAndFaq';

export const FaqPage: React.FC = () => {
  const [search, setSearch] = useState('');

  const q = search.trim().toLowerCase();
  const filteredSections = FAQ_SECTIONS.map((sec) => ({
    ...sec,
    items: sec.items.filter(
      (item) =>
        !q ||
        item.q.toLowerCase().includes(q) ||
        item.a.toLowerCase().includes(q)
    ),
  })).filter((sec) => sec.items.length > 0);

  return (
    <main id="main-content" className="flex-1 bg-background py-10 sm:py-16">
      <div className="mx-auto max-w-3xl space-y-10 px-4 sm:px-6">
        <header className="space-y-4">
          <h1 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Frequently Asked Questions
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
            Quick answers about buying tickets, payments, entry at the gate and refunds on Open Tickets. Can't find what you're looking for?{' '}
            <Link to="/contact" className="font-semibold text-accent-emphasis underline">
              Contact support
            </Link>
            .
          </p>

          <div className="relative pt-1">
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search questions (e.g. 1Voucher, QR code, refund)..."
              className="h-11 w-full rounded-xl border border-border bg-surface pr-4 pl-10 text-sm text-foreground outline-none focus:border-accent"
            />
          </div>
        </header>

        <div className="space-y-10">
          {filteredSections.map((sec) => (
            <section key={sec.title} className="space-y-3">
              <h2 className="font-heading text-lg font-semibold text-foreground sm:text-xl">
                {sec.title}
              </h2>
              <div className="divide-y divide-border/70 rounded-2xl bg-surface shadow-card">
                {sec.items.map((item) => (
                  <details key={item.q} className="group px-5 py-4">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-medium text-foreground select-none sm:text-base">
                      <span>{item.q}</span>
                      <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform duration-200 group-open:rotate-180" />
                    </summary>
                    <p className="pt-3 text-sm leading-relaxed text-muted-foreground">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
};
