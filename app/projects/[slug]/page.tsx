import { notFound } from 'next/navigation';
import { PageTransition } from '@/components/PageTransition';
import { projects } from '@/data/content';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <article className="space-y-6">
        <p className="text-xs uppercase tracking-[0.2em] text-accent">{project.category}</p>
        <h1 className="text-4xl font-semibold md:text-5xl">{project.title}</h1>
        <p className="max-w-3xl text-lg text-white/75">{project.summary}</p>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="card-glass md:col-span-1">
            <h2 className="text-xl font-medium">Challenge</h2>
            <p className="mt-2 text-sm text-white/70">{project.challenge}</p>
          </div>
          <div className="card-glass md:col-span-1">
            <h2 className="text-xl font-medium">Approach</h2>
            <p className="mt-2 text-sm text-white/70">{project.approach}</p>
          </div>
          <div className="card-glass md:col-span-1">
            <h2 className="text-xl font-medium">Outcome</h2>
            <p className="mt-2 text-sm text-white/70">{project.outcome}</p>
          </div>
        </section>

        <section className="card-glass">
          <h2 className="text-xl font-medium">Tech Stack</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span key={tech} className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs">
                {tech}
              </span>
            ))}
          </div>
        </section>
      </article>
    </PageTransition>
  );
}
