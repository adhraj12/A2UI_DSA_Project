'use client';

import { motion } from 'framer-motion';
import { ArrayVisualizerData } from '@/lib/a2ui-schema';
import { BarChart3 } from 'lucide-react';

interface Props {
  data: ArrayVisualizerData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function ArrayVisualizer({ data, onInteract }: Props) {
  const { array, highlightIndices = [], comparedIndices = [], sortedIndices = [], title, pointers = [] } = data;
  const maxVal = Math.max(...array, 1);

  const getBarColor = (index: number): string => {
    if (comparedIndices.includes(index)) return 'var(--np-danger)';
    if (highlightIndices.includes(index)) return 'var(--np-primary)';
    if (sortedIndices.includes(index)) return 'var(--np-success)';
    return 'rgba(255,255,255,0.15)';
  };

  const getBarGlow = (index: number): string => {
    if (comparedIndices.includes(index)) return '0 0 12px var(--np-danger)';
    if (highlightIndices.includes(index)) return '0 0 12px var(--np-primary)';
    return 'none';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
      }}
    >
      {title && (
        <div className="flex items-center gap-2">
          <BarChart3 size={16} style={{ color: 'var(--np-primary)' }} />
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-primary)' }}>
            {title}
          </span>
        </div>
      )}

      {/* Bars */}
      <div className="flex items-end gap-1.5 h-48 px-2">
        {array.map((value, i) => {
          const heightPct = (value / maxVal) * 100;
          const pointer = pointers.find(p => p.index === i);

          return (
            <div key={i} className="flex-1 flex flex-col items-center gap-1 relative">
              {/* Pointer label */}
              {pointer && (
                <motion.div
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute -top-6 text-xs font-bold whitespace-nowrap"
                  style={{ color: pointer.color || 'var(--np-primary)' }}
                >
                  ▼ {pointer.label}
                </motion.div>
              )}

              {/* Bar */}
              <motion.div
                className="w-full rounded-t-md cursor-pointer"
                style={{
                  background: getBarColor(i),
                  boxShadow: getBarGlow(i),
                }}
                initial={{ height: 0 }}
                animate={{ height: `${heightPct}%` }}
                transition={{ duration: 0.5, delay: i * 0.03, ease: 'easeOut' }}
                whileHover={{ scale: 1.05 }}
                onClick={() => onInteract?.({ action: 'bar_click', payload: { index: i, value } })}
              />

              {/* Value label */}
              <span
                className="text-xs font-mono"
                style={{ color: 'var(--np-textMuted)' }}
              >
                {value}
              </span>
            </div>
          );
        })}
      </div>

      {/* Index labels */}
      <div className="flex gap-1.5 px-2">
        {array.map((_, i) => (
          <div key={i} className="flex-1 text-center">
            <span className="text-[10px] font-mono" style={{ color: 'var(--np-textMuted)', opacity: 0.5 }}>
              [{i}]
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
