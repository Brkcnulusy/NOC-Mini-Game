import { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  level: number;
  onNext: () => void;
}

export default function LevelClearedModal({ show, lang, level, onNext }: Props) {
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
      className={`fixed inset-0 z-[150] flex items-center justify-center bg-black/85 backdrop-blur-md transition-all duration-500 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className="bg-black border border-[#14fac8] p-8 flex flex-col items-center text-center max-w-md w-full mx-4 shadow-[0_0_50px_rgba(20,250,200,0.2)]"
      >
        <div className="w-20 h-20 rounded-full border border-[#14fac8] flex items-center justify-center mb-6">
          <CheckCircle2 className="text-[#14fac8] w-10 h-10" />
        </div>
        <h2 className="font-mono text-2xl text-white mb-2 uppercase tracking-widest">
          {lang === 'tr' ? "SEVİYE TAMAMLANDI" : "LEVEL CLEARED"}
        </h2>
        <p className="font-mono text-xs text-gray-400 mb-8">
          {lang === 'tr' 
            ? `Tüm sektör alarmları çözüldü. Seviye ${level} başarıyla tamamlandı. Bir sonraki teşhis alanına geçiliyor.` 
            : `All sector alerts resolved. Level ${level} completed successfully. Moving to next diagnostic area.`}
        </p>
        <button 
          className="w-full py-3 bg-[#14fac8] text-black font-bold tracking-widest uppercase hover:bg-white transition-all active:scale-95" 
          onClick={onNext}
        >
          {lang === 'tr' ? "SONRAKİ SEVİYE" : "NEXT LEVEL"}
        </button>
      </div>
    </div>
  );
}
