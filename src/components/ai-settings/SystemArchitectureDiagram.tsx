'use client';

import React from 'react';
import {
  Network,
  Database,
  Bot,
  ArrowDown,
  Sparkles,
} from 'lucide-react';

export function SystemArchitectureDiagram() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 shrink-0">
          <Network className="w-4 h-4" />
        </div>
        <h2 className="text-base font-bold text-stone-900 font-sans tracking-tight">
          System Architecture
        </h2>
      </div>

      {/* Topology Diagram Container matching screenshot */}
      <div className="p-3 sm:p-4 rounded-xl bg-white border border-[#eadfd4] flex flex-col items-center">
        
        {/* Tier 1: Admin Panel */}
        <div className="w-full max-w-[260px] p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center shadow-2xs">
          <div className="text-xs font-bold text-blue-900 font-sans">
            Admin Panel
          </div>
          <p className="text-[10px] text-blue-700 mt-0.5 font-sans">
            Select AI models & configure settings
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-3 bg-blue-200" />
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 -mt-1" />
        </div>

        {/* Tier 2: Providers Grid */}
        <div className="grid grid-cols-4 gap-1.5 w-full max-w-[310px]">
          {/* OpenAI */}
          <div className="p-2 rounded-lg bg-white border border-emerald-200 text-center shadow-2xs">
            <div className="w-5 h-5 mx-auto rounded-sm bg-emerald-100 flex items-center justify-center mb-1">
              <span className="text-[9px] font-bold text-emerald-700">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-900 truncate font-sans">OpenAI</div>
            <div className="text-[9px] text-stone-500 truncate font-sans">GPT-4o</div>
          </div>

          {/* Claude */}
          <div className="p-2 rounded-lg bg-white border border-amber-200 text-center shadow-2xs">
            <div className="w-5 h-5 mx-auto rounded-sm bg-amber-100 flex items-center justify-center mb-1">
              <span className="text-[9px] font-bold text-amber-700">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-900 truncate font-sans">Claude</div>
            <div className="text-[9px] text-stone-500 truncate font-sans">Claude 3</div>
          </div>

          {/* Grok */}
          <div className="p-2 rounded-lg bg-white border border-stone-200 text-center shadow-2xs">
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-100 flex items-center justify-center mb-1">
              <span className="text-[9px] font-bold text-stone-700">X1</span>
            </div>
            <div className="text-[11px] font-bold text-stone-900 truncate font-sans">Grok</div>
            <div className="text-[9px] text-stone-500 truncate font-sans">Grok 1</div>
          </div>

          {/* More Providers */}
          <div className="p-2 rounded-lg bg-white border border-stone-200 text-center shadow-2xs">
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-100 flex items-center justify-center mb-1">
              <span className="text-[9px] font-bold text-stone-500">•••</span>
            </div>
            <div className="text-[11px] font-bold text-stone-900 truncate font-sans">More</div>
            <div className="text-[9px] text-stone-500 truncate font-sans">Providers</div>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-3 bg-blue-200" />
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 -mt-1" />
        </div>

        {/* Tier 3: AI Gateway */}
        <div className="w-full max-w-[260px] p-2.5 rounded-xl bg-purple-50/70 border border-purple-200 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-purple-900 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Gateway</span>
          </div>
          <p className="text-[10px] text-purple-700 mt-0.5 font-sans">
            Routes requests to selected provider
          </p>
        </div>

        {/* Arrow Down */}
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-3 bg-blue-200" />
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 -mt-1" />
        </div>

        {/* Tier 4: Storage Row */}
        <div className="grid grid-cols-2 gap-2 w-full max-w-[290px]">
          {/* Conversation DB */}
          <div className="p-2 rounded-lg bg-blue-50/60 border border-blue-200 text-left shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-900 font-sans">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Conversation DB</span>
            </div>
            <p className="text-[9px] text-blue-700 mt-0.5 leading-tight font-sans">
              Stores user/AI conversation history
            </p>
          </div>

          {/* Vector DB */}
          <div className="p-2 rounded-lg bg-emerald-50/60 border border-emerald-200 text-left shadow-2xs">
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 font-sans">
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Vector DB</span>
            </div>
            <p className="text-[9px] text-emerald-700 mt-0.5 leading-tight font-sans">
              Stores document embeddings & knowledge
            </p>
          </div>
        </div>

        {/* Arrow Down */}
        <div className="flex flex-col items-center my-1.5">
          <div className="w-px h-3 bg-blue-200" />
          <ArrowDown className="w-3.5 h-3.5 text-blue-400 -mt-1" />
        </div>

        {/* Tier 5: Chatbot Node */}
        <div className="w-full max-w-[260px] p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center shadow-2xs">
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 font-sans">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Chatbot</span>
          </div>
          <p className="text-[10px] text-blue-700 mt-0.5 font-sans">
            Uses selected model with history & context
          </p>
        </div>

      </div>
    </div>
  );
}
