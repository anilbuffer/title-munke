'use client';

import React from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  FileCode2,
  Info,
  RotateCcw,
  MessageSquare,
  FileText,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { AIFunctionKey } from '@/types/ai-settings';
import { AI_PROVIDERS } from '@/data/mock-ai-settings';
import { getDefaultPrompt } from '@/lib/prompt-templates';

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
  if (providerId === 'google') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
      </svg>
    );
  }
  // Grok / xAI
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

export function SystemPromptsCard() {
  const {
    functionConfigs,
    systemPrompts,
    updateSystemPrompt,
    resetPromptToDefault,
    resetAllPromptsForFunction,
    activePromptTab,
    setActivePromptTab,
  } = useAISettings();

  const tabs: { key: AIFunctionKey; label: string; icon: React.ElementType }[] = [
    { key: 'chatbot_qa', label: 'Chatbot (Q&A)', icon: MessageSquare },
    { key: 'pdf_ocr', label: 'PDF Extraction (OCR)', icon: FileText },
  ];

  // 1. Resolve Active Model configured in Model Configuration for this active tab
  const activeFunctionConfig = functionConfigs[activePromptTab] || {
    provider: 'openai',
    model: 'gpt-4o-mini',
  };

  const activeProviderObj =
    AI_PROVIDERS.find((p) => p.id === activeFunctionConfig.provider) || AI_PROVIDERS[0];
  const activeModelObj =
    activeProviderObj.availableModels.find((m) => m.id === activeFunctionConfig.model) ||
    activeProviderObj.availableModels[0];

  // 2. Resolve Fallback / Standby Model (logical pairing)
  let fallbackProviderId = 'anthropic';
  let fallbackModelId = 'claude-3-5-sonnet';

  if (activeProviderObj.id === 'anthropic') {
    fallbackProviderId = 'openai';
    fallbackModelId = 'gpt-4o-mini';
  } else if (activeProviderObj.id === 'openai') {
    fallbackProviderId = 'anthropic';
    fallbackModelId = 'claude-3-5-sonnet';
  } else if (activeProviderObj.id === 'google') {
    fallbackProviderId = 'openai';
    fallbackModelId = 'gpt-4o-mini';
  } else if (activeProviderObj.id === 'xai') {
    fallbackProviderId = 'anthropic';
    fallbackModelId = 'claude-3-5-sonnet';
  }

  const fallbackProviderObj =
    AI_PROVIDERS.find((p) => p.id === fallbackProviderId) || AI_PROVIDERS[1];
  const fallbackModelObj =
    fallbackProviderObj.availableModels.find((m) => m.id === fallbackModelId) ||
    fallbackProviderObj.availableModels[0];

  // 3. Resolve Active Prompt data
  const activePromptKey = `${activePromptTab}:${activeProviderObj.id}:${activeModelObj.id}`;
  const legacyActiveKey = `${activePromptTab}:${activeProviderObj.id}`;
  const activeDefaultInfo = getDefaultPrompt(
    activePromptTab,
    activeProviderObj.id,
    activeModelObj.name
  );

  const activePromptText =
    systemPrompts[activePromptKey]?.prompt ??
    systemPrompts[legacyActiveKey]?.prompt ??
    activeDefaultInfo.prompt;

  // 4. Resolve Fallback Prompt data
  const fallbackPromptKey = `${activePromptTab}:${fallbackProviderObj.id}:${fallbackModelObj.id}`;
  const legacyFallbackKey = `${activePromptTab}:${fallbackProviderObj.id}`;
  const fallbackDefaultInfo = getDefaultPrompt(
    activePromptTab,
    fallbackProviderObj.id,
    fallbackModelObj.name
  );

  const fallbackPromptText =
    systemPrompts[fallbackPromptKey]?.prompt ??
    systemPrompts[legacyFallbackKey]?.prompt ??
    fallbackDefaultInfo.prompt;

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#faf2f2] border border-[#ebd8d8] flex items-center justify-center text-[#550000] shrink-0">
            <FileCode2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
                System Prompts
              </h2>
              <Info className="w-3.5 h-3.5 text-stone-400" />
            </div>
            <p className="text-xs sm:text-sm text-stone-500 font-sans">
              Customize system prompts for each AI model. Instructions automatically synchronize with your selected model.
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            resetPromptToDefault(activePromptKey, activeDefaultInfo.prompt);
            resetPromptToDefault(fallbackPromptKey, fallbackDefaultInfo.prompt);
            resetAllPromptsForFunction(activePromptTab);
          }}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg text-[#550000] bg-[#faf2f2] hover:bg-[#f5e4e4] border border-[#ebd8d8] transition-colors self-start sm:self-auto cursor-pointer"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset to Default</span>
        </button>
      </div>

      {/* Tabs matching screenshot */}
      <div className="flex items-center gap-2 pb-4">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activePromptTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActivePromptTab(tab.key)}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#550000] text-white shadow-xs'
                  : 'bg-white text-stone-600 hover:bg-[#fbf9f6] border border-[#eadfd4]'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Side-by-Side Prompt Cards Dynamically Synchronized with Model Configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* CARD 1: Selected Active Model (Synchronized with Model Configuration) */}
        <div className="flex flex-col p-4 rounded-xl border-2 border-[#550000]/30 bg-white shadow-xs transition-all duration-300 relative">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#f0e7dd]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-[#faf2f2] text-[#550000] border border-[#ebd8d8] flex items-center justify-center shrink-0">
                <ProviderBrandIcon providerId={activeProviderObj.id} />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans truncate block">
                  {activeProviderObj.name} - {activeModelObj.name}
                </span>
              </div>
            </div>

            {/* Active Model Pill */}
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-bold text-[#550000] bg-[#faf2f2] border border-[#ebd8d8] px-2 py-0.5 rounded-full shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#550000] animate-pulse" />
              Active Model
            </span>
          </div>

          <textarea
            value={activePromptText}
            onChange={(e) =>
              updateSystemPrompt(activePromptKey, e.target.value, {
                id: activePromptKey,
                functionKey: activePromptTab,
                provider: activeProviderObj.id,
                modelDisplayName: `${activeProviderObj.name} - ${activeModelObj.name}`,
                defaultPrompt: activeDefaultInfo.defaultPrompt,
                maxLimit: 2000,
              })
            }
            rows={6}
            maxLength={2000}
            className="w-full bg-transparent text-xs sm:text-sm text-stone-800 resize-none focus:outline-hidden leading-relaxed custom-scrollbar font-sans"
            placeholder={`Define system prompt instructions for ${activeModelObj.name}...`}
          />

          <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
            <span className="text-stone-500 font-sans">
              Currently routed in {tabs.find((t) => t.key === activePromptTab)?.label}
            </span>
            <span className="font-mono">
              {activePromptText.length}/2000
            </span>
          </div>
        </div>

        {/* CARD 2: Standby / Fallback Model */}
        <div className="flex flex-col p-4 rounded-xl border border-[#eadfd4] bg-[#fdfbf9] transition-all duration-300">
          <div className="flex items-center justify-between pb-3 mb-2 border-b border-[#f0e7dd]">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-6 h-6 rounded-md bg-stone-100 text-stone-600 border border-stone-200 flex items-center justify-center shrink-0">
                <ProviderBrandIcon providerId={fallbackProviderObj.id} />
              </div>
              <div className="min-w-0">
                <span className="text-xs sm:text-sm font-bold text-stone-900 font-sans truncate block">
                  {fallbackProviderObj.name} - {fallbackModelObj.name}
                </span>
              </div>
            </div>

            {/* Standby / Fallback Pill */}
            <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-medium text-stone-600 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded-full shrink-0">
              Standby / Fallback
            </span>
          </div>

          <textarea
            value={fallbackPromptText}
            onChange={(e) =>
              updateSystemPrompt(fallbackPromptKey, e.target.value, {
                id: fallbackPromptKey,
                functionKey: activePromptTab,
                provider: fallbackProviderObj.id,
                modelDisplayName: `${fallbackProviderObj.name} - ${fallbackModelObj.name}`,
                defaultPrompt: fallbackDefaultInfo.defaultPrompt,
                maxLimit: 2000,
              })
            }
            rows={6}
            maxLength={2000}
            className="w-full bg-transparent text-xs sm:text-sm text-stone-800 resize-none focus:outline-hidden leading-relaxed custom-scrollbar font-sans"
            placeholder={`Define fallback instructions for ${fallbackModelObj.name}...`}
          />

          <div className="pt-2 flex items-center justify-between text-[11px] text-stone-400">
            <span className="text-stone-500 font-sans">
              Standby failover target
            </span>
            <span className="font-mono">
              {fallbackPromptText.length}/2000
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
