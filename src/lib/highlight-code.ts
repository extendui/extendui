'use server';

import { codeToHtml } from 'shiki';

export function highlightCode(code: string) {
  const html = codeToHtml(code, {
    lang: 'typescript',
    theme: 'vitesse-dark',
    transformers: [
      {
        code(node) {
          node.properties['data-line-numbers'] = '';
        },
      },
    ],
  });

  return html;
}
