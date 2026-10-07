'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  AIFunctionKey,
  AIFunctionConfig,
  SystemPromptTemplate,
  ContextHistoryConfig,
  TokenUsageMetric,
  AIProviderId,
} from '@/types/ai-settings';
import {
  INITIAL_FUNCTION_CONFIGS,
  INITIAL_SYSTEM_PROMPTS,
  INITIAL_CONTEXT_CONFIG,
  INITIAL_TOKEN_USAGE,
} from '@/data/mock-ai-settings';

interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  title: string;
  description: string;
}

interface AISettingsContextType {
  environment: 'production' | 'staging' | 'development';
  setEnvironment: (env: 'production' | 'staging' | 'development') => void;
  functionConfigs: Record<AIFunctionKey, AIFunctionConfig>;
  updateFunctionModel: (key: AIFunctionKey, provider: AIProviderId, modelId: string) => void;
  updateFunctionTemperature: (key: AIFunctionKey, temp: number) => void;
  
  systemPrompts: Record<string, SystemPromptTemplate>;
  updateSystemPrompt: (promptId: string, newText: string) => void;
  resetPromptToDefault: (promptId: string) => void;
  resetAllPromptsForFunction: (fnKey: AIFunctionKey) => void;

  contextConfig: ContextHistoryConfig;
  updateContextConfig: (updates: Partial<ContextHistoryConfig>) => void;

  tokenUsage: TokenUsageMetric[];
  
  isDirty: boolean;
  isSaving: boolean;
  saveChanges: () => Promise<void>;
  discardChanges: () => void;

  // Modals & Panels
  isUsageModalOpen: boolean;
  setIsUsageModalOpen: (open: boolean) => void;
  isTestModalOpen: boolean;
  setIsTestModalOpen: (open: boolean) => void;
  testFunctionTarget: AIFunctionKey | null;
  openTestModalForFunction: (fnKey: AIFunctionKey) => void;
  isAddTokensModalOpen: boolean;
  setIsAddTokensModalOpen: (open: boolean) => void;
  addTokensTargetModel: TokenUsageMetric | null;
  openAddTokensModal: (model: TokenUsageMetric) => void;
  closeAddTokensModal: () => void;
  addTokensToModel: (modelId: string, tokensToAdd: number) => void;

  // Active UI Tabs
  activePromptTab: AIFunctionKey;
  setActivePromptTab: (tab: AIFunctionKey) => void;

