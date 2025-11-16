# Time Efficiency Calculator

A lightweight web application that translates the price of a purchase into the amount of time you need to work to afford it. Enter your salary, choose the pay period, and instantly see the required hours, days, and weeks.

> This pet project is part of the Retelnist portfolio.

## Features

- Intuitive calculator that converts salary and purchase cost into working time
- Animated user experience powered by Framer Motion
- Theme toggle with system preference awareness
- Helpful tips for smarter purchasing decisions
- Responsive design with polished gradients and glassmorphism accents

## Tech Stack

- [Next.js](https://nextjs.org/) App Router
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/) with modern `@tailwindcss/postcss` pipeline
- [Framer Motion](https://www.framer.com/motion/) for interactions
- [lucide-react](https://lucide.dev/) icon set
- [next-themes](https://github.com/pacocoursey/next-themes) for light/dark mode support

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000` to view the app. Hot reloading is enabled, so changes appear immediately.

## Project Structure

```
app/                # App Router entry points and global styles
components/         # UI components (calculator, tips, theming)
lib/                # Domain logic (work metrics calculator)
public/             # Static assets
```

## Available Scripts

- `npm run dev` – start the development server
- `npm run build` – create an optimized production build
- `npm run start` – serve the production build
- `npm run lint` – run linting to ensure code quality

## Deployment

The app is ready for deployment on any Next.js-compatible platform (e.g., Vercel, Netlify). Build with `npm run build` and follow your hosting provider’s instructions.

---

Crafted with care as a showcase project by Retelnist.
