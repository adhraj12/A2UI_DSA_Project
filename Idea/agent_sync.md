# Agent Sync Log: NeuroPlay AI

This file serves as the shared memory for all agents working on this project. Every file created, dependency added, and architectural decision made should be logged here.

## Changelog

### 2026-05-09
- **Initialized Monorepo**: Created root `package.json` with npm workspaces for `apps/*`.
- **Frontend App**: Scaffoled Next.js inside `apps/frontend`. Installed `framer-motion`, `@copilotkit/react-core`, `@copilotkit/react-ui`.
- **CopilotKit Wiring**: Wrapped frontend `RootLayout` in `CopilotKitProvider` and created Next.js API route `/api/copilotkit/route.ts` to forward requests.
- **Python Agent Engine**: Created `apps/agent` using standard `venv` and `pip`. Created `src/server.py` with FastAPI and `copilotkit_exit_endpoint` running a placeholder `neuroplay_agent`.

#### Phase 1: A2UI Engine (Frontend)
- **A2UI Schema Types**: Created `src/lib/a2ui-schema.ts` — defines ALL TypeScript interfaces for the JSON contract between agents and frontend (10 component types, interaction events, layout/theme types).
- **Theme System**: Created `src/lib/themes.ts` — 5 visual themes (cyberpunk, space, fantasy, minimal, hacker) as CSS custom property sets.
- **Component Registry** (`src/components/registry/`):
  - `XPBar.tsx` — animated progress bar with shimmer and pulsing level badge
  - `QuizCard.tsx` — interactive MCQ with correct/incorrect feedback and explanation reveal
  - `GraphVisualizer.tsx` — canvas-based graph with auto-layout, weighted edges, directed arrows
  - `CodeEditor.tsx` — code display with line numbers, highlight lines, copy button, editable mode
  - `ConceptCard.tsx` — info/warning/success/tip cards with staggered bullet animations
  - `MissionTracker.tsx` — mission list with completion tracking and XP rewards
  - `AchievementPopup.tsx` — spring-animated popup with particle effects and auto-dismiss
  - `ArrayVisualizer.tsx` — animated bar chart with highlight/compare/sorted coloring and pointers
  - `ProgressMap.tsx` — vertical node chain with locked/active/completed states
  - `index.ts` — registry map linking A2UI type strings to components
- **DynamicRenderer**: Created `src/components/DynamicRenderer.tsx` — reads A2UI schema, applies theme CSS vars, renders components from registry with AnimatePresence transitions.
- **Test Page**: Created `src/app/test/page.tsx` — hardcoded Binary Search schema to verify all components render correctly with cyberpunk theme. Includes interaction event logger.
