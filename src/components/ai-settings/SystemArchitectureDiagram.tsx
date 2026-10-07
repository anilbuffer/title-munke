'use client';

import React, { useState } from 'react';
import {
  Network,
  Cpu,
  Database,
  Bot,
  ArrowDown,
  Sparkles,
} from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

export function SystemArchitectureDiagram() {
  const { functionConfigs } = useAISettings();
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const qaModel = functionConfigs.chatbot_qa?.model || 'gpt-4o-mini';

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
          <Network className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-sm sm:text-base font-bold text-stone-900 font-sans">
            System Architecture
          </h2>
          <p className="text-[11px] text-stone-500">
            Real-time inference & data routing topology
          </p>
        </div>
      </div>

      {/* Interactive Architectural Canvas matching reference screenshot */}
      <div className="p-4 rounded-xl bg-[#fbf9f6] border border-[#eadfd4] flex flex-col items-center">
        
        {/* Tier 1: Admin Panel */}
        <div
          onClick={() => setSelectedNode('admin')}
          className="w-full max-w-[280px] p-3 rounded-xl bg-blue-50 border border-blue-200 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 font-sans">
            <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:animate-ping" />
            <span>Admin Panel</span>
          </div>
          <p className="text-[10px] text-blue-700/80 mt-0.5">
            Select AI models & configure settings
          </p>
        </div>

        {/* Arrow Down Split */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-stone-300" />
          <ArrowDown className="w-3.5 h-3.5 text-stone-400 -mt-1" />
        </div>

        {/* Tier 2: Multi-Model Providers Grid */}
        <div className="grid grid-cols-4 gap-1.5 sm:gap-2 w-full max-w-[320px]">
          {/* OpenAI */}
          <div
            onClick={() => setSelectedNode('openai')}
            className="p-2 rounded-lg bg-white border border-emerald-200 text-center shadow-2xs hover:border-emerald-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-emerald-100 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-emerald-700">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 truncate">
              OpenAI
            </div>
            <div className="text-[9px] text-stone-500 truncate">GPT-4o</div>
          </div>

          {/* Claude */}
          <div
            onClick={() => setSelectedNode('anthropic')}
            className="p-2 rounded-lg bg-white border border-amber-200 text-center shadow-2xs hover:border-amber-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-amber-100 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-amber-700">AI</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 truncate">
              Claude
            </div>
            <div className="text-[9px] text-stone-500 truncate">Claude 3</div>
          </div>

          {/* Grok */}
          <div
            onClick={() => setSelectedNode('xai')}
            className="p-2 rounded-lg bg-white border border-stone-200 text-center shadow-2xs hover:border-stone-500 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-200 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-stone-700">X1</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 truncate">
              Grok
            </div>
            <div className="text-[9px] text-stone-500 truncate">Grok 1</div>
          </div>

          {/* More Providers */}
          <div
            onClick={() => setSelectedNode('more')}
            className="p-2 rounded-lg bg-white border border-stone-200 text-center shadow-2xs hover:border-stone-400 transition-all cursor-pointer"
          >
            <div className="w-5 h-5 mx-auto rounded-sm bg-stone-100 flex items-center justify-center mb-1">
              <span className="text-[10px] font-bold text-stone-500">•••</span>
            </div>
            <div className="text-[11px] font-bold text-stone-800 truncate">
              More
            </div>
            <div className="text-[9px] text-stone-500 truncate">Providers</div>
          </div>
        </div>

        {/* Arrow Down Merge */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-stone-300" />
          <ArrowDown className="w-3.5 h-3.5 text-stone-400 -mt-1" />
        </div>

        {/* Tier 3: AI Gateway */}
        <div
          onClick={() => setSelectedNode('gateway')}
          className="w-full max-w-[280px] p-2.5 rounded-xl bg-purple-50 border border-purple-200 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-purple-900 font-sans">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>AI Gateway</span>
          </div>
          <p className="text-[10px] text-purple-700/80 mt-0.5">
            Routes requests to selected provider
          </p>
        </div>

        {/* Arrow Down Split */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-stone-300" />
          <ArrowDown className="w-3.5 h-3.5 text-stone-400 -mt-1" />
        </div>

        {/* Tier 4: Storage Row */}
        <div className="grid grid-cols-2 gap-2.5 w-full max-w-[300px]">
          {/* Conversation DB */}
          <div
            onClick={() => setSelectedNode('conv_db')}
            className="p-2.5 rounded-xl bg-blue-50/70 border border-blue-200 text-left shadow-2xs hover:border-blue-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-900">
              <Database className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Conversation DB</span>
            </div>
            <p className="text-[9px] text-blue-700/80 mt-1 leading-tight">
              Stores user/AI conversation history
            </p>
          </div>

          {/* Vector DB */}
          <div
            onClick={() => setSelectedNode('vector_db')}
            className="p-2.5 rounded-xl bg-emerald-50/70 border border-emerald-200 text-left shadow-2xs hover:border-emerald-400 transition-all cursor-pointer"
          >
            <div className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-900">
              <Database className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
              <span>Vector DB</span>
            </div>
            <p className="text-[9px] text-emerald-700/80 mt-1 leading-tight">
              Stores document embeddings & knowledge
            </p>
          </div>
        </div>

        {/* Arrow Down Merge */}
        <div className="flex flex-col items-center my-1">
          <div className="w-0.5 h-3 bg-stone-300" />
          <ArrowDown className="w-3.5 h-3.5 text-stone-400 -mt-1" />
        </div>

        {/* Tier 5: Chatbot Node */}
        <div
          onClick={() => setSelectedNode('chatbot')}
          className="w-full max-w-[280px] p-2.5 rounded-xl bg-blue-50 border border-blue-200 text-center shadow-2xs hover:shadow-md transition-all cursor-pointer"
        >
          <div className="flex items-center justify-center gap-1.5 text-xs font-bold text-blue-900 font-sans">
            <Bot className="w-3.5 h-3.5 text-blue-600" />
            <span>Chatbot</span>
          </div>
          <p className="text-[10px] text-blue-700/80 mt-0.5">
            Uses selected model with history & context
          </p>
        </div>

      </div>

      {/* Dynamic Inspector Callout */}
      {selectedNode && (
        <div className="mt-3 p-3 rounded-lg bg-stone-50 border border-[#eadfd4] text-xs text-stone-600 animate-in fade-in">
          <div className="flex items-center justify-between font-semibold text-stone-900 mb-1">
            <span className="capitalize">{selectedNode.replace('_', ' ')} Inspector</span>
            <button
              onClick={() => setSelectedNode(null)}
              className="text-stone-400 hover:text-stone-600 text-[10px] cursor-pointer"
            >
              Close
            </button>
          </div>
          <p className="text-[11px] text-stone-500 leading-relaxed">
            {selectedNode === 'gateway' &&
              'AI Gateway dynamically handles automated failovers, rate-limit retries, and token auditing across all Title Munke microservices.'}
            {selectedNode === 'admin' &&
              'Live configuration synced via REST & WebSockets directly to the Title Munke gateway proxy.'}
            {selectedNode === 'vector_db' &&
              'Milvus & Pinecone cluster indexing millions of deed grantors, grantees, and parcel boundaries.'}
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
