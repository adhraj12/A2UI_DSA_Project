'use client';

import { motion } from 'framer-motion';
import { XPBarData } from '@/lib/a2ui-schema';
import { Zap } from 'lucide-react';

interface Props {
  data: XPBarData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function XPBar({ data }: Props) {
  const { currentXP, maxXP, level, label } = data;
  const percentage = Math.min((currentXP / maxXP) * 100, 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full rounded-xl p-4"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <motion.div
            animate={{ rotate: [0, 15, -15, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >
            <Zap size={20} style={{ color: 'var(--np-xp)' }} />
          </motion.div>
          <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-xp)' }}>
            {label || 'Experience Points'}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs" style={{ color: 'var(--np-textMuted)' }}>
            {currentXP} / {maxXP} XP
          </span>
          <motion.div
            className="flex items-center justify-center w-8 h-8 rounded-full text-xs font-black"
            style={{
              background: `linear-gradient(135deg, var(--np-primary), var(--np-secondary))`,
              color: 'var(--np-background)',
            }}
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          >
            {level}
          </motion.div>
        </div>
      </div>

      {/* Progress Bar Track */}
      <div
        className="relative w-full h-4 rounded-full overflow-hidden"
        style={{
          background: 'rgba(255,255,255,0.05)',
          boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)',
        }}
      >
        {/* Progress Bar Fill */}
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          style={{
            background: `linear-gradient(90deg, var(--np-primary), var(--np-xp))`,
            boxShadow: `0 0 12px var(--np-xp), 0 0 24px rgba(255,230,0,0.2)`,
          }}
        />

        {/* Shimmer Effect */}
        <motion.div
          className="absolute inset-y-0 w-20 rounded-full"
          animate={{ left: ['-20%', '120%'] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'linear', repeatDelay: 1 }}
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
          }}
        />
      </div>
    </motion.div>
  );
}
