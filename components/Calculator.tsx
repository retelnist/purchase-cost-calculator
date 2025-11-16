'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Clock, DollarSign, TrendingUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import clsx from 'clsx';

import {
  PERIOD_OPTIONS,
  calculateWorkMetrics,
  type SalaryPeriod,
  type WorkMetrics,
} from '@/lib/cost-calculator';

type MetricKey = Extract<keyof WorkMetrics, 'days' | 'weeks' | 'hourlyRate'>;

const metricConfig: ReadonlyArray<{
  readonly id: MetricKey;
  readonly label: string;
  readonly helper: string;
  readonly formatter: (value: number) => string;
  readonly delay: number;
}> = [
  {
    id: 'hourlyRate',
    label: 'Hourly Rate',
    helper: 'per hour',
    formatter: (value) => `$${value.toFixed(2)}`,
    delay: 0.2,
  },
  {
    id: 'days',
    label: 'Days',
    helper: 'of work',
    formatter: (value) => value.toFixed(1),
    delay: 0.25,
  },
  {
    id: 'weeks',
    label: 'Weeks',
    helper: 'of work',
    formatter: (value) => value.toFixed(1),
    delay: 0.3,
  },
] as const;

const panelClassName =
  'rounded-3xl border border-white/40 bg-white/80 p-8 shadow-2xl backdrop-blur-lg transition-all duration-300 dark:border-white/10 dark:bg-slate-900/60';

export function Calculator() {
  const [salary, setSalary] = useState('');
  const [period, setPeriod] = useState<SalaryPeriod>('month');
  const [purchaseCost, setPurchaseCost] = useState('');

  const workMetrics = useMemo(
    () => calculateWorkMetrics({ salary, period, purchaseCost }),
    [salary, period, purchaseCost],
  );

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="w-full max-w-xl"
    >
      <div className={panelClassName}>
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-center text-3xl font-semibold tracking-tight text-transparent dark:from-sky-400 dark:via-indigo-400 dark:to-violet-400"
        >
          Purchase Cost Calculator
        </motion.h1>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-6"
          >
            <CurrencyInput
              id="salary"
              label="Your Salary"
              icon={DollarSign}
              placeholder="50000"
              value={salary}
              onChange={setSalary}
            />

            <PeriodSelector
              selected={period}
              onSelect={setPeriod}
            />

            <CurrencyInput
              id="purchase-cost"
              label="Purchase Cost"
              icon={TrendingUp}
              placeholder="1200"
              value={purchaseCost}
              onChange={setPurchaseCost}
            />
          </motion.div>

          <MetricsPanel metrics={workMetrics} />
        </div>
      </div>
    </motion.section>
  );
}

interface CurrencyInputProps {
  id: string;
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  icon: LucideIcon;
}

function CurrencyInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  icon: Icon,
}: CurrencyInputProps) {
  return (
    <label htmlFor={id} className="block space-y-3">
      <span className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 dark:text-slate-200">
        <Icon className="h-3.5 w-3.5" />
        {label}
      </span>
      <div className="relative">
        <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-500">
          $
        </span>
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          placeholder={placeholder}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="w-full rounded-xl border border-slate-200/70 bg-white/70 py-3 pl-8 pr-4 text-sm text-slate-900 shadow-inner transition-all placeholder:text-slate-400 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/60 focus:ring-offset-2 focus:ring-offset-white dark:border-slate-700/60 dark:bg-slate-950/50 dark:text-slate-100 dark:placeholder:text-slate-500 dark:focus:ring-sky-400/50 dark:focus:ring-offset-slate-900"
        />
      </div>
    </label>
  );
}

interface PeriodSelectorProps {
  selected: SalaryPeriod;
  onSelect: (period: SalaryPeriod) => void;
}

function PeriodSelector({ selected, onSelect }: PeriodSelectorProps) {
  return (
    <div className="space-y-3">
      <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
        Salary Period
      </span>
      <div className="flex gap-2">
        {PERIOD_OPTIONS.map((option) => (
          <motion.button
            key={option.value}
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(option.value)}
            className={clsx(
              'flex-1 cursor-pointer rounded-xl px-4 py-2 text-sm font-medium transition-all',
              selected === option.value
                ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-600 text-white shadow-lg shadow-blue-500/30'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200 dark:bg-slate-800/60 dark:text-slate-300 dark:hover:bg-slate-700',
            )}
          >
            {option.label}
          </motion.button>
        ))}
      </div>
    </div>
  );
}

interface MetricsPanelProps {
  metrics: WorkMetrics | null;
}

function MetricsPanel({ metrics }: MetricsPanelProps) {
  return (
    <AnimatePresence mode="wait">
      {metrics && (
        <motion.div
          key={metrics.hours.toFixed(2)}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ delay: 0.1 }}
          className="space-y-4"
        >
          <div className="rounded-2xl bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-600 p-6 text-white shadow-xl">
            <div className="mb-1 flex items-center gap-1.5 text-xs font-medium opacity-90">
              <Clock className="h-3.5 w-3.5" />
              Hours Needed
            </div>
            <div className="text-4xl font-semibold tracking-tight">
              {metrics.hours.toFixed(1)}
            </div>
            <div className="mt-1 text-xs uppercase tracking-[0.15em] text-white/80">
              hours of work
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
            {metricConfig.map(({ delay, formatter, helper, id, label }) => (
              <motion.div
                key={id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay }}
                className="rounded-xl bg-white/80 p-4 text-left shadow-lg backdrop-blur dark:bg-slate-800/70"
              >
                <div className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">
                  {label}
                </div>
                <div className="mt-1 text-xl font-semibold text-slate-900 dark:text-slate-100">
                  {formatter(metrics[id])}
                </div>
                <div className="mt-1 text-xs uppercase tracking-[0.15em] text-slate-400 dark:text-slate-500">
                  {helper}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}