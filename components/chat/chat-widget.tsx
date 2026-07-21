"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ExternalLink,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { FormEvent, useEffect, useRef, useState } from "react";

type LinkAction = {
  label: string;
  href: string;
  external?: boolean;
};

type ChatMessage = {
  id: number;
  sender: "bot" | "visitor";
  text: string;
  links?: LinkAction[];
};

type Topic = {
  label: string;
  prompt: string;
  reply: string;
  links: LinkAction[];
};

const topics: Topic[] = [
  {
    label: "Get more leads",
    prompt: "I want to generate more qualified leads.",
    reply:
      "Vistrow can connect paid media, landing pages, lead capture, and conversion tracking into one acquisition system. Start with Digital Marketing or explore ArthaLeads for real estate lead generation.",
    links: [
      { label: "Digital Marketing", href: "/digital-marketing" },
      { label: "Explore ArthaLeads", href: "/products/arthaleads" },
    ],
  },
  {
    label: "Automate follow-up",
    prompt: "I want to automate lead follow-up.",
    reply:
      "We can connect your CRM, workflows, WhatsApp, email, and AI calling so every enquiry receives a fast, consistent response. Vistrow Voice is built for automated voice conversations and qualification.",
    links: [
      { label: "Business Automation", href: "/business-automation" },
      { label: "Explore Vistrow Voice", href: "/products/vistrow-voice" },
    ],
  },
  {
    label: "Explore products",
    prompt: "Show me Vistrow's products.",
    reply:
      "Our current products are ArthaLeads, a real estate lead generation platform, and Vistrow Voice, an AI voice calling agent for outreach, qualification, and follow-up.",
    links: [
      { label: "ArthaLeads", href: "https://www.arthaleads.com/", external: true },
      { label: "Vistrow Voice", href: "https://voice-three-flax.vercel.app/", external: true },
    ],
  },
  {
    label: "Book a Growth Audit",
    prompt: "I would like to book a Growth Audit.",
    reply:
      "Great choice. The Growth Audit reviews your marketing, CRM, follow-up, automation, and tracking to find the clearest opportunities for measurable growth.",
    links: [
      { label: "Book the audit", href: "/growth-audit" },
      { label: "Contact Vistrow", href: "/contact" },
    ],
  },
];

const initialMessage: ChatMessage = {
  id: 1,
  sender: "bot",
  text: "Hi, I’m the Vistrow Guide. Tell me what you want to improve, and I’ll point you in the right direction.",
};

