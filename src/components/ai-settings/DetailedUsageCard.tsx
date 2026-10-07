'use client';

import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

export function DetailedUsageCard() {
  const { setIsUsageModalOpen } = useAISettings();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-blue-50/60 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/40 shadow-xs transition-colors">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-blue-100 dark:bg-blue-900/60 flex items-center justify-center text-blue-700 dark:text-blue-400 shrink-0">
          <BarChart2 className="w-4 h-4" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
          View Detailed Token Usage
        </h3>
      </div>

      <p className="text-xs sm:text-[13px] text-stone-600 dark:text-stone-300 leading-relaxed mb-4">
        See token consumption by user, model, date range and detailed statistics.
      </p>

      <button
        onClick={() => setIsUsageModalOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-100 border border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700 shadow-2xs hover:shadow-xs transition-all group"
      >
        <span>Open Usage Report</span>
        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
