import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, X } from 'lucide-react';
import { FOOTER_COLUMNS } from '../data/legalAndFaq';

export const SiteFooter: React.FC = () => {
  const [mobileColModal, setMobileColModal] = useState<(typeof FOOTER_COLUMNS)[number] | null>(null);

  return (
    <>
      <footer className="mx-auto w-full max-w-[88rem] px-4 pt-10 pb-4 sm:px-6 sm:pt-20 sm:pb-6">
        <div className="relative overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card">
          {/* Top Ticket Header Band */}
          <div className="opentickets-footer-cta relative flex flex-col items-start justify-between gap-4 px-5 py-6 sm:flex-row sm:items-center sm:px-10 sm:py-8">
            <div className="relative z-10 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-6">
              <Link aria-label="Open Tickets home" className="group flex w-fit items-center select-none" to="/">
                <img
                  alt="Open Tickets"
                  src="/assets/logo/opentickets-logo-for-light.svg"
                  className="h-8 w-auto transition-transform duration-200 group-hover:scale-105 dark:hidden"
                />
                <img
                  alt="Open Tickets"
                  src="/assets/logo/opentickets-logo-for-dark.svg"
                  className="hidden h-8 w-auto transition-transform duration-200 group-hover:scale-105 dark:block"
                />
              </Link>
              <p className="max-w-xs text-[13px] leading-5 text-muted-foreground sm:max-w-sm sm:text-sm">
                Ticketing that feels effortless — for the organizers who host and the crowds who show up.
              </p>
            </div>
            <Link
              to="/contact"
              className="relative z-10 inline-flex h-9 shrink-0 items-center justify-center gap-2 rounded-lg bg-foreground/5 px-3.5 text-[13.5px] font-medium text-foreground backdrop-blur-md transition-colors hover:bg-accent/15 dark:bg-white/8"
            >
              Help Center
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Ticket Perforation + Left & Right Punch-Out Notches */}
          <div aria-hidden="true" className="relative">
            <div className="opentickets-ticket-perforation mx-5 h-px sm:mx-10 sm:h-0.5" />
            <span className="absolute top-1/2 -left-3 z-10 size-6 -translate-y-1/2 rounded-full border border-border bg-background sm:-left-4 sm:size-8" />
            <span className="absolute top-1/2 -right-3 z-10 size-6 -translate-y-1/2 rounded-full border border-border bg-background sm:-right-4 sm:size-8" />
          </div>

          {/* 6 Columns (Desktop) & 6 Dialog Buttons (Mobile) */}
          <div className="relative px-5 py-7 sm:px-10 sm:py-8">
            {/* Mobile 2x3 Dialog Cards */}
            <div className="grid grid-cols-2 gap-2.5 sm:hidden">
              {FOOTER_COLUMNS.map((col) => (
                <button
                  key={col.title}
                  type="button"
                  onClick={() => setMobileColModal(col)}
                  className="group flex h-12 items-center gap-2 rounded-xl bg-foreground/4 px-3.5 text-left text-[13px] font-semibold text-surface-foreground transition-colors hover:bg-accent/12 dark:bg-white/8 cursor-pointer"
                >
                  <span className="min-w-0 truncate">{col.title}</span>
                  <ArrowRight className="ml-auto size-3.5 shrink-0 text-muted-foreground transition-transform duration-150 group-hover:translate-x-0.5" />
                </button>
              ))}
            </div>

            {/* Desktop/Tablet 6-Column Links */}
            <div className="hidden gap-x-6 gap-y-8 sm:grid sm:grid-cols-3 md:grid-cols-6 lg:gap-x-8">
              {FOOTER_COLUMNS.map((col) => (
                <div key={col.title}>
                  <p className="text-sm font-semibold text-surface-foreground">{col.title}</p>
                  <ul className="mt-3.5 space-y-2.5 sm:mt-4">
                    {col.links.map((lnk) => (
                      <li key={lnk.label}>
                        {lnk.href.startsWith('http') ? (
                          <a href={lnk.href} target="_blank" rel="noreferrer" className="group flex w-fit items-center gap-1 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-surface-foreground sm:text-sm">
                            <span className="h-px w-0 bg-accent transition-all duration-200 group-hover:w-3" />
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">{lnk.label}</span>
                          </a>
                        ) : (
                          <Link to={lnk.href} className="group flex w-fit items-center gap-1 text-[13px] text-muted-foreground transition-colors duration-150 hover:text-surface-foreground sm:text-sm">
                            <span className="h-px w-0 bg-accent transition-all duration-200 group-hover:w-3" />
                            <span className="transition-transform duration-200 group-hover:translate-x-0.5">{lnk.label}</span>
                          </Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Social, Copyright, Payment Badges & Trade License */}
          <div className="relative border-t border-border px-5 py-5 sm:px-10 sm:py-6">
            <div className="flex flex-col items-center gap-4 text-center text-[11.5px] text-muted-foreground sm:grid sm:grid-cols-3 sm:items-center sm:gap-3 sm:text-[12.5px]">
              {/* Social Links */}
              <div className="flex items-center gap-2 sm:justify-self-start">
                <a
                  aria-label="Facebook"
                  href="https://www.facebook.com/OpenTicketsZA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-lg bg-foreground/[0.04] text-muted-foreground shadow-control transition-all hover:bg-accent/15 hover:text-accent-emphasis sm:size-9 sm:rounded-xl dark:bg-white/6"
                >
                  <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.54 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z" />
                  </svg>
                </a>
                <a
                  aria-label="Instagram"
                  href="https://www.instagram.com/opentickets.za/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex size-8 items-center justify-center rounded-lg bg-foreground/[0.04] text-muted-foreground shadow-control transition-all hover:bg-accent/15 hover:text-accent-emphasis sm:size-9 sm:rounded-xl dark:bg-white/6"
                >
                  <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <rect height="19" rx="5" width="19" x="2.5" y="2.5" />
                    <circle cx="12" cy="12" r="4.25" />
                    <circle cx="17.4" cy="6.6" fill="currentColor" r="1" stroke="none" />
                  </svg>
                </a>



              </div>

              <p className="sm:justify-self-center">© 2026 Open Tickets. All rights reserved.</p>

              {/* Payment Gateway Logos */}
              <div className="flex items-center gap-2 sm:justify-self-end">
                <span className="text-[10px] text-muted-foreground sm:text-[11px]">We accept</span>
                <div className="flex flex-wrap items-center justify-center gap-1.5">
                  {[
                    { title: '1Voucher', src: '/assets/pgw-logos/1voucher.svg' },
                    { title: 'Visa', src: '/assets/pgw-logos/pgw-visa.svg' },
                    { title: 'Mastercard', src: '/assets/pgw-logos/pgw-mastercard.svg' },
                    { title: 'Banking app', src: '/assets/pgw-logos/bank-app.svg' },
                  ].map((pgw) => (
                    <span
                      key={pgw.title}
                      title={pgw.title}
                      className="relative flex h-7 w-11 items-center justify-center overflow-hidden rounded-md bg-white/90 p-1.5 ring-1 ring-black/[0.06] sm:h-8 sm:w-12"
                    >
                      <img src={pgw.src} alt={pgw.title} className="max-h-full max-w-full object-contain" />
                    </span>
                  ))}
                </div>
              </div>

              <p className="sm:col-span-3">
                Open Tickets (Pty) Ltd · South Africa
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Footer Section Bottom Sheet Dialog */}
      {mobileColModal && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/50 backdrop-blur-xs sm:hidden"
          onClick={() => setMobileColModal(null)}
        >
          <div
            className="w-full rounded-t-3xl border-t border-border bg-surface p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-border pb-3">
              <p className="text-base font-bold text-foreground">{mobileColModal.title}</p>
              <button
                type="button"
                onClick={() => setMobileColModal(null)}
                className="grid size-8 place-items-center rounded-full bg-foreground/6 text-muted-foreground"
              >
                <X className="size-4" />
              </button>
            </div>
            <ul className="mt-3 space-y-1">
              {mobileColModal.links.map((lnk) => (
                <li key={lnk.label}>
                  {lnk.href.startsWith('http') ? (
                    <a href={lnk.href} target="_blank" rel="noreferrer" onClick={() => setMobileColModal(null)} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-accent/12">
                      <span>{lnk.label}</span><ArrowRight className="size-4 text-muted-foreground" />
                    </a>
                  ) : (
                    <Link to={lnk.href} onClick={() => setMobileColModal(null)} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-accent/12">
                      <span>{lnk.label}</span><ArrowRight className="size-4 text-muted-foreground" />
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};
