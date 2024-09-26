import fs from "node:fs";
import path from "node:path";
import React from "react";
import dynamic from "next/dynamic";
import { notFound } from "next/navigation";  // To handle redirect to a 404 page

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join("src/mdx-components"));
    const params = files.map((filename) => ({
        slug: filename.replace(".mdx", ""),
    }));
    return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;

    const filePath = path.join("src/mdx-components", `${slug}.mdx`);
    if (!fs.existsSync(filePath)) {
        notFound();
    }

    const MDXContent = dynamic(() => import(`@/mdx-components/${slug}.mdx`));

    return (
        <div>
            <MDXContent />
        </div>
    );
}
