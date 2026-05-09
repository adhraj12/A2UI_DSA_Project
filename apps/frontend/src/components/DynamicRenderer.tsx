'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { A2UISchema, InteractionEvent } from '@/lib/a2ui-schema';
import { getThemeVars } from '@/lib/themes';
import { componentRegistry } from '@/components/registry';

interface Props {
  schema: A2UISchema;
  onInteract?: (event: InteractionEvent) => void;
}

const layoutClasses: Record<string, string> = {
  split: 'grid grid-cols-1 md:grid-cols-2 gap-4',
  grid: 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4',
  focused: 'flex flex-col gap-4 max-w-2xl mx-auto',
  dashboard: 'grid grid-cols-1 md:grid-cols-3 gap-4',
};

export default function DynamicRenderer({ schema, onInteract }: Props) {
  const themeVars = getThemeVars(schema.theme);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="w-full min-h-screen p-6"
      style={{
        ...themeVars,
        background: `var(--np-background)`,
        color: 'var(--np-text)',
      }}
    >
      {/* Header */}
      {(schema.title || schema.subtitle) && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 text-center"
        >
          {schema.title && (
            <h1
              className="text-3xl md:text-4xl font-black tracking-tight mb-2"
              style={{
                background: `linear-gradient(135deg, var(--np-primary), var(--np-secondary))`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              {schema.title}
            </h1>
          )}
          {schema.subtitle && (
            <p className="text-sm" style={{ color: 'var(--np-textMuted)' }}>
              {schema.subtitle}
            </p>
          )}
        </motion.div>
      )}

      {/* Component Grid */}
      <div className={layoutClasses[schema.layout] || layoutClasses.grid}>
        <AnimatePresence mode="popLayout">
          {schema.components.map((comp, index) => {
            const Component = componentRegistry[comp.type];
            if (!Component) {
              return (
                <div
                  key={comp.id}
                  className="rounded-xl p-4 text-sm"
                  style={{ background: 'var(--np-surface)', border: '1px solid var(--np-border)', color: 'var(--np-danger)' }}
                >
                  Unknown component: <code>{comp.type}</code>
                </div>
              );
            }

            return (
              <motion.div
                key={comp.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -10 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                style={{
                  gridColumn: comp.colSpan ? `span ${comp.colSpan}` : undefined,
                }}
              >
                <Component
                  data={comp.data}
                  onInteract={(event: { action: string; payload?: Record<string, unknown> }) =>
                    onInteract?.({
                      componentId: comp.id,
                      componentType: comp.type,
                      ...event,
                    })
                  }
                />
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
