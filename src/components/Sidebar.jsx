import React from 'react';
import { TOPICS } from '../data/topics';

export function Sidebar({activeId, onSelect, collapsed, mobileOpen, completed, query, onQueryChange}) {
  const cls = 'sidebar' + (collapsed ? ' collapsed' : '') + (mobileOpen ? ' mobile-open' : '');
  const q = query.trim().toLowerCase();
  const matches = t => t.title.toLowerCase().includes(q);
  const groups = ['Fundamentals', 'Advanced'];
  const anyMatch = TOPICS.some(matches);

  return (
    <nav className={cls} aria-label="Topics">
      <div className="sidebar-inner">
        <button
          className="brand"
          style={{border: 'none', background: 'transparent', cursor: 'pointer', width: '100%'}}
          onClick={() => onSelect('home')}
        >
          <div className="brand-mark" aria-hidden="true">TS</div>
          <div className="brand-text">Learn TypeScript</div>
        </button>

        <input
          type="search"
          className="nav-search"
          placeholder="Search topics…"
          value={query}
          aria-label="Search topics"
          onChange={e => onQueryChange(e.target.value)}
        />

        <button
          className={'nav-item' + (activeId === 'home' ? ' active' : '')}
          aria-current={activeId === 'home' ? 'page' : undefined}
          onClick={() => onSelect('home')}
        >
          <span className="nav-dot" aria-hidden="true" />
          Home
        </button>

        {!anyMatch && <div className="no-results">No topics match your search.</div>}

        {groups.map(group => {
          const items = TOPICS.filter(t => t.group === group && matches(t));
          if (!items.length) return null;
          return (
            <React.Fragment key={group}>
              <div className="nav-group-label">{group}</div>
              {items.map(t => (
                <button
                  key={t.id}
                  className={'nav-item' + (t.id === activeId ? ' active' : '')}
                  aria-current={t.id === activeId ? 'page' : undefined}
                  onClick={() => onSelect(t.id)}
                >
                  <span className="nav-dot" aria-hidden="true" />
                  {t.title}
                  {completed[t.id] && <span className="nav-check" aria-label="completed">✓</span>}
                </button>
              ))}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
}
