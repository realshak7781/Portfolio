import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import type { Project } from '../../types';
import { ProjectModal } from './ProjectModal';

export const ProjectsCarousel: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const offset = direction === 'left' ? -340 : 340;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full py-4 font-sans">
      <div className="flex items-center justify-between mb-4 px-1">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100">
            My Projects
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
            Click any card to inspect architecture, system design, and code
          </p>
        </div>

        {/* Carousel Navigation Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-95 transition-all shadow-sm"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className="cursor-pointer flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 dark:border-neutral-800 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 active:scale-95 transition-all shadow-sm"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Cards Track */}
      <div
        ref={scrollRef}
        className="flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2 px-1 snap-x snap-mandatory"
      >
        {PROJECTS.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.08 }}
            whileHover={{ y: -6, scale: 1.01 }}
            onClick={() => setSelectedProject(project)}
            className="group relative cursor-pointer flex-shrink-0 w-72 sm:w-80 h-[26rem] sm:h-[28rem] rounded-3xl overflow-hidden border border-neutral-200/80 dark:border-neutral-800 bg-neutral-900 shadow-lg hover:shadow-2xl transition-all duration-300 snap-start flex flex-col justify-between p-6 select-none"
          >
            {/* Background image & gradient overlay */}
            <img
              src={project.src}
              alt={project.title}
              className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 group-hover:opacity-90 transition-all duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/20" />

            {/* Top Card Header */}
            <div className="relative z-10 flex flex-col items-start gap-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-950/60 border border-blue-800/50 rounded-full px-2.5 py-0.5 backdrop-blur-md">
                {project.category}
              </span>
              <h3 className="text-2xl sm:text-3xl font-bold text-white mt-1 group-hover:text-blue-300 transition-colors">
                {project.title}
              </h3>
            </div>

            {/* Bottom Card Footer */}
            <div className="relative z-10 flex flex-col gap-3">
              <p className="text-xs sm:text-sm text-neutral-300 line-clamp-3 leading-relaxed">
                {project.subtitle}
              </p>

              {/* Stack Pills */}
              <div className="flex flex-wrap gap-1">
                {project.stack.slice(0, 3).map((st) => (
                  <span
                    key={st}
                    className="text-[10px] font-medium text-neutral-300 bg-white/10 backdrop-blur-sm rounded-md px-2 py-0.5 border border-white/10"
                  >
                    {st}
                  </span>
                ))}
                {project.stack.length > 3 && (
                  <span className="text-[10px] font-medium text-neutral-400 bg-white/10 backdrop-blur-sm rounded-md px-1.5 py-0.5">
                    +{project.stack.length - 3}
                  </span>
                )}
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs text-blue-400 font-semibold group-hover:underline">
                <span>View architecture details</span>
                <ExternalLink className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Expandable Project Details Dialog */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
