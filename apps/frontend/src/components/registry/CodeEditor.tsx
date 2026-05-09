'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { CodeEditorData } from '@/lib/a2ui-schema';
import { Code2, Copy, Check } from 'lucide-react';

interface Props {
  data: CodeEditorData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function CodeEditor({ data, onInteract }: Props) {
  const { code, language, readOnly, title, highlightLines } = data;
  const [copied, setCopied] = useState(false);
  const [editableCode, setEditableCode] = useState(code);

  const lines = editableCode.split('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(editableCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden flex flex-col"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
      }}
    >
      {/* Header Bar */}
      <div
        className="flex items-center justify-between px-4 py-2"
        style={{
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid var(--np-border)',
        }}
      >
        <div className="flex items-center gap-2">
          <Code2 size={14} style={{ color: 'var(--np-primary)' }} />
          <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--np-primary)' }}>
            {title || 'Code'}
          </span>
          <span
            className="text-xs px-1.5 py-0.5 rounded"
            style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--np-textMuted)' }}
          >
            {language}
          </span>
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 text-xs px-2 py-1 rounded transition-colors cursor-pointer"
          style={{
            color: copied ? 'var(--np-success)' : 'var(--np-textMuted)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Code Area */}
      <div className="overflow-auto max-h-80 p-0">
        <div className="flex min-w-fit">
          {/* Line Numbers */}
          <div
            className="flex flex-col items-end px-3 py-3 select-none shrink-0"
            style={{
              background: 'rgba(0,0,0,0.15)',
              color: 'var(--np-textMuted)',
              fontSize: '13px',
              fontFamily: 'monospace',
              lineHeight: '1.6',
            }}
          >
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </div>

          {/* Code Content */}
          {readOnly ? (
            <pre
              className="flex-1 p-3 overflow-x-auto"
              style={{
                color: 'var(--np-text)',
                fontSize: '13px',
                fontFamily: "'Geist Mono', 'Fira Code', monospace",
                lineHeight: '1.6',
                margin: 0,
              }}
            >
              {lines.map((line, i) => {
                const isHighlighted = highlightLines?.includes(i + 1);
                return (
                  <div
                    key={i}
                    style={{
                      background: isHighlighted ? 'rgba(0, 240, 255, 0.08)' : 'transparent',
                      borderLeft: isHighlighted ? '2px solid var(--np-primary)' : '2px solid transparent',
                      paddingLeft: '8px',
                      marginLeft: '-8px',
                    }}
                  >
                    {line || ' '}
                  </div>
                );
              })}
            </pre>
          ) : (
            <textarea
              value={editableCode}
              onChange={(e) => {
                setEditableCode(e.target.value);
                onInteract?.({ action: 'code_change', payload: { code: e.target.value } });
              }}
              spellCheck={false}
              className="flex-1 p-3 resize-none outline-none bg-transparent"
              style={{
                color: 'var(--np-text)',
                fontSize: '13px',
                fontFamily: "'Geist Mono', 'Fira Code', monospace",
                lineHeight: '1.6',
              }}
            />
          )}
        </div>
      </div>
    </motion.div>
  );
}
