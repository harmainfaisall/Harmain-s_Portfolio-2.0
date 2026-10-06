/**
 * ============================================================================
 * PORTFOLIO SKILLS DATA
 * ============================================================================
 * 
 * Edit this file to add, modify, or remove skills from your scrolling columns!
 * You can customize the name, category, description, icon, and level.
 */

export interface Skill {
  name: string;        // e.g. "React"
  category: string;    // e.g. "Frontend", "Backend", "DevOps", "Database", "Tools"
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
];

// Column 3 (DevOps, Cloud & Architecture) — Duration: 17s
export const thirdColumn: Skill[] = [
  {
    name: "Docker",
    category: "DevOps",
    description: "Multi-stage containerization, Docker Compose, and image optimization.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",
    level: "Advanced",
  },
  {
    name: "Kubernetes",
    category: "Cloud",
    description: "Container orchestration, ingress controllers, cluster scaling, and pods.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg",
    level: "Intermediate",
  },
  {
    name: "Git & GitHub",
    category: "Tools",
    description: "Version control, feature branching workflows, PR reviews, and CI/CD.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg",
    level: "Expert",
  },
  {
    name: "Linux & Shell",
    category: "Infrastructure",
    description: "Bash scripting, server configuration, permissions, and systemd services.",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",
    level: "Advanced",
  },
];

// Combined list of all skills
export const ALL_SKILLS: Skill[] = [
  ...firstColumn,
  ...secondColumn,
  ...thirdColumn,
];
