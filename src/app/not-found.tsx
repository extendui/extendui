import Link from 'next/link';

import { Button } from '@/components/extendedui/button/button';

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100vh-12rem)] flex-col items-center justify-center">
      <p className="mb-4 text-4xl font-bold">404 Not Found</p>
      <p className="mb-4 text-lg">Could not find requested resource</p>
      <Link href="/">
        <Button>Return Home</Button>
      </Link>
    </div>
  );
}
