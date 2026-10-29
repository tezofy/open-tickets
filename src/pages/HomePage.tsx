import React, { useEffect, useState } from 'react';
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
  Shirt,
  Sparkles,
  Ticket,
  Trophy,
  Users,
  Wrench,
} from 'lucide-react';
import { CATEGORIES, EVENTS, getEventHref, POSTER_WALL_COLUMNS } from '../data/events';
import { OpenTicketsCard } from '../components/OpenTicketsCard';
import { OrganizerCtaBand } from '../components/OrganizerCtaBand';
import { useApp } from '../context/AppContext';

const CATEGORY_ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  mic: MicVocal,
  trophy: Trophy,
  Drama: Drama,
  wrench: Wrench,
  heart: Heart,
  sparkles: Sparkles,
  award: Award,
  shirt: Shirt,
  users: Users,
  presentation: Presentation,
  handshake: Handshake,
  frame: Frame,
  rocket: Rocket,
  clapperboard: Clapperboard,
  disc: Disc3,
  flame: Flame,
  music: Music,
  headphones: Headphones,
};

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { setStoryEventId } = useApp();
  const heroSlides = EVENTS.filter((e) => e.featuredInHero);
  const happeningStories = EVENTS.filter((e) => e.happeningNow);

  const [slideIdx, setSlideIdx] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);

  useEffect(() => {
    if (heroPaused || heroSlides.length <= 1) return;
    const t = setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % heroSlides.length);
    }, 4800);
    return () => clearInterval(t);
  }, [heroPaused, heroSlides.length]);

  const activeSlide = heroSlides[slideIdx] || heroSlides[0];

  return (
    <main id="main-content" className="flex-1 bg-background text-foreground">
      <h1 className="sr-only">Open Tickets — tickets for events across South Africa</h1>

      {/* 1. FEATURED EVENTS HERO CAROUSEL */}
      <section
        aria-label="Featured events"
        aria-roledescription="carousel"
        className="mx-auto w-full max-w-7xl px-3 pt-4 sm:px-10 sm:pt-8 lg:px-14"
        onMouseEnter={() => setHeroPaused(true)}
        onMouseLeave={() => setHeroPaused(false)}
      >
        <div className="relative group/hero">
          <div
            onClick={() => navigate(getEventHref(activeSlide))}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter') navigate(getEventHref(activeSlide));
            }}
            className="relative aspect-[8/9] w-full cursor-pointer overflow-hidden rounded-[22px] bg-pine-n80 text-paper shadow-[0_20px_40px_rgba(0,0,0,0.18)] sm:aspect-[16/6] sm:rounded-[28px] focus-visible:ring-2 focus-visible:ring-volt focus-visible:outline-none"
          >
            {heroSlides.map((slide, idx) => (
              <div
                key={slide.id}
                aria-hidden={idx !== slideIdx}
                className={`absolute inset-0 transition-opacity duration-700 ease-out ${
                  idx === slideIdx ? 'z-10 opacity-100' : 'z-0 opacity-0 pointer-events-none'
                }`}
              >
                {/* Mobile 8:9 Square/Portrait Cover */}
                <img
                  src={slide.squareImage}
                  alt={slide.title}
                  className="h-full w-full object-cover sm:hidden"
                />
                {/* Desktop 16:6 Wide Cover */}
                <img
                  src={slide.bannerImage}
                  alt={slide.title}
                  className="hidden h-full w-full object-cover sm:block"
                />

                {/* Bottom Cinematic Scrim + Date & Title */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/45 px-2.5 py-1 text-[11px] font-bold tracking-wide text-volt backdrop-blur-md">
                    {slide.heroDateLabel}
                  </span>
                  <h2 className="mt-2 max-w-2xl font-heading text-lg leading-snug font-extrabold tracking-tight text-white drop-shadow-sm sm:text-2xl lg:text-3xl">
                    {slide.title}
                  </h2>
                </div>
              </div>
            ))}

            {/* Left / Right Controls */}
            <button
              type="button"
              aria-label="Previous slide"
              onClick={(e) => {
                e.stopPropagation();
                setSlideIdx((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
              }}
              className="absolute top-1/2 left-3 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition-opacity hover:bg-black/70 sm:left-4 sm:size-10 sm:opacity-0 sm:group-hover/hero:opacity-100 cursor-pointer"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              aria-label="Next slide"
              onClick={(e) => {
                e.stopPropagation();
                setSlideIdx((prev) => (prev + 1) % heroSlides.length);
              }}
              className="absolute top-1/2 right-3 z-20 grid size-9 -translate-y-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-md transition-opacity hover:bg-black/70 sm:right-4 sm:size-10 sm:opacity-0 sm:group-hover/hero:opacity-100 cursor-pointer"
            >
              <ChevronRight className="size-5" />
            </button>

            {/* Pagination Dots */}
            <div
              className="absolute right-5 bottom-5 z-20 hidden items-center gap-1.5 sm:flex"
              onClick={(e) => e.stopPropagation()}
            >
              {heroSlides.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  aria-label={`Slide ${idx + 1}`}
                  onClick={() => setSlideIdx(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                    idx === slideIdx ? 'w-6 bg-volt' : 'w-1.5 bg-white/45 hover:bg-white/75'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. BROWSE YOUR WAY (OPENTICKETS VERTICAL NOTCHED TICKETS MARQUEE) */}
      <section aria-labelledby="home-categories-title" className="mt-6 overflow-x-hidden pt-5 sm:mt-8 sm:pt-7">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div className="flex items-center justify-between gap-4">
            <h2 id="home-categories-title" className="truncate text-lg font-bold text-foreground sm:text-xl">
              Browse your way
            </h2>
          </div>
        </div>

        <div className="opentickets-rail relative mx-auto mt-5 max-w-7xl overflow-x-auto no-scrollbar sm:mt-6">
          <div className="opentickets-marquee-track pt-2 pb-8">
            {[0, 1].map((dup) => (
              <div key={dup} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4">
                {CATEGORIES.map((cat) => {
                  const IconComp = CATEGORY_ICON_MAP[cat.lucideKey] || Sparkles;
                  return (
                    <Link
                      key={`${dup}-${cat.name}`}
                      to={`/events?category=${encodeURIComponent(cat.name)}`}
                      className="opentickets-ticket group relative isolate block aspect-[4/5] w-[148px] shrink-0 rounded-2xl [filter:drop-shadow(0_10px_16px_rgb(4_14_14/0.16))] transition-transform duration-200 hover:-translate-y-1 sm:w-44 sm:rounded-[22px] dark:[filter:drop-shadow(0_10px_16px_rgb(0_0_0/0.55))]"
                    >
                      <div className="opentickets-ticket-body absolute inset-0 overflow-hidden rounded-[inherit] bg-surface">
                        <div className="absolute inset-x-0 top-0 h-[72%] overflow-hidden bg-pine-n80">
                          <span className="absolute inset-1/4 flex items-center justify-center">
                            {cat.iconPng ? (
                              <img
                                src={cat.iconPng}
                                alt=""
                                draggable={false}
                                className="h-full w-full object-contain brightness-0 invert transition-transform duration-200 group-hover:scale-110"
                              />
                            ) : (
                              <IconComp className="size-12 text-white transition-transform duration-200 group-hover:scale-110" />
                            )}
                          </span>
                          <div className="absolute inset-0 bg-gradient-to-t from-pine-n80/45 via-transparent to-transparent" />
                          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-volt/25 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
                        </div>

                        <span
                          aria-hidden="true"
                          className="opentickets-ticket-perforation pointer-events-none absolute inset-x-2 top-[72%] h-px"
                        />

                        <span className="absolute inset-x-0 top-[72%] bottom-0 flex items-center gap-2 px-3 sm:px-3.5">
                          <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-accent/15 text-accent-emphasis sm:size-8 dark:text-volt">
                            <IconComp className="size-3.5 sm:size-4" />
                          </span>
                          <span className="min-w-0 flex-1 truncate text-[13px] font-semibold tracking-tight text-foreground sm:text-sm">
                            {cat.name}
                          </span>
                          <ArrowUpRight className="size-4 shrink-0 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent-emphasis dark:group-hover:text-volt" />
                        </span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAIN CONTAINER: HAPPENING NOW + ON SALE NOW (OPENTICKETS CARDS) + STATS */}
      <div className="mx-auto w-full max-w-7xl space-y-14 px-4 pt-6 sm:space-y-16 sm:px-6 sm:pt-8">
        {/* 3. HAPPENING NOW (STORY RINGS) */}
        <section className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">Happening now</h2>
          </div>

          <div className="-mx-4 flex gap-3.5 overflow-x-auto no-scrollbar px-4 py-2 sm:mx-0 sm:px-0">
            {happeningStories.map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setStoryEventId(st.id)}
                className="group flex w-16 shrink-0 flex-col items-center gap-1.5 focus-visible:outline-none sm:w-20 cursor-pointer"
              >
                <span className="relative inline-block rounded-full bg-gradient-to-tr from-volt via-pine to-volt p-[2.5px] transition-transform duration-200 group-hover:scale-105">
                  <span className="block rounded-full bg-background p-[2px]">
                    <span className="relative block size-14 overflow-hidden rounded-full sm:size-16">
                      <img src={st.squareImage} alt={st.title} className="h-full w-full object-cover" />
                    </span>
                  </span>
                </span>
                <span className="w-full truncate text-center text-[11px] font-medium text-foreground/85">
                  {st.title}
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* 4. ON SALE NOW — USING OPENTICKETS.CO.ZA EVENT CARD DESIGN */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">On sale now</h2>
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

        {/* 5. OPENTICKETS IN NUMBERS */}
        <section className="space-y-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="truncate text-lg font-bold text-foreground sm:text-xl">Open Tickets in numbers</h2>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
            {[
              {
                num: String(EVENTS.length),
                suffix: '',
                label: 'Listed events',
                desc: 'Events in the public Open Tickets catalogue snapshot bundled with this project.',
                icon: Calendar,
              },
              {
                num: String(new Set(EVENTS.map((event) => event.venue)).size),
                suffix: '',
                label: 'Venues',
                desc: 'Distinct event venues appearing in the bundled listings.',
                icon: MapPin,
              },
              {
                num: String(EVENTS.reduce((total, event) => total + event.ticketTiers.length, 0)),
                suffix: '',
                label: 'Ticket categories',
                desc: 'Categories shown on the source event pages at capture time.',
                icon: Ticket,
              },
              {
                num: 'ZA',
                suffix: '',
                label: 'Market',
                desc: 'Events and venues listed on the South African Open Tickets website.',
                icon: Building2,
              },
            ].map((stat) => {
              const Icon = stat.icon;
              return (
                <div
                  key={stat.label}
                  className="relative overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-b from-volt-80 to-surface p-4 sm:rounded-3xl sm:p-5 dark:from-pine-n40 dark:to-pine-n80"
                >
                  {/* Decorative Grid Pattern */}
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 opacity-30 [background-image:linear-gradient(to_right,currentColor_1px,transparent_1px),linear-gradient(to_bottom,currentColor_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(farthest-side_at_top_right,white,transparent)] text-volt-n40 dark:text-white/25"
                  />

                  <span className="relative z-20 grid size-8 place-items-center rounded-lg bg-pine text-volt shadow-sm dark:bg-volt dark:text-pine-n80">
                    <Icon className="size-4" />
                  </span>
                  <p className="relative z-20 mt-3.5 font-heading text-[28px] leading-none font-bold text-foreground sm:text-[34px]">
                    {stat.num}
                    {stat.suffix && <span className="text-accent-emphasis">{stat.suffix}</span>}
                  </p>
                  <p className="relative z-20 mt-1.5 text-[10px] font-bold text-accent-emphasis sm:text-[11px]">
                    {stat.label}
                  </p>
                  <p className="relative z-20 mt-1.5 text-[12px] leading-snug text-muted-foreground">
                    {stat.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      {/* 6. 3D TILTED POSTER WALL ("YOUR TICKET TO WHAT'S ON, IN A COUPLE OF TAPS.") */}
      <div className="mx-auto mt-14 w-full max-w-7xl px-4 sm:mt-16 sm:px-6">
        <section className="relative w-full overflow-hidden rounded-2xl border border-border/70 bg-background sm:rounded-[28px]">
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
            <div className="absolute inset-0 bg-background/82 backdrop-blur-[1.5px]" />
          </div>

          <div className="relative z-10 flex min-h-72 flex-col items-center justify-center px-5 py-12 text-center sm:min-h-96 sm:px-10 sm:py-14">
            <h2 className="font-heading text-[22px] leading-tight font-extrabold tracking-tight text-balance text-foreground sm:text-3xl lg:text-4xl">
              Your ticket to what&apos;s on,{' '}
              <span className="text-accent-emphasis">in a couple of taps.</span>
            </h2>
            <p className="mt-3 max-w-lg text-[13px] leading-6 text-balance text-muted-foreground sm:text-sm">
              Concerts, comedy, cricket and everything else happening this week. Book in seconds and the ticket lands on your phone, QR ready for the gate.
            </p>
            <div className="mt-6 flex w-full flex-row items-stretch justify-center gap-2 sm:w-auto sm:gap-3">
              <Link
                to="/events"
                className="opentickets-glow group/cta inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-5 text-[13px] font-semibold sm:w-auto sm:flex-none sm:gap-2 sm:text-sm"
              >
                Browse events
                <ArrowRight className="size-4 transition-transform duration-150 group-hover/cta:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>
      </div>

      {/* 7. ORGANIZER CTA BAND */}
      <OrganizerCtaBand />
    </main>
  );
};
