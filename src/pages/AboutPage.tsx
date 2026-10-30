import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  Compass,
  FileCheck2,
  Headphones,
  MapPin,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
  WalletCards,
  Zap,
} from 'lucide-react';

const journey = [
  { icon: Compass, number: '01', title: 'Discover', copy: 'Explore concerts, sport, festivals and community experiences.' },
  { icon: Ticket, number: '02', title: 'Choose', copy: 'Review event information, dates, venues and ticket categories.' },
  { icon: WalletCards, number: '03', title: 'Book', copy: 'Complete the official checkout flow for your selected event.' },
  { icon: QrCode, number: '04', title: 'Experience', copy: 'Keep your digital ticket ready and enjoy the moment.' },
];

export const AboutPage: React.FC = () => (
  <main id="main-content" className="ot-about-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
    <section className="ot-about-hero" aria-labelledby="about-page-title">
      <img src="media/about-open-tickets-ai.jpg" alt="Friends arriving at a live event with a digital Open Tickets pass" />
      <div className="ot-about-hero-shade" aria-hidden="true" />
      <span className="ot-about-hero-cut ot-about-hero-cut-left" aria-hidden="true" />
      <span className="ot-about-hero-cut ot-about-hero-cut-right" aria-hidden="true" />

      <div className="ot-about-hero-copy">
        <p><Sparkles className="size-3.5" /> BUILT AROUND LIVE EXPERIENCES</p>
        <h1 id="about-page-title">About<br />Open Tickets</h1>
        <span>Connecting people with the concerts, matches, festivals and community moments that make South Africa move.</span>
      </div>

      <div className="ot-about-hero-badges">
        <span><ShieldCheck className="size-4" /> Official ticketing journey</span>
        <span><Zap className="size-4" /> Digital-first experience</span>
      </div>
    </section>

    <section className="ot-about-trust" aria-label="Open Tickets experience">
      <span><Compass className="size-4" /><strong>Discover with ease</strong><small>Find experiences worth showing up for</small></span>
      <span><Ticket className="size-4" /><strong>Book with clarity</strong><small>Event and ticket details in one journey</small></span>
      <span><QrCode className="size-4" /><strong>Enter digitally</strong><small>Your ticket stays ready on your device</small></span>
    </section>

    <div className="ot-about-content">
      <section className="ot-about-intro">
        <div className="ot-about-intro-title">
          <small>WHO WE ARE</small>
          <h2>Great events begin with a simple way in.</h2>
        </div>
        <div className="ot-about-intro-copy">
          <p>Open Tickets is an event-ticketing platform serving events across South Africa. Its public experience brings event information, ticket categories, venue details and purchasing options together, helping guests move from discovery to the gate.</p>
          <p>After checkout, buyers receive the delivery and account-access instructions linked to their order. The result is a clear digital journey designed around the anticipation of attending something memorable.</p>
          <a href="https://opentickets.co.za/" target="_blank" rel="noreferrer">Visit the official website <ArrowUpRight className="size-4" /></a>
        </div>
      </section>

      <section className="ot-about-pillars" aria-labelledby="about-pillars-title">
        <div className="ot-about-section-heading">
          <div><small>WHAT MATTERS</small><h2 id="about-pillars-title">Designed around every side of the event</h2></div>
          <span>PEOPLE · EVENTS · ACCESS</span>
        </div>
        <div className="ot-about-pillar-grid">
          <article>
            <span><Users className="size-5" /></span><small>FOR GUESTS</small><h3>Less friction. More anticipation.</h3><p>Clear event details and digital ticket access help guests focus on the experience ahead.</p>
            <Link to="/events">Explore events <ArrowRight className="size-3.5" /></Link>
          </article>
          <article>
            <span><CalendarDays className="size-5" /></span><small>FOR EVENTS</small><h3>Information that earns confidence.</h3><p>Dates, venues, descriptions and ticket categories are presented as part of one connected journey.</p>
            <a href="https://opentickets.co.za/" target="_blank" rel="noreferrer">Official platform <ArrowUpRight className="size-3.5" /></a>
          </article>
          <article>
            <span><Headphones className="size-5" /></span><small>FOR SUPPORT</small><h3>Help when the details matter.</h3><p>Official support channels are available for questions about purchases and digital tickets.</p>
            <Link to="/contact">Get support <ArrowRight className="size-3.5" /></Link>
          </article>
        </div>
      </section>

      <section className="ot-about-journey" aria-labelledby="about-journey-title">
        <span className="ot-about-journey-cut ot-about-journey-cut-left" aria-hidden="true" />
        <span className="ot-about-journey-cut ot-about-journey-cut-right" aria-hidden="true" />
        <header><span><Ticket className="size-5" /></span><div><small>THE TICKET JOURNEY</small><h2 id="about-journey-title">From “what’s on?” to being there.</h2></div><b>OT / LIVE / ZA</b></header>
        <div className="ot-about-journey-grid">
          {journey.map(({ icon: Icon, number, title, copy }) => (
            <article key={title}><span><Icon className="size-4" /></span><small>{number}</small><h3>{title}</h3><p>{copy}</p></article>
          ))}
        </div>
      </section>

      <section className="ot-about-organisers">
        <div>
          <small>FOR EVENT ORGANISERS</small>
          <h2>Bringing people and live moments together.</h2>
          <p>For event and ticketing enquiries, use the official Open Tickets channels to discuss the needs of your event.</p>
          <Link to="/contact">Contact information <ArrowRight className="size-4" /></Link>
        </div>
        <div className="ot-about-organiser-pass" aria-hidden="true">
          <span><MapPin className="size-4" /> SOUTH AFRICA</span>
          <strong>OPEN<br />TICKETS</strong>
          <small>EVENT ACCESS · DIGITAL DELIVERY</small>
          <i><Check className="size-3.5" /> READY FOR WHAT’S ON</i>
        </div>
      </section>

      <section className="ot-about-official">
        <span><FileCheck2 className="size-5" /></span>
        <div><small>OFFICIAL INFORMATION</small><h2>Policies and company information</h2><p>For current corporate details, privacy terms, cancellation rules and legally binding terms, consult the official Open Tickets sources.</p></div>
        <nav><a href="https://opentickets.co.za/page/privacy-policy" target="_blank" rel="noreferrer">Privacy policy <ArrowUpRight className="size-3.5" /></a><a href="https://opentickets.co.za/page/terms-and-conditions" target="_blank" rel="noreferrer">Terms & conditions <ArrowUpRight className="size-3.5" /></a></nav>
      </section>
    </div>
  </main>
);
