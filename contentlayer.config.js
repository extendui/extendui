import {
  defineDocumentType,
  defineNestedType,
  makeSource,
} from 'contentlayer2/source-files';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings'; // Import rehype-autolink-headings

/** @type {import('contentlayer/source-files').ComputedFields} */
const computedFields = {
  slug: {
    type: 'string',
    resolve: (doc) => `/${doc._raw.flattenedPath}`,
  },
  slugAsParams: {
    type: 'string',
    resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
  },
};

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `*.mdx`,
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
    slug: {
      type: 'string',
      required: true,
    },
    featured: {
      type: 'boolean',
      default: false,
      required: false,
    },
    component: {
      type: 'boolean',
      default: false,
      required: false,
    },
    toc: {
      type: 'boolean',
      default: true,
      required: false,
    },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: './src/mdx-components',
  documentTypes: [Doc],
  sections: true,
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
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
    ],
  },
});
