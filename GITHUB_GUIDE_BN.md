# GitHub-এ রিপোজিটরি তৈরির ধাপে-ধাপে গাইড

## ১) ZIP খুলে প্রজেক্ট ফোল্ডার নিন

ZIP ডাউনলোড করে Extract করুন। Extract করা ফোল্ডারটিই GitHub-এ আপলোড করবেন। এর মধ্যে `src/`, `public/`, `package.json`, `package-lock.json`, `README.md`, `GITHUB_GUIDE_BN.md` এবং `opentickets_source_data.json` আছে।

**যা আপলোড করবেন না:** `node_modules/`, `dist/`, `.git/`, ব্রাউজার cache, screenshot output/ZIP, `.env` বা কোনো secret/key। ZIP তৈরি করার সময় এগুলো বাদ রাখা হয়েছে।

## ২) GitHub-এ নতুন repository খুলুন

1. [github.com](https://github.com/)-এ সাইন-ইন করুন।
2. উপরের `+` → **New repository** চাপুন।
3. Repository name দিন, যেমন `opentickets-site-prototype`।
4. প্রজেক্ট শেয়ার করার অনুমতি থাকলে **Public**, নইলে **Private** নির্বাচন করুন। Open Tickets-এর brand/assets public-এ প্রকাশের অনুমতি আগে নিশ্চিত করুন।
5. **Add a README**, `.gitignore` বা License GitHub-এ শুরুতে তৈরি করবেন না—এই ZIP-এ README ও `.gitignore` আছে।
6. **Create repository** চাপুন।

## ৩) Git দিয়ে আপলোড (প্রস্তাবিত)

কম্পিউটারে Node.js 20+ ও Git ইনস্টল করুন। টার্মিনালে Extract করা প্রজেক্ট ফোল্ডারে গিয়ে চালান:

```bash
git init
git add .
git status
git commit -m "Add Open Tickets site prototype"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPOSITORY.git
git push -u origin main
```

`YOUR-USERNAME` ও `YOUR-REPOSITORY` আপনার GitHub username এবং repo name দিয়ে বদলাবেন। GitHub authentication চাইলে browser login বা GitHub Personal Access Token ব্যবহার করুন; token কখনো source code-এ রাখবেন না।

পরবর্তীতে পরিবর্তন push করতে:

```bash
git add .
git commit -m "Describe your change"
git push
```

## ৪) GitHub ওয়েবসাইট থেকে ফাইল যোগ করার সহজ উপায়

Repository খুলে **Add file → Upload files** চাপুন, ZIP Extract করা প্রজেক্টের ফাইল ও ফোল্ডার টেনে দিন, নিচে commit message লিখে **Commit changes** চাপুন। `node_modules` বা `dist` যেন upload না হয় তা যাচাই করুন। বড়/অনেক asset থাকলে Git CLI পদ্ধতিই ভালো।

## ৫) চালানো ও পরিবর্তন যাচাই

```bash
npm install
npm run dev
```

লোকাল ঠিকানা: `http://localhost:5173`। Production build যাচাই:

```bash
npm run build
```

## কোন পরিবর্তন কোন ফাইলে করবেন

| কী বদলাবেন | কোথায় পাবেন |
|---|---|
| সাইটের রং, typography, theme, responsive rules | `src/index.css` |
| Tab title, description, fonts, app root | `index.html` |
| Open Tickets logo | `public/assets/logo/opentickets-logo-for-light.svg` এবং `public/assets/logo/opentickets-logo-for-dark.svg` |
| App icon / PWA install details | `public/icon.svg`, `public/manifest.webmanifest`, `public/sw.js` |
| Event নাম, তারিখ-সময়, venue, category, বিবরণ, ticket tier ও Rand price | `src/data/events.ts` |
| Event banner image | `public/media/events/` — সংশ্লিষ্ট `ot_<event-id>.*` ফাইল; event entry-র `bannerImage` ও `squareImage` path-ও মিলিয়ে বদলান |
| Raw public event source snapshot | `opentickets_source_data.json` (তথ্য নেওয়ার সময়: 29 Oct 2026) |
| FAQ copy, footer link groups | `src/data/legalAndFaq.ts` |
| Header / desktop nav / search button | `src/components/SiteHeader.tsx` |
| Mobile bottom tabs, More drawer | `src/components/MobileBottomNav.tsx` |
| Footer, social links, footer sheets | `src/components/SiteFooter.tsx` |
| Open Tickets-style event card | `src/components/OpenTicketsCard.tsx` |
| Search dialog, story overlay, notifications, mobile preview | `src/components/SearchModal.tsx`, `StoryViewerModal.tsx`, `ToastContainer.tsx` |
| একটি নির্দিষ্ট পেজের ডিজাইন | `src/pages/`-এর একই নামের `.tsx` ফাইল |
| Cart, wallet, local demo login/user, browser storage | `src/context/AppContext.tsx` |
| Route যোগ করা বা বদলানো | `src/App.tsx` |
| React entry, router/provider এবং service-worker register | `src/main.tsx` |

### সব page component-এর তালিকা

- `HomePage.tsx` — Home `/`
- `EventsPage.tsx` — Events `/events`
- `EventDetailPage.tsx` — Event detail `/event/:slug` ও `/o/:organizerSlug/:slug`
- `CartPage.tsx` — Cart `/cart`
- `MyTicketsPage.tsx` — local ticket wallet `/profile` ও `/profile/tickets`
- `FindMyTicketsPage.tsx` — ticket lookup demo `/find-my-tickets`
- `HostPage.tsx` — organiser enquiry prototype `/host`
- `AboutPage.tsx`, `ContactPage.tsx`, `FaqPage.tsx` — company info, official contact, FAQs
- `AuthPage.tsx` — local login/register demo (`/login`, `/register`, `/signup`)
- `LegalPage.tsx` — official legal-source links (`/privacy`, `/terms`, `/refund-policy`, `/refund-guarantee`)
- `NotFoundPage.tsx` — অজানা route

## গুরুত্বপূর্ণ নোট

- Event তালিকা ও banner-গুলো Open Tickets-এর publicly accessible page থেকে **একটি নির্দিষ্ট সময়ের static snapshot**। এটি live sync/API নয়; প্রতিটি event-এর official page-এ গিয়ে বর্তমান availability ও price যাচাই করুন।
- Checkout, payment, login, event-hosting form ও ticket verifier এখানে **frontend demo**—এগুলো Open Tickets-এর production backend বা payment gateway-তে যুক্ত নয় এবং official ticket তৈরি করে না। Production চালাতে অনুমোদিত API, payment integration, authentication ও ticket validation service যুক্ত করতে হবে।
- Privacy Policy ও Terms পেজগুলো বর্তমান নীতির জন্য Open Tickets-এর official pages-এ নিয়ে যায়। আইনগত তথ্য নিজে পরিবর্তন বা অনুমান করে প্রকাশ করবেন না।
- Open Tickets-এর নাম/logo/event artwork GitHub-এ publish বা public deploy করার আগে আপনার ব্যবহার-অনুমতি ও asset terms নিশ্চিত করুন। কোনো public license (যেমন MIT) যোগ করলে সেটি ওই তৃতীয় পক্ষের asset-এ প্রয়োগ হয় না—অনুমতি ছাড়া দেবেন না।
