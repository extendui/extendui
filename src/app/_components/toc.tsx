'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function TableOfContents() {
  const [activeSection, setActiveSection] = useState('');

  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'features', title: 'Features' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'conclusion', title: 'Conclusion' },
  ];
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' },
    );

    sections.forEach((section) => {
      const element = document.getElementById(section.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-64 lg:block">
      <ScrollArea className="h-full py-4">
        <nav aria-label="Table of contents">
          <h2 className="mb-4 text-lg font-semibold">Table of Contents</h2>
          <ul>
            {sections.map((section) => (
              <motion.li
                key={section.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <a
                  href={`#${section.id}`}
                  className={cn(
                    `block border-l-2 px-4 py-2 text-sm transition-colors ${activeSection === section.id
                      ? 'border-emerald-500 text-emerald-500 dark:border-emerald-500'
                      : 'border-muted text-muted-foreground'
                    } `,
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(section.id)?.scrollIntoView({
                      behavior: 'smooth',
                    });
                  }}
                >
                  {section.title}
                </a>
              </motion.li>
            ))}
          </ul>
        </nav>
      </ScrollArea>
    </aside>
  );
}

// Example usage
function ExamplePage() {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'getting-started', title: 'Getting Started' },
    { id: 'features', title: 'Features' },
    { id: 'api-reference', title: 'API Reference' },
    { id: 'conclusion', title: 'Conclusion' },
  ];

  return (
    <div className="flex">
      <main className="flex-1 my-6">
        {sections.map((section) => (
          <section key={section.id} id={section.id} className="mb-16">
            <h2 className="mb-4 text-2xl font-bold">{section.title}</h2>
            <p className="text-muted-foreground">
              This is the content for the {section.title.toLowerCase()} section.
              Scroll down to see the table of contents highlight update.
            </p>
            {/* Add more content here */}
            <div className="h-[50vh]" /> {/* Spacer for demonstration */}
          </section>
        ))}
      </main>
    </div>
  );
}

export { ExamplePage as Component };
