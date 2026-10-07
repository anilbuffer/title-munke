'use client';

import React from 'react';
import Image from 'next/image';
import { AlignLeft, Save, RefreshCw, Zap } from 'lucide-react';
import { useAISettings } from '@/context/AISettingsContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
}

export function Header({ onToggleSidebar }: HeaderProps) {
  const { isDirty, isSaving, saveChanges, setIsTestModalOpen } = useAISettings();

  return (
    <header className="w-full bg-white rounded-2xl border border-[#eadfd4] shadow-xs px-5 sm:px-6 py-3.5 flex items-center justify-between transition-colors">
      {/* Left: Hamburger / Menu Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-1.5 rounded-lg text-stone-700 hover:text-stone-900 hover:bg-stone-100 transition-colors cursor-pointer"
          aria-label="Toggle navigation"
        >
          <AlignLeft className="w-5 h-5 text-stone-800" />
        </button>
      </div>

      {/* Right: Quick Actions & User Profile "Vikas Negi" */}
      <div className="flex items-center gap-3 sm:gap-4">
        {/* Unsaved Changes Indicator */}
        {isDirty && (
          <span className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            Unsaved Changes
          </span>
        )}

        {/* Save Changes Button */}
        <button
          onClick={saveChanges}
          disabled={isSaving}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-lg bg-[#550000] text-white hover:bg-[#680000] active:scale-95 transition-all shadow-xs disabled:opacity-70"
          title="Save changes (⌘S)"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </>
          )}
        </button>

        {/* User Profile Pill matching screenshot */}
        <div className="flex items-center gap-2.5 pl-2 sm:pl-3 border-l border-[#eadfd4]">
          {/* Avatar with photo illustration */}
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-stone-200 border border-stone-300 shrink-0">
            {/* SVG avatar representation of Vikas Negi matching the beard/profile image */}
            <svg
              className="w-full h-full text-stone-600"
              viewBox="0 0 32 32"
              fill="currentColor"
            >
              <rect width="32" height="32" fill="#E8DED4" />
              <circle cx="16" cy="12" r="6" fill="#4A3B32" />
              <path
                d="M6 28c0-5.523 4.477-10 10-10s10 4.477 10 10"
                fill="#2B1F1A"
              />
            </svg>
          </div>

          <span className="text-xs sm:text-sm font-semibold text-stone-900 tracking-tight">
            Vikas Negi
          </span>
        </div>
      </div>
    </header>
  );
}
