import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useGameEngine } from './hooks/useGameEngine';
import DeskScene from './components/DeskScene';
import Dashboard from './components/Dashboard';
import LandingPage from './components/LandingPage';
import './game.css';

export default function NocSimulator() {
  const { t } = useTranslation();
  const engine = useGameEngine();

  return (
    <div className="w-full h-full flex items-center justify-center p-4 md:p-8 lg:p-12 select-none">
      {/* Game Window Container */}
      <div 
        className="w-full max-w-5xl h-[550px] md:h-[600px] lg:h-[650px] max-h-[70vh] bg-gray-950 border border-gray-800 rounded-2xl shadow-2xl relative flex flex-col overflow-y-auto no-scrollbar"
        style={{
          backgroundImage: 'url(./landing_bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Dark Overlay screen filter */}
        <div className="absolute inset-0 bg-black/80 backdrop-blur-[2px] z-0 pointer-events-none" />
        
        {/* Content routing container */}
        <div className="flex-1 w-full h-full relative z-10 flex flex-col justify-between overflow-y-auto no-scrollbar">
          
          <AnimatePresence mode="wait">
            {engine.gameState === 'landing' && (
              <LandingPage key="landing" onStartGame={engine.startGame} />
            )}

            {engine.gameState === 'animation' && (
              <div key="animation" className="flex-1 w-full h-full relative">
                {/* Back to main landing screen */}
                <button 
                  onClick={() => engine.setGameState('landing')}
                  className="absolute top-4 left-4 px-4 py-2.5 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-855 hover:border-[#14fac8]/40 rounded-lg text-gray-300 hover:text-white transition-all backdrop-blur-md z-20 group shadow-lg flex items-center gap-2 active:scale-95"
                >
                  <ArrowLeft className="w-4 h-4 text-[#14fac8] transition-transform group-hover:scale-110 group-hover:-translate-x-0.5" />
                  <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">{t('game.back')}</span>
                </button>

                <DeskScene onOpenDashboard={engine.goToDashboard} />
              </div>
            )}

            {engine.gameState === 'dashboard' && (
              <div key="dashboard" className="flex-1 w-full h-full relative overflow-hidden rounded-b-2xl rounded-t-lg">
                <Dashboard onBack={engine.returnToDesk} engine={engine} />
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
