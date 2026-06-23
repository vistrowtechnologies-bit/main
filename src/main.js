import {
  Activity,
  ArrowRight,
  AudioLines,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  Check,
  ChevronDown,
  CircleDollarSign,
  DatabaseZap,
  Factory,
  Gauge,
  Layers3,
  LineChart,
  Mail,
  Menu,
  MessageSquareText,
  Network,
  PanelRight,
  Phone,
  Rocket,
  Route,
  ShieldCheck,
  Sparkles,
  Sun,
  Moon,
  Target,
  Users,
  Workflow,
  X
} from 'lucide';
import './styles.css';

const iconMap = {
  Activity,
  AudioLines,
  BarChart3,
  Bot,
  BrainCircuit,
  Building2,
  CircleDollarSign,
  DatabaseZap,
  Factory,
  Gauge,
  Layers3,
  LineChart,
  Mail,
  MessageSquareText,
  Network,
  PanelRight,
  Phone,
  Rocket,
  Route,
  ShieldCheck,
  Sparkles,
  Target,
  Users,
  Workflow
};

const ecosystem = [
  {
    title: 'Vistrow Growth',
    icon: 'Target',
    text: 'Performance marketing, funnels, landing pages, lead generation, and reporting systems.',
    signal: 'Attract qualified demand',
    stat: '+28% lead capture'
  },
  {
    title: 'Vistrow Labs',
    icon: 'Layers3',
    text: 'SaaS products, dashboards, MVPs, custom platforms, and product-led business tools.',
    signal: 'Build scalable tools',
    stat: 'MVP to platform'
  },
  {
    title: 'Vistrow Voice',
    icon: 'AudioLines',
    text: 'AI voice calling agents for qualification, follow-ups, appointment booking, and customer engagement.',
    signal: 'Respond faster',
    stat: '94 qualified calls'
  },
  {
    title: 'ArthaLeads CRM',
    icon: 'DatabaseZap',
    text: 'Real estate CRM for brokers, developers, and sales teams to manage leads and pipelines.',
    signal: 'Structure every lead',
    stat: '₹82L pipeline'
  },
  {
    title: 'Vistrow Flow',
    icon: 'Workflow',
    text: 'Automation workflows that connect tools, reduce manual work, and improve response speed.',
    signal: 'Remove manual drag',
    stat: '6 automations live'
  }
];

const services = [
  {
    slug: 'digital-marketing',
    title: 'Digital Marketing & Performance Ads',
    icon: 'LineChart',
    summary:
      'Campaign strategy, Meta and Google ads, landing pages, funnels, retargeting, tracking, and reporting.',
    headline: 'Performance marketing connected to real business growth.',
    cta: 'Plan My Growth Campaign',
    includes: [
      'Meta Ads',
      'Google Ads',
      'Landing pages',
      'Lead generation funnels',
      'Retargeting campaigns',
      'Creative strategy',
      'Campaign tracking',
      'Conversion reporting',
      'Lead quality analysis',
      'CRM-connected marketing'
    ]
  },
  {
    slug: 'saas-product-development',
    title: 'SaaS Product Development',
    icon: 'Layers3',
    summary: 'Custom SaaS applications, MVPs, dashboards, internal tools, and platform development.',
    headline: 'Build SaaS products and business tools that scale.',
    cta: 'Build With Vistrow Labs',
    includes: [
      'SaaS MVP development',
      'Dashboard design',
      'Admin panels',
      'CRM products',
      'Automation tools',
      'Customer portals',
      'API integrations',
      'Product UI/UX',
      'Web app development'
    ]
  },
  {
    slug: 'ai-voice-calling',
    title: 'AI Voice Calling Agents',
    icon: 'AudioLines',
    summary:
      'AI agents for outbound calling, inbound follow-ups, qualification, appointments, and communication.',
    headline: 'AI calling agents that follow up faster than manual teams.',
    cta: 'Explore Vistrow Voice',
    includes: [
      'Lead qualification',
      'Missed call follow-ups',
      'Appointment booking',
      'Customer reminders',
      'Site visit confirmations',
      'Inquiry response',
      'Re-engagement campaigns'
    ]
  },
  {
    slug: 'crm-lead-management',
    title: 'CRM & Lead Management',
    icon: 'DatabaseZap',
    summary: 'CRM setup, pipeline design, lead assignment, follow-up tracking, dashboards, and reporting.',
    headline: 'Turn scattered leads into a structured sales pipeline.',
    cta: 'Build My CRM System',
    includes: [
      'Lead source tracking',
      'Pipeline stages',
      'Follow-up reminders',
      'Team assignment',
      'Lead scoring',
      'Sales activity tracking',
      'Reporting dashboards',
      'Automation triggers'
    ]
  },
  {
    slug: 'automation-workflows',
    title: 'Automation & Growth Workflows',
    icon: 'Workflow',
    summary:
      'Workflow automation for lead routing, reminders, follow-ups, customer journeys, and integrations.',
    headline: 'Automate the work that slows your growth.',
    cta: 'Automate My Workflow',
    includes: [
      'Lead routing',
      'Follow-up reminders',
      'Email sequences',
      'WhatsApp/SMS alerts',
      'CRM updates',
      'Task assignment',
      'Form-to-CRM workflows',
      'Customer reactivation flows',
      'Reporting automation'
    ]
  },
  {
    slug: 'analytics-reporting',
    title: 'Analytics & Reporting',
    icon: 'BarChart3',
    summary:
      'Growth dashboards, campaign reports, conversion tracking, CRM insights, and business intelligence.',
    headline: 'See the full growth picture from campaign to conversion.',
    cta: 'Build My Dashboard',
    includes: [
      'Campaign performance dashboards',
      'Lead quality tracking',
      'CRM conversion reporting',
      'Source-level analytics',
      'Sales activity insights',
      'Growth recommendations'
    ]
  }
];

const products = [
  {
    title: 'ArthaLeads CRM',
    icon: 'DatabaseZap',
    status: 'Real estate CRM',
    text: 'CRM for brokers, developers, and property sales teams to manage leads, follow-ups, and pipelines.'
  },
  {
    title: 'Vistrow Voice',
    icon: 'AudioLines',
    status: 'AI communication',
    text: 'AI voice calling system for automated lead follow-up, qualification, and customer engagement.'
  },
  {
    title: 'Vistrow Flow',
    icon: 'Workflow',
    status: 'Automation workflows',
    text: 'Workflow engine for marketing, CRM, reminders, lead routing, and business operations.'
  },
  {
    title: 'Vistrow Labs',
    icon: 'Layers3',
    status: 'Product studio',
    text: 'SaaS products and custom business technology solutions built with product-led thinking.'
  }
];

