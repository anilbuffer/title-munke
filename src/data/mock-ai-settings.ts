import {
  AIProvider,
  AIFunctionConfig,
  SystemPromptTemplate,
  ContextHistoryConfig,
  TokenUsageMetric,
  EnvironmentOption,
} from '@/types/ai-settings';

export const ENVIRONMENTS: EnvironmentOption[] = [
  { id: 'production', label: 'Production', badgeColor: 'bg-emerald-500' },
  { id: 'staging', label: 'Staging (Sandbox)', badgeColor: 'bg-amber-500' },
  { id: 'development', label: 'Development (Local)', badgeColor: 'bg-sky-500' },
];

export const AI_PROVIDERS: AIProvider[] = [
  {
    id: 'openai',
    name: 'OpenAI',
    logo: 'OpenAI',
    badgeColor: 'text-emerald-700 dark:text-emerald-400',
    badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800',
    status: 'operational',
    latencyMs: 185,
    availableModels: [
      {
        id: 'gpt-4o-mini',
        name: 'GPT-4o-mini',
        provider: 'openai',
        version: '2024-07-18',
        contextWindow: 128000,
        maxOutputTokens: 16384,
        costPerMillionInput: 0.15,
        costPerMillionOutput: 0.60,
        speedLatencyMs: 140,
        qualityScore: 92,
        isVisionSupported: true,
        isRecommended: true,
        description: 'Fast, cost-efficient model ideal for real-time broker inquiries and lightweight parsing.',
      },
      {
        id: 'gpt-4o',
        name: 'GPT-4o',
        provider: 'openai',
        version: '2024-11-20',
        contextWindow: 128000,
        maxOutputTokens: 16384,
        costPerMillionInput: 2.50,
        costPerMillionOutput: 10.00,
        speedLatencyMs: 290,
        qualityScore: 98,
        isVisionSupported: true,
        description: 'Flagship omni model with deep legal document reasoning and spatial table extraction.',
      },
      {
        id: 'gpt-4.5-preview',
        name: 'GPT-4.5',
        provider: 'openai',
        version: '2025-02-27',
        contextWindow: 128000,
        maxOutputTokens: 16384,
        costPerMillionInput: 75.00,
        costPerMillionOutput: 150.00,
        speedLatencyMs: 620,
        qualityScore: 99,
        isVisionSupported: true,
        description: 'Frontier model with superhuman nuance for complex commercial title commitments.',
      },
    ],
  },
  {
    id: 'anthropic',
    name: 'Claude (Anthropic)',
    logo: 'Claude',
    badgeColor: 'text-amber-700 dark:text-amber-400',
    badgeBg: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800',
    status: 'operational',
    latencyMs: 210,
    availableModels: [
      {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'anthropic',
        version: '2024-10-22',
        contextWindow: 200000,
        maxOutputTokens: 8192,
        costPerMillionInput: 3.00,
        costPerMillionOutput: 15.00,
        speedLatencyMs: 230,
        qualityScore: 98,
        isVisionSupported: true,
        isRecommended: true,
        description: 'State-of-the-art accuracy for legal metes & bounds, easement covenants, and chain-of-title.',
      },
      {
        id: 'claude-3-5-haiku',
        name: 'Claude 3.5 Haiku',
        provider: 'anthropic',
        version: '2024-10-22',
        contextWindow: 200000,
        maxOutputTokens: 8192,
        costPerMillionInput: 0.80,
        costPerMillionOutput: 4.00,
        speedLatencyMs: 110,
        qualityScore: 89,
        isVisionSupported: false,
        description: 'Ultra-low latency inference for quick municipal lien summaries and tax roll checks.',
      },
    ],
  },
  {
    id: 'google',
    name: 'Google Gemini',
    logo: 'Gemini',
    badgeColor: 'text-blue-700 dark:text-blue-400',
    badgeBg: 'bg-blue-50 dark:bg-blue-950/40 border-blue-200 dark:border-blue-800',
    status: 'operational',
    latencyMs: 195,
    availableModels: [
      {
        id: 'gemini-1.5-pro',
        name: 'Gemini 1.5 Pro',
        provider: 'google',
        version: '002',
        contextWindow: 2000000,
        maxOutputTokens: 8192,
        costPerMillionInput: 1.25,
        costPerMillionOutput: 5.00,
        speedLatencyMs: 310,
        qualityScore: 96,
        isVisionSupported: true,
        description: 'Massive 2M token context window capable of reading 50-year county recorder bundles in one shot.',
      },
      {
        id: 'gemini-1.5-flash',
        name: 'Gemini 1.5 Flash',
        provider: 'google',
        version: '002',
        contextWindow: 1000000,
        maxOutputTokens: 8192,
        costPerMillionInput: 0.075,
        costPerMillionOutput: 0.30,
        speedLatencyMs: 95,
        qualityScore: 88,
        isVisionSupported: true,
        description: 'Blazing fast throughput for high-volume batch indexing of county recording deeds.',
      },
    ],
  },
  {
    id: 'xai',
    name: 'Grok (xAI)',
    logo: 'Grok',
    badgeColor: 'text-stone-800 dark:text-stone-300',
    badgeBg: 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700',
    status: 'operational',
    latencyMs: 240,
    availableModels: [
      {
        id: 'grok-2-1212',
        name: 'Grok 2',
        provider: 'xai',
        version: '1212',
        contextWindow: 131072,
        maxOutputTokens: 4096,
        costPerMillionInput: 2.00,
        costPerMillionOutput: 10.00,
        speedLatencyMs: 250,
        qualityScore: 94,
        isVisionSupported: true,
        description: 'High-reasoning model with real-time web verification for active lis pendens filings.',
      },
    ],
  },
];

