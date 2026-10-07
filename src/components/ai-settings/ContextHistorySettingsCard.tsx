'use client';

import React from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import { Database, Info } from 'lucide-react';

export function ContextHistorySettingsCard() {
  const { contextConfig, updateContextConfig } = useAISettings();

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="w-9 h-9 rounded-xl bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600 shrink-0">
          <Database className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
            Context & History Settings
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-sans">
            Manage conversation memory and context for better responses.
          </p>
        </div>
      </div>

      {/* Two Inputs Grid matching screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Context Window (tokens) */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-1.5">
            <span>Context Window (tokens)</span>
            <span className="relative group/tooltip inline-flex items-center cursor-help" title="Maximum tokens of conversation history and document context sent to the AI model per request (e.g. 4,000 tokens ≈ 3,000 words).">
              <Info className="w-3.5 h-3.5 text-stone-400 group-hover/tooltip:text-[#550000] transition-colors" />
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-stone-900 text-stone-100 text-[11px] font-normal leading-relaxed text-left shadow-xl z-50 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 font-sans"
              >
                Maximum tokens of conversation history and document context sent to the AI model per request (e.g. 4,000 tokens ≈ 3,000 words).
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
              </span>
            </span>
          </label>

          <input
            type="number"
            value={contextConfig.contextWindowTokens}
            onChange={(e) =>
              updateContextConfig({
                contextWindowTokens: parseInt(e.target.value) || 4000,
              })
            }
            className="w-full bg-white border border-[#ded5cb] rounded-lg px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs font-mono"
          />

          <p className="text-[11px] text-stone-500 mt-1.5 font-sans">
            Maximum tokens of context sent to the model per request.
          </p>
        </div>

        {/* Conversation History Limit */}
        <div>
          <label className="flex items-center gap-1.5 text-xs font-semibold text-stone-700 mb-1.5">
            <span>Conversation History Limit</span>
            <span className="relative group/tooltip inline-flex items-center cursor-help" title="Number of previous messages retained in session memory to maintain conversational context across multiple questions.">
              <Info className="w-3.5 h-3.5 text-stone-400 group-hover/tooltip:text-[#550000] transition-colors" />
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-2.5 rounded-lg bg-stone-900 text-stone-100 text-[11px] font-normal leading-relaxed text-left shadow-xl z-50 opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-150 font-sans"
              >
                Number of previous messages retained in session memory to maintain conversational context across multiple questions.
                <span className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-stone-900" />
              </span>
            </span>
          </label>

          <div className="relative">
            <input
              type="number"
              value={contextConfig.conversationHistoryLimit}
              onChange={(e) =>
                updateContextConfig({
                  conversationHistoryLimit: parseInt(e.target.value) || 10,
                })
              }
              className="w-full bg-white border border-[#ded5cb] rounded-lg px-3.5 py-2.5 pr-20 text-xs sm:text-sm font-semibold text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all shadow-2xs font-mono"
            />
            <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-medium text-stone-400 pointer-events-none font-sans">
              messages
            </span>
          </div>

          <p className="text-[11px] text-stone-500 mt-1.5 font-sans">
            Number of previous messages to include in the conversation.
          </p>
        </div>
      </div>
    </div>
  );
}