const industries = [
  {
    title: 'Real Estate',
    icon: 'Building2',
    text: 'Lead generation, CRM, AI calling, site visit follow-ups, and sales pipeline management.'
  },
  {
    title: 'Local Businesses',
    icon: 'Factory',
    text: 'Campaigns, inquiry management, automation, and customer communication systems.'
  },
  {
    title: 'Sales Teams',
    icon: 'Users',
    text: 'Lead tracking, follow-up reminders, calling systems, and reporting dashboards.'
  },
  {
    title: 'Agencies',
    icon: 'PanelRight',
    text: 'Automation workflows, client dashboards, SaaS support, and white-label growth systems.'
  },
  {
    title: 'Startups',
    icon: 'Rocket',
    text: 'MVP development, SaaS dashboards, growth funnels, and go-to-market systems.'
  }
];

const nav = [
  { label: 'Home', path: '#/' },
  {
    label: 'Solutions',
    path: '#/solutions',
    children: [
      ['Growth Systems', 'Complete marketing, CRM, automation, and AI setup for business growth.', '#/solutions/growth-systems'],
      ['Lead Generation System', 'Campaigns, landing pages, tracking, CRM, and follow-up automation.', '#/solutions/lead-generation-system'],
      ['Sales Automation System', 'Automated workflows that help teams follow up faster and close more deals.', '#/solutions/sales-automation-system'],
      ['AI Customer Communication', 'AI voice calling and automated customer engagement systems.', '#/solutions/ai-customer-communication'],
      ['CRM & Pipeline Management', 'Lead tracking, pipeline visibility, team views, and performance insights.', '#/solutions/crm-pipeline-management'],
      ['Digital Transformation for SMBs', 'Modern systems for businesses moving from manual operations to automated growth.', '#/solutions/digital-transformation-smbs']
    ]
  },
  {
    label: 'Services',
    path: '#/services',
    children: services.map((service) => [service.title, service.summary, `#/services/${service.slug}`])
  },
  {
    label: 'Products',
    path: '#/products',
    children: products.map((product) => [product.title, product.text, `#/products/${slugify(product.title)}`])
  },
  {
    label: 'Industries',
    path: '#/industries',
    children: industries.map((industry) => [industry.title, industry.text, `#/industries/${slugify(industry.title)}`])
  },
  {
    label: 'Resources',
    path: '#/resources',
    children: [
      ['Blog', 'Insights on growth systems, CRM, automation, AI, and digital marketing.', '#/resources/blog'],
      ['Case Studies', 'Real examples of systems, campaigns, and growth outcomes.', '#/resources/case-studies'],
      ['Guides', 'Practical guides for CRM, lead generation, AI calling, and automation.', '#/resources/guides'],
      ['Growth Audit Checklist', 'Identify gaps in marketing, CRM, and follow-up systems.', '#/resources/growth-audit-checklist'],
      ['FAQs', 'Common questions about Vistrow services, products, and implementation.', '#/resources/faqs']
    ]
  },
  {
    label: 'Company',
    path: '#/about',
    children: [
      ['About Vistrow', 'Our story, mission, and approach to building growth systems.', '#/about'],
      ['Our Ecosystem', 'Vistrow Growth, Labs, Voice, Flow, and ArthaLeads CRM.', '#/company/ecosystem'],
      ['Careers', 'Join the team building modern growth systems.', '#/company/careers'],
      ['Contact', 'Talk to Vistrow about your business growth system.', '#/contact']
    ]
  },
  { label: 'Contact', path: '#/contact' }
];

const process = ['Attract', 'Capture', 'Qualify', 'Manage', 'Automate', 'Convert', 'Scale'];

const dashboardStages = [
  {
    stage: 'Attract',
    label: 'Campaign sync',
    metric: '1,284',
    assist: '+28% captured',
    workflow: 'Ad click to landing page to tracked lead source'
  },
  {
    stage: 'Capture',
    label: 'Lead intake',
    metric: '418',
    assist: '32% form rate',
    workflow: 'Landing page form to CRM contact to source tagging'
  },
  {
    stage: 'Qualify',
    label: 'AI call activity',
    metric: '342',
    assist: '94 qualified',
    workflow: 'AI call to qualification note to priority score'
  },
  {
    stage: 'Manage',
    label: 'Pipeline value',
    metric: '₹82L',
    assist: '+17% active',
    workflow: 'CRM stage update to sales task to manager view'
  },
  {
    stage: 'Automate',
    label: 'Workflow status',
    metric: '6',
    assist: 'live flows',
    workflow: 'Reminder to WhatsApp/SMS alert to follow-up task'
  },
  {
    stage: 'Convert',
    label: 'Close signals',
    metric: '71',
    assist: 'hot leads',
    workflow: 'Proposal trigger to nurture sequence to closing dashboard'
  },
  {
    stage: 'Scale',
    label: 'Growth loop',
    metric: '3.4x',
    assist: 'ROI signal',
    workflow: 'Insights to budget shift to campaign improvement'
  }
];

const solutions = [
  ['Growth Systems', 'Complete marketing, CRM, automation, and AI setup for business growth.'],
  ['Lead Generation System', 'Campaigns, landing pages, tracking, CRM, and follow-up automation.'],
  ['Sales Automation System', 'Automated workflows that help teams follow up faster and close more deals.'],
  ['AI Customer Communication', 'AI voice calling and automated customer engagement systems.'],
  ['CRM & Pipeline Management', 'Organized lead tracking, sales pipeline, team visibility, and performance insights.'],
  ['Digital Transformation for SMBs', 'Modern systems for businesses moving from manual operations to automated growth.']
];

