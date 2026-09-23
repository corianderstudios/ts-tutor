import React from 'react';
import { TOPICS } from '../data/topics';

export function Home({onSelect}) {
  return (
    <main className="content">
      <div className="home-badge">● TypeScript 7.0 — the native Go-based compiler</div>
      <h1 className="topic-title">Learn TypeScript</h1>
      <p className="home-lead">
        TypeScript adds static types to JavaScript so editors and the compiler can catch mistakes before your code runs.{' '}
        Version 7.0, released in July 2026, rewrote the compiler in Go and is commonly 8–10x faster than the previous JavaScript-based compiler, with the same type-checking behavior you already rely on.
      </p>
      <div className="home-links">
        <a className="home-link primary" href="https://www.typescriptlang.org/docs/" target="_blank" rel="noopener">
          Official documentation ↗
        </a>
        <a
          className="home-link secondary"
          href="https://www.typescriptlang.org/docs/handbook/release-notes/overview.html"
          target="_blank"
          rel="noopener"
        >
          Release notes ↗
        </a>
      </div>
      <h2 className="section-h">Jump to a topic</h2>
      <div className="home-grid">
        {TOPICS.map(t => (
          <button className="home-card" key={t.id} onClick={() => onSelect(t.id)}>
            <div className="g">{t.group}</div>
            {t.title}
          </button>
        ))}
      </div>
    </main>
  );
}
