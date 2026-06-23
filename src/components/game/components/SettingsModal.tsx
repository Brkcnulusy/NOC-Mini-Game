import { useEffect, useState } from 'react';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  sfxEnabled: boolean;
  onSfxToggle: () => void;
  onClose: () => void;
}

export default function SettingsModal({ show, lang, sfxEnabled, onSfxToggle, onClose }: Props) {
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
      className={`fixed inset-0 z-[400] flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`w-80 bg-black border border-[#14fac8]/30 backdrop-blur-xl p-6 rounded-lg shadow-2xl flex flex-col gap-6 transition-transform duration-300 ${
          show ? 'scale-100' : 'scale-90'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-mono text-gray-400 tracking-widest uppercase text-xs font-bold">
            {lang === 'tr' ? "AYARLAR" : "SETTINGS"}
          </h3>
          <span className="material-symbols-outlined text-gray-400/40 text-sm">settings</span>
        </div>
        <div className="space-y-6">
          <div className="flex items-center justify-between opacity-50 cursor-not-allowed">
            <span className="font-mono text-gray-300 text-xs font-bold">
              {lang === 'tr' ? "Müzik (Yok)" : "Music (N/A)"}
            </span>
            <label className="switch pointer-events-none">
              <input disabled type="checkbox" />
              <span className="slider rounded-full"></span>
            </label>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-mono text-gray-300 text-xs font-bold">
              {lang === 'tr' ? "Ses Efektleri" : "Sound Effects"}
            </span>
            <label className="switch">
              <input 
                type="checkbox" 
                checked={sfxEnabled} 
                onChange={onSfxToggle}
              />
              <span className="slider rounded-full"></span>
            </label>
          </div>
        </div>
        <button 
          className="w-full mt-2 py-3 border border-[#14fac8]/40 text-[#14fac8] font-mono text-xs hover:bg-[#14fac8]/10 transition-all uppercase tracking-widest" 
          onClick={onClose}
        >
          {lang === 'tr' ? "Kapat" : "Close"}
        </button>
      </div>
    </div>
  );
}