const resources = [
  ['Blog', 'Insights on growth systems, CRM, automation, AI, and digital marketing.'],
  ['Case Studies', 'Real examples of systems, campaigns, and growth outcomes.'],
  ['Guides', 'Practical guides for CRM, lead generation, AI calling, and automation.'],
  ['Growth Audit Checklist', 'A checklist to identify gaps in marketing, CRM, and follow-up systems.'],
  ['FAQs', 'Common questions about Vistrow services, products, and implementation.']
];

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function solutionSlug(title) {
  return {
    'CRM & Pipeline Management': 'crm-pipeline-management',
    'Digital Transformation for SMBs': 'digital-transformation-smbs'
  }[title] || slugify(title);
}

function icon(name, size = 22) {
  const Icon = iconMap[name] || Sparkles;
  return renderSvg(Icon, size);
}

function renderSvg(definition, size = 22) {
  const [, attrs, children] = definition;
  const attrText = {
    ...attrs,
    width: size,
    height: size,
    'aria-hidden': 'true',
    focusable: 'false'
  };
  const attrsMarkup = Object.entries(attrText)
    .map(([key, value]) => `${key}="${String(value)}"`)
    .join(' ');
  const childMarkup = children
    .map(([tag, childAttrs]) => {
      const childAttrText = Object.entries(childAttrs)
        .map(([key, value]) => `${key}="${String(value)}"`)
        .join(' ');
      return `<${tag} ${childAttrText}></${tag}>`;
    })
    .join('');
  return `<svg ${attrsMarkup}>${childMarkup}</svg>`;
}

function setMeta(title, description) {
  document.title = title;
  document.querySelector('meta[name="description"]').setAttribute('content', description);
}

function shell(content) {
  return `
    <header class="site-header">
      <a class="brand" href="#/" aria-label="Vistrow home">
        <span class="brand-mark"><span></span></span>
        <span><strong class="wordmark">Vistrow</strong><small>AI, SaaS & Growth Systems</small></span>
      </a>
      <button class="nav-toggle" aria-label="Open navigation">${renderSvg(Menu, 22)}</button>
      <nav class="nav">
        ${nav.map((item) => navItem(item)).join('')}
        <button class="theme-toggle nav-theme-toggle theme-switcher" aria-label="Toggle theme" type="button">
          <span class="sun-icon">${renderSvg(Sun, 20)}</span>
          <span class="moon-icon">${renderSvg(Moon, 20)}</span>
          <span class="theme-label">Theme</span>
        </button>
      </nav>
      <button class="theme-toggle header-theme-toggle theme-switcher" aria-label="Toggle theme" type="button">
        <span class="sun-icon">${renderSvg(Sun, 20)}</span>
        <span class="moon-icon">${renderSvg(Moon, 20)}</span>
      </button>
      <a class="header-cta" href="#/audit">Book a Growth Audit</a>
    </header>
    <main>${content}</main>
    ${footer()}
  `;
}

