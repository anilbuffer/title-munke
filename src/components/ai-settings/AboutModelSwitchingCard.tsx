'use client';

import React from 'react';
import { Lightbulb } from 'lucide-react';

export function AboutModelSwitchingCard() {
  const steps = [
    {
      num: 1,
      text: 'Select different models for each task (Chatbot Q&A, Deed PDF OCR, Chain of Title reasoning, and Metes Parser).',
    },
    {
      num: 2,
      text: 'Conversation history is stored in your database, so you can switch models without losing parcel inquiry context.',
    },
    {
      num: 3,
      text: 'Each model and pipeline maintains its own system prompt with dynamic property and vesting variables.',
    },
    {
      num: 4,
      text: 'Standby fallback models automatically maintain uptime if primary gateway providers experience rate limits.',
    },
    {
      num: 5,
      text: 'Changes apply immediately upon clicking "Save Changes", and live latency can be verified via "Test Connection".',
    },
    {
      num: 6,
      text: 'Monitor token consumption across models, and top up allocations anytime via "Add Tokens" to prevent query throttling.',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-[#fffef4] border border-[#fef08a] shadow-2xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500 fill-amber-400 shrink-0" />
        <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans tracking-tight">
          About Model Switching
        </h3>
      </div>

      {/* Numbered List matching reference */}
      <ul className="space-y-3.5">
        {steps.map((step) => (
          <li key={step.num} className="flex items-start gap-3">
            <span className="w-6 h-6 rounded-full bg-[#e8eff8] text-stone-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5 font-sans">
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
