import type { LegalContent } from "@/lib/content-types";

const updated = "4 August 2026";

export const legalPages: Record<string, LegalContent> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated,
    intro:
      "This Privacy Policy explains how Vistrow Technologies collects, uses, shares, and protects personal information submitted through this website and our business services.",
    sections: [
      { heading: "Information we collect", body: [
        "We collect information you provide directly, such as your name, work email, phone number, company, website, service interest, budget range, and message when you submit a form, request a Growth Audit, use the site chat, or contact us.",
        "We may also receive limited technical information needed to operate and secure the site, including device and browser details, approximate location derived from an IP address, pages visited, referral source, and diagnostic events.",
      ]},
      { heading: "How and why we use information", body: [
        "We use information to respond to enquiries, assess Growth Audit requests, deliver and improve services, maintain business records, prevent abuse, understand site performance, and meet legal obligations.",
        "We process information for the stated purpose, with consent where required, or where it is reasonably necessary to respond to a request, operate the site, protect the service, or comply with law. We do not sell personal information.",
      ]},
      { heading: "Cookies and analytics", body: [
        "Essential browser storage remembers choices such as theme and accent colour. We use Google Analytics to understand how visitors use this website, which sets its own analytics cookies.",
        "You can block or clear cookies through your browser settings at any time. See the Cookie Policy for more detail.",
      ]},
      { heading: "Service providers and international processing", body: [
        "We use trusted providers for hosting, email delivery, analytics, content management, CRM, AI-assisted chat, and communication workflows. They receive only the information reasonably needed to provide the relevant service and are expected to protect it.",
        "Some providers may process information outside your country. Where that happens, we use reasonable contractual and technical safeguards appropriate to the service and applicable law.",
      ]},
      { heading: "Retention and security", body: [
        "We retain enquiry and client information only for as long as it is useful for responding, maintaining the business relationship, resolving disputes, and meeting legal or accounting obligations. Information that is no longer required is deleted or anonymised where reasonably practicable.",
        "We apply reasonable technical and organisational safeguards. No online service can promise absolute security, so please do not submit sensitive personal, financial, medical, or authentication information through general website forms or chat.",
      ]},
      { heading: "Your choices and rights", body: [
        "Depending on applicable law, you may ask for access to personal information, correction of inaccurate information, deletion, withdrawal of consent, or information about how a request has been handled.",
        "To make a request or raise a grievance, email hello@vistrow.com. We may need to verify your identity before acting on a request.",
      ]},
      { heading: "Children", body: [
        "This website and our business services are not directed to children. Please do not submit a child's personal information through our forms or chat.",
      ]},
      { heading: "Contact", body: [
        "Vistrow Technologies is the contact responsible for information submitted through this website. Privacy questions and requests can be sent to hello@vistrow.com or through our Contact page.",
      ]},
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    updated,
    intro:
      "These Terms & Conditions govern use of the Vistrow Technologies website. Client services and product subscriptions are governed by the written agreement that covers them.",
    sections: [
      { heading: "Use of the site", body: [
        "You agree to use the site lawfully and not to misuse it, interfere with its operation, introduce malicious code, scrape it in a way that disrupts the service, or attempt unauthorised access to systems or information.",
      ]},
      { heading: "Website information", body: [
        "Site content is provided for general information and may change. We aim to keep it useful and accurate, but it should not be treated as a substitute for advice based on your specific circumstances.",
      ]},
      { heading: "Services, proposals, and results", body: [
        "Submitting a contact or Growth Audit form does not create a client relationship or require either party to proceed. Work begins only after scope, commercials, responsibilities, and relevant data terms are agreed in writing.",
        "Service descriptions are general. Specific deliverables, timelines, fees, dependencies, and acceptance criteria are defined in a proposal, statement of work, subscription, or other written agreement.",
        "We do not guarantee a particular marketing, revenue, or automation result. Outcomes depend on factors including market, offer, budget, data quality, third-party platforms, and execution.",
      ]},
      { heading: "Intellectual property", body: [
        "The content, branding, product names, code, and design of this site are owned by Vistrow Technologies or its licensors and may not be copied, republished, or commercially reused without permission, except where law permits.",
      ]},
      { heading: "Third-party services", body: [
        "The site may link to or integrate with third-party services. Their availability, terms, privacy practices, and content are controlled by those providers.",
      ]},
      { heading: "Limitation of liability", body: [
        "To the extent permitted by law, Vistrow Technologies is not liable for indirect, incidental, special, or consequential loss arising solely from use of this public website or reliance on its general information.",
      ]},
      { heading: "Priority of signed agreements", body: [
        "A signed proposal, statement of work, product subscription, data-processing agreement, or other written contract takes priority over these website terms for the services it covers.",
      ]},
      { heading: "Changes and contact", body: [
        "We may update these terms by publishing a revised date on this page. Questions can be sent to hello@vistrow.com or through our Contact page.",
      ]},
    ],
  },

  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    updated,
    intro:
      "This Cookie Policy explains the browser storage and analytics used on the Vistrow Technologies website.",
    sections: [
      { heading: "What cookies and browser storage are", body: [
        "Cookies and local browser storage are small pieces of data saved on your device. They can remember preferences, support security, and help a website understand how it is used.",
      ]},
      { heading: "Essential preferences", body: [
        "The site stores choices such as light or dark theme and accent colour. These choices are used to provide the experience you requested and are not used for advertising.",
      ]},
      { heading: "Analytics", body: [
        "We use Google Analytics to understand how visitors use this website - usage events and limited device, browser, referral, and approximate location information. We configure IP anonymisation where supported.",
        "We do not currently use advertising cookies on this website.",
      ]},
      { heading: "Managing cookies", body: [
        "You can block or delete cookies at any time through your browser settings, or use a browser extension that blocks analytics scripts. Blocking cookies does not prevent use of the website.",
      ]},
      { heading: "Contact", body: [
        "Questions about cookies or analytics can be sent to hello@vistrow.com or through our Contact page.",
      ]},
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    updated,
    intro:
      "Information on this website is provided for general business and educational purposes.",
    sections: [
      { heading: "No guaranteed outcomes", body: [
        "Vistrow Technologies does not guarantee a specific marketing, sales, automation, or financial result. Outcomes depend on the market, offer, budget, data, third-party platforms, implementation, and other factors outside a single provider's control.",
        "Figures presented as product capabilities, targets, examples, or illustrative interface data are not client-performance claims. Verified client outcomes will be identified with appropriate context and permission.",
      ]},
      { heading: "Not professional advice", body: [
        "Content on this site does not constitute legal, financial, tax, employment, security, or other regulated professional advice. Obtain qualified advice for decisions that require it.",
      ]},
      { heading: "AI and automation", body: [
        "AI-generated or automated outputs can be incomplete or incorrect and should be reviewed before they are used for material business decisions or customer communication.",
      ]},
      { heading: "External links and platforms", body: [
        "Our site may link to third-party websites and products. We are not responsible for their content, availability, or practices. Platform features and policies can change independently of Vistrow.",
      ]},
      { heading: "Contact", body: [
        "Questions about this disclaimer can be sent to hello@vistrow.com or through our Contact page.",
      ]},
    ],
  },
};
