/**
 * ============================================================================
 * PORTFOLIO PROJECTS DATA
 * ============================================================================
 * 
 * You can easily add, edit, or remove projects here without touching the UI component!
 * 
 * To add a new project, copy the template below and paste it into the PROJECTS array:
 * 
 * {
 *   id: "07",
 *   title: "Your Project Title",
 *   category: "Full-Stack", // e.g. "Full-Stack", "DevOps", "Frontend", "Cloud", "Mobile"
 *   description: "A short, engaging description of what you built and the problem it solved.",
 *   image: "https://images.unsplash.com/photo-...", // Unsplash URL or /local-image.jpg
 *   liveUrl: "https://your-demo-url.com", // Optional
 *   githubUrl: "https://github.com/your-username/repo", // Optional
 *   technologies: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
 * }
 */

export interface Project {
  id: string;
  title: string;
  category: string; // e.g. "Full-Stack", "DevOps", "Frontend", "Cloud Architecture"
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "COFFIORA",
    category: "Full-Stack Development",
    description:
      "A modern coffee website crafted with a warm, immersive design and smooth interactions, blending rich visuals with a premium café experience.",
    image:
      "./Portfolio/src/assets/coffiora.jpg",
    liveUrl: "https://coffiora.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/COFFIORA",
    technologies: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "02",
    title: "Delicious Bites",
    category: "Full-Stack Development",
    description:
      "A premium food website with a rich dark aesthetic, interactive menu, add-to-cart experience, and a smooth modern UI.",
    image:
      "./Portfolio/src/assets/delicious-bites.png",
    liveUrl: "https://delicious-bites.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Delicious-Bites",
    technologies: ["JavaScript", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "03",
    title: "ServiConnect",
    category: "FullStack Development",
    description:
      "Enterprise authentication microservice providing OAuth2 social logins, JWT rotation, encrypted session storage, and distributed Redis rate-limiting.",
    image:
      "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/pulseauth",
    githubUrl: "https://github.com/harmainfaisall/pulseauth",
    technologies: ["React.js", "TypeScript", "Vite", "Tailwind Css"],
  },
  {
    id: "04",
    title: "WordFlow AI",
    category: "FullStack",
    description:
      "High-throughput telemetry and real-time database query visualizer handling streaming time-series data with sub-second WebSocket updates.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/datasphere",
    githubUrl: "https://github.com/harmainfaisall/datasphere",
    technologies: ["HTML5", "CSS3", "JavaScript", "UIUX"],
  },
  {
    id: "05",
    title: "TravelBae",
    category: "Headless E-Commerce",
    description:
      "Modern headless commerce engine featuring instant search, dynamic cart state management, Stripe payment processing, and inventory sync.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/omnicommerce",
    githubUrl: "https://github.com/harmainfaisall/omnicommerce",
    technologies: ["Next.js 14", "Stripe", "Tailwind CSS", "Zustand", "MySQL"],
  },
  {
    id: "06",
    title: "Clause",
    category: "Cloud Telemetry",
    description:
      "Distributed cluster health monitor streaming CPU, memory thresholds, container uptime, and real-time incident alerting across servers.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/inframonitor",
    githubUrl: "https://github.com/harmainfaisall/inframonitor",
    technologies: ["Go", "Docker", "Prometheus", "Grafana", "Linux"],
  },
   {
    id: "07",
    title: "Image Gallery",
    category: "Cloud Telemetry",
    description:
      "Distributed cluster health monitor streaming CPU, memory thresholds, container uptime, and real-time incident alerting across servers.",
    image:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    liveUrl: "https://example.com/inframonitor",
    githubUrl: "https://github.com/harmainfaisall/inframonitor",
    technologies: ["Go", "Docker", "Prometheus", "Grafana", "Linux"],
  },
];
