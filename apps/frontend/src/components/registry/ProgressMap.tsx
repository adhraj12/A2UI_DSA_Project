'use client';

import { motion } from 'framer-motion';
import { ProgressMapData } from '@/lib/a2ui-schema';
import { Map, Lock, CheckCircle, Circle } from 'lucide-react';

interface Props {
  data: ProgressMapData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function ProgressMap({ data, onInteract }: Props) {
  const { nodes } = data;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl p-5 flex flex-col gap-4"
      style={{ background: 'var(--np-surface)', border: '1px solid var(--np-border)' }}
    >
      <div className="flex items-center gap-2">
        <Map size={16} style={{ color: 'var(--np-secondary)' }} />
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-secondary)' }}>
          Progress Map
        </span>
      </div>
      <div className="flex flex-col gap-0">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center gap-3">
            <div className="flex flex-col items-center w-8">
              {i > 0 && (
                <div className="w-0.5 h-4" style={{ background: nodes[i - 1].completed ? 'var(--np-success)' : 'var(--np-border)' }} />
              )}
              <motion.div
                whileHover={!node.locked ? { scale: 1.2 } : {}}
                onClick={() => !node.locked && onInteract?.({ action: 'node_select', payload: { nodeId: node.id } })}
                className="flex items-center justify-center w-8 h-8 rounded-full cursor-pointer"
                style={{
                  background: node.completed ? 'var(--np-success)' : node.active ? 'var(--np-primary)' : 'rgba(255,255,255,0.05)',
                  border: node.active ? '2px solid var(--np-primary)' : '1px solid var(--np-border)',
                  boxShadow: node.active ? '0 0 16px var(--np-primary)' : 'none',
                }}
              >
                {node.completed ? <CheckCircle size={14} color="#000" /> : node.locked ? <Lock size={12} style={{ color: 'var(--np-textMuted)', opacity: 0.4 }} /> : <Circle size={12} style={{ color: node.active ? '#000' : 'var(--np-textMuted)' }} />}
              </motion.div>
              {i < nodes.length - 1 && (
                <div className="w-0.5 h-4" style={{ background: node.completed ? 'var(--np-success)' : 'var(--np-border)' }} />
              )}
            </div>
            <span className="text-sm font-medium" style={{ color: node.locked ? 'var(--np-textMuted)' : node.active ? 'var(--np-primary)' : node.completed ? 'var(--np-success)' : 'var(--np-text)', opacity: node.locked ? 0.4 : 1 }}>
              {node.label}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
