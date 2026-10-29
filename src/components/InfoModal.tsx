import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Terminal, CheckCircle2, Award } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';


interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenResume: () => void;
  onOpenContact: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({
  isOpen,
  onClose,
  onOpenResume,
  onOpenContact,
}) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/50 backdrop-blur-md"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-lg overflow-hidden rounded-3xl border border-neutral-200/80 dark:border-neutral-700 bg-white/95 dark:bg-neutral-900/95 backdrop-blur-2xl p-6 sm:p-8 shadow-2xl space-y-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-700 shadow-sm">
                <video
                  src="/ronaldo-idle.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.9] translate-y-2"
                />
              </div>

              <div>
                <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                  {PERSONAL_INFO.name}
                </h3>
                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                  {PERSONAL_INFO.role} • NIT Jalandhar
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="cursor-pointer flex h-8 w-8 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <Terminal className="h-3.5 w-3.5 text-blue-500" />
                <span>LeetCode</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900 dark:text-white mt-1">
                1,000+ Solved
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200/60 dark:border-neutral-700/60">
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 font-medium">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>JEE Mains AIR</span>
              </div>
              <div className="text-lg font-extrabold text-neutral-900 dark:text-white mt-1">
                16,000
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div className="space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-400 flex items-center gap-1">
              <Sparkles className="h-3.5 w-3.5 text-blue-500" />
              <span>Core Specializations</span>
            </h4>
            <div className="space-y-1.5 text-xs text-neutral-700 dark:text-neutral-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Agentic GraphRAG & Multi-Agent LangGraph Orchestration</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Distributed Async Pipelines (Celery, Redis, FastAPI, Spring Boot)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Sub-second Vector Search & Resource-Optimized LLM Inference</span>
              </div>
            </div>
          </div>

          {/* Socials & Actions */}
          <div className="flex items-center justify-between pt-4 border-t border-neutral-100 dark:border-neutral-800">
            <div className="flex items-center gap-2">
              <a
                href={PERSONAL_INFO.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-black dark:hover:text-white transition-colors"
                title="GitHub"
              >
                <GithubIcon className="h-4 w-4" />
              </a>
              <a
                href={PERSONAL_INFO.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:text-blue-600 transition-colors"
                title="LinkedIn"
              >
                <LinkedinIcon className="h-4 w-4" />
              </a>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  onClose();
                  onOpenResume();
                }}
                className="cursor-pointer px-3.5 py-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-xs font-semibold text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
              >
                View Resume
              </button>
              <button
                onClick={() => {
                  onClose();
                  onOpenContact();
                }}
                className="cursor-pointer px-3.5 py-2 rounded-xl bg-[#0171E3] text-xs font-semibold text-white hover:bg-blue-600 transition-all shadow-sm"
              >
                Contact
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
