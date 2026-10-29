import React from 'react';
import { motion } from 'framer-motion';
import { Cpu, Server, Layout, Sparkles, CheckCircle2 } from 'lucide-react';
import { SKILL_GROUPS } from '../../data/portfolioData';

export const SkillsView: React.FC = () => {
  const getIcon = (iconName: string, color: string) => {
    const props = { className: 'h-5 w-5', style: { color } };
    switch (iconName) {
      case 'Cpu':
        return <Cpu {...props} />;
      case 'Server':
        return <Server {...props} />;
      case 'Layout':
        return <Layout {...props} />;
      default:
        return <Sparkles {...props} />;
    }
  };

  return (
    <div className="w-full py-4 font-sans space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1.5">
          <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 px-2.5 py-0.5 text-xs font-bold text-purple-600 dark:text-purple-300 border border-purple-500/20">
            <Sparkles className="h-3 w-3" /> Core Competency Matrix
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
          Skill Matrix Breakdown
        </h2>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-1">
          Structured architectural pillars for production-grade agentic systems, distributed backend infrastructure in Go & Python, and MLOps.
        </p>
      </div>

      {/* 3 Core Pillars */}
      <div className="space-y-5">
        {SKILL_GROUPS.map((group, idx) => (
          <motion.div
            key={group.category}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: idx * 0.08 }}
            className="rounded-2xl sm:rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/70 dark:bg-neutral-850/70 backdrop-blur-xl p-5 sm:p-7 shadow-sm hover:shadow-md transition-all space-y-5"
          >
            {/* Pillar Header */}
            <div className="flex items-center gap-3 pb-4 border-b border-neutral-150 dark:border-neutral-800">
              <div
                className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl shadow-inner"
                style={{ backgroundColor: `${group.color}18` }}
              >
                {getIcon(group.iconName, group.color)}
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-neutral-100">
                  {group.category}
                </h3>
              </div>
            </div>

            {/* Structured Items Breakdown */}
            {group.items && (
              <div className="space-y-3.5">
                {group.items.map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-neutral-200/70 dark:border-neutral-800/80 bg-neutral-50/70 dark:bg-neutral-900/60 p-4 space-y-2.5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                  >
                    <div className="flex items-start gap-2.5">
                      <CheckCircle2
                        className="h-4 w-4 mt-0.5 shrink-0"
                        style={{ color: group.color }}
                      />
                      <div className="space-y-1">
                        <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-neutral-100">
                          {item.area}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-700 dark:text-neutral-300 leading-relaxed">
                          {item.details}
                        </p>
                      </div>
                    </div>

                    {/* Chips for this specific area */}
                    <div className="flex flex-wrap gap-1.5 pt-1 pl-6">
                      {item.chips.map((chip) => (
                        <span
                          key={chip}
                          className="text-[11px] sm:text-xs font-medium rounded-md px-2.5 py-1 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-2xs"
                        >
                          {chip}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

