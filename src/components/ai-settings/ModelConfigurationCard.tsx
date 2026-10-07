'use client';

import React from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  Layers,
  MessageSquare,
  FileText,
  Info,
  ChevronDown,
} from 'lucide-react';
import { AI_PROVIDERS } from '@/data/mock-ai-settings';
import { AIFunctionKey, AIProviderId } from '@/types/ai-settings';

function ProviderIcon({ providerId }: { providerId: string }) {
  if (providerId === 'openai') {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4754 4.4754 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4706 4.4706 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4947 4.4947 0 0 1-.6768 8.1042v-5.6772a.79.79 0 0 0-.4018-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.8824-2.8197a4.5045 4.5045 0 0 1 6.6384 4.8872zM12.0002 13.038l-2.4839-1.4339 2.4839-1.434 2.484 1.434-2.484 1.4339z" />
      </svg>
    );
  }
  return null;
}

export function ModelConfigurationCard() {
  const { functionConfigs, updateFunctionModel } = useAISettings();

  const configs: {
    key: AIFunctionKey;
    title: string;
    description: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
  }[] = [
    {
      key: 'chatbot_qa',
      title: 'Chatbot (Q&A)',
      description: 'Used for answering user questions in chat based on documents and knowledge base.',
      icon: MessageSquare,
      iconColor: 'text-blue-500',
      iconBg: 'bg-blue-50 border-blue-100',
    },
    {
      key: 'pdf_ocr',
      title: 'PDF Extraction (OCR)',
      description: 'Extract text and structured content from uploaded documents.',
      icon: FileText,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50 border-rose-100',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-3 pb-4 mb-4 border-b border-[#f0e7dd]">
        <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600 shrink-0">
          <Layers className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
            Model Configuration
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 font-sans">
            Select AI model and provider for each function.
          </p>
        </div>
      </div>

      {/* Rows */}
      <div className="space-y-4">
        {configs.map((item) => {
          const config = functionConfigs[item.key] || {
            provider: 'openai',
            model: 'gpt-4o-mini',
          };
          const Icon = item.icon;
          const currentProvider = AI_PROVIDERS.find((p) => p.id === config.provider) || AI_PROVIDERS[0];
          const availableModels = currentProvider.availableModels;

          return (
            <div
              key={item.key}
              className="p-4 sm:p-5 rounded-xl border border-[#eadfd4] bg-[#fbf9f6] flex flex-col lg:flex-row lg:items-center justify-between gap-4"
            >
              {/* Left: Info */}
              <div className="flex items-start gap-3.5 max-w-md">
                <div className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 ${item.iconBg}`}>
                  <Icon className={`w-5 h-5 ${item.iconColor}`} />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5 leading-relaxed font-sans">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right: Provider & Model Selectors matching screenshot */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0 lg:w-[420px]">
                {/* Provider Selector */}
                <div className="flex-1">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-stone-500 mb-1">
                    <span>Provider</span>
                    <Info className="w-3 h-3 text-stone-400" />
                  </label>
                  <div className="relative">
                    <select
                      value={config.provider}
                      onChange={(e) => {
                        const newProviderId = e.target.value as AIProviderId;
                        const newProviderObj = AI_PROVIDERS.find((p) => p.id === newProviderId);
                        const defaultModel = newProviderObj?.availableModels[0]?.id || 'gpt-4o-mini';
                        updateFunctionModel(item.key, newProviderId, defaultModel);
                      }}
                      className="w-full appearance-none bg-white border border-[#ded5cb] rounded-lg px-3 py-2 pl-8 text-xs sm:text-sm font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all cursor-pointer shadow-2xs"
                    >
                      {AI_PROVIDERS.map((prov) => (
                        <option key={prov.id} value={prov.id}>
                          {prov.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-2.5 top-1/2 -translate-y-1/2 text-stone-700 pointer-events-none">
                      <ProviderIcon providerId={config.provider} />
                    </div>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* Model Selector */}
                <div className="flex-1">
                  <label className="flex items-center gap-1 text-[11px] font-medium text-stone-500 mb-1">
                    <span>Model</span>
                  </label>
                  <div className="relative">
                    <select
                      value={config.model}
                      onChange={(e) => updateFunctionModel(item.key, config.provider, e.target.value)}
                      className="w-full appearance-none bg-white border border-[#ded5cb] rounded-lg px-3 py-2 pr-8 text-xs sm:text-sm font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all cursor-pointer shadow-2xs"
                    >
                      {availableModels.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.name}
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
          );
        })}
      </div>
    </div>
  );
}
