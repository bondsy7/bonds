export type ProjectCategory = "AI" | "Web" | "Visual" | "Leadership";

export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  summary: string;
  highlights: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "ai-automation-suite",
    title: "AI Automation Suite",
    category: "AI",
    summary: "Automations for content, ops and lead workflows with reliable delivery.",
    highlights: ["Workflow design", "Quality gates", "Integration ready"],
    stack: ["Next.js", "APIs", "LLM orchestration"]
  },
  {
    slug: "modern-web-platform",
    title: "Modern Web Platform",
    category: "Web",
    summary: "High performance web experience with scalable architecture.",
    highlights: ["App Router", "Performance", "Component system"],
    stack: ["Next.js", "TypeScript", "Tailwind"]
  },
  {
    slug: "visual-studio-pipeline",
    title: "Visual Studio Pipeline",
    category: "Visual",
    summary: "Image and video workflows for consistent high output with style control.",
    highlights: ["Templates", "Automation", "Brand consistency"],
    stack: ["Three.js", "Tooling", "Pipelines"]
  },
  {
    slug: "delivery-leadership",
    title: "Delivery Leadership",
    category: "Leadership",
    summary: "Leading teams from strategy to shipped outcomes with clarity and tempo.",
    highlights: ["Roadmaps", "Stakeholder alignment", "Execution"],
    stack: ["Process", "Systems thinking", "Communication"]
  }
];
