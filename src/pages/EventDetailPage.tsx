import React, { useMemo, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ExternalLink, MinusCircle, PlusCircle, X } from 'lucide-react';
import { EVENTS, findEventBySlug, formatZAR } from '../data/events';
import { useApp } from '../context/AppContext';
import { OpenTicketsCard } from '../components/OpenTicketsCard';

export const EventDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string; organizerSlug?: string }>();
  const navigate = useNavigate();
  const { addTicketsToCart } = useApp();

  const event = useMemo(() => findEventBySlug(slug), [slug]);

  const [inQueue, setInQueue] = useState(false);
  const [showSelectModal, setShowSelectModal] = useState(false);
  const [selectedQty, setSelectedQty] = useState<Record<string, number>>({});
  const [addingToCart, setAddingToCart] = useState(false);

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
        <div className="ot-detail-surface overflow-hidden">
          <div className="relative max-h-[450px] w-full overflow-hidden bg-[#f8f9fc] dark:bg-[#071718]">
            {isSquareBanner && (
              <img
                src={event.bannerImage}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-30 blur-xl"
              />
            )}
            <img
              src={event.bannerImage}
              alt={event.title}
              className={`relative z-10 w-full ${
                isSquareBanner ? 'max-h-[380px] object-contain mx-auto' : 'max-h-[450px] object-cover'
              }`}
            />
          </div>

          {/* OpenTickets card-body p-3 */}
          <div className="p-4 sm:px-5 sm:py-4">
            <h1 className="text-[17px] font-bold text-[#3a3b45] sm:text-[19px] dark:text-[#f2f7f7]">
              {event.title}
            </h1>
            <div className="mt-1.5 flex flex-wrap items-center gap-y-1 text-[13.5px]">
              <span className="inline-flex items-center gap-1.5 text-[#858796] dark:text-[#9cb2b2]">
                <svg aria-hidden="true" viewBox="0 0 384 512" className="size-3.5 shrink-0 fill-current">
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                </svg>
                {event.venue}
              </span>

              <span className="ml-4 inline-flex items-center gap-1.5 font-semibold text-[#e74a3b] dark:text-[#ff6568]">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 448 512"
                  className="size-3.5 shrink-0 fill-[#b7b9cc] dark:fill-[#738f90]"
                >
                  <path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 448C48 456.8 55.16 464 64 464H384C392.8 464 400 456.8 400 448V192H48V448z" />
                </svg>
                {event.otDateTime}
              </span>
            </div>
          </div>
        </div>

        {/* ==============================================================
            2) OpenTickets Two-Column Detail Layout (row mt-4: col-md-8 + col-md-4)
           ============================================================== */}
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* LEFT COLUMN (col-md-8 -> 8 cols): About + Location */}
          <div className="space-y-6 lg:col-span-8">
            {/* About Card */}
            <div className="ot-detail-surface p-6">
              <h2 className="mb-3.5 text-[18px] font-bold text-[#3a3b45] dark:text-[#f2f7f7]">
                About {event.title}
              </h2>
              <div className="space-y-3 text-[14.5px] leading-relaxed text-[#6e707e] dark:text-muted-foreground">
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
                <div className="mt-4 border-t border-black/8 pt-3 text-xs text-[#858796] dark:border-white/10 dark:text-muted-foreground">
                  Organized by <strong className="text-[#3a3b45] dark:text-foreground">{event.organizerName}</strong> · Category:{' '}
                  <Link
                    to={`/events?category=${encodeURIComponent(event.category)}`}
                    className="font-semibold text-[#4e73df] hover:underline"
                  >
                    {event.category}
                  </Link>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="ot-detail-surface p-6">
              <h2 className="mb-3 text-[18px] font-bold text-[#3a3b45] dark:text-[#f2f7f7]">
                Location
              </h2>
              <p className="mb-4 text-[14.5px] text-[#858796] dark:text-muted-foreground">
                <strong className="text-[#3a3b45] dark:text-foreground">{event.venue}</strong>:{' '}
                {event.fullAddress}
              </p>

              {/* Embedded Static-Style Venue Map Card (Zero broken API key!) */}
              <div className="relative h-52 w-full overflow-hidden rounded-lg border border-black/10 bg-[#eef2f6] dark:border-white/10 dark:bg-[#091c1d]">
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
                    className="stroke-[#fbd38d] dark:stroke-[#a9dd36]/40"
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

                <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-center justify-between gap-2 rounded-lg bg-white/92 px-3.5 py-2 text-xs shadow-md backdrop-blur-sm dark:bg-[#0e2627]/92">
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
            </div>
          </div>

          {/* RIGHT COLUMN (col-md-4 -> 4 cols): OpenTickets Book Now Widget */}
          <div className="lg:col-span-4">
            <div className="ot-detail-surface sticky top-20 p-6">
              {/* Exact OpenTickets alert-info Box */}
              <div className="ot-alert-info mb-4" role="alert">
                Please ensure that you have your email address and payment method such as a card, 1Voucher, Banking App, banking app, etc. ready before you start booking. Once you start you will need those items and you will have limited time to complete your purchase.
              </div>

              <h2 className="mb-3 text-[18px] font-bold text-[#3a3b45] dark:text-[#f2f7f7]">
                Book Now
              </h2>

              <div className="mb-4">
                <p className="mb-2 text-[13px] text-[#858796] dark:text-muted-foreground">
                  Available Tickets:
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b border-black/6 dark:border-white/10">
                        <th className="py-1.5 pl-0 text-left text-[11px] font-bold tracking-wider text-[#858796] uppercase">
                          Seat Category
                        </th>
                        <th className="py-1.5 text-right text-[11px] font-bold tracking-wider text-[#858796] uppercase">
                          From
                        </th>
                        <th className="py-1.5 pr-0 text-right text-[11px] font-bold tracking-wider text-[#858796] uppercase">
                          To
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {event.ticketTiers.map((tier) => (
                        <tr key={tier.id}>
                          <td className="py-2 pr-2 pl-0 align-middle text-[15px] font-bold text-[#3a3b45] dark:text-foreground">
                            {tier.seatCategory}
                          </td>
                          <td className="py-2 px-1 text-right align-middle text-[15px] font-bold whitespace-nowrap text-[#3a3b45] dark:text-foreground">
                            {formatZAR(tier.price)}
                          </td>
                          <td className="py-2 pr-0 pl-2 text-right align-middle text-[15px] font-bold whitespace-nowrap text-[#3a3b45] dark:text-foreground">
                            {formatZAR(tier.maxPrice || tier.price)}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* OpenTickets Book Now Button & Queue Progress Indicator */}
              {!inQueue ? (
                <button
                  type="button"
                  onClick={handleBookNowClick}
                  className="ot-btn-primary w-full"
                >
                  Book Now
                </button>
              ) : (
                <div className="rounded-md border border-[#c7ebf1] bg-[#f1fbfd] p-3 text-xs text-[#1c606a] dark:border-sky-500/30 dark:bg-sky-950/30 dark:text-sky-200">
                  <div className="font-semibold">
                    You are in the queue, verifying real-time ticket availability...
                  </div>
                  <div className="ot-queue-track">
                    <div className="ot-queue-bar" />
                  </div>
                </div>
              )}
            </div>
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
