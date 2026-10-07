'use client';

import React from 'react';

export type SettingsSubTab = 'profile' | 'governance' | 'pricing' | 'nyc_data';

interface GovernanceTabsProps {
  activeTab: SettingsSubTab;
  onTabChange: (tab: SettingsSubTab) => void;
}

export function GovernanceTabs({ activeTab, onTabChange }: GovernanceTabsProps) {
  const tabs: { id: SettingsSubTab; label: string }[] = [
    { id: 'profile', label: 'Profile Settings' },
    { id: 'governance', label: 'AI Governance' },
    { id: 'pricing', label: 'Upgrade Price' },
    { id: 'nyc_data', label: 'NYC Data Updates' },
  ];

  return (
    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`px-6 sm:px-8 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 whitespace-nowrap cursor-pointer ${
              isActive
                ? 'bg-[#550000] text-white shadow-sm shadow-[#550000]/25'
                : 'bg-white text-stone-700 hover:text-stone-900 hover:bg-stone-50 border border-[#eadfd4] shadow-2xs'
            }`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
}
