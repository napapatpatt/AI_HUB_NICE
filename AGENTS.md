# Repository Guidelines

## Project Structure & Module Organization

- `src/App.jsx` contains the AI Hub landing page and its interactions.
- `src/index.css` contains Tailwind directives, global styles, focus styling, and reduced-motion support.
- `src/main.jsx` mounts the React application.
- `tailwind.config.cjs` contains the theme tokens extracted from the Stitch source.
- `stitch/` retains the original screen HTML and screenshot for reference.
- `PRD.md` remains the product scope reference; unresolved requirements must stay unresolved.

## Build, Test, and Development Commands

Use npm with Node.js 20.19+ or 22.12+.

- `npm install` — install dependencies.
- `npm run dev` — start the Vite development server.
- `npm run build` — create a production build in `dist/`.
- `npm run preview` — serve the production build locally.

No test framework is configured.

## Product and Content Guidelines

Use `PRD.md` as the current product reference. Preserve its stated scope and keep draft or open items unresolved. In particular, validate documentation CTA behavior, latest-model source, popularity ordering, and fallback pricing before implementing those details.

Keep PRD edits traceable: update acceptance criteria when requirements change, add unresolved decisions to “Open Questions,” and keep the source audio intact.

## Coding Style & Naming Conventions

Use descriptive names for page sections and handlers. Keep shared content and configuration out of presentation components. Follow the React, Vite, and Tailwind conventions already present.

## Testing Guidelines

No test framework or coverage target is configured. When tests are introduced, cover responsive layouts, CTA destinations, model and pricing fallbacks, and accessible interactions.

## Accessibility Guidelines

Follow the [A11Y.md guidelines](https://github.com/fecarrico/A11Y.md/blob/main/docs/en/A11Y.md) strictly, using Standard (WCAG 2.2 AA) as the default. Use semantic HTML and native controls, support keyboard operation with visible focus, provide sufficient contrast, and respect reduced-motion preferences. Do not claim conformance without direct implementation evidence and validation. Confirm text alternatives for images and media before adding them, and record accepted exceptions and decisions using the source guide’s templates.

## Commit & Pull Request Guidelines

This workspace has no Git metadata or commit history, so no existing convention can be confirmed. Use short, imperative commit subjects. Pull requests should explain the change, link relevant requirements in `PRD.md`, include screenshots for visual updates, and report checks run.
