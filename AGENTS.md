# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

MIRV Studio UI is a frontend-only React SPA (Vite + React 19 + TypeScript). All API calls resolve to in-memory mock data — no backend, database, or external services are required. See `README.md` for the full list of npm scripts.

### Running the dev server

```bash
npm run dev          # Vite dev server on http://localhost:3000
```

The server binds to `0.0.0.0:3000` (configured in `package.json`). HMR is enabled by default; set `DISABLE_HMR=true` to disable.

### Quality gates

```bash
npm run lint               # typecheck + smoke:routes (the primary gate)
npm run audit:consistency  # branding + imports + mocks + smoke:routes + typecheck
npm run build              # production build
```

All gates must pass before committing.

### Known caveats

- **React Router v7 data router requirement**: `react-router-dom` at `^7.4.1` resolves to 7.13+ which requires `createBrowserRouter` + `RouterProvider`. The older `BrowserRouter` + `useRoutes` pattern causes a runtime error. See `src/router/index.tsx`.
- **No backend needed**: `VITE_API_BASE_URL` in `.env.example` points to `localhost:4000` but is unused — all modules return mock data. Copy `.env.example` to `.env` for completeness.
- **Package manager**: This project uses **npm** (lockfile is `package-lock.json`). Do not use yarn or pnpm.
