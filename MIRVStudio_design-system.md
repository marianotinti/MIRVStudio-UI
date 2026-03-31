# MIRV Studio Design System

## Purpose
This document defines the visual system, interaction rules, and implementation constraints for MIRV Studio. It is the canonical design reference for UI work across `projects`, `pipeline`, `assets`, `board`, `studio`, and `qa`.

---

## 1. Creative North Star
**The Orchestrator's Console**

MIRV Studio is a professional AI video operating surface, not a friendly generic SaaS dashboard. The interface must feel technical, calm, high-density, and trustworthy. The product should privilege preview, execution clarity, and production traceability over decorative UI.

### Core product goals
- Make visual output the hero.
- Keep advanced controls close, but secondary.
- Make AI execution state legible.
- Preserve precision under high information density.
- Support expert workflows without turning the interface into noise.

---

## 2. Design Pillars

### 2.1 Preview-first
Large preview areas take precedence over form chrome. Controls belong in side panels, drawers, or scoped toolbars.

### 2.2 Layered complexity
The UI should progressively disclose depth:
- **Operation layer:** review, create, approve, route.
- **Advanced layer:** references, patch controls, generation settings.
- **Debug layer:** logs, payloads, provider state, lineage.

### 2.3 Safety-gated execution
High-cost actions must feel consequential:
- batch generation
- render export
- canonical promotion
- destructive retries / resets

### 2.4 Traceability by default
Generated assets, jobs, patches, and approvals must expose origin, status, and lineage.

---

## 3. Visual Language

### Typography
- **Primary UI / headings:** Geist Sans or Inter
- **Body:** Inter
- **Logs / payloads / IDs / timings:** Geist Mono or equivalent monospace

### Tone
- Technical
- Premium
- Controlled
- Dense, but readable
- Never bubbly or toy-like

---

## 4. Color System

### Dark baseline
- `background`: `#0A0A0B`
- `surface`: `#131314`
- `surface-low`: `#1C1C1E`
- `surface-high`: `#201F20`
- `surface-highest`: `#353436`
- `primary`: `#6366F1`
- `primary-soft`: `#8083FF`
- `primary-pale`: `#C0C1FF`
- `success`: `#10B981`
- `warning`: `#F59E0B`
- `danger`: `#EF4444`
- `text-primary`: `#F5F5F6`
- `text-secondary`: `#C7C4D7`
- `text-muted`: `#908FA0`
- `outline`: `rgba(255,255,255,0.08)`

### Rules
- Avoid pure black and pure white.
- Indigo is reserved for focus, action, active AI intelligence, and selected states.
- Success, warning, and danger must remain semantically strict.

### Sectioning rule
Prefer surface shifts over aggressive borders.
Use borders sparingly for:
- input affordance
- tables with dense rows
- accessibility reinforcement
- floating overlays

---

## 5. Elevation & Depth

Depth comes primarily from tonal contrast and selective blur.

### Elevation model
- **Base canvas:** `background`
- **Default panels:** `surface`
- **Nested containers:** `surface-high` / `surface-low`
- **Floating panels / selected containers:** `surface-highest`

### Floating surfaces
Modals, popovers, and ephemeral panels may use:
- `backdrop-blur`
- tinted ambient shadow
- subtle outline

### Avoid
- heavy grey drop shadows
- cartoon glow
- thick separators

---

## 6. Spacing, Shape, Density

### Radii
- `sm`: 8px
- `md`: 12px
- `lg`: 16px
- avoid radii larger than 16px in core product UI

### Density
This is an expert tool. Dense layouts are acceptable when hierarchy is strong.

### Layout rhythm
- Prefer consistent internal spacing scales.
- Use whitespace instead of divider spam.
- Keep metadata visually secondary but always available.

---

## 7. Core Components

### Primitives
Canonical base set:
- Button
- Input
- Textarea
- Select
- Card
- Badge
- Tabs
- Dialog
- Sheet
- Tooltip
- Table
- ScrollArea
- DropdownMenu
- Command

