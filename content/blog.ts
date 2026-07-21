import type { BlogPost } from "@/lib/content-types";

export const blogPosts: BlogPost[] = [
  {
    slug: "speed-to-lead-why-response-time-decides-deals",
    title: "Speed to lead: why response time decides more deals than your ad spend",
    excerpt:
      "Studies on lead response consistently show the same pattern: the business that responds first usually wins, regardless of who has the better offer. Here's what that means for how you structure follow-up.",
    category: "Lead Generation",
    author: "Vistrow Team",
    date: "2026-06-02",
    readTime: "6 min read",
    metaTitle: "Speed to Lead: Why Response Time Decides Deals",
    metaDescription:
      "Why response time is one of the highest-leverage variables in conversion, and how to structure instant follow-up without adding headcount.",
    sections: [
      {
        paragraphs: [
          "Most teams optimise the top of the funnel first: better targeting, sharper creative, lower cost per click. Those matter, but they're not where most pipeline is actually lost. It's lost in the gap between a lead arriving and someone responding to it.",
          "The pattern shows up across industries: real estate, B2B software, local services. The lead doesn't go to the best offer. It goes to whoever calls back first, while intent is still high and the buyer hasn't moved on to a competitor's tab.",
        ],
      },
      {
        heading: "Why response time collapses so fast",
        paragraphs: [
          "A lead who fills out a form is in an unusually short window of high intent. They're actively comparing options right now. An hour later, they may have already spoken to two other businesses. A day later, the moment has often passed entirely.",
          "Manual follow-up can't reliably hit that window, especially outside business hours or during busy periods. It's not a discipline problem — it's a structural one. No team can staff for instant response to every channel, every hour.",
        ],
      },
      {
        heading: "What a faster system actually looks like",
        paragraphs: [
          "The fix isn't \"try harder to call back quickly.\" It's building a system that responds automatically the moment a lead arrives, then hands off to a human once intent is confirmed.",
        ],
        points: [
          "Instant acknowledgment across the channel the lead used",
          "AI voice or messaging that qualifies before a human gets involved",
          "Automatic routing to the right owner the moment qualification completes",
          "A fallback path for after-hours and volume spikes",
        ],
      },
      {
        heading: "The honest caveat",
        paragraphs: [
          "Speed alone doesn't fix a weak offer or poor targeting. If the lead was never a good fit, responding in ten seconds instead of ten minutes won't change the outcome. Speed to lead is a multiplier on demand you're already generating — not a replacement for generating the right demand in the first place.",
        ],
      },
    ],
  },
  {
    slug: "why-most-crm-implementations-fail",
    title: "Why most CRM implementations fail (and it's rarely the software)",
    excerpt:
      "Teams blame the CRM when adoption stalls. In most cases the tool was fine — the process it was supposed to encode was never actually defined.",
    category: "CRM & Automation",
    author: "Vistrow Team",
    date: "2026-05-14",
    readTime: "7 min read",
    metaTitle: "Why Most CRM Implementations Fail",
    metaDescription:
      "A CRM implementation rarely fails because of the software. It fails because the sales process it's meant to encode was never clearly defined first.",
    sections: [
      {
        paragraphs: [
          "It's a familiar story: a company buys a CRM, migrates their data, trains the team, and six months later half the reps are back to tracking deals in spreadsheets. The instinct is to blame the software or switch platforms. That rarely fixes it.",
        ],
      },
      {
        heading: "The CRM isn't the process — it's the record of the process",
        paragraphs: [
          "A CRM can only reflect a sales process that already exists and is well understood. If your team doesn't agree on what counts as a qualified lead, what happens at each pipeline stage, or who owns follow-up after a demo, no software configuration fixes that. It just gives everyone a new place to disagree.",
          "Implementations that stick almost always start with the process, not the tool: map the stages, define exit criteria for each one, agree on ownership, and only then decide how the CRM should encode it.",
        ],
      },
      {
        heading: "Signs the process was skipped",
        paragraphs: [
          "A few patterns show up consistently in stalled CRM rollouts:",
        ],
        points: [
          "Pipeline stages that don't map to anything reps actually do",
          "Reps keeping a personal tracker \"just in case\"",
          "Deals sitting in one stage for months with no clear next action",
          "Reporting nobody trusts enough to make decisions from",
        ],
      },
      {
        heading: "What we do differently",
        paragraphs: [
          "Before we touch configuration, we map how deals actually move today — including the informal workarounds. Then we design the pipeline around that reality, automate the repetitive steps, and only migrate data once the structure is agreed. It's slower up front and considerably faster to get real adoption.",
        ],
      },
    ],
  },
  {
    slug: "ai-voice-calling-what-it-can-and-cant-do",
    title: "AI voice calling: what it can and can't do for your pipeline",
    excerpt:
      "AI voice gets pitched as a replacement for sales teams. In practice it's a qualification layer — useful for a specific job, not a general-purpose rep.",
    category: "AI Voice",
    author: "Vistrow Team",
    date: "2026-04-22",
    readTime: "5 min read",
    metaTitle: "AI Voice Calling: What It Can and Can't Do",
    metaDescription:
      "A realistic look at where AI voice calling helps pipeline — instant response and qualification — and where it isn't the right tool.",
    sections: [
      {
        paragraphs: [
          "There's a lot of noise around AI voice agents right now, some of it overselling what the technology actually does well. It's worth being specific about where it genuinely helps and where it doesn't.",
        ],
      },
      {
        heading: "Where it earns its place",
        paragraphs: ["AI voice is strongest as the very first touch on a new lead — the job that's hardest for humans to do consistently:"],
        points: [
          "Calling within seconds of a lead arriving, at any hour",
          "Asking consistent qualifying questions without skipping steps",
          "Booking a meeting directly into a calendar when intent is confirmed",
          "Logging the conversation and outcome without manual data entry",
        ],
      },
      {
        heading: "Where it isn't the right tool",
        paragraphs: [
          "Complex negotiation, objection handling that requires judgment, and relationship-building conversations still need a person. We design AI voice to hand off to a human once a lead is qualified — not to carry the whole conversation end to end.",
          "It also depends entirely on what happens after the call. An AI agent that qualifies a lead and then drops it into a CRM nobody checks hasn't solved anything. The value comes from the system around it, not the call in isolation.",
        ],
      },
      {
        heading: "The realistic framing",
        paragraphs: [
          "Think of AI voice as removing the delay and inconsistency from the first response, not as a replacement for your sales team. Used that way, it's one of the highest-leverage pieces of a connected follow-up system.",
        ],
      },
    ],
  },
  {
    slug: "marketing-attribution-that-sales-will-actually-trust",
    title: "Building marketing attribution that sales will actually trust",
    excerpt:
      "Attribution dashboards get ignored when they don't match what the sales team sees in the CRM. Fixing that gap matters more than adding another tracking pixel.",
    category: "Conversion Tracking",
    author: "Vistrow Team",
    date: "2026-03-30",
    readTime: "6 min read",
    metaTitle: "Marketing Attribution Sales Teams Will Trust",
    metaDescription:
      "Why attribution dashboards get ignored, and how to build tracking that ties directly to CRM pipeline data sales already trusts.",
    sections: [
      {
        paragraphs: [
          "Most marketing teams have an attribution dashboard. Fewer have one that sales actually references when deciding where to spend time. Those are different problems, and only the second one changes budget decisions.",
        ],
      },
      {
        heading: "The trust gap",
        paragraphs: [
          "When marketing reports leads and sales reports revenue, and the two numbers don't reconcile, sales defaults to trusting their own pipeline view. That's usually correct — the CRM has more accurate downstream data. The fix isn't a better chart. It's making the marketing report and the CRM pipeline the same source of truth.",
        ],
      },
      {
        heading: "What that requires in practice",
        paragraphs: ["A handful of technical pieces, done properly, close most of the gap:"],
        points: [
          "Consistent UTM and source tagging enforced at the point of lead capture",
          "CRM fields that store first-touch and last-touch source, not just \"how did you hear about us\"",
          "Server-side or CRM-triggered conversion events, not just client-side pixels",
          "A shared dashboard built on CRM stage data, not a separate marketing-only tool",
        ],
      },
      {
        heading: "What to expect honestly",
        paragraphs: [
          "Attribution will never be perfectly clean — multi-touch journeys and offline influence make that impossible. The goal is directionally reliable data sales trusts enough to act on, not a perfect model. That's a lower bar than most attribution projects aim for, and a far more useful one.",
        ],
      },
    ],
  },
  {
    slug: "when-to-automate-and-when-not-to",
    title: "When to automate a process, and when not to",
    excerpt:
      "Automation is often applied to processes that were broken to begin with, which just makes the broken process run faster. Here's how we decide what's worth automating.",
    category: "Business Automation",
    author: "Vistrow Team",
    date: "2026-03-08",
    readTime: "5 min read",
    metaTitle: "When to Automate a Process — and When Not To",
    metaDescription:
      "A practical framework for deciding which parts of your operations are worth automating, and which aren't ready yet.",
    sections: [
      {
        paragraphs: [
          "Automation gets sold as a default good. It isn't. Automating a process that's inconsistent or poorly defined just means the inconsistency happens faster and at greater scale.",
        ],
      },
      {
        heading: "A useful filter before automating anything",
        paragraphs: ["Before automating a step, we ask three questions:"],
        points: [
          "Is this process repeated often enough to justify the setup cost?",
          "Is it well-defined enough that the same input reliably produces the same correct output?",
          "Does a person still need to make a judgment call partway through?",
        ],
      },
      {
        heading: "Good automation candidates",
        paragraphs: [
          "Lead routing, follow-up sequences, data entry between systems, reminders, and status updates are usually safe to automate — they're repetitive, well-defined, and low-judgment.",
        ],
      },
      {
        heading: "Poor candidates, at least at first",
        paragraphs: [
          "Anything involving negotiation, exception handling, or a process that changes every few weeks is a poor first candidate. Automating it early just means rebuilding the automation every time the process shifts. It's usually better to run it manually until it stabilises, then automate.",
        ],
      },
    ],
  },
  {
    slug: "connected-marketing-system-what-it-actually-means",
    title: "\"Connected marketing system\" is a vague phrase — here's what we actually mean by it",
    excerpt:
      "We use the phrase a lot, so it's worth being concrete about what connects to what, and what breaks when it doesn't.",
    category: "Strategy",
    author: "Vistrow Team",
    date: "2026-02-18",
    readTime: "6 min read",
    metaTitle: "What a Connected Marketing System Actually Means",
    metaDescription:
      "A concrete breakdown of what a connected marketing and automation system means in practice, and what breaks when the pieces aren't connected.",
    sections: [
      {
        paragraphs: [
          "\"Connected system\" can sound like marketing language for nothing in particular. It's worth being specific, because the disconnected version is the default state for most businesses, and it has a real cost.",
        ],
      },
      {
        heading: "The default, disconnected version",
        paragraphs: [
          "Ads run in one platform. Leads land in a spreadsheet or a generic inbox. Follow-up happens manually, inconsistently, by whoever has time. The CRM, if there is one, gets updated days later or not at all. Nobody can say with confidence which campaign produced which closed deal.",
        ],
      },
      {
        heading: "What \"connected\" specifically means",
        paragraphs: ["In practice, we mean these systems share data automatically, in both directions:"],
        points: [
          "Ad platforms and landing pages feed leads directly into the CRM with source data attached",
          "The CRM triggers instant follow-up — AI voice, SMS, or email — the moment a lead is qualified",
          "Deal outcomes flow back to the ad platforms as conversion signals, improving targeting over time",
          "Reporting reads from one shared source instead of reconciling exports from four tools",
        ],
      },
      {
        heading: "What breaks without it",
        paragraphs: [
          "Response time slows down because nothing triggers automatically. Attribution breaks because the systems don't share data. And the ad platforms themselves get worse at targeting, because they never learn which leads actually became revenue. A connected system fixes all three by removing the manual handoffs between them.",
        ],
      },
    ],
  },
];