export const INITIAL_FUNCTION_CONFIGS: Record<string, AIFunctionConfig> = {
  chatbot_qa: {
    key: 'chatbot_qa',
    label: 'Chatbot (Q&A)',
    badge: 'Core Intelligence',
    description: 'Used for answering broker and agent property questions in chat based on documents and knowledge base.',
    iconName: 'MessageSquareText',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.2,
    maxTokens: 2048,
    supportsStreaming: true,
  },
  pdf_ocr: {
    key: 'pdf_ocr',
    label: 'PDF Extraction (OCR)',
    badge: 'Vision & Documents',
    description: 'Extract text, stamps, signatures, and structured legal parcels from uploaded recorded instruments.',
    iconName: 'FileText',
    provider: 'openai',
    model: 'gpt-4o-mini',
    temperature: 0.0,
    maxTokens: 4096,
    supportsStreaming: false,
  },
  chain_of_title: {
    key: 'chain_of_title',
    label: 'Chain of Title & Liens',
    badge: 'Risk Analysis',
    description: 'Analyzes sequence of deed conveyances, detects broken chains, unreleased mortgages, and encumbrances.',
    iconName: 'GitCommit',
    provider: 'anthropic',
    model: 'claude-3-5-sonnet',
    temperature: 0.1,
    maxTokens: 4096,
    supportsStreaming: true,
  },
  legal_desc: {
    key: 'legal_desc',
    label: 'Legal Description Parser',
    badge: 'Spatial & Metes',
    description: 'Parses lot/block, township range, subdivision plats, and metes-and-bounds into normalized geographic coordinates.',
    iconName: 'Compass',
    provider: 'anthropic',
    model: 'claude-3-5-sonnet',
    temperature: 0.0,
    maxTokens: 2048,
    supportsStreaming: false,
  },
};

