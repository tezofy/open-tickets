import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowUpRight, Calendar, MapPin, Search, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { CATEGORIES, EVENTS, getEventHref } from '../data/events';

export const SearchModal: React.FC = () => {
  const { searchOpen, setSearchOpen } = useApp();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 40);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  const filteredEvents = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return EVENTS.slice(0, 6);
    return EVENTS.filter(
      (e) =>
        e.title.toLowerCase().includes(q) ||
        e.venue.toLowerCase().includes(q) ||
        e.category.toLowerCase().includes(q) ||
        e.organizerName.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [query]);

  const matchedCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return CATEGORIES.slice(0, 6);
    return CATEGORIES.filter((c) => c.name.toLowerCase().includes(q)).slice(0, 6);
  }, [query]);

  if (!searchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-start justify-center bg-black/55 px-3 pt-14 backdrop-blur-xs sm:pt-24"
      onClick={() => setSearchOpen(false)}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Header */}
        <div className="flex items-center gap-3 border-b border-border px-4 py-3.5 sm:px-5">
          <Search className="size-5 shrink-0 text-accent-emphasis" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search events, venues, cities or categories..."
            className="min-w-0 flex-1 bg-transparent text-sm font-medium text-foreground placeholder:text-muted-foreground outline-none sm:text-base"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="rounded-md px-2 py-1 text-xs font-medium text-muted-foreground hover:bg-foreground/8"
            >
              Clear
            </button>
          )}
          <button
            type="button"
            onClick={() => setSearchOpen(false)}
            className="grid size-8 place-items-center rounded-full bg-foreground/6 text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[68vh] overflow-y-auto p-4 sm:p-5 space-y-5">
          {matchedCategories.length > 0 && (
            <div>
              <p className="mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {matchedCategories.map((cat) => (
                  <button
                    key={cat.name}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(`/events?category=${encodeURIComponent(cat.name)}`);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background/80 px-3 py-1.5 text-xs font-semibold text-foreground transition-colors hover:border-accent hover:bg-accent/15 cursor-pointer"
                  >
                    <span>{cat.name}</span>
                    <ArrowUpRight className="size-3 text-muted-foreground" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div>
            <p className="mb-2.5 text-[11px] font-bold tracking-wider text-muted-foreground uppercase">
              {query.trim() ? `Matching Events (${filteredEvents.length})` : 'Popular Events'}
            </p>
            {filteredEvents.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-border py-10 text-center">
                <p className="text-sm font-semibold text-foreground">No events found for “{query}”</p>
                <p className="mt-1 text-xs text-muted-foreground">Try searching an event, team, venue, or town.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {filteredEvents.map((ev) => (
                  <button
                    key={ev.id}
                    type="button"
                    onClick={() => {
                      setSearchOpen(false);
                      navigate(getEventHref(ev));
                    }}
                    className="group flex w-full items-center gap-3.5 rounded-2xl border border-transparent p-2.5 text-left transition-colors hover:border-border hover:bg-background/90 cursor-pointer"
                  >
                    <img
                      src={ev.squareImage}
                      alt={ev.title}
                      className="size-14 shrink-0 rounded-xl object-cover ring-1 ring-border"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-bold text-foreground group-hover:text-accent-emphasis">
                        {ev.title}
                      </p>
                      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1 truncate">
                          <MapPin className="size-3 shrink-0" />
                          {ev.venue}
                        </span>
                        <span className="inline-flex items-center gap-1 text-[#e74a3b] dark:text-[#ff6568]">
                          <Calendar className="size-3 shrink-0" />
                          {ev.otDateTime}
                        </span>
                      </div>
                    </div>
                    <span className="shrink-0 rounded-lg bg-volt/25 px-2.5 py-1 text-xs font-bold text-accent-emphasis">
                      R {ev.startsFrom.toLocaleString()}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
