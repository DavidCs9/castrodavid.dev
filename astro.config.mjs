// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    react(),
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: {
        theme: 'one-dark-pro',
        wrap: true,
        langs: [],
      },
      remarkPlugins: [],
      rehypePlugins: [],
      remarkRehype: {
        footnoteLabel: 'References',
        footnoteBackLabel: 'Back to content',
      },
      gfm: true,
    }),
  ],
  image: {
    service: passthroughImageService(),
  },
  markdown: {
    syntaxHighlight: 'shiki',
    shikiConfig: {
      theme: 'one-dark-pro',
      wrap: true,
      langs: [],
    },
    remarkPlugins: [],
    rehypePlugins: [],
  },
});
