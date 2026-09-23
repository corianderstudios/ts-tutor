import { describe, it, expect, vi } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QuizSection } from '../QuizSection';

describe('QuizSection', () => {
  it('renders nothing when the topic has no quiz', () => {
    const {container} = render(<QuizSection topicId="not-a-real-topic" onComplete={vi.fn()} />);
    expect(container).toBeEmptyDOMElement();
  });

  it('renders the quiz questions for a topic', () => {
    render(<QuizSection topicId="basics" onComplete={vi.fn()} />);
    expect(screen.getByText('Quick check')).toBeInTheDocument();
    expect(screen.getAllByRole('group').length).toBeGreaterThan(0);
  });

  it('shows correct/incorrect feedback after an answer is chosen', async () => {
    const user = userEvent.setup();
    render(<QuizSection topicId="basics" onComplete={vi.fn()} />);
    const firstGroup = screen.getAllByRole('group')[0];
    const options = within(firstGroup).getAllByRole('button');
    await user.click(options[0]);
    expect(screen.getAllByRole('status')[0]).toBeInTheDocument();
  });

  it('calls onComplete once every question in the topic has been answered', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    render(<QuizSection topicId="basics" onComplete={onComplete} />);
    const groups = screen.getAllByRole('group');
    for (const group of groups) {
      await user.click(within(group).getAllByRole('button')[0]);
    }
    expect(onComplete).toHaveBeenCalledWith('basics');
  });
});
