'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  X,
  Calendar,
  BarChart3,
  CheckCircle2,
  Clock,
  ChevronDown,
} from 'lucide-react';

function ProviderBrandIcon({
  providerId,
  className = 'w-4 h-4',
}: {
  providerId: string;
  className?: string;
}) {
  if (providerId === 'openai') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4754 4.4754 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4706 4.4706 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4947 4.4947 0 0 1-.6768 8.1042v-5.6772a.79.79 0 0 0-.4018-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.8824-2.8197a4.5045 4.5045 0 0 1 6.6384 4.8872zM12.0002 13.038l-2.4839-1.4339 2.4839-1.434 2.484 1.434-2.484 1.4339z" />
      </svg>
    );
  }
  if (providerId === 'anthropic') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <circle cx="12" cy="12" r="5" />
        <path
          d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.05-6.95l-2.12 2.12m-9.66 9.66l-2.12 2.12m0-13.9l2.12 2.12m9.66 9.66l2.12 2.12"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    );
  }
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14.93V18h-2v-1.07A6 6 0 0 1 6.07 12H7a5 5 0 0 0 5 5v-1a4 4 0 0 1-4-4H7a5 5 0 0 0 5-5V6h2v1.07A6 6 0 0 1 17.93 12H17a5 5 0 0 0-5-5v1a4 4 0 0 1 4 4h1a5 5 0 0 0-4 4.93z" />
    </svg>
  );
}

export function DetailedUsageModal() {
  const { isUsageModalOpen, setIsUsageModalOpen, tokenUsage } = useAISettings();
  const [selectedRange, setSelectedRange] = useState('October 2026');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  if (!isUsageModalOpen) return null;

  const dateRanges = ['October 2026', 'September 2026', 'August 2026', 'Last 30 Days', 'Last 90 Days'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsUsageModalOpen(false)}
        className="fixed inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#eadfd4] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 sm:p-6 border-b border-[#f0e7dd] bg-[#fdfbf9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faf2f2] border border-[#ebd8d8] flex items-center justify-center text-[#550000] shrink-0 shadow-2xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
                Detailed Token Usage Report
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Consumption metrics and model allocation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-auto">
            {/* Date Range Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-[#eadfd4] bg-white text-stone-700 hover:bg-[#faf6f0] hover:border-stone-300 shadow-2xs transition-colors cursor-pointer"
              >
                <Calendar className="w-3.5 h-3.5 text-stone-500" />
                <span>{selectedRange}</span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-1.5 w-44 rounded-xl bg-white border border-[#eadfd4] shadow-lg py-1.5 z-20">
                  {dateRanges.map((range) => (
                    <button
                      key={range}
                      type="button"
                      onClick={() => {
                        setSelectedRange(range);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-1.5 text-xs transition-colors cursor-pointer ${
                        selectedRange === range
                          ? 'bg-[#faf2f2] text-[#550000] font-bold'
                          : 'text-stone-700 hover:bg-stone-50'
                      }`}
                    >
                      {range}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsUsageModalOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[75vh] overflow-y-auto custom-scrollbar bg-white">
          <div className="flex items-center justify-between mb-1">
            <h3 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
              Model Allocation & Quota Utilization
            </h3>
            <span className="text-[11px] text-stone-500 font-sans">
              Live billing rate tier: Commercial Pro
            </span>
          </div>

          {/* Model Breakdown Table */}
          <div className="rounded-xl border border-[#eadfd4] overflow-hidden bg-white shadow-2xs">
            <table className="w-full text-left text-xs font-sans">
              <thead className="bg-[#faf6f0] text-stone-600 border-b border-[#f0e7dd]">
                <tr>
                  <th className="py-2.5 px-4 font-bold text-stone-700">Model Provider</th>
                  <th className="py-2.5 px-4 font-bold text-stone-700">Consumed Tokens</th>
                  <th className="py-2.5 px-4 font-bold text-stone-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#f0e7dd]">
                {tokenUsage.map((m) => (
                  <tr key={m.modelId} className="hover:bg-[#fdfbf9] transition-colors">
                    <td className="py-3 px-4 font-semibold text-stone-900">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-md bg-[#faf2f2] text-[#550000] border border-[#ebd8d8] flex items-center justify-center shrink-0">
                          <ProviderBrandIcon providerId={m.provider} className="w-3 h-3" />
                        </div>
                        <span className="truncate">{m.modelName}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-stone-800">
                      {m.usedTokens.toLocaleString()}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1 text-[11px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full font-semibold">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Normal
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 sm:p-5 bg-[#faf6f0] border-t border-[#f0e7dd] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <Clock className="w-3.5 h-3.5 text-stone-400 shrink-0" />
            <span>Next automatic reset occurs on October 31, 2026 at 23:59 UTC</span>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
            <button
              type="button"
              onClick={() => setIsUsageModalOpen(false)}
              className="w-full sm:w-auto px-4 py-2 text-xs font-semibold rounded-lg bg-[#550000] hover:bg-[#450000] text-white shadow-xs transition-colors cursor-pointer font-sans"
            >
              Close Report
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