function getReply(input: string): Omit<ChatMessage, "id"> {
  const value = input.toLowerCase();

  if (/lead|marketing|ads|seo|funnel|customer/.test(value)) {
    return { sender: "bot", text: topics[0].reply, links: topics[0].links };
  }

  if (/automat|crm|follow|whatsapp|email|call|voice/.test(value)) {
    return { sender: "bot", text: topics[1].reply, links: topics[1].links };
  }

  if (/product|artha|real estate|vistro voice/.test(value)) {
    return { sender: "bot", text: topics[2].reply, links: topics[2].links };
  }

  if (/audit|strategy|review|consult|book|meeting/.test(value)) {
    return { sender: "bot", text: topics[3].reply, links: topics[3].links };
  }

  if (/price|pricing|cost|budget|quote/.test(value)) {
    return {
      sender: "bot",
      text: "Vistrow scopes every engagement around the channels, systems, and outcomes you need. Share a little about your business and we’ll recommend the right next step.",
      links: [
        { label: "Contact Vistrow", href: "/contact" },
        { label: "Book a Growth Audit", href: "/growth-audit" },
      ],
    };
  }

  return {
    sender: "bot",
    text: "I can help with lead generation, digital marketing, CRM, automation, AI voice calling, or a Growth Audit. For a specific question, send it to the Vistrow team.",
    links: [
      { label: "Contact the team", href: "/contact" },
      { label: "View all services", href: "/services" },
    ],
  };
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([initialMessage]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const reduceMotion = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const replyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const messageIdRef = useRef(1);

  useEffect(() => {
    if (open) {
      window.setTimeout(() => inputRef.current?.focus(), reduceMotion ? 0 : 350);
    }
  }, [open, reduceMotion]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [messages, reduceMotion, typing]);

  useEffect(() => {
    if (!open) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);

  useEffect(
    () => () => {
      if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    },
    [],
  );

  const queueReply = (reply: Omit<ChatMessage, "id">) => {
    setTyping(true);
    if (replyTimerRef.current) clearTimeout(replyTimerRef.current);
    replyTimerRef.current = setTimeout(
      () => {
        messageIdRef.current += 1;
        setMessages((current) => [
          ...current,
          { ...reply, id: messageIdRef.current },
        ]);
        setTyping(false);
      },
      reduceMotion ? 0 : 520,
    );
  };

  const sendMessage = (text: string, reply?: Omit<ChatMessage, "id">) => {
    const cleanText = text.trim();
    if (!cleanText || typing) return;

    messageIdRef.current += 1;
    setMessages((current) => [
      ...current,
      { id: messageIdRef.current, sender: "visitor", text: cleanText },
    ]);
    setInput("");
    queueReply(reply ?? getReply(cleanText));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[55] sm:bottom-6 sm:right-6 print:hidden">
      <AnimatePresence>
        {open ? (
          <motion.section
            key="chat-panel"
            role="dialog"
            aria-modal="false"
            aria-labelledby="vistrow-chat-title"
            initial={reduceMotion ? false : { opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.97 }}
            transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="dropdown-glass flex h-[min(650px,calc(100dvh-2rem))] w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-xl border border-line/70 bg-card/95 shadow-[0_24px_80px_rgb(0_0_0/0.24)] sm:h-[610px] sm:w-[390px]"
          >
            <header className="relative overflow-hidden border-b border-line/70 bg-ink px-5 py-4 text-bg">
              <div
                aria-hidden
                className="absolute -right-10 -top-16 h-36 w-36 rounded-full bg-accent/25 blur-3xl"
              />
              <div className="relative flex items-center justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="relative h-10 w-10 shrink-0">
                    <span className="absolute inset-0 overflow-hidden rounded-full border border-accent/70 bg-black shadow-[0_0_22px_rgb(var(--accent)/0.35)]">
                      <Image
                        src="/vistrow-guide-avatar.png"
                        alt=""
                        fill
                        sizes="40px"
                        className="z-0 scale-[1.1] object-cover"
                      />
                    </span>
                    <span className="absolute -bottom-0.5 -right-0.5 z-20 h-3 w-3 rounded-full border-2 border-ink bg-success shadow-[0_0_8px_rgb(var(--success)/0.65)]" />
                  </span>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <h2 id="vistrow-chat-title" className="truncate font-display text-sm font-bold">
                        Vistrow Guide
                      </h2>
                      <Sparkles className="h-3.5 w-3.5 text-accent" />
                    </div>
                    <p className="mt-0.5 font-sans text-xs text-bg/65">Online automated assistant</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close Vistrow Guide"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-bg/15 text-bg transition-colors hover:border-bg/30 hover:bg-bg/10"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </header>

            <div ref={scrollRef} className="flex-1 overflow-y-auto px-4 py-5" aria-live="polite">
              <div className="space-y-4">
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.sender === "visitor" ? "justify-end" : "justify-start"}`}
                  >
                    <div className="max-w-[88%]">
                      <div
                        className={`rounded-lg px-3.5 py-3 font-sans text-[13px] leading-relaxed ${
                          message.sender === "visitor"
                            ? "rounded-br-sm bg-ink text-bg"
                            : "rounded-bl-sm border border-line/70 bg-surface text-ink-2"
                        }`}
                      >
                        {message.text}
                      </div>
                      {message.links && (
                        <div className="mt-2 flex flex-wrap gap-2">
                          {message.links.map((link) => {
                            const classes =
                              "inline-flex items-center gap-1.5 rounded-full border border-accent/55 bg-accent/10 px-3 py-1.5 font-sans text-xs font-semibold text-accent-strong transition-all hover:border-accent hover:bg-accent/20";
                            if (link.external) {
                              return (
                                <a
                                  key={link.href}
                                  href={link.href}
                                  target="_blank"
                                  rel="noreferrer"
                                  className={classes}
                                >
                                  {link.label}
                                  <ExternalLink className="h-3 w-3" />
                                </a>
                              );
                            }
                            return (
                              <Link key={link.href} href={link.href} className={classes} onClick={() => setOpen(false)}>
                                {link.label}
                                <ArrowRight className="h-3 w-3" />
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {messages.length === 1 && !typing && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {topics.map((topic) => (
                      <button
                        key={topic.label}
                        type="button"
                        onClick={() =>
                          sendMessage(topic.prompt, {
                            sender: "bot",
                            text: topic.reply,
                            links: topic.links,
                          })
                        }
                        className="min-h-14 rounded-lg border border-line/80 bg-card px-3 py-2.5 text-left font-sans text-xs font-semibold leading-snug text-ink transition-all hover:-translate-y-0.5 hover:border-accent hover:bg-accent/10"
                      >
                        {topic.label}
                      </button>
                    ))}
                  </div>
                )}

                {typing && (
                  <div className="flex justify-start" role="status" aria-label="Vistrow Guide is typing">
                    <div className="flex items-center gap-1 rounded-lg rounded-bl-sm border border-line/70 bg-surface px-4 py-3">
                      {[0, 1, 2].map((index) => (
                        <motion.span
                          key={index}
                          className="h-1.5 w-1.5 rounded-full bg-muted"
                          animate={reduceMotion ? undefined : { opacity: [0.35, 1, 0.35], y: [0, -2, 0] }}
                          transition={{ duration: 0.8, repeat: Infinity, delay: index * 0.14 }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={handleSubmit} className="border-t border-line/70 bg-card/90 p-3">
              <div className="flex items-center gap-2 rounded-lg border border-line bg-bg px-3 py-2 focus-within:border-accent">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  maxLength={240}
                  placeholder="Ask about leads, CRM, AI voice..."
                  aria-label="Message Vistrow Guide"
                  className="min-w-0 flex-1 bg-transparent py-1 font-sans text-sm text-ink outline-none placeholder:text-muted"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || typing}
                  aria-label="Send message"
                  className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-all hover:brightness-95 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Send className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center font-sans text-[10px] text-muted">
                Automated guidance. For detailed advice, contact the Vistrow team.
              </p>
            </form>
          </motion.section>
        ) : (
          <motion.button
            key="chat-trigger"
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open Vistrow Guide"
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            whileHover={reduceMotion ? undefined : { y: -3 }}
            whileTap={reduceMotion ? undefined : { scale: 0.97 }}
            className="group flex items-center gap-3 rounded-full border border-accent/50 bg-ink px-2.5 py-2.5 text-bg shadow-[0_14px_44px_rgb(0_0_0/0.22),0_0_0_1px_rgb(var(--accent)/0.08)] sm:pl-4"
          >
            <span className="hidden font-sans text-sm font-semibold sm:inline">Ask Vistrow</span>
            <span className="relative h-11 w-11">
              <span className="absolute inset-0 overflow-hidden rounded-full border border-accent/70 bg-black shadow-[0_0_20px_rgb(var(--accent)/0.3)]">
                <Image
                  src="/vistrow-guide-avatar.png"
                  alt=""
                  fill
                  sizes="44px"
                  className="z-0 scale-[1.1] object-cover"
                />
              </span>
              <span className="absolute -right-0.5 -top-0.5 z-20 h-3.5 w-3.5 rounded-full border-2 border-ink bg-success shadow-[0_0_8px_rgb(var(--success)/0.65)]" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
