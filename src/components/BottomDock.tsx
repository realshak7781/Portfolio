import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDown,
  ChevronUp,
  MoreHorizontal,
  Home,
  FileText,
  Trash2,
} from 'lucide-react';
import { Omnibar } from './Omnibar';
import { CATEGORY_TRIGGERS } from '../data/portfolioData';
import {
  ProjectsIcon,
  SkillsIcon,
  FunIcon,
  ContactIcon,
} from './icons/CategoryIcons';
import type { CategoryKey } from '../types';

interface BottomDockProps {
  onSelectCategory: (category: CategoryKey, prompt: string) => void;
  onSubmitQuestion: (query: string) => void;
  onResetHome: () => void;
  onOpenResume: () => void;
  onClearChat: () => void;
  activeCategory?: CategoryKey | null;
}

export const BottomDock: React.FC<BottomDockProps> = ({
  onSelectCategory,
  onSubmitQuestion,
  onResetHome,
  onOpenResume,
  onClearChat,
  activeCategory,
}) => {
  const [showPills, setShowPills] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  const getIcon = (cat: (typeof CATEGORY_TRIGGERS)[number]) => {
    if (cat.avatarSrc || cat.key === 'Me') {
      return (
        <img
          src={cat.avatarSrc || '/me-avatar.png'}
          alt={cat.label}
          className="h-4 w-4 rounded-full object-contain"
        />
      );
    }
    const props = { className: 'h-4 w-4', style: { color: cat.color } };
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
    <div className="fixed bottom-0 inset-x-0 z-40 flex flex-col items-center pb-3 px-3 sm:px-6 pointer-events-none">
      <div className="w-full max-w-xl flex flex-col items-center gap-2 pointer-events-auto">
        {/* Toggle quick questions button */}
        <button
          onClick={() => setShowPills(!showPills)}
          className="cursor-pointer flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200 transition-colors py-1 tracking-wide uppercase"
        >
          {showPills ? (
            <>
              <ChevronDown className="h-3.5 w-3.5" />
              <span>Hide quick questions</span>
            </>
          ) : (
            <>
              <ChevronUp className="h-3.5 w-3.5" />
              <span>Show quick questions</span>
            </>
          )}
        </button>

        {/* Quick Question Pills */}
        <AnimatePresence>
          {showPills && (
            <motion.div
              initial={{ opacity: 0, y: 10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              className="flex items-center gap-2 sm:gap-2.5 flex-wrap justify-center overflow-visible"
            >
              {CATEGORY_TRIGGERS.map((cat) => {
                const isActive = activeCategory === cat.key;
                return (
                  <button
                    key={cat.key}
                    onClick={() => onSelectCategory(cat.key, cat.prompt)}
                    className={`cursor-pointer group flex items-center gap-2 rounded-full border px-3.5 sm:px-4 py-2 text-sm sm:text-base font-bold backdrop-blur-xl transition-all active:scale-95 shadow-sm ${
                      isActive
                        ? 'bg-white dark:bg-neutral-800 border-neutral-400 dark:border-neutral-600 shadow-md ring-1 ring-neutral-400/30'
                        : 'bg-white/70 dark:bg-neutral-900/70 border-neutral-200/80 dark:border-neutral-800 hover:bg-white dark:hover:bg-neutral-800'
                    }`}
                  >
                    {getIcon(cat)}
                    <span className="text-neutral-800 dark:text-neutral-200 uppercase tracking-wider">
                      {cat.label}
                    </span>
                  </button>
                );
              })}

              {/* Three dots button */}
              <div className="relative">
                <button
                  onClick={() => setShowMenu(!showMenu)}
                  title="More actions"
                  className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl text-neutral-600 dark:text-neutral-300 hover:bg-white dark:hover:bg-neutral-800 transition-all active:scale-95 shadow-sm"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>

                {/* Dropdown Menu */}
                {showMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowMenu(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      className="absolute bottom-10 right-0 z-50 w-48 rounded-2xl border border-neutral-200 dark:border-neutral-700 bg-white/90 dark:bg-neutral-850/90 backdrop-blur-2xl p-1.5 shadow-xl space-y-1 text-xs"
                    >
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onResetHome();
                        }}
                        className="cursor-pointer w-full flex items-center gap-2 rounded-xl px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors"
                      >
                        <Home className="h-3.5 w-3.5 text-blue-500" />
                        <span>Return to Home</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onOpenResume();
                        }}
                        className="cursor-pointer w-full flex items-center gap-2 rounded-xl px-3 py-2 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-750 transition-colors"
                      >
                        <FileText className="h-3.5 w-3.5 text-emerald-500" />
                        <span>Download Resume</span>
                      </button>
                      <button
                        onClick={() => {
                          setShowMenu(false);
                          onClearChat();
                        }}
                        className="cursor-pointer w-full flex items-center gap-2 rounded-xl px-3 py-2 text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                        <span>Clear Conversation</span>
                      </button>
                    </motion.div>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Omnibar Input */}
        <div className="w-full">
          <Omnibar
            onSubmit={onSubmitQuestion}
            isBottomDock
            placeholder="Ask me anything..."
          />
        </div>

        {/* Discreet Footer Watermark */}
        <div className="flex items-center gap-1.5 text-[10px] text-neutral-400 select-none">
          <span>Powered by</span>
          <span className="font-semibold text-neutral-600 dark:text-neutral-300">Fastfolio</span>
          <span>•</span>
          <span>Sharique Akhtar</span>
        </div>
      </div>
    </div>
  );
};
