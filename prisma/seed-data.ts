import { LinkKind, SkillCategory } from '../src/generated/prisma/client';

type SeedProfile = {
  name: string;
  headline: string;
  description: string;
  location?: string;
  links: { kind: LinkKind; url: string; label?: string }[];
  skills: { name: string; category: SkillCategory }[];
  experience: {
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    achievements: string[];
  }[];
  projects: {
    name: string;
    description?: string;
    url?: string;
    repositoryUrl?: string;
    skills: string[];
  }[];
};

export const profile: SeedProfile = {
  name: 'Ilia Kurganov',
  headline: 'Frontend Engineer',
  description:
    'Frontend Engineer with 5+ years of experience delivering complex web applications across various domains — from enterprise systems to mapping and visualization tools. Skilled in scalable architecture, algorithmic problem-solving, and modern frontend technologies, using various AI to speed up development.',
  location: 'Antalya, Turkey',
  links: [
    { kind: LinkKind.GITHUB, url: 'https://github.com/forseee' },
    {
      kind: LinkKind.LINKEDIN,
      url: 'https://linkedin.com/in/ilia-kurganov-71a1b0208',
    },
    { kind: LinkKind.TELEGRAM, url: 'https://t.me/Forse11', label: '@Forse11' },
    { kind: LinkKind.EMAIL, url: 'mailto:forse7777@gmail.com' },
  ],
  skills: [
    // Languages
    { name: 'JavaScript', category: SkillCategory.LANGUAGE },
    { name: 'TypeScript', category: SkillCategory.LANGUAGE },
    { name: 'Swift', category: SkillCategory.LANGUAGE },
    { name: 'Python', category: SkillCategory.LANGUAGE },
    { name: 'HTML5', category: SkillCategory.LANGUAGE },
    { name: 'CSS3', category: SkillCategory.LANGUAGE },

    // Frameworks
    { name: 'React', category: SkillCategory.FRAMEWORK },
    { name: 'Vue', category: SkillCategory.FRAMEWORK },
    { name: 'Next.js', category: SkillCategory.FRAMEWORK },
    { name: 'Nuxt', category: SkillCategory.FRAMEWORK },

    // State & data fetching
    { name: 'Zustand', category: SkillCategory.LIBRARY },
    { name: 'MobX', category: SkillCategory.LIBRARY },
    { name: 'MST', category: SkillCategory.LIBRARY },
    { name: 'Effector', category: SkillCategory.LIBRARY },
    { name: 'Redux', category: SkillCategory.LIBRARY },
    { name: 'RTK Query', category: SkillCategory.LIBRARY },
    { name: 'TanStack Query', category: SkillCategory.LIBRARY },
    { name: 'SWR', category: SkillCategory.LIBRARY },

    // UI
    { name: 'Material UI', category: SkillCategory.LIBRARY },
    { name: 'Chakra UI', category: SkillCategory.LIBRARY },
    { name: 'Tailwind', category: SkillCategory.LIBRARY },
    { name: 'Ant Design', category: SkillCategory.LIBRARY },
    { name: 'Storybook', category: SkillCategory.TOOL },
    { name: 'Figma', category: SkillCategory.TOOL },
    { name: 'Blender', category: SkillCategory.TOOL },

    // Maps & geo
    { name: 'Mapbox GL', category: SkillCategory.LIBRARY },
    { name: 'Google Maps API', category: SkillCategory.LIBRARY },
    { name: 'Yandex Maps', category: SkillCategory.LIBRARY },
    { name: 'Turf.js', category: SkillCategory.LIBRARY },
    { name: 'deck.gl', category: SkillCategory.LIBRARY },
    { name: 'D3.js', category: SkillCategory.LIBRARY },
    { name: 'GeoJSON', category: SkillCategory.TOOL },
    { name: 'QGIS', category: SkillCategory.TOOL },

    // Backend
    { name: 'Node.js', category: SkillCategory.FRAMEWORK },
    { name: 'NestJS', category: SkillCategory.FRAMEWORK },
    { name: 'GraphQL', category: SkillCategory.TOOL },
    { name: 'Apollo Server', category: SkillCategory.LIBRARY },
    { name: 'Prisma', category: SkillCategory.LIBRARY },
    { name: 'PostgreSQL', category: SkillCategory.DATABASE },

    // Misc libraries
    { name: 'i18next', category: SkillCategory.LIBRARY },
    { name: 'Zod', category: SkillCategory.LIBRARY },
    { name: 'Jest', category: SkillCategory.TOOL },
    { name: 'WebSocket', category: SkillCategory.TOOL },
    { name: 'Stripe', category: SkillCategory.TOOL },
    { name: 'Strapi', category: SkillCategory.TOOL },

    // Architecture
    { name: 'FSD', category: SkillCategory.TOOL },
    { name: 'Module Federation', category: SkillCategory.TOOL },

    // Tooling
    { name: 'ESLint', category: SkillCategory.TOOL },
    { name: 'Prettier', category: SkillCategory.TOOL },
    { name: 'Vite', category: SkillCategory.TOOL },
    { name: 'Webpack', category: SkillCategory.TOOL },
    { name: 'Docker', category: SkillCategory.TOOL },
    { name: 'Git', category: SkillCategory.TOOL },
    { name: 'GitHub', category: SkillCategory.TOOL },
    { name: 'GitLab', category: SkillCategory.TOOL },
    { name: 'Bitbucket', category: SkillCategory.TOOL },
    { name: 'Confluence', category: SkillCategory.TOOL },
    { name: 'Jira', category: SkillCategory.TOOL },
  ],
  experience: [
    {
      company: 'A1 SolarStore',
      position: 'Frontend Developer',
      startDate: '2026-07-01',
      achievements: [
        'Built the complete frontend for a referral program using Vue.js and Nuxt, including referral links, statistics dashboards, and data tables.',
        'Developed a Python system automating GoDaddy domain discovery, filtering, data enrichment, and auction bidding, with users only approving domains and setting maximum bids.',
        'Reduced manual work from 10 hours to 10 minutes per week by automating the domain acquisition workflow.',
        'Delivered the automation project from research through implementation, testing, and production deployment using AI-assisted development; the system now operates with minimal human intervention.',
      ],
    },
    {
      company: 'MakeSolar',
      position: 'Frontend Developer / GeoSpatial Engineer',
      startDate: '2023-10-01',
      endDate: '2026-07-01',
      achievements: [
        'Developed algorithms for panel layout, geometry, and spatial data.',
        'Integrated and maintained headless CMS (Strapi) for multilingual content.',
        'Built map-based 2D/3D visualization tools using deck.gl, GeoJSON, Mapbox GL and Google Maps.',
      ],
    },
    {
      company: 'GUSCOM',
      position: 'Frontend Developer',
      startDate: '2022-09-01',
      endDate: '2023-09-01',
      achievements: [
        'Developed a procurement system with multi-role workflows.',
        'Implemented complex UI components and business logic for approval processes.',
      ],
    },
    {
      company: 'IBS',
      position: 'Frontend Developer',
      startDate: '2021-01-01',
      endDate: '2022-08-01',
      achievements: [
        'Developed large-scale enterprise web applications for corporate clients (5 different projects with different teams), including microfrontends.',
        'Built and maintained custom UI kits for internal business systems.',
        'Developed analytical dashboards, large tables and forms for enterprise workflows.',
        'Built applications with multilingual support and a multi-role access model with differentiated functionality.',
      ],
    },
  ],
  projects: [
    {
      name: 'Digital Business Card (this API)',
      description:
        'Backend business card: GraphQL API (Apollo Sandbox) exposing profile, skills, experience and projects. NestJS + Prisma + PostgreSQL, auto-migrated and seeded in Docker.',
      skills: [
        'TypeScript',
        'Node.js',
        'NestJS',
        'GraphQL',
        'Apollo Server',
        'Prisma',
        'PostgreSQL',
        'Docker',
        'Git',
      ],
    },
    {
      name: 'Referral Program Frontend (A1 SolarStore)',
      description:
        'Frontend for a referral program: referral links, statistics dashboards and data tables.',
      skills: ['Vue', 'Nuxt', 'TypeScript'],
    },
    {
      name: 'GoDaddy Domain Automation (A1 SolarStore)',
      description:
        'Python system automating GoDaddy domain discovery, filtering, enrichment and auction bidding; cut manual work from 10 hours to 10 minutes per week.',
      skills: ['Python'],
    },
    {
      name: 'Solar Panel Layout & 2D/3D Visualization (MakeSolar)',
      description:
        'Panel layout planning, geometry and spatial algorithms with map-based 2D/3D visualization.',
      skills: ['deck.gl', 'GeoJSON', 'Mapbox GL', 'Google Maps API', 'Turf.js'],
    },
  ],
};
