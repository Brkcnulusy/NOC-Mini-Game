import { useTranslation } from 'react-i18next';
import { ArrowLeft, Settings, RefreshCw, XCircle, Heart } from 'lucide-react';
import ActiveAlertsList from './ActiveAlertsList';
import Workspace from './Workspace';
import TerminalConsole from './TerminalConsole';
import CMDModal from './CMDModal';
import VictoryModal from './VictoryModal';
import GameOverModal from './GameOverModal';
import ExitConfirmModal from './ExitConfirmModal';
import LevelClearedModal from './LevelClearedModal';
import SettingsModal from './SettingsModal';
import HeartLossOverlay from './HeartLossOverlay';
import type { useGameEngine } from '../hooks/useGameEngine';

interface Props {
  onBack: () => void;
  engine: ReturnType<typeof useGameEngine>;
}

export default function Dashboard({ onBack, engine }: Props) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'tr' || i18n.language === 'en') ? i18n.language : 'tr';

  const toggleLang = () => {
    const nextLang = i18n.language === 'tr' ? 'en' : 'tr';
    i18n.changeLanguage(nextLang);
    engine.addTerminalLog(
      nextLang === 'tr' 
        ? '[SİSTEM]: Dil Türkçe olarak değiştirildi.' 
        : '[SYSTEM]: Language changed to English.',
      'info'
    );
  };

  return (
    <div className="w-full h-full relative bg-[#0d1512] flex flex-col rounded-b-2xl rounded-t-lg overflow-hidden border border-white/10 select-none">
      {/* Scanline overlay */}
      <div className="scanline" />

      {/* HEADER SECTION */}
      <header className="h-14 w-full flex items-center justify-between px-6 bg-black/40 border-b border-white/10 z-10 backdrop-blur-sm">
        {/* Left Side: Exit/Back to Desk button */}
        <button
          onClick={onBack}
          className="flex items-center gap-2 font-mono text-[10px] font-bold text-gray-400 hover:text-[#14fac8] transition-colors group uppercase tracking-widest"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{t('game.back')}</span>
        </button>

        {/* Right Side Stats & Actions */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-4 select-none">
            {/* Language Selection */}
            <button
              onClick={toggleLang}
              className="flex items-center bg-zinc-900 border border-white/10 rounded-full p-0.5 cursor-pointer hover:border-[#14fac8]/60 transition-colors"
            >
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono transition-all ${
                  lang === 'tr' ? 'bg-[#14fac8] text-black' : 'text-gray-400'
                }`}
              >
                TR
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-[9px] font-bold font-mono transition-all ${
                  lang === 'en' ? 'bg-[#14fac8] text-black' : 'text-gray-400'
                }`}
              >
                EN
              </span>
            </button>

            {/* Level indicator */}
            <span className="font-mono text-[10px] text-gray-400 font-bold uppercase tracking-widest">
              {t('game.level')}: <span className="text-[#14fac8]">{engine.level.toString().padStart(2, '0')}</span>
            </span>

            {/* Heart/Lives indicator */}
            <div className="flex gap-1">
              {[0, 1, 2].map(idx => {
                const isFilled = idx < engine.lives;
                return (
                  <Heart
                    key={idx}
                    className={`w-4 h-4 transition-all duration-300 ${
                      isFilled ? 'fill-red-500 text-red-500' : 'text-zinc-800 fill-zinc-900'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          <div className="h-6 w-px bg-white/10" />

          {/* Score Counter */}
          <div className="font-mono text-[10px] text-gray-300 font-bold uppercase tracking-widest">
            {t('game.score')}: <span className="text-[#14fac8]">{engine.score.toString().padStart(4, '0')}</span>
          </div>

          {/* Reset Button */}
          <button
            onClick={engine.rebootSimulation}
            className="bg-[#14fac8]/10 border border-[#14fac8]/40 text-[#14fac8] font-mono text-[10px] font-bold px-3 py-1.5 hover:bg-[#14fac8] hover:text-black transition-all active:scale-95 flex items-center gap-1.5 uppercase"
          >
            <RefreshCw className="w-3 h-3" />
            <span>{lang === 'tr' ? 'SIFIRLA' : 'RESET'}</span>
          </button>

          {/* Terminate Button */}
          <button
            onClick={() => engine.setShowExitConfirm(true)}
            className="bg-red-950/20 border border-red-500 text-red-500 font-mono text-[10px] font-bold px-3 py-1.5 hover:bg-red-500 hover:text-white transition-all active:scale-95 flex items-center gap-1.5 uppercase"
          >
            <XCircle className="w-3 h-3" />
            <span>{lang === 'tr' ? 'OYUNU BİTİR' : 'END GAME'}</span>
          </button>

          {/* Settings Button */}
          <button
            onClick={() => engine.setShowSettings(true)}
            className="text-gray-400 hover:text-[#14fac8] transition-colors"
          >
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Column Alerts list sidebar */}
        <section className="w-[35%] flex-shrink-0">
          <ActiveAlertsList
            activeAlarms={engine.activeAlarms}
            selectedAlarmId={engine.selectedAlarmId}
            onSelectAlarm={engine.selectAlarm}
          />
        </section>

        {/* Right Column details workspace */}
        <section className="w-[65%] flex-1 relative">
          <Workspace
            selectedAlarm={engine.selectedAlarm}
            addedSteps={engine.addedSteps}
            onAddStep={engine.addStep}
            onRemoveStep={engine.removeStep}
            onExecute={engine.executeProcedure}
          />
        </section>
      </main>

      {/* FOOTER TERMINAL LOGS */}
      <TerminalConsole logs={engine.terminalLogs} />

      {/* OVERLAY MODALS & INTERFACE PANELS */}
      
      {/* CMD Execution Simulator */}
      <CMDModal
        show={engine.showCMDModal}
        lang={lang}
        selectedAlarm={engine.selectedAlarm}
        addedSteps={engine.addedSteps}
        onFinished={engine.handleCMDFinished}
        onClose={() => engine.setShowCMDModal(false)}
      />

      {/* Heart Loss Shaking/Breaking Overlay */}
      <HeartLossOverlay
        show={engine.showHeartAnim}
        currentHearts={engine.lives + 1}
        errorReason={engine.errorReason}
        onClose={() => engine.setShowHeartAnim(false)}
      />

      {/* GameOver Screen */}
      <GameOverModal
        show={engine.isGameOver}
        lang={lang}
        resolvedCount={engine.resolvedCount}
        reachedLevel={engine.level}
        finalScore={engine.score}
        onReboot={engine.rebootSimulation}
        onQuit={engine.quitToLanding}
      />

      {/* Level Cleared Screen */}
      <LevelClearedModal
        show={engine.showLevelCleared}
        lang={lang}
        level={engine.level}
        onNext={engine.nextLevel}
      />

      {/* Victory Screen */}
      <VictoryModal
        show={engine.showVictory}
        lang={lang}
        finalScore={engine.score}
        resolvedCount={engine.resolvedCount}
        onRestart={engine.rebootSimulation}
        onQuit={engine.quitToLanding}
      />

      {/* Exit Confirmation Screen */}
      <ExitConfirmModal
        show={engine.showExitConfirm}
        lang={lang}
        onConfirm={engine.quitToLanding}
        onCancel={() => engine.setShowExitConfirm(false)}
      />

      {/* Audio SFX Toggles Settings Panel */}
      <SettingsModal
        show={engine.showSettings}
        lang={lang}
        sfxEnabled={engine.sfxEnabled}
        onSfxToggle={() => engine.setSfxEnabled(!engine.sfxEnabled)}
        onClose={() => engine.setShowSettings(false)}
      />
    </div>
  );
}
