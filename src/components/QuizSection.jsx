import React, { useState, useEffect } from 'react';
import { QUIZZES } from '../data/quizzes';

function QuizItem({data, index, onAnswered}) {
  const [selected, setSelected] = useState(null);
  const answered = selected !== null;

  function choose(i) {
    if (answered) return;
    setSelected(i);
    onAnswered();
  }

  return (
    <div className="quiz-item">
      <div className="quiz-q" id={'quiz-q-' + index}>{(index + 1) + '. ' + data.q}</div>
      <div className="quiz-options" role="group" aria-labelledby={'quiz-q-' + index}>
        {data.options.map((opt, i) => (
          <button
            key={i}
            className={'quiz-opt' + (answered ? (i === data.correct ? ' correct' : (i === selected ? ' incorrect' : '')) : '')}
            disabled={answered}
            aria-pressed={i === selected}
            onClick={() => choose(i)}
          >
            {opt}
          </button>
        ))}
      </div>
      {answered && (
        <div className="quiz-explain" role="status" aria-live="polite">
          {(selected === data.correct ? '✓ Correct — ' : '✗ Not quite — ') + data.explain}
        </div>
      )}
    </div>
  );
}

export function QuizSection({topicId, onComplete}) {
  const qs = QUIZZES[topicId] || [];
  const [answeredCount, setAnsweredCount] = useState(0);

  useEffect(() => {
    if (qs.length && answeredCount >= qs.length) onComplete(topicId);
  }, [answeredCount]);

  if (!qs.length) return null;

  return (
    <>
      <h2 className="section-h">Quick check</h2>
      <div className="quiz-block">
        {qs.map((d, i) => (
          <QuizItem key={i} data={d} index={i} onAnswered={() => setAnsweredCount(c => c + 1)} />
        ))}
      </div>
    </>
  );
}
