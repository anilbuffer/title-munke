'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  Layers,
  MessageSquare,
  FileText,
  GitCommit,
  Compass,
  Info,
  ChevronDown,
  Sparkles,
  Zap,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';
import { AI_PROVIDERS } from '@/data/mock-ai-settings';
import { AIFunctionKey, AIProviderId } from '@/types/ai-settings';

// Custom SVG Provider Logos
function ProviderLogo({ providerId, className = 'w-4 h-4' }: { providerId: string; className?: string }) {
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
        <path d="M13.827 3.518l5.836 15.727h-3.415l-1.282-3.664H8.88l-1.258 3.664H4.279L10.14 3.518h3.687zm-1.895 4.497l-2.083 5.922h4.143l-2.06-5.922z" />
      </svg>
    );
  }
  if (providerId === 'google') {
    return (
      <svg className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12zm1.25-18.75a1.25 1.25 0 0 1 2.5 0v5.5h5.5a1.25 1.25 0 0 1 0 2.5h-5.5v5.5a1.25 1.25 0 0 1-2.5 0v-5.5h-5.5a1.25 1.25 0 0 1 0-2.5h5.5v-5.5z" />
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

export function ModelConfigurationCard() {
  const { functionConfigs, updateFunctionModel, openTestModalForFunction } = useAISettings();
  const [showAdvancedModels, setShowAdvancedModels] = useState(false);

  // Group functions
  const primaryFunctions: AIFunctionKey[] = ['chatbot_qa', 'pdf_ocr'];
  const specializedFunctions: AIFunctionKey[] = ['chain_of_title', 'legal_desc'];

  const renderFunctionRow = (fnKey: AIFunctionKey) => {
    const config = functionConfigs[fnKey];
    if (!config) return null;

    const currentProvider = AI_PROVIDERS.find((p) => p.id === config.provider) || AI_PROVIDERS[0];
    const availableModels = currentProvider.availableModels;
    const currentModel = availableModels.find((m) => m.id === config.model) || availableModels[0];

    // Icon helper
    const getIcon = () => {
      switch (fnKey) {
        case 'chatbot_qa':
          return <MessageSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />;
        case 'pdf_ocr':
          return <FileText className="w-5 h-5 text-rose-600 dark:text-rose-400" />;
        case 'chain_of_title':
          return <GitCommit className="w-5 h-5 text-amber-600 dark:text-amber-400" />;
        case 'legal_desc':
          return <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />;
      }
    };

    const getIconBg = () => {
      switch (fnKey) {
        case 'chatbot_qa':
          return 'bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800';
        case 'pdf_ocr':
          return 'bg-rose-50 dark:bg-rose-950/50 border-rose-200 dark:border-rose-800';
        case 'chain_of_title':
          return 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800';
        case 'legal_desc':
          return 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800';
      }
    };

    return (
      <div
        key={fnKey}
        className="p-4 sm:p-5 rounded-xl border border-stone-200/90 dark:border-stone-800 bg-white dark:bg-stone-900/60 shadow-xs hover:border-stone-300 dark:hover:border-stone-700 transition-all duration-200"
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Left: Info & Description */}
          <div className="flex items-start gap-3.5 max-w-xl">
            <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${getIconBg()}`}>
              {getIcon()}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-semibold text-stone-900 dark:text-stone-100">
                  {config.label}
                </h3>
                <span className="text-[10px] font-medium text-stone-500 dark:text-stone-400 bg-stone-100 dark:bg-stone-800 px-2 py-0.5 rounded-full border border-stone-200 dark:border-stone-700">
                  {config.badge}
                </span>
              </div>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 leading-relaxed">
                {config.description}
              </p>

              {/* Model specs footnote */}
              {currentModel && (
                <div className="flex items-center flex-wrap gap-2 mt-2 pt-2 border-t border-stone-100 dark:border-stone-800/60 text-[11px] text-stone-400">
                  <span className="flex items-center gap-1">
                    <Zap className="w-3 h-3 text-amber-500" /> ~{currentModel.speedLatencyMs}ms
                  </span>
                  <span>•</span>
                  <span>Context: {(currentModel.contextWindow / 1000).toFixed(0)}k tokens</span>
                  <span>•</span>
                  <span>${currentModel.costPerMillionInput}/1M in</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Provider & Model Selectors */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 lg:w-[420px]">
            {/* Provider Selector */}
            <div className="flex-1">
              <label className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                <span>Provider</span>
                <span title="Routing provider API endpoint" className="cursor-help">
                  <Info className="w-3 h-3 text-stone-400" />
                </span>
              </label>

              <div className="relative">
                <select
                  value={config.provider}
                  onChange={(e) => {
                    const newProviderId = e.target.value as AIProviderId;
                    const newProviderObj = AI_PROVIDERS.find((p) => p.id === newProviderId);
                    const defaultModel = newProviderObj?.availableModels[0]?.id || 'gpt-4o-mini';
                    updateFunctionModel(fnKey, newProviderId, defaultModel);
                  }}
                  className="w-full appearance-none bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2 pl-9 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all cursor-pointer shadow-2xs"
                >
                  {AI_PROVIDERS.map((prov) => (
                    <option key={prov.id} value={prov.id}>
                      {prov.name}
                    </option>
                  ))}
                </select>

                {/* Provider Icon in Input */}
                <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-600 dark:text-stone-300 pointer-events-none">
                  <ProviderLogo providerId={config.provider} className="w-4 h-4" />
                </div>

                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Model Selector */}
            <div className="flex-1">
              <label className="flex items-center gap-1 text-[11px] font-semibold text-stone-600 dark:text-stone-400 mb-1.5">
                <span>Model</span>
              </label>

              <div className="relative">
                <select
                  value={config.model}
                  onChange={(e) => updateFunctionModel(fnKey, config.provider, e.target.value)}
                  className="w-full appearance-none bg-stone-50 dark:bg-stone-800/90 border border-stone-200 dark:border-stone-700 rounded-lg px-3 py-2 text-xs sm:text-sm font-medium text-stone-800 dark:text-stone-200 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all cursor-pointer shadow-2xs"
                >
                  {availableModels.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} {m.isRecommended ? '★' : ''}
                    </option>
                  ))}
                </select>

                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 shadow-sm transition-colors">
      {/* Card Header */}
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-100 dark:border-stone-800">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-stone-900 dark:text-white">
              Model Configuration
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400">
              Select AI model and provider for each function.
            </p>
          </div>
        </div>

        <button
          onClick={() => setShowAdvancedModels(!showAdvancedModels)}
          className="inline-flex items-center gap-1.5 text-xs font-medium text-[#550000] dark:text-rose-400 hover:underline px-2 py-1 rounded"
        >
          <span>{showAdvancedModels ? 'Fewer Pipelines' : 'Specialized Title Models'}</span>
          <ChevronRight className={`w-3.5 h-3.5 transition-transform ${showAdvancedModels ? 'rotate-90' : ''}`} />
        </button>
      </div>

      {/* Primary Function Rows (Chatbot Q&A & PDF Extraction) */}
      <div className="space-y-3.5">
        {primaryFunctions.map((fnKey) => renderFunctionRow(fnKey))}

        {/* Specialized Title Intelligence Rows (Toggled) */}
        {showAdvancedModels && (
          <div className="space-y-3.5 pt-2 animate-in fade-in duration-300">
            <div className="flex items-center gap-2 px-1 text-xs font-semibold text-stone-400 uppercase tracking-wider">
              <span>Specialized Title Records Automation</span>
              <div className="flex-1 h-px bg-stone-200 dark:bg-stone-800" />
            </div>
            {specializedFunctions.map((fnKey) => renderFunctionRow(fnKey))}
          </div>
        )}
      </div>
    </div>
  );
}
