'use client';

import React, { useState } from 'react';
import {
  Key,
  ShieldCheck,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  BookOpen,
  Lock,
} from 'lucide-react';

export function AboutModelSwitchingCard() {
  const [activeTab, setActiveTab] = useState<'claude' | 'openai' | 'safety' | 'all'>('claude');
  const [copiedEnv, setCopiedEnv] = useState(false);

  const handleCopyEnv = () => {
    navigator.clipboard.writeText('export ANTHROPIC_API_KEY="sk-ant-..."\nexport OPENAI_API_KEY="sk-..."');
    setCopiedEnv(true);
    setTimeout(() => setCopiedEnv(false), 2000);
  };

  const claudeSteps = [
    {
      text: (
        <>
          Go to{' '}
          <a
            href="https://console.anthropic.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#550000] font-semibold underline underline-offset-2 hover:text-[#750000] inline-flex items-center gap-0.5"
          >
            console.anthropic.com
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>{' '}
          and sign in or create an account.
        </>
      ),
    },
    { text: 'Add billing or credits if the Console asks you to.' },
    {
      text: 'Open Settings, then API keys. Some versions of the Console put this under Organization settings.',
    },
    {
      text: 'Click Create key. If you have more than one workspace, pick the right one.',
    },
    { text: 'Give it a clear name, like "rag-dev", and confirm.' },
    { text: 'Copy the key right away. It will only be shown once.' },
  ];

  const openAISteps = [
    {
      text: (
        <>
          Go to{' '}
          <a
            href="https://platform.openai.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#550000] font-semibold underline underline-offset-2 hover:text-[#750000] inline-flex items-center gap-0.5"
          >
            platform.openai.com
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>{' '}
          and sign in or sign up.
        </>
      ),
    },
    {
      text: 'On first use, you need to create an organization before you can generate keys.',
    },
    {
      text: (
        <>
          Go to{' '}
          <a
            href="https://platform.openai.com/api-keys"
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#550000] font-semibold underline underline-offset-2 hover:text-[#750000] inline-flex items-center gap-0.5"
          >
            platform.openai.com/api-keys
            <ExternalLink className="w-2.5 h-2.5 inline" />
          </a>{' '}
          and click Create new secret key.
        </>
      ),
    },
    {
      text: 'Name the key and choose its project. Every API key belongs to a project inside your organization. You may also be asked to verify your phone number.',
    },
    {
      text: 'Click Create secret key and copy it immediately. OpenAI shows your secret key only once.',
    },
    {
      text: 'Buy some credits under the billing page, or the key won\'t work.',
    },
  ];

  const safetyItems = [
    {
      title: 'Put the keys in environment variables, not in your code',
      desc: 'Both official SDKs read these variable names automatically.',
    },
    {
      title: 'Never commit keys to Git',
      desc: 'Always add .env to your .gitignore file before pushing code.',
    },
    {
      title: 'Use a separate key for each project or client',
      desc: 'That way you can revoke one without breaking the others.',
    },
    {
      title: 'Immediate leakage response',
      desc: 'If a key leaks, delete it immediately in the console and create a new one.',
    },
  ];

  const sources = [
    {
      name: 'Anthropic API key guide (StackOne)',
      url: 'https://docs.stackone.com/connectors/anthropic/guides/link-account/api-key',
    },
    {
      name: 'How to Get an Anthropic API Key (Collab365)',
      url: 'https://go.collab365.com/how-to-get-anthropic-api-key',
    },
    {
      name: 'OpenAI API Key guide (DBSync)',
      url: 'https://docs.mydbsync.com/cloud-workflow/create-your-workflow/actions/ai-agent-api-key-guides/openai-api-key',
    },
    {
      name: 'How to Create an OpenAI API Key (xray.tech)',
      url: 'https://www.xray.tech/post/openai-api-key-2026',
    },
  ];

  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#f0e7dd]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#faf2f2] border border-[#ebd8d8] flex items-center justify-center text-[#550000] shrink-0">
            <Key className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-stone-900 font-sans tracking-tight">
              About Model Switching & API Keys
            </h3>
            <p className="text-[11px] text-stone-500 font-sans">
              Setup instructions & security guidelines
            </p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#faf6f0] border border-[#ebd8d8]/60 mb-4 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => setActiveTab('claude')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0 font-sans ${
            activeTab === 'claude'
              ? 'bg-white text-[#550000] shadow-xs border border-[#ebd8d8]'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Claude (Anthropic)
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('openai')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0 font-sans ${
            activeTab === 'openai'
              ? 'bg-white text-[#550000] shadow-xs border border-[#ebd8d8]'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          OpenAI
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('safety')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0 font-sans ${
            activeTab === 'safety'
              ? 'bg-white text-[#550000] shadow-xs border border-[#ebd8d8]'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          Key Safety
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer shrink-0 font-sans ${
            activeTab === 'all'
              ? 'bg-white text-[#550000] shadow-xs border border-[#ebd8d8]'
              : 'text-stone-600 hover:text-stone-900'
          }`}
        >
          All Guides
        </button>
      </div>

      {/* Tab Content: Claude */}
      {(activeTab === 'claude' || activeTab === 'all') && (
        <div className={activeTab === 'all' ? 'mb-6 pb-6 border-b border-[#f0e7dd]' : ''}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-amber-600" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
              Claude (Anthropic) API key
            </h4>
          </div>

          <ol className="space-y-2.5">
            {claudeSteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#faf2f2] text-[#550000] border border-[#ebd8d8] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs text-stone-700 leading-relaxed font-sans">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>

          {/* Admin warning box */}
          <div className="mt-3.5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/80 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <p className="text-[11px] text-amber-900 leading-relaxed font-sans">
              If the button is missing, you may not have admin access to the organization, or you may be signed into the wrong account.
            </p>
          </div>

          <p className="text-[11px] text-stone-500 mt-3 font-sans">
            Anthropic&apos;s API docs are at{' '}
            <a
              href="https://docs.claude.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#550000] underline font-medium hover:text-[#700000]"
            >
              docs.claude.com
            </a>
            , in case the console layout has changed since these guides were written.
          </p>
        </div>
      )}

      {/* Tab Content: OpenAI */}
      {(activeTab === 'openai' || activeTab === 'all') && (
        <div className={activeTab === 'all' ? 'mb-6 pb-6 border-b border-[#f0e7dd]' : ''}>
          <div className="flex items-center gap-2 mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-600" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
              OpenAI API key
            </h4>
          </div>

          <ol className="space-y-2.5">
            {openAISteps.map((step, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <span className="w-4 h-4 rounded-full bg-[#faf2f2] text-[#550000] border border-[#ebd8d8] font-mono text-[10px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-xs text-stone-700 leading-relaxed font-sans">
                  {step.text}
                </span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Tab Content: Key Safety */}
      {(activeTab === 'safety' || activeTab === 'all') && (
        <div>
          <div className="flex items-center gap-2 mb-3">
            <ShieldCheck className="w-4 h-4 text-[#550000]" />
            <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wider font-sans">
              Using the keys safely
            </h4>
          </div>

          {/* Environment Variables Box */}
          <div className="p-3.5 rounded-xl bg-[#faf6f0] border border-[#eadfd4] mb-3.5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-semibold text-stone-700 font-sans">
                Put keys in environment variables, not in code:
              </span>
              <button
                type="button"
                onClick={handleCopyEnv}
                className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#550000] hover:text-[#700000] cursor-pointer"
              >
                {copiedEnv ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
            <pre className="font-mono text-[11px] text-stone-800 bg-white p-2.5 rounded-lg border border-[#ebd8d8] overflow-x-auto select-all leading-relaxed">
              <code>{`export ANTHROPIC_API_KEY="sk-ant-..."\nexport OPENAI_API_KEY="sk-..."`}</code>
            </pre>
            <p className="text-[10px] text-stone-500 mt-2 font-sans">
              Both official SDKs read these variable names automatically.
            </p>
          </div>

          {/* Safety Bullet Points */}
          <ul className="space-y-2 mb-4">
            {safetyItems.slice(1).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs text-stone-700 font-sans">
                <Lock className="w-3.5 h-3.5 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-stone-800">{item.title}. </span>
                  <span className="text-stone-600">{item.desc}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sources Section */}
      <div className="mt-4 pt-4 border-t border-[#f0e7dd]">
        <div className="flex items-center gap-1.5 mb-2.5 text-stone-500">
          <BookOpen className="w-3.5 h-3.5" />
          <span className="text-[11px] font-bold uppercase tracking-wider font-sans">
            Sources & Guides
          </span>
        </div>
        <div className="space-y-1.5">
          {sources.map((src, idx) => (
            <a
              key={idx}
              href={src.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between text-[11px] text-stone-600 hover:text-[#550000] transition-colors group p-1.5 rounded-lg hover:bg-[#faf6f0]"
            >
              <span className="truncate pr-2 font-sans">{src.name}</span>
              <ExternalLink className="w-3 h-3 shrink-0 text-stone-400 group-hover:text-[#550000] transition-colors" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
