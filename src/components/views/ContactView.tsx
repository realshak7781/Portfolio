import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Copy, Check, ExternalLink, Phone, MessageSquare, Code } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PERSONAL_INFO } from '../../data/portfolioData';
import { GithubIcon, LinkedinIcon } from '../Icons';

export const ContactView: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0171E3', '#329696', '#856ED9'],
    });
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: 'LinkedIn',
      url: PERSONAL_INFO.socialLinks.linkedin,
      icon: LinkedinIcon,
      color: 'hover:text-[#0A66C2] hover:border-[#0A66C2]/40',
      label: 'Connect on LinkedIn',
    },
    {
      name: 'GitHub',
      url: PERSONAL_INFO.socialLinks.github,
      icon: GithubIcon,
      color: 'hover:text-neutral-900 dark:hover:text-white hover:border-neutral-400',
      label: 'View Repositories',
    },
    {
      name: 'LeetCode',
      url: PERSONAL_INFO.socialLinks.leetcode,
      icon: Code,
      color: 'hover:text-[#FFA116] hover:border-[#FFA116]/40',
      label: '1,000+ DSA Solutions',
    },
    {
      name: 'Direct Call / WhatsApp',
      url: `tel:${PERSONAL_INFO.phone}`,
      icon: Phone,
      color: 'hover:text-emerald-500 hover:border-emerald-500/40',
      label: PERSONAL_INFO.phone,
    },
  ];

  return (
    <div className="w-full py-4 font-sans space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-3xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-6 sm:p-10 shadow-sm"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-6 border-b border-neutral-100 dark:border-neutral-800">
          <div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
              Get in Touch
            </h2>
            <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
              Interested in collaborating, hiring, or discussing AI systems?
            </p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800/40">
            Open for Roles & Internships
          </span>
        </div>

        {/* Primary Email Action Box */}
        <div className="py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Mail className="h-6 w-6" />
            </div>
            <div>
              <span className="text-xs text-neutral-400 uppercase tracking-wider font-bold">
                Email Address
              </span>
              <p className="text-base sm:text-xl font-bold text-neutral-900 dark:text-white select-all">
                {PERSONAL_INFO.email}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleCopyEmail}
              className="cursor-pointer flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-800 px-4 py-2.5 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-50 dark:hover:bg-neutral-700 transition-all shadow-sm active:scale-95"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4" />
                  <span>Copy Email</span>
                </>
              )}
            </button>

            <a
              href={`mailto:${PERSONAL_INFO.email}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 rounded-xl bg-[#0171E3] px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-600 transition-all shadow-md active:scale-95"
            >
              <MessageSquare className="h-4 w-4" />
              <span>Send Mail</span>
            </a>
          </div>
        </div>

        {/* Social Links Cards */}
        <div className="pt-6 border-t border-neutral-100 dark:border-neutral-800">
          <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4">
            Connect & Profiles
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {socials.map((soc) => {
              const Icon = soc.icon;
              return (
                <a
                  key={soc.name}
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`group flex items-center justify-between rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40 p-4 transition-all hover:bg-white dark:hover:bg-neutral-800 hover:shadow-md ${soc.color}`}
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white dark:bg-neutral-750 shadow-sm group-hover:scale-110 transition-transform">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-sm font-semibold text-neutral-900 dark:text-white">
                        {soc.name}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        {soc.label}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-neutral-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </a>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
