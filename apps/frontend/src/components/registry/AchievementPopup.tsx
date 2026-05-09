'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AchievementPopupData } from '@/lib/a2ui-schema';
import { Trophy, Zap } from 'lucide-react';

interface Props {
  data: AchievementPopupData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function AchievementPopup({ data, onInteract }: Props) {
  const { title, description, xpAwarded, badge } = data;
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onInteract?.({ action: 'achievement_dismissed' });
    }, 5000);
    return () => clearTimeout(timer);
  }, [onInteract]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="rounded-2xl p-5 flex flex-col items-center gap-3 text-center relative overflow-hidden"
          style={{
            background: 'var(--np-surface)',
            border: '2px solid var(--np-xp)',
            boxShadow: '0 0 40px rgba(255, 230, 0, 0.15), 0 0 80px rgba(255, 230, 0, 0.05)',
          }}
        >
          {/* Background glow */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            animate={{ opacity: [0.03, 0.08, 0.03] }}
            transition={{ repeat: Infinity, duration: 3 }}
            style={{
              background: 'radial-gradient(circle at center, var(--np-xp), transparent 70%)',
            }}
          />

          {/* Badge / Trophy */}
          <motion.div
            animate={{ rotate: [0, -10, 10, 0], scale: [1, 1.15, 1] }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="relative z-10"
          >
            {badge ? (
              <span className="text-4xl">{badge}</span>
            ) : (
              <Trophy size={40} style={{ color: 'var(--np-xp)' }} />
            )}
          </motion.div>

          {/* Title */}
          <motion.h3
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg font-black uppercase tracking-wider relative z-10"
            style={{ color: 'var(--np-xp)' }}
          >
            {title}
          </motion.h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-sm relative z-10"
            style={{ color: 'var(--np-textMuted)' }}
          >
            {description}
          </motion.p>

          {/* XP Awarded */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, type: 'spring' }}
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full relative z-10"
            style={{
              background: 'rgba(255, 230, 0, 0.12)',
              border: '1px solid var(--np-xp)',
            }}
          >
            <Zap size={14} style={{ color: 'var(--np-xp)' }} />
            <span className="text-sm font-black" style={{ color: 'var(--np-xp)' }}>
              +{xpAwarded} XP
            </span>
          </motion.div>

          {/* Particle dots */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--np-xp)' }}
              initial={{
                x: 0,
                y: 0,
                opacity: 0,
              }}
              animate={{
                x: [0, (Math.random() - 0.5) * 150],
                y: [0, (Math.random() - 0.5) * 150],
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 1.2,
                delay: 0.1 * i,
                ease: 'easeOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
