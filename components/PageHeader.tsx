export function PageHeader({ title, intro }: { title: string; intro: string }) {
  return (
    <header className="mb-10 space-y-3">
      <h1 className="text-4xl font-semibold md:text-5xl">{title}</h1>
      <p className="max-w-3xl text-white/70">{intro}</p>
    </header>
  );
}
