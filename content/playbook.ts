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
  /** internal links to the most relevant other chapters (shown only once each is live) */ related?: { slug: string; anchor: string }[];
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
    day: 1, slug: 'online-presence-checklist', keyword: 'START', release: '2026-10-26T10:00',
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
    ],
    related: [{ slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'website-must-haves-checklist', anchor: 'small business website checklist' }, { slug: 'google-review-request-templates', anchor: 'Google review maangne ke WhatsApp templates' }, { slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }]
  },
  {
    day: 2, slug: 'google-business-profile-checklist', keyword: 'BOARD', release: '2026-10-27T13:00',
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
    ],
    related: [{ slug: 'online-presence-checklist', anchor: '10-point online presence checklist' }, { slug: 'google-review-request-templates', anchor: 'Google review maangne ke WhatsApp templates' }, { slug: 'website-must-haves-checklist', anchor: 'small business website checklist' }]
  },
  {
    day: 3, slug: 'website-must-haves-checklist', keyword: 'SHOWROOM', release: '2026-10-28T09:30',
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
    ],
    related: [{ slug: 'online-presence-checklist', anchor: '10-point online presence checklist' }, { slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'google-review-request-templates', anchor: 'Google review maangne ke WhatsApp templates' }, { slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }]
  },
  {
    day: 4, slug: 'google-review-request-templates', keyword: 'REVIEWS', release: '2026-10-29T17:30',
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
    ],
    related: [{ slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }, { slug: 'website-must-haves-checklist', anchor: 'small business website checklist' }]
  },
  {
    day: 5, slug: 'lead-tracker-follow-up', keyword: 'CHAI', release: '2026-10-30T12:00',
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
    ],
    related: [{ slug: 'google-review-request-templates', anchor: 'Google review maangne ke WhatsApp templates' }, { slug: 'website-must-haves-checklist', anchor: 'small business website checklist' }, { slug: 'online-presence-checklist', anchor: '10-point online presence checklist' }]
  },
  {
    day: 7, slug: 'product-reel-hook-ideas', keyword: 'HOOK', release: '2026-11-01T16:00',
    title: 'Pehle second ke 10 hook ideas',
    h1: 'Reel Hook Ideas for Product Ads: Pehle Second Ki 10-Point Checklist',
    seoTitle: 'Product Reel Hook Ideas + First-Second Checklist (Free PDF)',
    description: 'Shoot zaroori nahi, pehla second zaroori hai. 10 hook ideas for product reels and ads, a 10-point first-second checklist and a free printable PDF.',
    summary: 'Shoot zaroori nahi, pehla second zaroori hai: 10 checks + 10 hook ideas.',
    blocks: [
      { type: 'why', title: 'Shoot nahi, pehla second', text: 'Bade brands ek ad pe camera, set, model aur editing mein lakhon tak laga dete hain. Aaj ek achhi product photo aur ek tez idea se bhi AI product video ban jaati hai. Par asli cheez AI nahi, pehla second hai. Marketing mein isko hook kehte hain: woh pal jo scroll rok de. Instagram dekhta hai ki log reel poori dekhte hain, like ya share karte hain ya nahi. Log ruke, toh reel aur logon tak pahunchti hai.' },
      { type: 'check', title: 'Pehle second ka hook: 10-point checklist', items: [
        ['Product pehle frame mein', 'Logo, intro ya "Namaste dosto" baad mein. Pehle frame mein product ya uska kaam dikhe.'],
        ['Sabse dhamakedaar pal sabse pehle', 'Jo pal sabse zyada "wow" hai (bhaap, crunch, pehla pour, dhakkan khulna), wahi shuru mein.'],
        ['Pehle frame mein movement', 'Kuch gire, khule, ghoome ya uthe. Ruki hui tasveer pe angootha nahi rukta.'],
        ['Frame mein ek hi hero', 'Ek product, saaf background. Bhara hua table ya poori dukaan nahi.'],
        ['Bina awaaz ke samajh aaye', 'Bahut log awaaz band karke scroll karte hain. Bina sound ke bhi pata chale kya ho raha hai.'],
        ['3–5 shabd, bada text', 'Mota font, screen ke beech mein. Sabse upar aur neeche Instagram ke naam aur buttons aa jaate hain.'],
        ['Saaf photo se shuru', 'Din ki roshni, saaf background, product ka sabse achha angle. Dhundhli photo se video bhi dhundhli banti hai.'],
        ['Asli product jaisa dikhe', 'AI se product ko behtar dikhao, alag nahi. Rang, size aur quantity wahi jo customer ko milega.'],
        ['Ant mein naam + ek kaam', 'Dukaan ka naam aur ek clear button: "WhatsApp karo" ya "Aaj hi order karo".'],
        ['Phone pe khud test karo', 'Post se pehle scroll karte hue dekho: kya aap khud rukoge? Nahi, toh pehla second badlo.']
      ] },
      { type: 'table', title: '10 hook ideas (examples)', head: ['Hook idea', 'Example: pehla second kaisa dikhe'], rows: [
        ['Slow-motion pal', 'Example: garam chai glass mein girti hui, bhaap ke saath.'],
        ['Bilkul paas se (close-up)', 'Example: bun maska pe pighalta makkhan, itna paas ki texture dikhe.'],
        ['Khulna ya unboxing', 'Example: gift box ka dhakkan khulta hai, andar se product chamakta hai.'],
        ['Before / after', 'Example: furniture shop: khaali kona, ek cut mein wahi kona naye sofa ke saath.'],
        ['Result pehle, kahani baad mein', 'Example: saaf ki hui thali, phir rewind hoke wapas bhari thali.'],
        ['Ajeeb lagne wala frame', 'Example: kurta hawa mein khud lehra raha hai, koi hanger nahi.'],
        ['Size ka khel', 'Example: perfume ki bottle building jitni badi, shehar ke beech khadi.'],
        ['Ruka hua samay (freeze)', 'Example: paani ki boondein hawa mein ruki hui, beech mein product.'],
        ['Sawaal wala text', 'Example: "Andaaza lagao, yeh kis cheez se bana hai?" aur product ka close-up.'],
        ['Haath mein product', 'Example: customer ka haath shelf se product uthata hai, jaise abhi khareedega.']
      ] },
      { type: 'note', text: 'Upar sab example hain: apne product ke hisaab se badlo. AI video ke 2 niyam: (1) product wahi dikhao jo customer ko sach mein milega. (2) Meta kehta hai ki AI se bani ya badli hui asli-jaisi video share karte waqt bata do; Instagram pe post karte waqt AI label ka option milta hai.' },
      { type: 'task', text: 'Apna best product chuno. Uska sabse dhamakedaar pal likho (girna, khulna, bhaap, crunch). Agli reel ka pehla second wahi pal banao, aur phone pe scroll karke dekho: kya aap khud rukoge?' }
    ],
    related: [{ slug: 'website-must-haves-checklist', anchor: 'small business website checklist' }, { slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }, { slug: 'online-presence-checklist', anchor: '10-point online presence checklist' }]
  },
  {
    day: 8, slug: 'missed-call-auto-reply-message', keyword: 'MISSED', release: '2026-11-02T18:30',
    title: 'Missed call = gira hua note',
    h1: 'Missed Call Auto Reply Message + 10-Minute Call-Back Script (missed call = gira hua note)',
    seoTitle: 'Missed Call Auto Reply Message + Call-Back Script (Free PDF)',
    description: 'Missed call = gira hua note. 3 WhatsApp auto-reply messages (day, night, holiday), a 10-minute call-back script, a missed call log and a free printable PDF.',
    summary: 'Missed call recovery kit: 10-minute call-back script, 3 WhatsApp auto-replies + call log.',
    blocks: [
      { type: 'why', title: 'Missed call = gira hua note', text: 'Sadak pe ₹500 ka note gira dikhe, toh aap turant uthaoge. Missed call bhi wahi note hai: koi customer khud chal ke aapke paas aaya tha. Example (Smile Dental clinic): raat 10 baje ek patient daant ke dard mein clinic ko call karta hai. Ghanti bajti rehti hai. Woh doosre clinic ko call karta hai, wahan koi uthata hai, aur subah 9 baje ka appointment wahin book ho jaata hai. Agli subah doctor sochte hain "wrong number hoga". Niyam: missed call, gira hua note hai. Das minute mein uthao.' },
      { type: 'steps', title: 'Din ka niyam: 10-minute call-back script', items: [
        ['10 minute ke andar call back', 'Missed call dikhe, haath ka kaam rok ke wapas lagao. Customer abhi bhi usi sawaal ke saath baitha hai.'],
        ['Pehle apna naam + business', '"Namaste, main {Naam} bol raha hoon, {Business} se. Aapka call aaya tha, utha nahi paaye."'],
        ['Seedha poocho', '"Bataiye, kis cheez ke liye call kiya tha?" Phir dhyaan se suno, beech mein mat kaato.'],
        ['Do time ke option do', '"Kal subah 10 baje ya shaam 5 baje, kaunsa theek rahega?" "Kabhi bhi aa jaao" se baat latakti hai.'],
        ['WhatsApp pe confirm', '"Main abhi WhatsApp pe time aur address bhej deta hoon." Aur turant bhej do.'],
        ['Na uthaye toh', 'Ek baar aur try karo, phir neeche wala "Din" message WhatsApp pe bhejo.'],
        ['Log mein likho', 'Call kab aaya, call back kab kiya, kya chahiye tha, kya hua. Shaam ko 2 minute mein dekh lo.']
      ] },
      { type: 'templates', title: '3 WhatsApp auto-reply messages (copy karo)', items: [
        ['Din: missed call ke baad (call back na ho sake toh khud bhejo)', 'Namaste 🙏 {Business} se {Naam}. Aapka call miss ho gaya, maaf kijiye. 10 minute mein call back karte hain. Jaldi ho toh yahin likh dijiye, kis cheez ke liye call kiya tha?'],
        ['Raat: WhatsApp Business away message ("Outside of business hours")', 'Namaste 🙏 {Business} abhi band hai (timing: {subah 9 – raat 8}). Apna naam aur kaam yahan likh dijiye, kal subah sabse pehle hum aapko call karenge. Appointment ke liye: {booking link}'],
        ['Chhutti: away message ("Custom schedule")', 'Namaste 🙏 {Business} {date} ko band hai, {date} se phir khula. Apna naam aur kaam likh dijiye, khulte hi sabse pehle aapko call karenge. Shukriya!']
      ] },
      { type: 'note', text: 'Raat ka niyam: WhatsApp away message sirf WhatsApp messages ka jawab deta hai, phone call ka nahi. Call ke liye do raaste: (1) number forward karo: phone ki call settings mein "Call forwarding → jab na uthe" kisi aise number pe jo raat ko uthata ho. (2) AI receptionist rakho jo call uthaye, naam aur kaam note kare, aur appointment ka time le. Subah sabse pehle raat ki saari list ko call back.' },
      { type: 'table', title: 'Missed call log', head: ['Call kab aaya', 'Naam / number', 'Call back kab', 'Kya chahiye tha', 'Kya hua'], rows: [
        ['Example: 11:40 am', 'Example: Priya, 98XXX XXXXX', '11:47 am (7 min)', 'Cleaning ka time', 'Sat 11 am booked'],
        ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']
      ] },
      { type: 'note', text: 'Clinic ho toh: phone, call back aur auto-reply mein sirf timing, appointment aur address ki baat. Ilaaj ki salah phone ya message pe nahi. Raat ke message mein ek line jod do: "Emergency ho toh turant nearest hospital jaayein." Upar Smile Dental aur log ki entry example hain: apne business ke naam aur timing daalo.' },
      { type: 'task', text: 'Aaj ka kaam: din mein, har missed call ka das minute mein call back. Shaam ko phone ki call list kholo: aaj kitne missed call aaye, kitno ko 10 minute mein call back kiya? Log mein likho.' }
    ],
    related: [{ slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }, { slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'google-review-request-templates', anchor: 'Google review maangne ke WhatsApp templates' }]
  }
];

/** A chapter unlocks at its reel's posting slot (IST). Keep `release` in sync with posting-queue.json. */
export const isUnlocked = (c: PlaybookChapter, now = Date.now()) => now >= Date.parse(`${c.release}:00+05:30`);

/** WhatsApp link with a prefilled message that says which playbook page the visitor came from. */
export const waLink = (from: string) =>
  `${playbook.whatsapp}?text=${encodeURIComponent(`Hi Vistrow! I'm coming from your 100 Din Playbook (${from}). I'd like help with my business.`)}`;

/** ?preview=1 shows every chapter, but only on the local dev server; the live site never exposes unreleased chapters. */
export const isPreview = (v?: string) => process.env.NODE_ENV === "development" && v === "1";
