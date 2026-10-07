'use client';

import React, { useState } from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import {
  Save,
  Check,
  ChevronDown,
  Menu,
  Sparkles,
  RefreshCw,
  Zap,
  Radio,
  FileCheck2,
} from 'lucide-react';
import { ENVIRONMENTS } from '@/data/mock-ai-settings';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export function Header({ onOpenMobileMenu }: HeaderProps) {
  const {
    environment,
    setEnvironment,
    isDirty,
    isSaving,
    saveChanges,
    setIsTestModalOpen,
  } = useAISettings();

  const [isEnvMenuOpen, setIsEnvMenuOpen] = useState(false);

  const currentEnv = ENVIRONMENTS.find((e) => e.id === environment) || ENVIRONMENTS[0];

  return (
    <header className="sticky top-0 z-30 bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border-b border-stone-200 dark:border-stone-800 transition-colors">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left Title & Breadcrumbs */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenMobileMenu}
              className="lg:hidden p-2 rounded-lg text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
              aria-label="Open mobile menu"
            >
              <Menu className="w-5 h-5" />
            </button>

            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-stone-900 dark:text-white font-sans">
                  AI Settings
                </h1>
                {isDirty && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-300 dark:border-amber-700 animate-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                    Unsaved Changes
                  </span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-stone-500 dark:text-stone-400 mt-0.5">
                Configure AI models, system prompts and conversation settings for your application.
              </p>
            </div>
          </div>

          {/* Right Action Tools & Profile */}
          <div className="flex items-center flex-wrap gap-2.5 sm:gap-3">
            {/* Quick Test Benchmark Button */}
            <button
              onClick={() => setIsTestModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/60 transition-colors shadow-xs"
              title="Test real-time model inference and response"
            >
              <Zap className="w-3.5 h-3.5 text-[#550000] dark:text-rose-400" />
              <span className="hidden sm:inline">Test Gateway</span>
              <span className="sm:hidden">Test</span>
            </button>

            {/* Environment Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsEnvMenuOpen(!isEnvMenuOpen)}
                className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-700 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors shadow-xs"
                aria-expanded={isEnvMenuOpen}
              >
                <span className={`w-2 h-2 rounded-full ${currentEnv.badgeColor}`} />
                <span>{currentEnv.label}</span>
                <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
              </button>

              {isEnvMenuOpen && (
                <>
                  <div
                    onClick={() => setIsEnvMenuOpen(false)}
                    className="fixed inset-0 z-20"
                  />
                  <div className="absolute right-0 mt-1.5 w-48 rounded-xl bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-700 shadow-xl py-1.5 z-30 animate-in fade-in zoom-in-95">
                    <div className="px-3 py-1.5 text-[10px] font-semibold text-stone-400 uppercase tracking-wider">
                      Deployment Target
                    </div>
                    {ENVIRONMENTS.map((env) => (
                      <button
                        key={env.id}
                        onClick={() => {
                          setEnvironment(env.id);
                          setIsEnvMenuOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-3 py-2 text-xs text-left transition-colors ${
                          environment === env.id
                            ? 'bg-stone-100 dark:bg-stone-700 text-stone-900 dark:text-white font-semibold'
                            : 'text-stone-600 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700/50'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${env.badgeColor}`} />
                          <span>{env.label}</span>
                        </div>
                        {environment === env.id && (
                          <Check className="w-3.5 h-3.5 text-stone-800 dark:text-stone-200" />
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Save Changes Button (Primary #550000) */}
            <button
              onClick={saveChanges}
              disabled={isSaving}
              className={`inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold rounded-lg text-white shadow-md transition-all duration-200 ${
                isDirty
                  ? 'bg-[#550000] hover:bg-[#6c0000] active:scale-95 shadow-[#550000]/25 hover:shadow-lg hover:shadow-[#550000]/30 ring-2 ring-[#550000]/40'
                  : 'bg-[#550000] hover:bg-[#660000] active:scale-95 shadow-stone-900/10'
              }`}
            >
              {isSaving ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </>
              )}
            </button>

            {/* User Profile Pill */}
            <div className="flex items-center gap-2.5 pl-2 border-l border-stone-200 dark:border-stone-700">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-[#1b2537] text-white flex items-center justify-center font-bold text-xs shadow-xs border border-slate-700">
                  PK
                </div>
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-stone-900" />
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-stone-900 dark:text-stone-100 leading-tight">
                  Pawan Kumar
                </div>
                <div className="text-[11px] text-stone-500 dark:text-stone-400">
                  Senior Architect
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
