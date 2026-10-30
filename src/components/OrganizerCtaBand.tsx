import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Ticket } from 'lucide-react';

const CTA_SLIDES = [
  { src: 'media/cta-slider-concert.jpg', label: 'Live Music', title: 'Turn the crowd up' },
  { src: 'media/cta-slider-football.jpg', label: 'Match Day', title: 'Fill every seat' },
  { src: 'media/cta-slider-festival.jpg', label: 'Festivals', title: 'Create the weekend' },
  { src: 'media/cta-slider-community.jpg', label: 'Community', title: 'Bring everyone together' },
];

export const OrganizerCtaBand: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % CTA_SLIDES.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [paused]);

  const showPrevious = () => setActiveSlide((current) => (current - 1 + CTA_SLIDES.length) % CTA_SLIDES.length);
  const showNext = () => setActiveSlide((current) => (current + 1) % CTA_SLIDES.length);

  return (
    <div className="mx-auto mt-14 w-full max-w-7xl px-4 sm:mt-16 sm:px-6">
      <section className="opentickets-cta-band ot-organizer-slider-band" aria-labelledby="organizer-cta-title">
        <div className="ot-organizer-slider-pattern" aria-hidden="true" />

        <div className="ot-organizer-slider-copy">
          <span className="inline-flex items-center gap-2 rounded-full border border-pine/20 bg-pine/8 py-1 pr-3 pl-2 text-[11px] font-semibold tracking-wide text-foreground/80 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white/85">
            <span aria-hidden="true" className="relative flex size-1.5 shrink-0">
              <span className="opentickets-live-ping absolute inline-flex size-full rounded-full bg-volt" />
              <span className="relative inline-flex size-full rounded-full bg-volt" />
            </span>
Built for event creators
          </span>

          <h2 id="organizer-cta-title" className="mt-4 font-heading text-[25px] leading-[1.08] font-extrabold tracking-tight text-balance text-foreground sm:mt-5 sm:text-4xl dark:text-white">
            Your event deserves <span className="text-accent-emphasis dark:text-volt">a full house</span><span className="text-accent-emphasis dark:text-volt">.</span>
          </h2>

          <p className="mt-3 max-w-lg text-[13px] leading-6 text-foreground/70 sm:text-sm dark:text-white/68">
            Create your listing, reach the right audience, and manage every sale from one simple platform—from launch to payout.
          </p>

          <div className="mt-5 flex flex-wrap items-center gap-2.5">
            <Link to="/host" className="opentickets-glow inline-flex h-11 items-center justify-center gap-2 rounded-xl px-5 text-[13px] font-semibold sm:text-sm">
              List your event <ArrowRight className="size-4" />
            </Link>
            <Link to="/events" className="inline-flex h-11 items-center justify-center rounded-xl border border-pine/25 bg-pine/8 px-5 text-[13px] font-semibold text-foreground backdrop-blur-sm transition-colors hover:border-pine/40 hover:bg-pine/15 sm:text-sm dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20">
              Browse events
            </Link>
          </div>
        </div>

        <div
          className="ot-organizer-slider-wrap"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <div className="ot-organizer-ticket-slider" aria-roledescription="carousel" aria-label="Event experiences">
            {CTA_SLIDES.map((slide, index) => (
              <div key={slide.src} className={`ot-organizer-slide ${index === activeSlide ? 'is-active' : ''}`} aria-hidden={index !== activeSlide}>
                <img src={slide.src} alt={index === activeSlide ? slide.title : ''} loading="lazy" />
                <div className="ot-organizer-slide-shade" />
                <span className="ot-organizer-slide-category"><Ticket className="size-3" />{slide.label}</span>
                <div className="ot-organizer-slide-caption">
                  <small>YOUR EVENT · YOUR CROWD</small>
                  <strong>{slide.title}</strong>
                </div>
              </div>
            ))}

            <span className="ot-organizer-slider-perforation" aria-hidden="true" />
            <span className="ot-organizer-slider-serial" aria-hidden="true">OT · 0{activeSlide + 1}</span>

            <button type="button" className="ot-organizer-slider-control ot-organizer-slider-prev" onClick={showPrevious} aria-label="Previous image"><ChevronLeft className="size-4" /></button>
            <button type="button" className="ot-organizer-slider-control ot-organizer-slider-next" onClick={showNext} aria-label="Next image"><ChevronRight className="size-4" /></button>
          </div>

          <div className="ot-organizer-slider-dots" aria-label="Choose slide">
            {CTA_SLIDES.map((slide, index) => (
              <button key={slide.src} type="button" aria-label={`Show ${slide.label}`} onClick={() => setActiveSlide(index)} className={index === activeSlide ? 'is-active' : ''} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
