'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QuizCardData } from '@/lib/a2ui-schema';
import { CheckCircle, XCircle, HelpCircle } from 'lucide-react';

interface Props {
  data: QuizCardData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function QuizCard({ data, onInteract }: Props) {
  const { question, options, correctIndex, explanation, difficulty } = data;
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);

  const difficultyColors: Record<string, string> = {
    easy: 'var(--np-success)',
    medium: 'var(--np-warning)',
    hard: 'var(--np-danger)',
  };

  const handleSelect = (index: number) => {
    if (revealed) return;
    setSelected(index);
    setRevealed(true);
    onInteract?.({
      action: index === correctIndex ? 'quiz_correct' : 'quiz_incorrect',
      payload: { selectedIndex: index, correctIndex },
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <HelpCircle size={18} style={{ color: 'var(--np-primary)' }} />
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-primary)' }}>
            Challenge
          </span>
        </div>
        <span
          className="text-xs font-bold px-2 py-0.5 rounded-full uppercase"
          style={{
            color: difficultyColors[difficulty],
            border: `1px solid ${difficultyColors[difficulty]}`,
          }}
        >
          {difficulty}
        </span>
      </div>

      {/* Question */}
      <p className="text-base font-medium leading-relaxed" style={{ color: 'var(--np-text)' }}>
        {question}
      </p>

      {/* Options */}
      <div className="flex flex-col gap-2">
        {options.map((option, i) => {
          let borderColor = 'var(--np-border)';
          let bgColor = 'transparent';
          let icon = null;

          if (revealed) {
            if (i === correctIndex) {
              borderColor = 'var(--np-success)';
              bgColor = 'rgba(0, 255, 136, 0.08)';
              icon = <CheckCircle size={16} style={{ color: 'var(--np-success)' }} />;
            } else if (i === selected) {
              borderColor = 'var(--np-danger)';
              bgColor = 'rgba(255, 51, 85, 0.08)';
              icon = <XCircle size={16} style={{ color: 'var(--np-danger)' }} />;
            }
          }

          return (
            <motion.button
              key={i}
              whileHover={!revealed ? { scale: 1.01, x: 4 } : {}}
              whileTap={!revealed ? { scale: 0.99 } : {}}
              onClick={() => handleSelect(i)}
              disabled={revealed}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-left text-sm transition-all cursor-pointer disabled:cursor-default"
              style={{
                color: 'var(--np-text)',
                border: `1px solid ${borderColor}`,
                background: bgColor,
              }}
            >
              <span
                className="flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold shrink-0"
                style={{
                  border: `1px solid var(--np-border)`,
                  color: 'var(--np-textMuted)',
                }}
              >
                {String.fromCharCode(65 + i)}
              </span>
              <span className="flex-1">{option}</span>
              {icon}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {revealed && explanation && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="rounded-lg p-3 text-sm"
            style={{
              background: 'var(--np-surfaceGlow)',
              color: 'var(--np-textMuted)',
              borderLeft: '3px solid var(--np-primary)',
            }}
          >
            💡 {explanation}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
