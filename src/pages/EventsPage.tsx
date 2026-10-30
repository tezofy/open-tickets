import React, { useEffect, useMemo, useRef, useState } from 'react';
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
  const [mobileFilterDocked, setMobileFilterDocked] = useState(false);
  const [mobileFilterHidden, setMobileFilterHidden] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const filterStickyRef = useRef<HTMLElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const touchStartYRef = useRef(0);
  const lastScrollYRef = useRef(0);
  const filterDockedAtYRef = useRef(0);
  const wasFilterDockedRef = useRef(false);

  useEffect(() => {
    const urlCat = searchParams.get('category') || 'All';
    setCategory(urlCat);
  }, [searchParams]);

  useEffect(() => {
    const updateDockedFilter = () => {
      const filter = filterStickyRef.current;
      const currentY = window.scrollY;
      const docked = Boolean(filter && window.innerWidth <= 540 && currentY > 0 && filter.getBoundingClientRect().top <= 69);

      if (docked && !wasFilterDockedRef.current) filterDockedAtYRef.current = currentY;
      if (!docked) {
        setMobileFilterHidden(false);
      }
      if (docked && !mobileFilterHidden && currentY > filterDockedAtYRef.current + 90) {
        setMobileFilterHidden(true);
      }
      if (docked && mobileFilterHidden && currentY < lastScrollYRef.current - 6) {
        setMobileFilterHidden(false);
        filterDockedAtYRef.current = currentY;
      }

      wasFilterDockedRef.current = docked;
      lastScrollYRef.current = currentY;
      setMobileFilterDocked(docked);
      document.documentElement.classList.toggle('ot-events-filter-docked', docked);
      document.documentElement.classList.toggle('ot-events-filter-hidden', docked && mobileFilterHidden);
    };

    updateDockedFilter();
    window.addEventListener('scroll', updateDockedFilter, { passive: true });
    window.addEventListener('resize', updateDockedFilter);
    return () => {
      window.removeEventListener('scroll', updateDockedFilter);
      window.removeEventListener('resize', updateDockedFilter);
      document.documentElement.classList.remove('ot-events-filter-docked', 'ot-events-filter-hidden');
    };
  }, [mobileFilterHidden]);

  useEffect(() => {
    const togglePageSearch = () => {
      setMobileFilterHidden(false);
      setMobileSearchOpen((open) => {
        const next = !open;
        if (next) window.setTimeout(() => searchInputRef.current?.focus({ preventScroll: true }), 150);
        return next;
      });
    };

    window.addEventListener('ot:toggle-events-search', togglePageSearch);
    return () => window.removeEventListener('ot:toggle-events-search', togglePageSearch);
  }, []);

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

      <div className="mx-auto w-full max-w-7xl space-y-5 px-4 sm:px-6">
        {/* AI event panorama scrolls away normally */}
        <section className="ot-events-ai-banner" aria-label="Live events across South Africa">
          <img src="media/events-filter-banner-ai.jpg" alt="Concerts, football, festivals and community events across South Africa" />
          <div className="ot-events-ai-banner-shade" aria-hidden="true" />
          <div className="ot-events-ai-banner-copy">
            <span>ALL EXPERIENCES · ONE PLACE</span>
            <strong>Find your kind of live.</strong>
          </div>
          <span className="ot-events-ai-banner-code" aria-hidden="true">OT / EXPLORE / ZA</span>
        </section>

        {/* Glass filters stay pinned under the normal sticky site header */}
        <section
          ref={filterStickyRef}
          className={`ot-events-filter-sticky ${mobileFilterDocked ? 'is-mobile-docked' : ''} ${mobileFilterHidden ? 'is-mobile-hidden' : ''} ${mobileSearchOpen ? 'is-mobile-search-open' : ''}`}
          aria-label="Event filters"
          onTouchStart={(event) => { touchStartYRef.current = event.touches[0]?.clientY ?? 0; }}
          onTouchEnd={(event) => {
            const endY = event.changedTouches[0]?.clientY ?? touchStartYRef.current;
            if (mobileFilterDocked && touchStartYRef.current - endY > 32) setMobileFilterHidden(true);
          }}
          onPointerDown={(event) => {
            if (event.pointerType === 'touch') touchStartYRef.current = event.clientY;
          }}
          onPointerUp={(event) => {
            if (event.pointerType === 'touch' && mobileFilterDocked && touchStartYRef.current - event.clientY > 32) {
              setMobileFilterHidden(true);
            }
          }}
        >
          <div className="ot-event-filter-ticket">
            <span className="ot-filter-notch ot-filter-notch-left" aria-hidden="true" />
            <span className="ot-filter-notch ot-filter-notch-right" aria-hidden="true" />

            <form onSubmit={(e) => e.preventDefault()} className="ot-filter-grid">
              <label className="ot-filter-field ot-filter-search-field">
                <span className="ot-filter-label">Search</span>
                <span className="ot-filter-control-wrap">
                  <Search className="ot-filter-leading-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Events, venues or organizers"
                    className="ot-filter-control ot-filter-search-input"
                  />
                  {query ? (
                    <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="ot-filter-clear"><X className="size-4" /></button>
                  ) : (
                    <button type="submit" aria-label="Search events" className="ot-filter-submit"><Search className="size-4" /></button>
                  )}
                </span>
              </label>

              <label className="ot-filter-field">
                <span className="ot-filter-label"><i className="ot-filter-live-dot" />Status</span>
                <span className="ot-filter-control-wrap">
                  <select aria-label="Status" value={status} onChange={(e) => setStatus(e.target.value)} className="ot-filter-control">
                    <option value="All">All statuses</option>
                    <option value="Live">Live now</option>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Selling Fast">Selling fast</option>
                    <option value="Past">Past events</option>
                  </select>
                  <ChevronDown className="ot-filter-chevron" />
                </span>
              </label>

              <label className="ot-filter-field">
                <span className="ot-filter-label">Category</span>
                <span className="ot-filter-control-wrap">
                  <select aria-label="Category" value={category} onChange={(e) => handleCategoryChange(e.target.value)} className="ot-filter-control">
                    <option value="All">All categories</option>
                    {CATEGORIES.map((c) => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  <ChevronDown className="ot-filter-chevron" />
                </span>
              </label>

              <label className="ot-filter-field ot-filter-sort-field">
                <span className="ot-filter-label">Sort by</span>
                <span className="ot-filter-control-wrap">
                  <select aria-label="Sort" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="ot-filter-control">
                    <option value="soonest">Soonest first</option>
                    <option value="latest">Latest first</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                  </select>
                  <ChevronDown className="ot-filter-chevron" />
                </span>
              </label>
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
