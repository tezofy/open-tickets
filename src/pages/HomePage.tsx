import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  Building2,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clapperboard,
  Disc3,
  Drama,
  Flame,
  Frame,
  Handshake,
  Headphones,
  Heart,
  MapPin,
  MicVocal,
  Music,
  Presentation,
  Rocket,
  Search,
  Shirt,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { EVENTS, getEventHref, POSTER_WALL_COLUMNS } from '../data/events';
import { OpenTicketsCard } from '../components/OpenTicketsCard';
import { OrganizerCtaBand } from '../components/OrganizerCtaBand';

const HOME_QUICK_CATEGORIES = [
  { name: 'Music', icon: Music },
  { name: 'Football', icon: Trophy },
  { name: 'Festival', icon: Sparkles },
  { name: 'Community', icon: Users },
  { name: 'Family', icon: Heart },
  { name: 'Business', icon: Presentation },
];

const AI_HERO_SLIDES = [
  { id: 'ai-concert', image: 'media/hero-ai-concert.jpg', squareImage: 'media/hero-ai-concert.jpg', eyebrow: 'LIVE MUSIC', title: 'Feel every beat.', subtitle: 'Big stages, electric nights and unforgettable performances.' },
  { id: 'ai-football', image: 'media/hero-ai-football.jpg', squareImage: 'media/hero-ai-football.jpg', eyebrow: 'MATCH DAY', title: 'Where the crowd comes alive.', subtitle: 'Be there for every chant, goal and stadium moment.' },
  { id: 'ai-festival', image: 'media/hero-ai-festival.jpg', squareImage: 'media/hero-ai-festival.jpg', eyebrow: 'FESTIVALS', title: 'Make a weekend of it.', subtitle: 'Music, culture and good people under an open sky.' },
  { id: 'ai-family', image: 'media/hero-ai-family.jpg', squareImage: 'media/hero-ai-family.jpg', eyebrow: 'FAMILY & COMMUNITY', title: 'Good times, all together.', subtitle: 'Local experiences made for every generation.' },
  { id: 'ai-outdoor', image: 'media/hero-ai-outdoor.jpg', squareImage: 'media/hero-ai-outdoor.jpg', eyebrow: 'OUTDOOR', title: 'Go beyond the ordinary.', subtitle: 'Fresh air, bold routes and stories worth bringing home.' },
];

interface PremiumNumberTicketProps {
  value: string;
  label: string;
  description: string;
  index: number;
  icon: React.ComponentType<{ className?: string }>;
}

