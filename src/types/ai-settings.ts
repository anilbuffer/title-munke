export type AIProviderId = 'openai' | 'anthropic' | 'google' | 'xai' | 'mistral';

export type AIFunctionKey = 'chatbot_qa' | 'pdf_ocr' | 'chain_of_title' | 'legal_desc';

export interface AIModelOption {
  id: string;
  name: string;
  provider: AIProviderId;
  version: string;
  contextWindow: number; // in tokens
  maxOutputTokens: number;
  costPerMillionInput: number; // in USD
  costPerMillionOutput: number; // in USD
  speedLatencyMs: number;
  qualityScore: number; // 0 to 100
  isVisionSupported: boolean;
  isRecommended?: boolean;
  description: string;
}

export interface AIProvider {
  id: AIProviderId;
  name: string;
  logo: string;
  badgeColor: string;
  badgeBg: string;
  status: 'operational' | 'degraded' | 'outage';
  latencyMs: number;
  availableModels: AIModelOption[];
}

export interface AIFunctionConfig {
  key: AIFunctionKey;
  label: string;
  badge: string;
  description: string;
  iconName: string;
  provider: AIProviderId;
  model: string;
  temperature: number;
  maxTokens: number;
  supportsStreaming: boolean;
}

export interface SystemPromptTemplate {
  id: string;
  functionKey: AIFunctionKey;
  provider: AIProviderId;
  modelDisplayName: string;
  prompt: string;
  defaultPrompt: string;
  maxLimit: number;
  variables: string[];
  lastModified: string;
}

export interface ContextHistoryConfig {
  contextWindowTokens: number;
  conversationHistoryLimit: number;
  ragChunkSize: number;
  ragSimilarityThreshold: number;
  enableHybridSearch: boolean;
  autoSummarization: boolean;
}

export interface TokenUsageMetric {
  modelId: string;
  modelName: string;
  provider: AIProviderId;
  usedTokens: number;
  totalTokens: number;
  costMonthToDate: number;
  budgetAllocation: number;
  resetDate: string;
  trendPercentage: number;
}

export interface EnvironmentOption {
  id: 'production' | 'staging' | 'development';
  label: string;
  badgeColor: string;
}

export interface SystemArchitectureNode {
  id: string;
  title: string;
  subtitle: string;
  category: 'admin' | 'provider' | 'gateway' | 'database' | 'agent';
  status: 'active' | 'standby' | 'routing';
  details: string;
}

export interface AISettingsState {
  environment: 'production' | 'staging' | 'development';
  functions: Record<AIFunctionKey, AIFunctionConfig>;
  prompts: Record<string, SystemPromptTemplate>;
  contextSettings: ContextHistoryConfig;
  tokenUsage: TokenUsageMetric[];
  isDirty: boolean;
}
