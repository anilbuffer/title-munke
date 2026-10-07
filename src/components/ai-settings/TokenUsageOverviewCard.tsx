'use client';

import React from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import { BarChart3, ArrowRight } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

function OpenAIIcon({ className = 'w-4 h-4 text-emerald-600' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4754 4.4754 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4706 4.4706 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4947 4.4947 0 0 1-.6768 8.1042v-5.6772a.79.79 0 0 0-.4018-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.8824-2.8197a4.5045 4.5045 0 0 1 6.6384 4.8872zM12.0002 13.038l-2.4839-1.4339 2.4839-1.434 2.484 1.434-2.484 1.4339z" />
    </svg>
  );
}

function ClaudeIcon({ className = 'w-4 h-4 text-amber-600' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <circle cx="12" cy="12" r="5" />
      <path d="M12 2v3m0 14v3M2 12h3m14 0h3m-3.05-6.95l-2.12 2.12m-9.66 9.66l-2.12 2.12m0-13.9l2.12 2.12m9.66 9.66l2.12 2.12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export function TokenUsageOverviewCard() {
  const { tokenUsage, setIsUsageModalOpen } = useAISettings();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
              Token Usage Overview
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 font-sans">
              Track token usage and limits for each AI model. Limits are based on your subscription or internal allocation.
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsUsageModalOpen(true)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#550000] hover:text-[#700000] self-start sm:self-auto group cursor-pointer"
        >
          <span>View Detailed Usage</span>
          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Usage Cards Grid matching reference */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tokenUsage.slice(0, 2).map((item) => {
          const percentage = Math.round((item.usedTokens / item.totalTokens) * 100);
          const remainingTokens = item.totalTokens - item.usedTokens;
          const isOpenAI = item.provider === 'openai';

          return (
            <div
              key={item.modelId}
              className="p-4 rounded-xl border border-[#eadfd4] bg-white flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-6 h-6 rounded-md flex items-center justify-center ${
                        isOpenAI ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                      }`}
                    >
                      {isOpenAI ? <OpenAIIcon /> : <ClaudeIcon />}
                    </div>
                    <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans">
                      {item.modelName}
                    </span>
                  </div>

                  <span className="text-xs font-semibold text-stone-600 font-mono">
                    {formatNumber(item.usedTokens)} / {formatNumber(item.totalTokens)} tokens
                  </span>
                </div>

                <div className="space-y-1.5 mb-4">
                  <div className="flex justify-end">
                    <span className={`text-[11px] font-bold ${isOpenAI ? 'text-emerald-600' : 'text-[#550000]'}`}>
                      {percentage}%
                    </span>
                  </div>
                  <div className="h-2 w-full bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        isOpenAI ? 'bg-emerald-500' : 'bg-[#550000]'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-[#f0e7dd] text-left">
                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">
                    Used this month
                  </span>
                  <span className="text-xs font-bold text-stone-800 font-mono">
                    {formatNumber(item.usedTokens)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">
                    Remaining
                  </span>
                  <span className="text-xs font-bold text-stone-800 font-mono">
                    {formatNumber(remainingTokens)}
                  </span>
                </div>

                <div>
                  <span className="text-[10px] text-stone-400 block font-sans">
                    Reset date
                  </span>
                  <span className="text-xs font-semibold text-stone-800 font-sans">
                    {item.resetDate}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
