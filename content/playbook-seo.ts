// Answer-engine (AEO/GEO) layer for the 100 Din Playbook: a direct answer, FAQs and search keywords per chapter.
// Rules: answer first, plain facts only, no invented numbers. Shown on the page AND emitted as FAQPage / HowTo JSON-LD.

export type PlaybookSeo = {
  /** 2–3 sentence direct answer to the chapter's main question (what an AI answer or featured snippet should quote). */
  question: string;
  answer: string;
  keywords: string[];
  faq: [string, string][];
  /** total time for the HowTo schema (ISO 8601) */
  time?: string;
};

export const playbookHub = {
  answer:
    "The Vistrow 100 Din Playbook is a free, day-by-day marketing guide for Indian small businesses. Each day of Vistrow's 100-day Instagram challenge unlocks one chapter: a checklist, WhatsApp template or tracker you can finish in about 5 minutes, with a free printable PDF.",
  faq: [
    ["Is the 100 Din Playbook free?", "Yes. Every chapter and its printable PDF are free, with no signup."],
    ["Who is it for?", "Owners of local small businesses in India (shops, restaurants, salons, clinics, service businesses) who want more customers from Google, Instagram and WhatsApp without hiring an agency first."],
    ["How often is a new chapter added?", "One chapter goes live with each reel of the Vistrow 100-day challenge on Instagram (@vistrow_technologies)."],
    ["What language is it in?", "Hinglish (Hindi in English script) with the key marketing terms in English, so it is easy to read on a phone."],
    ["Chhote business ki marketing free mein kaise kare?", "Free tools se shuru karo: Google Business Profile (Google Search aur Maps pe dikhne ke liye), WhatsApp Business (customers ko jaldi reply ke liye) aur khush customers se Google reviews maango. Playbook ke chapters yeh sab step-by-step, free checklists aur templates ke saath sikhate hain."],
    ["Kya yeh salon, clinic aur restaurant ke liye bhi kaam karega?", "Haan. Playbook local businesses ke liye likha gaya hai: dukan, salon, clinic, restaurant aur service businesses. Steps wahi hain: Google pe dikhna, reviews lena, website aur WhatsApp pe leads ko jaldi jawab dena."],
  ] as [string, string][],
};