function navItem(item) {
  if (!item.children) {
    return `<a class="nav-link" href="${item.path}">${item.label}</a>`;
  }

  return `
    <div class="nav-item">
      <button class="nav-trigger" type="button" aria-expanded="false">
        <span>${item.label}</span>
        ${renderSvg(ChevronDown, 15)}
      </button>
      <div class="submenu" aria-label="${item.label} submenu">
        <a class="submenu-overview" href="${item.path}">
          <strong>${item.label} Overview</strong>
          <span>View the complete ${item.label.toLowerCase()} section</span>
        </a>
        <div class="submenu-grid">
          ${item.children.map(([title, text, path]) => `
            <a class="submenu-link" href="${path}">
              <strong>${title}</strong>
              <span>${text}</span>
            </a>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function heroDashboard() {
  return `
    <div class="dashboard-visual" aria-label="Growth system dashboard preview">
      <div class="dash-top">
        <div>
          <span class="tiny-label">Growth OS</span>
          <strong>Lead-to-revenue command center</strong>
        </div>
        <span class="live-dot">Live</span>
      </div>
      <div class="metric-grid">
        <div class="metric is-primary"><small data-dashboard-label>Campaign sync</small><strong data-dashboard-metric>1,284</strong><span class="up" data-dashboard-assist>+28% captured</span></div>
        <div class="metric"><small>AI call activity</small><strong>342</strong><span class="blue">94 qualified</span></div>
        <div class="metric"><small>Pipeline value</small><strong>₹82L</strong><span class="up">+17%</span></div>
      </div>
      <div class="pipeline">
        ${dashboardStages.map((item, i) => `
          <button class="pipeline-stage ${i === 0 ? 'active' : ''}" type="button" data-stage-index="${i}">
            <span style="height:${42 + i * 8}px"></span><small>${item.stage}</small>
          </button>
        `).join('')}
      </div>
      <div class="workflow-card">
        <span>${icon('Workflow', 18)}</span>
        <p><strong data-dashboard-stage>Attract system active</strong><small data-dashboard-workflow>Ad click to landing page to tracked lead source</small></p>
        <b>6 steps</b>
      </div>
      <div class="call-list">
        <div><span></span>Hot lead follow-up completed <b>2m ago</b></div>
        <div><span></span>Site visit reminder scheduled <b>18m ago</b></div>
        <div><span></span>Campaign source synced to CRM <b>32m ago</b></div>
      </div>
    </div>
  `;
}

function home() {
  setMeta(
    'Vistrow Technologies | AI, SaaS & Growth Systems',
    'Vistrow builds intelligent growth systems through digital marketing, CRM, AI calling, SaaS products, automation workflows, and analytics for modern businesses.'
  );
  return shell(`
    <section class="hero section-pad">
      <div class="hero-copy">
        <p class="eyebrow">AI • SaaS • CRM • Automation • Growth Systems</p>
        <h1>Build your business growth system with Vistrow.</h1>
        <p class="lede">Vistrow connects digital marketing, CRM, AI calling, SaaS products, and automation workflows into one intelligent system that helps businesses capture, manage, and convert more opportunities.</p>
        <div class="cta-row">
          <a class="btn primary" href="#/audit">Book a Growth Audit ${renderSvg(ArrowRight, 18)}</a>
          <a class="btn secondary" href="#/products">Explore Ecosystem</a>
        </div>
        <p class="trust">Built for modern businesses that want more than marketing. They want a complete growth system.</p>
      </div>
      ${heroDashboard()}
    </section>
    <section class="problem band">
      <div class="section-head">
        <p class="eyebrow">The Problem</p>
        <h2>Marketing alone is not enough anymore.</h2>
        <p>Most businesses generate leads but lose opportunities because their systems are disconnected. Ads run separately, CRM is not updated, follow-ups are missed, and reports do not show the full picture.</p>
      </div>
      <div class="point-grid">
        ${['Leads come from many channels', 'Follow-ups happen manually', 'Sales teams lose track of conversations', 'Campaign performance is not connected to revenue', 'Marketing spend leaks without a conversion system'].map((point) => `<div class="point">${renderSvg(Check, 18)}<span>${point}</span></div>`).join('')}
      </div>
    </section>
    ${ecosystemSection()}
    ${servicesSection()}
    ${processSection()}
    ${productsSection()}
    ${industriesSection()}
    ${auditCta()}
  `);
}

function ecosystemSection() {
  return `
    <section class="section-pad">
      <div class="section-head split">
        <div>
          <p class="eyebrow">The Vistrow Ecosystem</p>
          <h2>One ecosystem. Every growth function connected.</h2>
        </div>
        <p>Vistrow brings marketing, SaaS, AI calling, CRM, and automation into one structured growth system.</p>
      </div>
      <div class="ecosystem-map">
        ${ecosystem.map((item, index) => `
          <button class="eco-card ${index === 2 ? 'featured' : ''} ${index === 0 ? 'active' : ''}" type="button" data-ecosystem-index="${index}">
            <span class="icon-badge">${icon(item.icon)}</span>
            <h3>${item.title}</h3>
            <p>${item.text}</p>
          </button>
        `).join('')}
      </div>
      <div class="ecosystem-detail" aria-live="polite">
        <span class="icon-badge" data-eco-icon>${icon(ecosystem[0].icon)}</span>
        <div>
          <p class="eyebrow">Selected System</p>
          <h3 data-eco-title>${ecosystem[0].title}</h3>
          <p data-eco-text>${ecosystem[0].text}</p>
        </div>
        <div class="detail-stat">
          <small data-eco-signal>${ecosystem[0].signal}</small>
          <strong data-eco-stat>${ecosystem[0].stat}</strong>
        </div>
      </div>
    </section>
  `;
}

function servicesSection() {
  return `
    <section class="section-pad services-band">
      <div class="section-head split">
        <div>
          <p class="eyebrow">What We Do</p>
          <h2>Growth systems built for every stage of your business.</h2>
        </div>
        <a class="text-link" href="#/services">View all services ${renderSvg(ArrowRight, 17)}</a>
      </div>
      <div class="service-grid">
        ${services.map((service) => `
          <a class="service-card" href="#/services/${service.slug}">
            <span class="icon-badge">${icon(service.icon)}</span>
            <h3>${service.title}</h3>
            <p>${service.summary}</p>
          </a>
        `).join('')}
      </div>
    </section>
  `;
}

function processSection() {
  return `
    <section class="section-pad process-section">
      <div class="section-head">
        <p class="eyebrow">Growth Process</p>
        <h2>From attention to revenue, one connected system.</h2>
      </div>
      <div class="process-line">
        ${process.map((step, index) => `
          <button class="process-step ${index === 0 ? 'active' : ''}" type="button" data-process-index="${index}">
            <span>${index + 1}</span>
            <strong>${step}</strong>
            <p>${processCopy(step)}</p>
          </button>
        `).join('')}
      </div>
      <div class="process-detail" aria-live="polite">
        <strong data-process-title>Attract</strong>
        <p data-process-copy>${processCopy('Attract')}</p>
      </div>
    </section>
  `;
}

function processCopy(step) {
  return {
    Attract: 'Campaigns and content bring the right audience to your business.',
    Capture: 'Landing pages, forms, magnets, and tracking convert visitors into leads.',
    Qualify: 'CRM, AI calling, and automation identify serious prospects faster.',
    Manage: 'Every lead, conversation, follow-up, and opportunity stays visible.',
    Automate: 'Workflows reduce manual work and improve response speed.',
    Convert: 'Insights and pipeline visibility help teams close more deals.',
    Scale: 'Systems improve based on campaign, CRM, and conversion data.'
  }[step];
}

function productsSection() {
  return `
    <section class="section-pad">
      <div class="section-head split">
        <div>
          <p class="eyebrow">Products</p>
          <h2>Products built from real business problems.</h2>
        </div>
        <p>SaaS and AI products that help businesses manage leads, automate communication, and scale operations.</p>
      </div>
      <div class="product-grid">
        ${products.map((product) => `
          <article class="product-card">
            <div>
              <span class="icon-badge">${icon(product.icon)}</span>
              <small>${product.status}</small>
            </div>
            <h3>${product.title}</h3>
            <p>${product.text}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function industriesSection() {
  return `
    <section class="section-pad industries-band">
      <div class="section-head">
        <p class="eyebrow">Industries</p>
        <h2>Built for businesses that depend on leads, conversations, and follow-ups.</h2>
      </div>
      <div class="industry-grid">
        ${industries.map((industry) => `
          <article class="industry-card">
            <span>${icon(industry.icon)}</span>
            <h3>${industry.title}</h3>
            <p>${industry.text}</p>
          </article>
        `).join('')}
      </div>
    </section>
  `;
}

function auditCta() {
  return `
    <section class="audit-cta">
      <div>
        <p class="eyebrow">Free Growth Audit</p>
        <h2>Find the gaps in your growth system.</h2>
        <p>Book a Vistrow Growth Audit and get a clear view of what is working, what is leaking, and what needs to be automated.</p>
      </div>
      <a class="btn primary" href="#/audit">Book a Free Growth Audit ${renderSvg(ArrowRight, 18)}</a>
    </section>
  `;
}

function servicesPage(slug) {
  const selected = services.find((service) => service.slug === slug);
  if (selected) {
    setMeta(`${selected.title} | Vistrow`, selected.summary);
    return shell(`
      <section class="page-hero">
        <p class="eyebrow">Service</p>
        <h1>${selected.headline}</h1>
        <p>${selected.summary}</p>
        <a class="btn primary" href="#/contact">${selected.cta} ${renderSvg(ArrowRight, 18)}</a>
      </section>
      <section class="section-pad two-col">
        <div>
          <p class="eyebrow">What is included</p>
          <h2>A connected system, not an isolated task.</h2>
          <p>Vistrow ties this service back to CRM, automation, reporting, and conversion workflows so the business outcome stays visible.</p>
        </div>
        <div class="check-grid">
          ${selected.includes.map((item) => `<div class="point">${renderSvg(Check, 18)}<span>${item}</span></div>`).join('')}
        </div>
      </section>
      ${auditCta()}
    `);
  }

  setMeta(
    'Digital Marketing, AI Calling, CRM & SaaS Services | Vistrow',
    'Explore Vistrow services including performance marketing, CRM systems, AI voice calling agents, SaaS product development, automation workflows, and analytics.'
  );
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">Services</p>
      <h1>Services that connect marketing, technology, and growth.</h1>
      <p>Vistrow provides end-to-end services for businesses that want more than campaigns. They want systems that capture leads, automate follow-ups, manage pipelines, and scale revenue.</p>
    </section>
    ${servicesSection()}
    ${processSection()}
    ${auditCta()}
  `);
}

function detailPage({ eyebrow, title, description, points = [], cta = 'Book a Growth Audit' }) {
  setMeta(`${title} | Vistrow`, description);
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">${eyebrow}</p>
      <h1>${title}</h1>
      <p>${description}</p>
      <a class="btn primary" href="#/audit">${cta} ${renderSvg(ArrowRight, 18)}</a>
    </section>
    <section class="section-pad two-col">
      <div>
        <p class="eyebrow">How Vistrow helps</p>
        <h2>A connected growth system for this area.</h2>
        <p>Each Vistrow page connects back to marketing, CRM, AI calling, automation, analytics, and conversion visibility.</p>
      </div>
      <div class="check-grid">
        ${points.map((item) => `<div class="point">${renderSvg(Check, 18)}<span>${item}</span></div>`).join('')}
      </div>
    </section>
    ${auditCta()}
  `);
}

function productsPage(slug) {
  const selected = products.find((product) => slugify(product.title) === slug);
  if (selected) {
    return detailPage({
      eyebrow: 'Product',
      title: selected.title,
      description: selected.text,
      points: [
        selected.status,
        'Lead and customer workflow visibility',
        'Dashboard-first product experience',
        'Built for Vistrow growth systems',
        'Ready to connect with CRM and automation workflows',
        'Designed for scale and measurable outcomes'
      ],
      cta: selected.title === 'ArthaLeads CRM' ? 'Request CRM Demo' : 'Explore Product'
    });
  }

  setMeta('Products Built for Growth Operations | Vistrow', 'Explore Vistrow products including ArthaLeads CRM, Vistrow Voice, Vistrow Flow, and Vistrow Labs.');
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">Products</p>
      <h1>Products built from real business problems.</h1>
      <p>Vistrow creates SaaS and AI products that help businesses manage leads, automate communication, and scale operations.</p>
    </section>
    ${productsSection()}
    ${ecosystemSection()}
  `);
}

function industriesPage(slug) {
  const selected = industries.find((industry) => slugify(industry.title) === slug);
  if (selected) {
    return detailPage({
      eyebrow: 'Industry',
      title: `${selected.title} Solutions`,
      description: selected.text,
      points: [
        'Lead capture and source tracking',
        'CRM pipeline visibility',
        'AI calling and follow-up support',
        'Automation for reminders and task routing',
        'Campaign and conversion reporting',
        'Growth audit roadmap for the industry'
      ],
      cta: 'Plan My Industry System'
    });
  }

  setMeta('Growth Systems for Lead-Driven Industries | Vistrow', 'Vistrow builds CRM, AI calling, automation, and marketing systems for real estate, local businesses, sales teams, agencies, and startups.');
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">Industries</p>
      <h1>Systems for businesses where speed-to-lead matters.</h1>
      <p>From real estate to local service businesses, Vistrow helps teams capture leads, manage conversations, automate follow-ups, and measure conversion.</p>
    </section>
    ${industriesSection()}
    ${auditCta()}
  `);
}

