# MIRVStudio-UI Implementation Plan

## Baseline Observed On 2026-03-31

- The repo compiles with `npm run typecheck`.
- The application shell is already centralized in `src/components/layout/AppShell.tsx` and route shell metadata already exists in `src/router/routes.tsx`.
- `src/config/navigation.ts` still hardcodes demo project routes under `/projects/alpha/*`.
- `src/hooks/use-route-title.ts` derives titles with pathname string matching instead of route metadata.
- `src/providers/AppProviders.tsx` is still an empty pass-through.
- `src/stores/inspector-store.ts` and `src/stores/ui-store.ts` persist `ReactNode` payloads, which makes shell panels hard to audit and reuse.
- Canonical business contracts are still too thin in `src/types/project.ts`, `src/types/scene.ts`, `src/types/asset.ts`, `src/types/job.ts`, `src/types/patch.ts`, and `src/types/render.ts`.
- Current quality gates are useful but incomplete: route smoke tests and audits exist, but `package.json` still has a placeholder lint script and duplicate `vite` declaration across dependencies and devDependencies.

## Target Folder Ownership

### Keep

- `src/components/ui`: base design-system primitives only.
- `src/components/layout`: shell composition only.
- `src/modules/*`: route-facing feature entrypoints during the transition.

### Add

- `src/components/product`: MIRV-specific visual components such as status badges, queue items, provenance lists, and approval chips.
- `src/domain/project`
- `src/domain/scene`
- `src/domain/asset`
- `src/domain/job`
- `src/domain/patch`
- `src/domain/render`
- `src/domain/approval`
- `src/services/jobs`
- `src/services/providers`
- `src/services/telemetry`
- `src/services/provenance`
- `src/features/studio-preview`
- `src/features/studio-editor`
- `src/features/studio-render`

Each domain folder should converge on the same file contract:

- `types.ts`
- `schema.ts`
- `mappers.ts`
- `fixtures.ts`
- `selectors.ts`

## PR Sequence

## PR 1: Foundation Hygiene And Route Ownership

### Goal

Remove demo navigation assumptions, make the shell route-driven, and set a clean base for future providers and domain work.

### Existing Files To Change

- `package.json`
- `package-lock.json`
- `src/config/navigation.ts`
- `src/router/routes.tsx`
- `src/hooks/use-route-title.ts`
- `src/components/layout/Topbar.tsx`
- `src/components/layout/ProjectHeader.tsx`
- `src/providers/AppProviders.tsx`
- `src/main.tsx`
- `scripts/smoke-route-shell.ts`
- `README.md`

### New Files To Add

- `src/lib/routes.ts`
- `src/router/route-metadata.ts`
- `src/providers/theme-provider.tsx`
- `src/providers/query-provider.tsx`

### Implementation Notes

- Replace hardcoded `/projects/alpha/*` links with route builders that accept `projectId`.
- Move title resolution from pathname heuristics into route metadata.
- Keep `AppProviders` intentionally small, but stop leaving it empty.
- Fix manifest hygiene before growing the repo further: remove duplicate `vite`, replace the placeholder lint command, and document the intended quality gates.

### Acceptance Criteria

- No primary navigation item points to a demo project slug.
- Topbar titles come from route metadata, not `pathname.includes()` checks.
- Shell smoke tests assert both shell layout and route metadata.
- The provider tree has an explicit composition point, even if some providers are still thin wrappers.

## PR 2: Canonical Domain Contracts

### Goal

Stop using route modules as the source of truth for business semantics.

### Existing Files To Change

- `src/types/project.ts`
- `src/types/scene.ts`
- `src/types/asset.ts`
- `src/types/job.ts`
- `src/types/patch.ts`
- `src/types/render.ts`
- `src/modules/projects/types.ts`
- `src/modules/assets/types.ts`
- `src/modules/pipeline/types.ts`
- `src/modules/create/types.ts`
- `src/modules/qa/types.ts`
- `src/modules/settings/types.ts`

### New Files To Add

