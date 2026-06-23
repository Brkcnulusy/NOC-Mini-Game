import { useEffect, useState } from 'react';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  resolvedCount: number;
  reachedLevel: number;
  finalScore: number;
  onReboot: () => void;
  onQuit: () => void;
}

export default function GameOverModal({ show, lang, resolvedCount, reachedLevel, finalScore, onReboot, onQuit }: Props) {
  const [shouldRender, setShouldRender] = useState(show);

  useEffect(() => {
    if (show) setShouldRender(true);
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  if (!shouldRender) return null;

  return (
    <div 
      onTransitionEnd={handleAnimationEnd}
      className={`fixed inset-0 z-[300] flex items-center justify-center bg-[#2d0a0a]/90 backdrop-blur-md transition-all duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-lg w-full mx-4 relative">
        <div className="absolute -inset-1 bg-red-500 rounded-lg blur opacity-25 animate-pulse"></div>
        <div className="relative bg-black border border-red-500/50 rounded-lg p-8 flex flex-col items-center text-center">
          <h2 className="font-mono text-xl md:text-2xl text-red-500 mb-2 uppercase tracking-widest glitch-text">
            {lang === 'tr' ? "SİSTEM ÇÖKTÜ" : "SYSTEM CRASHED"}
          </h2>
          <p className="font-mono text-xs text-red-500/80 mb-8 tracking-wider">
            {lang === 'tr' ? "BAĞLANTI KESİLDİ" : "CONNECTION TERMINATED"}
          </p>
          <div className="w-full border border-red-500/30 rounded-lg overflow-hidden mb-8 bg-red-500/5">
            <table className="w-full text-left font-mono text-xs">
              <tbody>
                <tr className="border-b border-red-500/20">
                  <td className="p-4 text-white/40 uppercase tracking-tighter">
                    {lang === 'tr' ? "TOPLAM ÇÖZÜLEN ALARMLAR" : "TOTAL RESOLVED ALERTS"}
                  </td>
                  <td className="p-4 text-white font-bold text-right">{resolvedCount}</td>
                </tr>
                <tr className="border-b border-red-500/20">
                  <td className="p-4 text-white/40 uppercase tracking-tighter">
                    {lang === 'tr' ? "ULAŞILAN SEVİYE" : "REACHED LEVEL"}
                  </td>
                  <td className="p-4 text-white font-bold text-right">{reachedLevel}</td>
                </tr>
                <tr>
                  <td className="p-4 text-white/40 uppercase tracking-tighter">
                    {lang === 'tr' ? "FİNAL SKORU" : "FINAL SCORE"}
                  </td>
                  <td className="p-4 text-red-500 font-bold text-right text-xl">{finalScore.toString().padStart(4, '0')}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <button 
            className="w-full py-4 bg-red-600 text-black font-black tracking-[0.3em] uppercase text-xs hover:bg-white transition-all shadow-[0_0_30px_rgba(239,68,68,0.4)] active:scale-95" 
            onClick={onReboot}
          >
            {lang === 'tr' ? "SİSTEMİ YENİDEN BAŞLAT" : "REBOOT SIMULATION"}
          </button>
          <button 
            className="w-full mt-4 py-4 bg-zinc-800 border border-white/20 text-white font-black tracking-[0.3em] uppercase text-xs hover:bg-white/10 transition-all active:scale-95" 
            onClick={onQuit}
          >
            {lang === 'tr' ? "ANA MASAYA DÖN" : "QUIT TO DESK"}
          </button>
        </div>
      </div>
    </div>
  );
}
