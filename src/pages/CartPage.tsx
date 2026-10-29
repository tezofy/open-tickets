import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  ArrowRight,
  Clock,
  Lock,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { EVENTS, formatZAR } from '../data/events';

const PAYMENT_METHODS = [
  { id: '1Voucher', label: '1Voucher', logo: '/assets/pgw-logos/1voucher.svg' },
  { id: 'Visa', label: 'Visa Credit / Debit', logo: '/assets/pgw-logos/pgw-visa.svg' },
  { id: 'Mastercard', label: 'Mastercard', logo: '/assets/pgw-logos/pgw-mastercard.svg' },
  { id: 'Banking App', label: 'Banking App', logo: '/assets/pgw-logos/bank-app.svg' },
];

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartExpiresAt,
    updateCartQty,
    removeCartItem,
    clearCart,
    completeCheckout,
    user,
  } = useApp();
  const navigate = useNavigate();

  const fullNameFromUser = user ? `${user.firstName} ${user.lastName}`.trim() : '';

  const [secondsLeft, setSecondsLeft] = useState<number>(600);
  const [attendeeName, setAttendeeName] = useState(fullNameFromUser);
  const [attendeeEmail, setAttendeeEmail] = useState(user?.email || '');
  const [attendeePhone, setAttendeePhone] = useState(user?.phone || '');
  const [paymentMethod, setPaymentMethod] = useState('Card');
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    if (user) {
      if (!attendeeName) setAttendeeName(`${user.firstName} ${user.lastName}`.trim());
      if (!attendeeEmail) setAttendeeEmail(user.email);
      if (!attendeePhone) setAttendeePhone(user.phone);
    }
  }, [user]);

  useEffect(() => {
    if (!cartExpiresAt) return;
    const tick = () => {
      const diff = Math.max(0, Math.floor((cartExpiresAt - Date.now()) / 1000));
      setSecondsLeft(diff);
      if (diff === 0 && cart.length > 0) {
        clearCart();
      }
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [cartExpiresAt, cart.length]);

  const cartSubtotal = useMemo(
    () => cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const mins = String(Math.floor(secondsLeft / 60)).padStart(2, '0');
  const secs = String(secondsLeft % 60).padStart(2, '0');

  // This local prototype has no payment gateway or platform-fee data.
  const grandTotal = cartSubtotal;

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!attendeeName.trim() || !attendeeEmail.trim() || !attendeePhone.trim()) return;
    setProcessing(true);
    setTimeout(() => {
      completeCheckout({
        attendeeName: attendeeName.trim(),
        attendeeEmail: attendeeEmail.trim(),
        attendeePhone: attendeePhone.trim(),
        paymentMethod,
        totalPaid: grandTotal,
      });
      setProcessing(false);
      navigate('/profile/tickets');
    }, 900);
  };

  return (
    <main id="main-content" className="flex-1 bg-background py-8 sm:py-12">
      <div className="mx-auto w-full max-w-6xl space-y-6 px-4 sm:px-6">
        {/* Exact Open Tickets /cart Top Header */}
        <header className="flex flex-wrap items-end justify-between gap-4 border-b border-border/60 pb-5">
          <div>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              Your cart
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              {cart.length === 0
                ? 'No tickets in your cart right now.'
                : `${cartCount} ticket(s) reserved for immediate checkout.`}
            </p>
          </div>
          <Link
            to="/events"
            className="inline-flex h-9 items-center justify-center rounded-lg border border-border bg-surface px-4 text-xs font-semibold text-foreground transition-colors hover:border-accent"
          >
            Browse events
          </Link>
        </header>

        {/* Empty Cart State */}
        {cart.length === 0 ? (
          <div className="flex flex-col items-center gap-4 rounded-3xl bg-surface p-10 text-center shadow-card">
            <div className="grid size-12 place-items-center rounded-2xl bg-pine-80/70 text-pine dark:bg-pine-n60 dark:text-accent">
              <ShoppingCart className="size-5" />
            </div>
            <div className="space-y-1">
              <p className="text-base font-bold text-foreground">Your cart is empty</p>
              <p className="text-xs text-muted-foreground">
                Pick an event and select tickets to start an order.
              </p>
            </div>
            <Link
              to="/events"
              className="opentickets-glow mt-1 inline-flex h-11 items-center gap-2 rounded-xl px-5 text-sm font-semibold"
            >
              Explore events
              <ArrowRight className="size-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            <div className="space-y-6 lg:col-span-7">
              {/* 10-Minute Hold Banner */}
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-accent/40 bg-accent/12 px-4 py-3 text-xs sm:text-sm">
                <div className="flex items-center gap-2.5 font-medium text-foreground">
                  <Clock className="size-4 shrink-0 text-accent-emphasis" />
                  <span>Tickets held for limited time while you complete payment</span>
                </div>
                <span className="rounded-lg bg-pine px-2.5 py-1 font-mono text-xs font-bold text-volt">
                  {mins}:{secs}
                </span>
              </div>

              {/* Ticket Items List */}
              <div className="divide-y divide-border/70 rounded-3xl bg-surface shadow-card">
                {cart.map((item) => {
                  const ev = EVENTS.find((e) => e.id === item.eventId);
                  return (
                    <div
                      key={`${item.eventId}-${item.tierId}`}
                      className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="flex min-w-0 items-start gap-3.5">
                        {ev && (
                          <img
                            src={ev.bannerImage}
                            alt={ev.title}
                            className="h-16 w-20 shrink-0 rounded-xl bg-muted object-cover"
                          />
                        )}
                        <div className="min-w-0">
                          <Link
                            to={ev ? `/o/${ev.organizerSlug}/${ev.slug}` : '/events'}
                            className="line-clamp-1 text-sm font-bold text-foreground hover:text-accent-emphasis"
                          >
                            {ev?.title || 'Live Event'}
                          </Link>
                          <p className="mt-0.5 text-xs font-semibold text-accent-emphasis">
                            {item.seatCategory} · {item.priceCategoryLabel}
                          </p>
                          {ev && (
                            <p className="mt-0.5 text-[11px] text-muted-foreground">
                              {ev.venue} · {ev.otDateTime}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-4 sm:justify-end">
                        <div className="flex items-center gap-2 rounded-xl border border-border bg-background px-2 py-1">
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.eventId, item.tierId, -1)}
                            aria-label="Decrease quantity"
                            className="grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                          >
                            <Minus className="size-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm font-bold text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateCartQty(item.eventId, item.tierId, 1)}
                            aria-label="Increase quantity"
                            className="grid size-7 place-items-center rounded-lg text-muted-foreground hover:bg-foreground/8 hover:text-foreground cursor-pointer"
                          >
                            <Plus className="size-3.5" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-sm font-bold text-foreground">
                            {formatZAR(item.unitPrice * item.quantity)}
                          </p>
                          <p className="text-[11px] text-muted-foreground">
                            {formatZAR(item.unitPrice)} each
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeCartItem(item.eventId, item.tierId)}
                          aria-label="Remove item"
                          className="grid size-8 place-items-center rounded-lg text-muted-foreground hover:bg-danger/10 hover:text-danger cursor-pointer"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Attendee Details Form */}
              <form
                id="checkout-form"
                onSubmit={handleCheckout}
                className="space-y-4 rounded-3xl bg-surface p-6 shadow-card"
              >
                <h2 className="text-base font-bold text-foreground">Attendee & Delivery Details</h2>
                <p className="text-xs text-muted-foreground">
                  Prototype only: this checkout does not process payments or issue official Open Tickets tickets. For a real purchase, use the official Open Tickets event page.
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="sm:col-span-2">
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Full name *
                    </label>
                    <input
                      type="text"
                      required
                      value={attendeeName}
                      onChange={(e) => setAttendeeName(e.target.value)}
                      placeholder="e.g. Tanvir Rahman"
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Email address *
                    </label>
                    <input
                      type="email"
                      required
                      value={attendeeEmail}
                      onChange={(e) => setAttendeeEmail(e.target.value)}
                      placeholder="you@example.com"
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">
                      Mobile number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={attendeePhone}
                      onChange={(e) => setAttendeePhone(e.target.value)}
                      placeholder="+27 XX XXX XXXX"
                      className="h-11 w-full rounded-xl border border-border bg-background px-3.5 text-sm text-foreground outline-none focus:border-accent"
                    />
                  </div>
                </div>

                {/* Payment Gateway Selector */}
                <div className="pt-2">
                  <label className="mb-2 block text-xs font-semibold text-foreground">
                    Payment Method
                  </label>
                  <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
                    {PAYMENT_METHODS.map((pm) => {
                      const active = paymentMethod === pm.id;
                      return (
                        <button
                          key={pm.id}
                          type="button"
                          onClick={() => setPaymentMethod(pm.id)}
                          className={`flex flex-col items-center justify-center gap-1.5 rounded-2xl border p-3 transition-all cursor-pointer ${
                            active
                              ? 'border-accent bg-accent/12 ring-2 ring-accent/40'
                              : 'border-border bg-background hover:border-accent/40'
                          }`}
                        >
                          <img src={pm.logo} alt={pm.id} className="h-6 w-auto object-contain" />
                          <span className="text-[11px] font-semibold text-foreground">{pm.id}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </form>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-5">
              <div className="sticky top-20 space-y-5 rounded-3xl bg-surface p-6 shadow-card">
                <h2 className="text-base font-bold text-foreground">Order Summary</h2>

                <div className="space-y-2.5 border-b border-border/70 pb-4 text-sm">
                  <div className="flex items-center justify-between text-muted-foreground">
                    <span>Tickets subtotal</span>
                    <span className="font-semibold text-foreground">{formatZAR(cartSubtotal)}</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between">
                  <span className="text-sm font-bold text-foreground">Total Payable</span>
                  <span className="font-heading text-2xl font-extrabold text-foreground">
                    {formatZAR(grandTotal)}
                  </span>
                </div>

                <button
                  type="submit"
                  form="checkout-form"
                  disabled={processing}
                  className="opentickets-glow flex h-12 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold cursor-pointer disabled:opacity-60"
                >
                  <Lock className="size-4" />
                  {processing
                    ? `Processing via ${paymentMethod}...`
                    : `Pay ${formatZAR(grandTotal)} with ${paymentMethod}`}
                </button>

                <p className="text-center text-[11px] leading-relaxed text-muted-foreground">
                  By completing this purchase, you agree to Open Tickets’{' '}
                  <Link to="/terms" className="underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/refund-policy" className="underline">
                    Refund Policy
                  </Link>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};
