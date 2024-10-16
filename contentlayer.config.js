import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { visit } from 'unist-util-visit';
import { rehypeNpmCommand } from './src/lib/rehype-npm-command';

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  url: {
    type: 'string',
    resolve: (post) => `/${post._raw.flattenedPath}`,
  },
  image: {
    type: 'string',
    resolve: (post) =>
      `${process.env.NEXT_PUBLIC_APP_URL}/api/og?title=${encodeURI(post.title)}`,
  },
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
  structuredData: {
    type: 'json',
    resolve: (doc) => ({
      '@context': 'https://schema.org',
      '@type': `BlogPosting`,
      headline: doc.title,
      datePublished: doc.date,
      dateModified: doc.date,
      description: doc.summary,
      image: doc.image,
      url: `https://magicui.design/${doc._raw.flattenedPath}`,
      author: {
        '@type': 'Person',
        name: doc.author,
        url: `https://twitter.com/${doc.author}`,
      },
    }),
  },
};

const LinksProperties = defineNestedType(() => ({
  name: 'LinksProperties',
  fields: {
    doc: {
      type: 'string',
    },
    api: {
      type: 'string',
    },
  },
}));

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      required: true,
    },
    description: {
      type: 'string',
      required: true,
    },
    date: { type: 'date', required: false },
    published: {
      type: 'boolean',
      default: true,
    },
    links: {
      type: 'nested',
      of: LinksProperties,
    },
    featured: {
      type: 'boolean',
      default: false,
      required: false,
    },
    toc: { type: 'boolean', default: true, required: false },
    author: { type: 'string', required: false },
    video: { type: 'string', required: false },
    component: { type: 'boolean', required: false }, // Added field
  },
  // @ts-expect-error is fine
  computedFields,
}));

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Doc],
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'pre') {
            const [codeEl] = node.children;

            if (codeEl.tagName !== 'code') return;

            node.__rawString__ = codeEl.children?.[0].value;
          }
        });
      },
      [
        // @ts-ignore
        rehypePrettyCode,
        {
          theme: 'night-owl',
          keepBackground: false,
          onVisitLine(node) {
            if (node.children.length === 0) {
              node.children = [{ type: 'text', value: ' ' }];
            }
          },
        },
      ],
      () => (tree) => {
        visit(tree, (node) => {
          if (node?.type === 'element' && node?.tagName === 'figure') {
            if (!('data-rehype-pretty-code-figure' in node.properties)) {
              return;
            }

            const preElement = node.children.at(-1);
            if (preElement.tagName !== 'pre') {
              return;
            }

            preElement.properties['__rawString__'] = node.__rawString__;
          }
        });
      },
    ],
  },
});
