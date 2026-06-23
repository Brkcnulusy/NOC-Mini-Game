import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, X, Shield, Terminal } from 'lucide-react';
import type { ActiveAlarm, ResolutionStep } from '../types/game';

interface Props {
  selectedAlarm: ActiveAlarm | null;
  addedSteps: ResolutionStep[];
  onAddStep: (step: ResolutionStep) => void;
  onRemoveStep: (stepId: string) => void;
  onExecute: () => void;
}

export default function Workspace({
  selectedAlarm,
  addedSteps,
  onAddStep,
  onRemoveStep,
  onExecute
}: Props) {
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'tr' || i18n.language === 'en') ? i18n.language : 'tr';

  // Shuffle available steps once when the active alarm changes
  const shuffledSteps = useMemo(() => {
    if (!selectedAlarm) return [];
    return [...selectedAlarm.steps].sort(() => 0.5 - Math.random());
  }, [selectedAlarm?.id]);

  // Available steps are those not yet added to the troubleshooting sequence
  const availableSteps = useMemo(() => {
    return shuffledSteps.filter(step => !addedSteps.some(s => s.id === step.id));
  }, [shuffledSteps, addedSteps]);

  // Empty State (No Alert Selected)
  if (!selectedAlarm) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center bg-black/40 backdrop-blur-md z-20">
        <div className="w-24 h-24 rounded-full border border-[#14fac8]/30 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(20,250,200,0.1)] animate-pulse">
          <Shield className="w-12 h-12 text-[#14fac8] stroke-[1.5]" />
        </div>
        
        <h3 className="font-mono text-lg text-[#14fac8] tracking-[0.15em] mb-2 uppercase font-bold">
          {t('game.status.stable')}
        </h3>
        
        <p className="font-mono text-[10px] text-gray-500 tracking-widest uppercase mb-1">
          {lang === 'tr' ? 'AKTİF ALARM SEÇİLMEDİ' : 'NO ALERT SELECTED'}
        </p>
        
        <p className="font-mono text-[9px] text-gray-600 mt-4 uppercase">
          {t('game.rules.r5')}
        </p>
      </div>
    );
  }

  const shortId = selectedAlarm.id.split('_')[1] || selectedAlarm.id;

  return (
    <div className="flex flex-col h-full w-full glass-panel relative">
      {/* Workspace Header details */}
      <div className="px-6 py-4 border-b border-white/10 flex flex-col gap-2">
        <div className="flex justify-between items-center">
          <h2 className="font-mono text-[11px] text-gray-500 uppercase tracking-widest font-bold">
            {lang === 'tr' ? 'ÇÖZÜM ÇALIŞMA ALANI' : 'RESOLUTION WORKSPACE'}
          </h2>
          <span className="font-mono text-[11px] text-[#14fac8] font-bold">
            ID_{shortId}
          </span>
        </div>
        
        <div>
          <h1 className="font-mono text-lg text-red-500 font-bold uppercase tracking-wide">
            {selectedAlarm.title[lang]}
          </h1>
          <p className="text-xs text-gray-400 font-sans mt-1">
            {selectedAlarm.description[lang]}
          </p>
        </div>
      </div>

      {/* Main interaction panels split */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Shuffled available step pills */}
        <div className="w-1/2 p-5 border-r border-white/10 flex flex-col gap-3 overflow-y-auto scrollbar-thin">
          <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            {lang === 'tr' ? 'MEVCUT ADIMLAR' : 'AVAILABLE STEPS'}
          </h3>
          
          <div className="space-y-2">
            {availableSteps.length === 0 ? (
              <p className="font-mono text-[10px] text-zinc-600 uppercase italic">
                {lang === 'tr' ? 'Tüm adımlar eklendi.' : 'All steps selected.'}
              </p>
            ) : (
              availableSteps.map(step => (
                <button
                  key={step.id}
                  onClick={() => onAddStep(step)}
                  className="w-full text-left p-3 border border-[#14fac8]/20 bg-[#14fac8]/5 hover:bg-[#14fac8]/10 hover:border-[#14fac8]/50 transition-all rounded flex items-center justify-between group active:scale-[0.99]"
                >
                  <span className="font-mono text-[11px] text-[#14fac8] leading-tight flex-1">
                    {step.text[lang]}
                  </span>
                  <Plus className="w-3.5 h-3.5 text-[#14fac8] ml-2 flex-shrink-0 group-hover:scale-110" />
                </button>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Steps sequence order list */}
        <div className="w-1/2 p-5 flex flex-col gap-3 bg-black/10 overflow-y-auto scrollbar-thin">
          <h3 className="font-mono text-[10px] text-gray-500 uppercase tracking-wider font-bold">
            {t('game.sequenceTitle')}
          </h3>
          
          <div className="space-y-2">
            {addedSteps.length === 0 ? (
              <div className="h-32 border border-dashed border-zinc-800 rounded flex flex-col items-center justify-center p-4 text-center">
                <Terminal className="w-5 h-5 text-zinc-700 mb-1" />
                <p className="font-mono text-[9px] text-zinc-600 uppercase tracking-wider">
                  {lang === 'tr' ? 'ADIM SEÇİLMEDİ' : 'SEQUENCE EMPTY'}
                </p>
              </div>
            ) : (
              addedSteps.map((step, idx) => (
                <div
                  key={step.id}
                  onClick={() => onRemoveStep(step.id)}
                  className="flex items-center gap-3 p-2.5 bg-white/5 border border-white/10 hover:border-red-500/50 hover:bg-red-500/5 transition-all rounded cursor-pointer group select-none active:scale-[0.99]"
                >
                  <span className="font-mono text-[11px] text-[#14fac8] font-bold w-4">
                    {idx + 1}.
                  </span>
                  <span className="font-mono text-[11px] text-gray-300 leading-tight flex-1">
                    {step.text[lang]}
                  </span>
                  <X className="w-3.5 h-3.5 text-zinc-500 group-hover:text-red-500 ml-1 flex-shrink-0" />
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Bottom execution trigger */}
      <div className="w-full flex justify-center items-center py-4 border-t border-white/10 bg-transparent">
        <button
          onClick={onExecute}
          disabled={addedSteps.length === 0}
          className="w-72 md:w-80 py-2.5 px-6 rounded-full border border-[#14fac8] bg-[#14fac8]/20 text-[#14fac8] font-black text-xs md:text-sm tracking-[0.2em] hover:bg-[#14fac8] hover:text-black transition-all shadow-[0_0_20px_rgba(20,250,200,0.3)] active:scale-[0.97] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none disabled:border-zinc-800 disabled:text-zinc-600"
        >
          {t('game.execute')}
        </button>
      </div>
    </div>
  );
}
