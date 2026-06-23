import { ArrowLeft } from 'lucide-react';

interface Props {
  onBack: () => void;
}

export default function Dashboard({ onBack }: Props) {
  return (
    <div className="w-full h-full relative bg-gray-950 flex flex-col rounded-b-2xl rounded-t-lg overflow-hidden">
      {/* Tasarım Görseli */}
      <img 
        src="/dashboard_bg_cropped.jpg" 
        alt="NOC Dashboard Blank UI" 
        className="absolute inset-0 w-full h-full object-fill pointer-events-none select-none p-2 sm:p-3"
      />

      {/* İçerik Katmanı */}
      <div className="relative z-10 w-full h-full p-4 flex flex-col">
        {/* Sol Üst Köşe: Sistemden Çık Butonu (Tam Saydam, Sadece Yazı/İkon) */}
        <button 
          onClick={onBack}
          className="self-start flex items-center gap-2 px-4 py-2 bg-transparent hover:bg-white/5 rounded-lg text-xs md:text-sm font-bold text-gray-400 hover:text-gray-200 transition-all active:scale-95"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono uppercase tracking-widest">Sistemden Çık</span>
        </button>
      </div>
    </div>
  );
}
