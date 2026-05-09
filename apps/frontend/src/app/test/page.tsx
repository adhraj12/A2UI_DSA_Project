'use client';

import { useState } from 'react';
import DynamicRenderer from '@/components/DynamicRenderer';
import { A2UISchema, InteractionEvent } from '@/lib/a2ui-schema';

// =============================================
// HARDCODED TEST SCHEMA
// This simulates what the AI agent will generate.
// Once Phase 2 (backend) is done, this will be
// replaced by real agent output.
// =============================================
const testSchema: A2UISchema = {
  theme: 'cyberpunk',
  layout: 'dashboard',
  title: '🧠 Binary Search',
  subtitle: 'Level 3 — Space Navigation Mission',
  components: [
    {
      id: 'xp-1',
      type: 'xp_bar',
      colSpan: 3,
      data: { currentXP: 340, maxXP: 500, level: 3, label: 'Explorer Rank' },
    },
    {
      id: 'concept-1',
      type: 'concept_card',
      data: {
        title: 'What is Binary Search?',
        description: 'Binary Search is a divide-and-conquer algorithm that finds the position of a target value within a sorted array by repeatedly halving the search space.',
        variant: 'info',
        bullets: [
          'Requires a sorted array',
          'Time complexity: O(log n)',
          'Space complexity: O(1) iterative, O(log n) recursive',
        ],
      },
    },
    {
      id: 'array-1',
      type: 'array_visualizer',
      colSpan: 2,
      data: {
        title: 'Binary Search Visualization',
        array: [2, 5, 8, 12, 16, 23, 38, 42, 56, 72, 91],
        highlightIndices: [5],
        comparedIndices: [3, 7],
        sortedIndices: [],
        pointers: [
          { index: 0, label: 'low', color: 'var(--np-success)' },
          { index: 5, label: 'mid', color: 'var(--np-primary)' },
          { index: 10, label: 'high', color: 'var(--np-danger)' },
        ],
      },
    },
    {
      id: 'code-1',
      type: 'code_editor',
      data: {
        title: 'Implementation',
        language: 'python',
        readOnly: true,
        highlightLines: [5, 6, 7],
        code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    
    return -1`,
      },
    },
    {
      id: 'quiz-1',
      type: 'quiz_card',
      data: {
        question: 'What is the time complexity of Binary Search?',
        options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(1)'],
        correctIndex: 1,
        explanation: 'Binary Search halves the search space at each step, leading to logarithmic time complexity.',
        difficulty: 'easy',
      },
    },
    {
      id: 'missions-1',
      type: 'mission_tracker',
      data: {
        currentMissionId: 'm2',
        missions: [
          { id: 'm1', title: 'Understand the concept', description: 'Read the concept card', completed: true, xpReward: 20 },
          { id: 'm2', title: 'Pass the quiz', description: 'Answer the challenge correctly', completed: false, xpReward: 50 },
          { id: 'm3', title: 'Trace the algorithm', description: 'Step through the visualization', completed: false, xpReward: 80 },
        ],
      },
    },
    {
      id: 'progress-1',
      type: 'progress_map',
      data: {
        nodes: [
          { id: 'n1', label: 'Linear Search', completed: true },
          { id: 'n2', label: 'Binary Search', completed: false, active: true },
          { id: 'n3', label: 'Two Pointers', completed: false, locked: true },
          { id: 'n4', label: 'Sliding Window', completed: false, locked: true },
        ],
      },
    },
  ],
};

export default function TestPage() {
  const [logs, setLogs] = useState<string[]>([]);

  const handleInteract = (event: InteractionEvent) => {
    const log = `[${event.componentType}] ${event.action}: ${JSON.stringify(event.payload || {})}`;
    setLogs((prev) => [log, ...prev].slice(0, 20));
  };

  return (
    <div className="min-h-screen">
      <DynamicRenderer schema={testSchema} onInteract={handleInteract} />

      {/* Interaction Log */}
      {logs.length > 0 && (
        <div className="fixed bottom-4 right-4 w-96 max-h-48 overflow-auto rounded-xl p-3 text-xs font-mono z-50"
          style={{ background: 'rgba(0,0,0,0.9)', border: '1px solid rgba(0,240,255,0.2)', color: '#00f0ff' }}>
          <div className="font-bold mb-1 text-[10px] uppercase tracking-wider opacity-60">Interaction Log</div>
          {logs.map((log, i) => (
            <div key={i} className="opacity-70">{log}</div>
          ))}
        </div>
      )}
    </div>
  );
}
