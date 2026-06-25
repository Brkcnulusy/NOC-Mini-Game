import { useState, useCallback, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { playSfx } from '../utils/sfx';
import { ALARM_DB, LEVELS } from '../data/gameAlarms';
import type { ActiveAlarm, AlarmData, Priority, ResolutionStep, GameState } from '../types/game';

export interface TerminalLog {
  id: string;
  text: string;
  type: 'info' | 'error' | 'success';
}

export function useGameEngine() {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'tr' || i18n.language === 'en') ? i18n.language : 'tr';

  // Game Progress States
  const [gameState, setGameState] = useState<GameState>('landing');
  const [level, setLevel] = useState<number>(1);
  const [lives, setLives] = useState<number>(4);
  const [score, setScore] = useState<number>(0);
  const [resolvedCount, setResolvedCount] = useState<number>(0);

  // Alarms & Selection States
  const [activeAlarms, setActiveAlarms] = useState<ActiveAlarm[]>([]);
  const [selectedAlarmId, setSelectedAlarmId] = useState<string | null>(null);
  const [addedSteps, setAddedSteps] = useState<ResolutionStep[]>([]);
  
  // Monospace Terminal Console Logs
  const [terminalLogs, setTerminalLogs] = useState<TerminalLog[]>([]);

  // Modal Visibility States
  const [showExitConfirm, setShowExitConfirm] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showLevelCleared, setShowLevelCleared] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [showCMDModal, setShowCMDModal] = useState(false);
  const [showHeartAnim, setShowHeartAnim] = useState(false);
  
  // SFX and Game Control Flags
  const [sfxEnabled, setSfxEnabled] = useState(true);
  const [gameStarted, setGameStarted] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
  const [errorReason, setErrorReason] = useState('');

  // Selected alarm selector
  const selectedAlarm = useMemo(() => {
    return activeAlarms.find(a => a.id === selectedAlarmId) || null;
  }, [activeAlarms, selectedAlarmId]);

  // Terminal logging helper
  const addTerminalLog = useCallback((text: string, type: 'info' | 'error' | 'success' = 'info') => {
    setTerminalLogs(prev => [
      ...prev,
      {
        id: Math.random().toString(36).substr(2, 9),
        text,
        type
      }
    ]);
  }, []);

  // Initialize level helper
  const generateAlarmsForLevel = useCallback((levelNum: number): ActiveAlarm[] => {
    const config = LEVELS.find(l => l.id === levelNum) || LEVELS[0];
    const list: ActiveAlarm[] = [];

    // Group database by priority
    const poolByPriority: { [key in Priority]?: AlarmData[] } = {};
    ALARM_DB.forEach(alarm => {
      if (!poolByPriority[alarm.priority]) {
        poolByPriority[alarm.priority] = [];
      }
      poolByPriority[alarm.priority]!.push(alarm);
    });

    // Draw from config
    Object.entries(config.pool).forEach(([p, count]) => {
      const priority = p as Priority;
      const pool = poolByPriority[priority] || [];
      const shuffled = [...pool].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, count);

      selected.forEach(alarm => {
        let duration = 30; // Default P4
        if (alarm.priority === 'P1') duration = 90;
        else if (alarm.priority === 'P2') duration = 70;
        else if (alarm.priority === 'P3') duration = 50;

        list.push({
          ...alarm,
          id: alarm.id + '_' + Math.random().toString(36).substr(2, 4).toUpperCase(),
          timeRemaining: duration
        });
      });
    });

    return list;
  }, []);

  // Set up game elements for the current level
  const initLevel = useCallback((levelNum: number) => {
    const alarms = generateAlarmsForLevel(levelNum);
    setActiveAlarms(alarms);
    setSelectedAlarmId(null);
    setAddedSteps([]);
    setGameStarted(false);
  }, [generateAlarmsForLevel]);

  // Trigger Can/Heart Loss Overlay
  const triggerHeartLoss = useCallback((reason: string) => {
    playSfx('error', sfxEnabled);
    setErrorReason(reason);
    setShowHeartAnim(true);
    setLives(prev => {
      const nextLives = prev - 1;
      if (nextLives <= 0) {
        // Wait for the heart break animation to start, then trigger game over
        setTimeout(() => {
          setIsGameOver(true);
          addTerminalLog(
            lang === 'tr'
              ? '[CRİTİCAL]: Canlar tükendi. Sistem çöktü!'
              : '[CRITICAL]: Lives depleted. System crashed!',
            'error'
          );
        }, 1200);
      }
      return nextLives;
    });
  }, [sfxEnabled, lang, addTerminalLog]);

  // Game Engine Timer Loop
  useEffect(() => {
    if (
      gameState !== 'dashboard' ||
      isGameOver ||
      showCMDModal ||
      showHeartAnim ||
      showSettings ||
      showLevelCleared ||
      showVictory ||
      showExitConfirm ||
      !gameStarted ||
      !selectedAlarmId
    ) {
      return;
    }

    const timer = setInterval(() => {
      setActiveAlarms(prev => {
        return prev.map(alarm => {
          if (alarm.id === selectedAlarmId) {
            const nextTime = alarm.timeRemaining - 1;
            
            if (nextTime <= 0) {
              clearInterval(timer);
              // Trigger immediate Game Over
              setIsGameOver(true);
              addTerminalLog(
                lang === 'tr'
                  ? 'HATA: Alarm süresi doldu! SİSTEM ÇÖKTÜ.'
                  : 'ERROR: Alarm time expired! SYSTEM CRASHED.',
                'error'
              );
              playSfx('error', sfxEnabled);
              return { ...alarm, timeRemaining: 0 };
            }

            // Play tick sfx
            playSfx('tick', sfxEnabled, nextTime < 10);
            return { ...alarm, timeRemaining: nextTime };
          }
          return alarm;
        });
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [
    gameState,
    isGameOver,
    showCMDModal,
    showHeartAnim,
    showSettings,
    showLevelCleared,
    showVictory,
    showExitConfirm,
    gameStarted,
    selectedAlarmId,
    sfxEnabled,
    lang,
    addTerminalLog
  ]);

  // Start the game
  const startGame = useCallback(() => {
    setGameState('animation');
  }, []);

  // Enter dashboard
  const goToDashboard = useCallback(() => {
    setGameState('dashboard');
    setLevel(1);
    setLives(4);
    setScore(0);
    setResolvedCount(0);
    setIsGameOver(false);
    showVictory && setShowVictory(false);
    setTerminalLogs([]);
    
    // Initial Logs
    addTerminalLog(lang === 'tr' ? '[SİSTEM]: NocOS v4.1 başlatıldı...' : '[SYSTEM]: NocOS v4.1 initialized...', 'info');
    addTerminalLog(lang === 'tr' ? '[SİSTEM]: Sektör 07 bağlantısı kuruldu. Canlı veri akışı izleniyor...' : '[SYSTEM]: Sector 07 connection established. Monitoring live feed...', 'info');

    // Load first level
    const alarms = generateAlarmsForLevel(1);
    setActiveAlarms(alarms);
    setSelectedAlarmId(null);
    setAddedSteps([]);
    setGameStarted(false);
  }, [generateAlarmsForLevel, lang, addTerminalLog, showVictory]);

  // Return to animation
  const returnToDesk = useCallback(() => {
    setGameState('animation');
  }, []);

  // Alarm Selection & Validation
  const selectAlarm = useCallback((id: string | null) => {
    if (isGameOver || showCMDModal || showHeartAnim) return;

    if (id === null) {
      setSelectedAlarmId(null);
      setAddedSteps([]);
      return;
    }

    const targetAlarm = activeAlarms.find(a => a.id === id);
    if (!targetAlarm) return;

    // Hierarchy priority check: P1 > P2 > P3 > P4
    // Find if there is any unresolved active alarm with higher priority than the targetAlarm
    const priorityWeights: { [key in Priority]: number } = { P1: 4, P2: 3, P3: 2, P4: 1 };
    const targetWeight = priorityWeights[targetAlarm.priority];

    const hasHigherPriorityActive = activeAlarms.some(alarm => {
      if (alarm.id === id) return false;
      return priorityWeights[alarm.priority] > targetWeight;
    });

    if (hasHigherPriorityActive) {
      // Check if a P1 alarm is the reason
      const hasP1Active = activeAlarms.some(a => a.priority === 'P1');
      const errorMsg = hasP1Active
        ? (lang === 'tr'
            ? 'HATA: Kritik P1 alarmı aktifken başka alarmlara müdahale edilemez!'
            : 'ERROR: Cannot prioritize lower alerts when a P1 alarm is active!')
        : (lang === 'tr'
            ? 'HATA: Daha yüksek öncelikli alarmlar mevcut! Önce onlara müdahale edin.'
            : 'ERROR: Higher priority alarms active! Address them first.');

      addTerminalLog(errorMsg, 'error');
      triggerHeartLoss(errorMsg);
      return;
    }

    // Correct priority selection
    setSelectedAlarmId(id);
    setAddedSteps([]);
    
    // Start game timer on first click
    if (!gameStarted) {
      setGameStarted(true);
    }

    addTerminalLog(
      (lang === 'tr' ? '[SİSTEM]: Odak değiştirildi: ' : '[SYSTEM]: Switched focus to: ') + 
      targetAlarm.title[lang],
      'info'
    );
  }, [activeAlarms, isGameOver, showCMDModal, showHeartAnim, gameStarted, lang, addTerminalLog, triggerHeartLoss]);

  // Troubleshooting step builder actions
  const addStep = useCallback((step: ResolutionStep) => {
    if (addedSteps.some(s => s.id === step.id)) return;
    setAddedSteps(prev => [...prev, step]);
    addTerminalLog(
      (lang === 'tr' ? '[KULLANICI]: Komut eklendi: ' : '[USER]: Command added: ') + step.text[lang],
      'info'
    );
  }, [addedSteps, lang, addTerminalLog]);

  const removeStep = useCallback((stepId: string) => {
    setAddedSteps(prev => prev.filter(s => s.id !== stepId));
    addTerminalLog(
      lang === 'tr' ? '[KULLANICI]: Komut diziden kaldırıldı.' : '[USER]: Command removed from sequence.',
      'info'
    );
  }, [lang, addTerminalLog]);

  // Command simulation executor
  const executeProcedure = useCallback(() => {
    if (addedSteps.length === 0) {
      addTerminalLog(
        lang === 'tr' ? '[HATA]: Tanımlanmış prosedür yok. İşlem durduruldu.' : '[ERROR]: No procedure defined. Aborting execution.',
        'error'
      );
      return;
    }
    setShowCMDModal(true);
  }, [addedSteps, lang, addTerminalLog]);

  // Handle completion of command simulation (success or error)
  const handleCMDFinished = useCallback((isCorrect: boolean) => {
    setShowCMDModal(false);

    if (isCorrect) {
      playSfx('success', sfxEnabled);
      
      // Remove selected alarm from active list
      setActiveAlarms(prev => prev.filter(a => a.id !== selectedAlarmId));
      setScore(prev => prev + 250);
      setResolvedCount(prev => prev + 1);
      
      const solvedTitle = selectedAlarm ? selectedAlarm.title[lang] : '';
      addTerminalLog(
        (lang === 'tr'
          ? `[BAŞARILI]: '${solvedTitle}' prosedürü başarıyla uygulandı.`
          : `[SUCCESS]: Procedure for '${solvedTitle}' executed successfully.`),
        'success'
      );

      setSelectedAlarmId(null);
      setAddedSteps([]);

      // Check level cleared
      setActiveAlarms(currentActive => {
        // Filter out the solved one (we do it in state next tick, but check length here)
        const remaining = currentActive.filter(a => a.id !== selectedAlarmId);
        if (remaining.length === 0) {
          if (level >= 5) {
            setShowVictory(true);
          } else {
            setShowLevelCleared(true);
          }
        }
        return currentActive;
      });

    } else {
      // Incorrect sequence leads to life loss
      triggerHeartLoss(
        lang === 'tr' ? 'HATA: Prosedür adımları sıralaması yanlış!' : 'ERROR: Incorrect troubleshooting step sequence!'
      );
      setAddedSteps([]);
      addTerminalLog(
        lang === 'tr'
          ? '[HATA]: Prosedür başarısız oldu. Güvenlik ihlali saptandı.'
          : '[ERROR]: Procedure failed. Security breach detected.',
        'error'
      );
    }
  }, [selectedAlarmId, selectedAlarm, sfxEnabled, level, lang, addTerminalLog, triggerHeartLoss]);

  // Go to next level
  const nextLevel = useCallback(() => {
    setShowLevelCleared(false);
    const nextLvl = level + 1;
    setLevel(nextLvl);
    initLevel(nextLvl);
    addTerminalLog(
      lang === 'tr'
        ? `[SİSTEM]: Seviye ${nextLvl} yükleniyor. Teşhis alanı hazır.`
        : `[SYSTEM]: Loading Level ${nextLvl}. Diagnostic area ready.`,
      'info'
    );
  }, [level, initLevel, lang, addTerminalLog]);

  // Reset/Reboot simulation
  const rebootSimulation = useCallback(() => {
    goToDashboard();
    addTerminalLog(
      lang === 'tr' ? '[SİSTEM]: Simülasyon yeniden başlatıldı. Teşhis çekirdeği aktif.' : '[SYSTEM]: Simulation rebooted. Diagnostic core active.',
      'info'
    );
  }, [goToDashboard, lang, addTerminalLog]);

  // Exit/Quit to Main Menu
  const quitToLanding = useCallback(() => {
    setGameState('landing');
    setIsGameOver(false);
    setShowVictory(false);
    setShowExitConfirm(false);
    setSelectedAlarmId(null);
    setAddedSteps([]);
  }, []);

  return {
    // States
    gameState,
    setGameState,
    level,
    lives,
    score,
    resolvedCount,
    activeAlarms,
    selectedAlarmId,
    selectedAlarm,
    addedSteps,
    terminalLogs,
    sfxEnabled,
    gameStarted,
    isGameOver,
    errorReason,

    // Modals
    showExitConfirm,
    setShowExitConfirm,
    showSettings,
    setShowSettings,
    showLevelCleared,
    setShowLevelCleared,
    showVictory,
    setShowVictory,
    showCMDModal,
    setShowCMDModal,
    showHeartAnim,
    setShowHeartAnim,

    // Actions
    startGame,
    goToDashboard,
    returnToDesk,
    selectAlarm,
    addStep,
    removeStep,
    executeProcedure,
    handleCMDFinished,
    nextLevel,
    rebootSimulation,
    quitToLanding,
    setSfxEnabled: (val: boolean) => setSfxEnabled(val),
    addTerminalLog
  };
}
