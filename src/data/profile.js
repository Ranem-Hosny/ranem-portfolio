/**
 * profile.js — central place for personal details.
 * ▸ Edit the values below to make the site yours.
 */
export const profile = {
  name: 'Ranem Hosny',
  firstName: 'Ranem',
  lastName: 'Hosny',

  // Cycled through by the animated typing effect in the Hero
  roles: [
    'Frontend Developer',
    'React Developer',
    'Cross-Platform Developer',
    'UI Engineer',
  ],

  tagline:
    'I build fast, accessible web interfaces with React and modern tooling — turning designs into smooth, detail-driven experiences people genuinely enjoy using.',

  location: 'Mansoura, Egypt',
  availability: 'Available for new opportunities',
  email: 'ranemhosni2001@gmail.com',
  yearsExperience: 3,
  resume: '/Ranem-Hosny-Frontend-CV.pdf',

  // Short bio shown in the About section
  about: [
    "I'm Ranem Hosny — a frontend developer with 3 years of experience turning ideas into fast, accessible, and genuinely enjoyable web interfaces.",
    'I sharpened my craft through two competitive tech scholarships, focusing on modern front-end engineering and cross-platform development — and I bring that same curiosity and care to every project I build.',
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
  { value: '3+', label: 'Years of experience' },
  { value: '20+', label: 'Projects built' },
  { value: '2', label: 'Tech scholarships' },
]

// Training & scholarships shown in the About section
export const programs = [
  {
    org: 'ITI',
    fullName: 'Information Technology Institute',
    track: 'Front-End & Cross-Platform Development',
    badge: 'Scholarship',
    detail:
      'A competitive professional scholarship focused on modern front-end engineering and building cross-platform applications from a single codebase.',
  },
  {
    org: 'DEPI',
    fullName: 'Digital Egypt Pioneers Initiative',
    track: 'Front-End Development',
    badge: 'Scholarship',
    detail:
      'A national tech initiative where I deepened my front-end fundamentals and learned to ship clean, production-ready user interfaces.',
  },
]