- `src/domain/project/types.ts`
- `src/domain/project/schema.ts`
- `src/domain/project/mappers.ts`
- `src/domain/project/fixtures.ts`
- `src/domain/project/selectors.ts`
- `src/domain/scene/types.ts`
- `src/domain/scene/schema.ts`
- `src/domain/scene/mappers.ts`
- `src/domain/scene/fixtures.ts`
- `src/domain/scene/selectors.ts`
- `src/domain/asset/types.ts`
- `src/domain/asset/schema.ts`
- `src/domain/asset/mappers.ts`
- `src/domain/asset/fixtures.ts`
- `src/domain/asset/selectors.ts`
- `src/domain/job/types.ts`
- `src/domain/job/schema.ts`
- `src/domain/job/mappers.ts`
- `src/domain/job/fixtures.ts`
- `src/domain/job/selectors.ts`
- `src/domain/patch/types.ts`
- `src/domain/patch/schema.ts`
- `src/domain/patch/mappers.ts`
- `src/domain/patch/fixtures.ts`
- `src/domain/patch/selectors.ts`
- `src/domain/render/types.ts`
- `src/domain/render/schema.ts`
- `src/domain/render/mappers.ts`
- `src/domain/render/fixtures.ts`
- `src/domain/render/selectors.ts`
- `src/domain/approval/types.ts`
- `src/domain/approval/schema.ts`
- `src/domain/approval/mappers.ts`
- `src/domain/approval/fixtures.ts`
- `src/domain/approval/selectors.ts`

### Implementation Notes

- Keep the current `src/types/*` files as compatibility re-exports for one PR if needed, then remove them in a follow-up.
- Add missing domain semantics early: lineage, provenance, approval status, retry metadata, provider metadata, and export intent.
- Schemas should be serializable and tool-friendly from the start.

### Acceptance Criteria

- Every route module consumes canonical domain contracts, not ad hoc local types.
- Job, asset, render, patch, and approval semantics are sufficient to drive UI without inventing extra local state.
- New fixtures are domain-owned instead of living only inside route modules.

## PR 3: Shell Panel Contracts And Product Components

### Goal

Move shared shell surfaces away from arbitrary `ReactNode` payloads and formalize MIRV product components.

### Existing Files To Change

- `src/stores/inspector-store.ts`
- `src/stores/ui-store.ts`
- `src/components/layout/InspectorPanel.tsx`
- `src/components/layout/BottomDrawer.tsx`
- `src/modules/pipeline/PipelinePage.tsx`
- `src/modules/assets/AssetsPage.tsx`
- `src/modules/pipeline/components/JobInspectorContent.tsx`
- `src/modules/pipeline/components/PipelineTerminal.tsx`
- `src/modules/assets/components/AssetInspectorContent.tsx`

### New Files To Add

- `src/components/product/JobStatusBadge.tsx`
- `src/components/product/ProjectStatusBadge.tsx`
- `src/components/product/ApprovalChip.tsx`
- `src/components/product/ProviderPill.tsx`
- `src/components/product/LatencyLabel.tsx`
- `src/components/product/CostIndicator.tsx`
- `src/components/product/RenderQueueItem.tsx`
- `src/components/product/ProvenanceList.tsx`
- `src/features/shell-panel/types.ts`
- `src/features/shell-panel/registry.tsx`

### Implementation Notes

- Stores should keep serializable panel descriptors such as `panelKind`, `entityId`, and `context`, not mounted JSX.
- The shell should resolve descriptors into components through a registry layer.
- Product components should absorb repeated business semantics that are currently embedded inside modules.

### Acceptance Criteria

- Inspector and bottom drawer state are traceable and testable.
- Pipeline and assets pages declare shell intent instead of passing mounted component trees into Zustand.
- Repeated status rendering is consolidated into product components.

## PR 4: Jobs, Providers, And Telemetry

### Goal

Make pipeline state operational instead of decorative.

### Existing Files To Change

- `src/types/job.ts` or compatibility exports from it
- `src/types/render.ts` or compatibility exports from it
- `src/modules/pipeline/PipelinePage.tsx`
- `src/modules/pipeline/PipelineView.tsx`
- `src/modules/pipeline/components/JobsTable.tsx`
- `src/modules/pipeline/components/JobInspectorContent.tsx`
- `src/modules/pipeline/hooks/use-pipeline.ts`
- `src/modules/pipeline/api/pipeline.api.ts`
- `src/lib/event-bus.ts`
- `src/providers/AppProviders.tsx`

### New Files To Add

- `src/services/jobs/job-service.ts`
- `src/services/jobs/job-events.ts`
- `src/services/jobs/job-selectors.ts`
- `src/services/providers/provider-adapter.ts`
- `src/services/providers/fal-adapter.ts`
- `src/services/providers/internal-adapter.ts`
- `src/services/telemetry/telemetry-provider.tsx`
- `src/services/telemetry/events.ts`
- `src/services/telemetry/span-context.ts`

