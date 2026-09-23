import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ExampleBlock } from '../ExampleBlock';

beforeEach(() => {
  Object.assign(navigator, {
    clipboard: {writeText: vi.fn().mockResolvedValue(undefined)},
  });
});

describe('ExampleBlock', () => {
  it('renders the example label and code', () => {
    render(<ExampleBlock ex={{label: 'A simple example', code: 'const x = 1;'}} />);
    expect(screen.getByText('A simple example')).toBeInTheDocument();
    expect(screen.getByText(/const/)).toBeInTheDocument();
  });

  it('copies the code to the clipboard and shows confirmation', async () => {
    const user = userEvent.setup();
    render(<ExampleBlock ex={{label: 'A simple example', code: 'const x = 1;'}} />);
    const button = screen.getByRole('button', {name: /Copy this code example/});
    await user.click(button);
    expect(navigator.clipboard.writeText).toHaveBeenCalledWith('const x = 1;');
    expect(button).toHaveTextContent('Copied ✓');
  });
});
