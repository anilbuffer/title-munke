'use client';

import React from 'react';
import { useAISettings } from '@/context/AISettingsContext';
import { CheckCircle2, AlertTriangle, Info, X } from 'lucide-react';

export function ToastContainer() {
  const { toasts, removeToast } = useAISettings();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';
        const isInfo = toast.type === 'info';

        return (
          <div
            key={toast.id}
            className="pointer-events-auto flex items-start gap-3 p-4 rounded-xl shadow-xl border bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-900 dark:text-stone-100 transition-all duration-300 animate-in fade-in slide-in-from-bottom-3"
            style={{
              borderLeftWidth: '4px',
              borderLeftColor: isSuccess ? '#059669' : isWarning ? '#d97706' : '#550000',
            }}
          >
            <div className="shrink-0 mt-0.5">
              {isSuccess && <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />}
              {isWarning && <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />}
              {isInfo && <Info className="w-5 h-5 text-[#550000] dark:text-rose-400" />}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold tracking-tight">{toast.title}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed">
                {toast.description}
              </p>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="shrink-0 text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors p-1"
              aria-label="Close notification"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
