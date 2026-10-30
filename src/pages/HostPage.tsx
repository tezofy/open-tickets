import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  CheckCircle2,
  FileText,
  Headphones,
  LifeBuoy,
  Mail,
  MapPin,
  Megaphone,
  QrCode,
  ShieldCheck,
  Sparkles,
  Ticket,
  Users,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const organizerJourney = [
  { number: '01', icon: FileText, title: 'Share your event', copy: 'Introduce your organisation, event category and the experience you are planning.' },
  { number: '02', icon: Users, title: 'Connect with the team', copy: 'Use the official enquiry channel to discuss current organiser information.' },
  { number: '03', icon: CalendarDays, title: 'Prepare event details', copy: 'Have your date, venue, ticket categories and guest information ready.' },
  { number: '04', icon: QrCode, title: 'Welcome your audience', copy: 'Give guests clear information and the ticket instructions for their event.' },
];

export const HostPage: React.FC = () => {
  const { notify } = useApp();
  const [orgName, setOrgName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [eventType, setEventType] = useState('Music / Concert');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!orgName.trim() || !contactEmail.trim()) return;
    setSubmitted(true);
    notify('This preview does not submit enquiries. Please email info@opentickets.co.za.', 'info');
  };

  return (
    <main id="main-content" className="ot-host-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
      <section className="ot-host-hero" aria-labelledby="host-page-title">
        <img src="media/host-organizer-ai.jpg" alt="Event organisers coordinating a live venue and digital ticketing" />
        <div className="ot-host-hero-shade" aria-hidden="true" />
        <span className="ot-host-hero-cut ot-host-hero-cut-left" aria-hidden="true" />
        <span className="ot-host-hero-cut ot-host-hero-cut-right" aria-hidden="true" />

        <div className="ot-host-hero-copy">
          <p><Sparkles className="size-3.5" /> OPEN TICKETS FOR ORGANIZERS</p>
          <h1 id="host-page-title">Host an event</h1>
          <span>Bring your event to life with a clear path from organiser enquiry to guest-ready ticket information.</span>
          <div><a href="#organizer-onboarding">Start an enquiry <ArrowRight className="size-4" /></a><Link to="/contact">Talk to support</Link></div>
        </div>

        <div className="ot-host-hero-badges">
          <span><ShieldCheck className="size-4" /> Official enquiry route</span>
          <span><Ticket className="size-4" /> Built around live moments</span>
        </div>
      </section>

      <section className="ot-host-trust" aria-label="Organizer experience">
        <span><Megaphone className="size-4" /><strong>Present your event</strong><small>Clear information for your audience</small></span>
        <span><Ticket className="size-4" /><strong>Shape the ticket journey</strong><small>Categories and event requirements</small></span>
        <span><Headphones className="size-4" /><strong>Reach official support</strong><small>A direct route for organiser enquiries</small></span>
      </section>

      <div className="ot-host-content">
        <section className="ot-host-intro">
          <div><small>CREATED FOR LIVE EXPERIENCES</small><h2>Give your audience a confident way in.</h2></div>
          <div><p>From the first announcement to the moment guests arrive, good event information matters. Open Tickets brings public event details, ticket categories, venue information and the purchasing journey together in one experience.</p><p>For current organiser services, availability and listing requirements, connect with the official Open Tickets team.</p><a href="https://opentickets.co.za/" target="_blank" rel="noreferrer">Visit the official platform <ArrowUpRight className="size-4" /></a></div>
        </section>

        <section className="ot-host-pillars" aria-labelledby="host-pillars-title">
          <div className="ot-host-section-heading"><div><small>THE FOUNDATIONS</small><h2 id="host-pillars-title">The details behind a great guest journey</h2></div><span>PLAN · INFORM · WELCOME</span></div>
          <div className="ot-host-pillar-grid">
            <article><span><CalendarDays className="size-5" /></span><small>EVENT INFORMATION</small><h3>Make the essentials easy to understand.</h3><p>Give guests clarity on dates, venue information, descriptions and the experience they can expect.</p></article>
            <article><span><Ticket className="size-5" /></span><small>TICKET CATEGORIES</small><h3>Present the right choices clearly.</h3><p>Prepare category names, quantities and the event-specific information guests need before booking.</p></article>
            <article><span><MapPin className="size-5" /></span><small>GUEST ARRIVAL</small><h3>Build confidence before the gate.</h3><p>Keep entry guidance, venue requirements and digital ticket instructions clear and accessible.</p></article>
            <article><span><LifeBuoy className="size-5" /></span><small>OFFICIAL SUPPORT</small><h3>Know where to direct questions.</h3><p>Use official support channels for organiser enquiries and help linked to specific ticket orders.</p></article>
          </div>
        </section>

        <section className="ot-host-journey" aria-labelledby="host-journey-title">
          <span className="ot-host-journey-cut ot-host-journey-cut-left" aria-hidden="true" />
          <span className="ot-host-journey-cut ot-host-journey-cut-right" aria-hidden="true" />
          <header><span><Ticket className="size-5" /></span><div><small>ORGANIZER JOURNEY</small><h2 id="host-journey-title">A practical route to getting started</h2></div><b>OT / HOST / ZA</b></header>
          <div className="ot-host-journey-grid">
            {organizerJourney.map(({ number, icon: Icon, title, copy }) => <article key={title}><span><Icon className="size-4" /></span><small>{number}</small><h3>{title}</h3><p>{copy}</p></article>)}
          </div>
        </section>

        <section id="organizer-onboarding" className="ot-host-enquiry" aria-labelledby="host-enquiry-title">
          <div className="ot-host-enquiry-copy">
            <small>ORGANIZER ENQUIRIES</small>
            <h2 id="host-enquiry-title">Tell us what you’re planning.</h2>
            <p>This prototype helps you prepare an enquiry. It does not send information to Open Tickets. Use the official email shown after completing the preview.</p>
            <div className="ot-host-ready-list">
              <span><Check className="size-3.5" /> Organisation or brand name</span>
              <span><Check className="size-3.5" /> Best work contact</span>
              <span><Check className="size-3.5" /> Type of event</span>
              <span><Check className="size-3.5" /> Proposed date and venue</span>
            </div>
            <Link to="/contact"><Headphones className="size-4" /> View all contact options</Link>
          </div>

          <div className="ot-host-form-card">
            <header><span><Mail className="size-5" /></span><div><small>ENQUIRY PASS</small><strong>Your event details</strong></div><b>01 / 01</b></header>
            {submitted ? (
              <div className="ot-host-success">
                <CheckCircle2 className="size-9" />
                <h3>Your enquiry is ready</h3>
                <p>No information was submitted from this prototype. Email the official team directly to continue.</p>
                <a href="mailto:info@opentickets.co.za">info@opentickets.co.za <ArrowRight className="size-4" /></a>
                <button type="button" onClick={() => setSubmitted(false)}>Edit details</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <label><span>Organisation / brand name *</span><input type="text" required value={orgName} onChange={(event) => setOrgName(event.target.value)} placeholder="Your organisation" /></label>
                <label><span>Work email or phone *</span><input type="text" required value={contactEmail} onChange={(event) => setContactEmail(event.target.value)} placeholder="organizer@company.com" /></label>
                <label className="ot-host-form-wide"><span>Event category</span><select value={eventType} onChange={(event) => setEventType(event.target.value)}><option>Music / Concert</option><option>Sports / Tournament</option><option>Conference / Expo</option><option>Theatre / Comedy</option><option>Festival / Community Event</option></select></label>
                <button type="submit" className="ot-host-form-wide">Prepare my enquiry <ArrowRight className="size-4" /></button>
                <p className="ot-host-form-wide"><ShieldCheck className="size-3.5" /> Preview only—nothing is sent from this form.</p>
              </form>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};