const PremiumNumberTicket: React.FC<PremiumNumberTicketProps> = ({
  value,
  label,
  description,
  index,
  icon: Icon,
}) => {
  const cardRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [displayValue, setDisplayValue] = useState(/^\d+$/.test(value) ? '0' : value);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.28 },
    );
    observer.observe(card);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !/^\d+$/.test(value)) return;
    const target = Number(value);
    const duration = 900;
    const startedAt = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min((now - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(String(Math.round(target * eased)));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [isVisible, value]);

  const updateSpotlight = (event: React.PointerEvent<HTMLElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`);
    event.currentTarget.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`);
    event.currentTarget.style.setProperty('--spot-opacity', '1');
  };

  const hideSpotlight = (event: React.PointerEvent<HTMLElement>) => {
    event.currentTarget.style.setProperty('--spot-opacity', '0');
  };

  const code = `OT-ZA-${String(index + 1).padStart(2, '0')}${String(value).padStart(2, '0')}`;

  return (
    <article
      ref={cardRef}
      onPointerMove={updateSpotlight}
      onPointerLeave={hideSpotlight}
      style={{ transitionDelay: `${index * 90}ms` }}
      className={`ot-number-ticket ${index === 0 ? 'ot-number-ticket-featured' : ''} ${isVisible ? 'is-visible' : ''}`}
    >
      <span className="ot-number-cut ot-number-cut-top" aria-hidden="true" />
      <span className="ot-number-cut ot-number-cut-bottom" aria-hidden="true" />

      <div className="ot-number-ticket-main">
        <div className="ot-number-ticket-topline">
          <span className="ot-number-icon"><Icon className="size-4" /></span>
          <span className="ot-number-index">0{index + 1}</span>
        </div>
        <p className="ot-number-value" aria-label={value}>{displayValue}</p>
        <p className="ot-number-label">{label}</p>
        <p className="ot-number-copy">{description}</p>
      </div>

      <div className="ot-number-ticket-stub" aria-hidden="true">
        <span className="ot-number-code">{code}</span>
        <span className="ot-number-barcode" />
      </div>
    </article>
  );
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const heroSlides = AI_HERO_SLIDES;

  const [slideIdx, setSlideIdx] = useState(0);
  const [previousSlideIdx, setPreviousSlideIdx] = useState<number | null>(null);
  const [heroPaused, setHeroPaused] = useState(false);
  const [heroQuery, setHeroQuery] = useState('');
  const heroTransitionTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const changeHeroSlide = (nextIndex: number) => {
    if (nextIndex === slideIdx || heroSlides.length <= 1) return;
    setPreviousSlideIdx(slideIdx);
    setSlideIdx(nextIndex);
    if (heroTransitionTimer.current) clearTimeout(heroTransitionTimer.current);
    heroTransitionTimer.current = setTimeout(() => setPreviousSlideIdx(null), 1450);
  };

  useEffect(() => {
    if (heroPaused || heroSlides.length <= 1) return;
    const t = setInterval(() => {
      changeHeroSlide((slideIdx + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(t);
  }, [heroPaused, heroSlides.length, slideIdx]);

  useEffect(() => () => {
    if (heroTransitionTimer.current) clearTimeout(heroTransitionTimer.current);
  }, []);

  const submitHeroSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const query = heroQuery.trim();
    navigate(query ? `/events?q=${encodeURIComponent(query)}` : '/events');
  };

  return (
    <main id="main-content" className="flex-1 bg-background text-foreground">
      <h1 className="sr-only">Open Tickets — tickets for events across South Africa</h1>

      {/* 1. FEATURED EVENTS HERO CAROUSEL */}
      <section
        aria-label="Featured events"
        aria-roledescription="carousel"
        className="mx-auto w-full max-w-7xl px-4 pt-4 sm:px-6 sm:pt-8"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className="ot-home-hero-shell group/hero">
          <div
            onClick={() => navigate('/events')}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate('/events');
            }}
            className="ot-home-hero-ticket"
          >
            <span className="ot-home-hero-edge-cut ot-home-hero-edge-cut-left" aria-hidden="true" />
            <span className="ot-home-hero-edge-cut ot-home-hero-edge-cut-right" aria-hidden="true" />
            {heroSlides.map((slide, idx) => (
              <article
                key={slide.id}
                aria-hidden={idx !== slideIdx}
                className={`ot-home-hero-slide ${idx === slideIdx ? 'is-active' : ''} ${idx === previousSlideIdx ? 'is-leaving' : ''}`}
              >
                <div className="ot-home-hero-media">
                  <img src={slide.image} alt={slide.title} className="ot-home-hero-image" />
                  <div className="ot-home-hero-scrim" aria-hidden="true" />
                  <div className="ot-home-hero-media-topline">
                    <span><Sparkles className="size-3" /> AI curated experience</span>
                    <small>OPEN TICKETS · ZA</small>
                  </div>
                  <div className="ot-home-hero-media-copy">
                    <span>{slide.eyebrow}</span>
                    <strong>{slide.title}</strong>
                    <p>{slide.subtitle}</p>
                  </div>
                  <span className="ot-home-hero-slide-count">{String(idx + 1).padStart(2, '0')} / {String(heroSlides.length).padStart(2, '0')}</span>
                </div>
              </article>
            ))}

            <div className="ot-home-mobile-static-tools" onClick={(event) => event.stopPropagation()}>
              <form className="ot-home-hero-mobile-search" onSubmit={submitHeroSearch}>
                <Search className="size-4" />
                <input value={heroQuery} onChange={(event) => setHeroQuery(event.target.value)} placeholder="Search events" aria-label="Search events" />
                <button type="submit" aria-label="Submit search"><ArrowRight className="size-4" /></button>
              </form>

            </div>

            <button
              type="button"
              aria-label="Previous featured event"
              onClick={(e) => {
                e.stopPropagation();
                changeHeroSlide((slideIdx - 1 + heroSlides.length) % heroSlides.length);
              }}
              className="ot-home-hero-nav ot-home-hero-nav-prev"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next featured event"
              onClick={(e) => {
                e.stopPropagation();
                changeHeroSlide((slideIdx + 1) % heroSlides.length);
              }}
              className="ot-home-hero-nav ot-home-hero-nav-next"
            >
              <ChevronRight className="size-5" />
            </button>

            <div className="ot-home-hero-pagination" onClick={(e) => e.stopPropagation()}>
              {heroSlides.map((slide, idx) => (
                <button
                  key={slide.id}
                  type="button"
                  aria-label={`Show ${slide.title}`}
                  onClick={() => changeHeroSlide(idx)}
                  className={idx === slideIdx ? 'is-active' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="ot-home-discovery-tools" aria-label="Search and event categories">
        <form className="ot-home-hero-search" onSubmit={submitHeroSearch}>
          <Search className="size-5" />
          <input value={heroQuery} onChange={(event) => setHeroQuery(event.target.value)} placeholder="Search events, venues or organizers" aria-label="Search events, venues or organizers" />
          <button type="submit">Search events <ArrowRight className="size-4" /></button>
        </form>

        <nav className="ot-home-category-links" aria-label="Event categories">
          {HOME_QUICK_CATEGORIES.map(({ name, icon: Icon }) => (
            <Link key={name} to={`/events?category=${encodeURIComponent(name)}`}>
              <span><Icon className="size-4" /></span>
              <small>{name}</small>
            </Link>
          ))}
        </nav>
      </section>

      {/* MAIN CONTAINER: HAPPENING NOW + ON SALE NOW (OPENTICKETS CARDS) + STATS */}
      <div className="mx-auto w-full max-w-7xl space-y-14 px-4 pt-6 sm:space-y-16 sm:px-6 sm:pt-8">
        {/* 4. ON SALE NOW — USING OPENTICKETS.CO.ZA EVENT CARD DESIGN */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">Tickets available now</h2>
            <Link
              to="/events"
              className="group inline-flex items-center gap-1.5 rounded-full bg-foreground/[0.04] px-3.5 py-1.5 text-xs font-semibold text-foreground transition-colors hover:bg-accent/15 hover:text-accent-emphasis sm:text-sm"
            >
              View all
              <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* OpenTickets 3-column e-card grid */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {EVENTS.slice(0, 18).map((ev) => (
              <OpenTicketsCard key={ev.id} event={ev} />
            ))}
          </div>
        </section>

        {/* 5. OPENTICKETS IN NUMBERS — TICKET COUNTER BOARD */}
        <section className="ot-numbers-panel" aria-labelledby="numbers-title">
          <div className="ot-numbers-glow" aria-hidden="true" />
          <div className="ot-numbers-header">
            <div>
              <span className="ot-numbers-eyebrow">
                <span className="ot-numbers-live-dot" />
                Live platform snapshot
              </span>
              <h2 id="numbers-title" className="ot-numbers-title">Open Tickets in numbers</h2>
              <p className="ot-numbers-intro">A quick look at what is happening across our ticketing network.</p>
            </div>
            <div className="ot-numbers-mark" aria-hidden="true">
              <Ticket className="size-5" />
              <span>OT / 2026</span>
            </div>
          </div>

          <div className="ot-numbers-grid">
            {[
              {
                num: String(EVENTS.length),
                label: 'Listed events',
                short: 'Events ready to discover',
                icon: Calendar,
              },
              {
                num: String(new Set(EVENTS.map((event) => event.venue)).size),
                label: 'Venues',
                short: 'Places bringing people together',
                icon: MapPin,
              },
              {
                num: String(EVENTS.reduce((total, event) => total + event.ticketTiers.length, 0)),
                label: 'Ticket categories',
                short: 'Ways to find your perfect seat',
                icon: Ticket,
              },
              {
                num: 'ZA',
                label: 'South Africa',
                short: 'One growing live-events market',
                icon: Building2,
              },
            ].map((stat, index) => (
              <PremiumNumberTicket
                key={stat.label}
                value={stat.num}
                label={stat.label}
                description={stat.short}
                icon={stat.icon}
                index={index}
              />
            ))}
          </div>
        </section>
      </div>

      {/* 6. 3D TILTED POSTER WALL ("YOUR TICKET TO WHAT'S ON, IN A COUPLE OF TAPS.") */}
      <div className="mx-auto mt-14 w-full max-w-7xl px-4 sm:mt-16 sm:px-6">
        <section className="ot-poster-ticket-cta">
          <span aria-hidden="true" className="ot-poster-ticket-notch ot-poster-ticket-notch-left" />
          <span aria-hidden="true" className="ot-poster-ticket-notch ot-poster-ticket-notch-right" />
          <span aria-hidden="true" className="ot-poster-ticket-perforation" />
          <span aria-hidden="true" className="ot-poster-ticket-stub">
            <Ticket className="size-4" />
            <span>ADMIT ONE</span>
            <small>OT · DISCOVER · 2026</small>
          </span>

          <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="flex h-full w-full items-center justify-center">
              <div className="h-[1100px] w-[1350px] shrink-0 scale-55 sm:scale-75 lg:scale-95">
                <div
                  className="grid h-full w-full grid-cols-4 gap-6"
                  style={{ transform: 'rotateX(52deg) rotateY(0deg) rotateZ(-42deg)' }}
                >
                  {POSTER_WALL_COLUMNS.map((col, cIdx) => (
                    <div
                      key={cIdx}
                      className={`flex flex-col gap-6 ${cIdx % 2 === 0 ? 'poster-col-up' : 'poster-col-down'}`}
                    >
                      {col.map((imgSrc, iIdx) => (
                        <img
                          key={`${cIdx}-${iIdx}`}
                          src={imgSrc}
                          alt=""
                          loading="lazy"
                          className="aspect-[970/700] w-full rounded-xl object-cover shadow-md ring-1 ring-black/10"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="ot-poster-wall-veil" />
          </div>

          <div className="ot-ticket-discovery-content">
            <div className="ot-ticket-discovery-copy">
              <span className="ot-ticket-discovery-kicker">
                <Sparkles className="size-3.5" />
                This week&apos;s live picks
              </span>
              <h2>
                Your next great weekend<br />
                <span>starts here.</span>
              </h2>
              <p>
                Explore concerts, sports, festivals and more. Book quickly and keep your mobile ticket ready for the gate.
              </p>
              <div className="ot-ticket-discovery-actions">
                <Link to="/events" className="opentickets-glow group/cta">
                  Browse events
                  <ArrowRight className="size-4 transition-transform duration-150 group-hover/cta:translate-x-1" />
                </Link>
                <span><Ticket className="size-3.5" /> Instant mobile delivery</span>
              </div>
            </div>

            <div className="ot-ticket-poster-stack" aria-hidden="true">
              {heroSlides.slice(0, 3).map((event, index) => (
                <img
                  key={event.id}
                  src={event.squareImage}
                  alt=""
                  loading="lazy"
                  className={`ot-ticket-stack-poster ot-ticket-stack-poster-${index + 1}`}
                />
              ))}
              <span className="ot-ticket-stack-label">
                <small>CURATED NOW</small>
                <strong>03 LIVE PICKS</strong>
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* 7. ORGANIZER CTA BAND */}
      <OrganizerCtaBand />
    </main>
  );
};
