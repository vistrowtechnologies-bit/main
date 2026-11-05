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
    day: 2, slug: 'google-business-profile-checklist', keyword: 'BOARD', release: '2026-10-27T10:00',
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
    day: 3, slug: 'website-must-haves-checklist', keyword: 'SHOWROOM', release: '2026-10-28T10:00',
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
    day: 4, slug: 'google-review-request-templates', keyword: 'REVIEWS', release: '2026-10-29T10:00',
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
    day: 5, slug: 'lead-tracker-follow-up', keyword: 'CHAI', release: '2026-10-30T11:00',
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
    day: 7, slug: 'product-reel-hook-ideas', keyword: 'HOOK', release: '2026-11-01T11:00',
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
    day: 8, slug: 'missed-call-auto-reply-message', keyword: 'MISSED', release: '2026-11-02T11:00',
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
  },
  {
    day: 9, slug: 'whatsapp-business-setup-checklist', keyword: 'COUNTER', release: '2026-11-03T11:00',
    title: 'WhatsApp: bedroom ya counter?',
    h1: 'WhatsApp Business Setup Checklist: Catalogue, Greeting Message, Labels (personal WhatsApp = bedroom, Business = counter)',
    seoTitle: 'WhatsApp Business Setup Checklist: Catalogue, Greeting, Labels (Free PDF)',
    description: 'Personal WhatsApp = bedroom, WhatsApp Business = counter. A 10-point WhatsApp Business setup checklist: business profile, catalogue, greeting and away messages, quick replies, labels, with copy-paste messages and a free printable PDF.',
    summary: 'WhatsApp Business counter set karo: profile, catalogue, greeting, quick replies + order labels.',
    blocks: [
      { type: 'why', title: 'Personal WhatsApp = bedroom, Business WhatsApp = counter', text: 'Koi customer dukaan mein aaye aur seedha aapke bedroom mein ghus jaaye, ajeeb lagega na? Personal WhatsApp pe business chalana wahi hai: Mummy ka message, family group, school group aur customer ka order, sab ek hi list mein. Example: Diwali se pehle ek customer ₹4,800 ke lehenga ka order bhejta hai. Shaam tak family group mein 200 message aa jaate hain aur order neeche dab jaata hai. Agle din customer kahin aur se khareed leta hai. WhatsApp Business ek counter hai: catalogue saja hua, aate hi namaste, aur har order pe label.' },
      { type: 'check', title: 'WhatsApp Business setup: 10-point checklist', items: [
        ['WhatsApp Business app lo', 'Play Store / App Store se "WhatsApp Business" (free). Wahi number use kar sakte ho: setup ke time purani chats bhi aa jaati hain. Backup pehle le lo.'],
        ['Business profile poora bharo', 'Settings → Business tools → Business profile: dukaan ka naam, category, address, timing, website / Google link. Logo ko profile photo banao.'],
        ['Catalogue banao', 'Business tools → Catalogue: har product ki saaf photo, naam, daam aur 1 line. Customer ko 40 photo alag-alag bhejne ki zaroorat nahi, ek link kaafi.'],
        ['Greeting message ON', 'Business tools → Greeting message: naye customer ko turant namaste + catalogue ka link.'],
        ['Away message ON', 'Business tools → Away message: dukaan band ho toh timing batao aur kab reply karoge.'],
        ['Quick replies banao', 'Business tools → Quick replies: daam, address, delivery, payment jaise roz ke sawaalon ke jawab "/" shortcut se.'],
        ['Labels lagao', 'Chat pe long-press → Label: New customer, New order, Pending payment, Paid, Order complete. Apne label bhi bana sakte ho.'],
        ['Roz label se list dekho', 'Chats → filter / Labels: subah "New order" aur "Pending payment" kholo. Koi order dabega nahi.'],
        ['Personal chats alag', 'Family aur doston ke liye personal WhatsApp alag number pe. Counter pe sirf customer.'],
        ['Number har jagah ek', 'Google profile, Instagram bio, visiting card aur board pe yahi WhatsApp Business number.']
      ] },
      { type: 'templates', title: 'Copy-paste messages (apna naam aur timing daalo)', items: [
        ['Greeting message', 'Namaste 🙏 {Business} mein aapka swagat hai! Hamara catalogue yahan dekhiye: {catalogue link}. Jo pasand aaye uska photo bhej dijiye, hum turant daam aur delivery bata denge.'],
        ['Away message', 'Namaste 🙏 Abhi dukaan band hai (timing: {subah 10 – raat 9}). Aapka message mil gaya hai, khulte hi sabse pehle reply karenge.'],
        ['Quick reply /order', 'Order confirm ✅ {Product} · {Daam} · Delivery {din}. Payment: {UPI ID}. Payment ka screenshot bhej dijiye, order pack kar dete hain.']
      ] },
      { type: 'table', title: 'Order labels: kab kaunsa label', head: ['Label', 'Kab lagao', 'Agla kaam'], rows: [
        ['New customer', 'Pehli baar message aaya', '10 minute mein reply + catalogue'],
        ['New order', 'Customer ne product aur size bata diya', 'Daam + delivery confirm karo'],
        ['Pending payment', 'Order confirm, payment baaki', 'Shaam ko ek polite yaad dilao'],
        ['Paid', 'Payment aa gaya', 'Pack karo, delivery date bhejo'],
        ['Order complete', 'Delivery ho gayi', '2 din baad review ka link bhejo']
      ] },
      { type: 'note', text: 'Upar ka lehenga order aur ₹4,800 example hain. Menu ke naam phone aur app version ke hisaab se thode alag ho sakte hain (kuch phone mein "Tools" tab). Personal WhatsApp ko Business mein badalne se pehle chat backup zaroor lo.' },
      { type: 'task', text: 'Aaj ka kaam: greeting message ON karo aur 5 sabse zyada bikne wale products catalogue mein daalo. Phir apne kisi dost se message karwa ke dekho: kya counter pe namaste hua?' }
    ],
    related: [{ slug: 'missed-call-auto-reply-message', anchor: 'missed call auto reply message aur call-back script' }, { slug: 'lead-tracker-follow-up', anchor: 'free lead tracker aur follow-up template' }, { slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }]
  },
  {
    day: 10, slug: 'nap-consistency-checklist', keyword: 'NAAM', release: '2026-11-04T11:00',
    title: 'Ek dukaan, teen naam',
    h1: 'NAP Consistency Checklist: Same Business Name, Address and Phone Everywhere (ek dukaan, teen naam = customer gaya)',
    seoTitle: 'NAP Consistency Checklist: Same Name, Address, Phone Everywhere (Free PDF)',
    description: 'Ek dukaan, teen naam = customer confuse. A NAP consistency checklist for small businesses: the 10 places where your business name, address and phone number must match, a master NAP card and a free printable PDF.',
    summary: 'Naam, number, address: har jagah ek. 10 jagah ki checklist + master NAP card.',
    blocks: [
      { type: 'why', title: 'Ek dukaan, teen naam', text: 'Ghar ka address teen jagah teen alag likha ho, toh courier kahan pahunchega? Kahin nahi. Dukaan ke saath bhi yahi hota hai. Example: Riya ko shaam ka birthday cake chahiye. Woh Google pe "Sharma Bakers" dhoondhti hai. Google pe naam hai "Sharma Cake Shop", Instagram pe "cakes by sharma", board pe "Sharma Bakers". Riya confuse: yeh teen dukaan hain ya ek? Google wala number lagati hai, woh purana number hai, koi nahi uthata. Cake bagal wali bakery se jaata hai. Naam mein hi customer rakha hai. Isi ko NAP consistency kehte hain: Name, Address, Phone har jagah bilkul ek.' },
      { type: 'check', title: '10 jagah jahan naam, number aur address ek hona chahiye', items: [
        ['Google Business Profile', 'Naam bilkul board jaisa, wahi phone number jo sach mein uthta hai, poora address aur sahi map pin.'],
        ['Google Maps pin', 'Pin dukaan ke darwaze pe ho, gali ke kone pe nahi. Do listing dikhen toh purani wali hatwao.'],
        ['Instagram', 'Profile name + bio mein wahi naam, wahi number, wahi area. Username alag ho sakta hai, naam nahi.'],
        ['Facebook page', 'Page ka naam, phone aur address wahi. Purana page ho toh band karo ya naya wala link karo.'],
        ['WhatsApp Business profile', 'Business name, address, timing aur website wahi jo Google pe hai.'],
        ['Justdial / IndiaMART / Sulekha', 'Purani listing mein purana number sabse zyada milta hai. Ek baar sab check karo.'],
        ['Website', 'Footer aur contact page pe wahi naam, address, number. Har page pe ek jaisa.'],
        ['Zomato / Swiggy / Practo jaise apps', 'Agar aap wahan ho: naam aur number wahi. Customer wahan se bhi call karta hai.'],
        ['Visiting card, bill, packaging', 'Print pe purana number sabse lamba chalta hai. Naya print ho toh naya number.'],
        ['Shop board', 'Board ka naam hi master naam hai. Baaki sab jagah isi spelling mein.']
      ] },
      { type: 'templates', title: 'Master NAP card (ek baar likho, har jagah copy karo)', items: [
        ['Naam (exact spelling)', '{Sharma Bakers}: board wali spelling. Na "Sharma Cake Shop", na "cakes by sharma".'],
        ['Address (ek hi format)', '{Shop no.}, {building}, {road}, {area}, {city} {PIN}. Har jagah isi kram mein.'],
        ['Phone + WhatsApp', '{98XXX XXXXX}: wahi number jo din bhar koi uthata hai. Number badle toh aaj hi har jagah badlo.']
      ] },
      { type: 'table', title: 'NAP check table: kahan kya likha hai', head: ['Jagah', 'Naam', 'Phone', 'Address', 'Match?'], rows: [
        ['Example: Google', 'Sharma Cake Shop', 'purana number', 'sahi', '✗ naam + number'],
        ['Example: Instagram', 'cakes by sharma', 'nahi diya', 'nahi diya', '✗'],
        ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', ''], ['', '', '', '', '']
      ] },
      { type: 'note', text: 'Upar Riya, Sharma Bakers aur table ki entries example hain: apne business ka naam aur number daalo. Naam chhota-bada ya spelling ka farak bhi customer ko alag dukaan lagta hai. Google pe koi aur "edit suggest" karke naam ya number badal de, toh Business Profile mein dekhte raho.' },
      { type: 'task', text: 'Aaj ka kaam: apni dukaan ka naam Google, Google Maps, Instagram aur Justdial pe search karo. Table mein likho kahan kaunsa naam aur number dikh raha hai. Jahan bhi ✗ aaye, wahi kal ka kaam hai.' }
    ],
    related: [{ slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'whatsapp-business-setup-checklist', anchor: 'WhatsApp Business setup checklist' }, { slug: 'missed-call-auto-reply-message', anchor: 'missed call auto reply message aur call-back script' }]
  },
  {
    day: 11, slug: 'diwali-special-hours-checklist', keyword: 'DIYA', release: '2026-11-05T11:00',
    title: 'Dukaan khuli, Google pe Closed',
    h1: 'Diwali Special Hours on Google: Holiday Hours Checklist for Shops (dukaan khuli, Google pe Closed)',
    seoTitle: 'Diwali Special Hours on Google Business Profile: Holiday Hours Checklist (Free PDF)',
    description: 'Dukaan khuli, Google pe Closed? Set Diwali special hours on your Google Business Profile so customers see the right timing. Festival calendar, away message, Instagram story text and a free printable PDF.',
    summary: 'Tyohaar ki timing Google pe pehle se: Dhanteras se Bhai Dooj tak + away message + story.',
    blocks: [
      { type: 'why', title: 'Dukaan khuli, Google pe Closed', text: 'Example: Diwali ki raat, nau baje. Gupta Mithai khuli hai, mithai taaza, aur ek bhi customer nahi. Kyunki Google pe roz ki timing likhi thi: subah 9 se shaam 7. Shaam 7 ke baad Google sabko "Closed" dikhata raha. Meera ne ghar se dekha "Closed", aur bagal wali dukaan se mithai le li. Board pe "OPEN" likhne se kuch nahi hota: board gali mein dikhta hai, customer ghar pe Google dekhta hai. Isko special hours kehte hain: kisi khaas din ki alag timing, jo Google pe pehle se daalni hoti hai.' },
      { type: 'check', title: 'Festival timing checklist (Diwali week)', items: [
        ['Dhanteras ki timing', 'Agar der tak khule ho, Google Business Profile mein special hours daalo: us din ka khulne aur band hone ka time.'],
        ['Choti Diwali + Diwali', 'Lakshmi Puja ke din jaldi band ya der tak khule? Dono din alag-alag time daalo.'],
        ['Padwa + Bhai Dooj', 'Chhutti ho toh "Closed" mark karo, taaki koi bekaar na aaye. Khule ho toh time likho.'],
        ['Pehle se, last minute nahi', 'Special hours tyohaar se 2–3 din pehle daalo. Customer pehle se plan karta hai.'],
        ['Roz ki timing bhi check karo', 'Regular hours sahi hain? Purani timing sabse zyada nuksaan karti hai.'],
        ['WhatsApp away message', 'Band ho toh away message mein tyohaar ki timing aur khulne ka din likho.'],
        ['Instagram / WhatsApp story', 'Ek story: "Diwali timing: 9 am – 11 pm. Bhai Dooj: band." Customer screenshot leta hai.'],
        ['Dukaan ke bahar note', 'Shutter ya darwaze pe wahi timing jo Google pe hai. Dono jagah ek hi baat.'],
        ['Phone uthao ya forward karo', 'Tyohaar pe call zyada aate hain. Koi uthaye, ya call forward ho.'],
        ['Tyohaar ke baad wapas', 'Special hours sirf us din ke liye hote hain. Agle din roz ki timing apne aap wapas aa jaati hai, phir bhi ek baar dekh lo.']
      ] },
      { type: 'table', title: 'Diwali week timing planner', head: ['Din', 'Khulega', 'Band', 'Google pe daala?'], rows: [
        ['Example: Dhanteras', '9 am', '10 pm', '✓'],
        ['Dhanteras', '', '', ''], ['Choti Diwali', '', '', ''], ['Diwali (Lakshmi Puja)', '', '', ''], ['Padwa', '', '', ''], ['Bhai Dooj', '', '', '']
      ] },
      { type: 'templates', title: 'Copy-paste messages', items: [
        ['WhatsApp away message', 'Namaste 🙏 Diwali ki shubhkamnayein! Hamari tyohaar timing: {Dhanteras 9 am – 10 pm, Diwali 9 am – 11 pm, Bhai Dooj band}. Apna order yahan likh dijiye, khulte hi reply karenge.'],
        ['Instagram / WhatsApp story', '🪔 Diwali timing · {Dukaan ka naam}\nDhanteras: {9 am – 10 pm}\nDiwali: {9 am – 11 pm}\nBhai Dooj: band\nOrder ke liye WhatsApp: {number}']
      ] },
      { type: 'note', text: 'Upar Gupta Mithai, Meera aur timing example hain: apni dukaan ki timing daalo. Special hours Google Business Profile mein "Hours" ke andar milte hain; menu ka naam app ke version ke hisaab se thoda alag ho sakta hai.' },
      { type: 'task', text: 'Aaj ka kaam: apni dukaan Google pe search karo aur dekho Dhanteras se Bhai Dooj tak kya timing dikh rahi hai. Jahan galat hai, wahan special hours daalo, aur ek story bhi daal do.' }
    ],
    related: [{ slug: 'google-business-profile-checklist', anchor: 'Google Business Profile kaise banaye (free checklist)' }, { slug: 'nap-consistency-checklist', anchor: 'NAP consistency checklist: naam, number, address har jagah ek' }, { slug: 'whatsapp-business-setup-checklist', anchor: 'WhatsApp Business setup checklist' }]
  },
  {
    day: 12, slug: 'rate-card-auto-reply-kit', keyword: 'RATE', release: '2026-11-06T11:00',
    title: 'Price DM karo = sikka bagal mein',
    h1: 'Instagram & WhatsApp Auto Reply for Price Enquiries: Rate-Card Message Kit for Jewellers and Shops (Price DM karo = customer gaya)',
    seoTitle: 'Auto Reply Message for Price Enquiry on Instagram & WhatsApp (Free Rate-Card Kit)',
    description: '"Price DM karo" loses customers who ask 3 shops at once: the first reply wins. Free rate-card auto-reply kit: daily-rate message, booking-link reply, festival rush checklist and a printable PDF.',
    summary: 'Pehla reply = sale. Aaj ka rate + booking link, turant, bina insaan ke.',
    blocks: [
      { type: 'why', title: 'Price DM karo = sikka bagal mein', text: 'Example: Dhanteras ki shaam. Priya ne teen jewellers ko ek saath DM kiya: "sone ka sikka, rate kya hai?" Ravi ji ki dukaan mein bheed thi, phone drawer mein bajta raha. Sona Jewellers ka reply turant aaya: aaj ka rate aur booking link. Priya ne wahin booking kar li. Aaj customer intezaar nahi karta, comparison karta hai: jo pehle reply kare, sale wahi karta hai. Isliye "Price DM karo" likhna aur phir der se reply karna, dono nuksaan hain. Hal: instant auto-reply, jo aaj ka rate aur booking link turant bhej de, chahe aap counter pe hon.' },
      { type: 'check', title: 'Rate-card auto-reply checklist', items: [
        ['Ek rate-card message taiyaar rakho', 'Aaj ka rate, making charges kaise lagte hain, aur booking ya visit ka link: ek hi message mein.'],
        ['Rate roz update karo', 'Sona-chandi ka rate roz badalta hai. Subah 10 baje ek baar message update karo, ya "aaj ka rate yahan dekhein" wala link do.'],
        ['Instagram DM auto-reply', 'Instagram ke saved replies / automated responses mein rate-card message daalo, taaki DM ka jawab turant jaaye.'],
        ['WhatsApp Business quick reply', 'Quick reply "/rate" banao. Greeting message mein bhi likho: "Aaj ka rate jaanne ke liye RATE likhiye."'],
        ['Post mein "Price DM karo" mat likho', 'Uski jagah: "Rate ke liye RATE comment karo, turant DM milega." Aur auto-reply on rakho.'],
        ['Booking link ya call button', 'Customer ko agla step do: "Book karein" link, store location, ya call. Sirf rate bhejna kaafi nahi.'],
        ['Rush time ka plan', 'Festival ke din ek insaan sirf phone/DM sambhale, ya auto-reply on rahe. Counter aur DM dono chalte rahein.'],
        ['Har DM ka follow-up', 'Jisne rate poocha par aaya nahi, shaam ko ek chhota message: "Aapka sikka reserve kar dein?"']
      ] },
      { type: 'templates', title: 'Copy-paste messages', items: [
        ['Auto-reply: rate-card', 'Namaste 🙏 {Dukaan ka naam} mein swagat hai! Aaj ka rate yahan dekhiye: {rate link / photo}. Making charges product ke hisaab se. Booking ke liye: {booking link} ya call {number}.'],
        ['Rush-day auto-reply', 'Namaste 🙏 Dhanteras ki bheed ke kaaran 15 minute mein call karenge. Tab tak aaj ka rate-card: {link}. Sikka/jewellery reserve karni ho toh yahin "RESERVE" likh dijiye.'],
        ['Follow-up (shaam ko)', 'Namaste {naam} ji, aapne sone ke sikke ka rate poocha tha. Kal subah tak aapke liye reserve kar dein? 🙏']
      ] },
      { type: 'note', text: 'Upar Priya, Ravi ji, Sona Jewellers example hain. Rate kabhi galat mat bhejo: roz update karo, ya live rate ka link do. Menu ke naam app version ke hisaab se thode alag ho sakte hain.' },
      { type: 'task', text: 'Aaj ka kaam: apna rate-card message likho aur Instagram + WhatsApp dono pe auto-reply / quick reply mein daalo. Phir kisi dost se "rate?" DM karwa ke time check karo: jawab kitne second mein aaya?' }
    ],
    related: [{ slug: 'missed-call-auto-reply-message', anchor: 'missed call auto reply message aur call-back script' }, { slug: 'whatsapp-business-setup-checklist', anchor: 'WhatsApp Business setup checklist' }, { slug: 'diwali-special-hours-checklist', anchor: 'Diwali special hours checklist' }]
  },
  {
    day: 13, slug: 'shop-story-reel-ideas', keyword: 'KAHANI', release: '2026-11-07T11:00',
    title: 'Sale nahi, kahani dikhao',
    h1: 'Diwali Reel Ideas for Shops: 5 Customer Story Reels That Beat a "SALE 20% OFF" Post (Sale nahi, kahani dikhao)',
    seoTitle: 'Diwali Reel Ideas for Small Shops: 5 Story Reel Ideas (Free PDF)',
    description: 'Every shop posts the same "Diwali SALE 20% off" and people scroll past. On our own Instagram, a story reel got about 10x the views of a plain one. 5 story reel ideas for your shop, with hooks and shot lists, plus a PDF.',
    summary: 'Log dukaan nahi, dukaan ki kahani yaad rakhte hain. 5 kahani ideas jo SALE post se zyada chalti hain.',
    blocks: [
      { type: 'why', title: 'Sale post sab daalte hain. Kahani sirf aap daal sakte ho.', text: 'Diwali aate hi feed mein har dukaan ki ek hi post hoti hai: "SALE! 20% off." Log aage scroll kar dete hain, kyunki sab same lagta hai. Humne apne hi Instagram pe dekha: bina kahani wali reel (Day 6) ko 200 views mile, aur kahani wali reel (Day 8: sadak pe gira 500 ka note aur ek missed call) ko 1,968. Phir poore hafte har reel mein ek insaan ki kahani daali, aur post ka time 11:00 se 11:45 kiya: Day 2 se 7 ka average lagbhag 900 views tha, Day 8 se 10 ka lagbhag 1,500. (Do cheezein badli thi, isliye hum sirf kahani ko credit nahi dete.) Aapki dukaan mein bhi aisi kahaniyan roz hoti hain: jaise Khanna ji ki purani mithai ki dukaan, jahan Kamla aunty bees saal se roz aati hain. Wohi aapki sabse achhi reel hai.' },
      { type: 'check', title: '5 kahani reel ideas for your shop', items: [
        ['1. Sabse purana customer', 'Jo 10-20 saal se aa rahe hain: unka pehla din, aaj ka din. Hook: "Ye aunty 20 saal se roz aati hain. Kyun?" (Pehle permission lo.)'],
        ['2. Dukaan ki shuruaat', 'Purani photo ya pehla counter vs aaj. Hook: "1998 mein ek chhoti si table thi."'],
        ['3. Ek mushkil order', 'Last-minute shaadi ka order, raat bhar ka kaam, customer ki khushi. Hook: "Raat 11 baje phone aaya…"'],
        ['4. Banane ka process', 'Ek item kaise banta hai, haath se, kitni der mein. Hook: "Ek kaju katli ke peeche 3 ghante."'],
        ['5. Galti jo sudhaari', 'Ek baar kya galat hua aur aapne kaise theek kiya. Hook: "Us din humse galti hui."'],
        ['Har reel ka format', 'Pehle 3 second mein insaan + problem, beech mein kya hua, end mein natija. Sale ka zikr end mein ek line, bas.'],
        ['Real rakho', 'Asli log, asli dukaan, asli awaaz. Customer ko dikhane se pehle unki permission lo.'],
        ['Har reel ke end mein ek kaam', '"Comment karo", "DM karo" ya "aaj aaiye": ek hi call-to-action.']
      ] },
      { type: 'templates', title: 'Copy-paste hooks', items: [
        ['Purana customer', 'Ye {naam} ji {X} saal se humare yahan aate hain. Pehli baar kya liya tha, pata hai?'],
        ['Shuruaat', '{saal} mein humari dukaan ek chhoti si {table/thela} thi. Aaj…'],
        ['Process', 'Ek {item} banane mein {X} ghante lagte hain. Dekhiye kyun.']
      ] },
      { type: 'note', text: 'Upar Khanna ji, Kamla aunty aur "20 saal" example hain. 200, 1,968, ~900 aur ~1,500 humare apne Instagram reels ke real views hain (Day 1 launch reel average mein nahi gina). Har dukaan ke results alag hote hain. Agar aap chahte ho ki hum aapki dukaan ki kahani likhein aur reel banayein, WhatsApp karein.' },
      { type: 'task', text: 'Aaj ka kaam: apne 3 sabse purane customers ke naam likho aur unki ek-ek line ki kahani. Jo sabse achhi lage, uski 30 second ki reel ka pehla line (hook) likho.' }
    ],
    related: [{ slug: 'product-reel-hook-ideas', anchor: 'product reel hook ideas' }, { slug: 'diwali-special-hours-checklist', anchor: 'Diwali special hours checklist' }, { slug: 'rate-card-auto-reply-kit', anchor: 'rate-card auto-reply kit' }]
  }
];

/** A chapter unlocks at its reel's posting slot (IST). Keep `release` in sync with posting-queue.json. */
export const isUnlocked = (c: PlaybookChapter, now = Date.now()) => now >= Date.parse(`${c.release}:00+05:30`);

/** WhatsApp link with a prefilled message that says which playbook page the visitor came from. */
export const waLink = (from: string) =>
  `${playbook.whatsapp}?text=${encodeURIComponent(`Hi Vistrow! I'm coming from your 100 Din Playbook (${from}). I'd like help with my business.`)}`;

/** ?preview=1 shows every chapter, but only on the local dev server; the live site never exposes unreleased chapters. */
export const isPreview = (v?: string) => process.env.NODE_ENV === "development" && v === "1";
