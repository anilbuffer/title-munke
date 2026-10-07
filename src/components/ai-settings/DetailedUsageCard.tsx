'use client';

import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

export function DetailedUsageCard() {
  const { setIsUsageModalOpen } = useAISettings();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      <div className="flex items-center gap-2.5 mb-2">
        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center text-blue-700 shrink-0">
          <BarChart2 className="w-4 h-4" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans">
          View Detailed Token Usage
        </h3>
      </div>

      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed mb-4">
        See token consumption by user, model, date range and detailed statistics.
      </p>

      <button
        onClick={() => setIsUsageModalOpen(true)}
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-white text-stone-800 border border-[#eadfd4] hover:bg-stone-50 shadow-2xs hover:shadow-xs transition-all group cursor-pointer"
      >
        <span>Open Usage Report</span>
        <ArrowRight className="w-4 h-4 text-stone-400 group-hover:translate-x-1 transition-transform" />
      </button>
    </div>
  );
}