export const playbookSeo: Record<string, PlaybookSeo> = {
  "online-presence-checklist": {
    question: "How do I check my small business's online presence?",
    answer:
      "Search your business name on Google, then check 10 points: a Google Business Profile, real photos, correct timings, a phone number that gets answered, your Google reviews, a clear Instagram bio, a mobile-friendly website, WhatsApp Business, and the same name, address and number everywhere. Score 1 point for each; under 5 means start with your Google profile.",
    keywords: ["online presence checklist", "small business online presence India", "business ko online kaise laye", "Google pe business kaise dikhe", "local business audit"],
    time: "PT5M",
    faq: [
      ["How do I know if my business shows on Google?", "Search your business name with your city. If a profile appears on the right with “Own this business?”, it exists but is unclaimed: claim it. If nothing appears, create a free Google Business Profile."],
      ["Is Instagram enough for a small business?", "No. Customers check Google and Maps first; Instagram supports it. Start with the free Google profile, WhatsApp Business and Instagram, and add a simple website when you can."],

      ["What is online presence for a small business?", "It is everything a customer finds when they look you up on their phone: your Google profile, reviews, photos, Instagram, website and WhatsApp. Customers usually check this before they visit or call."],
      ["Where should I start if my score is low?", "Start with a free Google Business Profile (Day 2), because it is what shows up on Google Search and Maps when people search for your type of business nearby."],
      ["Why must name, address and phone be the same everywhere?", "Matching details on Google, Instagram, your website and directories help customers trust that the listing is correct and help search engines connect them to one business."],
      ["Online presence check karne mein kitna time lagta hai?", "Lagbhag 5 minute: Google pe apna naam search karo aur 10-point checklist pe tick karo."],
    ],
  },
  "google-business-profile-checklist": {
    question: "How do I create a Google Business Profile for free?",
    answer:
      "Go to business.google.com, sign in with your Google account and add your exact business name, the most accurate category, your address or service area, phone and website. Verify using the option Google offers (phone, email, video or postcard), then add hours, real photos, a description of up to 750 characters and your products or services. It is completely free.",
    keywords: ["Google Business Profile kaise banaye", "create Google Business Profile free", "Google My Business India", "Google Maps pe dukaan kaise dale", "GBP verification"],
    time: "PT30M",
    faq: [
      ["How long does the Google verification postcard take?", "Google says most postcards arrive within 14 days and the code expires after 30 days. While you wait, don't change the name, address or category, and don't request a new code."],
      ["Can I put prices in the description?", "No. The 750-character description is for what you do, for whom and where, with no links, offers or prices. Add prices in the Services section (or Menu for food businesses)."],

      ["Is Google Business Profile free?", "Yes, it is completely free. Anyone asking for a 'verification fee' is not Google and is likely a scam."],
      ["Can I add keywords to my business name?", "No. Use the real name on your signboard. Adding extra keywords goes against Google's guidelines and can get the profile suspended."],
      ["How do I verify my Google Business Profile?", "Google shows the verification options available for your business, such as phone, email, a short video or a postcard. The profile is not fully live until it is verified."],
      ["I serve customers at their home. What address do I use?", "Choose a service area business and set the areas you serve instead of showing a shop address."],
      ["Description mein kya likhna chahiye?", "750 characters tak, simple bhasha mein: aap kya karte ho, kiske liye, aur kahan."],
    ],
  },
  "website-must-haves-checklist": {
    question: "What should a small business website have?",
    answer:
      "A small business website should have 10 things: prices or 'starting from' prices, products or services with real photos, your address with a Google Maps link, a WhatsApp button, a tap-to-call number, real reviews, an FAQ that answers the questions you get daily, fast loading on mobile, one clear action button, and links to your Instagram and Google profile.",
    keywords: ["small business website checklist", "website must haves", "website kaisi honi chahiye", "website for small business India", "website conversion checklist"],
    time: "PT10M",
    faq: [
      ["Is a one-page website enough?", "For most local businesses, yes, if it has the 10 must-haves: prices, photos, Maps link, WhatsApp and call buttons, reviews, FAQ and one clear action button."],
      ["What is the difference between a website and a Google Business Profile?", "The Google profile helps people find you on Search and Maps. The website is your showroom with prices, photos and answers. Link them to each other."],

      ["Do I need a website if I already have Instagram?", "Instagram works like a shop window where people look; the website is the showroom where they see everything, the prices and the order button in one place. That step from looking to buying is called conversion."],
      ["What should go on the website's first page?", "The answer to the question customers ask you most often. Count your DMs for a day; the most repeated question belongs on the first page."],
      ["Should I show prices on my website?", "Yes, at least a 'starting from' price. When the price is hidden, many customers leave instead of asking."],
      ["Website mobile pe fast hai, kaise check karein?", "Apne phone pe, mobile data pe website kholo. Jaldi na khule toh customer bhi ruk ke wait nahi karega."],
    ],
  },
  "google-review-request-templates": {
    question: "How do I ask customers for Google reviews on WhatsApp?",
    answer:
      "Send a short, polite WhatsApp message right after the service with your Google review link, send at most one reminder after 2–3 days, and thank them once they review. Never offer a discount, gift or cashback for a review, and never post fake reviews: both are against Google's policies.",
    keywords: ["Google review request message", "WhatsApp review message template", "Google review kaise maange", "how to get more Google reviews", "review request template Hindi"],
    time: "PT5M",
    faq: [
      ["Can I ask only happy customers for a review?", "No. Google's policy does not allow selectively asking for positive reviews. Send the same polite message to every customer and handle complaints separately."],
      ["Can I ask customers to give 5 stars or mention a product?", "No. Ask for honest feedback only. Requesting specific ratings or content, or pressuring people at the shop, is against Google's rules."],

      ["Where do I get my Google review link?", "Open your Google Business Profile and use the 'Ask for reviews' or 'Share review form' option; it gives you a link you can paste into WhatsApp."],
      ["Can I give a discount in exchange for a review?", "No. Offering incentives for reviews is against Google's policies and can get reviews removed. Ask real customers, politely."],
      ["How many times should I remind a customer?", "Once. Send one polite reminder 2–3 days later, then stop."],
      ["Why do Google reviews matter so much?", "People choose what others have already chosen; this is called social proof. A business with more genuine reviews looks like the safer choice."],
    ],
  },
  "lead-tracker-follow-up": {
    question: "How should a small business track and follow up leads?",
    answer:
      "Log every enquiry in one sheet with the date, name and number, source, what they need, when the message came, when you replied, the status and a next follow-up date that is never blank. Reply within 5 minutes, follow up the next day, on day 3 with something useful, and on day 7 with a final polite check-in.",
    keywords: ["lead tracker sheet", "free lead tracker Google Sheets", "follow up schedule", "speed to lead", "lead follow up kaise kare"],
    time: "PT10M",
    faq: [
      ["Do I need a CRM to track leads?", "Not to start. A simple sheet with a reply-time and next follow-up column is enough for a small business. Move to a CRM when the sheet gets too big to manage."],

      ["What is speed to lead?", "It is how quickly you reply after an enquiry arrives. Customers often ask 2–3 businesses at once, and the one that answers first often gets the deal."],
      ["What columns should a lead tracker have?", "Date, name and number, source, requirement, message time, reply time, status (new, in discussion, visit, won, lost), next follow-up date and notes."],
      ["How do I open the free tracker?", "Download the CSV and open it in Google Sheets (File → Import) or Excel."],
      ["Raat ko lead aaye toh kya karein?", "WhatsApp Business mein away message laga do, aur subah sabse pehle us lead ko reply karo."],
    ],
  },
};
