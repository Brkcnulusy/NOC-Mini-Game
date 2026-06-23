import { useTranslation } from 'react-i18next';
import { Lock, CheckCircle } from 'lucide-react';
import type { ActiveAlarm } from '../types/game';

interface Props {
  activeAlarms: ActiveAlarm[];
  selectedAlarmId: string | null;
  onSelectAlarm: (id: string) => void;
}

export default function ActiveAlertsList({ activeAlarms, selectedAlarmId, onSelectAlarm }: Props) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'tr' || i18n.language === 'en') ? i18n.language : 'tr';

  const getPriorityInfo = (priority: string) => {
    switch (priority) {
      case 'P1':
        return {
          bg: 'bg-red-500/10 border-red-500/30 text-red-400',
          badge: 'bg-red-500 text-black',
          glow: 'pulse-red',
          maxTime: 80
        };
      case 'P2':
        return {
          bg: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
          badge: 'bg-orange-500 text-black',
          glow: 'border-orange-500/50 shadow-[0_0_10px_rgba(249,115,22,0.15)]',
          maxTime: 60
        };
      case 'P3':
        return {
          bg: 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400',
          badge: 'bg-indigo-500 text-white',
          glow: 'border-indigo-500/50 shadow-[0_0_10px_rgba(79,70,229,0.15)]',
          maxTime: 40
        };
      case 'P4':
      default:
        return {
          bg: 'bg-[#14fac8]/10 border-[#14fac8]/30 text-[#14fac8]',
          badge: 'bg-[#14fac8] text-black',
          glow: 'border-[#14fac8]/50 shadow-[0_0_10px_rgba(20,250,200,0.15)]',
          maxTime: 20
        };
    }
  };

  return (
    <div className="w-full h-full flex flex-col glass-panel border-r border-white/10 overflow-hidden">
      {/* Title Header */}
      <div className="px-4 py-3 bg-white/5 flex items-center justify-between border-b border-white/10">
        <h2 className="font-mono text-xs text-gray-300 tracking-widest flex items-center gap-2 uppercase font-bold">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
          <span>{t('game.alerts')}</span>
        </h2>
        <span className="font-mono text-[10px] text-red-400 font-bold">
          {activeAlarms.length.toString().padStart(2, '0')}_DETECTED
        </span>
      </div>

      {/* Alarm Cards List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {activeAlarms.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-center p-4">
            <CheckCircle className="text-emerald-400 w-10 h-10 animate-bounce mb-2" />
            <p className="font-mono text-xs text-gray-500 uppercase tracking-wider">All Systems Normal</p>
          </div>
        ) : (
          activeAlarms.map(alarm => {
            const isSelected = alarm.id === selectedAlarmId;
            const pInfo = getPriorityInfo(alarm.priority);
            const timePercent = isSelected ? (alarm.timeRemaining / pInfo.maxTime) * 100 : 100;

            return (
              <div
                key={alarm.id}
                onClick={() => onSelectAlarm(alarm.id)}
                className={`w-full p-4 rounded border transition-all duration-300 cursor-pointer flex flex-col gap-3 relative overflow-hidden select-none ${
                  isSelected 
                    ? `${pInfo.bg} ${pInfo.glow} border-t-2` 
                    : 'bg-black/40 border-white/5 hover:border-white/20 text-gray-400'
                }`}
              >
                {/* Scanline pattern for cyber feel */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[size:100%_4px,6px_100%] pointer-events-none opacity-20"></div>

                <div className="flex items-start justify-between gap-2 relative z-10">
                  <div className="flex flex-col gap-1 flex-1">
                    {/* Header Info */}
                    <div className="flex items-center gap-2">
                      {/* Priority Badge (Hidden for unselected) */}
                      {isSelected ? (
                        <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold font-mono ${pInfo.badge}`}>
                          {alarm.priority}
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-zinc-800 text-zinc-500 flex items-center gap-1">
                          <Lock className="w-2 h-2" /> ??
                        </span>
                      )}
                      
                      <span className="font-mono text-[9px] text-gray-500 select-none">
                        #{alarm.id.split('_')[1] || alarm.id}
                      </span>
                    </div>

                    {/* Title */}
                    <h3 className={`font-mono text-xs font-bold uppercase tracking-wide truncate ${
                      isSelected ? 'text-white' : 'text-gray-300'
                    }`}>
                      {alarm.title[lang]}
                    </h3>
                  </div>

                  {/* Countdown Timer (Hidden for unselected) */}
                  <div className="flex flex-col items-end flex-shrink-0">
                    {isSelected ? (
                      <span className={`font-mono text-xs font-bold ${
                        alarm.timeRemaining < 10 ? 'text-red-500 animate-pulse font-black' : 'text-white'
                      }`}>
                        {alarm.timeRemaining.toString().padStart(2, '0')}s
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] text-zinc-600 font-bold uppercase flex items-center gap-1">
                        <Lock className="w-2.5 h-2.5" /> {lang === 'tr' ? 'GİZLİ' : 'LOCKED'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Progress Bar (Only for selected) */}
                {isSelected && (
                  <div className="w-full h-1 bg-black/40 rounded-full overflow-hidden relative z-10">
                    <div
                      className={`h-full transition-all duration-1000 ease-linear ${
                        alarm.timeRemaining < 10 ? 'bg-red-500' : 'bg-[#14fac8]'
                      }`}
                      style={{ width: `${timePercent}%` }}
                    />
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
