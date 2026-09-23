# Learn TypeScript — React App

A multi-file React (Vite) version of the interactive TypeScript tutorial: sidebar
navigation with search, a homepage, per-topic examples with copy buttons, a live
TypeScript playground, quizzes with progress tracking, and light/dark mode.

## Project structure

```
index.html                  Vite entry HTML (loads the TypeScript compiler for the playground)
src/
  main.jsx                  React root
  App.jsx                   Top-level layout, routing between Home/topics, theme & progress state
  styles.css                All styles (CSS variables drive light/dark theming)
  setupTests.js              Vitest + jest-dom setup
  data/
    topics.js               Topic content: titles, descriptions, code examples
    starters.js              Starter code for the playground, per topic
    quizzes.js               Quiz questions, per topic
  components/
    Sidebar.jsx              Collapsible/hamburger nav with search + completion checkmarks
    Home.jsx                 Landing page with version info and topic grid
    ExampleBlock.jsx          A single code example with a "Copy" button
    Highlighted.jsx           Lightweight code syntax highlighting
    Playground.jsx           The live TypeScript editor + runner
    QuizSection.jsx           Per-topic quiz questions and completion tracking
    __tests__/               Component tests
  __tests__/
    App.test.jsx             Top-level integration tests
```

## Running it

```
npm install
npm run dev
```

Then open the URL Vite prints (usually http://localhost:5173).

To build a static production bundle:

```
npm run build
npm run preview
```

## Testing

Tests use [Vitest](https://vitest.dev) and [React Testing Library](https://testing-library.com/react).

```
npm test          # run once
npm run test:watch  # watch mode
```

Coverage includes: sidebar search/filtering and active-state, the homepage's
topic grid, per-topic quizzes (answering, feedback, and the completion
callback), the playground (editor value, running code, error display, and
per-topic localStorage persistence), the copy-to-clipboard button, and a few
top-level App integration tests (navigation and theme toggling).

The Playground's tests stub `window.ts` (normally provided by the CDN script
in `index.html`) since the real TypeScript compiler isn't loaded in the jsdom
test environment.

## Notes

- Components are written in JSX (converted from an earlier `React.createElement`
  version).
- The TypeScript compiler used by the Playground is loaded via a `<script>` tag
  in `index.html` (from cdnjs) rather than bundled as an npm dependency, since
  the browser build of `typescript` is large and doesn't need bundling.
- Theme, quiz progress, and playground code are all persisted to the browser's
  `localStorage`, same as before.
