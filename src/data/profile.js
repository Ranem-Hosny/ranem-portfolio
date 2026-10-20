/**
 * profile.js — central place for personal details.
 * ▸ Edit the values below to make the site yours.
 * ▸ Fields ending in `Ar` are the Arabic version shown when the site is in Arabic.
 */
export const profile = {
  name: 'Ranem Hosny',
  nameAr: 'رنيم حسني',
  firstName: 'Ranem',
  firstNameAr: 'رنيم',
  lastName: 'Hosny',
  lastNameAr: 'حسني',

  // Cycled through by the animated typing effect in the Hero
  roles: [
    'Frontend Developer',
    'React Developer',
    'Cross-Platform Developer',
    'UI Engineer',
  ],
  rolesAr: ['مطوّرة واجهات أمامية', 'مطوّرة React', 'مطوّرة تطبيقات متعددة المنصات', 'مهندسة واجهات'],

  tagline:
    'I build fast, accessible web interfaces with React and modern tooling — turning designs into smooth, detail-driven experiences people genuinely enjoy using.',
  taglineAr:
    'أبني واجهات ويب سريعة وسهلة الاستخدام باستخدام React وأحدث الأدوات — أحوّل التصاميم إلى تجارب سلسة ومتقنة يستمتع بها المستخدم فعلًا.',

  location: 'Mansoura, Egypt',
  locationAr: 'المنصورة، مصر',
  availability: 'Available for new opportunities',
  availabilityAr: 'متاحة لفرص جديدة',
  email: 'ranemhosni2001@gmail.com',
  yearsExperience: 3,
  resume: '/Ranem-Hosny-Frontend-CV.pdf',

  // Short bio shown in the About section
  about: [
    "I'm Ranem Hosny — a frontend developer with 3 years of experience turning ideas into fast, accessible, and genuinely enjoyable web interfaces.",
    'I sharpened my craft through two competitive tech scholarships, focusing on modern front-end engineering and cross-platform development — and I bring that same curiosity and care to every project I build.',
  ],
  aboutAr: [
    'أنا رنيم حسني — مطوّرة واجهات أمامية بخبرة 3 سنوات في تحويل الأفكار إلى واجهات ويب سريعة وسهلة الاستخدام وممتعة فعلًا.',
    'صقلتُ مهاراتي من خلال منحتين تقنيتين تنافسيتين ركّزتا على هندسة الواجهات الحديثة وتطوير التطبيقات متعددة المنصات — وأحمل نفس الشغف والاهتمام إلى كل مشروع أعمل عليه.',
  ],

  // Social / contact links — replace with your own
  socials: {
    github: 'https://github.com/Ranem-Hosny',
    linkedin: 'https://www.linkedin.com/in/ranem-hosny',
    whatsapp: 'https://wa.me/201025666243',
  },
}

// Small headline stats shown in the Hero
export const stats = [
  { value: '3+', label: 'Years of experience', labelAr: 'سنوات خبرة' },
  { value: '10+', label: 'Projects built', labelAr: 'مشروع منفّذ' },
  { value: '3', label: 'Companies', labelAr: 'شركات' },
  { value: '2', label: 'Scholarships', labelAr: 'منح تقنية' },
]

// Work experience shown in the About section (current roles first, full-time before part-time)
// `employment` (optional) is shown next to the role, e.g. 'Full-time' / 'Part-time'
export const experience = [
  {
    company: 'Najah Tech',
    role: 'Frontend Developer & SEO (per project)',
    employment: 'Full-time',
    employmentAr: 'دوام كامل',
    roleAr: 'مطوّرة واجهات أمامية و SEO (حسب المشروع)',
    period: '2026 — Present',
    periodAr: '2026 — حتى الآن',
    detail:
      'Building bilingual marketing and product interfaces with React — shipping client projects including Waves Tech and Qumra Labs — and handling technical SEO on selected projects such as Riyadh Foundry.',
    detailAr:
      'أبني واجهات تسويقية وواجهات منتجات ثنائية اللغة باستخدام React — وأطلقت مشاريع لعملاء منها Waves Tech ومختبرات قمرة — وأتولّى تحسين محركات البحث (SEO) التقني لبعض المشاريع مثل مسبك الرياض.',
  },
  {
    company: 'Khatwh',
    role: 'Full Stack Developer & AI Prompting',
    employment: 'Part-time',
    employmentAr: 'دوام جزئي',
    roleAr: 'مطوّرة Full Stack وهندسة أوامر الذكاء الاصطناعي',
    period: '2026 — Present',
    periodAr: '2026 — حتى الآن',
    detail:
      'Working across the full stack — building front-end interfaces and back-end features, and crafting AI prompts that power product workflows.',
    detailAr:
      'أعمل على المشروع من الواجهة حتى الخادم — أبني الواجهات وخصائص الـ Back-end، وأصمّم أوامر الذكاء الاصطناعي التي تشغّل سير العمل في المنتج.',
  },
  {
    company: 'Softzone',
    role: 'Frontend Developer',
    roleAr: 'مطوّرة واجهات أمامية',
    period: '2024 — 2025',
    detail:
      'Built and shipped client-facing web applications with Angular and Angular Material — including the ATC educational platform.',
    detailAr:
      'بنيت وأطلقت تطبيقات ويب للعملاء باستخدام Angular و Angular Material — منها المنصة التعليمية ATC.',
  },
]

// Training & scholarships shown in the About section
export const programs = [
  {
    org: 'ITI',
    fullName: 'Information Technology Institute',
    fullNameAr: 'معهد تكنولوجيا المعلومات',
    logo: '/projects/iti.png',
    track: 'Front-End & Cross-Platform Development',
    trackAr: 'تطوير الواجهات الأمامية والتطبيقات متعددة المنصات',
    badge: 'Scholarship',
    badgeAr: 'منحة',
    detail:
      'A competitive professional scholarship focused on modern front-end engineering and building cross-platform applications from a single codebase.',
    detailAr:
      'منحة مهنية تنافسية تركّز على هندسة الواجهات الحديثة وبناء تطبيقات متعددة المنصات من كود واحد.',
  },
  {
    org: 'DEPI',
    fullName: 'Digital Egypt Pioneers Initiative',
    fullNameAr: 'مبادرة رواد مصر الرقمية',
    logo: '/depilogo.png',
    track: 'Front-End Development',
    trackAr: 'تطوير الواجهات الأمامية',
    badge: 'Scholarship',
    badgeAr: 'منحة',
    detail:
      'A national tech initiative where I deepened my front-end fundamentals and learned to ship clean, production-ready user interfaces.',
    detailAr:
      'مبادرة تقنية وطنية عمّقت فيها أساسيات تطوير الواجهات، وتعلّمت تسليم واجهات نظيفة جاهزة للإطلاق.',
  },
]
