import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';

const hobbies = [
  ['Photography', 'Visuelles Denken, Komposition und Storytelling in Frames.'],
  ['Basketball', 'Teamplay, schnelle Entscheidungen und konsequente Execution.'],
  ['Creative Systems', 'Digitale Experimente zwischen Design, Code und Bewegung.']
];

export default function HobbiesPage() {
  return (
    <PageTransition>
      <PageHeader title="Hobbies" intro="Was mich antreibt, wie ich denke und was meinen Stil prägt." />
      <div className="grid gap-4 md:grid-cols-3">
        {hobbies.map(([title, text]) => (
          <article key={title} className="card-glass min-h-44">
            <h2 className="text-xl font-medium">{title}</h2>
            <p className="mt-3 text-sm text-white/70">{text}</p>
          </article>
        ))}
      </div>
    </PageTransition>
  );
}
