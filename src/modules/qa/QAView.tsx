import { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  MessageSquare, 
  SplitSquareHorizontal, 
  Play, 
  Maximize,
  AlertTriangle,
  History,
  ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

export function QAView() {
  const [viewMode, setViewMode] = useState<'split' | 'single'>('split');

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Header */}
      <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-surface">
        <div className="flex items-center gap-4">
          <h2 className="text-sm font-semibold">QA & Patches</h2>
          <div className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[0.65rem] font-bold uppercase tracking-wider border border-amber-500/20 flex items-center gap-1">
            <AlertTriangle className="w-3 h-3" /> 3 Pending Reviews
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex bg-surface-low rounded border border-white/10 p-0.5">
            <button 
              onClick={() => setViewMode('single')}
              className={cn("px-3 py-1 rounded-sm text-xs font-medium transition-colors", viewMode === 'single' ? "bg-surface-highest shadow text-white" : "text-white/60 hover:text-white")}
            >
              Single
            </button>
            <button 
              onClick={() => setViewMode('split')}
              className={cn("px-3 py-1 rounded-sm text-xs font-medium transition-colors flex items-center gap-1", viewMode === 'split' ? "bg-surface-highest shadow text-white" : "text-white/60 hover:text-white")}
            >
              <SplitSquareHorizontal className="w-3 h-3" /> Split
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left List */}
        <aside className="w-72 border-r border-white/5 bg-surface-lowest flex flex-col shrink-0">
          <div className="p-4 border-b border-white/5">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4">Review Queue</h3>
            <div className="space-y-2">
              <div className="p-3 rounded-lg bg-surface border border-primary/30 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6rem] font-mono text-primary uppercase tracking-widest">SCENE_01_RENDER</span>
                  <span className="text-[0.6rem] text-white/40">2m ago</span>
                </div>
                <div className="text-sm font-medium truncate mb-1">Cyberpunk Cityscape V2</div>
                <div className="text-xs text-white/60 truncate">Needs review against Ref A</div>
              </div>
              <div className="p-3 rounded-lg bg-surface-low border border-white/5 hover:border-white/20 cursor-pointer transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest">CHAR_MODEL_V2</span>
                  <span className="text-[0.6rem] text-white/40">1h ago</span>
                </div>
                <div className="text-sm font-medium truncate mb-1">Hero Character Turnaround</div>
                <div className="text-xs text-white/60 truncate">Check lighting consistency</div>
              </div>
            </div>
          </div>
          <div className="p-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant mb-4 flex items-center gap-2">
              <History className="w-4 h-4" /> Recent Decisions
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate">ESTABLISHING_SHOT_v1</div>
                  <div className="text-[0.6rem] text-white/40">Approved by You</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center shrink-0">
                  <XCircle className="w-3.5 h-3.5 text-red-500" />
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-medium truncate">DRONE_FLYBY_v2</div>
                  <div className="text-[0.6rem] text-white/40">Rejected: "Too much motion blur"</div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Comparison Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-background">
          <div className="flex-1 flex p-6 gap-6">
            
            {/* Reference / Previous Version */}
            {viewMode === 'split' && (
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-xs font-mono text-white/60 uppercase tracking-widest">Reference / Previous</div>
                  <span className="text-xs bg-surface-highest px-2 py-1 rounded">v1.0</span>
                </div>
                <div className="flex-1 bg-black rounded-lg border border-white/10 relative overflow-hidden flex items-center justify-center group">
                  <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop" alt="Ref" className="w-full h-full object-cover opacity-80" />
                  <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="p-2 bg-black/50 backdrop-blur rounded hover:bg-black/80 text-white transition-colors">
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Current Review Item */}
            <div className="flex-1 flex flex-col">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono text-primary uppercase tracking-widest flex items-center gap-2">
                  {viewMode === 'split' && <ArrowRight className="w-3 h-3" />}
                  Current Render
                </div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded">v2.0 (Review)</span>
              </div>
              <div className="flex-1 bg-black rounded-lg border border-primary/30 relative overflow-hidden flex items-center justify-center group shadow-[0_0_30px_rgba(99,102,241,0.1)]">
                <img src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop" alt="Current" className="w-full h-full object-cover" />
                
                {/* Play Button Overlay for Video */}
                <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-16 h-16 rounded-full bg-white/10 backdrop-blur border border-white/20 text-white flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-8 h-8 ml-1" />
                  </button>
                </div>

                <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="p-2 bg-black/50 backdrop-blur rounded hover:bg-black/80 text-white transition-colors">
                    <Maximize className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

          </div>

          {/* Action Panel */}
          <div className="h-48 border-t border-white/5 bg-surface flex shrink-0">
            {/* Feedback Input */}
            <div className="flex-1 p-6 flex flex-col">
              <label className="text-xs font-mono text-white/60 uppercase tracking-widest mb-2 flex items-center gap-2">
                <MessageSquare className="w-3.5 h-3.5" /> Feedback / Patch Request
              </label>
              <textarea 
                className="flex-1 bg-surface-lowest border border-white/10 rounded-lg p-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
                placeholder="Describe what needs to be fixed or changed..."
              ></textarea>
            </div>

            {/* Actions */}
            <div className="w-80 border-l border-white/5 p-6 flex flex-col justify-center gap-3">
              <button className="w-full py-3 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-lg text-sm font-bold hover:bg-emerald-500/20 transition-colors flex items-center justify-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Approve & Proceed
              </button>
              <button className="w-full py-3 bg-amber-500/10 text-amber-500 border border-amber-500/20 rounded-lg text-sm font-bold hover:bg-amber-500/20 transition-colors flex items-center justify-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Request Patch
              </button>
              <button className="w-full py-3 bg-red-500/10 text-red-500 border border-red-500/20 rounded-lg text-sm font-bold hover:bg-red-500/20 transition-colors flex items-center justify-center gap-2">
                <XCircle className="w-5 h-5" /> Reject & Restart
              </button>
            </div>
          </div>
        </main>

      </div>
    </div>
  );
}
