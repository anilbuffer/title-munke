'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  Database,
  Info,
  Sliders,
  Sparkles,
  Search,
  Check,
} from 'lucide-react';

export function ContextHistorySettingsCard() {
  const { contextConfig, updateContextConfig } = useAISettings();
  const [showRAGSettings, setShowRAGSettings] = useState(false);

  const tokenPresets = [4000, 8000, 16000, 32000, 128000];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-center text-purple-600 dark:text-purple-400">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              Context & History Settings
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Manage conversation memory and context for better responses.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowRAGSettings(!showRAGSettings)}
          className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline px-2 py-1 rounded"
        >
          {showRAGSettings ? 'Hide RAG Options' : 'Vector RAG Options'}
        </button>
      </div>

      {/* Inputs Grid matching reference screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Context Window (tokens) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <span>Context Window (tokens)</span>
              <span
                title="Controls how much historical property deed text and conversation context is provided per LLM request."
                className="cursor-help text-stone-400 hover:text-stone-600"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              min={1000}
              max={2000000}
              step={1000}
              value={contextConfig.contextWindowTokens}
              onChange={(e) =>
                updateContextConfig({
                  contextWindowTokens: parseInt(e.target.value) || 4000,
                })
              }
              className="w-full bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs"
            />
          </div>

          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
            Maximum tokens of context sent to the model per request.
          </p>

          {/* Quick preset chips */}
          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {tokenPresets.map((tokens) => (
              <button
                key={tokens}
                onClick={() => updateContextConfig({ contextWindowTokens: tokens })}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                  contextConfig.contextWindowTokens === tokens
                    ? 'bg-purple-50 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-bold'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                {tokens >= 1000 ? `${tokens / 1000}k` : tokens}
              </button>
            ))}
          </div>
        </div>

        {/* Conversation History Limit */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-300">
              <span>Conversation History Limit</span>
              <span
                title="Number of preceding user-agent turns to append into subsequent search requests."
                className="cursor-help text-stone-400 hover:text-stone-600"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </label>
          </div>

          <div className="relative">
            <input
              type="number"
              min={1}
              max={50}
              value={contextConfig.conversationHistoryLimit}
              onChange={(e) =>
                updateContextConfig({
                  conversationHistoryLimit: parseInt(e.target.value) || 10,
                })
              }
              className="w-full bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg px-3.5 py-2.5 pr-20 text-xs sm:text-sm font-semibold text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 pointer-events-none">
              messages
            </span>
          </div>

          <p className="text-[11px] text-stone-400 dark:text-stone-500 mt-1.5">
            Number of previous messages to include in the conversation.
          </p>

          <div className="flex items-center gap-2 mt-2">
            {[5, 10, 15, 20].map((count) => (
              <button
                key={count}
                onClick={() => updateContextConfig({ conversationHistoryLimit: count })}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors ${
                  contextConfig.conversationHistoryLimit === count
                    ? 'bg-purple-50 dark:bg-purple-950/80 border-purple-300 dark:border-purple-700 text-purple-700 dark:text-purple-300 font-bold'
                    : 'bg-white dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-500 dark:text-stone-400 hover:border-stone-300'
                }`}
              >
                {count} msgs
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Advanced Deed Vector RAG parameters (Toggled) */}
      {showRAGSettings && (
        <div className="mt-5 pt-4 border-t border-stone-100 dark:border-stone-800 space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-700 dark:text-stone-300">
            <Search className="w-4 h-4 text-purple-600" />
            <span>County Deeds & Public Records Retrieval Augmented Generation (RAG)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 dark:text-stone-300 mb-1">
                <span>Vector Similarity Threshold</span>
                <span className="font-mono text-purple-600 dark:text-purple-400">
                  {contextConfig.ragSimilarityThreshold}
                </span>
              </div>
              <input
                type="range"
                min="0.5"
                max="0.95"
                step="0.01"
                value={contextConfig.ragSimilarityThreshold}
                onChange={(e) =>
                  updateContextConfig({ ragSimilarityThreshold: parseFloat(e.target.value) })
                }
                className="w-full accent-[#550000] cursor-pointer"
              />
              <p className="text-[10px] text-stone-400 mt-1">
                Higher scores guarantee stricter legal instrument relevance.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-stone-50 dark:bg-stone-800/60 border border-stone-200 dark:border-stone-700/60 flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-700 dark:text-stone-300">
                  Hybrid BM25 + Dense Search
                </p>
                <p className="text-[10px] text-stone-400 mt-0.5">
                  Combine exact APN/Instrument numbers with semantic query matching.
                </p>
              </div>

              <button
                onClick={() =>
                  updateContextConfig({
                    enableHybridSearch: !contextConfig.enableHybridSearch,
                  })
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 ${
                  contextConfig.enableHybridSearch ? 'bg-[#550000]' : 'bg-stone-300 dark:bg-stone-700'
                }`}
              >
                <div
                  className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ${
                    contextConfig.enableHybridSearch ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
