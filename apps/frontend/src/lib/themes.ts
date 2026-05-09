// Theme configuration for NeuroPlay AI
// Each theme defines CSS custom properties that components consume

import { ThemeName } from './a2ui-schema';

export interface ThemeConfig {
  name: ThemeName;
  label: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    surface: string;
    surfaceGlow: string;
    text: string;
    textMuted: string;
    border: string;
    success: string;
    danger: string;
    warning: string;
    xp: string;
  };
}

export const themes: Record<ThemeName, ThemeConfig> = {
  cyberpunk: {
    name: 'cyberpunk',
    label: 'Cyberpunk',
    colors: {
      primary: '#00f0ff',
      secondary: '#ff00ea',
      accent: '#ffe600',
      background: '#0a0a1a',
      surface: 'rgba(15, 15, 40, 0.85)',
      surfaceGlow: 'rgba(0, 240, 255, 0.08)',
      text: '#e0e0ff',
      textMuted: '#7878a0',
      border: 'rgba(0, 240, 255, 0.2)',
      success: '#00ff88',
      danger: '#ff3355',
      warning: '#ffaa00',
      xp: '#ffe600',
    },
  },
  space: {
    name: 'space',
    label: 'Space Academy',
    colors: {
      primary: '#6c63ff',
      secondary: '#00d4aa',
      accent: '#ff6b6b',
      background: '#0d0d2b',
      surface: 'rgba(20, 20, 60, 0.85)',
      surfaceGlow: 'rgba(108, 99, 255, 0.08)',
      text: '#d4d4ff',
      textMuted: '#6868a0',
      border: 'rgba(108, 99, 255, 0.2)',
      success: '#00d4aa',
      danger: '#ff6b6b',
      warning: '#ffc107',
      xp: '#ffc107',
    },
  },
  fantasy: {
    name: 'fantasy',
    label: 'Fantasy Dungeon',
    colors: {
      primary: '#d4af37',
      secondary: '#8b5cf6',
      accent: '#ef4444',
      background: '#1a0f0a',
      surface: 'rgba(40, 25, 15, 0.85)',
      surfaceGlow: 'rgba(212, 175, 55, 0.08)',
      text: '#f0e6d2',
      textMuted: '#a09070',
      border: 'rgba(212, 175, 55, 0.2)',
      success: '#22c55e',
      danger: '#ef4444',
      warning: '#f59e0b',
      xp: '#d4af37',
    },
  },
  minimal: {
    name: 'minimal',
    label: 'Clean',
    colors: {
      primary: '#3b82f6',
      secondary: '#8b5cf6',
      accent: '#f59e0b',
      background: '#111827',
      surface: 'rgba(31, 41, 55, 0.85)',
      surfaceGlow: 'rgba(59, 130, 246, 0.06)',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      border: 'rgba(59, 130, 246, 0.15)',
      success: '#10b981',
      danger: '#ef4444',
      warning: '#f59e0b',
      xp: '#f59e0b',
    },
  },
  hacker: {
    name: 'hacker',
    label: 'Hacker Mode',
    colors: {
      primary: '#00ff41',
      secondary: '#00cc33',
      accent: '#ff3333',
      background: '#0a0a0a',
      surface: 'rgba(10, 20, 10, 0.9)',
      surfaceGlow: 'rgba(0, 255, 65, 0.05)',
      text: '#00ff41',
      textMuted: '#00993d',
      border: 'rgba(0, 255, 65, 0.15)',
      success: '#00ff41',
      danger: '#ff3333',
      warning: '#ffcc00',
      xp: '#ffcc00',
    },
  },
};

export function getThemeVars(theme: ThemeName): Record<string, string> {
  const t = themes[theme];
  const vars: Record<string, string> = {};
  for (const [key, value] of Object.entries(t.colors)) {
    vars[`--np-${key}`] = value;
  }
  return vars;
}
