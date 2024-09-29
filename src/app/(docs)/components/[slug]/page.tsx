// src/app/_pages/[slug]/page.tsx

import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import type { Metadata } from "next";
import { ChevronRightIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import Balancer from "react-wrap-balancer";
import { MDXRemote } from 'next-mdx-remote/rsc';
import mdxComponents from '@/components/mdxComponents';
import { allDocs } from "contentlayer/generated"

type DocPageProps = {
    params: { slug: string };
}

export async function generateStaticParams(): Promise<
    DocPageProps["params"][]
> {
    return allDocs.map((doc) => ({
        slug: doc.slug,
    }))
}

async function getDocFromParams({ params }: DocPageProps) {
    const slug = params.slug
    const doc = allDocs.find((doc) => doc.slug === `/${slug}`);

    if (!doc) {
        return null
    }

    return doc
}

export async function generateMetadata({
    params,
}: DocPageProps): Promise<Metadata> {
    const doc = await getDocFromParams({ params })
    if (!doc) {
        notFound();
    }

    return {
        title: doc.title,
        description: doc.description,
        openGraph: {
            title: doc.title,
            description: doc.description,
            type: "article",
            url: doc.slug,
        },
    }
}

export default async function Page({ params }: DocPageProps) {
    const doc = await getDocFromParams({ params })

    if (!doc) {
        notFound();
    }

    return (
        <main>
            <div className="mx-auto w-full min-w-0 pt-6">
                <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
                    <div className="truncate">Components</div>
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                    <div className="text-foreground">{doc.title}</div>
                </div>
                <div className="space-y-2">
                    <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
                        {doc.title}
                    </h1>
                    {doc.description && (
                        <p className="text-base text-muted-foreground">
                            <Balancer>{doc.description}</Balancer>
                        </p>
                    )}
                </div>
                <div className="pb-12 pt-8">
                    <MDXRemote
                        source={doc.body.raw}
                        components={mdxComponents}
                    />
                </div>
            </div>
        </main>
    );
}
