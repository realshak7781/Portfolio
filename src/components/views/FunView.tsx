import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, Trophy, Terminal, MapPin } from 'lucide-react';

export const FunView: React.FC = () => {
  const hobbies = [
    {
      icon: Trophy,
      title: 'Football & Cristiano Ronaldo',
      subtitle: 'The Beautiful Game & CR7 Mentality',
      color: 'from-amber-500 to-rose-600',
      description:
        'When I am not working, I am on the pitch playing football. I love the game and have huge admiration for Cristiano Ronaldo—his relentless work ethic, physical discipline, and championship mindset fuel both my athletic and coding pursuits.',
      tag: 'Sport & Passion',
      stats: [
        { label: 'Role Model', value: 'Cristiano Ronaldo' },
        { label: 'Game', value: 'Active Player' },
      ],
    },
    {
      icon: Dumbbell,
      title: 'Gym & Strength Training',
      subtitle: 'Iron Therapy & Daily Routine',
      color: 'from-blue-600 to-indigo-700',
      description:
        'Daily strength training is my mental reset and discipline anchor. Flexing personal records with progressive overload keeps cognitive output sharp for tackling deep distributed systems problems.',
      tag: 'High Agency Discipline',
      stats: [
        { label: 'Bench Press PR', value: '90 kg' },
        { label: 'Dumbbell Press PR', value: '30 kg' },
      ],
    },
    {
      icon: MapPin,
      title: 'Backpacking & Travel',
      subtitle: 'Explored All of North India',
      color: 'from-emerald-500 to-teal-600',
      description:
        'I love to travel, take scenic road trips, and explore new cultures away from screens. I have traveled across the entirety of North India—from rugged Himalayan passes to historic cultural towns.',
      tag: 'Wanderlust',
      stats: [
        { label: 'Exploration', value: 'All of North India' },
        { label: 'Style', value: 'Road Trips & Mountains' },
      ],
    },
    {
      icon: Terminal,
      title: '1,000+ LeetCode Problem Grind',
      subtitle: 'Competitive Programming Passion',
      color: 'from-purple-600 to-indigo-600',
      description:
        'There is nothing quite like the rush of optimizing an O(N²) quadratic graph traversal down to O(N log N) with bitmasking and custom heaps. Solved 1,000+ problems on LeetCode and 100+ on Codeforces.',
      tag: 'Algorithms & Problem Solving',
      stats: [
        { label: 'LeetCode', value: '1,000+ Solved' },
        { label: 'Codeforces', value: '100+ Solved' },
      ],
    },
  ];

  return (
    <div className="w-full py-4 font-sans space-y-6">
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 flex items-center gap-2">
          <span>Fun & Side Quests</span>
          <Trophy className="h-6 w-6 text-pink-500" />
        </h2>
        <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
          What keeps me energized, obsessed with problem solving, and building beyond code
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {hobbies.map((hobby, idx) => {
          const Icon = hobby.icon;
          return (
            <motion.div
              key={hobby.title}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, delay: idx * 0.08 }}
              className="group relative overflow-hidden rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-white/60 dark:bg-neutral-850/60 backdrop-blur-xl p-5 sm:p-6 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${hobby.color} text-white shadow-md group-hover:scale-110 transition-transform`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2.5 py-1 rounded-full">
                    {hobby.tag}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-bold text-neutral-900 dark:text-white group-hover:text-blue-500 transition-colors">
                  {hobby.title}
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-medium">
                  {hobby.subtitle}
                </p>
                <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 mt-3 leading-relaxed">
                  {hobby.description}
                </p>
              </div>

              {hobby.stats && (
                <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-neutral-100 dark:border-neutral-800/80">
                  {hobby.stats.map((st) => (
                    <div
                      key={st.label}
                      className="rounded-xl bg-neutral-100/70 dark:bg-neutral-800/50 p-2 text-center"
                    >
                      <div className="text-xs sm:text-sm font-bold text-neutral-900 dark:text-white">
                        {st.value}
                      </div>
                      <div className="text-[10px] text-neutral-500 dark:text-neutral-400 font-medium mt-0.5">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
