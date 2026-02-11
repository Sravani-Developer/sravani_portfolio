# Portfolio Website (Node.js + Tailwind CSS)

This project is a personal portfolio website focused on clean page creation, responsive layout, and modern UI design using Node.js tooling and Tailwind CSS.

## Tech Stack
- Node.js
- Vite
- Tailwind CSS
- HTML / JavaScript

## Prerequisites
- Node.js 18+ (Node 20 recommended)
- npm
- Git

Check versions:

```bash
node -v
npm -v
git --version
```

## Project Setup
1. Clone the repository:

```bash
git clone <YOUR_REPO_URL>
cd <YOUR_REPO_FOLDER>
```

2. Install dependencies:

```bash
npm install
```

3. Start development server:

```bash
npm run dev
```

Open: `http://localhost:5173`

## Build for Production
Create an optimized build:

```bash
npm run build
```

Preview production build locally:

```bash
npm run preview
```

## Design Focus (Tailwind)
This project is organized around building strong portfolio sections with Tailwind utility classes:
- Hero section (name, role, CTA)
- About section (profile + intro)
- Skills/Tech stack grid
- Projects showcase cards
- Contact section

Suggested Tailwind design practices:
- Use a consistent spacing scale (`px-6`, `py-12`, `gap-6`)
- Keep typography hierarchy clear (`text-4xl`, `text-xl`, `text-base`)
- Build responsive layouts with breakpoints (`sm:`, `md:`, `lg:`)
- Reuse button/card styles as component patterns
- Use subtle hover/transition effects for interactivity

## Typical Workflow
1. Create or update a section in your page.
2. Style using Tailwind utility classes.
3. Check mobile and desktop responsiveness.
4. Refine spacing, color, and typography consistency.
5. Repeat and polish.

## Available Scripts
- `npm run dev` - Run local development server
- `npm run build` - Build production assets
- `npm run preview` - Preview production build locally


