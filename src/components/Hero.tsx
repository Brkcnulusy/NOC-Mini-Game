import { useState, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../context/ThemeContext';
import { Activity, Network } from 'lucide-react';

interface HeroProps {
  setActivePage: (page: string) => void;
}

const Hero: React.FC<HeroProps> = ({ setActivePage }) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [iconStyle, setIconStyle] = useState<React.CSSProperties>({ opacity: 0 });

  const DragIcon = theme === 'dark' ? Activity : Network;

  // Position icon snugly to the left of heading, half above it
  useLayoutEffect(() => {
    const compute = () => {
      const h = headingRef.current;
      const c = containerRef.current;
      if (!h || !c) return;
      const hR = h.getBoundingClientRect();
      const cR = c.getBoundingClientRect();
      const isMobile = window.innerWidth < 768;
      const iconSize = isMobile ? 56 : 72; // mobile: 56px, md: 72px
      const gap = 6;       // ~6px between icon right edge and text
      
      let leftPos = hR.left - cR.left - iconSize - gap;
      let topPos = hR.top - cR.top - iconSize * 0.25; // shift up so ~half sits above text

      // If there's not enough room on the left (mobile screens), stack it centered above the text
      if (leftPos < 10) {
        leftPos = hR.left - cR.left + (hR.width - iconSize) / 2;
        topPos = hR.top - cR.top - iconSize;
      }

      setIconStyle({
        position: 'absolute',
        left: leftPos,
        top: topPos,
        zIndex: 50,
        opacity: 1,
      });
    };
    // Run after paint
    const raf = requestAnimationFrame(compute);
    window.addEventListener('resize', compute);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', compute); };
  }, [t('hero.hello'), theme]);

  const dropZones = [
    {
      id: 'about',
      label: t('nav.about'),
      color: 'bg-blue-500/20 border-blue-500/60',
      glow: 'shadow-[0_0_40px_rgba(59,130,246,0.4)]',
      textColor: 'text-blue-300',
    },
    {
      id: 'projects',
      label: t('nav.projects'),
      color: 'bg-purple-500/20 border-purple-500/60',
      glow: 'shadow-[0_0_40px_rgba(168,85,247,0.4)]',
      textColor: 'text-purple-300',
    },
    {
      id: 'contact',
      label: t('nav.contact'),
      color: 'bg-emerald-500/20 border-emerald-500/60',
      glow: 'shadow-[0_0_40px_rgba(16,185,129,0.4)]',
      textColor: 'text-emerald-300',
    },
    {
      id: 'game',
      label: t('nav.game'),
      color: 'bg-orange-500/20 border-orange-500/60',
      glow: 'shadow-[0_0_40px_rgba(249,115,22,0.4)]',
      textColor: 'text-orange-300',
    },
  ];

  const handleDragEnd = (_event: any, info: any) => {
    setIsDragging(false);
    if (!containerRef.current) return;

    const { point } = info;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    let selectedZone = '';
    if (point.y < centerY) {
      selectedZone = point.x < centerX ? 'about' : 'projects';
    } else {
      selectedZone = point.x < centerX ? 'contact' : 'game';
    }

    if (selectedZone) {
      setActivePage(selectedZone);
    }
  };

  return (
    <div
      className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden"
      ref={containerRef}
    >
      {/* ── Drop Zone Overlay ── */}
      {isDragging && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="absolute inset-0 z-20 grid grid-cols-2 grid-rows-2 w-full h-full backdrop-blur-md"
        >
          {dropZones.map((zone) => (
            <div
              key={zone.id}
              className={`flex items-center justify-center border-2 ${zone.color} ${zone.glow} transition-all duration-300`}
            >
              <span className={`text-3xl md:text-4xl font-extrabold ${zone.textColor} drop-shadow-lg`}>
                {zone.label}
              </span>
            </div>
          ))}
        </motion.div>
      )}

      {/* ── Text Content (fades during drag) ── */}
      <motion.div
        className="z-10 text-center max-w-3xl px-6 pointer-events-none"
        animate={{ opacity: isDragging ? 0.05 : 1, scale: isDragging ? 0.97 : 1 }}
        transition={{ duration: 0.25 }}
      >
        <div className="mb-8">
          <h1
            ref={headingRef}
            className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-sys-indigo to-cyan-400 dark:from-sys-neon dark:to-blue-500 py-2 break-words inline-block max-w-full"
          >
            {t('hero.hello')}
          </h1>
        </div>

        <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
          {t('hero.description')}
        </p>
      </motion.div>

      {/* ── Draggable Icon (stays visible during drag) ── */}
      <motion.div
        drag
        dragSnapToOrigin
        onDragStart={() => setIsDragging(true)}
        onDragEnd={handleDragEnd}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        style={iconStyle}
        className="cursor-grab active:cursor-grabbing p-3 md:p-4 rounded-full bg-white dark:bg-sys-darker shadow-[0_0_24px_rgba(0,243,255,0.45)] border-2 border-sys-indigo dark:border-sys-neon"
      >
        <DragIcon
          className={`w-8 h-8 md:w-10 md:h-10 text-sys-indigo dark:text-sys-neon ${
            isDragging ? 'animate-pulse' : 'animate-[spin_6s_linear_infinite]'
          }`}
        />
      </motion.div>

      {/* ── Instruction text ── */}
      <motion.div
        animate={{ opacity: isDragging ? 0 : 1 }}
        className="absolute bottom-12 text-sm text-slate-500 flex flex-col items-center gap-2 animate-bounce pointer-events-none"
      >
        <span>{t('hero.dragToExplore')}</span>
      </motion.div>
    </div>
  );
};

export default Hero;
