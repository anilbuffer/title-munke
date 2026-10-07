'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';
import { Header } from '@/components/layout/Header';
import { GovernanceTabs, SettingsSubTab } from '@/components/ai-settings/GovernanceTabs';
import { ModelConfigurationCard } from '@/components/ai-settings/ModelConfigurationCard';
import { SystemPromptsCard } from '@/components/ai-settings/SystemPromptsCard';
import { ContextHistorySettingsCard } from '@/components/ai-settings/ContextHistorySettingsCard';
import { TokenUsageOverviewCard } from '@/components/ai-settings/TokenUsageOverviewCard';
import { SystemArchitectureDiagram } from '@/components/ai-settings/SystemArchitectureDiagram';
import { AboutModelSwitchingCard } from '@/components/ai-settings/AboutModelSwitchingCard';
import { DetailedUsageCard } from '@/components/ai-settings/DetailedUsageCard';
import { DetailedUsageModal } from '@/components/ai-settings/DetailedUsageModal';
import { TestConnectionModal } from '@/components/ai-settings/TestConnectionModal';
import { AddTokensModal } from '@/components/ai-settings/AddTokensModal';
import { ToastContainer } from '@/components/ai-settings/Toast';
import { User, CreditCard, Database } from 'lucide-react';

export default function AISettingsPage() {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeNav, setActiveNav] = useState('Settings');
  const [activeSettingsTab, setActiveSettingsTab] = useState<SettingsSubTab>('governance');

  return (
    <div className="min-h-screen bg-white text-[#291e1a] flex p-0 lg:p-4 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
        activeNavItem={activeNav}
        onSelectNav={(item) => setActiveNav(item)}
      />

      {/* Main Workspace (Offset for fixed lg sidebar w-72 (288px) + ml-4 (16px) = 304px) */}
      <div className="flex-1 lg:pl-[304px] flex flex-col min-w-0 px-4 sm:px-6 py-4 lg:py-0">
        
        {/* Top Header Card */}
        <div className="mb-5">
          <Header onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)} />
        </div>

        {/* Main Content: Single Outer Card with bg-[#f8f3ed] containing Tabs and Inner Cards Layout */}
        <main className="flex-1 pb-8">
          <div className="bg-[#f8f3ed] border border-[#eadfd4] rounded-3xl p-5 sm:p-6 lg:p-7 shadow-xs">
            
            {/* Sub-Tabs under Settings (Inside the bg-[#f8f3ed] card) */}
            <div className="mb-6">
              <GovernanceTabs
                activeTab={activeSettingsTab}
                onTabChange={(tab) => setActiveSettingsTab(tab)}
              />
            </div>

            {/* Inner Cards Layout under Tabs */}
            {activeSettingsTab === 'governance' && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start animate-in fade-in duration-300">
                
                {/* Left Column (8 cols): Model Configuration, Prompts, Context & Usage */}
                <div className="lg:col-span-7 xl:col-span-8 space-y-6">
                  {/* 1. Model Configuration */}
                  <ModelConfigurationCard />

                  {/* 2. System Prompts (OpenAI & Claude) */}
                  <SystemPromptsCard />

                  {/* 3. Context & History Settings */}
                  <ContextHistorySettingsCard />

                  {/* 4. Token Usage Overview */}
                  <TokenUsageOverviewCard />
                </div>

                {/* Right Column (4 cols): Architecture Diagram, Guidance & Report */}
                <div className="lg:col-span-5 xl:col-span-4 space-y-6">
                  {/* 1. System Architecture Live Diagram */}
                  <SystemArchitectureDiagram />

                  {/* 2. About Model Switching */}
                  <AboutModelSwitchingCard />

                  {/* 3. Detailed Token Usage Trigger */}
                  <DetailedUsageCard />
                </div>

              </div>
            )}

            {/* Placeholder for Profile Settings Tab */}
            {activeSettingsTab === 'profile' && (
              <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                  <User className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                  Profile Settings
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6">
                  Manage account credentials, title agent licensing, and notification preferences.
                </p>
                <button
                  onClick={() => setActiveSettingsTab('governance')}
                  className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  Return to AI Governance
                </button>
              </div>
            )}

            {/* Placeholder for Upgrade Price Tab */}
            {activeSettingsTab === 'pricing' && (
              <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                  <CreditCard className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                  Upgrade Price & Subscription
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6">
                  Manage broker enterprise seat allocations, monthly deed search quotas, and county recorder packages.
                </p>
                <button
                  onClick={() => setActiveSettingsTab('governance')}
                  className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  Return to AI Governance
                </button>
              </div>
            )}

            {/* Placeholder for NYC Data Updates Tab */}
            {activeSettingsTab === 'nyc_data' && (
              <div className="bg-white rounded-2xl border border-[#eadfd4] shadow-xs p-8 text-center max-w-xl mx-auto my-8 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#f8f3ed] flex items-center justify-center mx-auto mb-4 text-[#550000]">
                  <Database className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 mb-2 font-sans">
                  NYC Data & ACRIS Recordings
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 mb-6">
                  Automated synchronization status for Automated City Register Information System (ACRIS) real property transfer tax rolls.
                </p>
                <button
                  onClick={() => setActiveSettingsTab('governance')}
                  className="px-5 py-2.5 rounded-full bg-[#550000] text-white text-xs font-semibold hover:bg-[#680000] transition-colors cursor-pointer"
                >
                  Return to AI Governance
                </button>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Global Modals & Notifications */}
      <DetailedUsageModal />
      <TestConnectionModal />
      <AddTokensModal />
      <ToastContainer />
    </div>
  );
}
