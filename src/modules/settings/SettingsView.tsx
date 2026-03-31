import { useState } from 'react';
import { 
  User, 
  Key, 
  Globe, 
  Shield, 
  Database, 
  Bell,
  Save,
  Settings
} from "lucide-react";
import { cn } from "@/lib/utils";

const TABS = [
  { id: 'profile', label: 'Profile & Team', icon: User },
  { id: 'api', label: 'API Keys & Models', icon: Key },
  { id: 'geo', label: 'Geo Rules', icon: Globe },
  { id: 'security', label: 'Security', icon: Shield },
  { id: 'storage', label: 'Storage', icon: Database },
  { id: 'notifications', label: 'Notifications', icon: Bell },
];

export function SettingsView() {
  const [activeTab, setActiveTab] = useState('api');

  return (
    <div className="flex-1 flex bg-background overflow-hidden">
      {/* Settings Navigation */}
      <aside className="w-64 border-r border-white/5 bg-surface-lowest flex flex-col shrink-0">
        <div className="p-6 border-b border-white/5">
          <h2 className="text-lg font-semibold">Settings</h2>
          <p className="text-xs text-white/40 mt-1">Manage workspace preferences.</p>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {TABS.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-primary/10 text-primary" 
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                <Icon className={cn("w-4 h-4", isActive ? "text-primary" : "text-white/40")} />
                {tab.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Settings Content */}
      <main className="flex-1 overflow-y-auto p-8 custom-scrollbar">
        <div className="max-w-3xl">
          
          {activeTab === 'api' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div>
                <h3 className="text-xl font-semibold mb-1">API Keys & Models</h3>
                <p className="text-sm text-white/40">Configure your reasoning, rendering and internal model providers.</p>
              </div>

              {/* Provider: Primary reasoning */}
              <div className="bg-surface-low border border-white/10 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-surface">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                      <span className="font-bold text-white">R</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Reasoning Provider</h4>
                      <p className="text-xs text-white/40">Primary language, orchestration and multimodal endpoint.</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-emerald-500/10 text-emerald-500 text-[0.65rem] font-bold uppercase tracking-wider border border-emerald-500/20">
                    Connected
                  </div>
                </div>
                <div className="p-5 space-y-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">API Key</label>
                    <input 
                      type="password" 
                      className="w-full bg-surface-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors font-mono"
                      defaultValue="mirv-provider-key"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">Default Model</label>
                    <select className="w-full bg-surface-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                      <option>reasoning-core-v1</option>
                      <option>reasoning-fast-v1</option>
                      <option>vision-router-v1</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Provider: Custom Endpoint */}
              <div className="bg-surface-low border border-white/10 rounded-xl overflow-hidden">
                <div className="p-5 border-b border-white/5 flex items-center justify-between bg-surface">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded bg-white/10 flex items-center justify-center">
                      <span className="font-bold text-white">C</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Custom Image/Video Model</h4>
                      <p className="text-xs text-white/40">Connect to your internal rendering cluster.</p>
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded bg-white/5 text-white/40 text-[0.65rem] font-bold uppercase tracking-wider border border-white/10">
                    Not Configured
                  </div>
                </div>
                <div className="p-5 space-y-4 opacity-50">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">Endpoint URL</label>
                    <input 
                      type="text" 
                      className="w-full bg-surface-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors font-mono"
                      placeholder="https://api.internal-cluster.com/v1"
                      disabled
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">Bearer Token</label>
                    <input 
                      type="password" 
                      className="w-full bg-surface-highest border border-white/10 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:border-primary/50 transition-colors font-mono"
                      placeholder="sk-..."
                      disabled
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <button className="px-6 py-2.5 bg-primary text-on-primary-container rounded text-sm font-bold flex items-center gap-2 hover:brightness-110 transition-colors shadow-lg shadow-primary/20">
                  <Save className="w-4 h-4" /> Save Changes
                </button>
              </div>
            </div>
          )}

          {activeTab !== 'api' && (
            <div className="flex flex-col items-center justify-center h-64 text-center animate-in fade-in duration-300">
              <div className="w-16 h-16 rounded-full bg-surface-highest flex items-center justify-center mb-4">
                <Settings className="w-8 h-8 text-white/20" />
              </div>
              <h3 className="text-lg font-medium mb-2">Settings Category</h3>
              <p className="text-sm text-white/40 max-w-sm">This settings panel is currently under construction. Please check back later.</p>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
