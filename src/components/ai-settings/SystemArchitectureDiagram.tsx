'use client';

import React from 'react';

export function SystemArchitectureDiagram() {
  return (
    <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#eadfd4] shadow-xs transition-colors">
      {/* Header */}
      <div className="flex items-center gap-2.5 pb-4 mb-4 border-b border-[#f0e7dd]">
        <svg
          className="w-5 h-5 text-[#1e293b] shrink-0"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="6" height="6" rx="1.5" />
          <rect x="16" y="3" width="6" height="6" rx="1.5" />
          <rect x="9" y="15" width="6" height="6" rx="1.5" />
          <path d="M5 9v3a2 2 0 0 0 2 2h5" />
          <path d="M19 9v3a2 2 0 0 1-2 2h-5" />
        </svg>
        <h2 className="text-base sm:text-lg font-bold text-[#0f172a] font-sans tracking-tight">
          System Architecture
        </h2>
      </div>

      {/* Diagram Container */}
      <div className="w-full flex flex-col items-center">

        {/* 1. Admin Panel */}
        <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#edf4fe] border border-[#cde0f8] text-center shadow-2xs">
          <h3 className="text-sm font-bold text-[#0f172a] font-sans">
            Admin Panel
          </h3>
          <p className="text-xs text-[#475569] mt-0.5 font-sans">
            Select AI models & configure settings
          </p>
        </div>

        {/* Connector 1: Admin Panel -> 4 Providers */}
        <svg
          className="w-full h-8"
          viewBox="0 0 400 36"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arch-arrow-1"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#550000" />
            </marker>
          </defs>
          {/* Vertical down from Admin Panel */}
          <line x1="200" y1="0" x2="200" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Horizontal distributor bar */}
          <line x1="50" y1="14" x2="350" y2="14" stroke="#550000" strokeWidth="2" />
          {/* 4 Drops into provider cards */}
          <line x1="50" y1="14" x2="50" y2="34" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-1)" />
          <line x1="150" y1="14" x2="150" y2="34" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-1)" />
          <line x1="250" y1="14" x2="250" y2="34" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-1)" />
          <line x1="350" y1="14" x2="350" y2="34" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-1)" />
        </svg>

        {/* 2. Provider Cards Grid */}
        <div className="grid grid-cols-4 gap-2 sm:gap-2.5 w-full">
          {/* OpenAI */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#cde0f8] text-center shadow-xs">
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              <svg className="w-6 h-6 text-[#10a37f]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4754 4.4754 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1683a.071.071 0 0 1 .038.052v5.5826a4.5045 4.5045 0 0 1-4.4945 4.4947zm-9.6607-4.1254a4.4706 4.4706 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4998 4.4998 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1683a.0757.0757 0 0 1-.071 0l-4.8303-2.7866A4.5045 4.5045 0 0 1 2.3408 7.8956zm16.0993 3.8558L12.5973 8.3829l2.0201-1.1635a.0804.0804 0 0 1 .071 0l4.8303 2.7913a4.4947 4.4947 0 0 1-.6768 8.1042v-5.6772a.79.79 0 0 0-.4018-.6863zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L8.907 9.2298V6.8974a.0662.0662 0 0 1 .0331-.0615l4.8824-2.8197a4.5045 4.5045 0 0 1 6.6384 4.8872zM12.0002 13.038l-2.4839-1.4339 2.4839-1.434 2.484 1.434-2.484 1.4339z" />
              </svg>
            </div>
            <div className="text-xs font-bold text-[#0f172a] mt-1 font-sans">
              OpenAI
            </div>
            <div className="text-[10px] text-[#64748b] font-sans">
              GPT-4o
            </div>
          </div>

          {/* Claude */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#cde0f8] text-center shadow-xs">
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              <div className="w-7 h-7 rounded-md bg-[#eac7a1] flex items-center justify-center font-bold text-stone-900 text-xs shadow-2xs">
                <span className="font-serif font-black tracking-tighter">A\</span>
              </div>
            </div>
            <div className="text-xs font-bold text-[#0f172a] mt-1 font-sans">
              Claude
            </div>
            <div className="text-[10px] text-[#64748b] font-sans">
              Claude 3
            </div>
          </div>

          {/* Grok */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#cde0f8] text-center shadow-xs">
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              <span className="text-base font-black italic tracking-tighter text-[#0f172a]">
                X\
              </span>
            </div>
            <div className="text-xs font-bold text-[#0f172a] mt-1 font-sans">
              Grok
            </div>
            <div className="text-[10px] text-[#64748b] font-sans">
              Grok 1
            </div>
          </div>

          {/* More Providers */}
          <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-[#cde0f8] text-center shadow-xs">
            <div className="w-8 h-8 mx-auto flex items-center justify-center">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-[#550000]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#550000]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#550000]" />
              </div>
            </div>
            <div className="text-xs font-bold text-[#0f172a] mt-1 font-sans">
              More
            </div>
            <div className="text-[10px] text-[#64748b] font-sans">
              Providers
            </div>
          </div>
        </div>

        {/* Connector 2: 4 Providers -> AI Gateway */}
        <svg
          className="w-full h-8"
          viewBox="0 0 400 36"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arch-arrow-2"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#550000" />
            </marker>
          </defs>
          {/* 4 Drops from provider cards */}
          <line x1="50" y1="0" x2="50" y2="18" stroke="#550000" strokeWidth="2" />
          <line x1="150" y1="0" x2="150" y2="18" stroke="#550000" strokeWidth="2" />
          <line x1="250" y1="0" x2="250" y2="18" stroke="#550000" strokeWidth="2" />
          <line x1="350" y1="0" x2="350" y2="18" stroke="#550000" strokeWidth="2" />
          {/* Horizontal collector bar */}
          <line x1="50" y1="18" x2="350" y2="18" stroke="#550000" strokeWidth="2" />
          {/* Central drop into AI Gateway */}
          <line x1="200" y1="18" x2="200" y2="34" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-2)" />
        </svg>

        {/* 3. AI Gateway */}
        <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#f4effe] border border-[#e3d8fc] text-center shadow-2xs">
          <div className="flex items-center justify-center gap-2">
            <svg
              className="w-4 h-4 text-[#7c3aed] shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="5" r="2.5" />
              <circle cx="6" cy="18" r="2.5" />
              <circle cx="18" cy="18" r="2.5" />
              <line x1="10.5" y1="7" x2="7.5" y2="15.5" />
              <line x1="13.5" y1="7" x2="16.5" y2="15.5" />
              <line x1="8.5" y1="18" x2="15.5" y2="18" />
            </svg>
            <h3 className="text-sm font-bold text-[#0f172a] font-sans">
              AI Gateway
            </h3>
          </div>
          <p className="text-xs text-[#475569] mt-0.5 font-sans">
            Routes requests to selected provider
          </p>
        </div>

        {/* Connector 3: AI Gateway -> 2 Databases */}
        <svg
          className="w-full h-8"
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arch-arrow-3"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#550000" />
            </marker>
          </defs>
          {/* Vertical down from AI Gateway */}
          <line x1="200" y1="0" x2="200" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Horizontal split bar */}
          <line x1="100" y1="14" x2="300" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Left drop into Conversation DB */}
          <line x1="100" y1="14" x2="100" y2="30" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-3)" />
          {/* Right drop into Vector DB */}
          <line x1="300" y1="14" x2="300" y2="30" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-3)" />
        </svg>

        {/* 4. Databases Row (Conversation DB & Vector DB) */}
        <div className="grid grid-cols-2 gap-2.5 w-full">
          {/* Conversation DB */}
          <div className="p-3 rounded-xl bg-[#edf4fe] border border-[#cde0f8] flex items-start gap-2.5 shadow-2xs">
            <svg
              className="w-6 h-6 text-[#2563eb] shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] font-sans truncate">
                Conversation DB
              </h4>
              <p className="text-[11px] text-[#475569] mt-0.5 leading-tight font-sans">
                Stores user/AI conversation history
              </p>
            </div>
          </div>

          {/* Vector DB */}
          <div className="p-3 rounded-xl bg-[#eefbf4] border border-[#c5f0d6] flex items-start gap-2.5 shadow-2xs">
            <svg
              className="w-6 h-6 text-[#10b981] shrink-0 mt-0.5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
              <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
            </svg>
            <div className="min-w-0">
              <h4 className="text-xs sm:text-sm font-bold text-[#0f172a] font-sans truncate">
                Vector DB
              </h4>
              <p className="text-[11px] text-[#475569] mt-0.5 leading-tight font-sans">
                Stores document embeddings & knowledge
              </p>
            </div>
          </div>
        </div>

        {/* Connector 4: Databases -> Chatbot */}
        <svg
          className="w-full h-8"
          viewBox="0 0 400 32"
          preserveAspectRatio="none"
        >
          <defs>
            <marker
              id="arch-arrow-4"
              markerWidth="6"
              markerHeight="6"
              refX="4"
              refY="3"
              orient="auto"
            >
              <path d="M 0 0 L 6 3 L 0 6 z" fill="#550000" />
            </marker>
          </defs>
          {/* Left drop from Conversation DB */}
          <line x1="100" y1="0" x2="100" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Right drop from Vector DB */}
          <line x1="300" y1="0" x2="300" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Horizontal collector bar */}
          <line x1="100" y1="14" x2="300" y2="14" stroke="#550000" strokeWidth="2" />
          {/* Central drop into Chatbot */}
          <line x1="200" y1="14" x2="200" y2="30" stroke="#550000" strokeWidth="2" markerEnd="url(#arch-arrow-4)" />
        </svg>

        {/* 5. Chatbot */}
        <div className="w-full p-3 sm:p-3.5 rounded-xl bg-[#edf4fe] border border-[#cde0f8] flex items-center gap-3 shadow-2xs">
          <div className="w-8 h-8 rounded-lg bg-[#550000] flex items-center justify-center shrink-0 shadow-2xs">
            <svg
              className="w-5 h-5 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z" />
              <circle cx="8" cy="10" r="1.3" fill="white" />
              <circle cx="12" cy="10" r="1.3" fill="white" />
              <circle cx="16" cy="10" r="1.3" fill="white" />
            </svg>
          </div>
          <div className="min-w-0">
            <h3 className="text-sm font-bold text-[#0f172a] font-sans">
              Chatbot
            </h3>
            <p className="text-xs text-[#475569] mt-0.5 font-sans">
              Uses selected model with history & context
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
