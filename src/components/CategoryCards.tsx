import React from 'react';
import { motion } from 'framer-motion';
import { CATEGORY_TRIGGERS } from '../data/portfolioData';
import {
  ProjectsIcon,
  SkillsIcon,
  FunIcon,
  ContactIcon,
} from './icons/CategoryIcons';
import type { CategoryKey } from '../types';

interface CategoryCardsProps {
  onSelectCategory: (category: CategoryKey, prompt: string) => void;
}

export const CategoryCards: React.FC<CategoryCardsProps> = ({ onSelectCategory }) => {
  const getIcon = (cat: (typeof CATEGORY_TRIGGERS)[number]) => {
    if (cat.avatarSrc || cat.key === 'Me') {
      return (
        <img
          src={cat.avatarSrc || '/me-avatar.png'}
          alt={cat.label}
          className="h-10 w-10 sm:h-11 sm:w-11 rounded-full object-contain shadow-sm transition-transform duration-200 group-hover:scale-110"
        />
      );
    }
    const props = {
      className: 'h-9 w-9 sm:h-10 sm:w-10 transition-transform duration-200 group-hover:scale-110',
      style: { color: cat.color },
    };
    switch (cat.key) {
      case 'Projects':
        return <ProjectsIcon {...props} />;
      case 'Skills':
        return <SkillsIcon {...props} />;
      case 'Fun':
        return <FunIcon {...props} />;
      case 'Contact':
        return <ContactIcon {...props} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-lg grid grid-cols-5 gap-2 sm:gap-4 px-2 py-1">
      {CATEGORY_TRIGGERS.map((cat, idx) => (
        <motion.button
          key={cat.key}
          onClick={() => onSelectCategory(cat.key, cat.prompt)}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: 0.04 * idx, ease: 'easeOut' }}
          whileHover={{
            y: -3,
            transition: { duration: 0.18 },
          }}
          whileTap={{ scale: 0.95 }}
          className="group cursor-pointer flex flex-col items-center justify-center gap-2 p-2 rounded-xl transition-all focus:outline-none"
        >
          <div className="flex items-center justify-center h-11 w-11 sm:h-12 sm:w-12">
            {getIcon(cat)}
          </div>
          <span className="text-sm sm:text-base md:text-lg font-bold text-neutral-700 dark:text-neutral-200 group-hover:text-neutral-950 dark:group-hover:text-white transition-colors tracking-wider text-center uppercase">
            {cat.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
