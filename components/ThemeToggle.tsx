'use client';

import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useCallback, useEffect, useState } from 'react';

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const hasResolvedTheme = typeof resolvedTheme === 'string';
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setHasMounted(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  const isInteractive = hasMounted && hasResolvedTheme;
  const isDark = resolvedTheme === 'dark';

  const handleToggle = useCallback(() => {
    if (!isInteractive) {
      return;
    }

    setTheme(isDark ? 'light' : 'dark');
  }, [isDark, isInteractive, setTheme]);

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleToggle}
      aria-label="Toggle theme"
      aria-pressed={isInteractive ? isDark : undefined}
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border border-white/40 bg-white/80 shadow-md transition-all duration-300 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-slate-900/70"
      disabled={!isInteractive}
    >
      {isInteractive ? (
        isDark ? (
          <Sun className="h-5 w-5 text-amber-300" />
        ) : (
          <Moon className="h-5 w-5 text-slate-600" />
        )
      ) : (
        <span
          className="h-5 w-5 rounded-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900"
          aria-hidden
        />
      )}
    </motion.button>
  );
}