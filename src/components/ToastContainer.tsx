import React from 'react';
import { useLocation } from 'react-router-dom';
import { CheckCircle2, Info, Smartphone, X, AlertCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ToastContainer: React.FC = () => {
  const { toasts } = useApp();
  if (toasts.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-x-0 top-4 z-[100] flex flex-col items-center gap-2 px-4">
      {toasts.map((t) => (
        <div
          key={t.id}
          className="pointer-events-auto flex items-center gap-2.5 rounded-full border border-border bg-surface/95 px-4 py-2.5 text-xs font-bold text-foreground shadow-overlay backdrop-blur-xl"
        >
          {t.type === 'success' && <CheckCircle2 className="size-4 shrink-0 text-accent-emphasis" />}
          {t.type === 'info' && <Info className="size-4 shrink-0 text-[#4e73df]" />}
          {t.type === 'error' && <AlertCircle className="size-4 shrink-0 text-destructive" />}
          <span>{t.title}</span>
        </div>
      ))}
    </div>
  );
};

export const MobileAppSimulator: React.FC = () => {
  const { mobileSimOpen, setMobileSimOpen } = useApp();
  const location = useLocation();
  const isInsideSimFrame = new URLSearchParams(location.search).get('appframe') === '1';

  if (isInsideSimFrame) return null;

  return (
    <>
      {/* Floating Desktop Quick Toggle Pill for Mobile App System */}
      <button
        type="button"
        onClick={() => setMobileSimOpen(true)}
        className="fixed right-5 bottom-5 z-40 hidden items-center gap-2 rounded-full border border-border bg-pine px-4 py-2.5 text-xs font-bold text-volt shadow-xl transition-transform hover:scale-105 lg:inline-flex dark:bg-volt dark:text-pine-n80 cursor-pointer"
      >
        <Smartphone className="size-4" />
        Mobile App View
      </button>

      {mobileSimOpen && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/75 p-4 backdrop-blur-md"
          onClick={() => setMobileSimOpen(false)}
        >
          <div className="flex flex-col items-center gap-3" onClick={(e) => e.stopPropagation()}>
            <div className="flex w-full max-w-[400px] items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Smartphone className="size-4 text-volt" />
                <span className="text-xs font-bold tracking-wide">
                  Open Tickets wallet demo (390 × 820)
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileSimOpen(false)}
                className="inline-flex items-center gap-1 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white hover:bg-white/25 cursor-pointer"
              >
                <X className="size-3.5" />
                Close
              </button>
            </div>

            {/* Realistic Phone Hardware Bezel + Dynamic Island */}
            <div className="relative h-[82vh] max-h-[820px] w-[390px] max-w-[94vw] overflow-hidden rounded-[44px] border-[10px] border-[#161a1d] bg-background shadow-[0_30px_90px_rgba(0,0,0,0.85)] ring-2 ring-white/15">
              <div className="pointer-events-none absolute top-2 left-1/2 z-50 h-5 w-24 -translate-x-1/2 rounded-full bg-black" />
              <iframe
                title="Open Tickets mobile wallet demo"
                src={`${location.pathname}${location.search ? `${location.search}&appframe=1` : '?appframe=1'}`}
                className="h-full w-full border-0 bg-background"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};
