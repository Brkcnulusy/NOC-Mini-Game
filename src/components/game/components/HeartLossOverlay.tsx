import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface Props {
  show: boolean;
  currentHearts: number; // 3, 2, or 1
  errorReason: string;
  onClose: () => void;
}

export default function HeartLossOverlay({ show, currentHearts, errorReason, onClose }: Props) {
  const [shouldRender, setShouldRender] = useState(show);
  const [animationStage, setAnimationStage] = useState<'shake' | 'break' | 'done'>('shake');
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    if (show) {
      setShouldRender(true);
      setAnimationStage('shake');
      setAnimationKey(prev => prev + 1); // Force re-render of hearts on each open

      // After 0.8 seconds of shaking, split the heart
      const shakeTimer = setTimeout(() => {
        setAnimationStage('break');
      }, 800);

      // Auto close after 3.5 seconds
      const closeTimer = setTimeout(() => {
        setAnimationStage('done');
        onClose();
      }, 3500);

      return () => {
        clearTimeout(shakeTimer);
        clearTimeout(closeTimer);
      };
    }
  }, [show, onClose]);

  const handleAnimationEnd = () => {
    if (!show) setShouldRender(false);
  };

  if (!shouldRender) return null;

  // Render the list of hearts using Lucide Heart
  const renderHearts = () => {
    const hearts = [];
    const count = Math.max(1, currentHearts);

    for (let i = 0; i < count; i++) {
      const isRightmost = i === count - 1;

      if (isRightmost) {
        // Special breaking rightmost heart container
        hearts.push(
          <div key={`heart-breaking-${animationKey}`} className="relative w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
            {animationStage === 'shake' && (
              <div className="animate-heart-shake flex items-center justify-center">
                <Heart size={100} className="text-red-500 fill-red-500 select-none" />
              </div>
            )}
            {animationStage === 'break' && (
              <div className="relative w-full h-full flex items-center justify-center">
                {/* Left Half Heart */}
                <div 
                  className="absolute animate-heart-break-left select-none"
                  style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                >
                  <Heart size={100} className="text-red-500 fill-red-500" />
                </div>
                {/* Right Half Heart */}
                <div 
                  className="absolute animate-heart-break-right select-none"
                  style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                >
                  <Heart size={100} className="text-red-500 fill-red-500" />
                </div>
              </div>
            )}
            {animationStage === 'done' && (
              <Heart size={100} className="text-zinc-600 opacity-0 select-none" />
            )}
          </div>
        );
      } else {
        // Normal red heart
        hearts.push(
          <div key={`heart-normal-${i}`} className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
            <Heart size={100} className="text-red-500 fill-red-500 select-none" />
          </div>
        );
      }
    }
    return hearts;
  };

  return (
    <div 
      onTransitionEnd={handleAnimationEnd}
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-1000 ease-out ${
        show ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div 
        className={`flex flex-col items-center transition-transform duration-1000 ease-out`}
        style={{ transform: show ? 'scale(1)' : 'scale(0.5)' }}
      >
        {/* Row of hearts */}
        <div id="breaking-hearts-row" className="flex gap-8 md:gap-12 mb-12">
          {renderHearts()}
        </div>
        
        {/* Error message */}
        <div className="text-center px-8 max-w-2xl">
          <h2 className="font-mono text-lg md:text-xl text-white uppercase tracking-wider leading-tight">
            {errorReason}
          </h2>
        </div>
      </div>
    </div>
  );
}
