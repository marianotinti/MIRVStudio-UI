import {
  ArrowRight,
  ClipboardList,
  LayoutDashboard,
  Layers,
  PlusSquare,
  Settings,
  ShieldCheck,
  Terminal,
} from 'lucide-react';
import { Link } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { routes } from '@/lib/routes';

const pillars = [
  { label: 'Preview-first', detail: 'Output legible antes que el chrome' },
  { label: 'Layered complexity', detail: 'Operación → avanzado → debug' },
  { label: 'Traceability', detail: 'Estado, linaje y aprobaciones visibles' },
  { label: 'Safety-gated', detail: 'Acciones costosas con peso claro' },
] as const;

const tourSteps = [
  { label: 'Projects', note: 'Salud de producción, estado y colas', path: routes.projects() },
  { label: 'Create', note: 'Inicialización de workspace (mock)', path: routes.create() },
  { label: 'Overview', note: 'Contexto de proyecto', path: routes.projectOverview('summer-campaign-24') },
  { label: 'Pipeline', note: 'Jobs, proveedor, logs', path: routes.projectPipeline('summer-campaign-24') },
  { label: 'Assets', note: 'Biblioteca revisable + inspector', path: routes.projectAssets('summer-campaign-24') },
  { label: 'Board', note: 'Pre-producción espacial', path: routes.projectBoard('summer-campaign-24') },
  { label: 'Studio', note: 'Preview / pool / inspector', path: routes.projectStudio('summer-campaign-24') },
  { label: 'QA', note: 'Validación editorial', path: routes.projectQA('summer-campaign-24') },
  { label: 'Settings', note: 'Controles del workspace', path: routes.settings() },
] as const;

export function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-on-surface">
      {/* Base canvas + tonal lift — design system §5 (evitar glow caricaturesco) */}
      <div
        className="pointer-events-none fixed inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99, 102, 241, 0.08), transparent), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(99, 102, 241, 0.05), transparent)',
        }}
      />

      <header className="relative z-10 border-b border-white/[0.08] bg-background/85 backdrop-blur-xl">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] bg-surface-high text-primary ring-1 ring-white/[0.08]">
              <Terminal className="h-5 w-5" strokeWidth={1.75} />
            </div>
            <div className="min-w-0">
              <p className="font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-on-surface-variant">
                MIRV Studio
              </p>
              <p className="truncate text-sm font-medium text-on-surface">The Orchestrator&apos;s Console</p>
            </div>
          </div>
          <Button asChild variant="outline" size="sm" className="shrink-0 border-white/[0.08] bg-surface/40 text-on-surface hover:bg-surface-high">
            <Link to={routes.settings()}>
              <Settings className="mr-2 h-4 w-4 opacity-80" />
              Settings
            </Link>
          </Button>
        </div>
      </header>

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col gap-10 px-6 py-10 md:gap-12 md:py-12">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,20rem)] lg:items-start">
          <div className="space-y-5">
            <div className="inline-flex items-center gap-2 rounded-[var(--radius-sm)] bg-surface px-2.5 py-1 font-mono text-[0.62rem] uppercase tracking-[0.16em] text-on-surface-variant ring-1 ring-white/[0.06]">
              <Layers className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
              Evaluación UI · datos mock
            </div>
            <h1 className="text-balance text-2xl font-semibold tracking-tight text-on-surface md:text-3xl">
              Superficie de operación para video con IA: preview, ejecución y trazabilidad.
            </h1>
            <p className="max-w-xl text-pretty text-sm leading-relaxed text-on-surface-variant">
              Esta entrada no es un marketing site: es el arranque del shell. Desde aquí entrás al workspace denso (sidebar, tablas,
              paneles) o recorrés los módulos en orden, alineado al design system MIRV — técnico, calmado, escaneable.
            </p>
            <div className="flex flex-wrap gap-2.5 pt-1">
              <Button asChild className="gap-2 shadow-none">
                <Link to={routes.projects()}>
                  <LayoutDashboard className="h-4 w-4" />
                  Entrar al workspace
                  <ArrowRight className="h-4 w-4 opacity-70" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="gap-2 border border-white/[0.06] bg-surface-low shadow-none hover:bg-surface-high">
                <Link to={routes.create()}>
                  <PlusSquare className="h-4 w-4" />
                  Nueva producción
                </Link>
              </Button>
            </div>
          </div>

          <aside className="rounded-[var(--radius-lg)] bg-surface p-4 ring-1 ring-white/[0.08] md:p-5">
            <div className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-on-surface-variant">
              <ShieldCheck className="h-4 w-4 text-primary" strokeWidth={2} />
              Pilares (design system)
            </div>
            <ul className="mt-4 space-y-3 text-sm">
              {pillars.map((p) => (
                <li key={p.label} className="border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
                  <span className="font-medium text-on-surface">{p.label}</span>
                  <p className="mt-0.5 text-xs leading-snug text-on-surface-variant">{p.detail}</p>
                </li>
              ))}
            </ul>
          </aside>
        </section>

        <section className="rounded-[var(--radius-lg)] bg-surface-low/80 p-5 ring-1 ring-white/[0.08] backdrop-blur-sm md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-white/[0.08] pb-4">
            <div>
              <h2 className="flex items-center gap-2 font-mono text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-primary">
                <ClipboardList className="h-4 w-4" strokeWidth={2} />
                Ruta de evaluación
              </h2>
              <p className="mt-2 max-w-2xl text-xs text-on-surface-variant">
                Orden sugerido para cubrir entidades de producto (Project → Pipeline → Assets → QA) sin saltar el contexto del shell.
              </p>
            </div>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[36rem] border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-white/[0.08] font-mono text-[0.62rem] uppercase tracking-[0.14em] text-on-surface-variant">
                  <th className="pb-3 pr-4 font-medium">#</th>
                  <th className="pb-3 pr-4 font-medium">Módulo</th>
                  <th className="pb-3 pr-4 font-medium">Qué mirar</th>
                  <th className="pb-3 font-medium">Ruta</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/[0.06]">
                {tourSteps.map((step, i) => (
                  <tr key={step.path} className="transition-colors hover:bg-surface/60">
                    <td className="py-3 pr-4 font-mono text-xs text-on-surface-variant">{String(i + 1).padStart(2, '0')}</td>
                    <td className="py-3 pr-4">
                      <Link
                        to={step.path}
                        className="font-medium text-on-surface underline decoration-primary/35 underline-offset-[5px] hover:text-primary hover:decoration-primary/60"
                      >
                        {step.label}
                      </Link>
                    </td>
                    <td className="max-w-xs py-3 pr-4 text-xs text-on-surface-variant">{step.note}</td>
                    <td className="py-3 font-mono text-[0.7rem] text-on-surface-variant/90">{step.path}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <p className="border-t border-white/[0.06] pt-6 font-mono text-[0.65rem] text-on-surface-variant">
          Referencia: <span className="text-on-surface/80">MIRVStudio_design-system.md</span> — densidad experta, indigo para foco, bordes
          mínimos.
        </p>
      </main>
    </div>
  );
}
