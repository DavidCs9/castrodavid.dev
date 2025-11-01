# David Castro's Personal Website & Blog

This is my personal website and blog built with modern web technologies. The site features a portfolio, blog posts, and information about my experience and skills as a software engineer.

## 🚀 Technologies

- [Astro](https://astro.build) - The web framework for content-driven websites
- [React](https://reactjs.org) - For interactive components
- [TailwindCSS](https://tailwindcss.com) - For styling
- [MDX](https://mdxjs.com) - For blog content
- [Framer Motion](https://www.framer.com/motion/) - For animations
- [Jest](https://jestjs.io) - For testing

## 🏗️ Project Structure

```text
/
├── public/          # Static assets
├── src/
│   ├── components/  # React and Astro components
│   ├── content/     # Blog posts and content
│   ├── layouts/     # Page layouts
│   └── pages/       # Route components
├── astro.config.mjs # Astro configuration
├── tailwind.config.js # Tailwind configuration
└── package.json     # Project dependencies
```

## 🧞 Commands

All commands are run from the root of the project:

| Command              | Action                                       |
| :------------------- | :------------------------------------------- |
| `pnpm install`       | Installs dependencies                        |
| `pnpm dev`           | Starts local dev server at `localhost:4321`  |
| `pnpm build`         | Build your production site to `./dist/`      |
| `pnpm build:analyze` | Build and analyze bundle size                |
| `pnpm preview`       | Preview your build locally, before deploying |
| `pnpm test`          | Run tests using Jest                         |
| `pnpm lint`          | Run ESLint to check for code issues          |
| `pnpm lint:fix`      | Run ESLint and automatically fix issues      |
| `pnpm format`        | Format code using Prettier                   |
| `pnpm format:check`  | Check if code is properly formatted          |
| `pnpm bundle:check`  | Check bundle size against limits             |

## 📝 Features

- Responsive design with TailwindCSS
- Blog with MDX support
- Interactive components with React
- Smooth animations with Framer Motion
- SEO optimized
- Syntax highlighting for code blocks
- Dark mode support
- TypeScript support
- **Automated bundle size monitoring** 📊

## 📦 Bundle Size Monitoring

This project includes automated bundle size tracking to prevent performance regressions:

- **Visual Analysis**: Interactive HTML reports (`dist/stats.html`) showing bundle composition
- **Size Limits**: Configurable limits defined in `.bundlesize.json`
- **CI Integration**: Automated checks on every push to main
- **Pre-commit Hook**: Validates bundle size before committing

For detailed documentation, see [docs/BUNDLE_SIZE_MONITORING.md](docs/BUNDLE_SIZE_MONITORING.md)

## 🎨 Development

The project uses:

- TypeScript for type safety
- TailwindCSS for styling
- React for interactive components
- MDX for blog content
- Jest for testing
