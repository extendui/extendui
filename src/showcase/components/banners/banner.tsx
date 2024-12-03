// Dependencies: pnpm install lucide-react

import { ArrowRight } from 'lucide-react';

export default function SimpleBanner() {
  return (
    <div className="dark absolute left-0 top-0 w-full rounded-t-lg bg-accent px-4 py-3 text-foreground dark:bg-accent-foreground">
      <p className="flex justify-center text-sm">
        <a href="#" className="group">
          <span className="me-1 text-base leading-none">🚀</span>
          Introducing banner component
          <ArrowRight
            className="-mt-0.5 ms-2 inline-flex opacity-60 transition-transform group-hover:translate-x-0.5"
            size={16}
            strokeWidth={2}
            aria-hidden="true"
          />
        </a>
      </p>
    </div>
  );
}
