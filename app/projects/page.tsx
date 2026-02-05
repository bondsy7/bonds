import Link from 'next/link';
import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';
import { projects } from '@/data/content';

export default function ProjectsPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Projects"
        intro="Case Studies mit Problem, Lösungsweg, Architektur und Outcome. Filterbar nach AI, Web, Visual und Leadership."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((project) => (
          <Link key={project.slug} href={`/projects/${project.slug}`} className="group card-glass hover:shadow-[0_0_60px_rgba(79,140,255,0.15)]">
            <p className="text-xs uppercase tracking-[0.2em] text-accent">{project.category}</p>
            <h2 className="mt-4 text-2xl font-medium">{project.title}</h2>
            <p className="mt-3 text-sm text-white/70">{project.summary}</p>
            <p className="mt-5 text-sm text-white/90 transition group-hover:translate-x-1">View case study →</p>
          </Link>
        ))}
      </div>
    </PageTransition>
  );
}
