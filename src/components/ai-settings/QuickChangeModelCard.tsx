'use client';

import React from 'react';
import { ChevronDown, Sparkles, Check, Cpu } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';
import { AI_PROVIDERS } from '@/data/mock-ai-settings';
import { AIProviderId } from '@/types/ai-settings';

export function QuickChangeModelCard() {
  const { functionConfigs, updateFunctionModel } = useAISettings();

  const currentQAConfig = functionConfigs.chatbot_qa;
  const currentModelId = currentQAConfig?.model || 'gpt-4o-mini';

  // Flatten available models for easy quick selection
  const allModels = AI_PROVIDERS.flatMap((provider) =>
    provider.availableModels.map((model) => ({
      ...model,
      providerName: provider.name,
      providerId: provider.id,
    }))
  );

  const handleSelectModel = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    const modelObj = allModels.find((m) => m.id === selectedId);
    if (modelObj) {
      updateFunctionModel('chatbot_qa', modelObj.providerId as AIProviderId, modelObj.id);
      // Synchronize default OCR if applicable
      updateFunctionModel('pdf_ocr', modelObj.providerId as AIProviderId, modelObj.id);
    }
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-6 sm:p-7 mb-6 transition-colors">
      {/* Title Header matching user screenshot */}
      <div className="pb-4 border-b border-[#f0e7dd]">
        <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
          Change AI Model
        </h2>
      </div>

      {/* Model Dropdown Container matching user screenshot */}
      <div className="pt-6 max-w-xl">
        <div className="relative">
          <select
            value={currentModelId}
            onChange={handleSelectModel}
            className="w-full appearance-none bg-white border border-[#ded5cb] rounded-xl px-4 py-3 pr-10 text-xs sm:text-sm font-medium text-stone-800 focus:outline-hidden focus:ring-2 focus:ring-[#550000] focus:border-transparent transition-all cursor-pointer shadow-2xs"
          >
            {allModels.map((m) => (
              <option key={m.id} value={m.id}>
                {m.name} — {m.providerName} ({m.isRecommended ? 'Recommended' : `${(m.contextWindow / 1000).toFixed(0)}k context`})
              </option>
            ))}
          </select>

          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-stone-500">
            <ChevronDown className="w-4 h-4" />
          </div>
        </div>

        <p className="text-[11px] text-stone-500 mt-2">
          Select primary inference engine for broker inquiry generation, title deed parsing, and search indexing.
        </p>
      </div>
    </div>
  );
}