### Implementation Notes

- Expand `Job` to include kind, provider, model, retry policy, timing, lineage, and failure stage.
- Expand `Render` to represent export requests and outputs, not just static files.
- Turn the event bus into named event contracts that can feed telemetry and future adapters.

### Acceptance Criteria

- Pipeline can represent queued, running, failed, retried, and succeeded jobs with meaningful metadata.
- Telemetry has a stable provider boundary and canonical event names.
- Provider-specific details are isolated behind adapters.

## PR 5: Provenance, Patching, And QA Semantics

### Goal

Make QA and assets reflect approval and lineage, not just mock presentation.

### Existing Files To Change

- `src/types/asset.ts` or compatibility exports from it
- `src/types/patch.ts` or compatibility exports from it
- `src/modules/assets/AssetsPage.tsx`
- `src/modules/assets/AssetsView.tsx`
- `src/modules/assets/components/AssetGrid.tsx`
- `src/modules/assets/components/AssetInspectorContent.tsx`
- `src/modules/assets/hooks/use-assets.ts`
- `src/modules/qa/QAView.tsx`
- `src/modules/qa/QAPage.tsx`

### New Files To Add

- `src/services/provenance/provenance-types.ts`
- `src/services/provenance/provenance-selectors.ts`
- `src/services/provenance/lineage.ts`
- `src/components/product/PatchRequestComposer.tsx`
- `src/domain/approval/types.ts`
- `src/domain/approval/schema.ts`

### Implementation Notes

- Add provenance to assets and renders before introducing any heavy compliance implementation.
- QA actions should operate on explicit approval and patch contracts with audit-friendly payloads.

### Acceptance Criteria

- Every asset can explain origin, derivation, approval state, and export readiness.
- QA UI is driven by approval and patch contracts instead of mock-only labels.

## PR 6: Studio Split And Tool-Friendly Actions

### Goal

Break the monolithic studio surface into preview, editor, and render concerns, while defining action contracts that can later back MCP or other agent integrations.

### Existing Files To Change

- `src/modules/studio/StudioPage.tsx`
- `src/modules/studio/StudioView.tsx`
- `src/modules/board/BoardPage.tsx`
- `src/modules/create/CreatePage.tsx`
- `src/modules/create/CreateView.tsx`
- `src/lib/api-client.ts`

### New Files To Add

- `src/features/studio-preview/ScenePreview.tsx`
- `src/features/studio-preview/AssetPreview.tsx`
- `src/features/studio-editor/editor-store.ts`
- `src/features/studio-editor/timeline-selectors.ts`
- `src/features/studio-render/render-payload-builder.ts`
- `src/features/studio-render/export-settings.ts`
- `src/features/studio-render/composition-schema.ts`
- `src/services/actions/create-project.ts`
- `src/services/actions/create-scene.ts`
- `src/services/actions/generate-scene-assets.ts`
- `src/services/actions/submit-job.ts`
- `src/services/actions/retry-job.ts`
- `src/services/actions/create-patch.ts`
- `src/services/actions/approve-asset.ts`
- `src/services/actions/reject-asset.ts`
- `src/services/actions/request-render-export.ts`
- `src/services/actions/get-project-lineage.ts`

### Implementation Notes

- Keep preview logic separate from editable authoring state.
- Export should create a render job contract, not perform client-owned rendering work.
- Action inputs and outputs should remain serializable and schema-backed.

### Acceptance Criteria

- Studio no longer owns every concern directly.
- Export is modeled as a render job request.
- Core product actions are stable enough to expose through tool integrations later.

## Suggested Delivery Rhythm

- Week 1: PR 1
- Week 2: PR 2 and PR 3
- Week 3: PR 4 and PR 5
- Week 4: PR 6

## Non-Goals For This Phase

- Full C2PA implementation
- Full MCP server implementation
- Client-side final rendering pipeline
- Complex multi-provider orchestration in the frontend

## Baseline Gates To Keep Green On Every PR

- `npm run typecheck`
- `npm run smoke:routes`
- `npm run audit:imports`
- `npm run audit:branding`
- `npm run audit:mocks`

If a PR cannot keep those gates green, its scope is too large.