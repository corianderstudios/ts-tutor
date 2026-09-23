import React, { useState, useRef, useEffect } from "react";
import { TOPICS } from "./data/topics";
import { STARTERS } from "./data/starters";
import { Sidebar } from "./components/Sidebar";
import { Home } from "./components/Home";
import { ExampleBlock } from "./components/ExampleBlock";
import { Playground } from "./components/Playground";
import { QuizSection } from "./components/QuizSection";

export function App() {
  const [activeId, setActiveId] = useState("home");
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState("light");
  const [query, setQuery] = useState("");
  const [completed, setCompleted] = useState({});
  const topic = TOPICS.find((t) => t.id === activeId);
  const topicIndex = topic ? TOPICS.indexOf(topic) : -1;
  const nextTopic = topicIndex >= 0 ? TOPICS[topicIndex + 1] : null;
  const contentRef = useRef(null);

  useEffect(() => {
    let saved = "light";
    try {
      saved = localStorage.getItem("ts-tutor-theme") || "light";
    } catch (e) {}
    setTheme(saved);
    try {
      const p = JSON.parse(localStorage.getItem("ts-tutor-progress") || "{}");
      setCompleted(p);
    } catch (e) {}
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    try {
      localStorage.setItem("ts-tutor-theme", theme);
    } catch (e) {}
  }, [theme]);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [activeId]);

  function markComplete(id) {
    setCompleted((prev) => {
      if (prev[id]) return prev;
      const next = { ...prev, [id]: true };
      try {
        localStorage.setItem("ts-tutor-progress", JSON.stringify(next));
      } catch (e) {}
      return next;
    });
  }

  function select(id) {
    setActiveId(id);
    setMobileOpen(false);
  }

  const starter =
    STARTERS[activeId] ||
    '// Try writing some TypeScript here\nconsole.log("hello");';

  return (
    <>
      <div
        className={"overlay" + (mobileOpen ? " show" : "")}
        onClick={() => setMobileOpen(false)}
      />
      <div className="app">
        <Sidebar
          activeId={activeId}
          onSelect={select}
          collapsed={collapsed}
          mobileOpen={mobileOpen}
          completed={completed}
          query={query}
          onQueryChange={setQuery}
        />
        <div className="main">
          <div className="topbar">
            <button
              className="icon-btn hamburger"
              aria-label="Open menu"
              onClick={() => setMobileOpen((v) => !v)}
            >
              <span aria-hidden="true">☰</span>
            </button>
            <button
              className="icon-btn desktop-toggle"
              aria-label={collapsed ? "Show sidebar" : "Hide sidebar"}
              onClick={() => setCollapsed((v) => !v)}
            >
              <span aria-hidden="true">{collapsed ? "»" : "«"}</span>
            </button>
            <div className="crumb">
              Learn TypeScript / <b>{topic ? topic.title : "Home"}</b>
            </div>
            <div className="progress-badge">
              {Object.keys(completed).length} / {TOPICS.length} done
            </div>
            <button
              className="icon-btn"
              aria-label={
                theme === "light"
                  ? "Switch to dark mode"
                  : "Switch to light mode"
              }
              onClick={() =>
                setTheme((t) => (t === "light" ? "dark" : "light"))
              }
            >
              <span aria-hidden="true">{theme === "light" ? "☾" : "☀"}</span>
            </button>
          </div>

          {topic ? (
            <main className="content" ref={contentRef}>
              <h1 className="topic-title">{topic.title}</h1>
              <p className="topic-desc">{topic.desc}</p>
              <h2 className="section-h">Examples</h2>
              {topic.examples.map((ex, i) => (
                <ExampleBlock ex={ex} key={i} />
              ))}
              <h2 className="section-h">Try it yourself</h2>
              <Playground key={activeId} topicId={activeId} starter={starter} />
              <QuizSection
                key={activeId + "-quiz"}
                topicId={activeId}
                onComplete={markComplete}
              />
              <div className="next-nav">
                {nextTopic ? (
                  <button
                    className="next-btn"
                    onClick={() => select(nextTopic.id)}
                  >
                    Next: {nextTopic.title} →
                  </button>
                ) : (
                  <button className="next-btn" onClick={() => select("home")}>
                    Back to Home
                  </button>
                )}
              </div>
            </main>
          ) : (
            <Home onSelect={select} />
          )}
        </div>
      </div>
    </>
  );
}
