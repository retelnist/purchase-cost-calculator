'use client';

import { Calculator } from '@/components/Calculator';
import { SmartTips } from '@/components/SmartTips';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100 transition-colors duration-500 dark:from-slate-950 dark:via-slate-900 dark:to-black">
      <BackgroundDecor />

      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="fixed right-4 top-4 z-50 sm:right-6 sm:top-6">
          <ThemeToggle />
        </header>

        <main className="flex flex-1 flex-col items-center justify-center px-4 py-20">
          <Calculator />
          <SmartTips />
          <Footer />
        </main>
      </div>
    </div>
  );
}

function BackgroundDecor() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 opacity-70 blur-3xl">
        <div className="absolute left-1/2 top-[-10%] h-64 w-64 -translate-x-1/2 rounded-full bg-blue-400/40 dark:bg-blue-500/20" />
        <div className="absolute bottom-[-15%] right-[-10%] h-96 w-96 rounded-full bg-purple-400/30 dark:bg-purple-600/20" />
      </div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(59,130,246,0.08),_transparent_55%)] dark:bg-[radial-gradient(circle_at_top,_rgba(129,140,248,0.12),_transparent_55%)]" />
    </>
  );
}

function Footer() {
  return (
    <footer className="mt-10 text-center text-xs text-slate-500 transition-colors dark:text-slate-400">
      <p>Make smarter financial decisions</p>
    </footer>
  );
}
