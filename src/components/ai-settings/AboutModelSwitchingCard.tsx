'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

export function AboutModelSwitchingCard() {
  const steps = [
    {
      num: 1,
      text: 'Select different models for each task (Chatbot, PDF Extraction, etc.).',
    },
    {
      num: 2,
      text: 'Conversation history is stored in your database, so you can switch models without losing context.',
    },
    {
      num: 3,
      text: 'Each model will use its own system prompt.',
    },
    {
      num: 4,
      text: 'Changes apply immediately to new requests.',
    },
    {
      num: 5,
      text: 'Monitor token usage to manage costs and limits.',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#fffcf7] border border-[#f3e5d0] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2.5 mb-4">
        <div className="w-7 h-7 rounded-lg bg-amber-100 flex items-center justify-center text-amber-700 shrink-0">
          <Lightbulb className="w-4 h-4" />
        </div>
        <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans">
          About Model Switching
        </h3>
      </div>

      {/* Numbered List matching reference screenshot */}
      <ul className="space-y-3">
        {steps.map((step) => (
          <li key={step.num} className="flex items-start gap-3">
            <span className="w-5 h-5 rounded-full bg-amber-200/90 text-amber-900 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
              {step.num}
            </span>
            <span className="text-xs sm:text-[13px] text-stone-700 leading-relaxed font-sans">
              {step.text}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
