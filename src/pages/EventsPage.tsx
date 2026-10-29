import React, { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ChevronDown, Search, X } from 'lucide-react';
import { CATEGORIES, EVENTS } from '../data/events';
import { OpenTicketsCard } from '../components/OpenTicketsCard';
import { OrganizerCtaBand } from '../components/OrganizerCtaBand';

export const EventsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [status, setStatus] = useState<string>('All');
  const [category, setCategory] = useState<string>(initialCategory);
  const [sortBy, setSortBy] = useState<string>('soonest');
  const [visibleCount, setVisibleCount] = useState<number>(12);

  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All';
    setCategory(urlCat);
  }, [searchParams]);

  const handleCategoryChange = (nextCat: string) => {
    setCategory(nextCat);
    const next = new URLSearchParams(searchParams);
    if (nextCat === 'All') next.delete('category');
    else next.set('category', nextCat);
    setSearchParams(next, { replace: true });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = EVENTS.filter((ev) => {
      if (status !== 'All' && ev.status !== status) return false;
      if (category !== 'All' && ev.category.toLowerCase() !== category.toLowerCase()) return false;
      if (q) {
        const hay = `${ev.title} ${ev.venue} ${ev.organizerName} ${ev.category} ${ev.city}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });

    const sorted = [...list];
    if (sortBy === 'soonest') sorted.sort((a, b) => a.sortTimestamp - b.sortTimestamp);
    else if (sortBy === 'latest') sorted.sort((a, b) => b.sortTimestamp - a.sortTimestamp);
    else if (sortBy === 'price-asc') sorted.sort((a, b) => a.startsFrom - b.startsFrom);
    else if (sortBy === 'price-desc') sorted.sort((a, b) => b.startsFrom - a.startsFrom);
    return sorted;
  }, [query, status, category, sortBy]);

  const shown = filtered.slice(0, visibleCount);
  const hasFilters = query.trim() !== '' || status !== 'All' || category !== 'All';

  return (
    <main id="main-content" className="flex-1 bg-background py-8 text-foreground sm:py-12">
      <h1 className="sr-only">Events on Open Tickets</h1>

      <div className="mx-auto w-full max-w-7xl space-y-8 px-4 sm:px-6">
        {/* Sticky Frosted Glass Filter Bar (100% Open Tickets /events design) */}
        <section className="sticky top-[4.25rem] z-30">
          <div className="relative overflow-visible rounded-[24px] border border-border/70 bg-surface/85 p-3 shadow-overlay backdrop-blur-2xl backdrop-saturate-150 sm:p-4 dark:bg-surface/80">
            <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-paper/50 to-transparent dark:via-paper/20" />

            <form
              onSubmit={(e) => e.preventDefault()}
              className="grid grid-cols-2 gap-3 lg:grid-cols-[minmax(18rem,1.3fr)_minmax(8rem,0.6fr)_minmax(9rem,0.7fr)_minmax(9rem,0.7fr)] lg:items-end"
            >
              {/* Search Input */}
              <div className="relative col-span-2 min-w-0 lg:col-span-1">
                <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search events or organizers"
                  className="h-12 w-full rounded-xl border border-border/80 bg-background/75 pr-12 pl-10 text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none transition-colors hover:border-accent/45 focus:border-accent"
                />
                {query ? (
                  <button
                    type="button"
                    onClick={() => setQuery('')}
                    aria-label="Clear search"
                    className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/8 cursor-pointer"
                  >
                    <X className="size-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    aria-label="Search events"
                    className="absolute top-1/2 right-1.5 grid size-9 -translate-y-1/2 place-items-center rounded-lg bg-primary text-primary-foreground shadow-sm cursor-pointer"
                  >
                    <Search className="size-4" />
                  </button>
                )}
              </div>

              {/* Status Select */}
              <div className="relative min-w-0">
                <span className="sr-only">Status</span>
                <span className="pointer-events-none absolute top-1/2 left-3 size-2.5 -translate-y-1/2 rounded-full bg-accent" />
                <select
                  aria-label="Status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border/80 bg-background/75 pr-9 pl-8 text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent/45 focus:border-accent cursor-pointer"
                >
                  <option value="All">All statuses</option>
                  <option value="Live">Live now</option>
                  <option value="Upcoming">Upcoming</option>
                  <option value="Selling Fast">Selling fast</option>
                  <option value="Past">Past events</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Category Select */}
              <div className="relative min-w-0">
                <span className="sr-only">Category</span>
                <select
                  aria-label="Category"
                  value={category}
                  onChange={(e) => handleCategoryChange(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border/80 bg-background/75 pr-9 pl-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent/45 focus:border-accent cursor-pointer"
                >
                  <option value="All">All categories</option>
                  {CATEGORIES.map((c) => (
                    <option key={c.name} value={c.name}>
                      {c.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>

              {/* Sort Select */}
              <div className="relative col-span-2 min-w-0 sm:col-span-1">
                <span className="sr-only">Sort</span>
                <select
                  aria-label="Sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-12 w-full appearance-none rounded-xl border border-border/80 bg-background/75 pr-9 pl-3.5 text-sm font-semibold text-foreground outline-none transition-colors hover:border-accent/45 focus:border-accent cursor-pointer"
                >
                  <option value="soonest">Soonest first</option>
                  <option value="latest">Latest first</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground" />
              </div>
            </form>
          </div>
        </section>

        {/* Results Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-foreground sm:text-2xl">
              {category === 'All' ? 'All Events' : `${category} Events`}
            </h2>
            <p className="mt-0.5 text-xs font-medium text-muted-foreground">
              Showing {shown.length} of {filtered.length} events
            </p>
          </div>

          {hasFilters && (
            <button
              type="button"
              onClick={() => {
                setQuery('');
                setStatus('All');
                handleCategoryChange('All');
              }}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface px-3.5 py-1.5 text-xs font-semibold text-foreground hover:border-accent cursor-pointer"
            >
              <X className="size-3.5" />
              Reset filters
            </button>
          )}
        </div>

        {/* OpenTickets e-card Grid */}
        {shown.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-surface/60 py-16 text-center">
            <p className="text-base font-bold text-foreground">No matching events found</p>
            <p className="mt-1 text-xs text-muted-foreground">
              Try clearing your filters or searching another keyword.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {shown.map((ev) => (
              <OpenTicketsCard key={ev.id} event={ev} />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {shown.length < filtered.length && (
          <div className="flex flex-col items-center gap-2 pt-2">
            <p className="text-xs text-muted-foreground">
              Showing {shown.length} of {filtered.length}
            </p>
            <button
              type="button"
              onClick={() => setVisibleCount((c) => c + 9)}
              className="opentickets-glow inline-flex h-11 items-center justify-center rounded-xl px-6 text-sm font-semibold cursor-pointer"
            >
              Load more events
            </button>
          </div>
        )}
      </div>

      <OrganizerCtaBand />
    </main>
  );
};
