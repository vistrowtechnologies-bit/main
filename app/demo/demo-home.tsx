"use client";

import Image from "next/image";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ArrowUpRight, BookOpen, ChevronLeft, ChevronRight, Menu, MessageCircle, X } from "lucide-react";
import styles from "./demo.module.css";

const base = "/demo/arth-aspire";
const whatsapp = "https://wa.me/917972465072";
const books = [
  {
    level: "01",
    title: "Neural Activation",
    description: "A starting point for attention, visual awareness and coordinated activity.",
    image: `${base}/brain-booster-1.jpg`,
    color: "#245ab5",
  },
  {
    level: "02",
    title: "Bilateral Coordination",
    description: "Activities built around left-right coordination and steady, deliberate work.",
    image: `${base}/brain-booster-2.jpg`,
    color: "#318448",
  },
  {
    level: "03",
    title: "Cognitive Control",
    description: "A more demanding stage for focus, speed and controlled responses.",
    image: `${base}/brain-booster-3.jpg`,
    color: "#d57a32",
  },
  {
    level: "04",
    title: "Brain Mastery",
    description: "The final level in the four-book Brain Booster progression.",
    image: `${base}/brain-booster-4.jpg`,
    color: "#7753a0",
  },
];

const nav = [
  { label: "The books", href: "#books" },
  { label: "Maths Mastery", href: "#approach" },
  { label: "The founder", href: "#founder" },
  { label: "For schools", href: "#schools" },
];

