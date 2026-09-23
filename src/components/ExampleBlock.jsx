import React, { useState } from 'react';
import { Highlighted } from './Highlighted';

export function ExampleBlock({ex}) {
  const [copied, setCopied] = useState(false);

  function copy() {
    try {
      navigator.clipboard.writeText(ex.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (e) {}
  }

  return (
    <div className="example">
      <div className="example-label">
        <span>{ex.label}</span>
        <button className="copy-btn" onClick={copy} aria-label="Copy this code example">
          {copied ? 'Copied ✓' : 'Copy'}
        </button>
      </div>
      <Highlighted code={ex.code} />
    </div>
  );
}
