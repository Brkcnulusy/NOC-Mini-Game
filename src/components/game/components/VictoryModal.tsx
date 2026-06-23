import { useEffect, useState } from 'react';
import { ShieldCheck } from 'lucide-react';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  finalScore: number;
  resolvedCount: number;
  onRestart: () => void;
  onQuit: () => void;
}

export default function VictoryModal({
  show,
  lang,
  finalScore,
  resolvedCount,
  onRestart,
  onQuit
}: Props) {
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
      className={`fixed inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-xl transition-all duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div className="max-w-2xl w-full mx-4 relative">
        {/* Glow effect behind */}
        <div className="absolute -inset-1 bg-gradient-to-r from-[#fbbf24] to-[#14fac8] rounded-xl blur opacity-30 animate-pulse"></div>

        {/* Modal Container */}
        <div className="relative bg-black border border-white/20 rounded-xl p-10 flex flex-col items-center text-center">
          {/* Certificate Badge Wrapper */}
          <div className="w-48 h-48 mb-8 relative flex items-center justify-center">
            <div className="absolute inset-0 bg-[#fbbf24]/30 rounded-full animate-ping"></div>
            <div className="absolute -inset-8 border-2 border-[#fbbf24]/20 rounded-full animate-[spin_10s_linear_infinite]"></div>
            <div className="absolute -inset-16 border-2 border-[#fbbf24]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
            
            {/* Enlarged Certified Icon */}
            <div className="relative w-40 h-40 rounded-full border-4 border-[#fbbf24] flex items-center justify-center bg-black shadow-[0_0_60px_rgba(251,191,36,0.4)]">
              <ShieldCheck size={96} className="text-[#fbbf24] w-24 h-24 flex items-center justify-center fill-[#fbbf24]/10" />
            </div>
          </div>

          {/* Title Headers */}
          <h2 className="font-mono text-2xl md:text-3xl text-white mb-2 uppercase tracking-[0.2em] font-bold">
            {lang === 'tr' ? 'L1 NOC OPERASYON UZMANI' : 'L1 NOC OPERATIONS SPECIALIST'}
          </h2>
          
          <h3 className="font-mono text-xs text-[#14fac8] mb-10 tracking-[0.4em] uppercase font-bold">
            {lang === 'tr' ? 'SİMÜLASYON BAŞARIYLA TAMAMLANDI' : 'SIMULATION COMPLETED'}
          </h3>

          {/* Operator Certified Badge */}
          <div className="w-full border-y border-white/10 py-6 mb-8 select-none">
            <p className="font-mono text-white/40 text-[10px] uppercase mb-1 tracking-[0.3em]">
              {lang === 'tr' ? 'SERTİFİKALI UZMAN' : 'CERTIFIED SPECIALIST'}
            </p>
            <p className="font-mono text-3xl text-white font-bold tracking-wider">OPERATOR_NOC_1337</p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6 w-full mb-8">
            <div className="bg-white/5 p-5 border border-white/10 rounded-lg">
              <p className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-wider">
                {lang === 'tr' ? 'TOPLAM SKOR' : 'TOTAL SCORE'}
              </p>
              <p className="text-2xl font-mono font-bold text-[#14fac8]">
                {finalScore.toString().padStart(4, '0')}
              </p>
            </div>
            
            <div className="bg-white/5 p-5 border border-white/10 rounded-lg">
              <p className="text-[10px] font-mono text-white/40 mb-2 uppercase tracking-wider">
                {lang === 'tr' ? 'ÇÖZÜLEN ALARMLAR' : 'RESOLVED ALERTS'}
              </p>
              <p className="text-2xl font-mono font-bold text-[#14fac8]">
                {resolvedCount}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="w-full flex flex-col gap-3">
            <button
              onClick={onRestart}
              className="w-full py-4 bg-[#14fac8] text-black font-black tracking-[0.4em] uppercase text-xs hover:bg-white transition-all shadow-[0_0_40px_rgba(20,250,200,0.4)] active:scale-95"
            >
              {lang === 'tr' ? 'YENİ SİMÜLASYON BAŞLAT' : 'START NEW SIMULATION'}
            </button>
            
            <button
              onClick={onQuit}
              className="w-full py-4 bg-zinc-800 border border-white/20 text-white font-black tracking-[0.3em] uppercase text-xs hover:bg-white/10 transition-all active:scale-95"
            >
              {lang === 'tr' ? 'ANA MASAYA DÖN' : 'QUIT TO DESK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
