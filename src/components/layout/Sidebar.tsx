'use client';

import React from 'react';
import Image from 'next/image';
import {
  LayoutDashboard,
  MessageSquare,
  FileText,
  BookOpen,
  Cpu,
  Users,
  Layers,
  CreditCard,
  Activity,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface SidebarProps {
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export function Sidebar({ isMobileOpen, onCloseMobile }: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, href: '#', active: false, badge: null },
    { name: 'Conversations', icon: MessageSquare, href: '#', active: false, badge: '12' },
    { name: 'Documents', icon: FileText, href: '#', active: false, badge: null },
    { name: 'Knowledge Base', icon: BookOpen, href: '#', active: false, badge: null },
    { name: 'AI Settings', icon: Cpu, href: '#', active: true, badge: 'Active' },
    { name: 'Users', icon: Users, href: '#', active: false, badge: null },
    { name: 'Integrations', icon: Layers, href: '#', active: false, badge: null },
    { name: 'Usage & Billing', icon: CreditCard, href: '#', active: false, badge: null },
    { name: 'Logs & Monitoring', icon: Activity, href: '#', active: false, badge: null },
    { name: 'System Settings', icon: Settings, href: '#', active: false, badge: null },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-40 w-64 bg-[#0d131f] text-slate-200 flex flex-col border-r border-slate-800/80 transition-transform duration-300 lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="p-4 border-b border-slate-800/80 flex items-center gap-3">
          <div className="relative w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center shrink-0 shadow-md ring-1 ring-white/10 overflow-hidden">
            <Image
              src="/title-munke-logo.png"
              alt="TITLE MUNKE Logo"
              width={40}
              height={40}
              className="object-contain"
              priority
            />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-base tracking-wide text-white font-sans uppercase">
                TITLE MUNKE
              </span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="text-[11px] font-medium text-slate-400">Admin Console</span>
              <span className="inline-flex items-center px-1.5 py-0.2 rounded text-[9px] font-semibold bg-[#550000]/80 text-rose-200 border border-rose-800/60">
                PRO
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">
          <div className="px-3 pb-2 text-[10px] font-semibold tracking-wider text-slate-400 uppercase">
            Platform Management
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.active;

            return (
              <a
                key={item.name}
                href={item.href}
                className={`group flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? 'bg-[#550000] text-white shadow-sm shadow-[#550000]/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 transition-transform duration-200 group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                    }`}
                  />
                  <span className="truncate">{item.name}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </a>
            );
          })}
        </nav>

        {/* Footer Info Card */}
        <div className="p-3 border-t border-slate-800/80">
          <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-xs font-semibold text-slate-200">AI Gateway</span>
              </div>
              <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-1.5 py-0.5 rounded">
                99.98%
              </span>
            </div>

            <p className="text-[11px] text-slate-400 leading-relaxed">
              Multi-model load balancer healthy. 4 model providers active.
            </p>

            <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-800/60">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-slate-400" /> SOC2 Compliant
              </span>
              <span>v2.4.1</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