export const INITIAL_SYSTEM_PROMPTS: Record<string, SystemPromptTemplate> = {
  'chatbot_qa:openai': {
    id: 'chatbot_qa:openai',
    functionKey: 'chatbot_qa',
    provider: 'openai',
    modelDisplayName: 'OpenAI - GPT-4o-mini',
    prompt: `You are TITLE MUNKE's certified Title Intelligence Assistant.
Use the verified property records, deed abstracts, and county recorder context to answer broker and agent questions accurately and concisely.
If property records contain gaps, probate ambiguity, or unreleased liens, explicitly highlight them with caution flags.
If the requested information is not in the official recording docket, state clearly that it is unverified.
Maintain an authoritative, clear, and broker-friendly tone at all times.`,
    defaultPrompt: `You are a helpful AI assistant. Use the provided document context to answer user questions accurately and concisely. If you don't know the answer, clearly say you don't know.\n\nFollow professional and safe guidelines.`,
    maxLimit: 2000,
    variables: ['{{property_address}}', '{{parcel_apn}}', '{{county_recorder}}', '{{vesting_info}}'],
    lastModified: '2026-10-06 14:22',
  },
  'chatbot_qa:anthropic': {
    id: 'chatbot_qa:anthropic',
    functionKey: 'chatbot_qa',
    provider: 'anthropic',
    modelDisplayName: 'Claude - Claude 3.5 Sonnet',
    prompt: `You are TITLE MUNKE's Senior Real Estate Legal Reasoning Model powered by Claude.
Analyze deed covenants, easements, covenants/conditions/restrictions (CC&Rs), and chain-of-title instruments with utmost legal precision.
Summarize risk assessments in concise bullet points with instrument recording book/page citations.
Never hallucinate grantor/grantee relationships or satisfaction of mortgages.`,
    defaultPrompt: `You are a helpful AI assistant powered by Claude. Use the provided document context to answer user questions in a clear, accurate and concise manner. If the answer is not available in the context, say you don't know.`,
    maxLimit: 2000,
    variables: ['{{property_address}}', '{{recorded_instruments}}', '{{legal_description}}'],
    lastModified: '2026-10-06 11:05',
  },
  'pdf_ocr:openai': {
    id: 'pdf_ocr:openai',
    functionKey: 'pdf_ocr',
    provider: 'openai',
    modelDisplayName: 'OpenAI - GPT-4o-mini',
    prompt: `You are an automated legal instrument OCR and information extraction pipeline for TITLE MUNKE.
Parse the attached document (Warranty Deed, Deed of Trust, Quitclaim Deed, Mechanic's Lien, or Tax Certificate) and output strict JSON.
Required extracted keys:
- instrument_number, book_number, page_number, recording_date
- grantor(s), grantee(s), vesting_type (e.g. Joint Tenancy, TIC)
- legal_description_verbatim, parcel_apn
- encumbrance_amount_usd, lender_name (if deed of trust)
Do not include conversational filler.`,
    defaultPrompt: `Extract all visible text and key metadata fields from the uploaded PDF document with high fidelity and return structured key-value pairs.`,
    maxLimit: 2000,
    variables: ['{{document_type}}', '{{county_state}}', '{{expected_parties}}'],
    lastModified: '2026-10-05 09:40',
  },
  'pdf_ocr:anthropic': {
    id: 'pdf_ocr:anthropic',
    functionKey: 'pdf_ocr',
    provider: 'anthropic',
    modelDisplayName: 'Claude - Claude 3.5 Sonnet',
    prompt: `You are TITLE MUNKE's precision OCR analyzer for historical and degraded county documents.
Read scanned deeds, handwritten grantor notes, notary seals, and recorder stamps.
When ink is faded or illegible, mark the specific field as "[ILLEGIBLE_VERIFY_MANUALLY]" rather than guessing.
Structure all legal metes and bounds boundaries sequentially starting from the Point of Beginning (POB).`,
    defaultPrompt: `Perform high-fidelity OCR on complex legal scans. Output extracted text with section markers and confidence scores.`,
    maxLimit: 2000,
    variables: ['{{scan_dpi}}', '{{recording_jurisdiction}}'],
    lastModified: '2026-10-04 17:15',
  },
  'chain_of_title:anthropic': {
    id: 'chain_of_title:anthropic',
    functionKey: 'chain_of_title',
    provider: 'anthropic',
    modelDisplayName: 'Claude - Claude 3.5 Sonnet',
    prompt: `You are TITLE MUNKE's Chain-of-Title Auditor.
Examine the chronological sequence of deeds, probate orders, deeds of trust, and reconveyances for the target property.
Flag any breaks in title ownership:
1. Grantor who did not receive title in previous instruments.
2. Wild deeds recorded outside the chain of title.
3. Open mortgages without recorded satisfaction or full reconveyance.
4. Active tax liens, judgments, or mechanic's liens encumbering current title.
Provide a clean risk clearance rating: CLEAR, CAUTION, or TITLE DEFECT.`,
    defaultPrompt: `Audit the chain of title from provided instrument entries. Highlight breaks in ownership and unreleased liens.`,
    maxLimit: 2000,
    variables: ['{{start_year}}', '{{target_parcel}}', '{{title_plant_records}}'],
    lastModified: '2026-10-07 08:30',
  },
};

export const INITIAL_CONTEXT_CONFIG: ContextHistoryConfig = {
  contextWindowTokens: 4000,
  conversationHistoryLimit: 10,
  ragChunkSize: 512,
  ragSimilarityThreshold: 0.82,
  enableHybridSearch: true,
  autoSummarization: true,
};

export const INITIAL_TOKEN_USAGE: TokenUsageMetric[] = [
  {
    modelId: 'gpt-4o-mini',
    modelName: 'OpenAI - GPT-4o-mini',
    provider: 'openai',
    usedTokens: 10000,
    totalTokens: 100000,
    costMonthToDate: 1.50,
    budgetAllocation: 25.00,
    resetDate: 'Oct 31, 2026',
    trendPercentage: 10,
  },
  {
    modelId: 'claude-3-5-sonnet',
    modelName: 'Claude - Claude 3.5 Sonnet',
    provider: 'anthropic',
    usedTokens: 25000,
    totalTokens: 100000,
    costMonthToDate: 12.80,
    budgetAllocation: 75.00,
    resetDate: 'Oct 31, 2026',
    trendPercentage: 25,
  },
  {
    modelId: 'gemini-1.5-pro',
    modelName: 'Google Gemini - 1.5 Pro',
    provider: 'google',
    usedTokens: 4200,
    totalTokens: 50000,
    costMonthToDate: 0.85,
    budgetAllocation: 20.00,
    resetDate: 'Oct 31, 2026',
    trendPercentage: 8,
  },
];
