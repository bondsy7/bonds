import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';

export default function ContactPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Contact"
        intro="Lass uns über Produkte, AI-Strategie, Leadership oder ein gemeinsames Projekt sprechen."
      />
      <form className="card-glass max-w-2xl space-y-4">
        <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Name" />
        <input className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3" placeholder="E-Mail" />
        <textarea className="h-36 w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3" placeholder="Nachricht" />
        <button className="rounded-full bg-accent px-6 py-2.5 text-sm font-semibold">Anfrage senden</button>
      </form>
    </PageTransition>
  );
}
