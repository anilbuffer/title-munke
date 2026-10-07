'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  X,
  Download,
  Calendar,
  Filter,
  BarChart3,
  TrendingUp,
  DollarSign,
  Zap,
  CheckCircle2,
} from 'lucide-react';

export function DetailedUsageModal() {
  const { isUsageModalOpen, setIsUsageModalOpen, tokenUsage } = useAISettings();
  const [selectedRange, setSelectedRange] = useState('October 2026');

  if (!isUsageModalOpen) return null;

  const usageByFunction = [
    { name: 'Property Search & Chatbot Q&A', tokens: '64,200', cost: '$4.85', percentage: 48 },
    { name: 'Deed & Mortgage PDF OCR Extraction', tokens: '41,100', cost: '$8.20', percentage: 31 },
    { name: 'Chain of Title & Encumbrance Reasoning', tokens: '22,400', cost: '$4.62', percentage: 17 },
    { name: 'Legal Description Metes Parser', tokens: '5,300', cost: '$0.75', percentage: 4 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsUsageModalOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-4xl bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-800 z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-stone-100 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faf2f2] border border-[#ebd8d8] flex items-center justify-center text-[#550000]">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-stone-900 dark:text-white">
                Detailed Token Usage Report
              </h2>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Consumption metrics, billing projections, and pipeline throughput.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                alert('Exporting detailed usage audit CSV...');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={() => setIsUsageModalOpen(false)}
              className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-6 max-h-[75vh] overflow-y-auto custom-scrollbar">
          
          {/* Quick Metrics KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Total Month Tokens
              </span>
              <span className="text-xl font-bold text-stone-900 dark:text-white mt-1 block font-mono">
                133,000
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">
                ↑ 14% vs last cycle
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Cost Month-to-Date
              </span>
              <span className="text-xl font-bold text-stone-900 dark:text-white mt-1 block font-mono">
                $18.42
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Of $100.00 soft limit
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Average Latency
              </span>
              <span className="text-xl font-bold text-stone-900 dark:text-white mt-1 block font-mono">
                195 ms
              </span>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5 block">
                Fast (p95: 320ms)
              </span>
            </div>

            <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200/80 dark:border-stone-700/80">
              <span className="text-[11px] font-semibold text-stone-400 uppercase tracking-wider block">
                Title Inquiries Processed
              </span>
              <span className="text-xl font-bold text-stone-900 dark:text-white mt-1 block font-mono">
                1,842
              </span>
              <span className="text-[10px] text-stone-400 mt-0.5 block">
                Zero rate-limit throttles
              </span>
            </div>
          </div>

          {/* Model Breakdown Table */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3">
              Model Allocation & Quota Utilization
            </h3>

            <div className="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-stone-50 dark:bg-stone-800/80 text-stone-500 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                  <tr>
                    <th className="py-2.5 px-4 font-semibold">Model Provider</th>
                    <th className="py-2.5 px-4 font-semibold">Consumed Tokens</th>
                    <th className="py-2.5 px-4 font-semibold">Utilization</th>
                    <th className="py-2.5 px-4 font-semibold">Estimated Cost</th>
                    <th className="py-2.5 px-4 font-semibold">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 dark:divide-stone-800">
                  {tokenUsage.map((m) => {
                    const pct = Math.round((m.usedTokens / m.totalTokens) * 100);
                    return (
                      <tr key={m.modelId} className="hover:bg-stone-50/50 dark:hover:bg-stone-800/30">
                        <td className="py-3 px-4 font-semibold text-stone-900 dark:text-stone-100">
                          {m.modelName}
                        </td>
                        <td className="py-3 px-4 font-mono text-stone-700 dark:text-stone-300">
                          {m.usedTokens.toLocaleString()} / {m.totalTokens.toLocaleString()}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2">
                            <div className="w-16 h-1.5 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-500 rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="font-mono text-[11px] text-stone-500">{pct}%</span>
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-medium text-stone-900 dark:text-stone-100">
                          ${m.costMonthToDate.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="inline-flex items-center gap-1 text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                            <CheckCircle2 className="w-3.5 h-3.5" /> Normal
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Breakdown by Function */}
          <div>
            <h3 className="text-xs font-bold text-stone-900 dark:text-white uppercase tracking-wider mb-3">
              Distribution By Title Search Pipeline
            </h3>

            <div className="space-y-3">
              {usageByFunction.map((fn) => (
                <div
                  key={fn.name}
                  className="p-3 rounded-xl bg-stone-50/70 dark:bg-stone-800/40 border border-stone-200/70 dark:border-stone-800 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1 mr-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-stone-800 dark:text-stone-200">
                        {fn.name}
                      </span>
                      <span className="text-xs font-mono font-semibold text-stone-900 dark:text-white">
                        {fn.tokens} tokens ({fn.cost})
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#550000] rounded-full"
                        style={{ width: `${fn.percentage}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-bold text-stone-400 font-mono">
                    {fn.percentage}%
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-stone-50 dark:bg-stone-800/60 border-t border-stone-100 dark:border-stone-800 flex items-center justify-between">
          <span className="text-xs text-stone-500">
            Next automatic reset occurs on October 31, 2026 23:59 UTC
          </span>
          <button
            onClick={() => setIsUsageModalOpen(false)}
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-stone-900 dark:bg-white text-white dark:text-stone-900 hover:bg-stone-800 transition-colors"
          >
            Close Report
          </button>
        </div>

      </div>
    </div>
  );
}
