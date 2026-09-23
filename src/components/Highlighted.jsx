import React from 'react';

export function Highlighted({code}) {
  // very small illustrative highlighter, not a full tokenizer
  const escaped = code
    .replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  const html = escaped
    .replace(/(\/\/.*)/g, '<span class="cm">$1</span>')
    .replace(/"([^"]*)"/g, '<span class="str">"$1"</span>')
    .replace(/\b(function|const|let|var|return|interface|type|if|readonly)\b/g, '<span class="kw">$1</span>')
    .replace(/:\s*(number|string|boolean|void|any)\b/g, ': <span class="ty">$1</span>');
  return <pre dangerouslySetInnerHTML={{__html: html}} />;
}
