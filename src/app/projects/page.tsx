import React from "react";
import KineticProjects from "@/components/ui/kinetic-projects";

export const metadata = {
  title: "Selected Projects | Harmain Faisal",
  description: "Interactive showcase of full-stack, DevOps, and cloud architecture projects.",
};

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-neutral-950">
      <KineticProjects />
    </main>
  );
}
