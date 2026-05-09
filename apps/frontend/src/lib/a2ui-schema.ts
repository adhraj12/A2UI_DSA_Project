// =============================================
// A2UI Schema Definitions for NeuroPlay AI
// =============================================
// This file defines the JSON structure that the
// AI agents will generate at runtime. The frontend
// DynamicRenderer reads these schemas and maps
// each component type to a real React component.
// =============================================

export type ThemeName = 'cyberpunk' | 'space' | 'fantasy' | 'minimal' | 'hacker' | 'premium_light';

export type LayoutType = 'split' | 'grid' | 'focused' | 'dashboard';

// ---- Component Types ----
export type ComponentType =
  | 'xp_bar'
  | 'quiz_card'
  | 'graph_visualizer'
  | 'code_editor'
  | 'concept_card'
  | 'mission_tracker'
  | 'achievement_popup'
  | 'array_visualizer'
  | 'recursion_tree'
  | 'progress_map';

// ---- Individual Component Schemas ----

export interface XPBarData {
  currentXP: number;
  maxXP: number;
  level: number;
  label?: string;
}

export interface QuizCardData {
  question: string;
  options: string[];
  correctIndex: number;
  explanation?: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface GraphVisualizerData {
  nodes: { id: string; label: string; x?: number; y?: number; highlighted?: boolean }[];
  edges: { from: string; to: string; weight?: number; highlighted?: boolean }[];
  directed?: boolean;
  title?: string;
}

export interface CodeEditorData {
  code: string;
  language: string;
  readOnly?: boolean;
  title?: string;
  highlightLines?: number[];
}

export interface ConceptCardData {
  title: string;
  description: string;
  icon?: string;
  bullets?: string[];
  variant?: 'info' | 'warning' | 'success' | 'tip';
}

export interface MissionTrackerData {
  missions: {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    xpReward: number;
  }[];
  currentMissionId?: string;
}

export interface AchievementPopupData {
  title: string;
  description: string;
  xpAwarded: number;
  badge?: string;
}

export interface ArrayVisualizerData {
  array: number[];
  highlightIndices?: number[];
  comparedIndices?: number[];
  sortedIndices?: number[];
  title?: string;
  pointers?: { index: number; label: string; color?: string }[];
}

export interface RecursionTreeData {
  label: string;
  value?: string;
  children?: RecursionTreeData[];
  highlighted?: boolean;
}

export interface ProgressMapData {
  nodes: {
    id: string;
    label: string;
    completed: boolean;
    active?: boolean;
    locked?: boolean;
  }[];
}

// ---- Union type for component data ----
export type ComponentData =
  | XPBarData
  | QuizCardData
  | GraphVisualizerData
  | CodeEditorData
  | ConceptCardData
  | MissionTrackerData
  | AchievementPopupData
  | ArrayVisualizerData
  | RecursionTreeData
  | ProgressMapData;

// ---- A single component instruction from the agent ----
export interface ComponentSchema {
  id: string;
  type: ComponentType;
  data: ComponentData;
  colSpan?: number; // for grid layouts: 1 | 2 | 3
}

// ---- The full A2UI Schema that the agent generates ----
export interface A2UISchema {
  theme: ThemeName;
  layout: LayoutType;
  title?: string;
  subtitle?: string;
  components: ComponentSchema[];
}

// ---- Interaction Events sent back to the agent ----
export interface InteractionEvent {
  componentId: string;
  componentType: ComponentType;
  action: string;
  payload?: Record<string, unknown>;
}
