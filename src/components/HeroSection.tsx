import React from 'react';
import { motion } from 'framer-motion';
import { RonaldoCharacter } from './RonaldoCharacter';
import { Omnibar } from './Omnibar';
import { CategoryCards } from './CategoryCards';
import { PERSONAL_INFO } from '../data/portfolioData';
import type { CategoryKey } from '../types';

interface HeroSectionProps {
  onSelectCategory: (category: CategoryKey, prompt: string) => void;
  onSubmitQuestion: (query: string) => void;
  onOpenAbout: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectCategory,
  onSubmitQuestion,
  onOpenAbout,
}) => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-6 md:py-10">
      {/* Giant Background Watermark Typography */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex justify-center overflow-hidden z-0">
        <div
          className="bg-gradient-to-b from-neutral-500/10 dark:from-neutral-400/10 to-transparent bg-clip-text text-[8rem] sm:text-[12rem] lg:text-[16rem] leading-none font-black text-transparent select-none uppercase tracking-tighter"
          style={{ marginBottom: '-2.5rem' }}
        >
          {PERSONAL_INFO.shortName}
        </div>
      </div>

      {/* Intro Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        onClick={onOpenAbout}
        className="z-10 flex flex-col items-center text-center mt-6 sm:mt-4 mb-3 px-2 cursor-pointer group"
        title="Learn more about Sharique"
      >
        <h1 className="font-aalto text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-wider text-neutral-900 dark:text-white uppercase leading-none drop-shadow-sm group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">
          Hey Sharique here
        </h1>
        <h2 className="font-aalto text-xl sm:text-3xl md:text-4xl tracking-widest text-neutral-500 dark:text-neutral-400 uppercase mt-2.5 sm:mt-4 leading-tight group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
          Upcoming Software Engineer at Hitachi Digital
        </h2>
      </motion.div>

      {/* 3D Ronaldo Interactive Video Character */}
      <div className="my-1 sm:my-2">
        <RonaldoCharacter />
      </div>


      {/* Interactive Controls & Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        className="z-10 mt-2 flex w-full flex-col items-center justify-center max-w-2xl gap-3 sm:gap-4"
      >
        <div className="w-full max-w-lg">
          <Omnibar onSubmit={onSubmitQuestion} />
        </div>

        <CategoryCards onSelectCategory={onSelectCategory} />
      </motion.div>
    </div>

  );
};
