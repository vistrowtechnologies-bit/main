export type PlaybookBlock =
  | { type: "why" | "note" | "task"; title?: string; text: string }
  | { type: "check" | "steps"; title: string; items: [string, string][] }
  | { type: "table"; title: string; head: string[]; rows: string[][] }
  | { type: "templates"; title: string; items: [string, string][] }
  | { type: "download"; title: string; text: string; href: string; label: string };

export type PlaybookChapter = {
  day: number; slug: string; keyword: string; release: string; title: string; seoTitle: string;
  /** search-led H1 (the short Hinglish `title` stays for cards, DMs and reels) */ h1?: string;
  description: string; summary: string; blocks: PlaybookBlock[];
};

// 100 Din Playbook (vistrow.com/playbook): one chapter per series reel. A chapter "unlocks" (shows its content) at its reel's posting slot (IST, same as posting-queue.json).
// Comment keyword → Instagram DM sends the chapter link. Content is plain, factual, Hinglish + English keywords for search.
export const playbook = {
  title: '100 Din Playbook',
  intro: 'Vistrow ka 100-day challenge: roz ek kaam ki baat, small business ke liye. Har reel ke saath ek naya chapter unlock hota hai: checklist, template ya tracker, bilkul free.',
  instagram: 'https://www.instagram.com/vistrow_technologies/',
  youtube: 'https://www.youtube.com/playlist?list=PLRTiRBNcYvGo',
  whatsapp: 'https://wa.me/919067097779'
};

