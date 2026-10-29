import React, { useState, useEffect } from 'react';
import { ArrowRight, ArrowUp } from 'lucide-react';

interface OmnibarProps {
  onSubmit: (query: string) => void;
  placeholder?: string;
  isBottomDock?: boolean;
}

export const Omnibar: React.FC<OmnibarProps> = ({
  onSubmit,
  placeholder,
  isBottomDock = false,
}) => {
  const [value, setValue] = useState('');

  const defaultPlaceholder = isBottomDock
    ? 'Ask me anything…'
    : 'Ask me anything… or press 7 for SIUUU';

  const triggerSiuu = () => {
    window.dispatchEvent(new CustomEvent('trigger-siuu'));
  };

  // Listen for global '7' keypress when not in bottom dock
  useEffect(() => {
    if (isBottomDock) return;

    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === '7') {
        // If user is typing in an input with text, don't interrupt
        if (document.activeElement?.tagName === 'INPUT') {
          const input = document.activeElement as HTMLInputElement;
          if (input.value.trim().length > 0) return;
        }
        e.preventDefault();
        triggerSiuu();
      }
    };

    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isBottomDock]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === '7' && !value.trim()) {
      e.preventDefault();
      triggerSiuu();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;

    // If user explicitly types '7' or 'siuu'
    const lower = value.trim().toLowerCase();
    if (lower === '7' || lower === 'siuu' || lower === 'siu' || lower === 'siuuu') {
      triggerSiuu();
      setValue('');
      return;
    }

    onSubmit(value.trim());
    setValue('');
  };

  return (
    <form onSubmit={handleSubmit} className="w-full relative">
      <div
        className={`mx-auto flex items-center rounded-full border border-neutral-200/80 dark:border-neutral-700/80 bg-white/50 dark:bg-neutral-800/60 backdrop-blur-xl transition-all shadow-sm focus-within:shadow-md focus-within:border-blue-500/50 dark:focus-within:border-blue-400/50 ${
          isBottomDock ? 'py-2 pr-2 pl-5' : 'py-2.5 sm:py-3.5 pr-3 pl-6'
        }`}
      >
        <input
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder || defaultPlaceholder}
          className="w-full border-none bg-transparent text-base sm:text-lg md:text-xl text-neutral-900 dark:text-neutral-100 placeholder:text-neutral-500 dark:placeholder:text-neutral-400 focus:outline-none tracking-wide"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          aria-label="Submit question"
          className="cursor-pointer flex items-center justify-center rounded-full bg-[#0171E3] p-2 sm:p-2.5 text-white transition-all hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95 shadow-sm shrink-0"
        >
          {isBottomDock ? (
            <ArrowUp className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          ) : (
            <ArrowRight className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
          )}
        </button>
      </div>
    </form>
  );
};
