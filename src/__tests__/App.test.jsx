import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from '../App';

beforeEach(() => {
  localStorage.clear();
  document.body.removeAttribute('data-theme');
});

describe('App', () => {
  it('shows the homepage by default with a progress badge at 0', () => {
    render(<App />);
    expect(screen.getByText('Learn TypeScript')).toBeInTheDocument();
    expect(screen.getByText(/0 \/ \d+ done/)).toBeInTheDocument();
  });

  it('navigates to a topic from the sidebar and shows a Next button', async () => {
    const user = userEvent.setup();
    render(<App />);
    const nav = screen.getByRole('navigation', {name: 'Topics'});
    await user.click(within(nav).getByRole('button', {name: 'Basics & Type Annotations'}));
    expect(screen.getByRole('heading', {name: 'Basics & Type Annotations', level: 1})).toBeInTheDocument();
    expect(screen.getByRole('button', {name: /Next:/})).toBeInTheDocument();
  });

  it('toggles between light and dark theme', async () => {
    const user = userEvent.setup();
    render(<App />);
    await user.click(screen.getByRole('button', {name: 'Switch to light mode'}));
    expect(document.body.getAttribute('data-theme')).toBe('light');
    await user.click(screen.getByRole('button', {name: 'Switch to dark mode'}));
    expect(document.body.getAttribute('data-theme')).toBe('dark');
  });
});
