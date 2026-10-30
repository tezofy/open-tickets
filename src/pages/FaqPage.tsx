import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronDown,
  CircleHelp,
  Download,
  LifeBuoy,
  Search,
  ShieldCheck,
  Sparkles,
  Ticket,
  Trophy,
  UserRound,
} from 'lucide-react';
import { FAQ_SECTIONS } from '../data/legalAndFaq';

const SECTION_ICONS = [Ticket, Download, UserRound, CircleHelp, Trophy];

export const FaqPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const q = search.trim().toLowerCase();

  const filteredSections = useMemo(() => FAQ_SECTIONS.map((section) => ({
    ...section,
    items: section.items.filter(
      (item) => !q || item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q),
    ),
  })).filter((section) => section.items.length > 0), [q]);

  const questionCount = FAQ_SECTIONS.reduce((total, section) => total + section.items.length, 0);

  return (
    <main id="main-content" className="ot-faq-page flex-1 bg-background pb-16 text-foreground sm:pb-20">
      <section className="ot-faq-hero" aria-labelledby="faq-page-title">
        <img src="media/faq-support-ai.jpg" alt="Open Tickets support team helping event guests" />
        <div className="ot-faq-hero-shade" aria-hidden="true" />
        <span className="ot-faq-hero-cut ot-faq-hero-cut-left" aria-hidden="true" />
        <span className="ot-faq-hero-cut ot-faq-hero-cut-right" aria-hidden="true" />

        <div className="ot-faq-hero-copy">
          <p><Sparkles className="size-3.5" /> OPEN TICKETS HELP CENTRE</p>
          <h1 id="faq-page-title">Frequently Asked Questions</h1>
          <span>Clear answers for every step—from finding your event to getting through the gate.</span>
        </div>

        <div className="ot-faq-hero-meta">
          <span><strong>{questionCount}</strong><small>helpful answers</small></span>
          <span><ShieldCheck className="size-4" /><small>Official support guidance</small></span>
        </div>
      </section>

      <section className="ot-faq-search-wrap" aria-label="Search frequently asked questions">
        <form className="ot-faq-search" onSubmit={(event) => event.preventDefault()}>
          <Search className="size-5" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search tickets, payments, QR codes, refunds…"
            aria-label="Search frequently asked questions"
          />
          <span>{q ? `${filteredSections.reduce((total, section) => total + section.items.length, 0)} matches` : 'Search all answers'}</span>
        </form>
      </section>

      <div className="ot-faq-layout">
        <aside className="ot-faq-index" aria-label="FAQ categories">
          <div className="ot-faq-index-head">
            <small>HELP TOPICS</small>
            <strong>Jump to a category</strong>
          </div>
          <nav>
            {FAQ_SECTIONS.map((section, index) => {
              const Icon = SECTION_ICONS[index] || CircleHelp;
              return (
                <a key={section.title} href={`#faq-${index}`}>
                  <span><Icon className="size-4" /></span>
                  <div><strong>{section.title}</strong><small>{section.items.length} answers</small></div>
                  <ArrowRight className="size-3.5" />
                </a>
              );
            })}
          </nav>
          <div className="ot-faq-index-pass" aria-hidden="true">
            <LifeBuoy className="size-5" />
            <span>OT / HELP / ZA</span>
          </div>
        </aside>

        <div className="ot-faq-content">
          {filteredSections.length > 0 ? filteredSections.map((section) => {
            const originalIndex = FAQ_SECTIONS.findIndex((item) => item.title === section.title);
            const Icon = SECTION_ICONS[originalIndex] || CircleHelp;
            return (
              <section id={`faq-${originalIndex}`} key={section.title} className="ot-faq-section">
                <span className="ot-faq-section-notch ot-faq-section-notch-left" aria-hidden="true" />
                <span className="ot-faq-section-notch ot-faq-section-notch-right" aria-hidden="true" />
                <header>
                  <span><Icon className="size-5" /></span>
                  <div>
                    <small>TOPIC {String(originalIndex + 1).padStart(2, '0')}</small>
                    <h2>{section.title}</h2>
                  </div>
                  <b>{section.items.length}</b>
                </header>
                <div className="ot-faq-questions">
                  {section.items.map((item, itemIndex) => (
                    <details key={item.q} className="group" open={q ? true : undefined}>
                      <summary>
                        <span className="ot-faq-question-number">{String(itemIndex + 1).padStart(2, '0')}</span>
                        <strong>{item.q}</strong>
                        <span className="ot-faq-chevron"><ChevronDown className="size-4" /></span>
                      </summary>
                      <div className="ot-faq-answer"><p>{item.a}</p></div>
                    </details>
                  ))}
                </div>
              </section>
            );
          }) : (
            <div className="ot-faq-empty">
              <Search className="size-6" />
              <h2>No matching answers</h2>
              <p>Try a shorter search, or contact our support team for personal help.</p>
              <button type="button" onClick={() => setSearch('')}>Clear search</button>
            </div>
          )}

          <section className="ot-faq-support-card">
            <div>
              <small>STILL NEED A HAND?</small>
              <h2>Real people. Real support.</h2>
              <p>Tell us what happened and our team will point you in the right direction.</p>
            </div>
            <Link to="/contact">Contact support <ArrowRight className="size-4" /></Link>
          </section>
        </div>
      </div>
    </main>
  );
};
