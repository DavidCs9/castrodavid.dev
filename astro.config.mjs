// @ts-check
import { defineConfig, passthroughImageService } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import mdx from '@astrojs/mdx';
import { visualizer } from 'rollup-plugin-visualizer';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        filename: 'dist/stats.html',
        open: false,
        gzipSize: true,
        brotliSize: true,
      }),
    ],
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
