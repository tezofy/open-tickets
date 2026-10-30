import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { CalendarDays, ChevronDown, ChevronUp, ExternalLink, Info, MapPin, MinusCircle, Navigation, PlusCircle, ShieldCheck, Sparkles, Ticket, X } from 'lucide-react';
import { EVENTS, findEventBySlug, formatZAR } from '../data/events';
import { useApp } from '../context/AppContext';
import { OpenTicketsCard } from '../components/OpenTicketsCard';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string; organizerSlug?: string }>();
  const navigate = useNavigate();
  const { addTicketsToCart } = useApp();

  const event = useMemo(() => findEventBySlug(slug), [slug]);
  const eventTargetTime = useMemo(() => {
    if (!event?.otDateTime) return 0;
    const normalized = event.otDateTime.replace(', ', 'T');
    return Date.parse(`${normalized}:00+02:00`);
  }, [event?.otDateTime]);

  const [countdown, setCountdown] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: false });
  const [inQueue, setInQueue] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedQty, setSelectedQty] = useState<Record<string, number>>({});
  const [addingToCart, setAddingToCart] = useState(false);
  const [aboutExpanded, setAboutExpanded] = useState(false);

  useEffect(() => {
    const updateCountdown = () => {
      const remaining = eventTargetTime - Date.now();
      if (!eventTargetTime || remaining <= 0) {
        setCountdown({ days: 0, hours: 0, minutes: 0, seconds: 0, ended: true });
        return;
      }

      setCountdown({
        days: Math.floor(remaining / 86_400_000),
        hours: Math.floor((remaining % 86_400_000) / 3_600_000),
        minutes: Math.floor((remaining % 3_600_000) / 60_000),
        seconds: Math.floor((remaining % 60_000) / 1_000),
        ended: false,
      });
    };

    updateCountdown();
    const timer = window.setInterval(updateCountdown, 1_000);
    return () => window.clearInterval(timer);
  }, [eventTargetTime]);

  useEffect(() => setAboutExpanded(false), [event?.id]);

  if (!event) {
    return (
      <main className="flex-1 bg-background py-20 text-center">
        <div className="mx-auto max-w-md px-4">
          <h1 className="font-heading text-3xl font-extrabold text-foreground">This page isn’t here</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            The event you’re looking for may have ended or moved.
          </p>
          <Link
            to="/events"
            className="opentickets-glow mt-6 inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold"
          >
            Browse events
          </Link>
        </div>
      </main>
    );
  }

  const totalSelected = Object.values(selectedQty).reduce((sum, n) => sum + n, 0);
  const canAddMore = totalSelected < 10;

  const handleBookNowClick = () => {
    setInQueue(true);
    setTimeout(() => {
      setInQueue(false);
      // Pre-select 1 of first tier if empty for convenience, or start at 0 like OpenTickets
      setSelectedQty({});
      setShowSelectModal(true);
    }, 850);
  };

  const incrementTier = (tierId: string) => {
    if (!canAddMore) return;
    setSelectedQty((prev) => ({ ...prev, [tierId]: (prev[tierId] || 0) + 1 }));
  };

  const decrementTier = (tierId: string) => {
    setSelectedQty((prev) => {
      const curr = prev[tierId] || 0;
      if (curr <= 1) {
        const copy = { ...prev };
        delete copy[tierId];
        return copy;
      }
      return { ...prev, [tierId]: curr - 1 };
    });
  };

  const handleConfirmAdd = () => {
    if (totalSelected === 0) return;
    setAddingToCart(true);
    setTimeout(() => {
      addTicketsToCart(event.id, selectedQty);
      setAddingToCart(false);
      setShowSelectModal(false);
      navigate('/cart');
    }, 350);
  };

  const relatedEvents = EVENTS.filter((e) => e.id !== event.id && e.category === event.category).slice(0, 3);
  const isSquareBanner = event.bannerImage === event.squareImage;

  return (
    <main id="main-content" className="ot-font flex-1 bg-background py-6 sm:py-8">
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
        {/* ==============================================================
            100% OPENTICKETS.CO.ZA EVENT DETAIL DESIGN
            1) Top Full-Width Banner & Title Card (.card.m-card.shadow)
           ============================================================== */}
        <section className="ot-detail-hero-ticket" aria-labelledby="event-title">
          <span className="ot-detail-hero-cut ot-detail-hero-cut-left" aria-hidden="true" />
          <span className="ot-detail-hero-cut ot-detail-hero-cut-right" aria-hidden="true" />

          <div className="ot-detail-hero-media">
            {isSquareBanner && (
              <img src={event.bannerImage} alt="" aria-hidden="true" className="ot-detail-hero-backdrop" />
            )}
            <img
              src={event.bannerImage}
              alt={event.title}
              className={`ot-detail-hero-image ${isSquareBanner ? 'is-contained' : ''}`}
            />
            <div className="ot-detail-hero-shade" aria-hidden="true" />
            <div className="ot-detail-hero-badges">
              <span><Sparkles className="size-3" /> {event.status}</span>
              <Link to={`/events?category=${encodeURIComponent(event.category)}`}>{event.category}</Link>
            </div>
            <div className="ot-detail-hero-copy">
              <p>OPEN TICKETS · LIVE EXPERIENCE</p>
              <h1 id="event-title">{event.title}</h1>
            </div>
          </div>

          <div className="ot-detail-hero-stub">
            <div className="ot-detail-date-block" aria-label={event.heroDateLabel}>
              <span>{event.monthShort}</span>
              <strong>{event.dayNum}</strong>
              <small>2026</small>
            </div>
            <div className="ot-detail-stub-center">
              <div className="ot-detail-hero-meta">
                <span><MapPin className="size-4" /> {event.venue}</span>
                <span><CalendarDays className="size-4" /> {event.otDateTime}</span>
              </div>
              <div className={`ot-detail-countdown ${countdown.ended ? 'is-ended' : ''}`} aria-label={countdown.ended ? 'This event has ended' : 'Time remaining until the event'}>
                {countdown.ended ? (
                  <strong>EVENT ENDED</strong>
                ) : (
                  <>
                    <span><strong key={`days-${countdown.days}`}>{String(countdown.days).padStart(2, '0')}</strong><small>Days</small></span>
                    <i aria-hidden="true">:</i>
                    <span><strong key={`hours-${countdown.hours}`}>{String(countdown.hours).padStart(2, '0')}</strong><small>Hours</small></span>
                    <i aria-hidden="true">:</i>
                    <span><strong key={`minutes-${countdown.minutes}`}>{String(countdown.minutes).padStart(2, '0')}</strong><small>Minutes</small></span>
                    <i aria-hidden="true">:</i>
                    <span><strong key={`seconds-${countdown.seconds}`}>{String(countdown.seconds).padStart(2, '0')}</strong><small>Seconds</small></span>
                  </>
                )}
              </div>
            </div>
            <div className="ot-detail-price-pass">
              <small>Tickets from</small>
              <strong>{formatZAR(event.startsFrom)}</strong>
              <span><Ticket className="size-4" /> ADMIT ONE</span>
            </div>
          </div>
        </section>

        {/* ==============================================================
            2) OpenTickets Two-Column Detail Layout (row mt-4: col-md-8 + col-md-4)
           ============================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN (col-md-8 -> 8 cols): About + Location */}
          <div className="ot-detail-left-column space-y-6 lg:col-span-8">
            {/* About Card */}
            <article className="ot-detail-info-ticket">
              <div className="ot-detail-section-heading">
                <span><Info className="size-4" /></span>
                <div><small>EVENT GUIDE</small><h2>About {event.title}</h2></div>
              </div>
              <div className="ot-detail-rich-copy">
                <div
                  id="event-about-copy"
                  className={`ot-detail-about-copy ${aboutExpanded ? 'is-expanded' : ''}`}
                >
                  {event.aboutParagraphs.map((p, idx) => (
                    <p key={idx}>{p}</p>
                  ))}
                  {event.aboutBullets.length > 0 && (
                    <ul className="mt-3 list-disc space-y-2 pl-5">
                      {event.aboutBullets.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <button
                  type="button"
                  className="ot-detail-learn-more"
                  onClick={() => setAboutExpanded((expanded) => !expanded)}
                  aria-expanded={aboutExpanded}
                  aria-controls="event-about-copy"
                >
                  {aboutExpanded ? 'Show less' : 'Learn more'}
                  {aboutExpanded ? <ChevronUp className="size-4" /> : <ChevronDown className="size-4" />}
                </button>

                <div className="ot-detail-organizer-line">
                  Organized by <strong className="text-[#3a3b45] dark:text-foreground">{event.organizerName}</strong> · Category:{' '}
                  <Link
                    to={`/events?category=${encodeURIComponent(event.category)}`}
                    className="font-semibold text-[#4e73df] hover:underline"
                  >
                    {event.category}
                  </Link>
                </div>
              </div>
            </article>

            {/* Location Card */}
            <article className="ot-detail-info-ticket ot-detail-location-ticket">
              <div className="ot-detail-section-heading">
                <span><Navigation className="size-4" /></span>
                <div><small>VENUE</small><h2>Location</h2></div>
              </div>
              <p className="ot-detail-address">
                <strong className="text-[#3a3b45] dark:text-foreground">{event.venue}</strong>:{' '}
                {event.fullAddress}
              </p>

              {/* Embedded Static-Style Venue Map Card (Zero broken API key!) */}
              <div className="ot-detail-map">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 800 260"
                  className="h-full w-full object-cover"
                  preserveAspectRatio="xMidYMid slice"
                >
                  <rect width="800" height="260" className="fill-[#e9eef3] dark:fill-[#0a1f20]" />
                  {/* Park & Lake Polygons */}
                  <path
                    d="M0 180 Q 180 140 310 210 T 620 190 L 800 230 L 800 260 L 0 260 Z"
                    className="fill-[#cbe6d3] dark:fill-[#123832]"
                  />
                  <path
                    d="M520 0 Q 560 95 660 120 T 800 145 L 800 95 Q 690 80 610 0 Z"
                    className="fill-[#b7dcf4] dark:fill-[#0e2e3d]"
                  />
                  {/* Street Grid */}
                  <g className="stroke-white dark:stroke-[#183d3f]" strokeWidth="7" fill="none">
                    <path d="M-20 55 L 820 115" />
                    <path d="M-20 155 L 820 85" />
                    <path d="M180 -10 L 235 270" />
                    <path d="M405 -10 L 385 270" />
                    <path d="M615 -10 L 565 270" />
                  </g>
                  {/* Main Highway Accent */}
                  <path
                    d="M-20 155 L 820 85"
                    className="stroke-[#fbd38d] dark:stroke-[#f2c318]/40"
                    strokeWidth="3.5"
                    fill="none"
                  />
                  {/* Red Map Pin at Center (395, 118) */}
                  <g transform="translate(395, 118)">
                    <circle cx="0" cy="4" r="18" fill="rgba(231,74,59,0.22)" />
                    <path
                      d="M0 -28 C -11 -28 -20 -19 -20 -8 C -20 7 0 24 0 24 C 0 24 20 7 20 -8 C 20 -19 11 -28 0 -28 Z"
                      fill="#e74a3b"
                    />
                    <circle cx="0" cy="-9" r="6.5" fill="#ffffff" />
                  </g>
                </svg>

                <div className="ot-detail-map-caption">
                  <span className="truncate font-semibold text-[#3a3b45] dark:text-foreground">
                    {event.venue} · {event.city}
                  </span>
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      `${event.venue}, ${event.fullAddress}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-bold text-[#4e73df] hover:underline"
                  >
                    Open in Google Maps
                    <ExternalLink className="size-3" />
                  </a>
                </div>
              </div>
            </article>
          </div>

          {/* Premium sticky booking pass */}
          <div className="ot-detail-booking-column lg:col-span-4">
            <aside className="ot-booking-ticket sticky top-20">
              <span className="ot-booking-cut ot-booking-cut-left" aria-hidden="true" />
              <span className="ot-booking-cut ot-booking-cut-right" aria-hidden="true" />

              <div className="ot-booking-head">
                <div>
                  <small>OFFICIAL TICKET DESK</small>
                  <h2>Book your pass</h2>
                </div>
                <span><Ticket className="size-5" /></span>
              </div>

              <div className="ot-booking-notice" role="alert">
                <ShieldCheck className="size-5" />
                <p>Have your email and payment method ready. Your selected tickets are held for a limited time during checkout.</p>
              </div>

              <div className="ot-booking-tier-list">
                <div className="ot-booking-tier-label">
                  <span>Available tickets</span><small>{event.ticketTiers.length} OPTIONS</small>
                </div>
                {event.ticketTiers.map((tier, index) => (
                  <div className="ot-booking-tier" key={tier.id}>
                    <span className="ot-booking-tier-index">{String(index + 1).padStart(2, '0')}</span>
                    <div><strong>{tier.seatCategory}</strong><small>{tier.priceCategoryLabel}</small></div>
                    <span className="ot-booking-tier-price"><small>FROM</small><strong>{formatZAR(tier.price)}</strong></span>
                  </div>
                ))}
              </div>

              {!inQueue ? (
                <button type="button" onClick={handleBookNowClick} className="ot-booking-cta">
                  <Ticket className="size-4" /> Book Now <span>→</span>
                </button>
              ) : (
                <div className="ot-booking-queue">
                  <strong>Checking live availability…</strong>
                  <div className="ot-queue-track"><div className="ot-queue-bar" /></div>
                </div>
              )}

              <div className="ot-booking-foot">
                <span className="ot-booking-barcode" aria-hidden="true" />
                <small>SECURE CHECKOUT · OPEN TICKETS ZA</small>
              </div>
            </aside>
          </div>
        </div>

        {/* Related Events Section using OpenTickets Cards */}
        {relatedEvents.length > 0 && (
          <section className="mt-12 space-y-5">
            <h2 className="font-sans text-lg font-bold text-foreground sm:text-xl">
              More in {event.category}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedEvents.map((rel) => (
                <OpenTicketsCard key={rel.id} event={rel} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* ==============================================================
          3) OPENTICKETS.CO.ZA "SELECT TICKETS" MODAL
         ============================================================== */}
      {showSelectModal && (
        <div
          className="ot-font fixed inset-0 z-[85] flex items-center justify-center bg-black/55 p-4 backdrop-blur-xs"
          onClick={() => setShowSelectModal(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-lg bg-white shadow-2xl dark:bg-[#0e2627] dark:ring-1 dark:ring-white/15"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-3.5 dark:border-white/10">
              <h3 className="text-[17px] font-bold text-[#3a3b45] dark:text-white">Select Tickets</h3>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setShowSelectModal(false)}
                className="text-gray-400 hover:text-gray-700 dark:hover:text-white cursor-pointer"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body: Tier Cards */}
            <div className="max-h-[62vh] space-y-3 overflow-y-auto p-5">
              {event.ticketTiers.map((tier) => {
                const qty = selectedQty[tier.id] || 0;
                return (
                  <div
                    key={tier.id}
                    className="overflow-hidden rounded-md border border-gray-200 shadow-xs dark:border-white/12"
                  >
                    <div className="bg-[#f8f9fc] px-4 py-2 dark:bg-[#091a1b]">
                      <h4 className="text-[15px] font-bold text-[#3a3b45] dark:text-white">
                        {tier.seatCategory}
                      </h4>
                    </div>
                    <div className="flex items-center justify-between bg-white px-4 py-3 dark:bg-[#0e2627]">
                      <div>
                        <span className="block text-[14px] font-bold text-[#3a3b45] dark:text-gray-100">
                          {tier.priceCategoryLabel}
                        </span>
                      </div>

                      <div className="flex items-center">
                        <span className="mr-4 text-[14.5px] font-bold text-[#3a3b45] dark:text-white">
                          {formatZAR(tier.price)}
                        </span>

                        <button
                          type="button"
                          onClick={() => decrementTier(tier.id)}
                          disabled={qty === 0}
                          aria-label={`Decrease ${tier.seatCategory}`}
                          className="text-[#858796] transition-opacity hover:text-[#3a3b45] disabled:opacity-35 dark:hover:text-white cursor-pointer"
                        >
                          <MinusCircle className="size-6" />
                        </button>

                        <span className="mx-3 w-6 text-center text-[15px] font-bold text-[#3a3b45] dark:text-white">
                          {qty}
                        </span>

                        <button
                          type="button"
                          onClick={() => incrementTier(tier.id)}
                          disabled={!canAddMore}
                          aria-label={`Increase ${tier.seatCategory}`}
                          className={`transition-transform active:scale-95 cursor-pointer ${
                            canAddMore ? 'text-[#1cc88a] hover:text-[#17a673]' : 'text-[#858796] opacity-40'
                          }`}
                        >
                          <PlusCircle className="size-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              <p className="pt-1 text-right text-xs text-[#858796] dark:text-muted-foreground">
                Selected: <strong>{totalSelected}</strong> / 10 max tickets
              </p>
            </div>

            {/* Modal Footer: Cancel | Add */}
            <div className="grid grid-cols-2 gap-3 bg-[#f8f9fc] px-5 py-3.5 dark:bg-[#091a1b]">
              <button
                type="button"
                onClick={() => setShowSelectModal(false)}
                className="ot-btn-outline-secondary w-full"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={totalSelected === 0 || addingToCart}
                onClick={handleConfirmAdd}
                className="ot-btn-primary w-full"
              >
                {addingToCart ? 'Adding...' : `Add${totalSelected > 0 ? ` (${totalSelected})` : ''}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};