### Product components
Must exist above primitives:
- `ProjectStatusBadge`
- `JobStatusBadge`
- `ApprovalChip`
- `AssetCard`
- `PipelineTerminal`
- `RenderQueueItem`
- `ProviderPill`
- `ModelBadge`
- `CostIndicator`
- `LatencyLabel`
- `ProvenanceList`

### Buttons
- **Primary:** indigo emphasis, high contrast, decisive
- **Secondary:** low-emphasis container or outline
- **Tertiary/Ghost:** toolbar and utility actions
- **Danger:** only for destructive actions

### Inputs
- dark recessed surface
- clear focus state
- labels always explicit
- placeholders never carry semantic load alone

### Tables and lists
- optimized for scanning
- row hover via tonal shift
- support keyboard focus and selected state

---

## 8. Workspace Patterns

### 8.1 Projects
High-level production overview:
- project health
- status
- movement
- queue summary

### 8.2 Pipeline
Operational command center:
- queued / running / failed / done
- provider and model visibility
- logs
- retry / failure stage
- duration / cost / lineage

### 8.3 Assets
Reviewable library:
- asset preview
- kind
- approval state
- source / derived / patched lineage

### 8.4 Board
Spatial pre-production environment:
- references
- grouping
- scene ideation
- loose authorship

### 8.5 Studio
Editorial environment:
- preview at center
- timeline and media pool as siblings
- inspector as scoped control surface
- export separated from preview

### 8.6 QA
Editorial validation surface:
- baseline vs current
- patch request path
- approval / rejection clarity
- decision trace

---

## 9. Interaction Principles

- Target fast perceived response for local UI interactions.
- The system should always communicate what is happening now.
- Expensive actions need explicit state and feedback.
- Selected context should remain visible.
- Keyboard navigation must work in all primary workflows.

---

## 10. Accessibility Rules

Minimum requirements:
- visible focus states
- keyboard accessibility for navigation and tables
- semantic headings
- proper labels for controls
- sufficient contrast
- no state communicated by color alone
- scrollable regions with clear ownership

---

## 11. Product Data Surfaces

The UI is driven by product entities, not screens. The canonical entities are:
- `Project`
- `Scene`
- `Asset`
- `Job`
- `Patch`
- `Render`
- `Approval`

UI components should render domain contracts, not ad-hoc view models.

---

## 12. Motion & Feedback

- Use restrained motion.
- Favor fades, subtle scale, and panel transitions.
- Avoid playful bounces.
- Loading states should communicate execution, not entertainment.
- AI-active states may use subtle indigo glow or pulse, never loud animation.

---

## 13. Implementation Rules for This Repo

### File placement
Recommended canonical location:
- `docs/design/design-system.md`

Optional support files:
- `docs/design/component-inventory.md`
- `docs/design/tokens.md`
- `docs/design/workspace-patterns.md`

### Mapping to code
- tokens -> `src/index.css` or `src/styles/tokens.css`
- primitives -> `src/components/ui/*`
- product components -> `src/components/product/*`
- domain contracts -> `src/domain/*`

### Governance
Any new feature touching visual language or shared components should align with this document before introducing new UI patterns.

---

## 14. Do / Don't

### Do
- Design for expert workflows.
- Use preview as the center of gravity.
- Keep execution state explicit.
- Encode approval, patching, and lineage clearly.
- Prefer tonal layers over visual clutter.

### Don't
- Do not build generic SaaS chrome.
- Do not use soft bubbly styling.
- Do not rely on thick borders for structure.
- Do not let debug payloads invade the main visual hierarchy.
- Do not mix preview logic, editor state, and render execution into one component.

---

## 15. Immediate Follow-up Checklist

1. Link this document from `README.md`.
2. Audit existing tokens against this spec.
3. Freeze primitives in `src/components/ui`.
4. Create `src/components/product` for MIRV-specific components.
5. Expand domain contracts for `Scene`, `Patch`, `Render`, and `Approval`.
6. Refactor `studio` toward preview/editor/render separation.
7. Refactor `pipeline` and `qa` to expose real job and approval semantics.
