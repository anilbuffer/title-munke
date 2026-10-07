'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import { Database, Info, Search } from 'lucide-react';
import { formatNumber } from '@/lib/utils';

export function ContextHistorySettingsCard() {
  const { contextConfig, updateContextConfig } = useAISettings();
  const [showRAGSettings, setShowRAGSettings] = useState(false);

  const tokenPresets = [4000, 8000, 16000, 32000, 128000];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans">
              Context & History Settings
            </h2>
            <p className="text-xs sm:text-sm text-stone-500">
              Manage conversation memory and context for better responses.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowRAGSettings(!showRAGSettings)}
          className="text-xs font-semibold text-[#550000] hover:text-[#700000] px-2 py-1 rounded cursor-pointer"
        >
          {showRAGSettings ? 'Hide RAG Options' : 'Vector RAG Options'}
        </button>
      </div>

      {/* Inputs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Context Window (tokens) */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
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
              className="w-full bg-white border border-[#ded5cb] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs font-mono"
            />
          </div>

          <p className="text-[11px] text-stone-500 mt-1.5">
            Maximum tokens of context sent to the model per request.
          </p>

          <div className="flex items-center gap-1.5 mt-2 flex-wrap">
            {tokenPresets.map((tokens) => (
              <button
                key={tokens}
                onClick={() => updateContextConfig({ contextWindowTokens: tokens })}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  contextConfig.contextWindowTokens === tokens
                    ? 'bg-rose-50 border-[#550000] text-[#550000] font-bold'
                    : 'bg-white border-[#eadfd4] text-stone-600 hover:border-stone-400'
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
            <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700">
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
              className="w-full bg-white border border-[#ded5cb] rounded-lg px-3.5 py-2.5 pr-20 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs font-mono"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 pointer-events-none">
              messages
            </span>
          </div>

          <p className="text-[11px] text-stone-500 mt-1.5">
            Number of previous messages to include in the conversation.
          </p>

          <div className="flex items-center gap-2 mt-2">
            {[5, 10, 15, 20].map((count) => (
              <button
                key={count}
                onClick={() => updateContextConfig({ conversationHistoryLimit: count })}
                className={`px-2 py-0.5 rounded text-[10px] font-medium border transition-colors cursor-pointer ${
                  contextConfig.conversationHistoryLimit === count
                    ? 'bg-rose-50 border-[#550000] text-[#550000] font-bold'
                    : 'bg-white border-[#eadfd4] text-stone-600 hover:border-stone-400'
                }`}
              >
                {count} msgs
              </button>
            ))}
          </div>
        </div>
      </div>

      {showRAGSettings && (
        <div className="mt-5 pt-4 border-t border-[#f0e7dd] space-y-4 animate-in fade-in duration-200">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-800">
            <Search className="w-4 h-4 text-[#550000]" />
            <span>County Deeds & Public Records Retrieval Augmented Generation (RAG)</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#eadfd4]">
              <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-1">
                <span>Vector Similarity Threshold</span>
                <span className="font-mono text-[#550000] font-bold">
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
              <p className="text-[10px] text-stone-500 mt-1">
                Higher scores guarantee stricter legal instrument relevance.
              </p>
            </div>

            <div className="p-3 rounded-xl bg-[#fbf9f6] border border-[#eadfd4] flex items-center justify-between">
              <div>
                <p className="text-xs font-semibold text-stone-700">
                  Hybrid BM25 + Dense Search
                </p>
                <p className="text-[10px] text-stone-500 mt-0.5">
                  Combine exact APN/Instrument numbers with semantic query matching.
                </p>
              </div>

              <button
                onClick={() =>
                  updateContextConfig({
                    enableHybridSearch: !contextConfig.enableHybridSearch,
                  })
                }
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-colors duration-200 cursor-pointer ${
                  contextConfig.enableHybridSearch ? 'bg-[#550000]' : 'bg-stone-300'
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
