import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  CircleHelp,
  CirclePlus,
  House,
  Menu,
  MessagesSquare,
  Moon,
  Music,
  Search,
  ShoppingBag,
  Smartphone,
  Sun,
  Ticket,
  Trees,
  Trophy,
  User,
  X,
} from 'lucide-react';
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
  const [navExpanded, setNavExpanded] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setUserMenuOpen(false);
    setNavExpanded(false);
  }, [location.pathname]);

  const pathname = location.pathname;
  const resolvedMobileTitle = mobileTitle || (pathname === '/events' ? 'Events' : '');
  const isHome = pathname === '/';
  const isEvents = pathname.startsWith('/events') || pathname.startsWith('/o/') || pathname.startsWith('/event/');
  const isHost = pathname.startsWith('/host');
  const isContact = pathname.startsWith('/contact');
  const isFaq = pathname.startsWith('/faq');
  const activeCategory = new URLSearchParams(location.search).get('category')?.toLowerCase();

  const navItems = [
    { label: 'Home', href: '/', active: isHome, external: false, icon: <House className="size-[17px]" /> },
    { label: 'Events', href: '/events', active: isEvents && !activeCategory, external: false, icon: <Ticket className="size-[17px]" /> },
    { label: 'Sports', href: '/events?category=Football', active: isEvents && activeCategory === 'football', external: false, icon: <Trophy className="size-[17px]" /> },
    { label: 'Music', href: '/events?category=Music', active: isEvents && activeCategory === 'music', external: false, icon: <Music className="size-[17px]" /> },
    { label: 'Outdoor', href: '/events?category=Outdoor', active: isEvents && activeCategory === 'outdoor', external: false, icon: <Trees className="size-[17px]" /> },
    { label: 'FAQs', href: '/faq', active: isFaq, external: false, icon: <CircleHelp className="size-[17px]" /> },
    { label: 'Support', href: '/contact', active: isContact, external: false, icon: <MessagesSquare className="size-[17px]" /> },
    { label: 'Create', href: '/host', active: isHost, external: false, icon: <CirclePlus className="size-[17px]" /> },
  ];

  const centerNavItems = navItems.filter((item) => item.label !== 'Create');
  const utilityNavItems = navItems.filter((item) => item.label === 'Create');

  const handleMobileSearch = () => {
    if (pathname === '/events' && document.documentElement.classList.contains('ot-events-filter-docked')) {
      window.dispatchEvent(new CustomEvent('ot:toggle-events-search'));
      return;
    }
    setSearchOpen(true);
  };

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
            {/* Open Tickets brand — anchored at the far left on every screen */}
            <div className="justify-self-start lg:col-start-1 lg:row-start-1">
              <Link aria-label="Open Tickets home" className="ot-site-brand group flex w-fit items-center select-none" to="/">
                <img
                  alt="Open Tickets"
                  src="assets/logo/opentickets-logo-for-light.png"
                  className="h-10 w-auto transition-transform duration-200 group-hover:scale-105 dark:hidden"
                />
                <img
                  alt="Open Tickets"
                  src="assets/logo/opentickets-logo-for-dark.png"
                  className="hidden h-10 w-auto transition-transform duration-200 group-hover:scale-105 dark:block"
                />
              </Link>
            </div>

            {/* Mobile Scroll Center Title */}
            <div className="pointer-events-none min-w-0 overflow-hidden px-1 lg:hidden">
              <div
                className={`transition-[opacity,transform] duration-300 ease-out ${
                  scrolled && resolvedMobileTitle ? 'translate-y-0 opacity-100' : '-translate-y-1.5 opacity-0'
                }`}
              >
                <p className="truncate text-center text-[13px] leading-5 font-semibold tracking-tight text-foreground">
                  {resolvedMobileTitle}
                </p>
              </div>
            </div>

            {/* Desktop primary links — always visible at the centre of the header */}
            <nav className="hidden items-center justify-self-center lg:col-start-2 lg:row-start-1 lg:flex" aria-label="Primary navigation">
              <div className="ot-header-center-nav">
                {centerNavItems.map((item) => {
                  const content = (
                    <>
                      {item.icon}
                      <span aria-hidden="true" className="ot-header-center-tooltip">{item.label}</span>
                    </>
                  );
                  const className = `ot-header-center-link ${item.active ? 'is-active' : ''}`;
                  return item.external ? (
                    <a key={item.href} href={item.href} aria-label={item.label} aria-current={item.active ? 'page' : undefined} className={className}>{content}</a>
                  ) : (
                    <Link key={item.href} to={item.href} aria-label={item.label} aria-current={item.active ? 'page' : undefined} className={className}>{content}</Link>
                  );
                })}
              </div>
            </nav>

            {/* Desktop Right Actions */}
            <div className="hidden items-center gap-2 justify-self-end lg:col-start-3 lg:row-start-1 lg:flex">
              <nav aria-label="Primary navigation and tools">
                <div className={`ot-header-expand-shell ${navExpanded ? 'is-expanded' : ''}`}>
                  <div id="desktop-primary-links" className={`ot-header-expand-items ${navExpanded ? 'is-open' : ''}`}>
                    {utilityNavItems.map((item) => {
                      const activeContent = (
                        <>
                          <span className="ot-header-ticket-icon">{item.icon}</span>
                          <span className="ot-header-ticket-label">{item.label}</span>
                          <span className="ot-header-ticket-dashes" aria-hidden="true" />
                        </>
                      );

                      if (item.active) {
                        return item.external ? (
                          <a key={item.href} href={item.href} aria-current="page" onClick={() => setNavExpanded(false)} className="ot-header-ticket-active group/ticket focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none">
                            {activeContent}
                          </a>
                        ) : (
                          <Link key={item.href} to={item.href} aria-current="page" onClick={() => setNavExpanded(false)} className="ot-header-ticket-active group/ticket focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:outline-none">
                            {activeContent}
                          </Link>
                        );
                      }

                      return (
                        <div key={item.href} className="group relative shrink-0">
                          {item.external ? (
                            <a href={item.href} aria-label={item.label} onClick={() => setNavExpanded(false)} className="ot-header-reveal-icon">{item.icon}</a>
                          ) : (
                            <Link to={item.href} aria-label={item.label} onClick={() => setNavExpanded(false)} className="ot-header-reveal-icon">{item.icon}</Link>
                          )}
                          <span aria-hidden="true" className="ot-header-icon-tooltip">{item.label}</span>
                        </div>
                      );
                    })}

                    <span className="ot-header-tools-divider" aria-hidden="true" />

                    <div className="group relative shrink-0">
                      <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search events" className="ot-header-reveal-icon"><Search className="size-[17px]" /></button>
                      <span aria-hidden="true" className="ot-header-icon-tooltip">Search</span>
                    </div>
                    <div className="group relative shrink-0">
                      <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="ot-header-reveal-icon">{theme === 'dark' ? <Sun className="size-[17px] text-volt" /> : <Moon className="size-[17px]" />}</button>
                      <span aria-hidden="true" className="ot-header-icon-tooltip">Theme</span>
                    </div>
                    <div className="group relative shrink-0">
                      <button type="button" onClick={() => setMobileSimOpen(true)} aria-label="Open Mobile App System" className="ot-header-reveal-icon"><Smartphone className="size-[17px]" /></button>
                      <span aria-hidden="true" className="ot-header-icon-tooltip">Mobile view</span>
                    </div>
                    <div className="group relative shrink-0">
                      <Link to="/cart" aria-label="Open cart" className="ot-header-reveal-icon">
                        <ShoppingBag className="size-[17px]" />
                        {cartCount > 0 && <span className="absolute -top-0.5 -right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-volt px-1 text-[10px] font-extrabold text-pine-n80 shadow-sm">{cartCount}</span>}
                      </Link>
                      <span aria-hidden="true" className="ot-header-icon-tooltip">Cart</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="ot-header-nav-trigger"
                    onClick={() => setNavExpanded((value) => !value)}
                    aria-expanded={navExpanded}
                    aria-controls="desktop-primary-links"
                    aria-label={navExpanded ? 'Close navigation and tools' : 'Open navigation and tools'}
                    title={navExpanded ? 'Close menu' : 'Open menu'}
                  >
                    {navExpanded ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
                  </button>
                </div>
              </nav>

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
                <div className="flex shrink-0 items-center gap-1.5">
                  <Link
                    to="/profile/tickets"
                    className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border/80 bg-surface px-3.5 text-[13px] font-semibold whitespace-nowrap text-foreground transition-colors hover:border-accent/50 hover:bg-accent/10"
                  >
                    <Ticket className="size-3.5 text-accent-emphasis" />
                    My Tickets
                  </Link>
                  <Link
                    to="/login"
                    className="opentickets-glow inline-flex h-9 items-center justify-center rounded-full px-4 text-[13px] font-semibold whitespace-nowrap"
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
                onClick={handleMobileSearch}
                aria-label={pathname === '/events' ? 'Search events on this page' : 'Search events'}
                className="ot-mobile-header-search inline-flex size-10 items-center justify-center rounded-full text-muted-foreground transition-all duration-300 hover:bg-foreground/5 hover:text-foreground cursor-pointer"
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