function aboutPage() {
  setMeta('About Vistrow Technologies | Growth Systems Company', 'Vistrow Technologies helps businesses move from scattered marketing to connected growth infrastructure.');
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">About Vistrow</p>
      <h1>We are building the operating system for modern business growth.</h1>
      <p>Vistrow Technologies is an AI, SaaS, CRM, automation, and digital growth systems company helping businesses move from scattered marketing to connected growth infrastructure.</p>
    </section>
    <section class="section-pad two-col">
      <div>
        <p class="eyebrow">Our Story</p>
        <h2>Businesses do not need more disconnected tools.</h2>
      </div>
      <div class="prose">
        <p>Most companies spend on ads, manage leads manually, miss follow-ups, and struggle to understand what is actually driving revenue. Vistrow solves this by connecting marketing, CRM, AI calling, automation, analytics, and SaaS products into one growth ecosystem.</p>
        <div class="mini-grid">
          <article><h3>Mission</h3><p>Help businesses build intelligent systems that attract, manage, automate, and convert opportunities at scale.</p></article>
          <article><h3>Vision</h3><p>Become a trusted technology partner for businesses that want growth powered by systems, intelligence, and automation.</p></article>
        </div>
      </div>
    </section>
    <section class="section-pad">
      <div class="section-head"><p class="eyebrow">What We Believe</p><h2>Growth should be connected, measurable, and easier to manage.</h2></div>
      <div class="point-grid">
        ${['Marketing should be connected to sales', 'CRM should be simple and useful', 'Follow-ups should never be missed', 'AI should improve speed, not remove human trust', 'Automation should make teams stronger', 'Growth should be measurable'].map((item) => `<div class="point">${renderSvg(Check, 18)}<span>${item}</span></div>`).join('')}
      </div>
    </section>
  `);
}

function contactPage(isAudit = false) {
  setMeta(
    isAudit ? 'Book your Vistrow Growth Audit' : 'Contact Vistrow Technologies',
    isAudit ? 'Get a roadmap to improve your marketing, CRM, follow-ups, automation, and conversion system.' : 'Tell Vistrow about your business and the growth system you want to build.'
  );
  return shell(`
    <section class="page-hero contact-hero">
      <p class="eyebrow">${isAudit ? 'Growth Audit' : 'Contact'}</p>
      <h1>${isAudit ? 'Book your Vistrow Growth Audit.' : 'Let’s build your growth system.'}</h1>
      <p>${isAudit ? 'Get a clear roadmap to improve your marketing, CRM, follow-ups, automation, and conversion system.' : 'Tell us about your business, your current challenges, and the systems you want to build. Our team will help you identify the best starting point.'}</p>
    </section>
    <section class="section-pad contact-layout">
      <form class="contact-form">
        <label>Name<input name="name" autocomplete="name" required /></label>
        <label>Company Name<input name="company" autocomplete="organization" /></label>
        <label>Email<input type="email" name="email" autocomplete="email" required /></label>
        <label>Phone Number<input name="phone" autocomplete="tel" /></label>
        <label>Website<input name="website" autocomplete="url" /></label>
        <label>Service Interested In
          <select name="service">
            ${['Digital Marketing', 'CRM Setup', 'AI Voice Calling', 'Automation', 'SaaS Product Development', 'Growth Audit', 'ArthaLeads CRM', 'Other'].map((item) => `<option>${item}</option>`).join('')}
          </select>
        </label>
        <label>Business Type<input name="businessType" /></label>
        <label class="full">Message<textarea name="message" rows="5"></textarea></label>
        <button class="btn primary full" type="submit">${isAudit ? 'Book My Audit' : 'Submit Inquiry'} ${renderSvg(ArrowRight, 18)}</button>
        <p class="form-note" role="status"></p>
      </form>
      <aside class="review-card">
        <p class="eyebrow">Audit Review</p>
        <h2>What we review</h2>
        ${['Current lead sources', 'Landing pages and funnels', 'CRM or lead tracking process', 'Follow-up speed', 'Sales pipeline', 'Automation gaps', 'Reporting and analytics', 'Missed conversion opportunities'].map((item) => `<div class="point">${renderSvg(Check, 18)}<span>${item}</span></div>`).join('')}
      </aside>
    </section>
  `);
}

function companyPage(detail) {
  if (detail === 'ecosystem') {
    return detailPage({
      eyebrow: 'Company',
      title: 'Our Ecosystem',
      description: 'Vistrow Growth, Vistrow Labs, Vistrow Voice, Vistrow Flow, and ArthaLeads CRM work together as one connected business growth ecosystem.',
      points: ecosystem.map((item) => `${item.title}: ${item.text}`),
      cta: 'Explore Ecosystem'
    });
  }

  if (detail === 'careers') {
    return careersPage();
  }

  return aboutPage();
}

function careersPage() {
  const jobs = [
    {
      title: 'Digital Marketing Executive',
      type: 'Full-time',
      location: 'On-site / Hybrid',
      summary: 'Plan, run, and optimize growth campaigns across search, social, landing pages, funnels, and reporting.',
      points: ['Performance marketing execution', 'Campaign tracking and reporting', 'Landing page and funnel coordination', 'CRM and lead quality feedback']
    },
    {
      title: 'Business Development Executive',
      type: 'Full-time',
      location: 'On-site / Hybrid',
      summary: 'Build client relationships, qualify opportunities, manage follow-ups, and help businesses understand Vistrow growth systems.',
      points: ['Lead qualification and outreach', 'Discovery calls and follow-ups', 'Pipeline coordination', 'Proposal and client communication']
    }
  ];

  setMeta('Careers at Vistrow | Join the Growth Systems Team', 'Apply for Digital Marketing Executive and Business Development Executive roles at Vistrow Technologies.');
  return shell(`
    <section class="careers-hero section-pad">
      <div class="careers-copy">
        <p class="eyebrow">Careers</p>
        <h1>Join the team building modern growth systems.</h1>
        <p class="lede">Vistrow is building AI, SaaS, CRM, automation, and growth systems for businesses that want connected revenue infrastructure.</p>
        <div class="cta-row">
          <a class="btn primary" href="#open-roles">View Open Roles ${renderSvg(ArrowRight, 18)}</a>
          <a class="btn secondary" href="#/contact">Contact Vistrow</a>
        </div>
      </div>
      <div class="lanyard-stage" aria-label="Animated Vistrow careers lanyard">
        <div class="lanyard-react-root" data-lanyard-root></div>
        <div class="lanyard-shadow"></div>
      </div>
    </section>
    <section class="section-pad careers-intro">
      <div class="section-head split">
        <div>
          <p class="eyebrow">Why Vistrow</p>
          <h2>Work on real business conversion systems.</h2>
        </div>
        <p>Our team connects marketing, CRM, AI communication, automation, and analytics into practical systems that improve how businesses capture and convert opportunities.</p>
      </div>
      <div class="point-grid">
        ${[
          'AI, SaaS, CRM, and automation projects',
          'Performance marketing and analytics challenges',
          'Collaborative engineering and growth culture',
          'Product-led growth systems work',
          'Build tools used by lead-driven teams',
          'Work close to real business outcomes'
        ].map((point) => `<div class="point">${renderSvg(Check, 18)}<span>${point}</span></div>`).join('')}
      </div>
    </section>
    <section class="section-pad open-roles" id="open-roles">
      <div class="section-head split">
        <div>
          <p class="eyebrow">Open Roles</p>
          <h2>Two roles we are hiring for now.</h2>
        </div>
        <p>Send your profile with the role name. We will review fit against current client projects, growth systems work, and team needs.</p>
      </div>
      <div class="career-job-grid">
        ${jobs.map((job) => `
          <article class="career-job">
            <div class="job-topline">
              <span class="icon-badge">${icon(job.title.includes('Digital') ? 'LineChart' : 'Users')}</span>
              <div>
                <small>${job.type}</small>
                <small>${job.location}</small>
              </div>
            </div>
            <h3>${job.title}</h3>
            <p>${job.summary}</p>
            <div class="job-points">
              ${job.points.map((point) => `<span>${renderSvg(Check, 15)}${point}</span>`).join('')}
            </div>
            <a class="btn primary" href="#/contact">Apply for this role ${renderSvg(ArrowRight, 18)}</a>
          </article>
        `).join('')}
      </div>
    </section>
    ${auditCta()}
  `);
}

function resourcesPage(slug) {
  const selected = resources.find(([title]) => slugify(title) === slug);
  if (selected) {
    const [title, description] = selected;
    return detailPage({
      eyebrow: 'Resource',
      title,
      description,
      points: [
        'Growth systems insight',
        'CRM and lead management context',
        'Automation and follow-up recommendations',
        'AI customer communication perspective',
        'Campaign and conversion thinking',
        'Practical next steps for business teams'
      ],
      cta: title === 'Growth Audit Checklist' ? 'Book Audit' : 'Talk to Vistrow'
    });
  }

  setMeta('Growth Systems Resources | Vistrow', 'Read Vistrow resources on CRM, lead generation, AI calling, automation, and growth systems.');
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">Resources</p>
      <h1>Learn how connected growth systems work.</h1>
      <p>Practical material for businesses that want stronger lead capture, cleaner CRM usage, faster follow-ups, and more measurable conversion.</p>
    </section>
    <section class="section-pad">
      <div class="resource-grid">
        ${resources.map(([title, text]) => `<a class="service-card" href="#/resources/${slugify(title)}"><span class="icon-badge">${icon('MessageSquareText')}</span><h3>${title}</h3><p>${text}</p></a>`).join('')}
      </div>
    </section>
  `);
}

