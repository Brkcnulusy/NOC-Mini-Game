export type Priority = 'P1' | 'P2' | 'P3' | 'P4';

export interface ResolutionStep {
  id: string;
  text: {
    en: string;
    tr: string;
  };
}

export interface AlarmData {
  id: string;
  priority: Priority;
  title: {
    en: string;
    tr: string;
  };
  description: {
    en: string;
    tr: string;
  };
  correctOrder: string[]; // Array of step IDs in the correct order
  steps: ResolutionStep[];
}

export interface ActiveAlarm extends AlarmData {
  timeRemaining: number; // in seconds, decrements dynamically
  isResolved?: boolean;
}

export interface LevelConfig {
  id: number;
  pool: {
    [key in Priority]?: number; // How many of each priority to spawn
  };
  // We don't have level-wide time anymore, but we can configure alarm spawns
}

export type GameState = 'landing' | 'animation' | 'dashboard';
export type GameStatus = 'playing' | 'game_over' | 'level_cleared' | 'game_completed';
