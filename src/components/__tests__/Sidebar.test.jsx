import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Sidebar } from '../Sidebar';

const baseProps = {
  activeId: 'basics',
  onSelect: vi.fn(),
  collapsed: false,
  mobileOpen: false,
  completed: {},
  query: '',
  onQueryChange: vi.fn(),
};

describe('Sidebar', () => {
  it('renders both topic groups and marks the active topic', () => {
    render(<Sidebar {...baseProps} />);
    expect(screen.getByText('Fundamentals')).toBeInTheDocument();
    expect(screen.getByText('Advanced')).toBeInTheDocument();
    expect(screen.getByRole('button', {name: 'Basics & Type Annotations'})).toHaveAttribute(
      'aria-current',
      'page'
    );
  });

  it('shows a checkmark next to completed topics', () => {
    render(<Sidebar {...baseProps} completed={{basics: true}} />);
    expect(screen.getByRole('button', {name: /Basics & Type Annotations/})).toHaveTextContent('✓');
  });

  it('filters the topic list based on the search query', () => {
    render(<Sidebar {...baseProps} query="generic" />);
    expect(screen.getByText('Generics')).toBeInTheDocument();
    expect(screen.queryByText('Enums')).not.toBeInTheDocument();
  });

  it('shows a message when no topics match the search', () => {
    render(<Sidebar {...baseProps} query="zzz-nothing-matches" />);
    expect(screen.getByText('No topics match your search.')).toBeInTheDocument();
  });

  it('calls onSelect with the topic id when a topic is clicked', async () => {
    const user = userEvent.setup();
    const onSelect = vi.fn();
    render(<Sidebar {...baseProps} onSelect={onSelect} />);
    await user.click(screen.getByRole('button', {name: /Generics/}));
    expect(onSelect).toHaveBeenCalledWith('generics');
  });
});
