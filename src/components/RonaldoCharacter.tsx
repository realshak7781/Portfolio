import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface RonaldoCharacterProps {
  compact?: boolean;
  onClick?: () => void;
}

export const RonaldoCharacter: React.FC<RonaldoCharacterProps> = ({
  compact = false,
  onClick,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlayingSiuu, setIsPlayingSiuu] = useState(false);

  const triggerSiuu = () => {
    const video = videoRef.current;
    if (!video || isPlayingSiuu) return;

    setIsPlayingSiuu(true);
    video.src = '/ronaldo-siuu.webm';
    video.loop = false;
    video.muted = true;
    video.currentTime = 0;
    video.play().catch(() => {});
  };

  const handleClick = () => {
    triggerSiuu();
    onClick?.();
  };

  useEffect(() => {
    const handleCustomTrigger = () => {
      triggerSiuu();
    };

    window.addEventListener('trigger-siuu', handleCustomTrigger);
    return () => window.removeEventListener('trigger-siuu', handleCustomTrigger);
  }, [isPlayingSiuu]);

  const handleVideoEnded = () => {
    setIsPlayingSiuu(false);
    const video = videoRef.current;
    if (video) {
      video.src = '/ronaldo-idle.webm';
      video.loop = true;
      video.muted = true;
      video.currentTime = 0;
      video.play().catch(() => {});
    }
  };

  // Compact mode for Top Navigation bar
  if (compact) {
    return (
      <motion.button
        layoutId="ronaldo-avatar"
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: [0, -4, 4, 0] }}
        whileTap={{ scale: 0.95 }}
        title="Return to home screen"
        className="relative group cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 dark:border-neutral-700 shadow-md bg-neutral-900/60 backdrop-blur-md flex items-center justify-center transition-all"
      >
        <video
          src="/ronaldo-idle.webm"
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover object-top scale-[2.2] translate-y-2 pointer-events-none"
        />
        <div className="absolute inset-0 rounded-full ring-2 ring-red-500/0 group-hover:ring-red-500/50 transition-all" />
      </motion.button>
    );
  }

  // Hero Standalone 3D Character (100% Transparent, Zero Box, Zero White Lines, Uniform Background)
  return (
    <motion.div
      layoutId="ronaldo-avatar"
      onClick={handleClick}
      whileHover={{ scale: 1.02 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      className="relative z-10 flex flex-col items-center justify-center cursor-pointer select-none my-1"
      title="Cristiano Ronaldo"
    >
      {/* Video Container with ZERO box or borders */}
      <div className="relative w-64 sm:w-76 h-[23rem] sm:h-[27rem] flex items-center justify-center overflow-visible">
        <video
          ref={videoRef}
          src={isPlayingSiuu ? '/ronaldo-siuu.webm' : '/ronaldo-idle.webm'}
          playsInline
          autoPlay
          loop={!isPlayingSiuu}
          muted
          onEnded={handleVideoEnded}
          className="w-full h-full object-contain pointer-events-none select-none"
        />

        {/* Natural Ground Contact Shadow under his boots */}
        <div className="absolute bottom-2 w-32 sm:w-40 h-3 rounded-[100%] bg-black/60 blur-md pointer-events-none" />
        <div className="absolute bottom-2.5 w-20 sm:w-26 h-2 rounded-[100%] bg-black/80 blur-sm pointer-events-none" />
      </div>
    </motion.div>
  );
};
