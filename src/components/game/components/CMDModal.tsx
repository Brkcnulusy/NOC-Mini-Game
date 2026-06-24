import { useEffect, useState, useRef } from 'react';
import { Terminal, X } from 'lucide-react';
import type { ActiveAlarm, ResolutionStep } from '../types/game';

interface Props {
  show: boolean;
  lang: 'tr' | 'en';
  selectedAlarm: ActiveAlarm | null;
  addedSteps: ResolutionStep[];
  onFinished: (isCorrect: boolean) => void;
  onClose: () => void;
}

export default function CMDModal({
  show,
  lang,
  selectedAlarm,
  addedSteps,
  onFinished,
  onClose
}: Props) {
  const [shouldRender, setShouldRender] = useState(show);
  const [terminalLines, setTerminalLines] = useState<string[]>([]);
  const [currentCommandText, setCurrentCommandText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const [stepIndex, setStepIndex] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'idle'>('idle');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setTerminalLines([
        'NOC Secure Terminal [Version 10.0.19045]',
        '(c) NOC Corporation. All rights reserved.',
        ' '
      ]);
      setStepIndex(0);
      setTypingIndex(0);
      setCurrentCommandText('');
      setPhase('typing');
    } else {
      setStepIndex(0);
      setTypingIndex(0);
      setCurrentCommandText('');
      setPhase('idle');
    }
  }, [show]);

  const handleAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [terminalLines, currentCommandText]);

  // Command mapper utility
  const getCommandForStep = (stepId: string): string => {
    switch (stepId) {
      case 'step_ping':
      case 'step_san_ping':
      case 'step_ping_reader':
        return 'ping -c 4 10.100.4.15';
      case 'step_ssh':
        return 'ssh admin@core-switch.noc.local -p 22';
      case 'step_console':
        return 'connect serial console --port OOB-S1';
      case 'step_dispatch':
        return 'dispatch_field_engineer --sector 7B --id NOC-902';
      case 'step_service':
      case 'step_sshd':
        return 'systemctl status sshd.service';
      case 'step_logs':
        return 'tail -n 100 /var/log/postgresql/error.log';
      case 'step_restart':
      case 'step_bind':
      case 'step_reboot_av':
        return 'systemctl restart bind9.service';
      case 'step_escalate':
      case 'step_ticket':
      case 'step_facilities':
      case 'step_helpdesk':
        return 'send_escalation_ticket --team DBA_ADMINS --severity SEV-1';
      case 'step_nslookup':
        return 'nslookup internal-dns.noc.local';
      case 'step_flush':
        return 'ip route flush cache && systemd-resolve --flush-caches';
      case 'step_announce':
        return 'publish_status_page --message "DNS Resolution Interrupted"';
      case 'step_verify_failover':
        return 'show high-availability status';
      case 'step_force_ha':
        return 'force active-failover --group firewall-cluster';
      case 'step_pcap':
        return 'tcpdump -i eth0 -c 1000 -w /tmp/capture.pcap';
      case 'step_vendor':
        return 'open_vendor_ticket --account NOC-C911 --severity 1';
      case 'step_fiber':
        return 'show fiber-channel switch links --status';
      case 'step_controller':
        return 'check controller-health --unit SAN-controller-A';
      case 'step_restore':
      case 'step_restore_nas':
        return 'restore --backup-snapshot 2026-06-22_immutable';
      case 'step_find_ip':
        return "grep -i 'write_failed' /var/log/nas_audit.log | awk '{print $3}'";
      case 'step_isolate_client':
        return 'block_switch_port --switch core-sw-7 --port gi0/12';
      case 'step_block_nas':
        return 'disable_write_access --volume nas-share-3';
      case 'step_top':
        return 'htop --delay 1 --sort CPU';
      case 'step_kill':
        return 'kill -9 $(pgrep -f "stuck_worker")';
      case 'step_monitor':
        return 'watch -n 5 "cat /proc/loadavg"';
      case 'step_vnc':
        return 'vncviewer 10.100.45.112:5901';
      case 'step_inform_dev':
        return 'notify_user --id developer@noc.com --message "VM sshd resolved"';
      case 'step_cable':
        return 'send_notification --user "meeting_room_C" --action "plug_hdmi"';
      case 'step_poe':
        return 'poe_port_power_cycle --switch floor4-sw-2 --port gig1/0/4';
      case 'step_csr':
        return 'openssl req -new -key staging.key -out staging.csr';
      case 'step_request_cert':
        return 'submit_cert_request --csr staging.csr --authority letsencrypt';
      case 'step_install_cert':
        return 'cp staging.crt /etc/ssl/certs/ && systemctl reload nginx';
      default:
        return `run_diagnostic --id ${stepId}`;
    }
  };

  const getOutputForStep = (stepId: string): string[] => {
    switch (stepId) {
      case 'step_ping':
      case 'step_san_ping':
      case 'step_ping_reader':
        return [
          'PING 10.100.4.15 (10.100.4.15) 56(84) bytes of data.',
          '64 bytes from 10.100.4.15: icmp_seq=1 ttl=64 time=0.45 ms',
          '64 bytes from 10.100.4.15: icmp_seq=2 ttl=64 time=0.51 ms',
          '--- 10.100.4.15 ping statistics ---',
          '2 packets transmitted, 2 received, 0% packet loss'
        ];
      case 'step_ssh':
        return [
          'Establishing SSH connection to core-switch.noc.local...',
          'Authenticating as admin...',
          'Welcome to Core-Switch-01 CLI.'
        ];
      case 'step_service':
      case 'step_sshd':
        return [
          '● sshd.service - OpenSSH Daemon',
          '   Loaded: loaded (/usr/lib/systemd/system/sshd.service; enabled)',
          '   Active: inactive (dead) since Tue 2026-06-23'
        ];
      case 'step_logs':
        return [
          'Reading last 100 log entries...',
          '[22:15:02] ERROR: connection pool exhausted at PostgreSQL',
          '[22:15:10] FATAL: remaining connection slots are reserved'
        ];
      default:
        return [
          'Running command execution script...',
          '[OK]: Operation completed.'
        ];
    }
  };

  // Typing simulation effect
  useEffect(() => {
    if (!show || !selectedAlarm || phase === 'idle') return;

    if (stepIndex < addedSteps.length) {
      const step = addedSteps[stepIndex];
      const command = getCommandForStep(step.id);

      if (phase === 'typing') {
        if (typingIndex < command.length) {
          const timeout = setTimeout(() => {
            setCurrentCommandText(prev => prev + command[typingIndex]);
            setTypingIndex(prev => prev + 1);
          }, 30);
          return () => clearTimeout(timeout);
        } else {
          // Finished typing command, schedule display of outputs
          const timeout = setTimeout(() => {
            setTerminalLines(prev => [...prev, `C:\\NOC\\System32> ${command}`]);
            setCurrentCommandText('');

            // Check if step is correct
            const isStepCorrect = step.id === selectedAlarm.correctOrder[stepIndex];

            if (!isStepCorrect) {
              const errorOutputs = [
                ...getOutputForStep(step.id),
                `[ERROR]: Check condition failed at step ${stepIndex + 1}.`,
                lang === 'tr'
                  ? '> HATA: PROSEDÜR SIRALAMASI YANLIŞ / ERROR: ACCESS DENIED'
                  : '> ERROR: ACCESS DENIED / INCORRECT SEQUENCE'
              ];
              setTerminalLines(prev => [...prev, ...errorOutputs]);
              setPhase('idle');

              setTimeout(() => {
                onFinished(false);
              }, 1500);
            } else {
              const outputs = getOutputForStep(step.id);
              setTerminalLines(prev => [...prev, ...outputs]);
              
              setStepIndex(prev => prev + 1);
              setTypingIndex(0);
              // Keeps phase as 'typing' to start the next command typing sequence
            }
          }, 300);
          return () => clearTimeout(timeout);
        }
      }
    } else {
      // Finished all selected steps
      setPhase('idle');
      const isSequenceComplete = addedSteps.length === selectedAlarm.correctOrder.length;

      if (isSequenceComplete) {
        const successOutputs = [
          ' ',
          '[SYSTEM]: All procedures verified.',
          lang === 'tr'
            ? '[SİSTEM]: İŞLEM BAŞARIYLA TAMAMLANDI / OPERATION SUCCESSFUL'
            : '[SYSTEM]: OPERATION SUCCESSFUL'
        ];
        setTerminalLines(prev => [...prev, ...successOutputs]);

        setTimeout(() => {
          onFinished(true);
        }, 1200);
      } else {
        const incompleteOutputs = [
          ' ',
          '[WARNING]: Verification failed. Missing required steps.',
          lang === 'tr'
            ? '> HATA: PROSEDÜR SIRALAMASI YANLIŞ / ERROR: ACCESS DENIED'
            : '> ERROR: ACCESS DENIED / INCORRECT SEQUENCE'
        ];
        setTerminalLines(prev => [...prev, ...incompleteOutputs]);

        setTimeout(() => {
          onFinished(false);
        }, 1500);
      }
    }
  }, [show, stepIndex, typingIndex, phase, addedSteps, selectedAlarm, lang, onFinished]);

  if (!shouldRender) return null;

  return (
    <div
      onTransitionEnd={handleAnimationEnd}
      className={`fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm transition-all duration-300 ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`w-full max-w-[620px] mx-4 bg-black border border-white/20 shadow-2xl transition-all duration-300 ${
          show ? 'scale-100' : 'scale-75'
        }`}
      >
        {/* Terminal Header */}
        <div className="h-8 bg-zinc-800 flex items-center justify-between px-3 border-b border-white/10 select-none">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-white/60" />
            <span className="font-mono text-[11px] text-white/80 tracking-wide">NOC-Secure-Terminal.exe</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-3 h-[1px] bg-white/40"></div>
            <div className="w-3 h-3 border border-white/40"></div>
            <span
              className="text-white/40 cursor-pointer hover:text-white flex items-center"
              onClick={onClose}
            >
              <X className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Terminal Content Screen */}
        <div
          ref={scrollRef}
          className="p-6 h-[340px] flex flex-col font-mono text-[11px] text-gray-300 overflow-y-auto leading-tight space-y-1"
        >
          {terminalLines.map((line, idx) => {
            let colorClass = 'text-white/60';
            if (line.includes('C:\\NOC\\System32>')) {
              colorClass = 'text-white font-bold';
            } else if (line.includes('ERROR') || line.includes('HATA') || line.includes('FATAL')) {
              colorClass = 'text-red-500 font-bold';
            } else if (line.includes('SUCCESSFUL') || line.includes('SUCCESS') || line.includes('TAMAMLANDI')) {
              colorClass = 'text-emerald-400 font-bold';
            } else if (line.includes('[OK]')) {
              colorClass = 'text-green-400';
            } else if (line.includes('[WARNING]')) {
              colorClass = 'text-yellow-500 font-bold';
            }
            return (
              <div key={idx} className={colorClass}>
                {line}
              </div>
            );
          })}

          {phase === 'typing' && (
            <div className="text-white flex items-center gap-2">
              <span>C:\NOC\System32&gt;</span>
              <span>{currentCommandText}</span>
              <span className="w-1.5 h-3 bg-[#14fac8] cursor-blink"></span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
