'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  X,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Clock,
  Sparkles,
  Bot,
  Layers,
} from 'lucide-react';
import { AI_PROVIDERS } from '@/data/mock-ai-settings';

export function TestConnectionModal() {
  const {
    isTestModalOpen,
    setIsTestModalOpen,
    testFunctionTarget,
    functionConfigs,
  } = useAISettings();

  const [activeTestFn, setActiveTestFn] = useState(testFunctionTarget || 'chatbot_qa');
  const [isRunning, setIsRunning] = useState(false);
  const [testResult, setTestResult] = useState<{
    latency: number;
    tokens: number;
    status: number;
    content: string;
  } | null>(null);

  if (!isTestModalOpen) return null;

  const currentConfig = functionConfigs[activeTestFn] || functionConfigs.chatbot_qa;
  const currentProvider = AI_PROVIDERS.find((p) => p.id === currentConfig.provider);

  const samplePrompt =
    activeTestFn === 'chatbot_qa'
      ? 'Perform property title check on 742 Evergreen Terrace. Verify Grantee vesting and flag open mortgages or mechanic liens recorded in 2024-2026.'
      : activeTestFn === 'pdf_ocr'
      ? 'Extract deed instrument fields: Recording Book 4022, Page 118, Grantor: Margaret Sterling, Grantee: Apex Title Trust.'
      : 'Analyze sequence of deeds from 1985 to 2026. Flag any wild deed breaks or unreleased probate dower rights.';

  const handleRunTest = async () => {
    setIsRunning(true);
    setTestResult(null);

    // Simulate real model inference
    await new Promise((r) => setTimeout(r, 650));

    setIsRunning(false);
    setTestResult({
      latency: Math.floor(160 + Math.random() * 60),
      tokens: 284,
      status: 200,
      content: `[TITLE MUNKE INTELLIGENCE ENGINE v2.4]
✔ Parcel APN: 442-019-32 (Verified Maricopa County Docket)
✔ Vesting: Fee Simple / Joint Tenancy (Instrument #2024-0091823)
✔ Chain of Title: 4 recorded conveyances verified back to 1994 patent.
⚠ Active Encumbrance Flagged:
  - Deed of Trust: $425,000 to First National Mortgage (Book 3812, Page 401).
  - Reconveyance Status: NO SATISFACTION RECORDED ON FILE.
  - Requirement: Escrow must request Payoff Demand & Deed of Reconveyance prior to closing.
Confidence Score: 98.4% | Model: ${currentConfig.model}`,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={() => setIsTestModalOpen(false)}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#eadfd4] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-[#f0e7dd] bg-[#fdfbf9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
                Live Model Test & Benchmark
              </h2>
              <p className="text-xs text-stone-500 font-sans mt-0.5">
                Execute simulated title queries to verify latency, prompt compliance, and gateway health.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsTestModalOpen(false)}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 sm:p-6 space-y-4 bg-white">
          
          {/* Target Config Badge */}
          <div className="p-3 rounded-xl bg-[#fdfbf9] border border-[#eadfd4] flex items-center justify-between text-xs">
            <div>
              <span className="text-stone-500 block text-[10px] uppercase font-semibold">
                Active Route Configuration
              </span>
              <span className="font-bold text-stone-900">
                {currentProvider?.name} → {currentConfig.model}
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Gateway Connected
            </span>
          </div>

          {/* Test Prompt Preview */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 mb-1.5 font-sans">
              Simulated Inquiry Prompt
            </label>
            <div className="p-3 rounded-lg bg-[#faf6f0] border border-[#eadfd4] text-xs font-mono text-stone-800 leading-relaxed">
              {samplePrompt}
            </div>
          </div>

          {/* Result Output Display */}
          {testResult && (
            <div className="p-4 rounded-xl bg-stone-900 text-stone-100 border border-stone-800 font-mono text-xs space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-[11px] text-stone-400 border-b border-stone-800 pb-2">
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> HTTP 200 OK
                </span>
                <div className="flex items-center gap-3">
                  <span>Latency: <strong className="text-white">{testResult.latency}ms</strong></span>
                  <span>Tokens: <strong className="text-white">{testResult.tokens}</strong></span>
                </div>
              </div>

              <pre className="whitespace-pre-wrap leading-relaxed text-stone-200 text-[11px]">
                {testResult.content}
              </pre>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#faf6f0] border-t border-[#f0e7dd] flex items-center justify-between">
          <span className="text-[11px] text-stone-500 font-sans">
            Encrypted TLS 1.3 direct gateway pipe
          </span>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsTestModalOpen(false)}
              className="px-3.5 py-2 text-xs font-semibold rounded-lg text-stone-600 hover:bg-stone-200/60 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              onClick={handleRunTest}
              disabled={isRunning}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg bg-[#550000] text-white hover:bg-[#680000] shadow-md shadow-[#550000]/20 transition-all active:scale-95 disabled:opacity-70 cursor-pointer"
            >
              {isRunning ? (
                <>
                  <RotateCcw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Query...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Execute Benchmark</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
