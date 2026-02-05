import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-6 py-20">
      <h1 className="text-3xl font-semibold">404 — Page not found</h1>
      <p className="mt-3 text-white/70">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block text-accent">
        Back to home
      </Link>
    </main>
  );
}
