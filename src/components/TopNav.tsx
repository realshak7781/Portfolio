import React from 'react';
import { motion } from 'framer-motion';
import { RonaldoCharacter } from './RonaldoCharacter';
import { GithubIcon, ResumeIcon } from './Icons';

interface TopNavProps {
  isChatMode: boolean;
  onResetHome: () => void;
  onOpenInfo?: () => void;
  onOpenResume: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  isChatMode,
  onResetHome,
  onOpenResume,
}) => {
  return (
    <header className="fixed top-0 inset-x-0 z-40 px-4 sm:px-8 py-5 flex items-center justify-between pointer-events-none">
      {/* Top Left GitHub Link */}
      <motion.a
        href="https://github.com/realshak7781"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        title="GitHub Profile (realshak7781)"
        className="pointer-events-auto group flex h-9 w-9 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full border border-neutral-200/60 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-800 shadow-sm active:scale-95 transition-all"
      >
        <GithubIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:scale-110" />
      </motion.a>

      {/* Center Docked Ronaldo in Chat Mode */}
      <div className="pointer-events-auto">
        {isChatMode && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <RonaldoCharacter compact onClick={onResetHome} />
          </motion.div>
        )}
      </div>

      {/* Top Right Action Buttons */}
      <div className="pointer-events-auto flex items-center">
        <button
          onClick={onOpenResume}
          title="View Resume"
          aria-label="View Resume"
          className="cursor-pointer group flex h-9 w-9 sm:h-9.5 sm:w-9.5 items-center justify-center rounded-full border border-neutral-200/60 dark:border-neutral-800 bg-white/40 dark:bg-neutral-900/40 backdrop-blur-xl text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-white/70 dark:hover:bg-neutral-800 shadow-sm active:scale-95 transition-all"
        >
          <ResumeIcon className="h-4 w-4 sm:h-4.5 sm:w-4.5 transition-transform group-hover:scale-110" />
        </button>
      </div>
    </header>
  );
};
