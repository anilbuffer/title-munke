'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  Coins,
  X,
  Check,
  CreditCard,
  Sparkles,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { formatNumber } from '@/lib/utils';

const PRESET_PACKAGES = [
  { tokens: 25000, price: '$5.00', label: 'Starter Booster' },
  { tokens: 50000, price: '$9.50', label: 'Standard Pack' },
  { tokens: 100000, price: '$18.00', label: 'Popular Booster', isPopular: true },
  { tokens: 25000, price: '$40.00', label: 'Enterprise Quota', tokensReal: 250000 },
];

export function AddTokensModal() {
  const {
    isAddTokensModalOpen,
    closeAddTokensModal,
    addTokensTargetModel,
    addTokensToModel,
  } = useAISettings();

  const [selectedTokens, setSelectedTokens] = useState<number>(100000);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (!isAddTokensModalOpen || !addTokensTargetModel) {
    return null;
  }

  const currentTotal = addTokensTargetModel.totalTokens;
  const currentUsed = addTokensTargetModel.usedTokens;
  const currentRemaining = currentTotal - currentUsed;
  const newTotal = currentTotal + selectedTokens;
  const newRemaining = currentRemaining + selectedTokens;

  const handleConfirm = async () => {
    setIsProcessing(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    addTokensToModel(addTokensTargetModel.modelId, selectedTokens);
    setIsProcessing(false);
    closeAddTokensModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        onClick={closeAddTokensModal}
        className="fixed inset-0 bg-stone-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-[#eadfd4] z-10 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-[#f0e7dd]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#faf2f2] border border-[#ebd8d8] flex items-center justify-center text-[#550000] shrink-0">
              <Coins className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-stone-900 font-sans tracking-tight">
                Add Tokens
              </h2>
              <p className="text-xs text-stone-500 font-sans">
                {addTokensTargetModel.modelName}
              </p>
            </div>
          </div>

          <button
            onClick={closeAddTokensModal}
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-600 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          <div>
            <label className="text-xs font-bold text-stone-800 uppercase tracking-wider block mb-2 font-sans">
              Select Token Allocation Package
            </label>
            <p className="text-xs text-stone-500 mb-3 font-sans">
              Increase monthly quota limit for broker inquiries and automated document analysis.
            </p>

            {/* Presets Grid */}
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { amount: 25000, price: '$5.00', label: 'Starter', badge: '' },
                { amount: 50000, price: '$9.50', label: 'Pro', badge: '' },
                { amount: 100000, price: '$18.00', label: 'Most Popular', badge: 'Best Choice' },
                { amount: 250000, price: '$40.00', label: 'Enterprise', badge: 'Save 20%' },
              ].map((pkg) => {
                const isSelected = selectedTokens === pkg.amount;
                return (
                  <button
                    key={pkg.amount}
                    type="button"
                    onClick={() => setSelectedTokens(pkg.amount)}
                    className={`p-3.5 rounded-xl border text-left transition-all relative cursor-pointer ${
                      isSelected
                        ? 'border-[#550000] bg-[#faf2f2] shadow-xs ring-1 ring-[#550000]/20'
                        : 'border-[#eadfd4] bg-white hover:bg-stone-50 hover:border-stone-300'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute top-2 right-2 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[#550000] text-white">
                        {pkg.badge}
                      </span>
                    )}
                    <div className="text-xs font-semibold text-stone-500 font-sans">
                      {pkg.label}
                    </div>
                    <div className="text-base font-bold text-stone-900 font-mono mt-0.5">
                      +{formatNumber(pkg.amount)}
                    </div>
                    <div className="text-xs font-semibold text-[#550000] font-sans mt-0.5">
                      {pkg.price}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Allocation Comparison Box */}
          <div className="p-3.5 rounded-xl bg-[#fbf9f6] border border-[#eadfd4] space-y-2 font-sans">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Current Monthly Quota:</span>
              <span className="font-mono font-bold text-stone-800">
                {formatNumber(currentTotal)} tokens
              </span>
            </div>

            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-500">Tokens to Add:</span>
              <span className="font-mono font-bold text-[#550000]">
                +{formatNumber(selectedTokens)} tokens
              </span>
            </div>

            <div className="pt-2 border-t border-[#eadfd4] flex items-center justify-between text-xs font-bold">
              <span className="text-stone-900">New Monthly Allocation:</span>
              <span className="font-mono text-sm text-[#550000]">
                {formatNumber(newTotal)} tokens
              </span>
            </div>
          </div>

          {/* Billing Method Notice */}
          <div className="flex items-start gap-2.5 p-3 rounded-lg bg-stone-50 border border-stone-200/80 text-[11px] text-stone-600 font-sans">
            <CreditCard className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <span>
              Billed to TITLE MUNKE enterprise corporate card ending in <strong>•••• 4242</strong>. Charged immediately and added to your active allocation.
            </span>
          </div>

        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-stone-50 border-t border-[#f0e7dd] flex items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={closeAddTokensModal}
            className="px-4 py-2 text-xs font-semibold rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer font-sans"
          >
            Cancel
          </button>
          
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isProcessing}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-[#550000] text-white hover:bg-[#680000] active:scale-95 transition-all shadow-xs cursor-pointer disabled:opacity-70 font-sans"
          >
            {isProcessing ? (
              <span>Updating Quota...</span>
            ) : (
              <>
                <Coins className="w-3.5 h-3.5" />
                <span>Confirm & Add Tokens</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}
