'use client';

import { motion } from 'framer-motion';
import { MissionTrackerData } from '@/lib/a2ui-schema';
import { Target, CheckCircle, Circle, Zap } from 'lucide-react';

interface Props {
  data: MissionTrackerData;
  onInteract?: (event: { action: string; payload?: Record<string, unknown> }) => void;
}

export default function MissionTracker({ data, onInteract }: Props) {
  const { missions, currentMissionId } = data;

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
      <div className="flex items-center gap-2">
        <Target size={18} style={{ color: 'var(--np-secondary)' }} />
        <span className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--np-secondary)' }}>
          Missions
        </span>
        <span
          className="text-xs px-1.5 py-0.5 rounded ml-auto"
          style={{ background: 'rgba(255,255,255,0.06)', color: 'var(--np-textMuted)' }}
        >
          {missions.filter(m => m.completed).length}/{missions.length}
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {missions.map((mission, i) => {
          const isCurrent = mission.id === currentMissionId;
          return (
            <motion.div
              key={mission.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => onInteract?.({ action: 'mission_select', payload: { missionId: mission.id } })}
              className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-all"
              style={{
                background: isCurrent ? 'var(--np-surfaceGlow)' : 'transparent',
                border: isCurrent
                  ? '1px solid var(--np-primary)'
                  : '1px solid transparent',
              }}
            >
              {/* Status Icon */}
              <div className="mt-0.5">
                {mission.completed ? (
                  <CheckCircle size={16} style={{ color: 'var(--np-success)' }} />
                ) : isCurrent ? (
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Circle size={16} style={{ color: 'var(--np-primary)' }} />
                  </motion.div>
                ) : (
                  <Circle size={16} style={{ color: 'var(--np-textMuted)', opacity: 0.4 }} />
                )}
              </div>

              {/* Mission Info */}
              <div className="flex-1">
                <p
                  className="text-sm font-medium"
                  style={{
                    color: mission.completed ? 'var(--np-textMuted)' : 'var(--np-text)',
                    textDecoration: mission.completed ? 'line-through' : 'none',
                  }}
                >
                  {mission.title}
                </p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--np-textMuted)' }}>
                  {mission.description}
                </p>
              </div>

              {/* XP Reward */}
              <div className="flex items-center gap-1 shrink-0">
                <Zap size={12} style={{ color: 'var(--np-xp)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--np-xp)' }}>
                  +{mission.xpReward}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
