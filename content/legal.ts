import type { LegalContent } from "@/lib/content-types";

const updated = "20 July 2026";

export const legalPages: Record<string, LegalContent> = {
  "privacy-policy": {
    slug: "privacy-policy",
    title: "Privacy Policy",
    updated,
    intro:
      "This Privacy Policy explains how Vistrow Technologies collects, uses, and protects the personal information you provide when you use our website and services.",
    sections: [
      { heading: "Information we collect", body: [
        "We collect information you provide directly - such as your name, work email, phone number, company, and message - when you submit a form, request a Growth Audit, or contact us.",
        "We also collect limited technical information automatically, such as device and browser details and pages visited, to operate and improve the site.",
      ]},
      { heading: "How we use your information", body: [
        "We use your information to respond to enquiries, deliver and improve our services, communicate with you about your request, and meet legal obligations.",
        "We do not sell your personal information.",
      ]},
      { heading: "Cookies and tracking", body: [
        "We use cookies and similar technologies to run the site and understand usage. You can control cookies through your browser and our cookie settings. See our Cookie Policy for detail.",
      ]},
      { heading: "Data sharing", body: [
        "We may share information with trusted service providers who help us operate our business (for example, CRM, analytics, and communication tools), under agreements that require them to protect your data.",
      ]},
      { heading: "Data retention and security", body: [
        "We keep personal information only as long as necessary for the purposes described here, and apply reasonable technical and organisational measures to protect it.",
      ]},
      { heading: "Your rights", body: [
        "Depending on your location, you may have rights to access, correct, delete, or restrict the use of your personal information. To exercise these rights, contact us using the details below.",
      ]},
      { heading: "Contact", body: [
        "For any privacy questions or requests, contact Vistrow Technologies via our Contact page.",
      ]},
    ],
  },

  terms: {
    slug: "terms",
    title: "Terms & Conditions",
    updated,
    intro:
      "These Terms & Conditions govern your use of the Vistrow Technologies website and services. By using our site, you agree to these terms.",
    sections: [
      { heading: "Use of the site", body: [
        "You agree to use the site lawfully and not to misuse it, interfere with its operation, or attempt unauthorised access to any systems.",
      ]},
      { heading: "Services", body: [
        "Descriptions of services on this site are for general information. Specific deliverables, timelines, and fees are defined in a separate written agreement.",
        "We do not make guarantees of specific results. Any figures shown on this site are illustrative unless explicitly stated as verified client results.",
      ]},
      { heading: "Intellectual property", body: [
        "The content, branding, and design of this site are owned by Vistrow Technologies or its licensors and may not be copied or reused without permission.",
      ]},
      { heading: "Limitation of liability", body: [
        "To the extent permitted by law, Vistrow Technologies is not liable for indirect or consequential losses arising from use of this site.",
      ]},
      { heading: "Changes", body: [
        "We may update these terms from time to time. Continued use of the site after changes constitutes acceptance of the updated terms.",
      ]},
      { heading: "Contact", body: [
        "Questions about these terms can be directed to Vistrow Technologies via our Contact page.",
      ]},
    ],
  },

  "cookie-policy": {
    slug: "cookie-policy",
    title: "Cookie Policy",
    updated,
    intro:
      "This Cookie Policy explains how Vistrow Technologies uses cookies and similar technologies on our website.",
    sections: [
      { heading: "What are cookies", body: [
        "Cookies are small text files stored on your device that help websites function and understand how they are used.",
      ]},
      { heading: "Types of cookies we use", body: [
        "Essential cookies are required for the site to work. Analytics cookies help us understand usage so we can improve the site. Marketing cookies, where used, help measure and improve campaigns.",
      ]},
      { heading: "Managing cookies", body: [
        "You can control non-essential cookies through our cookie settings and your browser preferences. Disabling some cookies may affect site functionality.",
      ]},
      { heading: "Contact", body: [
        "For questions about our use of cookies, contact Vistrow Technologies via our Contact page.",
      ]},
    ],
  },

  disclaimer: {
    slug: "disclaimer",
    title: "Disclaimer",
    updated,
    intro:
      "The information on this website is provided for general informational purposes only.",
    sections: [
      { heading: "No guarantees", body: [
        "Vistrow Technologies does not guarantee specific business results. Marketing and automation outcomes depend on many factors, including market, offer, budget, and execution.",
        "Any statistics or results shown are illustrative unless explicitly identified as verified client results.",
      ]},
      { heading: "Not professional advice", body: [
        "Content on this site does not constitute legal, financial, or professional advice. You should seek qualified advice for your specific circumstances.",
      ]},
      { heading: "External links", body: [
        "Our site may link to third-party websites. We are not responsible for the content or practices of those sites.",
      ]},
      { heading: "Contact", body: [
        "For questions about this disclaimer, contact Vistrow Technologies via our Contact page.",
      ]},
    ],
  },
};
