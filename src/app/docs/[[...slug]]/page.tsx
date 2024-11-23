/* eslint-disable @typescript-eslint/await-thenable */

import { ChevronRightIcon, ExternalLinkIcon } from '@radix-ui/react-icons';
import { allDocs } from 'contentlayer/generated';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import Balancer from 'react-wrap-balancer';

import { Mdx } from '@/components/mdx-components';
import { DocsPager } from '@/components/pager';
import { DashboardTableOfContents } from '@/components/toc';
import { badgeVariants } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { getTableOfContents } from '@/lib/toc';
import { absoluteUrl, cn } from '@/lib/utils';

import type { Metadata } from 'next';

type DocPageProps = {
  params: {
    slug: string[];
  };
};

async function getDocFromParams({ params }: DocPageProps) {
  const { slug } = await params;

  // const slug = params.slug?.join('/') || '';
  const doc = allDocs.find((doc) => doc.slugAsParams === (slug?.join('/') || ''));

  if (!doc) return null;

  return doc;
}

export async function generateMetadata({
  params,
}: DocPageProps): Promise<Metadata> {
  const doc = await getDocFromParams({ params });

  if (!doc) return {};

  return {
    title: doc.title,
    description: doc.description,
    openGraph: {
      title: doc.title,
      description: doc.description,
      type: 'article',
      url: absoluteUrl(doc.slug),
    },
  };
}

export async function generateStaticParams(): Promise<
  DocPageProps['params'][]
> {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/'),
  }));
}

export default async function DocPage({ params }: DocPageProps) {
  const doc = await getDocFromParams({ params });

  if (!doc) notFound();

  const toc = await getTableOfContents(doc.body.raw);

  return (
    <div className="relative mb-6 lg:gap-10 xl:grid xl:grid-cols-[1fr_300px]" suppressHydrationWarning >
      <div className="mx-auto w-full min-w-0">
        <div className="mb-4 flex space-x-1 text-sm leading-none text-muted-foreground">
          <div className="truncate">Docs</div>
          <ChevronRightIcon className="size-3.5" />
          <div className="text-foreground">{doc.title}</div>
        </div>
        <div className="space-y-2">
          <h1 className={cn('scroll-m-20 text-3xl font-bold tracking-tight')}>
            {doc.title}
          </h1>
          {doc.description && (
            <p className="text-base text-muted-foreground">
              <Balancer>{doc.description}</Balancer>
            </p>
          )}
        </div>
        {doc.links ? (
          <div className="flex items-center space-x-2 pt-4">
            {doc.links?.doc && (
              <Link
                href={doc.links.doc}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                Docs
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
            {doc.links?.api && (
              <Link
                href={doc.links.api}
                target="_blank"
                rel="noreferrer"
                className={cn(badgeVariants({ variant: 'secondary' }), 'gap-1')}
              >
                API Reference
                <ExternalLinkIcon className="size-3" />
              </Link>
            )}
          </div>
        ) : null}
        <div className="pb-12 pt-8">
          <Mdx code={doc.body.code} />
        </div>
        <DocsPager doc={doc} />
      </div>
      {doc.toc && (
        <div className="hidden text-sm xl:block">
          <div className="sticky top-16 -mt-10 pt-4">
            <ScrollArea className="pb-10">
              <div className="sticky top-16 -mt-10 h-[calc(100vh-3.5rem)] py-12">
                <DashboardTableOfContents toc={toc} />
              </div>
            </ScrollArea>
          </div>
        </div>
      )}
    </div>
  );
}
