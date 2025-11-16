'use client';

import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Lightbulb, PiggyBank, Receipt, TrendingDown } from 'lucide-react';

type Tip = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const tips: Tip[] = [
  {
    icon: TrendingDown,
    title: 'Compare costs with other items in work hours',
    description: 'Understanding value in terms of your time helps make better decisions',
  },
  {
    icon: Lightbulb,
    title: 'Think about alternatives and necessity',
    description: 'Consider if there are cheaper alternatives or if you really need it',
  },
  {
    icon: PiggyBank,
    title: 'Consider saving instead of credit',
    description: 'Avoid interest charges by saving up rather than using credit cards',
  },
  {
    icon: Receipt,
    title: 'Account for taxes that reduce your real salary',
    description: 'Remember that your take-home pay is less than your gross salary',
  },
];

export function SmartTips() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mt-12 w-full max-w-4xl"
      aria-labelledby="smart-tips-title"
    >
      <h2
        id="smart-tips-title"
        className="mb-6 flex items-center justify-center gap-3 text-xl font-semibold tracking-tight text-slate-900 dark:text-slate-100"
      >
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-yellow-400 via-amber-400 to-orange-400 text-slate-900 shadow-lg shadow-amber-300/50 dark:from-amber-300 dark:via-yellow-300 dark:to-orange-300">
          <Lightbulb className="h-5 w-5" />
        </span>
        Smart Shopping Tips
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {tips.map((tip, index) => (
          <motion.article
            key={tip.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="rounded-2xl border border-white/40 bg-white/80 p-5 shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl dark:border-white/10 dark:bg-slate-900/60"
          >
            <div className="mb-2 flex items-start gap-2">
              <div className="mt-0.5 rounded-full bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-2 shadow-lg shadow-indigo-400/40">
                <tip.icon className="h-4 w-4 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold leading-tight text-slate-900 dark:text-slate-100">
                  {tip.title}
                </h3>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
                  {tip.description}
                </p>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.section>
  );
}