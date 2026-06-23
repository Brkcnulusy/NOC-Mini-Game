import { useState, useCallback } from 'react';

export type GameState = 'landing' | 'animation' | 'dashboard';

export function useGameEngine() {
  const [gameState, setGameState] = useState<GameState>('landing');

  const startGame = useCallback(() => {
    setGameState('animation');
  }, []);

  const goToDashboard = useCallback(() => {
    setGameState('dashboard');
  }, []);

  const returnToDesk = useCallback(() => {
    setGameState('animation');
  }, []);

  return {
    gameState,
    setGameState,
    startGame,
    goToDashboard,
    returnToDesk
  };
}
