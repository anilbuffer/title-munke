'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { ModelConfigurationCard } from '@/components/ai-settings/ModelConfigurationCard';
import { SystemPromptsCard } from '@/components/ai-settings/SystemPromptsCard';
import { ContextHistorySettingsCard } from '@/components/ai-settings/ContextHistorySettingsCard';
import { TokenUsageOverviewCard } from '@/components/ai-settings/TokenUsageOverviewCard';
import { SystemArchitectureDiagram } from '@/components/ai-settings/SystemArchitectureDiagram';
import { AboutModelSwitchingCard } from '@/components/ai-settings/AboutModelSwitchingCard';
import { DetailedUsageCard } from '@/components/ai-settings/DetailedUsageCard';
import { DetailedUsageModal } from '@/components/ai-settings/DetailedUsageModal';
import { TestConnectionModal } from '@/components/ai-settings/TestConnectionModal';
import { ToastContainer } from '@/components/ai-settings/Toast';
import { Sparkles, Shield, Compass, Zap } from 'lucide-react';

export default function AISettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex">
      {/* Navigation Sidebar */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Offset for desktop fixed sidebar w-64) */}
      <div className="flex-1 lg:pl-64 flex flex-col min-w-0">
        {/* Top Header */}
        <Header onOpenMobileMenu={() => setIsMobileSidebarOpen(true)} />

        {/* Content Container */}
        <main className="flex-1 max-w-[1600px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
          
          {/* Subtle Enterprise Overview Ribbon */}
          <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-stone-900 via-[#180a0a] to-[#2b0808] text-white flex flex-col md:flex-row md:items-center justify-between gap-3 shadow-sm border border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#550000] border border-rose-800/80 flex items-center justify-center shrink-0 shadow-inner">
                <Sparkles className="w-5 h-5 text-rose-200" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold tracking-wider uppercase text-rose-300">
                    TITLE MUNKE Core Engine
                  </span>
                  <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full font-medium">
                    The Smarter Way to Search Property Records
                  </span>
                </div>
                <p className="text-xs sm:text-[13px] text-stone-300 mt-0.5">
                  AI-powered title searches delivered with speed and accuracy. Helping brokers and agents make confident decisions.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-start md:self-auto text-xs text-stone-300 shrink-0">
              <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                <Shield className="w-3.5 h-3.5 text-emerald-400" /> Title Plant Verified
              </span>
              <span className="inline-flex items-center gap-1 bg-white/10 px-2.5 py-1 rounded-lg">
                <Zap className="w-3.5 h-3.5 text-amber-400" /> Zero Cold Starts
              </span>
            </div>
          </div>

          {/* Two-Column Grid matching reference screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Configuration Panels (8 of 12 columns) */}
            <div className="lg:col-span-7 xl:col-span-8 space-y-6">
              {/* 1. Model Configuration */}
              <ModelConfigurationCard />

              {/* 2. System Prompts */}
              <SystemPromptsCard />

              {/* 3. Context & History Settings */}
              <ContextHistorySettingsCard />

              {/* 4. Token Usage Overview */}
              <TokenUsageOverviewCard />
            </div>

            {/* Right Column: Architecture & Guidance (4 of 12 columns) */}
            <div className="lg:col-span-5 xl:col-span-4 space-y-6">
              {/* 1. System Architecture Live Interactive Diagram */}
              <SystemArchitectureDiagram />

              {/* 2. About Model Switching */}
              <AboutModelSwitchingCard />

              {/* 3. View Detailed Token Usage Card */}
              <DetailedUsageCard />
            </div>

          </div>

          {/* Page Footer */}
          <footer className="mt-12 pt-6 pb-8 border-t border-stone-200 dark:border-stone-800 text-center text-xs text-stone-500">
            <p>
              © 2026 TITLE MUNKE Technologies Inc. All rights reserved. • SOC2 Type II Certified • Real Estate Title Intelligence Architecture
            </p>
          </footer>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <DetailedUsageModal />
      <TestConnectionModal />
      <ToastContainer />
    </div>
  );
}
