import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Briefcase, Award, MapPin, Sparkles, FileText, ArrowRight } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE } from '../../data/portfolioData';

interface AboutViewProps {
  onOpenResume?: () => void;
  onOpenContact?: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenResume, onOpenContact }) => {
  return (
    <div className="w-full py-4 font-sans space-y-6">
      {/* Profile Spotlight Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-6 sm:p-8 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-neutral-900 border-2 border-white dark:border-neutral-700 shadow-md">
                <video
                  src="/ronaldo-idle.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover scale-[1.9] translate-y-3"
                />
              </div>

              {/* Active Badge */}
              <div className="absolute -bottom-1 -right-1 flex items-center gap-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Active</span>
              </div>
            </div>

            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-white">
                {PERSONAL_INFO.name}
              </h2>
              <p className="text-xs sm:text-sm font-medium text-blue-600 dark:text-blue-400">
                {PERSONAL_INFO.role}
              </p>
              <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                <MapPin className="h-3 w-3" />
                <span>{PERSONAL_INFO.location}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-stretch sm:self-auto">
            {onOpenResume && (
              <button
                onClick={onOpenResume}
                className="cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-3.5 py-2 text-xs font-semibold text-neutral-700 dark:text-neutral-300 hover:bg-neutral-50 dark:hover:bg-neutral-750 transition-all shadow-sm"
              >
                <FileText className="h-3.5 w-3.5 text-blue-500" />
                <span>Resume</span>
              </button>
            )}
            {onOpenContact && (
              <button
                onClick={onOpenContact}
                className="cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-1.5 rounded-xl bg-[#0171E3] px-3.5 py-2 text-xs font-semibold text-white hover:bg-blue-600 transition-all shadow-sm"
              >
                <span>Get in touch</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Tech Interview Pitch Callout */}
        <div className="pt-6">
          <div className="relative rounded-2xl bg-neutral-50/90 dark:bg-neutral-900/80 border border-neutral-200/80 dark:border-neutral-800 p-5 sm:p-6 shadow-2xs">
            <div className="flex items-center gap-2 mb-3">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Tech Interview Pitch & Architectural Focus
              </span>
            </div>
            <blockquote className="text-sm sm:text-base text-neutral-800 dark:text-neutral-100 leading-relaxed border-l-2 border-blue-500 pl-4 my-1 italic font-medium">
              "{PERSONAL_INFO.bio}"
            </blockquote>
          </div>
        </div>
      </motion.div>

      {/* Experience & Education Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-5 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
            <GraduationCap className="h-4 w-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Education</h3>
          </div>
          <div>
            <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
              {PERSONAL_INFO.education.institution}
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-0.5">
              {PERSONAL_INFO.education.degree}
            </p>
            <div className="flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 mt-2">
              <span>{PERSONAL_INFO.education.period}</span>
              <span className="font-medium text-emerald-600 dark:text-emerald-400">
                {PERSONAL_INFO.education.status}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Experience */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-5 shadow-sm space-y-3"
        >
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
            <Briefcase className="h-4 w-4" />
            <h3 className="text-xs font-bold uppercase tracking-wider">Experience</h3>
          </div>
          {EXPERIENCE.map((exp, i) => (
            <div key={i}>
              <div className="flex items-center justify-between">
                <h4 className="text-sm sm:text-base font-semibold text-neutral-900 dark:text-white">
                  {exp.role} @ {exp.company}
                </h4>
                <span className="text-xs text-neutral-500">{exp.period}</span>
              </div>
              <ul className="mt-2 space-y-1.5">
                {exp.description.map((item, idx) => (
                  <li key={idx} className="text-xs text-neutral-600 dark:text-neutral-300 leading-relaxed">
                    • {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Key Achievements */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-5 shadow-sm space-y-3"
      >
        <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
          <Award className="h-4 w-4" />
          <h3 className="text-xs font-bold uppercase tracking-wider">Milestones & Honors</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {PERSONAL_INFO.achievements.map((ach, i) => (
            <div
              key={i}
              className="p-3.5 rounded-xl border border-amber-500/20 bg-amber-50/40 dark:bg-amber-950/20"
            >
              <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm text-neutral-900 dark:text-white">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                <span>{ach.title}</span>
              </div>
              <p className="text-xs text-neutral-600 dark:text-neutral-400 mt-1 leading-relaxed">
                {ach.detail}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
