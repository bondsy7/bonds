import { PageTransition } from '@/components/PageTransition';
import { PageHeader } from '@/components/PageHeader';

export default function PlaygroundPage() {
  return (
    <PageTransition>
      <PageHeader
        title="Playground"
        intro="Der Bereich für abgefahrene Experimente: Shader, Partikel, interaktive Netzwerke und generative Visuals."
      />
      <div className="card-glass">
        <p className="text-white/70">Upcoming demos: reactive particle cloud, node graph intelligence map, and cinematic depth transitions.</p>
      </div>
    </PageTransition>
  );
}
