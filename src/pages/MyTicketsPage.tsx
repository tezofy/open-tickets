import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  Download,
  Maximize2,
  QrCode,
  ScanLine,
  Smartphone,
  Sparkles,
  Sun,
  Ticket,
  User,
  X,
} from 'lucide-react';
import { BookedTicket, useApp } from '../context/AppContext';
import { EVENTS, formatZAR } from '../data/events';

const TicketQrMatrix: React.FC<{ value: string; size?: number }> = ({ value, size = 148 }) => {
  const cells = 21;
  const matrix = useMemo(() => {
    let hash = 2166136261;
    for (let i = 0; i < value.length; i++) {
      hash ^= value.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const grid: boolean[][] = Array.from({ length: cells }, () => Array(cells).fill(false));

    const drawFinder = (r0: number, c0: number) => {
      for (let r = 0; r < 7; r++) {
        for (let c = 0; c < 7; c++) {
          const border = r === 0 || r === 6 || c === 0 || c === 6;
          const inner = r >= 2 && r <= 4 && c >= 2 && c <= 4;
          grid[r0 + r][c0 + c] = border || inner;
        }
      }
    };
    drawFinder(0, 0);
    drawFinder(0, cells - 7);
    drawFinder(cells - 7, 0);

    let seed = hash >>> 0;
    for (let r = 0; r < cells; r++) {
      for (let c = 0; c < cells; c++) {
        const inFinder =
          (r < 8 && c < 8) || (r < 8 && c >= cells - 8) || (r >= cells - 8 && c < 8);
        if (inFinder) continue;
        seed = (seed * 1664525 + 1013904223) >>> 0;
        grid[r][c] = (seed & 3) === 0 || (seed & 5) === 1;
      }
    }
    return grid;
  }, [value]);

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${cells} ${cells}`}
      shapeRendering="crispEdges"
      className="rounded-xl bg-white p-2.5 shadow-xs"
      aria-label={`QR Code for ${value}`}
    >
      <rect width={cells} height={cells} fill="#ffffff" />
      {matrix.map((row, r) =>
        row.map((on, c) =>
          on ? <rect key={`${r}-${c}`} x={c} y={r} width={1} height={1} fill="#040e0e" /> : null
        )
      )}
    </svg>
  );
};

export const MyTicketsPage: React.FC = () => {
  const { tickets, user, signOut, installPwa, notify } = useApp();
  const [activeTab, setActiveTab] = useState<'passes' | 'scanner' | 'account'>('passes');
  const [gateModalTicket, setGateModalTicket] = useState<BookedTicket | null>(null);
  const [scanInput, setScanInput] = useState('');
  const [scanResult, setScanResult] = useState<{
    found: boolean;
    ticket?: BookedTicket;
  } | null>(null);

  const handleDownloadPass = (t: BookedTicket) => {
    const content = [
      '=========================================',
      '          OPENTICKETS E-TICKET PASS          ',
      '=========================================',
      `Order No   : ${t.orderNumber}`,
      `Ticket ID  : ${t.id}`,
      `Event      : ${t.eventTitle}`,
      `Category   : ${t.seatCategory}`,
      `Quantity   : ${t.quantity} Admit(s)`,
      `Venue      : ${t.venue}`,
      `Date & Time: ${t.dateTime}`,
      `Attendee   : ${t.attendeeName} (${t.attendeeEmail})`,
      `Total Paid : ${formatZAR(t.totalPaid)} via ${t.paymentMethod}`,
      '=========================================',
      'This prototype QR is not an official Open Tickets ticket and cannot be used for venue entry.',
    ].join('\n');

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${t.orderNumber}-opentickets-pass.txt`;
    a.click();
    URL.revokeObjectURL(url);
    notify(`Downloaded ticket pass ${t.orderNumber}`, 'success');
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    const q = scanInput.trim().toUpperCase();
    if (!q) return;
    const match = tickets.find(
      (t) => t.id.toUpperCase() === q || t.orderNumber.toUpperCase() === q
    );
    setScanResult({ found: Boolean(match), ticket: match });
  };

  return (
    <main id="main-content" className="flex-1 bg-background py-8 sm:py-12">
      <div className="mx-auto w-full max-w-5xl space-y-6 px-4 sm:px-6">
        {/* Mobile Wallet App Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl bg-pine p-6 text-paper shadow-card dark:bg-pine-n60 dark:ring-1 dark:ring-paper/10">
          <div className="space-y-1">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-volt/15 px-3 py-1 text-[11px] font-bold tracking-wider text-volt uppercase">
              <Sparkles className="size-3" />
              Open Tickets Mobile Wallet
            </span>
            <h1 className="font-heading text-2xl font-extrabold tracking-tight sm:text-3xl">
              My QR Tickets & Passes
            </h1>
            <p className="text-xs text-paper/75 sm:text-sm">
              Local demo passes only. These QR codes are not valid for venue entry or official Open Tickets admission.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={installPwa}
              className="inline-flex items-center gap-2 rounded-xl border border-paper/20 bg-paper/10 px-4 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-paper/18 cursor-pointer"
            >
              <Smartphone className="size-4 text-volt" />
              Add App to Home Screen
            </button>
            <Link
              to="/events"
              className="opentickets-glow inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold"
            >
              Book More
            </Link>
          </div>
        </div>

        {/* Navigation Pill Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          <button
            type="button"
            onClick={() => setActiveTab('passes')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'passes'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            <Ticket className="size-3.5" />
            Active Passes ({tickets.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('scanner')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            <ScanLine className="size-3.5" />
            Gate QR Verifier
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('account')}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors cursor-pointer ${
              activeTab === 'account'
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-surface text-muted-foreground hover:text-foreground'
            }`}
          >
            <User className="size-3.5" />
            Account Details
          </button>
        </div>

        {/* TAB 1: Perforated QR Ticket Wallet */}
        {activeTab === 'passes' && (
          <div className="space-y-5">
            {tickets.length === 0 ? (
              <div className="rounded-3xl bg-surface p-12 text-center shadow-card">
                <QrCode className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-3 text-base font-bold text-foreground">No passes yet</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Tickets you purchase appear right here with instant QR entry codes.
                </p>
                <Link
                  to="/events"
                  className="opentickets-glow mt-5 inline-flex h-11 items-center rounded-xl px-5 text-sm font-semibold"
                >
                  Browse events
                </Link>
              </div>
            ) : (
              tickets.map((t) => {
                const ev = EVENTS.find((e) => e.id === t.eventId);
                return (
                  <article
                    key={t.id}
                    className="overflow-hidden rounded-3xl border border-border/80 bg-surface shadow-card transition-shadow hover:shadow-elevated"
                  >
                    <div className="grid grid-cols-1 md:grid-cols-[1fr_auto]">
                      {/* Left Ticket Body */}
                      <div className="flex flex-col justify-between p-5 sm:p-6">
                        <div className="space-y-3">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 dark:text-emerald-300">
                              <CheckCircle2 className="size-3" />
                              Prototype QR · Not valid for entry
                            </span>
                            <span className="rounded-full bg-foreground/8 px-2.5 py-0.5 font-mono text-[11px] font-semibold text-muted-foreground">
                              {t.orderNumber}
                            </span>
                            
                          </div>

                          <div className="flex items-start gap-4">
                            <img
                              src={t.bannerImage}
                              alt={t.eventTitle}
                              className="hidden h-20 w-28 shrink-0 rounded-xl object-cover sm:block"
                            />
                            <div>
                              <Link
                                to={ev ? `/o/${ev.organizerSlug}/${ev.slug}` : '/events'}
                                className="font-heading text-lg font-extrabold text-foreground hover:text-accent-emphasis sm:text-xl"
                              >
                                {t.eventTitle}
                              </Link>
                              <p className="mt-1 text-xs font-medium text-muted-foreground">
                                {t.venue} ·{' '}
                                <span className="font-semibold text-foreground">{t.dateTime}</span>
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-background/80 p-3.5 text-xs sm:grid-cols-4">
                            <div>
                              <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Seat Category
                              </span>
                              <span className="mt-0.5 block font-bold text-foreground">
                                {t.seatCategory}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Admits
                              </span>
                              <span className="mt-0.5 block font-bold text-foreground">
                                {t.quantity} Ticket(s)
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Attendee
                              </span>
                              <span className="mt-0.5 block truncate font-bold text-foreground">
                                {t.attendeeName}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                                Paid ({t.paymentMethod})
                              </span>
                              <span className="mt-0.5 block font-bold text-foreground">
                                {formatZAR(t.totalPaid)}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-2.5 pt-2">
                          <button
                            type="button"
                            onClick={() => setGateModalTicket(t)}
                            className="opentickets-glow inline-flex h-9 items-center gap-1.5 rounded-xl px-4 text-xs font-bold cursor-pointer"
                          >
                            <Maximize2 className="size-3.5" />
                            Gate Entry Mode
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDownloadPass(t)}
                            className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-border bg-background px-3.5 text-xs font-semibold text-foreground hover:border-accent cursor-pointer"
                          >
                            <Download className="size-3.5" />
                            Download Pass
                          </button>
                        </div>
                      </div>

                      {/* Perforated QR Stub */}
                      <div className="relative flex flex-col items-center justify-center border-t border-dashed border-border bg-pine-80/35 p-6 md:w-60 md:border-t-0 md:border-l dark:bg-pine-n60/50">
                        <TicketQrMatrix value={t.qrCodeData || t.orderNumber} size={136} />
                        <span className="mt-2.5 font-mono text-[11px] font-bold tracking-wider text-foreground">
                          {t.orderNumber}
                        </span>
                        <span className="text-[10px] text-muted-foreground">Scan at venue gate</span>
                      </div>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        )}

        {/* TAB 2: Interactive Gate QR Scanner / Verifier */}
        {activeTab === 'scanner' && (
          <div className="rounded-3xl bg-surface p-6 shadow-card sm:p-8">
            <h2 className="text-lg font-bold text-foreground">Gate Ticket Verification</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter or paste any Order Number (e.g.{' '}
              <button
                type="button"
                onClick={() => setScanInput(tickets[0]?.orderNumber || 'OT-2026-88412')}
                className="font-mono font-bold text-accent-emphasis underline cursor-pointer"
              >
                {tickets[0]?.orderNumber || 'OT-2026-88412'}
              </button>
              ) to verify authenticity.
            </p>

            <form onSubmit={handleVerifyCode} className="mt-4 flex flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={scanInput}
                onChange={(e) => setScanInput(e.target.value)}
                placeholder="Enter Order Number (e.g. OT-2026-88412)"
                className="h-12 flex-1 rounded-xl border border-border bg-background px-4 font-mono text-sm text-foreground outline-none focus:border-accent"
              />
              <button
                type="submit"
                className="opentickets-glow h-12 rounded-xl px-6 text-sm font-bold cursor-pointer"
              >
                Verify Ticket
              </button>
            </form>

            {scanResult && (
              <div
                className={`mt-5 rounded-2xl border p-4 ${
                  scanResult.found
                    ? 'border-emerald-500/40 bg-emerald-500/10 text-foreground'
                    : 'border-danger/40 bg-danger/10 text-foreground'
                }`}
              >
                {scanResult.found && scanResult.ticket ? (
                  <div className="space-y-1 text-sm">
                    <p className="font-bold text-emerald-700 dark:text-emerald-300">
                      ✓ Verified Authentic Pass — Ready for Gate Entry
                    </p>
                    <p className="font-semibold">{scanResult.ticket.eventTitle}</p>
                    <p className="text-xs text-muted-foreground">
                      Holder: {scanResult.ticket.attendeeName} · {scanResult.ticket.quantity} ×{' '}
                      {scanResult.ticket.seatCategory}
                    </p>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-danger">
                    ✕ No matching ticket found in local wallet for “{scanInput}”.
                  </p>
                )}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Account Details */}
        {activeTab === 'account' && (
          <div className="rounded-3xl bg-surface p-6 shadow-card sm:p-8">
            {user ? (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <h2 className="text-lg font-bold text-foreground">
                    {user.firstName} {user.lastName}
                  </h2>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                  <p className="text-xs text-muted-foreground">{user.phone}</p>
                </div>
                <button
                  type="button"
                  onClick={signOut}
                  className="rounded-xl border border-border px-4 py-2 text-xs font-semibold text-danger hover:bg-danger/10 cursor-pointer"
                >
                  Sign out
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-base font-bold text-foreground">
                    Browsing in Guest Wallet Mode
                  </h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Sign in to sync your tickets across all phones and browsers.
                  </p>
                </div>
                <div className="flex items-center gap-2.5">
                  <Link
                    to="/login"
                    className="opentickets-glow inline-flex h-10 items-center rounded-xl px-4 text-xs font-bold"
                  >
                    Sign in
                  </Link>
                  <Link
                    to="/register"
                    className="inline-flex h-10 items-center rounded-xl border border-border px-4 text-xs font-semibold text-foreground"
                  >
                    Create account
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* High-Brightness Gate Entry QR Modal */}
      {gateModalTicket && (
        <div
          className="fixed inset-0 z-[95] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
          onClick={() => setGateModalTicket(null)}
        >
          <div
            className="w-full max-w-sm rounded-3xl bg-white p-6 text-center text-[#040e0e] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#eef8d7] px-3 py-1 text-[11px] font-bold text-[#154546]">
                <Sun className="size-3.5" />
                Max Contrast Gate Pass
              </span>
              <button
                type="button"
                onClick={() => setGateModalTicket(null)}
                className="grid size-8 place-items-center rounded-full bg-black/6 text-black cursor-pointer"
              >
                <X className="size-4" />
              </button>
            </div>

            <h3 className="mt-4 text-base font-extrabold leading-snug">
              {gateModalTicket.eventTitle}
            </h3>
            <p className="mt-1 text-xs text-gray-600">
              {gateModalTicket.seatCategory} · {gateModalTicket.quantity} Admit(s)
            </p>

            <div className="my-5 flex justify-center">
              <TicketQrMatrix
                value={`${gateModalTicket.qrCodeData}|GATE`}
                size={210}
              />
            </div>

            <p className="font-mono text-sm font-extrabold tracking-widest text-[#154546]">
              {gateModalTicket.orderNumber}
            </p>
            <p className="mt-1 text-[11px] text-gray-500">
              Attendee: {gateModalTicket.attendeeName}
            </p>
          </div>
        </div>
      )}
    </main>
  );
};
