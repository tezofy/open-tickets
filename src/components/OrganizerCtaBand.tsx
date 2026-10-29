import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const OrganizerCtaBand: React.FC = () => {
  return (
    <div className="mx-auto mt-14 w-full max-w-7xl px-4 sm:mt-16 sm:px-6">
      <div className="opentickets-cta-band relative w-full overflow-hidden rounded-2xl sm:rounded-[28px]">
        {/* Subtle radial dot grid overlay */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30 [background-image:radial-gradient(currentColor_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(520px_circle_at_center,white,transparent)] text-pine dark:text-volt"
        />

        <div className="relative z-20 px-5 py-8 sm:p-10">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center lg:max-w-none lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:text-left">
            <div className="flex min-w-0 flex-col items-center lg:items-start">
              <span className="inline-flex items-center gap-2 rounded-full border border-pine/20 bg-pine/8 py-1 pr-3 pl-2 text-[11px] font-semibold tracking-wide text-foreground/80 backdrop-blur-sm dark:border-white/20 dark:bg-white/10 dark:text-white/85">
                <span aria-hidden="true" className="relative flex size-1.5 shrink-0">
                  <span className="opentickets-live-ping absolute inline-flex size-full rounded-full bg-volt" />
                  <span className="relative inline-flex size-full rounded-full bg-volt" />
                </span>
                Live across South Africa
              </span>

              <h2 className="mt-4 font-heading text-[22px] leading-tight font-extrabold tracking-tight text-balance text-foreground sm:mt-5 sm:text-3xl lg:text-4xl dark:text-white">
                Every seat, <span className="text-accent-emphasis dark:text-volt">one listing</span> away
                <span className="text-accent-emphasis dark:text-volt">.</span>
              </h2>

              <p className="mt-2.5 max-w-lg text-[13px] leading-6 text-balance text-foreground/75 sm:mt-3 sm:text-sm dark:text-white/70">
                Put your event in front of the people already looking for one. Set it up in minutes, sell from day one, and get paid on time.
              </p>
            </div>

            <div className="mt-5 flex w-full flex-row items-stretch justify-center gap-2 sm:mt-6 sm:w-auto sm:gap-3 lg:mt-0 lg:shrink-0">
              <Link
                to="/host"
                className="opentickets-glow inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-1.5 rounded-xl px-3 text-[13px] font-semibold whitespace-nowrap sm:w-auto sm:flex-none sm:gap-2 sm:px-5 sm:text-sm"
              >
                Start selling
                <ArrowRight className="size-4" />
              </Link>
              <Link
                to="/events"
                className="inline-flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-pine/25 bg-pine/8 px-3 text-[13px] font-semibold whitespace-nowrap text-foreground backdrop-blur-sm transition-colors hover:border-pine/40 hover:bg-pine/15 sm:w-auto sm:flex-none sm:px-5 sm:text-sm dark:border-white/25 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
              >
                Browse events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
