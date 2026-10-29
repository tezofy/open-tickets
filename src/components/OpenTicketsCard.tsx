import React from 'react';
import { Link } from 'react-router-dom';
import { EventItem, getEventHref } from '../data/events';

interface OpenTicketsCardProps {
  event: EventItem;
}

export const OpenTicketsCard: React.FC<OpenTicketsCardProps> = ({ event }) => {
  const isSquareBanner = event.bannerImage === event.squareImage;

  return (
    <Link
      to={getEventHref(event)}
      className="ot-e-card ot-font group focus-visible:ring-2 focus-visible:ring-[#4e73df] focus-visible:outline-none"
    >
      {/* OpenTickets m-card-cover (140px height, bg-light #f8f9fc) */}
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
          className={`relative z-10 h-full w-full transition-transform duration-300 group-hover:scale-[1.02] ${
            isSquareBanner ? 'object-contain' : 'object-cover'
          }`}
        />
      </div>

      {/* OpenTickets card-body p-0 -> row no-gutters align-items-center */}
      <div className="p-0">
        <div className="flex items-center">
          {/* col-2 auto py-3 pl-3 */}
          <div className="w-[18%] min-w-[60px] shrink-0 py-3 pl-3">
            <div className="ot-date-badge">
              <h6 className="ot-day-num">{event.dayNum}</h6>
              <small className="ot-month-txt">{event.monthShort}</small>
            </div>
          </div>

          {/* col-10 p-3 */}
          <div className="min-w-0 flex-1 p-3">
            <p className="ot-card-title" title={event.title}>
              {event.title}
            </p>
            <div className="ot-card-meta">
              <div className="flex items-center gap-1.5 truncate">
                {/* FontAwesome fa-map-marker-alt exact vector */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 384 512"
                  className="size-3 shrink-0 fill-current opacity-85"
                >
                  <path d="M172.268 501.67C26.97 291.031 0 269.413 0 192 0 85.961 85.961 0 192 0s192 85.961 192 192c0 77.413-26.97 99.031-172.268 309.67-9.535 13.774-29.93 13.773-39.464 0zM192 272c44.183 0 80-35.817 80-80s-35.817-80-80-80-80 35.817-80 80 35.817 80 80 80z" />
                </svg>
                <span className="truncate">{event.venue}</span>
              </div>
              <span className="mt-0.5 block truncate">{event.otDateTime}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};
