import React, { useState } from 'react';

export function Playground({starter, topicId}) {
  const storageKey = 'ts-tutor-code-' + topicId;
  const [code, setCode] = useState(() => {
    try { return localStorage.getItem(storageKey) || starter; } catch (e) { return starter; }
  });
  const [output, setOutput] = useState({text: '', kind: 'empty'});

  function updateCode(v) {
    setCode(v);
    try { localStorage.setItem(storageKey, v); } catch (e) {}
  }

  function run() {
    try {
      const js = window.ts
        ? window.ts.transpileModule(code, {compilerOptions: {module: 99, target: 6, experimentalDecorators: true}}).outputText
        : code;
      const logs = [];
      const fakeConsole = {log: (...args) => logs.push(args.map(a => typeof a === 'object' ? JSON.stringify(a) : String(a)).join(' '))};
      const fn = new Function('console', js);
      fn(fakeConsole);
      setOutput({text: logs.length ? logs.join('\n') : '(no output — try a console.log)', kind: logs.length ? 'ok' : 'empty'});
    } catch (e) {
      setOutput({text: String(e.message || e), kind: 'err'});
    }
  }

  const outputClass = 'pg-output' + (output.kind === 'err' ? ' err' : output.kind === 'empty' ? ' empty' : '');

  return (
    <div className="playground">
      <div className="pg-head">
        <span>Playground — write TypeScript, then run it</span>
        <button className="run-btn" onClick={run}>Run ▸</button>
      </div>
      <textarea
        className="pg-editor"
        value={code}
        spellCheck={false}
        aria-label="TypeScript code editor"
        onChange={e => updateCode(e.target.value)}
      />
      <div className={outputClass} role="status" aria-live="polite">
        {output.text || 'Output will appear here.'}
      </div>
    </div>
  );
}
