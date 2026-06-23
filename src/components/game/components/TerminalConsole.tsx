import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Terminal } from 'lucide-react';
import type { TerminalLog } from '../hooks/useGameEngine';

interface Props {
  logs: TerminalLog[];
}

export default function TerminalConsole({ logs }: Props) {
  const { i18n } = useTranslation();
  const lang = (i18n.language === 'tr' || i18n.language === 'en') ? i18n.language : 'tr';
  const consoleEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to the bottom on new logs
  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  const getLogColorClass = (type: string) => {
    switch (type) {
      case 'error':
        return 'text-red-500 font-bold';
      case 'success':
        return 'text-emerald-400 font-bold';
      case 'info':
      default:
        return 'text-[#14fac8]';
    }
  };

  return (
    <footer className="h-24 glass-panel border-t border-white/10 p-3 overflow-hidden select-none flex flex-col gap-1.5">
      {/* Console Header */}
      <div className="flex items-center gap-2 px-1 flex-shrink-0">
        <Terminal className="w-3.5 h-3.5 text-[#14fac8]" />
        <span className="font-mono text-[9px] text-[#14fac8]/80 uppercase tracking-widest font-bold">
          {lang === 'tr' ? 'TERMİNAL KONSOLU - SECTOR_07_CMD' : 'TERMINAL CONSOLE - SECTOR_07_CMD'}
        </span>
      </div>

      {/* Logs Container */}
      <div className="flex-1 overflow-y-auto font-mono text-[10px] md:text-[11px] leading-tight space-y-1 pr-2 scrollbar-thin">
        {logs.length === 0 ? (
          <div className="text-zinc-600 animate-pulse uppercase tracking-wider">
            {lang === 'tr' ? '[SİSTEM]: Veri akışı bekleniyor...' : '[SYSTEM]: Awaiting telemetry stream...'}
          </div>
        ) : (
          logs.map(log => (
            <div key={log.id} className={getLogColorClass(log.type)}>
              {log.text}
            </div>
          ))
        )}
        <div ref={consoleEndRef} />
      </div>
    </footer>
  );
}
