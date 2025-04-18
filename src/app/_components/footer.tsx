import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex-start flex">
      <div className="px-4 sm:px-6">
        <div className="mx-auto w-full max-w-5xl py-8 text-center">
          <p className="text-muted-foreground text-[13px]">
            Built with ❤️ + ☕️ by{' '}
            <Link
              href="https://github.com/kicky1"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-ring/70 hover:text-foreground underline hover:no-underline"
              aria-label="Kicky's Github profile"
            >
              kicky
            </Link>{' '}
            &{' '}
            <Link
              href="https://github.com/rynkovski"
              target="_blank"
              rel="noopener noreferrer"
              className="outline-ring/70 hover:text-foreground underline hover:no-underline"
              aria-label="Rynkovski's Github profile"
            >
              rynkovski
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
