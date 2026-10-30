import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CalendarDays, MapPin, Ticket } from 'lucide-react';
import { EventItem, getEventHref } from '../data/events';

interface OpenTicketsCardProps {
  event: EventItem;
}

export const OpenTicketsCard: React.FC<OpenTicketsCardProps> = ({ event }) => {
  const isSquareBanner = event.bannerImage === event.squareImage;
  const price = new Intl.NumberFormat('en-ZA', {
    style: 'currency',
    currency: 'ZAR',
    maximumFractionDigits: 0,
  }).format(event.startsFrom);

  return (
    <Link
      to={getEventHref(event)}
      aria-label={`Get tickets for ${event.title}`}
      className="ot-e-card ot-font group focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:outline-none"
    >
      <div className="ot-card-cover">
        {isSquareBanner && (
          <img
            src={event.bannerImage}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full scale-110 object-cover opacity-25 blur-md"
          />
        )}
        <img
          src={event.bannerImage}
          alt={event.title}
          loading="lazy"
          className={`relative z-10 h-full w-full transition-transform duration-500 group-hover:scale-[1.04] ${
            isSquareBanner ? 'object-contain' : 'object-cover'
          }`}
        />
        <div className="ot-cover-shade" />

        <span className="ot-category-pill">{event.category}</span>
        <span className="ot-status-pill">
          <span className="ot-status-dot" />
          {event.status}
        </span>
      </div>

      <div className="ot-ticket-content">
        <div className="ot-floating-date" aria-label={`${event.dayNum} ${event.monthShort}`}>
          <span className="ot-floating-month">{event.monthShort}</span>
          <strong className="ot-floating-day">{event.dayNum}</strong>
        </div>

        <div className="ot-event-copy">
          <p className="ot-card-title" title={event.title}>{event.title}</p>
          <div className="ot-card-meta">
            <span className="ot-meta-line">
              <MapPin aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{event.venue}</span>
            </span>
            <span className="ot-meta-line">
              <CalendarDays aria-hidden="true" className="size-3.5 shrink-0" />
              <span className="truncate">{event.otDateTime}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="ot-ticket-stub">
        <span aria-hidden="true" className="ot-stub-notch ot-stub-notch-left" />
        <span aria-hidden="true" className="ot-stub-notch ot-stub-notch-right" />
        <span aria-hidden="true" className="ot-stub-perforation" />

        <span className="ot-price-block">
          <small>Starts from</small>
          <strong>{price}</strong>
        </span>

        <span className="ot-get-ticket-button">
          <Ticket aria-hidden="true" className="size-4" />
          Get Tickets
          <ArrowRight aria-hidden="true" className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};
