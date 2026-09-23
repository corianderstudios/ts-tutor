import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { Playground } from '../Playground';

beforeEach(() => {
  localStorage.clear();
  // Stub the TypeScript compiler that's normally loaded via a <script> tag
  window.ts = {
    transpileModule: (code) => ({outputText: code}),
  };
});

describe('Playground', () => {
  it('shows the starter code in the editor', () => {
    render(<Playground starter="console.log('hi')" topicId="test-topic" />);
    expect(screen.getByLabelText('TypeScript code editor')).toHaveValue("console.log('hi')");
  });

  it('runs the code and displays console output', () => {
    render(<Playground starter="console.log('hello world')" topicId="test-topic" />);
    fireEvent.click(screen.getByRole('button', {name: /Run/}));
    expect(screen.getByRole('status')).toHaveTextContent('hello world');
  });

  it('shows an error message when the code throws', () => {
    render(<Playground starter="throw new Error('boom')" topicId="test-topic" />);
    fireEvent.click(screen.getByRole('button', {name: /Run/}));
    expect(screen.getByRole('status')).toHaveTextContent('boom');
  });

  it('persists edits to localStorage, scoped per topic', () => {
    render(<Playground starter="console.log(1)" topicId="persist-topic" />);
    const editor = screen.getByLabelText('TypeScript code editor');
    fireEvent.change(editor, {target: {value: 'console.log(2)'}});
    expect(localStorage.getItem('ts-tutor-code-persist-topic')).toBe('console.log(2)');
  });
});
