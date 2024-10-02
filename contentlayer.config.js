import { defineDocumentType, makeSource } from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

// ... existing code ...

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    slug: { type: 'string', required: true },
    featured: { type: 'boolean', default: false },
    component: { type: 'boolean', default: false },
    toc: { type: 'boolean', default: true },
  },
  computedFields,
}));

const rehypePlugins = [
  rehypeSlug,
  [
    rehypeAutolinkHeadings,
    {
      properties: {
        className: ['subheading-anchor'],
        ariaLabel: 'Link to section',
      },
    },
  ],
];

export default makeSource({
  contentDirPath: './src/content',
  documentTypes: [Doc],
  sections: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins,
  },
});