  // Toast System
  toasts: ToastMessage[];
  addToast: (toast: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const AISettingsContext = createContext<AISettingsContextType | undefined>(undefined);

export function AISettingsProvider({ children }: { children: React.ReactNode }) {
  const [environment, setEnvironmentState] = useState<'production' | 'staging' | 'development'>('production');
  const [functionConfigs, setFunctionConfigs] = useState<Record<AIFunctionKey, AIFunctionConfig>>(INITIAL_FUNCTION_CONFIGS);
  const [systemPrompts, setSystemPrompts] = useState<Record<string, SystemPromptTemplate>>(INITIAL_SYSTEM_PROMPTS);
  const [contextConfig, setContextConfig] = useState<ContextHistoryConfig>(INITIAL_CONTEXT_CONFIG);
  const [tokenUsage, setTokenUsage] = useState<TokenUsageMetric[]>(INITIAL_TOKEN_USAGE);

  const [activePromptTab, setActivePromptTab] = useState<AIFunctionKey>('chatbot_qa');
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);

  // Modals
  const [isUsageModalOpen, setIsUsageModalOpen] = useState(false);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [testFunctionTarget, setTestFunctionTarget] = useState<AIFunctionKey | null>('chatbot_qa');
  const [isAddTokensModalOpen, setIsAddTokensModalOpen] = useState(false);
  const [addTokensTargetModel, setAddTokensTargetModel] = useState<TokenUsageMetric | null>(null);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Keyboard shortcut Ctrl+S / Cmd+S
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        saveChanges();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isDirty, functionConfigs, systemPrompts, contextConfig, environment]);

  const setEnvironment = (env: 'production' | 'staging' | 'development') => {
    setEnvironmentState(env);
    setIsDirty(true);
    addToast({
      type: 'info',
      title: `Environment Switched to ${env.toUpperCase()}`,
      description: `Settings configuration context updated for ${env}.`,
    });
  };

  const updateFunctionModel = (key: AIFunctionKey, provider: AIProviderId, modelId: string) => {
    setFunctionConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        provider,
        model: modelId,
      },
    }));
    setIsDirty(true);
  };

  const updateFunctionTemperature = (key: AIFunctionKey, temp: number) => {
    setFunctionConfigs((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        temperature: temp,
      },
    }));
    setIsDirty(true);
  };

  const updateSystemPrompt = (promptId: string, newText: string, metadata?: Partial<SystemPromptTemplate>) => {
    setSystemPrompts((prev) => {
      const existing = prev[promptId];
      return {
        ...prev,
        [promptId]: {
          ...(existing || {
            id: promptId,
            functionKey: activePromptTab,
            provider: 'openai',
            modelDisplayName: promptId,
            defaultPrompt: newText,
            maxLimit: 2000,
          }),
          ...metadata,
          prompt: newText,
          lastModified: 'Just now',
        },
      };
    });
    setIsDirty(true);
  };

  const resetPromptToDefault = (promptId: string, defaultTextFallback?: string) => {
    setSystemPrompts((prev) => {
      const existing = prev[promptId];
      const targetText = existing?.defaultPrompt || defaultTextFallback || '';
      return {
        ...prev,
        [promptId]: {
          ...(existing || {
            id: promptId,
            functionKey: activePromptTab,
            provider: 'openai',
            modelDisplayName: promptId,
            maxLimit: 2000,
          }),
          prompt: targetText,
          defaultPrompt: targetText,
          lastModified: 'Reset to default',
        },
      };
    });
    setIsDirty(true);
    addToast({
      type: 'info',
      title: 'Prompt Reset',
      description: 'System prompt reverted to standard default template.',
    });
  };

  const resetAllPromptsForFunction = (fnKey: AIFunctionKey) => {
    setSystemPrompts((prev) => {
      const next = { ...prev };
      Object.keys(next).forEach((key) => {
        if (next[key].functionKey === fnKey) {
          next[key] = {
            ...next[key],
            prompt: next[key].defaultPrompt,
            lastModified: 'Reset to default',
          };
        }
      });
      return next;
    });
    setIsDirty(true);
    addToast({
      type: 'info',
      title: 'Prompts Reverted',
      description: `All prompts for ${INITIAL_FUNCTION_CONFIGS[fnKey]?.label || fnKey} restored to default.`,
    });
  };

  const updateContextConfig = (updates: Partial<ContextHistoryConfig>) => {
    setContextConfig((prev) => ({
      ...prev,
      ...updates,
    }));
    setIsDirty(true);
  };

  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API persistence with real-world latency
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsSaving(false);
    setIsDirty(false);
    addToast({
      type: 'success',
      title: 'AI Settings Saved Successfully',
      description: 'Model configurations, prompts, and context limits synced with Title Munke AI Gateway.',
    });
  };

  const discardChanges = () => {
    setFunctionConfigs(INITIAL_FUNCTION_CONFIGS);
    setSystemPrompts(INITIAL_SYSTEM_PROMPTS);
    setContextConfig(INITIAL_CONTEXT_CONFIG);
    setIsDirty(false);
    addToast({
      type: 'warning',
      title: 'Changes Discarded',
      description: 'Reverted all unsaved modifications to original states.',
    });
  };

  const openTestModalForFunction = (fnKey: AIFunctionKey) => {
    setTestFunctionTarget(fnKey);
    setIsTestModalOpen(true);
  };

  const openAddTokensModal = (model: TokenUsageMetric) => {
    setAddTokensTargetModel(model);
    setIsAddTokensModalOpen(true);
  };

  const closeAddTokensModal = () => {
    setIsAddTokensModalOpen(false);
    setAddTokensTargetModel(null);
  };

  const addTokensToModel = (modelId: string, tokensToAdd: number) => {
    setTokenUsage((prev) =>
      prev.map((item) =>
        item.modelId === modelId
          ? {
              ...item,
              totalTokens: item.totalTokens + tokensToAdd,
            }
          : item
      )
    );
    addToast({
      type: 'success',
      title: 'Tokens Added Successfully',
      description: `Added tokens to ${modelId}. Quota limit increased.`,
    });
  };

  return (
    <AISettingsContext.Provider
      value={{
        environment,
        setEnvironment,
        functionConfigs,
        updateFunctionModel,
        updateFunctionTemperature,
        systemPrompts,
        updateSystemPrompt,
        resetPromptToDefault,
        resetAllPromptsForFunction,
        contextConfig,
        updateContextConfig,
        tokenUsage,
        isDirty,
        isSaving,
        saveChanges,
        discardChanges,
        isUsageModalOpen,
        setIsUsageModalOpen,
        isTestModalOpen,
        setIsTestModalOpen,
        testFunctionTarget,
        openTestModalForFunction,
        isAddTokensModalOpen,
        setIsAddTokensModalOpen,
        addTokensTargetModel,
        openAddTokensModal,
        closeAddTokensModal,
        addTokensToModel,
        activePromptTab,
        setActivePromptTab,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </AISettingsContext.Provider>
  );
}

export function useAISettings() {
  const context = useContext(AISettingsContext);
  if (!context) {
    throw new Error('useAISettings must be used within an AISettingsProvider');
  }
  return context;
}
