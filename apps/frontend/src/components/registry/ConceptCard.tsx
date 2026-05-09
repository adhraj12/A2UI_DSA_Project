'use client';

import { motion } from 'framer-motion';
import { ConceptCardData } from '@/lib/a2ui-schema';
import { Info, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

interface Props {
  data: ConceptCardData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

const variantConfig = {
  info: { icon: Info, accentVar: '--np-primary' },
  warning: { icon: AlertTriangle, accentVar: '--np-warning' },
  success: { icon: CheckCircle, accentVar: '--np-success' },
  tip: { icon: Lightbulb, accentVar: '--np-xp' },
};

export default function ConceptCard({ data }: Props) {
  const { title, description, bullets, variant = 'info' } = data;
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: -15 }}
      animate={{ opacity: 1, x: 0 }}
      className="rounded-xl p-5 flex flex-col gap-3"
      style={{
        background: 'var(--np-surface)',
        border: '1px solid var(--np-border)',
        borderLeft: `4px solid var(${config.accentVar})`,
        backdropFilter: 'blur(12px)',
      }}
    >
      <div className="flex items-center gap-2">
        <Icon size={18} style={{ color: `var(${config.accentVar})` }} />
        <h3 className="text-base font-bold" style={{ color: 'var(--np-text)' }}>
          {title}
        </h3>
      </div>

      <p className="text-sm leading-relaxed" style={{ color: 'var(--np-textMuted)' }}>
        {description}
      </p>

      {bullets && bullets.length > 0 && (
        <ul className="flex flex-col gap-1.5 pl-1">
          {bullets.map((bullet, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * i }}
              className="flex items-start gap-2 text-sm"
              style={{ color: 'var(--np-text)' }}
            >
              <span style={{ color: `var(${config.accentVar})` }} className="mt-1">▸</span>
              {bullet}
            </motion.li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
