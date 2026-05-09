// Component Registry — maps A2UI schema type strings to React components
import { ComponentType as ReactComponentType } from 'react';
import { ComponentType } from '@/lib/a2ui-schema';

import XPBar from './XPBar';
import QuizCard from './QuizCard';
import GraphVisualizer from './GraphVisualizer';
import CodeEditor from './CodeEditor';
import ConceptCard from './ConceptCard';
import MissionTracker from './MissionTracker';
import AchievementPopup from './AchievementPopup';
import ArrayVisualizer from './ArrayVisualizer';
import ProgressMap from './ProgressMap';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const componentRegistry: Record<ComponentType, ReactComponentType<any>> = {
  xp_bar: XPBar,
  quiz_card: QuizCard,
  graph_visualizer: GraphVisualizer,
  code_editor: CodeEditor,
  concept_card: ConceptCard,
  mission_tracker: MissionTracker,
  achievement_popup: AchievementPopup,
  array_visualizer: ArrayVisualizer,
  recursion_tree: GraphVisualizer, // reuse graph for now
  progress_map: ProgressMap,
};