export default function DemoHome() {
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const selected = books[selectedLevel];
  const changeLevel = (direction: number) => setSelectedLevel((level) => (level + direction + books.length) % books.length);

  return (
    <div className={`arth-demo ${styles.demo}`}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="#top" aria-label="Arth Aspire Institute, back to top">
            <Image src={`${base}/logo.jpg`} alt="" width={48} height={42} className={styles.brandMark} priority />
            <span><strong>Arth Aspire</strong><small>INSTITUTE</small></span>
          </a>
          <nav className={styles.desktopNav} aria-label="Arth Aspire navigation">
            {nav.map((item) => <a href={item.href} key={item.href}>{item.label}</a>)}
          </nav>
          <a className={styles.headerCta} href="tel:+917972465072">
            <span>Call us</span> 79724 65072 <ArrowUpRight size={16} aria-hidden />
          </a>
          <button className={styles.menuButton} type="button" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && <nav className={styles.mobileNav} aria-label="Mobile navigation">
          {nav.map((item) => <a href={item.href} key={item.href} onClick={() => setMenuOpen(false)}>{item.label}</a>)}
          <a href={`${whatsapp}?text=${encodeURIComponent("Hello, I would like to know more about Arth Aspire Institute.")}`} target="_blank" rel="noopener noreferrer">Enquire on WhatsApp</a>
        </nav>}
      </header>

      <section className={styles.hero} id="top" aria-labelledby="hero-title">
        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <span className={styles.kicker}>Brain Booster &amp; Maths Mastery</span>
            <h1 id="hero-title">Arth Aspire<br />Institute<span className={styles.heroDot}>.</span></h1>
            <p className={styles.heroLead}>Strengthen the mind.<br /><em>Master the mathematics.</em></p>
            <p className={styles.heroBody}>Purposeful activity books and workbooks by educator Krishna Ranjana More. Pick a level and see where the learning begins.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryButton} href="#books">Explore Brain Booster <ArrowRight size={18} aria-hidden /></a>
              <a className={styles.textButton} href="#approach">Explore Maths Mastery <ArrowUpRight size={17} aria-hidden /></a>
            </div>
            <p className={styles.placeLine}>Kolhapur <span /> Pune <span /> Mumbai</p>
          </div>
          <div className={styles.heroStage} aria-label="Explore the four Brain Booster Activity Booklets">
            <div className={styles.stageEyebrow}>THE BRAIN BOOSTER COLLECTION <span>{selected.level} / 04</span></div>
            <div className={styles.stageSurface} aria-hidden />
            <div className={styles.stageBooks}>
              {books.map((book, index) => <motion.button
                className={`${styles.heroBook} ${selectedLevel === index ? styles.heroBookSelected : ""}`}
                type="button"
                key={book.level}
                onClick={() => setSelectedLevel(index)}
                aria-label={`Show Brain Booster Level ${index + 1}: ${book.title}`}
                aria-pressed={selectedLevel === index}
                style={{ left: `${2 + index * 23}%` }}
                initial={reduceMotion ? false : { opacity: 0, y: 72, rotate: 0 }}
                animate={{ opacity: 1, y: selectedLevel === index ? -19 : 0, rotate: selectedLevel === index ? 0 : [-13, -5, 5, 13][index], scale: selectedLevel === index ? 1.12 : .86, zIndex: selectedLevel === index ? 6 : index + 1 }}
                transition={reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 170, damping: 19, delay: .08 * index }}
              >
                <Image src={book.image} alt={`Brain Booster Activity Booklet Level ${index + 1} cover`} width={620} height={877} priority={index < 2} />
              </motion.button>)}
            </div>
            <div className={styles.stageControls}>
              <button type="button" onClick={() => changeLevel(-1)} aria-label="Previous book"><ChevronLeft size={20} aria-hidden /></button>
              <div className={styles.stageSelection} aria-live="polite"><span>LEVEL {selected.level} / 04</span><strong>{selected.title}</strong></div>
              <button type="button" onClick={() => changeLevel(1)} aria-label="Next book"><ChevronRight size={20} aria-hidden /></button>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.introStrip} aria-label="Brain Booster overview">
        <div className={styles.introInner}>
          <p><strong>4</strong><span>progressive levels</span></p>
          <p><strong>120</strong><span>worksheets</span></p>
          <p><strong>120</strong><span>days of training</span></p>
          <a href="#books">Find your starting point <ArrowRight size={17} aria-hidden /></a>
        </div>
      </section>

      <section className={styles.booksSection} id="books" aria-labelledby="books-title">
        <motion.div className={styles.sectionTop} initial={reduceMotion ? false : { opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, ease: "easeOut" }}>
          <div>
            <span className={styles.sectionLabel}>01 / The collection</span>
            <h2 id="books-title">Four levels.<br /><em>One growing mind.</em></h2>
          </div>
          <p>Brain Booster is a four-level activity series. Each booklet has a distinct focus, while the whole set moves from a starting point to a more demanding stage of practice.</p>
        </motion.div>
        <div className={styles.bookGrid} aria-label="Choose a Brain Booster level">
          {books.map((book, index) => <button
            className={`${styles.bookCard} ${selectedLevel === index ? styles.bookCardActive : ""}`}
            type="button"
            key={book.level}
            onClick={() => setSelectedLevel(index)}
            aria-pressed={selectedLevel === index}
          >
            <span className={styles.bookNumber}>LEVEL {book.level} <span>{selectedLevel === index ? "SELECTED" : "EXPLORE"}</span></span>
            <span className={styles.bookImageWrap} style={{ backgroundColor: `${book.color}15` }}>
              <Image src={book.image} alt={`Brain Booster Activity Booklet Level ${index + 1} cover`} width={620} height={877} loading="lazy" />
            </span>
            <span className={styles.bookCardBottom}><strong>{book.title}</strong><ArrowUpRight size={18} aria-hidden /></span>
          </button>)}
        </div>
        <div className={styles.selectedBook} aria-live="polite">
          <div className={styles.selectedBookCopy}>
            <span>SELECTED BOOKLET / {selected.level} OF 04</span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div key={selected.level} initial={reduceMotion ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={reduceMotion ? undefined : { opacity: 0, y: -12 }} transition={{ duration: .23 }}>
                <h3>{selected.title}</h3><p>{selected.description}</p>
              </motion.div>
            </AnimatePresence>
          </div>
          <a href={`${whatsapp}?text=${encodeURIComponent(`Hello, I would like to ask about Brain Booster Level ${selectedLevel + 1}.`)}`} target="_blank" rel="noopener noreferrer">Ask about Level {selected.level} <ArrowRight size={17} aria-hidden /></a>
        </div>
      </section>

      <section className={styles.mathsSection} id="approach" aria-labelledby="maths-title">
        <div className={styles.mathsInner}>
          <div className={styles.mathsVisual}>
            <span className={styles.mathsIndex}>02 / MATHEMATICS</span>
            <Image src={`${base}/maths-mastery.jpg`} alt="Maths Mastery Module Workbook cover" width={620} height={846} loading="lazy" />
          </div>
          <motion.div className={styles.mathsCopy} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, ease: "easeOut" }}>
            <span className={styles.sectionLabel}>More than a right answer</span>
            <h2 id="maths-title">Maths makes more sense when the thinking does.</h2>
            <p>The Maths Mastery Module Workbook series is designed around conceptual clarity, logical reasoning and step-by-step problem solving. It gives learners room to understand the method, not just finish the exercise.</p>
            <div className={styles.mathsMeta}><BookOpen size={20} aria-hidden /><span>Maths Mastery Module Workbooks, Volumes 1-3</span></div>
            <a className={styles.darkButton} href={`${whatsapp}?text=${encodeURIComponent("Hello, I would like to know about the Maths Mastery Module Workbooks.")}`} target="_blank" rel="noopener noreferrer">Ask about Maths Mastery <ArrowUpRight size={18} aria-hidden /></a>
          </motion.div>
        </div>
      </section>

      <section className={styles.founderSection} id="founder" aria-labelledby="founder-title">
        <div className={styles.founderInner}>
          <motion.div className={styles.founderCopy} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, ease: "easeOut" }}>
            <span className={styles.sectionLabel}>03 / The person behind the pages</span>
            <h2 id="founder-title">Made by an educator who knows the classroom.</h2>
            <p>Krishna Ranjana More is a mathematics educator, author and founder of Arth Aspire Institute. His 14+ years of teaching across boards, from SSC to IB, shape the learning resources you see here.</p>
            <p>The idea is straightforward: build understanding, reasoning and confidence alongside regular practice.</p>
            <a href="https://thebusinessstories.com/beyond-marks-how-krishna-more-is-redefining-mathematics-learning-and-creating-a-transformative-learning-environment/" target="_blank" rel="noopener noreferrer" className={styles.articleLink}>Read his story <ArrowUpRight size={18} aria-hidden /></a>
          </motion.div>
          <div className={styles.founderMedia}>
            <Image src={`${base}/krishna-more.jpg`} alt="Krishna Ranjana More, founder of Arth Aspire Institute" width={400} height={400} loading="lazy" />
            <div><span>FOUNDER &amp; EDUCATOR</span><strong>Krishna Ranjana More</strong><small>14+ years teaching experience</small></div>
          </div>
        </div>
      </section>

      <section className={styles.pressSection} aria-labelledby="press-title">
        <div className={styles.pressInner}>
          <div className={styles.pressVisual}><Image src={`${base}/herald-cover.jpg`} alt="International Herald Magazine October 2026 cover featuring Krishna Ranjana More" width={680} height={961} loading="lazy" /></div>
          <motion.div className={styles.pressCopy} initial={reduceMotion ? false : { opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .3 }} transition={{ duration: .55, ease: "easeOut" }}>
            <span className={styles.sectionLabel}>Recognition</span>
            <h2 id="press-title">A story worth sharing.</h2>
            <p>Krishna More&apos;s approach to mathematics education was featured in the October 2026 special edition of International Herald Magazine. His work has also been profiled by The Business Stories.</p>
            <a href="https://thebusinessstories.com/beyond-marks-how-krishna-more-is-redefining-mathematics-learning-and-creating-a-transformative-learning-environment/" target="_blank" rel="noopener noreferrer">Read The Business Stories profile <ArrowUpRight size={18} aria-hidden /></a>
          </motion.div>
        </div>
      </section>

      <section className={styles.schoolsSection} id="schools" aria-labelledby="schools-title">
        <div className={styles.schoolsInner}>
          <span className={styles.sectionLabel}>For schools &amp; educators</span>
          <h2 id="schools-title">Bring purposeful practice into the classroom.</h2>
          <p>Explore the booklets and workbooks for your students. Talk with Arth Aspire about resources for your school or learning programme.</p>
          <a href={`${whatsapp}?text=${encodeURIComponent("Hello, I would like to discuss Arth Aspire resources for our school.")}`} target="_blank" rel="noopener noreferrer">Start a conversation <MessageCircle size={18} aria-hidden /></a>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><strong>Arth Aspire Institute</strong><span>Kolhapur · Pune · Mumbai</span></div>
        <div><a href="tel:+917972465072">+91 79724 65072 <ArrowUpRight size={15} aria-hidden /></a><a href={whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={15} aria-hidden /></a></div>
      </footer>
    </div>
  );
}