function solutionsPage(slug) {
  const selected = solutions.find(([title]) => solutionSlug(title) === slug);
  if (selected) {
    const [title, description] = selected;
    return detailPage({
      eyebrow: 'Solution',
      title,
      description,
      points: [
        'Marketing and lead capture setup',
        'CRM pipeline structure',
        'AI calling and customer communication',
        'Follow-up automation workflows',
        'Dashboard and reporting visibility',
        'Conversion improvement roadmap'
      ],
      cta: 'Build This System'
    });
  }

  setMeta('Growth Systems Solutions | Vistrow', 'Vistrow connects lead generation, sales automation, AI communication, CRM, and digital transformation systems.');
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">Solutions</p>
      <h1>Connected systems for the full growth journey.</h1>
      <p>Vistrow helps businesses connect marketing, CRM, AI customer communication, sales automation, and reporting into one clear operating system.</p>
    </section>
    <section class="section-pad">
      <div class="service-grid">
        ${solutions.map(([title, text]) => `<a class="service-card" href="#/solutions/${solutionSlug(title)}"><span class="icon-badge">${icon('Network')}</span><h3>${title}</h3><p>${text}</p></a>`).join('')}
      </div>
    </section>
    ${processSection()}
  `);
}

function footer() {
  const groups = [
    ['Services', ['Digital Marketing', 'SaaS Product Development', 'AI Voice Calling Agents', 'CRM & Lead Management', 'Automation Workflows', 'Analytics & Reporting']],
    ['Products', ['ArthaLeads CRM', 'Vistrow Voice', 'Vistrow Flow', 'Vistrow Labs', 'Upcoming Products']],
    ['Solutions', ['Growth Systems', 'Lead Generation System', 'Sales Automation', 'AI Customer Communication', 'CRM & Pipeline Management', 'Digital Transformation']],
    ['Company', ['About Vistrow', 'Our Ecosystem', 'Case Studies', 'Blog', 'Careers', 'Contact']],
    ['Legal', ['Privacy Policy', 'Terms & Conditions', 'Cookie Policy', 'Refund Policy', 'Disclaimer']]
  ];
  return `
    <footer class="site-footer">
      <div class="footer-brand">
        <a class="brand reverse" href="#/"><span class="brand-mark"><span></span></span><span><strong class="wordmark">Vistrow</strong><small>Vistrow Technologies</small></span></a>
        <p>AI, SaaS & Growth Systems for modern businesses.</p>
        <a class="btn primary" href="#/audit">Book a Growth Audit</a>
      </div>
      ${groups.map(([title, items]) => `
        <div class="footer-col">
          <h3>${title}</h3>
          ${items.map((item) => `<a href="#/${title.toLowerCase()}">${item}</a>`).join('')}
        </div>
      `).join('')}
      <div class="footer-bottom">© 2026 Vistrow Technologies. All rights reserved. Built for Visionaries. Powered by Intelligence. Engineered for Growth.</div>
    </footer>
  `;
}

function notFound() {
  return shell(`
    <section class="page-hero">
      <p class="eyebrow">404</p>
      <h1>This page is not part of the current Vistrow site map.</h1>
      <p>Use the navigation to return to the growth systems website.</p>
      <a class="btn primary" href="#/">Go Home</a>
    </section>
  `);
}

function render() {
  const route = window.location.hash.replace(/^#/, '') || '/';
  const [base, detail] = route.split('/').filter(Boolean);
  let html;

  if (!base) html = home();
  else if (base === 'services') html = servicesPage(detail);
  else if (base === 'products') html = productsPage(detail);
  else if (base === 'industries') html = industriesPage(detail);
  else if (base === 'about') html = aboutPage();
  else if (base === 'company') html = companyPage(detail);
  else if (base === 'contact') html = contactPage();
  else if (base === 'audit') html = contactPage(true);
  else if (base === 'resources') html = resourcesPage(detail);
  else if (base === 'solutions') html = solutionsPage(detail);
  else html = notFound();

  document.querySelector('#app').innerHTML = html;
  bindInteractions();
  window.scrollTo({ top: 0, behavior: 'instant' });
}

function bindInteractions() {
  const navToggle = document.querySelector('.nav-toggle');
  const header = document.querySelector('.site-header');
  navToggle?.addEventListener('click', () => header.classList.toggle('open'));

  document.querySelectorAll('.theme-switcher').forEach((switcher) => {
    switcher.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', nextTheme);
      localStorage.setItem('vistrow-theme', nextTheme);
    });
  });

  document.querySelectorAll('.nav-trigger').forEach((trigger) => {
    trigger.addEventListener('click', () => {
      const item = trigger.closest('.nav-item');
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.nav-item.open').forEach((openItem) => {
        openItem.classList.remove('open');
        openItem.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });

  if (!window.__vistrowOutsideNavBound) {
    window.__vistrowOutsideNavBound = true;
    document.addEventListener('click', (event) => {
      if (!event.target.closest('.nav-item')) {
        document.querySelectorAll('.nav-item.open').forEach((item) => {
          item.classList.remove('open');
          item.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  document.querySelectorAll('.nav a, .footer-col a, .brand, .header-cta').forEach((link) => {
    link.addEventListener('click', () => {
      header?.classList.remove('open');
      document.querySelectorAll('.nav-item.open').forEach((item) => {
        item.classList.remove('open');
        item.querySelector('.nav-trigger')?.setAttribute('aria-expanded', 'false');
      });
    });
  });

  document.querySelector('.contact-form')?.addEventListener('submit', (event) => {
    event.preventDefault();
    const note = event.currentTarget.querySelector('.form-note');
    note.textContent = 'Thanks. Your inquiry is ready to connect with a backend or CRM endpoint.';
    event.currentTarget.reset();
  });

  document.querySelectorAll('.nav a').forEach((link) => {
    if (link.getAttribute('href') === window.location.hash || (window.location.hash === '' && link.getAttribute('href') === '#/')) {
      link.setAttribute('aria-current', 'page');
    }
  });

  bindTiltCards();
  bindCareerLanyard();
  bindHomepageInteractions();
}

function bindTiltCards() {
  const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const cards = document.querySelectorAll([
    '.metric',
    '.workflow-card',
    '.point',
    '.eco-card',
    '.ecosystem-detail',
    '.service-card',
    '.process-step',
    '.process-detail',
    '.product-card',
    '.industry-card',
    '.audit-cta',
    '.band',
    '.review-card',
    '.mini-grid article',
    '.contact-form',
    '.career-job'
  ].join(','));

  cards.forEach((card) => {
    card.classList.add('tilt-card');
    if (!supportsHover || reducedMotion) return;

    let lastY = 0;
    const label = card.querySelector('h3, h2, strong, .eyebrow')?.textContent?.trim() || 'Vistrow';

    card.addEventListener('pointerenter', () => {
      card.style.setProperty('--tilt-scale', '1.025');
      showTiltTooltip(label);
    });

    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const offsetX = event.clientX - rect.left - rect.width / 2;
      const offsetY = event.clientY - rect.top - rect.height / 2;
      const rotateX = (offsetY / (rect.height / 2)) * -8;
      const rotateY = (offsetX / (rect.width / 2)) * 8;
      const velocityY = offsetY - lastY;
      lastY = offsetY;

      card.style.setProperty('--tilt-x', `${clamp(rotateX, -8, 8).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${clamp(rotateY, -8, 8).toFixed(2)}deg`);
      moveTiltTooltip(event.clientX, event.clientY, clamp(-velocityY * 0.55, -10, 10));
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--tilt-x', '0deg');
      card.style.setProperty('--tilt-y', '0deg');
      card.style.setProperty('--tilt-scale', '1');
      lastY = 0;
      hideTiltTooltip();
    });
  });
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function tiltTooltip() {
  let tooltip = document.querySelector('.tilt-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.className = 'tilt-tooltip';
    document.body.appendChild(tooltip);
  }
  return tooltip;
}

function showTiltTooltip(text) {
  const tooltip = tiltTooltip();
  tooltip.textContent = text;
  tooltip.style.opacity = '1';
}

function moveTiltTooltip(x, y, rotate = 0) {
  const tooltip = tiltTooltip();
  tooltip.style.transform = `translate3d(${x + 14}px, ${y + 14}px, 0) rotate(${rotate.toFixed(2)}deg)`;
}

function hideTiltTooltip() {
  const tooltip = document.querySelector('.tilt-tooltip');
  if (tooltip) tooltip.style.opacity = '0';
}

function bindCareerLanyard() {
  const root = document.querySelector('[data-lanyard-root]');
  if (!root) return;

  import('./CareerLanyard.jsx').then(({ mountCareerLanyard }) => {
    mountCareerLanyard(root);
  });
}

function bindHomepageInteractions() {
  const setDashboardStage = (index) => {
    const stage = dashboardStages[index];
    if (!stage) return;
    document.querySelector('[data-dashboard-label]').textContent = stage.label;
    document.querySelector('[data-dashboard-metric]').textContent = stage.metric;
    document.querySelector('[data-dashboard-assist]').textContent = stage.assist;
    document.querySelector('[data-dashboard-stage]').textContent = `${stage.stage} system active`;
    document.querySelector('[data-dashboard-workflow]').textContent = stage.workflow;
    document.querySelectorAll('.pipeline-stage').forEach((button, buttonIndex) => {
      button.classList.toggle('active', buttonIndex === index);
    });
  };

  document.querySelectorAll('.pipeline-stage').forEach((button) => {
    button.addEventListener('click', () => setDashboardStage(Number(button.dataset.stageIndex)));
  });

  if (document.querySelector('.pipeline-stage') && !window.__vistrowDashboardTimer) {
    let activeStage = 0;
    window.__vistrowDashboardTimer = window.setInterval(() => {
      if (!document.querySelector('.pipeline-stage')) return;
      activeStage = (activeStage + 1) % dashboardStages.length;
      setDashboardStage(activeStage);
    }, 3200);
  }

  document.querySelectorAll('.eco-card').forEach((card) => {
    card.addEventListener('click', () => {
      const item = ecosystem[Number(card.dataset.ecosystemIndex)];
      if (!item) return;
      document.querySelectorAll('.eco-card').forEach((other) => other.classList.remove('active'));
      card.classList.add('active');
      document.querySelector('[data-eco-icon]').innerHTML = icon(item.icon);
      document.querySelector('[data-eco-title]').textContent = item.title;
      document.querySelector('[data-eco-text]').textContent = item.text;
      document.querySelector('[data-eco-signal]').textContent = item.signal;
      document.querySelector('[data-eco-stat]').textContent = item.stat;
    });
  });

  document.querySelectorAll('.process-step').forEach((step) => {
    step.addEventListener('click', () => {
      const title = process[Number(step.dataset.processIndex)];
      if (!title) return;
      document.querySelectorAll('.process-step').forEach((other) => other.classList.remove('active'));
      step.classList.add('active');
      document.querySelector('[data-process-title]').textContent = title;
      document.querySelector('[data-process-copy]').textContent = processCopy(title);
    });
  });

  const revealItems = document.querySelectorAll('.service-card, .product-card, .industry-card, .point, .eco-card, .process-step, .audit-cta, .band');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });
    revealItems.forEach((item) => {
      item.classList.add('reveal');
      observer.observe(item);
    });
  } else {
    revealItems.forEach((item) => item.classList.add('revealed'));
  }
}

window.addEventListener('hashchange', render);
render();
