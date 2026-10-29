import React from 'react';
import { motion } from 'framer-motion';
import { Download, CheckCircle2, Eye } from 'lucide-react';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { ResumeIcon } from '../Icons';

export const ResumeCard: React.FC = () => {
  const handleView = () => {
    window.open('/resume.pdf', '_blank', 'noopener,noreferrer');
  };

  const handleDownload = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    const link = document.createElement('a');
    link.href = '/resume.pdf';
    link.download = `${PERSONAL_INFO.shortName}_Akhtar_Resume.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full py-4 font-sans">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.01 }}
        onClick={handleView}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-6 shadow-sm hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:scale-105 transition-transform">
              <ResumeIcon className="h-7 w-7" />
            </div>

            <div>
              <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                {PERSONAL_INFO.name}'s Resume
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 mt-0.5">
                {PERSONAL_INFO.role} • Distributed Systems • GraphRAG
              </p>
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400 mt-1.5">
                <span className="font-semibold text-neutral-700 dark:text-neutral-300">PDF</span>
                <span>•</span>
                <span>Updated Official</span>
                <span>•</span>
                <span>170 KB</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium flex items-center gap-1">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-end sm:self-auto">
            {/* Eye View button - Opens PDF in new tab */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleView();
              }}
              title="Open and View Resume"
              aria-label="Open and View Resume"
              className="cursor-pointer flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 hover:text-blue-500 dark:hover:text-blue-400 transition-all active:scale-95 shadow-sm"
            >
              <Eye className="h-4 w-4" />
            </button>

            {/* Download button - Downloads PDF directly */}
            <button
              type="button"
              onClick={handleDownload}
              title="Download Resume PDF"
              aria-label="Download Resume PDF"
              className="cursor-pointer flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-[#0171E3] dark:hover:bg-[#0171E3] dark:hover:text-white transition-all shadow-md active:scale-95 group-hover:scale-105"
            >
              <Download className="h-5 w-5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