export const chapters: PlaybookChapter[] = [
  {
    day: 1, slug: 'online-presence-checklist', keyword: 'START', release: '2026-10-19T18:30',
    title: 'Apna online chehra check karo',
    h1: 'Aapka Business Online Kaisa Dikhta Hai? 10-Point Online Presence Checklist',
    seoTitle: 'Online Presence Checklist for Small Business (Free PDF)',
    description: 'Check how your shop, salon or clinic looks online in 5 minutes. 10-point checklist: Google, reviews, WhatsApp, Instagram + score. Free printable PDF.',
    summary: '10-point checklist: customer aapko online kaise dekhta hai.',
    blocks: [
      { type: 'why', title: 'Yeh kyun zaroori hai', text: 'Naya customer dukaan aane se pehle phone pe aapko dhoondhta hai: Google, Instagram, WhatsApp. Jo wahan dikhta hai, wahi aapka online chehra hai. Achha kaam ho, par online kamzor ho, toh customer agli dukaan chala jaata hai.' },
      { type: 'check', title: '10-point online presence checklist', items: [
        ['Google pe naam search karo', 'Kya aapki dukaan pehle page pe dikhti hai?'],
        ['Google Business Profile hai?', 'Map pe naam, address, timing, call button.'],
        ['Asli photos', 'Bahar se (board dikhe), andar, aapka kaam ya products.'],
        ['Timing sahi hai?', 'Galat timing = khaali chakkar = gussa customer.'],
        ['Number pe call lagta hai?', 'Khud call karke dekho, koi uthata hai?'],
        ['Google reviews kitne hain?', 'Gino aur likh lo. Day 4 mein kaam aayega.'],
        ['Instagram bio saaf hai?', 'Kya karte ho, kahan, kaise contact karein.'],
        ['Website phone pe khulti hai?', 'Agar hai, toh jaldi khulti hai aur call/WhatsApp button hai?'],
        ['WhatsApp Business hai?', 'Personal WhatsApp pe business mat chalao.'],
        ['Har jagah same naam, pata, number?', 'Google, Instagram, website, JustDial: sab ek jaisa.']
      ] },
      { type: 'table', title: 'Apna score dekho', head: ['Score (✓ gino)', 'Matlab'], rows: [['0–4', 'Online chehra kamzor hai. Shuruaat Google profile se karo (Day 2).'], ['5–7', 'Theek hai, par customer abhi bhi nikal rahe hain.'], ['8–10', 'Strong! Ab reviews aur fast reply pe kaam karo.']] },
      { type: 'task', text: 'Google pe apne business ka naam search karo aur screenshot rakh lo. Day 100 pe dobara karenge aur dono milayenge.' }
    ]
  },
  {
    day: 2, slug: 'google-business-profile-checklist', keyword: 'BOARD', release: '2026-10-20T13:00',
    title: 'Google Business Profile kaise banaye (free)',
    h1: 'Google Business Profile Kaise Banaye: 10 Steps Ki Free Checklist (PDF)',
    seoTitle: 'Google Business Profile Kaise Banaye: Free 10-Step Checklist',
    description: 'Google par apna business free mein list karein: 10 steps, verification options, photos aur description tips. Printable PDF + scam calls se bachav.',
    summary: '10 steps: Google pe aapki dukaan ka online board.',
    blocks: [
      { type: 'why', title: 'Online board kyun', text: 'Sadak pe dukaan ki pehchaan board hai. Online, wahi kaam Google Business Profile karta hai: naam, photo, timing, call button aur reviews. Naya customer phone pe dhoondhta hai, aur wahan aap nahi dikhte toh woh agli dukaan ko call karta hai.' },
      { type: 'steps', title: '10 steps (sab free)', items: [
        ['Profile kholo', 'Google pe "Google Business Profile" search karo ya business.google.com kholo, aur apne Google account se sign in karo.'],
        ['Naam bilkul board wala', 'Wahi naam likho jo dukaan ke board pe hai. Extra keywords mat bharo (Google ke niyam ke khilaaf).'],
        ['Sahi category', 'Sabse sateek primary category chuno, jaise "Sweet shop" ya "Beauty salon".'],
        ['Location', 'Dukaan hai toh address aur map pin. Ghar jaake service dete ho toh service area chuno.'],
        ['Phone aur website', 'Woh number jo sach mein uthta hai. Website hai toh link daalo.'],
        ['Verify karo', 'Option Google chunta hai: video, phone/SMS, email, live video call ya postcard. Postcard aksar 14 din mein aata hai (code 30 din valid). Tab tak naam, address ya category mat badlo. Verification ke bina profile poori tarah live nahi hoti.'],
        ['Timing', 'Roz ka time daalo. Festival ke liye "special hours" alag se.'],
        ['Asli photos', 'Bahar se (board dikhe), andar, products ya kaam, team. Stock photos nahi.'],
        ['Description', '750 characters tak: kya karte ho, kiske liye, kahan. Simple bhasha. Link, offer ya price yahan nahi.'],
        ['Services (price ke saath)', 'Services section mein price ke saath add karo (khaane ka business ho toh Menu). Products ka option dikhe toh woh bhi. Customer ko DM nahi karna padega.']
      ] },
      { type: 'note', text: 'Google Business Profile bilkul free hai. Koi "verification fee" maange toh woh scam hai.' },
      { type: 'task', text: 'Google pe apni dukaan dhoondho. Nahi mili? Aaj hi upar wale steps se profile banao.' }
    ]
  },
  {
    day: 3, slug: 'website-must-haves-checklist', keyword: 'SHOWROOM', release: '2026-10-21T09:30',
    title: 'Website ke 10 must-haves',
    h1: 'Small Business Website Checklist: 10 Cheezein Jo Har Website Mein Honi Chahiye',
    seoTitle: 'Small Business Website Checklist India: 10 Must-Haves (PDF)',
    description: 'Instagram is the shop window, your website is the showroom. 10 must-haves: prices, WhatsApp button, Maps, reviews, FAQ. Free printable PDF checklist.',
    summary: 'Khidki (Instagram) se showroom (website) tak: 10 cheezein.',
    blocks: [
      { type: 'why', title: 'Khidki vs showroom', text: 'Instagram dukaan ki khidki hai: log dekhte hain, pasand karte hain. Khareedte showroom mein hain, jahan saara maal, price aur order button ek jagah ho. Woh website hai. Marketing mein isko conversion kehte hain: dekhne wala khareedne wala ban jaaye.' },
      { type: 'check', title: 'Website checklist (10)', items: [
        ['Price ya "se shuru"', 'Price chhupane se customer chhup jaata hai.'],
        ['Products / services photos ke saath', 'Asli photos, saaf naam.'],
        ['Address + Google Maps link', 'Ek tap mein raasta.'],
        ['WhatsApp button', 'Har page pe, neeche kone mein.'],
        ['Tap-to-call number', 'Phone pe number dabate hi call lage.'],
        ['Reviews / testimonials', 'Asli customers ki baat.'],
        ['FAQ: top 5 sawaal', 'Jo DM mein roz aate hain (neeche worksheet).'],
        ['Mobile pe fast', 'Apne phone pe, mobile data pe khol ke dekho.'],
        ['Ek clear button', '"Order karo" ya "Appointment book karo".'],
        ['Instagram + Google profile ka link', 'Teeno jagah ek doosre se jude hon.']
      ] },
      { type: 'table', title: 'Worksheet: kal ke DM gino', head: ['Sawaal', 'Kitni baar (tally)', 'Website pe jawab hai?'], rows: [['Price kya hai?', '', '☐'], ['Address / location?', '', '☐'], ['Size / variety?', '', '☐'], ['Delivery / timing?', '', '☐'], ['Discount / offer?', '', '☐']] },
      { type: 'task', text: 'Kal ke saare DM gino. Jo sawaal sabse zyada baar aaya, woh website ke pehle page pe hona chahiye.' }
    ]
  },
  {
    day: 4, slug: 'google-review-request-templates', keyword: 'REVIEWS', release: '2026-10-22T17:30',
    title: '5 WhatsApp templates: Google review kaise maangein',
    h1: 'Google Review Kaise Badhaye: 5 WhatsApp Messages Jo Customer Ko Bhejo',
    seoTitle: 'Google Review Request Message for WhatsApp (Hindi + English)',
    description: '5 copy-paste WhatsApp messages to ask customers for Google reviews, in Hinglish and English. Reminder + thank-you, Google\'s rules, free printable PDF.',
    summary: 'Copy karo, naam badlo, bhejo: 5 ready messages + tracker.',
    blocks: [
      { type: 'why', title: 'Ginti kyun bolti hai', text: 'Log wahi chunte hain jo baaki log chun chuke hain. Marketing mein isko social proof kehte hain. 8 reviews pe customer sochta hai "koi jaata bhi hai?"; zyada asli reviews pe sochta hai "sab jaate hain, main bhi".' },
      { type: 'templates', title: 'Copy-paste messages', items: [
        ['Visit ke baad (WhatsApp pe)', 'Namaste {Naam} ji 🙏 Aaj aane ke liye shukriya! Kya aap 1 minute mein Google pe apna honest feedback de denge? Isse doosre logon ko bhi sahi jagah chunne mein madad milti hai: {review link}'],
        ['English, short', 'Hi {Name}, thank you for visiting us today! Could you share your honest feedback on Google? It takes a minute: {review link}'],
        ['Food / restaurant', 'Khana kaisa laga {Naam} ji? 😊 Aapka honest review hamare liye bahut keemti hai: {review link}'],
        ['Ek polite reminder (2–3 din baad, sirf ek baar)', 'Bas ek chhota sa reminder {Naam} ji 🙏 Jab time mile, review ka link yeh raha: {review link}. Shukriya!'],
        ['Review aane ke baad', 'Review ke liye dil se shukriya {Naam} ji 🙏 Agli baar milte hain!']
      ] },
      { type: 'note', text: 'Google ke niyam: review ke badle discount, gift ya cashback mat do. Sirf khush customers ko mat poocho: sabko same message bhejo. 5 star ya koi khaas shabd likhne ko mat bolo. Dukaan pe khade-khade review mat likhwao. Family ya staff ke reviews bhi nahi. Asli customers, asli reviews.' },
      { type: 'table', title: 'Tracker: aap vs paas wale', head: ['Business', 'Rating', 'Reviews', 'Farak (target)'], rows: [['Aap', '', '', '—'], ['Paas wala #1', '', '', ''], ['Paas wala #2', '', '', ''], ['Paas wala #3', '', '', '']] },
      { type: 'task', text: 'Google pe apne aur paas ke 3 competitors ke reviews gino. Pehla target: sabse paas wale ke barabar.' }
    ]
  },
  {
    day: 5, slug: 'lead-tracker-follow-up', keyword: 'CHAI', release: '2026-10-23T12:00',
    title: 'Lead tracker: garam jawab + follow-up',
    h1: 'Free Lead Tracker + Follow-Up Schedule (lead = garam chai)',
    seoTitle: 'Free Lead Tracker (Google Sheets) + Follow-Up Schedule',
    description: 'Free lead tracker for Google Sheets/Excel + a simple follow-up schedule: reply in 5 min, day 1, 3, 7. Hinglish guide for Indian small business. PDF bhi.',
    summary: 'Ek sheet jo batati hai kaun sa lead thanda ho raha hai.',
    blocks: [
      { type: 'why', title: 'Lead = garam chai', text: 'Customer ka message garam chai hai: turant piyo toh maza, der ki toh thandi. Marketing mein isko speed to lead kehte hain: lead aate hi kitni jaldi jawab. Customer aksar 2–3 jagah ek saath poochta hai, aur jo pehle bolta hai, bahut baar wahi deal le jaata hai.' },
      { type: 'table', title: 'Tracker columns', head: ['Column', 'Kya likhna hai'], rows: [['Date', 'Lead kab aaya'], ['Naam + number', ''], ['Source', 'Instagram / Google / WhatsApp / call / walk-in'], ['Kya chahiye', 'Ek line'], ['Message time', 'Kab aaya'], ['Reply time', 'Aapne kab jawab diya'], ['Status', 'New · Baat chal rahi · Visit · Won · Lost'], ['Next follow-up', 'Date, khaali kabhi nahi'], ['Notes', '']] },
      { type: 'steps', title: 'Follow-up schedule', items: [['Turant (5 minute mein)', 'Pehla jawab. Raat ko away message.'], ['Agle din', 'Chhota sa: "Koi sawaal ho toh batayein 🙏"'], ['Teesre din', 'Kuch useful bhejo: photo, price, slot.'], ['Saatve din', 'Aakhri polite check-in. Phir mahine mein ek baar.']] },
      { type: 'templates', title: 'Follow-up messages (copy karo)', items: [
        ['Turant (pehla jawab)', 'Namaste {Naam} ji 🙏 Message ke liye shukriya! {Cheez} ke baare mein abhi details bhej raha hoon.'],
        ['Agle din', 'Namaste {Naam} ji, kal aapne {Cheez} ke baare mein poocha tha. Koi sawaal ho toh batayein 🙏'],
        ['Teesre din (kuch useful)', '{Naam} ji, aapke liye {Cheez} ki photo aur price bhej raha hoon. Is hafte ka slot bhi khaali hai, bataiye toh book kar dein?'],
        ['Saatve din (aakhri)', '{Naam} ji, aapko pareshan nahi karenge 🙂 Jab bhi zaroorat ho, isi number pe message kar dena. Shukriya!']
      ] },
      { type: 'download', title: 'Tracker download karo', text: 'CSV file Google Sheets ya Excel mein khul jaati hai (File → Import).', href: '/playbook/lead-tracker.csv', label: 'Lead tracker (CSV) download' },
      { type: 'task', text: 'Kal ke saare leads dekho: kitni der mein reply kiya? Har lead ke aage follow-up date likho.' }
    ]
  }
];

/** A chapter unlocks at its reel's posting slot (IST). Keep `release` in sync with posting-queue.json. */
export const isUnlocked = (c: PlaybookChapter, now = Date.now()) => now >= Date.parse(`${c.release}:00+05:30`);

/** WhatsApp link with a prefilled message that says which playbook page the visitor came from. */
export const waLink = (from: string) =>
  `${playbook.whatsapp}?text=${encodeURIComponent(`Hi Vistrow! I'm coming from your 100 Din Playbook (${from}). I'd like help with my business.`)}`;

/** ?preview=1 shows every chapter, but only on the local dev server; the live site never exposes unreleased chapters. */
export const isPreview = (v?: string) => process.env.NODE_ENV === "development" && v === "1";
