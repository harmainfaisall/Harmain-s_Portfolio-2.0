/**
 * ============================================================================
 * PORTFOLIO PROJECTS DATA
 * ============================================================================
 * 
 * Featured projects built by Harmain Faisal.
 */

export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "01",
    title: "Coffiora",
    category: "Full-Stack Development",
    description:
      "Premium artisanal coffee website featuring dark luxury visuals, interactive coffee blend explorer, order customization, and immersive storytelling.",
    image: "/assets/coffiora.png",
    liveUrl: "https://coffiora.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Coffiora",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Animations"],
  },
  {
    id: "02",
    title: "ServiConnect",
    category: "Full-Stack Web App",
    description:
      "A service booking web app built for a hackathon, designed to connect users with local service providers through a simple booking experience.",
    image: "/assets/serviconnect.png",
    liveUrl: "https://serviconnect-hackathonproject.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Hackathon-ServiConnect",
    technologies: ["React", "TypeScript", "Vite", "Tailwind CSS"],
  },
  {
    id: "03",
    title: "Delicious Bites",
    category: "Food Ordering Web App",
    description:
      "Responsive food ordering website featuring category filtering, shopping cart, real-time price calculation, login/signup flow, and an interactive checkout experience.",
    image: "/assets/delicious-bites.png",
    liveUrl: "https://delicious-bites-practiceweb.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Delicious-Bites",
    technologies: ["JavaScript", "HTML5", "CSS3", "Shopping Cart"],
  },
  {
    id: "04",
    title: "Figma Clone",
    category: "UI Clone / Frontend",
    description:
      "Pixel-perfect recreation of the official Figma design canvas and toolbars built strictly with pure HTML, modern CSS Grid, and custom property design tokens.",
    image: "/assets/figma-clone.png",
    liveUrl: "https://calm-dolphin-122a18.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/My-First-HACKATHON",
    technologies: ["HTML5", "CSS Grid", "Pixel Perfect", "Design Tokens"],
  },
  {
    id: "05",
    title: "TravelBae",
    category: "Travel & Booking",
    description:
      "Modern destination discovery and travel booking web platform created using Bootstrap components, modal search, carousel sliders, and destination filters.",
    image: "/assets/Travelbae.jpg",
    liveUrl: "https://travelbaeweb.netlify.app",
    githubUrl: "https://github.com/harmainfaisall/Bootstrap-practice",
    technologies: ["Bootstrap 5", "JavaScript", "HTML5", "CSS3"],
  },
  {
    id: "06",
    title: "WordFlow AI",
    category: "AI Landing Page",
    description:
      "Modern AI landing page featuring glassmorphism UI, responsive sections, pricing cards, and engaging call-to-action design.",
    image: "/assets/wordflowai.png",
    liveUrl: "https://landingpagewordflowai.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Syntecxhub_Project1_landingpage",
    technologies: ["AI Landing Page", "Modern UI", "Glassmorphism", "Responsive"],
  },
  {
    id: "07",
    title: "Image Gallery",
    category: "Media & Web App",
    description:
      "Responsive image gallery with smooth category filters, interactive lightbox full-screen modal zoom, and optimized lazy-loading assets.",
    image: "/assets/image-gallery.png",
    liveUrl: "https://codealphaprojectimagegallery.netlify.app/",
    githubUrl: "https://github.com/harmainfaisall/Codealpha-project1-imagegallery",
    technologies: ["JavaScript", "CSS Grid", "Lightbox", "Responsive"],
  },
];
