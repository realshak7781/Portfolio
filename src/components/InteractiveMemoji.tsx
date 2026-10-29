import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface InteractiveMemojiProps {
  compact?: boolean;
  onClick?: () => void;
}

export const InteractiveMemoji: React.FC<InteractiveMemojiProps> = ({ compact = false, onClick }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (compact) return;

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight * 0.4;
      const dx = (e.clientX - centerX) / centerX;
      const dy = (e.clientY - centerY) / centerY;

      // Subtle natural head pivot
      setTilt({
        x: Math.max(-14, Math.min(14, dx * 14)),
        y: Math.max(-10, Math.min(10, dy * 10)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [compact]);

  if (compact) {
    return (
      <motion.button
        layoutId="memoji-avatar"
        onClick={onClick}
        whileHover={{ scale: 1.1, rotate: [0, -5, 5, 0] }}
        whileTap={{ scale: 0.95 }}
        title="Return to home screen"
        className="relative group cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-white/80 dark:border-neutral-700 shadow-md bg-white/40 dark:bg-neutral-800/40 backdrop-blur-md flex items-center justify-center transition-all"
      >
        <img
          src="/memoji.png"
          alt="Sharique Akhtar Avatar"
          className="w-16 h-16 object-cover translate-y-1.5"
        />
        <div className="absolute inset-0 rounded-full ring-2 ring-blue-500/0 group-hover:ring-blue-500/40 transition-all" />
      </motion.button>
    );
  }

  return (
    <motion.div
      layoutId="memoji-avatar"
      style={{
        transform: `perspective(1000px) rotateY(${tilt.x}deg) rotateX(${-tilt.y}deg)`,
      }}
      className="relative z-10 w-44 h-48 sm:w-56 sm:h-64 overflow-hidden flex items-center justify-center transition-transform duration-150 ease-out select-none pointer-events-none"
    >
      <img
        src="/memoji.png"
        alt="Sharique Akhtar 3D Memoji"
        className="w-full h-full object-cover translate-y-8 sm:translate-y-10 scale-[1.6] drop-shadow-2xl"
        draggable={false}
      />
    </motion.div>
  );

};
