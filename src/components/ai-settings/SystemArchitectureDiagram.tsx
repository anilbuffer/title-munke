'use client';

import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Database,
  Bot,
  ArrowDown,
  Sparkles,
  CheckCircle2,
  Server,
  Layers,
} from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

export function SystemArchitectureDiagram() {
  const { functionConfigs } = useAISettings();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  // Active models from config
  const qaModel = functionConfigs.chatbot_qa?.model || 'gpt-4o-mini';
  const ocrModel = functionConfigs.pdf_ocr?.model || 'gpt-4o-mini';

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Network className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 dark:text-white">
            System Architecture
          </h2>
          <p className="text-[11px] text-stone-500 dark:text-stone-400">
            Real-time inference & data routing topology
          </p>
        </div>
      </div>

      {/* Interactive Architectural Canvas matching reference screenshot */}
      <div className="p-4 rounded-xl bg-slate-50/70 dark:bg-slate-950/40 border border-slate-200/80 dark:border-slate-800/80 flex flex-col items-center">
        
        {/* Tier 1: Admin Panel */}
        <div
          onClick={() => setSelectedNode('admin')}
          className="w-full max-w-[280px] p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-200">
            <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
            <span>Admin Panel</span>
          </div>
          <p className="text-[10px] text-blue-700/80 dark:text-blue-300/80 mt-0.5">
            Select AI models & configure settings
          </p>
        </div>

        {/* Arrow Down Split */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700" />
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
        </div>

        {/* Tier 2: Multi-Model Providers Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-[320px]">
          {/* OpenAI */}
          <div
            onClick={() => setSelectedNode('openai')}
            className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-emerald-200 dark:border-emerald-800 text-center shadow-2xs hover:border-emerald-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate">
              OpenAI
            </div>
            <div className="text-[9px] text-stone-400 truncate">GPT-4o</div>
          </div>

          {/* Claude */}
          <div
            onClick={() => setSelectedNode('anthropic')}
            className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-amber-200 dark:border-amber-800 text-center shadow-2xs hover:border-amber-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-amber-100 dark:bg-amber-950 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate">
              Claude
            </div>
            <div className="text-[9px] text-stone-400 truncate">Claude 3</div>
          </div>

          {/* Grok */}
          <div
            onClick={() => setSelectedNode('xai')}
            className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-center shadow-2xs hover:border-stone-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-200 dark:bg-stone-800 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-stone-700 dark:text-stone-300">X1</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate">
              Grok
            </div>
            <div className="text-[9px] text-stone-400 truncate">Grok 1</div>
          </div>

          {/* More Providers */}
          <div
            onClick={() => setSelectedNode('more')}
            className="p-2 rounded-lg bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-center shadow-2xs hover:border-stone-400 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-stone-500">•••</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 dark:text-stone-200 truncate">
              More
            </div>
            <div className="text-[9px] text-stone-400 truncate">Providers</div>
          </div>
        </div>

        {/* Arrow Down Merge */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700" />
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
        </div>

        {/* Tier 3: AI Gateway */}
        <div
          onClick={() => setSelectedNode('gateway')}
          className="w-full max-w-[280px] p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-purple-900 dark:text-purple-200">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
            <span>AI Gateway</span>
          </div>
          <p className="text-[10px] text-purple-700/80 dark:text-purple-300/80 mt-0.5">
            Routes requests to selected provider
          </p>
        </div>

        {/* Arrow Down Split */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700" />
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
        </div>

        {/* Tier 4: Storage Row (Conversation DB + Vector DB) */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[300px]">
          {/* Conversation DB */}
          <div
            onClick={() => setSelectedNode('conv_db')}
            className="p-2.5 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 text-left shadow-2xs hover:border-blue-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-900 dark:text-blue-200">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Conversation DB</span>
            </div>
            <p className="text-[9px] text-blue-700/80 dark:text-blue-300/70 mt-1 leading-tight">
              Stores user/AI conversation history
            </p>
          </div>

          {/* Vector DB */}
          <div
            onClick={() => setSelectedNode('vector_db')}
            className="p-2.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-left shadow-2xs hover:border-emerald-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900 dark:text-emerald-200">
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Vector DB</span>
            </div>
            <p className="text-[9px] text-emerald-700/80 dark:text-emerald-300/70 mt-1 leading-tight">
              Stores document embeddings & knowledge
            </p>
          </div>
        </div>

        {/* Arrow Down Merge */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-slate-300 dark:bg-slate-700" />
          <ArrowDown className="w-3.5 h-3.5 text-slate-400 -mt-1" />
        </div>

        {/* Tier 5: Chatbot Node */}
        <div
          onClick={() => setSelectedNode('chatbot')}
          className="w-full max-w-[280px] p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 dark:text-blue-200">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Chatbot</span>
          </div>
          <p className="text-[10px] text-blue-700/80 dark:text-blue-300/80 mt-0.5">
            Uses selected model with history & context
          </p>
        </div>

      </div>

      {/* Dynamic Node Inspector Modal / Callout */}
      {selectedNode && (
        <div className="mt-3 p-3 rounded-lg bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 text-xs text-stone-600 dark:text-stone-300 animate-in fade-in">
          <div className="flex items-center justify-between font-semibold text-stone-900 dark:text-white mb-1">
            <span className="capitalize">{selectedNode.replace('_', ' ')} Inspector</span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 text-[10px]"
            >
              Close
            </button>
          </div>
          <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-relaxed">
            {selectedNode === 'gateway' &&
              'AI Gateway dynamically handles automated failovers, rate-limit retries, and token auditing across all Title Munke microservices.'}
            {selectedNode === 'admin' &&
              'Live configuration synced via REST & WebSockets directly to the Title Munke gateway proxy.'}
            {selectedNode === 'vector_db' &&
              'Milvus & Pinecone cluster indexing millions of deed grantors, grantors, and parcel boundaries.'}
            {selectedNode === 'conv_db' &&
              'PostgreSQL with pgvector storing full broker chat transcripts and title audit trails.'}
            {selectedNode === 'chatbot' &&
              `Currently invoking ${qaModel} with hot-swapped legal system prompts.`}
            {(selectedNode === 'openai' || selectedNode === 'anthropic' || selectedNode === 'xai') &&
              'Enterprise SLA tier connected with encrypted zero-data-retention agreements.'}
          </p>
        </div>
      )}
    </div>
  );
}
