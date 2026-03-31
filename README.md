# MIRV Studio UI

Frontend base for MIRV Studio, a modular production workspace for projects, pipeline operations, assets, QA, board and studio flows.

## Current Scope

- Vite + React frontend only
- Modular dashboard shell and routing
- Reusable UI primitives inspired by a shadcn-style system
- Domain modules for projects, create, pipeline, assets, QA, settings, board and studio

## Local Development

Prerequisites:

- Node.js 20+
- npm 10+

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

## Project Direction

This repository is the frontend workspace for MIRV Studio and is being refactored toward:

- a real application shell
- route-based navigation
- shared layout primitives
- modular domain boundaries
- reusable stores and infrastructure

## Scripts

- `npm run dev`: start the Vite dev server
- `npm run build`: produce a production build
- `npm run preview`: preview the production build locally
- `npm run lint`: run TypeScript in no-emit mode
