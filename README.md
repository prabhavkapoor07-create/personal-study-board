# Study Board — React (Orchard Dusk)

A from-scratch React + Vite port of `study-board-orchard.html` — same Firebase
project, same streak/heatmap/task logic, same Orchard Dusk visual design.
Lives in its own `react-app/` folder so the existing `index.html` keeps
working untouched until you're ready to swap it in.

## Run it locally

```bash
cd react-app
npm install
npm run dev
```

Opens at `http://localhost:5173`. Google sign-in works immediately —
`localhost` is already an authorized domain on the `tracker-6c3af`
Firebase project (same as the existing live app), so no Firebase config
changes are needed to test.

## What got ported, and how

- **State** (`src/state/reducer.js`) — the original global `S` object and
  its mutation functions (`addTask`, `toggleTask`, `checkStreak`,
  `checkRollover`, ...), rewritten as a pure `(state, action) => newState`
  reducer. Same field names, same math, same rollover/streak rules.
- **Firebase** (`src/firebase.js`, `src/hooks/useAuth.js`,
  `src/hooks/useStudyBoard.js`) — same project config, now via the `firebase`
  npm package instead of CDN `<script type="module">` tags. The debounced
  600ms cloud save and the "first sign-in pushes local data up" behavior
  are preserved.
- **UI** — one component per section (`Hero`, `Dashboard`, `StatsGrid`,
  `HeatmapSection`, `Tabs`, `TodoPanel`, `IdeasPanel`, `ActivityPanel`,
  `SettingsPanel`). All four tab panels stay mounted at once (just
  toggled via an `active` class), matching the original's behavior so
  in-progress typing in one tab isn't lost when you switch tabs.
- **Styling** — `src/styles/index.css` is the same stylesheet from the
  HTML version, with the same class names, so the existing look carries
  over essentially unchanged.
- **Not yet added**: any animation library. Components are split into
  small, focused pieces specifically so animating task completion, the
  heatmap reveal, or tree growth later (e.g. with Framer Motion) is a
  localized change, not a rewrite.

## Deploying this to GitHub Pages (not wired yet)

This is a plain local Vite project right now — no GitHub Actions workflow
or `base` path configured, since that wasn't asked for yet. When you're
ready to put this live alongside (or instead of) the current `index.html`:

1. Set `base: '/personal-study-board/react-app/'` in `vite.config.js`
   (already noted as a comment there) if it'll live at that sub-path —
   skip this if it becomes the new repo root `index.html` instead.
2. Either commit a built `dist/` folder, or add a GitHub Actions workflow
   that runs `npm run build` on push and publishes `dist/` to Pages.
3. No Firebase changes needed — your GitHub Pages domain is already
   authorized for this project from the existing live app.

## Known gap vs. the live app

None functionally — every tab, the heatmap, custom categories, streak
threshold, cloud sync status, and reset all behave the same as the HTML
version. The only intentional omission is the tree-growth animation,
which was explicitly deferred (see the chat history / handoff notes).
