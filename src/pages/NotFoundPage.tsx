import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <main id="main-content" className="flex flex-1 items-center justify-center bg-background px-4 py-20">
      <div className="max-w-md text-center">
        <span className="inline-flex rounded-full bg-accent/15 px-3 py-1 font-mono text-xs font-bold text-accent-emphasis">
          404
        </span>
        <h1 className="mt-4 font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
          This page isn’t here
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          The link may have expired, moved, or been mistyped. Explore live concerts, sports, and theatre happening across South Africa.
        </p>
        <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/"
            className="opentickets-glow inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-bold"
          >
            Back to Home
          </Link>
          <Link
            to="/events"
            className="inline-flex h-11 items-center gap-1.5 rounded-xl border border-border bg-surface px-5 text-sm font-semibold text-foreground hover:border-accent"
          >
            Browse events
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </main>
  );
};
