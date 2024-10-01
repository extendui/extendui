import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Balancer from 'react-wrap-balancer';
import { allDocs } from 'contentlayer/generated';
import { getTableOfContents } from '@/lib/toc';
import { DashboardTableOfContents } from '@/components/toc';
import { Mdx } from '@/components/mdx-components';

type DocPageProps = {
  params: { slug: string };
};

export async function generateStaticParams(): Promise<
  DocPageProps['params'][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slug,
  }));
}

async function getDocFromParams({ params }: DocPageProps) {
  const slug = params.slug;
  const doc = allDocs.find((doc) => doc.slug === `/${slug}`);

  if (!doc) {
    return null;
  }

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });
  if (!doc) {
    notFound();
  }

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: doc.slug,
    },
  };
}

export default async function Page({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });
  if (!doc) {
    notFound();
  }
  const toc = await getTableOfContents(doc.body.raw);

  return (
    <main className="relative max-w-7xl lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]">
      <div className="mx-auto w-full min-w-0">
        <div className="text-md mb-4 flex items-center space-x-1 leading-none text-muted-foreground">
          <div className="truncate">Components</div>
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-lg text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
      </div>
      <div className="hidden text-sm xl:block">
        {doc.toc && <DashboardTableOfContents toc={toc} />}
      </div>
    </main>
  );
}
