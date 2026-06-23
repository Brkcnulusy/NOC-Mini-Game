import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal, ShieldAlert, AlertTriangle, Heart, Clock, BookOpen, ArrowLeft, Monitor } from 'lucide-react';

interface Props {
  onStartGame: () => void;
}

export default function LandingPage({ onStartGame }: Props) {
  const { t } = useTranslation();
  const [showRules, setShowRules] = useState(false);

  const rules = [
    { icon: AlertTriangle, color: 'text-red-500', text: t('game.rules.r1') },
    { icon: Terminal, color: 'text-[#14fac8]', text: t('game.rules.r2') },
    { icon: Heart, color: 'text-pink-500', text: t('game.rules.r3') },
    { icon: Clock, color: 'text-yellow-400', text: t('game.rules.r4') },
    { icon: Monitor, color: 'text-blue-400', text: t('game.rules.r5') },
  ];

  return (
    <div className="flex-1 w-full h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 z-10 relative">
      {!showRules ? (
        <>
          {/* Top Right: Guide / Rules Button */}
          <button 
            onClick={() => setShowRules(true)}
            className="absolute top-4 right-4 px-3.5 py-2.5 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-800 hover:border-[#14fac8]/40 rounded-lg text-gray-300 hover:text-white transition-all backdrop-blur-md z-20 group shadow-lg flex items-center gap-2"
            title={t('game.rules.title')}
          >
            <BookOpen className="w-4 h-4 text-[#14fac8] transition-transform group-hover:scale-110 group-hover:rotate-3" />
            <span className="text-[10px] md:text-xs font-mono font-bold tracking-widest uppercase">KILAVUZ / GUIDE</span>
          </button>

          {/* Center Title & Subtitle */}
          <div className="flex-1 flex flex-col items-center justify-center text-center max-w-3xl mx-auto my-auto">
            <div className="flex items-center gap-3 mb-6">
              <ShieldAlert className="w-12 h-12 md:w-16 md:h-16 text-[#14fac8] animate-pulse flex-shrink-0" />
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black bg-clip-text text-transparent bg-gradient-to-r from-[#4f46e5] to-[#14fac8] tracking-tight py-2 leading-none">
                {t('game.title')}
              </h1>
            </div>
            
            <p className="text-sm md:text-base lg:text-lg text-gray-300 font-mono leading-relaxed max-w-2xl">
              {t('game.landing.subtitle')}
            </p>
          </div>

          {/* Start Simulation Button */}
          <div className="flex items-center justify-center my-8">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#14fac8] to-[#4f46e5] rounded-lg blur opacity-55 group-hover:opacity-85 transition duration-1000 group-hover:duration-200 animate-pulse" />
              <button 
                onClick={onStartGame}
                className="relative px-10 py-5 md:px-12 md:py-6 bg-black/90 ring-1 ring-[#14fac8]/50 rounded-lg flex items-center gap-4 hover:bg-gray-900 transition-all transform hover:scale-105 active:scale-95 shadow-2xl backdrop-blur-md opacity-90"
              >
                <Terminal className="w-6 h-6 text-[#14fac8]" />
                <span className="text-lg md:text-xl font-black tracking-widest text-white uppercase">
                  {t('game.start')}
                </span>
              </button>
            </div>
          </div>

          {/* Bottom terminal logs status message */}
          <div className="flex justify-center mt-auto">
            <p className="font-mono text-xs text-[#14fac8] bg-black/60 px-4 py-2 rounded-full border border-[#14fac8]/20 animate-pulse">
              {t('game.landing.awaiting')}
            </p>
          </div>
        </>
      ) : (
        /* Rules / Guide Screen */
        <div className="w-full h-full flex flex-col justify-between">
          <div className="flex items-center justify-between border-b border-gray-800/60 pb-3">
            <h3 className="text-lg md:text-xl font-black text-[#14fac8] tracking-wide uppercase">
              {t('game.rules.title')}
            </h3>
            <button 
              onClick={() => setShowRules(false)}
              className="flex items-center gap-2 px-3.5 py-1.5 bg-gray-900/60 hover:bg-gray-800/80 border border-gray-700 rounded-lg text-xs font-bold text-gray-300 hover:text-white transition-all shadow-md active:scale-95"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="uppercase font-mono tracking-wider">{t('game.back')}</span>
            </button>
          </div>

          {/* Grid Layout of Rules */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-auto w-full max-w-4xl mx-auto py-8">
            {rules.map((rule, i) => {
              const Icon = rule.icon;
              return (
                <div 
                  key={i}
                  className={`flex items-center gap-4 bg-gray-900/65 p-4 rounded-xl border border-gray-800/60 backdrop-blur-md shadow-lg transition-all hover:border-[#14fac8]/30 ${i === 4 ? 'sm:col-span-2' : ''}`}
                >
                  <div className={`p-2.5 rounded-lg bg-gray-950 ${rule.color} flex-shrink-0`}>
                    <Icon className="w-5 h-5 md:w-6 md:h-6" />
                  </div>
                  <span className="text-xs md:text-sm font-semibold text-gray-200 leading-snug">{rule.text}</span>
                </div>
              );
            })}
          </div>

          <div className="text-center font-mono text-[10px] text-gray-500 border-t border-gray-800/40 pt-3 mt-4">
            &gt; NOC Operations Center Guidelines // Version 4.1
          </div>
        </div>
      )}
    </div>
  );
}
