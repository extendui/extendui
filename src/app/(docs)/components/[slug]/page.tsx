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

type DocPageProps = {
    params: { slug: string };
}

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join('src/mdx-components'));
    const params = files.map((filename) => ({
        slug: filename.replace('.mdx', ''),
    }));
    return params;
}

export async function generateMetadata({
    params,
}: DocPageProps): Promise<Metadata> {
    const doc: any = await getPost(params.slug);

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

async function getPost(slug: string) {
    try {
        const filePath = path.join('src/mdx-components', `${slug}.mdx`);
        if (!fs.existsSync(filePath)) {
            return null;
        }

        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const doc = matter(fileContent);

        if (!doc) {
            return null;
        }

        return doc;
    } catch (error) {
        console.error("Error fetching post:", error);
        return null;
    }
}

export default async function Page({ params }: DocPageProps) {
    const { slug } = params;
    const doc: any = await getPost(slug);

    if (!doc) {
        notFound();
    }

    return (
        <main>
            <div className="mx-auto w-full min-w-0 pt-6">
                <div className="mb-4 flex items-center space-x-1 text-sm leading-none text-muted-foreground">
                    <div className="truncate">Components</div>
                    <ChevronRightIcon className="h-3.5 w-3.5" />
                    <div className="text-foreground">{doc.data.title}</div>
                </div>
                <div className="space-y-2">
                    <h1 className={cn("scroll-m-20 text-3xl font-bold tracking-tight")}>
                        {doc.data.title}
                    </h1>
                    {doc.data.description && (
                        <p className="text-base text-muted-foreground">
                            <Balancer>{doc.data.description}</Balancer>
                        </p>
                    )}
                </div>
                <div className="pb-12 pt-8">
                    <MDXRemote
                        source={doc.content}
                        components={mdxComponents}
                    />
                </div>
            </div>
        </main>
    );
}
