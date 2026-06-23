import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onOpenDashboard: () => void;
}

export default function DeskScene({ onOpenDashboard }: Props) {
  const [isZooming, setIsZooming] = useState(false);

  const handleLeftMonitorClick = () => {
    setIsZooming(true);
    // Yakınlaşma animasyonunun tamamlanmasını bekle ve ardından Dashboard'a geçiş yap
    setTimeout(() => {
      onOpenDashboard();
    }, 1200);
  };

  return (
    <AnimatePresence mode="wait">
      {!isZooming && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 overflow-hidden rounded-xl">
          <motion.div
            key="desk"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ 
              opacity: 0, 
              scale: 4.5,
              x: "11.15%", // Görseli sağa kaydırarak sol monitörü tam merkeze alır
              y: "12.5%", // Görseli aşağı kaydırarak dikey olarak ortalar
              transition: { duration: 1.2, ease: "easeInOut" }
            }}
            className="relative bg-black cursor-default select-none shadow-2xl overflow-hidden rounded-xl border border-gray-800 flex items-center justify-center"
            style={{
              maxWidth: '100%',
              maxHeight: '100%',
            }}
          >
            {/* Bu SVG en-boy oranını (1024x650) tarayıcıya dikte eder ve esnek şekilde ölçeklenir */}
            <svg 
              viewBox="0 0 1024 650" 
              width="1024"
              height="650"
              className="pointer-events-none opacity-0 invisible"
              style={{ maxWidth: '100%', maxHeight: '100%', display: 'block' }}
            />

            {/* Gerçek Arka Plan Görseli */}
            <div 
              className="absolute inset-0 bg-cover bg-center select-none pointer-events-none"
              style={{ backgroundImage: 'url(./desk_scene_new.png)' }}
            />

            {/* ================= ALARM BUTONU PARLAMA EFEKTİ ================= */}
            <div 
              className="absolute pointer-events-none z-20 rounded-[50%] animate-pulse"
              style={{ 
                left: '75.9%',
                top: '71.8%',
                width: '5%',
                height: '5%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(255, 0, 0, 0.5)',
                boxShadow: '0 0 25px 12px rgba(255, 0, 0, 0.7)'
              }}
            />

            {/* ================= SOL MONİTÖR EKRANI ETKİLEŞİM ALANI (Görünmez, Tıklanabilir) ================= */}
            <div 
              onClick={handleLeftMonitorClick}
              className="absolute cursor-pointer z-20"
              style={{
                left: '26.0%',
                top: '37.5%',
                width: '24.3%',
                height: '27.0%'
              }}
              title="Sol Ekran"
            />
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
