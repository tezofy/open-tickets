import React, { createContext, useContext, useEffect, useState } from 'react';
import { EVENTS } from '../data/events';

export interface CartItem {
  eventId: string;
  tierId: string;
  seatCategory: string;
  priceCategoryLabel: string;
  unitPrice: number;
  quantity: number;
}

export interface BookedTicket {
  id: string;
  orderNumber: string;
  eventId: string;
  eventTitle: string;
  venue: string;
  dateTime: string;
  bannerImage: string;
  seatCategory: string;
  quantity: number;
  attendeeName: string;
  attendeeEmail: string;
  attendeePhone: string;
  paymentMethod: string;
  totalPaid: number;
  qrCodeData: string;
  bookedAt: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  username: string;
}

export interface ToastMsg {
  id: string;
  title: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextValue {
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  cart: CartItem[];
  cartCount: number;
  cartExpiresAt: number | null;
  addTicketsToCart: (eventId: string, selections: Record<string, number>) => void;
  updateCartQty: (eventId: string, tierId: string, delta: number) => void;
  removeCartItem: (eventId: string, tierId: string) => void;
  clearCart: () => void;
  tickets: BookedTicket[];
  completeCheckout: (payload: {
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
    paymentMethod: string;
    totalPaid: number;
  }) => BookedTicket[];
  user: UserProfile | null;
  signIn: (profile: UserProfile) => void;
  signOut: () => void;
  searchOpen: boolean;
  setSearchOpen: (v: boolean) => void;
  mobileDrawerOpen: boolean;
  setMobileDrawerOpen: (v: boolean) => void;
  mobileSimOpen: boolean;
  setMobileSimOpen: (v: boolean) => void;
  storyEventId: string | null;
  setStoryEventId: (id: string | null) => void;
  toasts: ToastMsg[];
  notify: (title: string, type?: 'success' | 'info' | 'error') => void;
  installPwa: () => void;
  canInstallPwa: boolean;
}

const AppContext = createContext<AppContextValue | null>(null);

const DEMO_INITIAL_TICKETS: BookedTicket[] = []; // No fabricated purchases in the Open Tickets dataset.

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    const saved = localStorage.getItem('ot_demo_theme');
    return saved === 'dark' ? 'dark' : 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const raw = localStorage.getItem('ot_demo_cart');
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [cartExpiresAt, setCartExpiresAt] = useState<number | null>(() => {
    try {
      const raw = localStorage.getItem('ot_demo_cart_exp');
      return raw ? Number(raw) : null;
    } catch {
      return null;
    }
  });

