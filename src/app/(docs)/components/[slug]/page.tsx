import fs from "node:fs";
import path from "node:path";
import React from "react";
import dynamic from "next/dynamic";

export async function generateStaticParams() {
    const files = fs.readdirSync(path.join("src/mdx-components"));
    const params = files.map((filename) => ({
        slug: filename.replace(".mdx", ""),
    }));
    return params;
}

export default async function Page({ params }: { params: { slug: string } }) {
    const { slug } = params;
    const MDXContent = dynamic(() => import(`@/mdx-components/${slug}.mdx`));

    return (
        <div className="max-w-3xl z-10 w-full items-center justify-between">
            <MDXContent />
        </div>
    );
}
