import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Download,
  HelpCircle,
  Home,
  Info,
  LogIn,
  Menu,
  MessageCircle,
  Moon,
  PartyPopper,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sun,
  Ticket,
  UserCheck,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const MobileBottomNav: React.FC<{ forceVisibleInSimulator?: boolean }> = ({
  forceVisibleInSimulator = false,
}) => {
  const {
    cartCount,
    tickets,
    searchOpen,
    setSearchOpen,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    theme,
    toggleTheme,
    user,
    signOut,
    installPwa,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const pathname = location.pathname;

  // Determine active tab index (0..4)
  let activeIndex = 0;
  if (searchOpen) activeIndex = 1;
  else if (mobileDrawerOpen) activeIndex = 4;
  else if (pathname.startsWith('/profile/tickets') || pathname.startsWith('/find-my-tickets')) activeIndex = 2;
  else if (pathname.startsWith('/cart')) activeIndex = 3;
  else if (pathname === '/') activeIndex = 0;
  else activeIndex = 4;

  const wrapperClass = forceVisibleInSimulator
    ? 'pointer-events-none sticky inset-x-0 bottom-0 z-40 px-3 pb-3'
    : 'pointer-events-none fixed inset-x-0 bottom-0 z-50 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] lg:hidden';

  return (
    <>
      {/* Open Tickets Floating Liquid-Glass 5-Tab Mobile Bottom Bar */}
      <div className={wrapperClass}>
        <nav
          aria-label="Mobile primary navigation"
          style={{ '--tab-count': 5 } as React.CSSProperties}
          className="pointer-events-auto relative mx-auto grid w-full max-w-md grid-cols-5 overflow-hidden rounded-[1.75rem] border border-white/55 bg-surface/90 p-1.5 shadow-[0_18px_55px_-18px_rgba(4,14,14,0.65),inset_0_1px_0_rgba(255,255,255,0.7)] ring-1 ring-foreground/5 backdrop-blur-xl backdrop-saturate-180 dark:border-white/15 dark:bg-pine-n40/90 dark:shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.14)]"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-5 top-0 h-px bg-gradient-to-r from-transparent via-white/90 to-transparent dark:via-white/35"
          />
          {/* Sliding Active Glass Indicator */}
          <span
            aria-hidden="true"
            style={{ transform: `translate3d(${activeIndex * 100}%, 0, 0)` }}
            className="pointer-events-none absolute inset-y-1.5 left-1.5 z-0 w-[calc((100%-0.75rem)/5)] overflow-hidden rounded-[1.25rem] bg-white/75 shadow-[0_8px_24px_-14px_rgba(4,14,14,0.7),inset_0_1px_0_rgba(255,255,255,0.9)] ring-1 ring-white/80 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:bg-white/12 dark:ring-white/15"
          >
            <span className="absolute inset-x-3 top-0 h-px bg-gradient-to-r from-transparent via-accent/90 to-transparent" />
          </span>

          {/* Tab 1: Home */}
          <Link
            to="/"
            onClick={() => {
              setMobileDrawerOpen(false);
              setSearchOpen(false);
            }}
            className={`group relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-1 py-2 text-[10px] font-semibold transition-all duration-300 ${
              activeIndex === 0 ? 'text-accent-emphasis' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Home className={`size-[18px] transition-transform ${activeIndex === 0 ? '-translate-y-0.5 stroke-[2.4]' : ''}`} />
            <span className="truncate">Home</span>
          </Link>

          {/* Tab 2: Search */}
          <button
            type="button"
            onClick={() => {
              setMobileDrawerOpen(false);
              setSearchOpen(true);
            }}
            className={`group relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-1 py-2 text-[10px] font-semibold transition-all duration-300 cursor-pointer ${
              activeIndex === 1 ? 'text-accent-emphasis' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Search className="size-[18px]" />
            <span className="truncate">Search</span>
          </button>

          {/* Tab 3: Tickets (Mobile QR Wallet) */}
          <Link
            to="/profile/tickets"
            onClick={() => {
              setMobileDrawerOpen(false);
              setSearchOpen(false);
            }}
            className={`group relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-1 py-2 text-[10px] font-semibold transition-all duration-300 ${
              activeIndex === 2 ? 'text-accent-emphasis' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="relative">
              <Ticket className={`size-[18px] transition-transform ${activeIndex === 2 ? '-translate-y-0.5 stroke-[2.4]' : ''}`} />
              {tickets.length > 0 && (
                <span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-pine px-1 text-[9px] font-bold text-volt dark:bg-volt dark:text-pine-n80">
                  {tickets.length}
                </span>
              )}
            </span>
            <span className="truncate">Tickets</span>
          </Link>

          {/* Tab 4: Cart */}
          <Link
            to="/cart"
            onClick={() => {
              setMobileDrawerOpen(false);
              setSearchOpen(false);
            }}
            className={`group relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-1 py-2 text-[10px] font-semibold transition-all duration-300 ${
              activeIndex === 3 ? 'text-accent-emphasis' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <span className="relative">
              <ShoppingBag className={`size-[18px] transition-transform ${activeIndex === 3 ? '-translate-y-0.5 stroke-[2.4]' : ''}`} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 flex h-3.5 min-w-3.5 items-center justify-center rounded-full bg-volt px-1 text-[9px] font-extrabold text-pine-n80">
                  {cartCount}
                </span>
              )}
            </span>
            <span className="truncate">Cart</span>
          </Link>

          {/* Tab 5: More (Mobile App Sheet) */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(!mobileDrawerOpen)}
            className={`group relative z-10 flex min-w-0 flex-col items-center justify-center gap-1 rounded-[1.25rem] px-1 py-2 text-[10px] font-semibold transition-all duration-300 cursor-pointer ${
              activeIndex === 4 ? 'text-accent-emphasis' : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            <Menu className="size-[18px]" />
            <span className="truncate">More</span>
          </button>
        </nav>
      </div>

      {/* Mobile App "More" Bottom-Sheet Drawer */}
      {mobileDrawerOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-end justify-center bg-black/55 backdrop-blur-xs"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="w-full max-w-lg overflow-hidden rounded-t-[28px] border-t border-border bg-surface p-5 pb-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Drag Handle */}
            <div className="mx-auto mb-4 h-1.5 w-11 rounded-full bg-foreground/15" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <img
                  src="/assets/logo/opentickets-logo-for-light.svg"
                  alt="Open Tickets"
                  className="h-7 w-auto dark:hidden"
                />
                <img
                  src="/assets/logo/opentickets-logo-for-dark.svg"
                  alt="Open Tickets"
                  className="hidden h-7 w-auto dark:block"
                />
                <span className="rounded-full bg-volt/25 px-2 py-0.5 text-[10px] font-bold text-accent-emphasis">
                  Mobile App
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="grid size-8 place-items-center rounded-full bg-foreground/6 text-muted-foreground hover:text-foreground cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            {/* Account Card */}
            <div className="mt-4 rounded-2xl border border-border bg-background/70 p-3.5">
              {user ? (
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-pine font-bold text-volt dark:bg-volt dark:text-pine-n80">
                      {user.firstName.charAt(0).toUpperCase()}
                    </span>
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">{user.email}</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      signOut();
                      setMobileDrawerOpen(false);
                    }}
                    className="rounded-xl bg-destructive/12 px-3 py-1.5 text-xs font-semibold text-destructive cursor-pointer"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-bold text-foreground">Your Open Tickets Account</p>
                    <p className="text-xs text-muted-foreground">Keep QR tickets close & check in faster</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setMobileDrawerOpen(false);
                        navigate('/login');
                      }}
                      className="opentickets-glow inline-flex items-center gap-1.5 rounded-xl px-3.5 py-2 text-xs font-semibold cursor-pointer"
                    >
                      <LogIn className="size-3.5" />
                      Sign in
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* App Navigation Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5">
              {[
                { label: 'All Events', sub: '26+ live & upcoming', href: '/events', icon: Calendar },
                { label: 'My QR Tickets', sub: 'Gate pass wallet', href: '/profile/tickets', icon: Ticket },
                { label: 'Find My Tickets', sub: 'Guest order lookup', href: '/find-my-tickets', icon: UserCheck },
                { label: 'Host an Event', sub: 'Publish & sell', href: '/host', icon: PartyPopper },
                { label: 'Contact Support', sub: 'WhatsApp, Call, Email', href: '/contact', icon: MessageCircle },
                { label: 'FAQs', sub: 'Quick answers', href: '/faq', icon: HelpCircle },
                { label: 'About Open Tickets', sub: 'How Open Tickets works', href: '/about', icon: Info },
                { label: 'Refund Guarantee', sub: 'Ticket protection', href: '/refund-guarantee', icon: ShieldCheck },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.href}
                    type="button"
                    onClick={() => {
                      setMobileDrawerOpen(false);
                      navigate(item.href);
                    }}
                    className="flex items-start gap-2.5 rounded-2xl border border-border/70 bg-background/60 p-3 text-left transition-colors hover:border-accent/50 hover:bg-accent/8 cursor-pointer"
                  >
                    <span className="grid size-8 shrink-0 place-items-center rounded-xl bg-pine text-volt dark:bg-volt dark:text-pine-n80">
                      <Icon className="size-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-bold text-foreground">{item.label}</span>
                      <span className="block truncate text-[11px] text-muted-foreground">{item.sub}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Bottom Controls: Theme + Install PWA */}
            <div className="mt-4 flex items-center gap-2.5">
              <button
                type="button"
                onClick={toggleTheme}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-3 text-xs font-semibold text-foreground cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="size-4 text-volt" /> : <Moon className="size-4" />}
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setMobileDrawerOpen(false);
                  installPwa();
                }}
                className="flex h-11 flex-1 items-center justify-center gap-2 rounded-xl bg-volt px-3 text-xs font-bold text-pine-n80 shadow-sm cursor-pointer"
              >
                <Download className="size-4" />
                Install App
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
