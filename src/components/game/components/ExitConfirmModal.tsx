import { useEffect, useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ExitConfirmModal({ show, lang, onConfirm, onCancel }: Props) {
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
      className={`fixed inset-0 z-[500] flex items-center justify-center bg-black/60 backdrop-blur-md transition-all duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`w-full max-w-[360px] mx-4 bg-zinc-900 border border-white/10 p-6 md:p-8 flex flex-col items-center text-center shadow-2xl transition-transform duration-300 ${
          show ? 'scale-100' : 'scale-95'
        }`}
      >
        <AlertTriangle className="text-orange-500 w-12 h-12 mb-4 animate-pulse" />
        <p className="font-sans text-sm text-gray-200 mb-8 leading-relaxed">
          {lang === 'tr' 
            ? "Simülasyonu sonlandırmak istediğinize emin misiniz?" 
            : "Are you sure you want to terminate the simulation?"}
        </p>
        <div className="flex gap-4 w-full">
          <button 
            className="flex-1 py-3 bg-red-950/20 border border-red-500 text-red-500 font-bold uppercase tracking-widest text-xs hover:bg-red-500 hover:text-white transition-all active:scale-95"
            onClick={onConfirm}
          >
            {lang === 'tr' ? "Evet" : "Yes"}
          </button>
          <button 
            className="flex-1 py-3 bg-white/5 border border-white/20 text-gray-400 font-bold uppercase tracking-widest text-xs hover:bg-white/10 transition-all active:scale-95"
            onClick={onCancel}
          >
            {lang === 'tr' ? "Hayır" : "No"}
          </button>
        </div>
      </div>
    </div>
  );
}
