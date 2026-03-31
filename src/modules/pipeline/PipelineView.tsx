import { Play, RotateCw, ExternalLink, Filter, RefreshCcw, Terminal, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

const jobs = [
  {
    id: "#TX-8802",
    type: "Visual Synthesis",
    status: "RUNNING",
    statusColor: "text-amber-500",
    dotColor: "bg-amber-500 animate-pulse",
    log: "[14:02:11] Starting tensor allocation for scene_01..."
  },
  {
    id: "#TX-8801",
    type: "Logic Parser",
    status: "SUCCESS",
    statusColor: "text-emerald-500",
    dotColor: "bg-emerald-500",
    log: "[14:00:04] Logic tree validated. Exiting 0."
  },
  {
    id: "#TX-8799",
    type: "Prompt Encoder",
    status: "FAILED",
    statusColor: "text-red-400",
    dotColor: "bg-red-400",
    log: "ERROR: Connection timeout on port 8080 (Gateway)."
  },
  {
    id: "#TX-8798",
    type: "Image Analysis",
    status: "SUCCESS",
    statusColor: "text-emerald-500",
    dotColor: "bg-emerald-500",
    log: "Analysis complete. 42 regions detected."
  }
];

export function PipelineView() {
  return (
    <div className="flex flex-1 overflow-hidden h-full">
      {/* Left Rail: 18-Stage DAG */}
      <section className="w-64 bg-surface-lowest border-r border-white/5 overflow-y-auto p-4 custom-scrollbar shrink-0">
        <div className="mb-6 flex items-center justify-between">
          <h3 className="text-[0.6875rem] font-mono uppercase tracking-[0.2em] text-white/40">DAG Execution</h3>
          <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[0.6rem] font-bold border border-primary/20">AUTO-RUN</span>
        </div>
        
        <div className="space-y-6 relative">
          {/* Stage 1 */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] z-10"></div>
            <div className="absolute left-[5px] top-4.5 w-[2px] h-full bg-emerald-500/20"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold text-on-surface">Creative Concept</span>
              <span className="text-[0.6rem] text-emerald-500 font-mono mt-0.5">COMPLETE - 12s</span>
            </div>
          </div>
          
          {/* Stage 2 */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] z-10"></div>
            <div className="absolute left-[5px] top-4.5 w-[2px] h-full bg-emerald-500/20"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold text-on-surface">Visual Scripting</span>
              <span className="text-[0.6rem] text-emerald-500 font-mono mt-0.5">COMPLETE - 0.4s</span>
            </div>
          </div>
          
          {/* Stage 3 (Active) */}
          <div className="relative pl-6">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)] z-10"></div>
            <div className="absolute left-[5px] top-4.5 w-[2px] h-full border-l-2 border-dashed border-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold text-primary">Scene Synthesis</span>
              <span className="text-[0.6rem] text-amber-500 font-mono italic animate-pulse mt-0.5">PROCESSING...</span>
              <div className="mt-3 flex gap-2">
                <button className="text-[0.6rem] px-3 py-1 bg-surface-highest border border-white/5 text-white/80 hover:bg-white/10 rounded transition-colors font-medium">PATCH</button>
                <button className="text-[0.6rem] px-3 py-1 bg-surface-highest border border-white/5 text-white/80 hover:bg-white/10 rounded transition-colors font-medium">REGEN</button>
              </div>
            </div>
          </div>
          
          {/* Future Stages */}
          <div className="relative pl-6 opacity-40">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10"></div>
            <div className="absolute left-[5px] top-4.5 w-[2px] h-full border-l-2 border-dashed border-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold">Mesh Gen</span>
              <span className="text-[0.6rem] font-mono uppercase mt-0.5">Pending</span>
            </div>
          </div>
          
          <div className="relative pl-6 opacity-40">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10"></div>
            <div className="absolute left-[5px] top-4.5 w-[2px] h-full border-l-2 border-dashed border-white/10"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold">PBR Texturing</span>
              <span className="text-[0.6rem] font-mono uppercase mt-0.5">Pending</span>
            </div>
          </div>
          
          <div className="relative pl-6 opacity-40">
            <div className="absolute left-0 top-1.5 w-3 h-3 rounded-full border-2 border-white/20 bg-background z-10"></div>
            <div className="flex flex-col">
              <span className="text-[0.75rem] font-semibold">+ 12 More Stages</span>
            </div>
          </div>
        </div>
      </section>

      {/* Center: Job Queue Table & Terminal */}
      <section className="flex-1 flex flex-col bg-background min-w-0">
        <div className="p-4 flex items-center justify-between border-b border-white/5">
          <div className="flex items-center gap-4">
            <h2 className="text-sm font-semibold tracking-tight">Active Job Queue</h2>
            <div className="flex items-center gap-2 px-3 py-1 bg-surface-low rounded-lg border border-white/5">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500"></div>
              <span className="text-[0.65rem] font-mono text-emerald-500 uppercase tracking-tighter">System Health: Nominal</span>
            </div>
          </div>
          <div className="flex gap-3">
            <button className="text-white/40 hover:text-white transition-colors"><Filter className="w-4 h-4" /></button>
            <button className="text-white/40 hover:text-white transition-colors"><RefreshCcw className="w-4 h-4" /></button>
          </div>
        </div>
        
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-left border-collapse">
            <thead className="sticky top-0 bg-surface-low z-10 border-b border-white/5">
              <tr>
                <th className="p-3 text-[0.65rem] font-mono text-white/40 uppercase tracking-widest font-medium">Job ID</th>
                <th className="p-3 text-[0.65rem] font-mono text-white/40 uppercase tracking-widest font-medium">Node Type</th>
                <th className="p-3 text-[0.65rem] font-mono text-white/40 uppercase tracking-widest font-medium">Status</th>
                <th className="p-3 text-[0.65rem] font-mono text-white/40 uppercase tracking-widest font-medium">Logs Tail</th>
                <th className="p-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {jobs.map((job) => (
                <tr key={job.id} className="hover:bg-primary/5 transition-colors group">
                  <td className="p-3 font-mono text-xs text-white/80">{job.id}</td>
                  <td className="p-3 text-xs text-white">{job.type}</td>
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={cn("w-1.5 h-1.5 rounded-full", job.dotColor)}></div>
                      <span className={cn("text-[0.7rem] font-bold", job.statusColor)}>{job.status}</span>
                    </div>
                  </td>
                  <td className="p-3">
                    <span className={cn(
                      "font-mono text-[0.65rem] truncate block max-w-[300px]",
                      job.status === 'FAILED' ? "text-red-400/80" : "text-white/40"
                    )}>
                      {job.log}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className={cn(
                      "transition-colors cursor-pointer",
                      job.status === 'FAILED' ? "text-white/20 hover:text-red-400" : "text-white/20 hover:text-primary"
                    )}>
                      {job.status === 'FAILED' ? <RotateCw className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bottom Drawer: Terminal */}
        <div className="h-56 border-t border-white/10 bg-surface-lowest flex flex-col shrink-0">
          <div className="px-4 py-2 bg-surface-low flex justify-between items-center border-b border-white/5">
            <div className="flex items-center gap-3">
              <Terminal className="w-3.5 h-3.5 text-primary" />
              <span className="text-[0.65rem] font-mono uppercase tracking-[0.2em] text-white/60">Live Terminal Stream — Session #442</span>
            </div>
            <div className="flex gap-4">
              <button className="text-[0.65rem] font-mono text-primary hover:underline flex items-center gap-1">
                <Pause className="w-3 h-3" /> PAUSE
              </button>
              <button className="text-[0.65rem] font-mono text-white/20 hover:text-white transition-colors">CLEAR</button>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-4 font-mono text-[0.75rem] leading-relaxed custom-scrollbar">
            <p className="text-white/40"><span className="text-emerald-500">[14:15:01]</span> <span className="text-primary">CORE:</span> Initializing DAG worker 12...</p>
            <p className="text-white/40"><span className="text-emerald-500">[14:15:02]</span> <span className="text-primary">CORE:</span> Worker 12 registered to Node #TX-8802</p>
            <p className="text-white/40"><span className="text-emerald-500">[14:15:04]</span> <span className="text-amber-500">WARN:</span> Memory pressure at 82% on cluster C-1</p>
            <p className="text-white/40"><span className="text-emerald-500">[14:15:08]</span> <span className="text-white/80">JOB_STREAM:</span> Pulling layer 4/18 - Textures (2GB)</p>
            <p className="text-white/40"><span className="text-emerald-500">[14:15:10]</span> <span className="text-white/80">JOB_STREAM:</span> Layer 4 pull complete. Decompressing...</p>
            <p className="text-white/40"><span className="text-emerald-500">[14:15:12]</span> <span className="text-primary">CORE:</span> Running Scene Synthesis logic chain...</p>
            <p className="text-white/40 animate-pulse"><span className="text-emerald-500">[14:15:14]</span> <span className="text-white/60">_</span></p>
          </div>
        </div>
      </section>

      {/* Right Rail: Payload Inspector */}
      <section className="w-80 bg-surface-low border-l border-white/5 flex flex-col shrink-0">
        <div className="p-4 border-b border-white/5">
          <h3 className="text-sm font-semibold mb-1">Payload Inspector</h3>
          <p className="text-[0.65rem] text-white/40 font-mono">UUID: f47ac10b-58cc-4372</p>
        </div>
        
        <div className="flex-1 overflow-auto p-4 space-y-6 custom-scrollbar">
          <div>
            <span className="text-[0.6rem] font-mono uppercase text-primary mb-2 block tracking-widest">Input Parameters</span>
            <div className="bg-surface-lowest p-3 rounded-md border border-white/5 font-mono text-[0.7rem] leading-5 text-on-surface-variant overflow-x-auto custom-scrollbar">
              <span className="text-amber-300">{'{'}</span><br/>
              &nbsp;&nbsp;<span className="text-primary">"scene_id"</span>: <span className="text-white">"alpha_01"</span>,<br/>
              &nbsp;&nbsp;<span className="text-primary">"resolution"</span>: <span className="text-amber-500">[3840, 2160]</span>,<br/>
              &nbsp;&nbsp;<span className="text-primary">"diffusion_steps"</span>: <span className="text-amber-500">50</span>,<br/>
              &nbsp;&nbsp;<span className="text-primary">"scheduler"</span>: <span className="text-white">"DPMSolver++"</span>,<br/>
              &nbsp;&nbsp;<span className="text-primary">"prompt"</span>: <span className="text-white">"Cyberpunk forge..."</span><br/>
              <span className="text-amber-300">{'}'}</span>
            </div>
          </div>
          
          <div>
            <span className="text-[0.6rem] font-mono uppercase text-primary mb-2 block tracking-widest">Node Preview</span>
            <div className="aspect-square w-full rounded-md overflow-hidden bg-black/40 border border-white/10 group relative">
              <img 
                src="https://images.unsplash.com/photo-1614729939124-032f0b56c9ce?q=80&w=2574&auto=format&fit=crop" 
                alt="Node Preview" 
                className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
              />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="bg-surface-highest/80 backdrop-blur-md px-3 py-1.5 text-xs rounded border border-white/20 font-medium">
                  Expand Visual
                </button>
              </div>
            </div>
          </div>
          
          <div>
            <span className="text-[0.6rem] font-mono uppercase text-primary mb-2 block tracking-widest">Output Objects</span>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-[0.7rem] p-2.5 bg-surface-lowest border border-white/5 rounded">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-white/40">image</span>
                  <span className="font-mono">final_render.exr</span>
                </div>
                <span className="text-white/20 font-mono">42.4 MB</span>
              </div>
              <div className="flex items-center justify-between text-[0.7rem] p-2.5 bg-surface-lowest border border-white/5 rounded">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-xs text-white/40">description</span>
                  <span className="font-mono">metadata.json</span>
                </div>
                <span className="text-white/20 font-mono">12 KB</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="p-4 bg-surface-low border-t border-white/5">
          <button className="w-full bg-white/5 hover:bg-white/10 text-white text-xs py-2.5 rounded font-medium transition-colors border border-white/5">
            Download Node Payload
          </button>
        </div>
      </section>
    </div>
  );
}
