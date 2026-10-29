import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, MapPin, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EVENTS, getEventHref } from '../data/events';

export const StoryViewerModal: React.FC = () => {
  const { storyEventId, setStoryEventId } = useApp();
  const navigate = useNavigate();
  const stories = EVENTS.filter((e) => e.happeningNow);
  const currentIndex = stories.findIndex((s) => s.id === storyEventId);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (currentIndex < 0) return;
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          if (currentIndex < stories.length - 1) {
            setStoryEventId(stories[currentIndex + 1].id);
          } else {
            setStoryEventId(null);
          }
          return 0;
        }
        return p + 2;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [currentIndex, stories, setStoryEventId]);

  if (currentIndex < 0) return null;
  const active = stories[currentIndex];

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-black/85 p-3 backdrop-blur-md"
      onClick={() => setStoryEventId(null)}
    >
      <div
        className="relative flex aspect-[9/16] w-full max-w-[390px] flex-col justify-between overflow-hidden rounded-3xl bg-pine-n80 text-white shadow-2xl ring-1 ring-white/15"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={active.squareImage}
          alt={active.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-black/90" />

        {/* Top Progress Bars & Header */}
        <div className="relative z-20 p-4">
          <div className="flex gap-1.5">
            {stories.map((st, idx) => (
              <div key={st.id} className="h-1 flex-1 overflow-hidden rounded-full bg-white/30">
                <div
                  className="h-full bg-volt transition-all duration-100"
                  style={{
                    width: idx < currentIndex ? '100%' : idx === currentIndex ? `${progress}%` : '0%',
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <img
                src={active.squareImage}
                alt=""
                className="size-9 shrink-0 rounded-full object-cover ring-2 ring-volt"
              />
              <div className="min-w-0">
                <p className="truncate text-xs font-bold">{active.organizerName}</p>
                <p className="text-[11px] text-volt">{active.heroDateLabel} · Happening now</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setStoryEventId(null)}
              className="grid size-8 place-items-center rounded-full bg-black/40 text-white hover:bg-black/65 cursor-pointer"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>

        {/* Prev / Next Navigation Buttons */}
        <div className="relative z-20 flex items-center justify-between px-2">
          <button
            type="button"
            disabled={currentIndex === 0}
            onClick={() => setStoryEventId(stories[currentIndex - 1].id)}
            className="grid size-9 place-items-center rounded-full bg-black/40 text-white disabled:opacity-20 cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </button>
          <button
            type="button"
            disabled={currentIndex === stories.length - 1}
            onClick={() => setStoryEventId(stories[currentIndex + 1].id)}
            className="grid size-9 place-items-center rounded-full bg-black/40 text-white disabled:opacity-20 cursor-pointer"
          >
            <ChevronRight className="size-5" />
          </button>
        </div>

        {/* Story Footer CTA */}
        <div className="relative z-20 p-5">
          <span className="inline-block rounded-full bg-volt px-2.5 py-0.5 text-[10px] font-extrabold text-pine-n80">
            Starts from R {active.startsFrom.toLocaleString()}
          </span>
          <h3 className="mt-2 font-heading text-lg font-extrabold leading-snug text-white">
            {active.title}
          </h3>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-white/80">
            <MapPin className="size-3.5 shrink-0 text-volt" />
            <span className="truncate">{active.venue}</span>
          </p>
          <button
            type="button"
            onClick={() => {
              const target = getEventHref(active);
              setStoryEventId(null);
              navigate(target);
            }}
            className="mt-4 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-volt text-sm font-extrabold text-pine-n80 shadow-lg transition-transform active:scale-98 cursor-pointer"
          >
            View Details & Book Tickets
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
