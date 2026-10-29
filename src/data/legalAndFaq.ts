export interface FaqSection {
  title: string;
  items: { q: string; a: string }[];
}

// Publicly available help content condensed from Open Tickets FAQs/support pages.
// Source: https://opentickets.co.za/faq and https://opentickets.co.za/support
export const FAQ_SECTIONS: FaqSection[] = [
  {
    title: 'Tickets & Purchasing',
    items: [
      { q: 'How can I book tickets?', a: 'Find the event, choose the number and category of tickets, add them to your cart, enter your checkout details, and complete payment on the secure payment page. Successful purchases are sent to the email address used at checkout.' },
      { q: 'Are there tickets left for an event?', a: 'If the event page lets you select a ticket and add it to your cart, tickets are available. Open Tickets does not display the number of tickets remaining.' },
      { q: 'Can I buy tickets at an outlet?', a: 'Tickets are available online at opentickets.co.za. Selected events may also be available at Shoprite, Checkers, or Usave outlets; check the event details for availability.' },
    ],
  },
  {
    title: 'Ticket Delivery & Downloading',
    items: [
      { q: 'How do I view my ticket?', a: 'After successful payment, look for your order confirmation email. It includes options to view tickets online, download a PDF or HTML copy, or add supported tickets to Apple Wallet or Google Wallet. Check your spam or junk folder if you cannot find the email.' },
      { q: 'I have not received my tickets. What should I do?', a: 'Check your inbox, spam, junk, and promotions folders. If you still need help, email tickets@opentickets.co.za with your transaction number, purchaser name, checkout email and phone, event name, ticket count, and ticket category.' },
      { q: 'Can I transfer tickets?', a: 'Use the Transfer Tickets action in your confirmation email, enter the recipient email, choose the tickets, and confirm. The recipient must complete the transfer; otherwise the transfer link expires and the tickets remain with you.' },
    ],
  },
  {
    title: 'Account & Profile',
    items: [
      { q: 'Do I need to create an account before buying?', a: 'No. An account is created automatically when you purchase tickets. Your tickets are linked to the email address entered during checkout.' },
      { q: 'How do I log in?', a: 'Enter the email address used for your purchase. Open Tickets sends a secure magic link to that email address. Use the link to access purchases, download tickets, and see approved refund status.' },
      { q: 'I cannot access my account. What should I check?', a: 'Make sure you entered the exact email address used at checkout, then check your inbox and spam/junk folders for the magic link. If it still does not arrive, contact tickets@opentickets.co.za.' },
      { q: 'Are football tickets printable?', a: 'Football tickets sold online by Open Tickets are digital. Present them on a mobile device, use a supported mobile wallet, or use the HTML ticket file. Check the event information for its entry requirements.' },
    ],
  },
  {
    title: 'General',
    items: [
      { q: 'Is there an Open Tickets mobile app?', a: 'The Open Tickets FAQ says there is currently no mobile app. Your confirmation email provides ticket links and download options for use on your device.' },
      { q: 'How can I contact support?', a: 'For general enquiries, email info@opentickets.co.za. For purchase or ticket help, email tickets@opentickets.co.za. You can also visit opentickets.co.za/support.' },
      { q: 'How can I see events happening this weekend?', a: 'Open the Events page on the Open Tickets website and review the dates shown on each event card.' },
    ],
  },
  {
    title: 'Football',
    items: [
      { q: 'Does a child need a football ticket?', a: 'The Open Tickets FAQ states each attendee, including children under six, needs a valid ticket for football matches. Requirements may vary by event, so check the event description.' },
      { q: 'Are Orlando Pirates season cards physical?', a: 'The published FAQ describes Orlando Pirates FC season cards as digital. No physical card collection is required; follow the post-purchase instructions.' },
      { q: 'Which football teams are listed?', a: 'Selected home matches and selected PSL/CAF matches are listed when available. Check the live Open Tickets Events page for current listings.' },
    ],
  },
];

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export const FOOTER_COLUMNS: FooterColumn[] = [
  { title: 'Explore', links: [{ label: 'Browse Events', href: '/events' }, { label: 'Search Events', href: '/events' }, { label: 'My Tickets', href: '/profile/tickets' }] },
  { title: 'Open Tickets', links: [{ label: 'About', href: '/about' }, { label: 'Official Website', href: 'https://opentickets.co.za/' }, { label: 'Support', href: 'https://opentickets.co.za/support' }] },
  { title: 'Help', links: [{ label: 'FAQs', href: '/faq' }, { label: 'Find Tickets', href: '/find-my-tickets' }, { label: 'Contact', href: '/contact' }] },
  { title: 'Legal', links: [{ label: 'Privacy Policy', href: 'https://opentickets.co.za/page/privacy-policy' }, { label: 'Terms & Conditions', href: 'https://opentickets.co.za/page/terms-and-conditions' }, { label: 'Refund Policy', href: '/refund-policy' }] },
];
