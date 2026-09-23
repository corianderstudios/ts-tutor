import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Home } from '../Home';

describe('Home', () => {
  it('renders the version badge and a link to the official docs', () => {
    render(<Home onSelect={vi.fn()} />);
    expect(screen.getByText(/TypeScript 7.0/)).toBeInTheDocument();
    expect(screen.getByRole('link', {name: /Official documentation/})).toHaveAttribute(
      'href',
      'https://www.typescriptlang.org/docs/'
    );
  });

  it('calls onSelect with the right topic id when a topic card is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Home onSelect={onSelect} />);
    await user.click(screen.getByRole('button', {name: /Generics/}));
    expect(onSelect).toHaveBeenCalledWith('generics');
  });
});
