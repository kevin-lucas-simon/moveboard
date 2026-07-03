# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm start       # dev server (Vite, localhost:5173)
npm run build   # production build → dist/
npm run serve   # preview production build
```

TypeScript errors surface as overlay errors in the dev server (via `vite-plugin-checker`). There is no separate lint or test script.

## Architecture Overview

MoveBoard is a gyroscope-driven 3D puzzle game with a built-in level editor. It is a React + TypeScript SPA built on Vite. The two major subsystems are the **game experience** and the **level editor**, both driven by the same JSON-based level data model.

### Data Model (`src/data/model/`)

The level format is a tree of **structures** and **elements**:

- **`LevelModel`** — top-level; holds a flat map of `{[StructureID]: StructureModel}` keyed by UUID, plus a `start` chunk ID.
- **`StructureModel`** subtypes (`StructureTypes` enum): `Chunk`, `Coloring`, `Section`. A `Chunk` is a self-contained room; it contains a flat map of `{[ElementID]: ElementModel}`.
- **`ElementModel`** subtypes (`ElementTypes` enum): `BasicBlock`, `FloorBlock`, `BarrierBlock`, `BounceBlock`, `ButtonBlock`, `DoorBlock`, `SpinnerBlock`, `Joint`, `Group`.
- `Joint` elements are the connective tissue between chunks — each joint holds a `neighbour: ChunkID` and a `vision` value (how many chunks deep to pre-render).

Factories in `src/data/factory/` (`ElementFactory`, `StructureFactory`, `EditorFactory`) are the canonical way to create new model instances.

### Game Experience (`src/experience/`)

Rendered inside a React Three Fiber `<Canvas>` (WebGPU renderer via `@react-three/fiber`). Entry point is `<Experience>` which wraps:

- **`<Environment>`** — R3F canvas + physics world (`@react-three/rapier`).
- **`<LevelStateProvider>`** — React context + reducer tracking which chunk is active and element interaction state.
- **`<Level>`** — calls `useChunkRenderer` to calculate which chunks are visible (BFS from active chunk via Joint vision values), then renders each as `<Chunk>`.
- **`<Chunk>`** — renders elements via `<Element>` (which dispatches to `ElementExperienceComponents` map) and joint colliders.

Input comes from two providers: `DeviceMotionProvider` (gyroscope) and `KeyboardKeysProvider` (desktop fallback). The player ball physics body is managed by `<Player>`.

Materials use Three.js Node/TSL shaders (`src/experience/material/`): `useNodeBorder` and `useNodeSwirl` build procedural materials from TSL nodes. `useUniform` manages reactive uniform updates.

Chunk world positions are computed by `useChunkRenderer` (`src/experience/world/render/useChunkRenderer.ts`) — it runs a BFS from the active chunk, aligning chunk positions by matching joint offsets between neighbours.

### Level Editor (`src/editor/`)

Entry points: `/editor` → `PageEditorOverview`, `/editor/:editorID` → `PageEditorLevel`.

State is managed by **`editorReducer`** (`src/editor/reducer/`), a composite reducer composed of four partial reducers: `selectorReducer`, `historyReducer`, `simulationReducer`, `levelReducer`. The full editor state is persisted to **IndexedDB via Dexie** (`localEditorDB`) on every state change through the `EditorProvider` `useEffect`.

The editor UI is panel-based. Each `StructureType` maps to an `overviewPanel` + `scenePanel` (and optionally a `detailPanel`) defined in `EditorPanelComponents`. The scene panel renders a live 3D preview using the same `<Experience>` component.

The editor form system (`src/editor/form/`) renders property editors dynamically from `EditorFieldType` descriptors. The `EditorFormFieldMapping` component maps field types to concrete field components.

### Data Layer

- **`localEditorDB`** (Dexie/IndexedDB) — stores editor states locally; used exclusively by the editor.
- **`serverLevelDB`** — fetches `levels.json` (index) and `/level/<id>.json` (level data) from the static server origin; used by the game to load published levels.

### Routing

Three routes: `/` (game), `/editor` (level overview), `/editor/:editorID` (level editing). Defined in `src/page/routes.tsx` using React Router v7.

### Adding a New Element Type

1. Add the type to `ElementTypes` enum.
2. Create a model in `src/data/model/element/block/`.
3. Add factory defaults in `ElementFactory`.
4. Create the R3F experience component in `src/experience/element/block/` and register it in `ElementExperienceComponents`.
5. Register editor panels if needed in `EditorPanelComponents`.
