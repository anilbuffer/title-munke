'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  FileCode2,
  Info,
  RotateCcw,
  MessageSquare,
  FileText,
  GitCommit,
  Copy,
  Check,
  Sparkles,
  Tag,
} from 'lucide-react';
import { AIFunctionKey } from '@/types/ai-settings';

// Custom Provider Icons
function OpenAIBrandIcon({ className = 'w-4 h-4 text-emerald-600' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4754 4.4754 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4706 4.4706 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4947 4.4947 0 0 1-.6768 8.1042v-5.6772a.79.79 0 0 0-.4018-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.8824-2.8197a4.5045 4.5045 0 0 1 6.6384 4.8872zM12.0002 13.038l-2.4839-1.4339 2.4839-1.434 2.484 1.434-2.484 1.4339z" />
    </svg>
  );
}

function ClaudeBrandIcon({ className = 'w-4 h-4 text-amber-600' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M13.827 3.518l5.836 15.727h-3.415l-1.282-3.664H8.88l-1.258 3.664H4.279L10.14 3.518h3.687zm-1.895 4.497l-2.083 5.922h4.143l-2.06-5.922z" />
    </svg>
  );
}

export function SystemPromptsCard() {
  const {
    systemPrompts,
    updateSystemPrompt,
    resetAllPromptsForFunction,
    activePromptTab,
    setActivePromptTab,
    addToast,
  } = useAISettings();

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const tabs: { key: AIFunctionKey; label: string; icon: React.ElementType }[] = [
    { key: 'chatbot_qa', label: 'Chatbot (Q&A)', icon: MessageSquare },
    { key: 'pdf_ocr', label: 'PDF Extraction (OCR)', icon: FileText },
    { key: 'chain_of_title', label: 'Chain of Title & Liens', icon: GitCommit },
  ];

  // OpenAI prompt template for active function
  const openAiPromptKey = `${activePromptTab}:openai`;
  const openAiPrompt = systemPrompts[openAiPromptKey] || {
    id: openAiPromptKey,
    functionKey: activePromptTab,
    provider: 'openai',
    modelDisplayName: 'OpenAI - GPT-4o-mini',
    prompt: 'You are a helpful AI assistant for property title searches.',
    defaultPrompt: 'You are a helpful AI assistant for property title searches.',
    maxLimit: 2000,
    variables: ['{{property_address}}', '{{parcel_apn}}'],
    lastModified: 'Default',
  };

  // Claude prompt template for active function
  const claudePromptKey = `${activePromptTab}:anthropic`;
  const claudePrompt = systemPrompts[claudePromptKey] || {
    id: claudePromptKey,
    functionKey: activePromptTab,
    provider: 'anthropic',
    modelDisplayName: 'Claude - Claude 3.5 Sonnet',
    prompt: 'You are a helpful AI assistant powered by Claude for Title Munke.',
    defaultPrompt: 'You are a helpful AI assistant powered by Claude for Title Munke.',
    maxLimit: 2000,
    variables: ['{{property_address}}', '{{recorded_instruments}}'],
    lastModified: 'Default',
  };

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    addToast({
      type: 'info',
      title: 'Prompt Copied',
      description: 'System prompt copied to clipboard.',
    });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleInsertVariable = (promptId: string, currentText: string, variable: string) => {
    const updated = `${currentText} ${variable}`;
    updateSystemPrompt(promptId, updated);
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
      {/* Header with Title & Reset Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
                System Prompts
              </h2>
              <span
                title="These instructions define the behavior, tone, legal safety boundaries and context for Title Munke models."
                className="cursor-help text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                <Info className="w-3.5 h-3.5" />
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Customize system prompts for each AI model. These instructions define the behavior, tone and context for the AI.
            </p>
          </div>
        </div>

        <button
          onClick={() => resetAllPromptsForFunction(activePromptTab)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 border border-indigo-200 dark:border-indigo-800/60 transition-colors self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to Default</span>
        </button>
      </div>

      {/* Function Tabs */}
      <div className="flex items-center gap-2 pb-4 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePromptTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActivePromptTab(tab.key)}
              className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-200 ${
                isActive
                  ? 'bg-blue-600 text-white shadow-xs shadow-blue-500/30'
                  : 'bg-stone-50 dark:bg-stone-800/80 text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200/60 dark:border-stone-700/60'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Prompt Cards matching reference screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* OpenAI Card */}
        <div className="flex flex-col p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60 focus-within:border-emerald-500/60 focus-within:ring-2 focus-within:ring-emerald-500/20 transition-all">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-emerald-100 dark:bg-emerald-950/80 flex items-center justify-center">
                <OpenAIBrandIcon className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                {openAiPrompt.modelDisplayName || 'OpenAI - GPT-4o-mini'}
              </span>
            </div>

            <button
              onClick={() => handleCopy(openAiPrompt.id, openAiPrompt.prompt)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded"
              title="Copy prompt text"
            >
              {copiedId === openAiPrompt.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={openAiPrompt.prompt}
            onChange={(e) => updateSystemPrompt(openAiPrompt.id, e.target.value)}
            rows={7}
            maxLength={openAiPrompt.maxLimit}
            className="w-full bg-transparent text-xs sm:text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 resize-none focus:outline-hidden leading-relaxed custom-scrollbar font-sans"
            placeholder="Define custom instructions for OpenAI model..."
          />

          {/* Prompt Variables Pills */}
          <div className="pt-2 mt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] uppercase font-semibold text-stone-400">Insert:</span>
              {openAiPrompt.variables?.map((v) => (
                <button
                  key={v}
                  onClick={() => handleInsertVariable(openAiPrompt.id, openAiPrompt.prompt, v)}
                  className="px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-emerald-500 text-[10px] font-mono text-stone-600 dark:text-stone-300 transition-colors"
                  title={`Insert ${v} into prompt`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="font-mono text-[11px] text-stone-400 shrink-0 pl-2">
              <span className={openAiPrompt.prompt.length > 1900 ? 'text-amber-500 font-bold' : ''}>
                {openAiPrompt.prompt.length}
              </span>
              /{openAiPrompt.maxLimit}
            </div>
          </div>
        </div>

        {/* Claude Card */}
        <div className="flex flex-col p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-900/60 focus-within:border-amber-500/60 focus-within:ring-2 focus-within:ring-amber-500/20 transition-all">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-stone-200/80 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-amber-100 dark:bg-amber-950/80 flex items-center justify-center">
                <ClaudeBrandIcon className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
              </div>
              <span className="text-xs sm:text-sm font-bold text-stone-900 dark:text-white">
                {claudePrompt.modelDisplayName || 'Claude'}
              </span>
            </div>

            <button
              onClick={() => handleCopy(claudePrompt.id, claudePrompt.prompt)}
              className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 p-1 rounded"
              title="Copy prompt text"
            >
              {copiedId === claudePrompt.id ? (
                <Check className="w-3.5 h-3.5 text-emerald-600" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Textarea */}
          <textarea
            value={claudePrompt.prompt}
            onChange={(e) => updateSystemPrompt(claudePrompt.id, e.target.value)}
            rows={7}
            maxLength={claudePrompt.maxLimit}
            className="w-full bg-transparent text-xs sm:text-sm text-stone-800 dark:text-stone-200 placeholder-stone-400 resize-none focus:outline-hidden leading-relaxed custom-scrollbar font-sans"
            placeholder="Define custom instructions for Claude model..."
          />

          {/* Prompt Variables Pills */}
          <div className="pt-2 mt-2 border-t border-stone-200/60 dark:border-stone-800 flex items-center justify-between text-[11px] text-stone-400">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[10px] uppercase font-semibold text-stone-400">Insert:</span>
              {claudePrompt.variables?.map((v) => (
                <button
                  key={v}
                  onClick={() => handleInsertVariable(claudePrompt.id, claudePrompt.prompt, v)}
                  className="px-1.5 py-0.5 rounded bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-500 text-[10px] font-mono text-stone-600 dark:text-stone-300 transition-colors"
                  title={`Insert ${v} into prompt`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div className="font-mono text-[11px] text-stone-400 shrink-0 pl-2">
              <span className={claudePrompt.prompt.length > 1900 ? 'text-amber-500 font-bold' : ''}>
                {claudePrompt.prompt.length}
              </span>
              /{claudePrompt.maxLimit}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
