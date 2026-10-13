/**
 * ============================================================================
 * PORTFOLIO SKILLS DATA
 * ============================================================================
 * 
 * Edit this file to add, modify, or remove skills from your scrolling columns!
 */

export interface Skill {
  name: string;        // e.g. "React"
  category: string;    // e.g. "Frontend", "Backend", "Full-Stack", "Database", "State Management"
  description: string; // Short 1-line description
  icon?: string;       // Optional icon URL or image path
  level?: string;      // e.g. "Expert", "Advanced", "Intermediate"
}

// Column 1 (Frontend & Reactive UI) — Duration: 15s
export const firstColumn: Skill[] = [
  {
    name: "React.js",
    category: "Frontend",
    description: "Component architecture, hooks, concurrent rendering, and state workflows.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
    level: "Advanced",
  },
  {
    name: "TypeScript",
    category: "Languages",
    description: "Strict typing, generics, complex interfaces, and clean compile-time safety.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
    level: "Advanced",
  },
  {
    name: "Next.js",
    category: "Full-Stack",
    description: "App Router, SSR, Server Components, and optimized SEO web applications.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg",
    level: "Advanced",
  },
  {
    name: "Tailwind CSS",
    category: "UI & Styling",
    description: "Modern utility-first responsive styling, design systems, and animations.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
    level: "Expert",
  },
  {
    name: "JavaScript (ES6+)",
    category: "Frontend",
    description: "Modern asynchronous patterns, event loop mechanics, and DOM APIs.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg",
    level: "Expert",
  },
];

// Column 2 (Backend & Databases) — Duration: 19s
export const secondColumn: Skill[] = [
  {
    name: "Node.js",
    category: "Backend",
    description: "High-performance event-driven runtime for scalable microservices.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
    level: "Advanced",
  },
  {
    name: "Express.js",
    category: "Backend",
    description: "RESTful API engineering, middleware orchestration, and authentication.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
    level: "Advanced",
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Relational schema design, complex SQL joins, indexing, and migrations.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg",
    level: "Advanced",
  },
  {
    name: "MongoDB",
    category: "Database",
    description: "Document data modeling, aggregation pipelines, and NoSQL queries.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
    level: "Intermediate",
  },
  {
    name: "Redis",
    category: "Caching & Queues",
    description: "In-memory caching, distributed rate limiting, and pub/sub messaging.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg",
    level: "Intermediate",
  },
];

// Column 3 (Full-Stack State, APIs & Tooling) — Duration: 17s
export const thirdColumn: Skill[] = [
  {
    name: "Redux Toolkit",
    category: "State Management",
    description: "Global state architecture, predictable store workflows, and reactive client caching.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg",
    level: "Advanced",
  },
  {
    name: "Prisma ORM",
    category: "Database ORM",
    description: "Type-safe database modeling, schema migrations, and relational query building.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/prisma/prisma-original.svg",
    level: "Advanced",
  },
  {
    name: "GraphQL",
    category: "API Architecture",
    description: "Declarative data queries, Apollo client integration, schemas, and type-safe mutations.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg",
    level: "Intermediate",
  },
  {
    name: "RESTful APIs",
    category: "API Engineering",
    description: "Scalable endpoint design, JSON serialization, HTTP protocols, and authentication.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg",
    level: "Expert",
  },
  {
    name: "Git & GitHub",
    category: "Version Control",
    description: "Source code management, collaborative feature branching, and pull request workflows.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "Expert",
  },
];

export const ALL_SKILLS: Skill[] = [
  ...firstColumn,
  ...secondColumn,
  ...thirdColumn,
];