  const [tickets, setTickets] = useState<BookedTicket[]>(() => {
    try {
      const raw = localStorage.getItem('ot_demo_tickets');
      return raw ? JSON.parse(raw) : DEMO_INITIAL_TICKETS;
    } catch {
      return DEMO_INITIAL_TICKETS;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const raw = localStorage.getItem('ot_demo_user');
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [mobileSimOpen, setMobileSimOpen] = useState(false);
  const [storyEventId, setStoryEventId] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('ot_demo_theme', theme);
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('ot_demo_cart', JSON.stringify(cart));
    if (cart.length === 0) {
      setCartExpiresAt(null);
      localStorage.removeItem('ot_demo_cart_exp');
    }
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('ot_demo_tickets', JSON.stringify(tickets));
  }, [tickets]);

  useEffect(() => {
    if (user) {
      localStorage.setItem('ot_demo_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('ot_demo_user');
    }
  }, [user]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        setSearchOpen(false);
        setMobileDrawerOpen(false);
        setStoryEventId(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const notify = (title: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).slice(2);
    setToasts((prev) => [...prev, { id, title, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3600);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  const addTicketsToCart = (eventId: string, selections: Record<string, number>) => {
    const ev = EVENTS.find((e) => e.id === eventId);
    if (!ev) return;

    setCart((prev) => {
      const next = [...prev];
      Object.entries(selections).forEach(([tierId, qty]) => {
        if (qty <= 0) return;
        const tier = ev.ticketTiers.find((t) => t.id === tierId);
        if (!tier) return;
        const idx = next.findIndex((i) => i.eventId === eventId && i.tierId === tierId);
        if (idx >= 0) {
          next[idx] = { ...next[idx], quantity: Math.min(10, next[idx].quantity + qty) };
        } else {
          next.push({
            eventId,
            tierId,
            seatCategory: tier.seatCategory,
            priceCategoryLabel: tier.priceCategoryLabel,
            unitPrice: tier.price,
            quantity: Math.min(10, qty),
          });
        }
      });
      return next;
    });

    const exp = Date.now() + 10 * 60 * 1000;
    setCartExpiresAt(exp);
    localStorage.setItem('ot_demo_cart_exp', String(exp));
    notify('Tickets added to cart — held for 10:00 minutes', 'success');
  };

  const updateCartQty = (eventId: string, tierId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.eventId === eventId && item.tierId === tierId
            ? { ...item, quantity: Math.min(10, item.quantity + delta) }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeCartItem = (eventId: string, tierId: string) => {
    setCart((prev) => prev.filter((item) => !(item.eventId === eventId && item.tierId === tierId)));
    notify('Removed ticket from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
    setCartExpiresAt(null);
    localStorage.removeItem('ot_demo_cart_exp');
  };

  const completeCheckout = (payload: {
    attendeeName: string;
    attendeeEmail: string;
    attendeePhone: string;
    paymentMethod: string;
    totalPaid: number;
  }): BookedTicket[] => {
    const orderNumber = `OT-2026-${Math.floor(10000 + Math.random() * 89999)}`;
    const nowStr = new Date().toISOString().slice(0, 16).replace('T', ' ');
    const created: BookedTicket[] = cart.map((item, idx) => {
      const ev = EVENTS.find((e) => e.id === item.eventId);
      return {
        id: `tkt-${Date.now()}-${idx}`,
        orderNumber,
        eventId: item.eventId,
        eventTitle: ev?.title || 'Open Tickets Event',
        venue: ev?.venue || 'South Africa',
        dateTime: ev?.otDateTime || '2026-11-01, 18:00',
        bannerImage: ev?.bannerImage || '/media/events/ot_01m5ena2smd0hden3vqrxdks07.jpg',
        seatCategory: item.seatCategory,
        quantity: item.quantity,
        attendeeName: payload.attendeeName,
        attendeeEmail: payload.attendeeEmail,
        attendeePhone: payload.attendeePhone,
        paymentMethod: payload.paymentMethod,
        totalPaid: payload.totalPaid,
        qrCodeData: `OPENTICKETS|${orderNumber}|${item.tierId.toUpperCase()}|QTY:${item.quantity}|VALID`,
        bookedAt: nowStr,
      };
    });

    setTickets((prev) => [...created, ...prev]);
    clearCart();
    notify(`Order ${orderNumber} confirmed! Prototype wallet updated. No official ticket was issued.`, 'success');
    return created;
  };

  const signIn = (profile: UserProfile) => {
    setUser(profile);
    notify(`Signed in as ${profile.firstName} ${profile.lastName}`, 'success');
  };

  const signOut = () => {
    setUser(null);
    notify('Signed out of Open Tickets', 'info');
  };

  const installPwa = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      setDeferredPrompt(null);
    } else {
      setMobileSimOpen(true);
      notify('Opened Open Tickets Mobile App Experience!', 'info');
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <AppContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        cartCount,
        cartExpiresAt,
        addTicketsToCart,
        updateCartQty,
        removeCartItem,
        clearCart,
        tickets,
        completeCheckout,
        user,
        signIn,
        signOut,
        searchOpen,
        setSearchOpen,
        mobileDrawerOpen,
        setMobileDrawerOpen,
        mobileSimOpen,
        setMobileSimOpen,
        storyEventId,
        setStoryEventId,
        toasts,
        notify,
        installPwa,
        canInstallPwa: Boolean(deferredPrompt),
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
}
