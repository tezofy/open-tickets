import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Headphones, ShieldCheck, Ticket, X } from 'lucide-react';
import { FOOTER_COLUMNS } from '../data/legalAndFaq';

export const SiteFooter: React.FC = () => {
  const [mobileColModal, setMobileColModal] = useState<(typeof FOOTER_COLUMNS)[number] | null>(null);

  return (
    <>
      <footer className="mx-auto w-full max-w-[88rem] px-4 pt-12 pb-4 sm:px-6 sm:pt-20 sm:pb-6">
        <div className="ot-footer-ticket">
          <span className="ot-footer-corner-code" aria-hidden="true">OT / ZA / 2026</span>
          <div className="ot-footer-security-glow" aria-hidden="true" />

          <div className="ot-footer-hero">
            <div className="ot-footer-brand-block">
              <Link aria-label="Open Tickets home" className="ot-footer-logo" to="/">
                <img alt="Open Tickets" src="assets/logo/opentickets-logo-for-dark.png" />
              </Link>
              <div>
                <h2>Good times start with<br /><span>the right ticket.</span></h2>
                <p>Effortless ticketing for the organizers who create the moment and the crowds who show up.</p>
              </div>
            </div>

            <div className="ot-footer-assist">
              <span className="ot-footer-assist-icon"><Headphones className="size-5" /></span>
              <div><small>NEED A HAND?</small><strong>We&apos;re here to help</strong></div>
              <Link to="/contact" aria-label="Open Help Center"><ArrowRight className="size-4" /></Link>
            </div>
          </div>

          <div className="ot-footer-tear" aria-hidden="true">
            <span className="ot-footer-tear-notch ot-footer-tear-left" />
            <i />
            <span className="ot-footer-tear-notch ot-footer-tear-right" />
          </div>

          <div className="ot-footer-navigation">
            <div className="ot-footer-mobile-grid sm:hidden">
              {FOOTER_COLUMNS.map((col, index) => (
                <button key={col.title} type="button" onClick={() => setMobileColModal(col)}>
                  <span className="ot-footer-mobile-index">0{index + 1}</span>
                  <span>{col.title}</span>
                  <ArrowRight className="size-3.5" />
                </button>
              ))}
            </div>

            <Link to="/host" className="ot-footer-mobile-host sm:hidden">
              <img src="media/footer-organizer-ai.jpg" alt="" aria-hidden="true" className="ot-footer-mobile-host-image" />
              <span><Ticket className="size-4" /> OT / HOST</span>
              <strong>Hosting an event?</strong>
              <small>Start selling tickets in minutes.</small>
              <i>Start selling <ArrowRight className="size-3.5" /></i>
            </Link>

            <div className="ot-footer-columns hidden sm:grid">
              {FOOTER_COLUMNS.map((col, index) => (
                <div className="ot-footer-column" key={col.title}>
                  <div className="ot-footer-column-head"><span>0{index + 1}</span><p>{col.title}</p></div>
                  <ul>
                    {col.links.map((lnk) => (
                      <li key={lnk.label}>
                        {lnk.href.startsWith('http') ? (
                          <a href={lnk.href} target="_blank" rel="noreferrer">{lnk.label}</a>
                        ) : (
                          <Link to={lnk.href}>{lnk.label}</Link>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <Link to="/host" className="ot-footer-organizer-card">
                <span className="ot-footer-organizer-notch ot-footer-organizer-notch-top" aria-hidden="true" />
                <span className="ot-footer-organizer-notch ot-footer-organizer-notch-bottom" aria-hidden="true" />
                <img src="media/footer-organizer-ai.jpg" alt="" aria-hidden="true" className="ot-footer-organizer-image" />
                <div className="ot-footer-organizer-top">
                  <span><Ticket className="size-3.5" /> OT / HOST</span>
                  <small>05—06</small>
                </div>
                <h3>Hosting an event?</h3>
                <p>Reach the right audience and start selling tickets in minutes.</p>
                <div className="ot-footer-organizer-action">
                  <span>Start selling <ArrowRight className="size-3.5" /></span>
                  <i aria-hidden="true" />
                </div>
              </Link>
            </div>
          </div>

          <div className="ot-footer-stub">
            <div className="ot-footer-socials">
              <a aria-label="Facebook" href="https://www.facebook.com/OpenTicketsZA" target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.07C24 5.41 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.52c-1.49 0-1.95.93-1.95 1.89v2.26h3.33l-.54 3.49h-2.79V24C19.61 23.09 24 18.1 24 12.07Z" /></svg>
              </a>
              <a aria-label="Instagram" href="https://www.instagram.com/opentickets.za/" target="_blank" rel="noopener noreferrer">
                <svg aria-hidden="true" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect height="19" rx="5" width="19" x="2.5" y="2.5" /><circle cx="12" cy="12" r="4.25" /><circle cx="17.4" cy="6.6" fill="currentColor" r="1" stroke="none" /></svg>
              </a>
              <span>@opentickets.za</span>
            </div>

            <div className="ot-footer-legal">
              <span><ShieldCheck className="size-3.5" /> Secure ticketing</span>
              <p>© 2026 Open Tickets (Pty) Ltd · South Africa</p>
            </div>

            <div className="ot-footer-payments">
              <small>SECURE PAYMENTS</small>
              <div>
                {[
                  { title: '1Voucher', src: 'assets/pgw-logos/1voucher.svg' },
                  { title: 'Visa', src: 'assets/pgw-logos/pgw-visa.svg' },
                  { title: 'Mastercard', src: 'assets/pgw-logos/pgw-mastercard.svg' },
                  { title: 'Banking app', src: 'assets/pgw-logos/bank-app.svg' },
                ].map((pgw) => <span key={pgw.title} title={pgw.title}><img src={pgw.src} alt={pgw.title} /></span>)}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {mobileColModal && (
        <div className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 backdrop-blur-xs sm:hidden" onClick={() => setMobileColModal(null)}>
          <div className="w-full rounded-t-3xl border-t border-border bg-surface p-5 pb-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-border pb-3">
              <p className="text-base font-bold text-foreground">{mobileColModal.title}</p>
              <button type="button" aria-label="Close" onClick={() => setMobileColModal(null)} className="grid size-8 place-items-center rounded-full bg-foreground/6 text-muted-foreground"><X className="size-4" /></button>
            </div>
            <ul className="mt-3 space-y-1">
              {mobileColModal.links.map((lnk) => (
                <li key={lnk.label}>
                  {lnk.href.startsWith('http') ? (
                    <a href={lnk.href} target="_blank" rel="noreferrer" onClick={() => setMobileColModal(null)} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-accent/12"><span>{lnk.label}</span><ArrowRight className="size-4 text-muted-foreground" /></a>
                  ) : (
                    <Link to={lnk.href} onClick={() => setMobileColModal(null)} className="flex items-center justify-between rounded-xl px-3 py-3 text-sm font-medium text-foreground hover:bg-accent/12"><span>{lnk.label}</span><ArrowRight className="size-4 text-muted-foreground" /></Link>
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
