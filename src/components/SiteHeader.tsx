import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Moon, Search, ShoppingBag, Smartphone, Sun, Ticket, User } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SiteHeader: React.FC<{ mobileTitle?: string }> = ({ mobileTitle }) => {
  const {
    theme,
    toggleTheme,
    cartCount,
    user,
    signOut,
    setSearchOpen,
    setMobileSimOpen,
  } = useApp();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
  }, [location.pathname]);

  const pathname = location.pathname;
  const isHome = pathname === '/';
  const isEvents = pathname.startsWith('/events') || pathname.startsWith('/o/') || pathname.startsWith('/event/');
  const isHost = pathname.startsWith('/host');
  const isContact = pathname.startsWith('/contact');

  const navItems = [
    {
      label: 'Home',
      href: '/',
      active: isHome,
      icon: (
        <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
          <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
          <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        </svg>
      ),
    },
    {
      label: 'Events',
      href: '/events',
      active: isEvents,
      icon: (
        <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <rect height="18" rx="2" width="18" x="3" y="4" />
          <path d="M3 10h18" />
          <circle cx="8" cy="14" fill="currentColor" r="1" stroke="none" />
          <circle cx="12" cy="14" fill="currentColor" r="1" stroke="none" />
          <circle cx="16" cy="14" fill="currentColor" r="1" stroke="none" />
          <circle cx="8" cy="18" fill="currentColor" r="1" stroke="none" />
          <circle cx="12" cy="18" fill="currentColor" r="1" stroke="none" />
          <circle cx="16" cy="18" fill="currentColor" r="1" stroke="none" />
        </svg>
      ),
    },
    {
      label: 'Host',
      href: '/host',
      active: isHost,
      icon: (
        <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
          <path d="M5.8 11.3 2 22l10.7-3.79" />
          <path d="M11 13c1.93 1.93 2.83 4.17 2 5-.83.83-3.07-.07-5-2-1.93-1.93-2.83-4.17-2-5 .83-.83 3.07.07 5 2Z" />
          <path d="M4 3h.01" />
          <path d="M22 8h.01" />
          <path d="M15 2h.01" />
          <path d="M22 20h.01" />
          <path d="m14 10 1.21-1.06c0.16-0.84 0.9-1.44 1.76-1.44h0.38c0.88 0 1.55-0.77 1.45-1.63a2.9 2.9 0 0 1 1.96-3.12L22 2" />
          <path d="M17 15h0.77c0.71 0 1.32-0.52 1.43-1.22c0.16-0.91 1.12-1.45 1.98-1.11L22 13" />
          <path d="M9 7V6.23c0-0.71 0.52-1.33 1.22-1.43c0.91-0.16 1.45-1.12 1.11-1.98L11 2" />
        </svg>
      ),
    },
    {
      label: 'Contact',
      href: '/contact',
      active: isContact,
      icon: (
        <svg fill="none" height="17" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="17">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
          <path d="M8 12h.01" />
          <path d="M12 12h.01" />
          <path d="M16 12h.01" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className={`sticky top-0 z-50 flex w-full justify-center transition-[padding] duration-500 ease-in-out ${
        scrolled ? 'px-3 pt-2.5 sm:px-6' : 'p-0'
      }`}
      data-site-header="true"
    >
      <header
        className={`w-full transition-[max-width,border-radius,background-color,box-shadow] duration-500 ease-in-out ${
          scrolled
            ? 'max-w-6xl rounded-2xl border border-border/80 bg-surface/90 shadow-overlay backdrop-blur-xl'
            : 'max-w-full rounded-none border-b border-border bg-background/95 backdrop-blur-sm'
        }`}
      >
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6">
          <div
            className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 transition-[height] duration-500 ease-in-out lg:grid-cols-[1fr_auto_1fr] ${
              scrolled ? 'h-14' : 'h-16'
            }`}
          >
            {/* Brand Logo */}
            <div className="justify-self-start">
              <Link aria-label="Open Tickets home" className="group flex w-fit items-center select-none" to="/">
                <img
                  alt="Open Tickets"
                  src="assets/logo/opentickets-logo-for-light.svg"
                  className="h-8 w-auto transition-transform duration-200 group-hover:scale-105 dark:hidden"
                />
                <img
                  alt="Open Tickets"
                  src="assets/logo/opentickets-logo-for-dark.svg"
                  className="hidden h-8 w-auto transition-transform duration-200 group-hover:scale-105 dark:block"
                />
              </Link>
            </div>

            {/* Mobile Scroll Center Title */}
            <div className="pointer-events-none min-w-0 overflow-hidden px-1 lg:hidden">
              <div
                className={`transition-[opacity,transform] duration-300 ease-out ${
                  scrolled && mobileTitle ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0'
                }`}
              >
                <p className="truncate text-center text-[13px] leading-5 font-semibold tracking-tight text-foreground">
                  {mobileTitle || ''}
                </p>
              </div>
            </div>

            {/* Desktop Primary Navigation (Ticket Stub Active Pill) */}
            <nav aria-label="Primary navigation" className="relative hidden items-center justify-self-center lg:flex">
              <div className="flex w-max items-center gap-1 rounded-full bg-foreground/[0.03] p-1">
                {navItems.map((item) =>
                  item.active ? (
                    <Link
                      key={item.href}
                      to={item.href}
                      aria-current="page"
                      className="opentickets-nav-stub relative flex h-[38px] items-center gap-2 rounded-[11px] bg-pine pr-4 pl-3.5 text-paper shadow-[0_4px_12px_-6px_var(--pine)] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none dark:bg-volt dark:text-pine-n80 dark:shadow-[0_4px_14px_-6px_var(--volt)]"
                    >
                      <span>{item.icon}</span>
                      <span className="text-[13px] font-semibold tracking-[-0.01em] whitespace-nowrap">
                        {item.label}
                      </span>
                    </Link>
                  ) : (
                    <div key={item.href} className="group relative">
                      <Link
                        to={item.href}
                        aria-label={item.label}
                        className="relative flex size-[38px] items-center justify-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-foreground/8 hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent/40 focus-visible:outline-none"
                      >
                        {item.icon}
                      </Link>
                      <span
                        aria-hidden="true"
                        className="pointer-events-none absolute top-full left-1/2 z-20 mt-1.5 -translate-x-1/2 translate-y-1 rounded-md bg-pine px-2 py-1 text-[11px] font-semibold whitespace-nowrap text-paper opacity-0 shadow-lg transition-[opacity,transform] duration-200 group-hover:translate-y-0 group-hover:opacity-100 dark:bg-volt dark:text-pine-n80"
                      >
                        {item.label}
                      </span>
                    </div>
                  )
                )}
              </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden items-center gap-2 justify-self-end lg:flex">
              <div className="flex items-center gap-0.5 rounded-full bg-foreground/[0.04] p-1">
                <button
                  type="button"
                  onClick={() => setSearchOpen(true)}
                  aria-label="Search events"
                  title="Search events (⌘K)"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                >
                  <Search className="size-[18px]" />
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  aria-label="Toggle theme"
                  title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="size-[18px] text-volt" /> : <Moon className="size-[18px]" />}
                </button>
                <button
                  type="button"
                  onClick={() => setMobileSimOpen(true)}
                  aria-label="Open Mobile App System"
                  title="Preview Mobile App System"
                  className="inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                >
                  <Smartphone className="size-[18px]" />
                </button>
                <Link
                  to="/cart"
                  aria-label="Open cart"
                  className="relative inline-flex size-9 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/8 hover:text-foreground"
                >
                  <ShoppingBag className="size-[18px]" />
                  {cartCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-volt px-1 text-[10px] font-extrabold text-pine-n80 shadow-sm">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>

              {user ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setUserMenuOpen((v) => !v)}
                    className="inline-flex h-9 items-center gap-2 rounded-full border border-border bg-surface px-3 text-[13px] font-semibold text-foreground shadow-sm transition-colors hover:border-accent/50 cursor-pointer"
                  >
                    <span className="grid size-6 place-items-center rounded-full bg-pine text-[11px] font-bold text-volt dark:bg-volt dark:text-pine-n80">
                      {user.firstName.charAt(0).toUpperCase()}
                    </span>
                    <span className="max-w-24 truncate">{user.firstName}</span>
                  </button>
                  {userMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-border bg-surface p-1.5 shadow-overlay">
                      <div className="border-b border-border px-3 py-2">
                        <p className="truncate text-xs font-bold text-foreground">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="truncate text-[11px] text-muted-foreground">{user.email}</p>
                      </div>
                      <Link
                        to="/profile/tickets"
                        className="mt-1 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-foreground hover:bg-foreground/6"
                      >
                        <Ticket className="size-3.5 text-accent-emphasis" />
                        My Tickets (QR Wallet)
                      </Link>
                      <Link
                        to="/find-my-tickets"
                        className="flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-foreground hover:bg-foreground/6"
                      >
                        <User className="size-3.5 text-muted-foreground" />
                        Find Guest Orders
                      </Link>
                      <button
                        type="button"
                        onClick={() => {
                          signOut();
                          setUserMenuOpen(false);
                        }}
                        className="mt-1 w-full rounded-xl px-3 py-2 text-left text-xs font-semibold text-destructive hover:bg-destructive/10 cursor-pointer"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link
                    to="/profile/tickets"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3.5 text-[13px] font-semibold text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10"
                  >
                    <Ticket className="size-3.5 text-accent-emphasis" />
                    My Tickets
                  </Link>
                  <Link
                    to="/login"
                    className="opentickets-glow inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-semibold"
                  >
                    Sign in
                  </Link>
                </div>
              )}
            </div>

            {/* Mobile Right Icons */}
            <div className="flex items-center gap-1 justify-self-end lg:hidden">
              <button
                type="button"
                onClick={() => setSearchOpen(true)}
                aria-label="Search events"
                className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground cursor-pointer"
              >
                <Search className="size-[18px]" />
              </button>
              <button
                type="button"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-foreground/5 hover:text-foreground cursor-pointer"
              >
                {theme === 'dark' ? <Sun className="size-[18px] text-volt" /> : <Moon className="size-[18px]" />}
              </button>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
};
