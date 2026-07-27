import Link from 'next/link';

export default function NotFound() {
  return (
    <section>
      <h1>404</h1>
      <Link href="/">На головну</Link>
    </section>
  );
}
