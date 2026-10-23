export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  name: string;
  type: string;
  category: 'AI Solutions' | 'Web Apps' | 'Mobile Apps' | 'Enterprise' | 'Extensions' | 'E-Commerce' | 'Other';
  tag: string;
  description: string;
  fullOverview: string;
  client: string;
  timeline: string;
  role: string;
  status: 'live' | 'link-required' | 'development';
  technologies: string[];
  keyFeatures: string[];
  architecturePoints: string[];
  previewImage?: string;
  liveUrl: string | null;
  appUrl?: string | null; // Dedicated App / Management link
  githubUrl?: string | null;
  accessLabel: string;
}

export const projectsList: ProjectItem[] = [
  {
    id: 'madrassa-saas-system',
    slug: 'madrassa-saas-system',
    title: 'Madrassa SaaS System — Multi-Tenant Islamic Education Platform',
    name: 'Madrassa SaaS System',
    type: 'Multi-Tenant SaaS / Enterprise Software',
    category: 'Enterprise',
    tag: 'Enterprise SaaS',
    description: 'Enterprise-grade multi-tenant educational management SaaS engineered for Islamic academies, institutes, and seminaries with complete admission, fee ledger, and biometric attendance pipelines.',
    fullOverview: 'Madrassa SaaS is a modern, high-security multi-tenant platform designed to digitalize and automate the entire operational lifecycle of traditional and modern Islamic educational institutions. It features automated student registration, class syllabus allocation, automated fee invoices with voucher generation, role-based teacher and administrator portals, and real-time attendance analytics.',
    client: 'Educational Institutions & Academies',
    timeline: 'Production System',
    role: 'Lead Full Stack & SaaS Architect',
    status: 'live',
    previewImage: '/assets/madrassa-saas-3d.jpg',
    liveUrl: 'https://madrassa-website.vercel.app',
    appUrl: 'https://web-production-6fe8a.up.railway.app/login',
    githubUrl: null,
    accessLabel: 'Open Live Website ↗',
    technologies: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Railway', 'Vercel'],
    keyFeatures: [
      'Multi-tenant institutional hierarchy with isolated database schemas',
      'Automated student admission, enrollment, and digital ID card generation',
      'Monthly fee generation, voucher print engine, and dues reconciliation',
      'Teacher gradebook, course management, and examination scoring module',
      'Biometric & manual attendance telemetry with guardian SMS alerts',
      'Administrative analytics dashboard with revenue and attendance metrics'
    ],
    architecturePoints: [
      'High-performance React frontend deployed on Vercel with serverless edge caching',
      'Scalable containerized backend microservices deployed on Railway infrastructure',
      'PostgreSQL relational schema with row-level security ensuring strict multi-tenant data isolation',
      'Role-based access control (RBAC) separating Super Admins, Teachers, and Accountants'
    ],
  },
  {
    id: 'schoolflow-saas-system',
    slug: 'schoolflow-saas-system',
    title: 'School SaaS System (SchoolFlow PK) — Educational Management Suite',
    name: 'School SaaS System',
    type: 'Enterprise Cloud SaaS',
    category: 'Enterprise',
    tag: 'Cloud ERP',
    description: 'Complete cloud educational operating system with dedicated Super-Admin control center, branch orchestration, academic timelines, fee engines, and student performance metrics.',
    fullOverview: 'SchoolFlow PK is an all-in-one educational ERP and SaaS suite that consolidates multi-branch school administration into one unified digital workspace. It allows school networks and franchise owners to manage admissions, staff payroll, exams, parent-teacher communications, and real-time revenue collection across multiple campuses.',
    client: 'School Networks & Private Academies',
    timeline: 'Production System',
    role: 'Lead SaaS Engineer & Product Architect',
    status: 'live',
    previewImage: '/assets/school-saas-3d.jpg',
    liveUrl: 'https://schoolflow-pk-website.vercel.app/',
    appUrl: 'https://school-mangment-theta.vercel.app/super-admin/dashboard',
    githubUrl: null,
    accessLabel: 'Open Live Website ↗',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'REST API', 'Node.js', 'PostgreSQL', 'Vercel'],
    keyFeatures: [
      'Super-Admin command center with cross-campus analytics and real-time KPI cards',
      'Campus branch orchestration with custom roles, permissions, and fee structures',
      'Student lifecycle engine: from registration and roll-number allotment to graduation',
      'Staff management, automated attendance logging, and salary vouchers',
      'Comprehensive examination generator with report cards and grading scales',
      'Parent portal access with direct fee status, announcements, and results'
    ],
    architecturePoints: [
      'Modern single-page application (SPA) architecture built with React and Vite for sub-100ms transitions',
      'Optimized RESTful API integration with token-based JWT authentication and session persistence',
      'Responsive black & gold luxury theme with responsive mobile interfaces for field administrators',
      'Production grade deployment on Vercel with global CDN edge routing'
    ],
  },
  {
    id: 'rohan-quran-academy',
    slug: 'rohan-quran-academy',
    title: 'Rohan Quran Academy — Global Online Learning Web Platform',
    name: 'Rohan Quran Academy',
    type: 'Web Application / Online Academy',
    category: 'Web Apps',
    tag: 'Web Platform',
    description: 'Modern, high-performance responsive web platform for global online Quran education, featuring course curriculums, one-on-one tutor matching, and seamless student onboarding.',
    fullOverview: 'Rohan Quran Academy is a purpose-built international web platform that connects students worldwide with certified Quranic tutors. Featuring modern typography, intuitive course selection, mobile-optimized registration pipelines, and WhatsApp integration, it simplifies enrollment for diaspora families across the UK, USA, Canada, and the Middle East.',
    client: 'Rohan Quran Academy Global',
    timeline: 'Production Web Platform',
    role: 'Full Stack Web Developer & UI/UX Designer',
    status: 'live',
    previewImage: '/assets/quran-academy-3d.jpg',
    liveUrl: 'https://rohan-quran-acadmey.vercel.app/',
    appUrl: null,
    githubUrl: null,
    accessLabel: 'Open Live Website ↗',
    technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Vercel'],
    keyFeatures: [
      'Interactive course catalog: Nazra, Hifz, Tajweed, and Islamic studies for kids & adults',
      'Free trial booking flow with timezone detection and calendar scheduling',
      'One-click direct WhatsApp advisory link with automated student context pre-fill',
      'Multilingual presentation with cultural elegance and high visual polish',
      'SEO-optimized architecture ranking for international Quran learning searches',
      '100% responsive mobile-first UI with lightning-fast load times'
    ],
    architecturePoints: [
      'High-speed Next.js / React frontend utilizing optimized modern asset bundling',
      'Tailwind CSS custom design system reflecting Islamic warmth and modern digital sophistication',
      'Automated form submission webhook integration with instant staff notifications',
      'Edge CDN caching ensuring sub-second global page loads across North America and Europe'
    ],
  },
  {
    id: 'amna-skin-care',
    slug: 'amna-skin-care',
    title: 'Amna Skin Care — Luxury Skincare E-Commerce & Management Platform',
    name: 'Amna Skin Care Website',
    type: 'E-Commerce Store & Admin Portal',
    category: 'E-Commerce',
    tag: 'E-Commerce & Admin',
    description: 'High-end cosmetics and skincare digital commerce platform with bespoke product catalog, dynamic cart checkout engine, and unified administrative dashboard.',
    fullOverview: 'Amna Skin is a boutique digital beauty destination crafted for premium skincare products, organic formulations, and serums. It combines editorial aesthetics with high-converting e-commerce engineering, including product filtering, cart drawer workflows, customer order management, and administrative stock control.',
    client: 'Amna Skin Cosmetics',
    timeline: 'Production E-Commerce Platform',
    role: 'Lead E-Commerce Developer & Full Stack Architect',
    status: 'live',
    previewImage: '/assets/skincare-ecommerce-3d.jpg',
    liveUrl: 'https://amna-skin.vercel.app/',
    appUrl: 'https://amna-skin.vercel.app/',
    githubUrl: null,
    accessLabel: 'Open Live Website ↗',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind CSS', 'Stripe / COD', 'Vercel'],
    keyFeatures: [
      'Luxury minimalist product catalog with high-resolution imagery and ingredient breakdowns',
      'Frictionless slide-over cart drawer with real-time total calculations and free shipping meter',
      'Skin type diagnostic quiz recommending personalized skincare regimens',
      'Integrated administrative portal for real-time inventory and customer order fulfillment',
      'Secure checkout pipeline supporting online credit card payments and cash-on-delivery',
      'Social proof customer reviews module with verified buyer ratings'
    ],
    architecturePoints: [
      'Client-side state management with instant optimistic UI updates on add-to-cart',
      'Tailwind CSS design system built around warm nude, champagne gold, and charcoal palettes',
      'Micro-animations and smooth scroll interactions engineered for luxury consumer engagement',
      'Vercel edge deployment with automated CI/CD builds'
    ],
  },
];
