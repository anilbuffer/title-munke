'use client';

import React from 'react';
import { BarChart2, ArrowRight } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

export function DetailedUsageCard() {
  const { setIsUsageModalOpen } = useAISettings();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#faf2f2] border border-[#ebd8d8] shadow-xs transition-colors">
      <div className="flex items-center gap-2 mb-2">
        <BarChart2 className="w-5 h-5 text-[#550000]" />
        <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans tracking-tight">
          View Detailed Token Usage
        </h3>
      </div>

      <p className="text-xs text-stone-600 leading-relaxed mb-4 font-sans">
        See token consumption by user, model, date range and detailed statistics.
      </p>

      <button
        onClick={() => setIsUsageModalOpen(true)}
        className="inline-flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg bg-white text-[#550000] border border-[#ebd8d8] hover:bg-[#550000] hover:text-white shadow-2xs transition-all cursor-pointer font-sans"
      >
        <span>Open Usage Report</span>
        <ArrowRight className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
