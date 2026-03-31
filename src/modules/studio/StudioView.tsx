import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Volume2, 
  Maximize, 
  Settings, 
  Scissors, 
  Copy, 
  Trash2, 
  Layers, 
  Music, 
  Video, 
  Type, 
  Download,
  ListVideo
} from "lucide-react";
import { cn } from "@/lib/utils";

export function StudioView() {
  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-background">
      {/* Top Section: Media Pool & Player */}
      <div className="flex-1 flex min-h-0 border-b border-white/5">
        
        {/* Left: Media Pool */}
        <aside className="w-64 bg-surface border-r border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant flex items-center gap-2">
              <ListVideo className="w-4 h-4" />
              Media Pool
            </h3>
          </div>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 custom-scrollbar">
            {/* Media Item */}
            <div className="flex gap-2 p-2 rounded bg-surface-low hover:bg-surface-high cursor-pointer transition-colors border border-transparent hover:border-white/10">
              <img src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop" alt="thumb" className="w-16 h-10 object-cover rounded bg-black" />
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate font-medium">SCENE_01_RENDER_v3.mp4</div>
                <div className="text-[0.6rem] text-white/40 font-mono">00:00:04:12 • 1080p</div>
              </div>
            </div>
            {/* Media Item */}
            <div className="flex gap-2 p-2 rounded bg-surface-low hover:bg-surface-high cursor-pointer transition-colors border border-transparent hover:border-white/10">
              <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop" alt="thumb" className="w-16 h-10 object-cover rounded bg-black" />
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate font-medium">ESTABLISHING_SHOT.mp4</div>
                <div className="text-[0.6rem] text-white/40 font-mono">00:00:02:00 • 4K</div>
              </div>
            </div>
            {/* Media Item (Audio) */}
            <div className="flex gap-2 p-2 rounded bg-surface-low hover:bg-surface-high cursor-pointer transition-colors border border-transparent hover:border-white/10">
              <div className="w-16 h-10 rounded bg-surface-highest flex items-center justify-center">
                <Music className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs truncate font-medium">CYBER_DRUM_LOOP.wav</div>
                <div className="text-[0.6rem] text-white/40 font-mono">00:01:30:00 • 48kHz</div>
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Player */}
        <main className="flex-1 flex flex-col bg-surface-lowest relative">
          {/* Video Area */}
          <div className="flex-1 flex items-center justify-center p-8">
            <div className="w-full max-w-4xl aspect-video bg-black rounded-lg shadow-2xl border border-white/10 relative overflow-hidden group">
              <img src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop" alt="Preview" className="w-full h-full object-cover" />
              
              {/* Playback Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                <button className="w-16 h-16 rounded-full bg-primary/90 text-on-primary-container flex items-center justify-center hover:scale-105 transition-transform shadow-xl">
                  <Play className="w-8 h-8 ml-1" />
                </button>
              </div>
              
              {/* Safe Margins */}
              <div className="absolute inset-[5%] border border-white/20 border-dashed pointer-events-none opacity-30"></div>
            </div>
          </div>

          {/* Player Controls */}
          <div className="h-14 bg-surface border-t border-white/5 flex items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded">00:00:02:14</span>
              <span className="font-mono text-[0.65rem] text-white/40">/ 00:00:15:00</span>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <SkipBack className="w-4 h-4" />
              </button>
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <Play className="w-5 h-5" />
              </button>
              <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <SkipForward className="w-4 h-4" />
              </button>
            </div>
            
            <div className="flex items-center gap-3">
              <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <Settings className="w-4 h-4" />
              </button>
              <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </main>

        {/* Right: Inspector */}
        <aside className="w-72 bg-surface border-l border-white/5 flex flex-col">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Properties</h3>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
            
            {/* Transform */}
            <div>
              <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-3">Transform</div>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2 items-center">
                  <span className="text-xs text-white/60">Scale</span>
                  <input type="range" className="col-span-2 accent-primary" defaultValue="100" />
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <span className="text-xs text-white/60">Position X</span>
                  <input type="number" className="col-span-2 bg-surface-highest border border-white/10 rounded px-2 py-1 text-xs font-mono" defaultValue="0" />
                </div>
                <div className="grid grid-cols-3 gap-2 items-center">
                  <span className="text-xs text-white/60">Position Y</span>
                  <input type="number" className="col-span-2 bg-surface-highest border border-white/10 rounded px-2 py-1 text-xs font-mono" defaultValue="0" />
                </div>
              </div>
            </div>

            {/* AI Effects */}
            <div>
              <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-3">AI Processing</div>
              <div className="space-y-2">
                <label className="flex items-center justify-between p-2 bg-surface-low rounded border border-white/5 cursor-pointer hover:border-primary/30 transition-colors">
                  <span className="text-xs">Upscale (4K)</span>
                  <input type="checkbox" className="accent-primary" defaultChecked />
                </label>
                <label className="flex items-center justify-between p-2 bg-surface-low rounded border border-white/5 cursor-pointer hover:border-primary/30 transition-colors">
                  <span className="text-xs">Frame Interpolation</span>
                  <input type="checkbox" className="accent-primary" />
                </label>
                <label className="flex items-center justify-between p-2 bg-surface-low rounded border border-white/5 cursor-pointer hover:border-primary/30 transition-colors">
                  <span className="text-xs">Color Match</span>
                  <input type="checkbox" className="accent-primary" defaultChecked />
                </label>
              </div>
            </div>

            <button className="w-full py-2 bg-primary text-on-primary-container rounded text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/20">
              <Download className="w-4 h-4" />
              Export Render
            </button>

          </div>
        </aside>
      </div>

      {/* Bottom Section: Timeline */}
      <div className="h-64 bg-surface-low flex flex-col shrink-0">
        {/* Timeline Toolbar */}
        <div className="h-10 bg-surface border-b border-white/5 flex items-center px-4 gap-2">
          <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Scissors className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Copy className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Trash2 className="w-4 h-4" />
          </button>
          <div className="w-px h-4 bg-white/10 mx-2"></div>
          <button className="p-1.5 text-white/60 hover:text-white hover:bg-white/5 rounded transition-colors">
            <Layers className="w-4 h-4" />
          </button>
        </div>
        
        {/* Timeline Tracks Area */}
        <div className="flex-1 flex overflow-hidden relative">
          
          {/* Track Headers */}
          <div className="w-32 bg-surface border-r border-white/5 shrink-0 flex flex-col">
            <div className="h-12 border-b border-white/5 flex items-center px-2 gap-2 text-white/40">
              <Video className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-mono uppercase">V2</span>
            </div>
            <div className="h-12 border-b border-white/5 flex items-center px-2 gap-2 text-white/80 bg-white/5">
              <Video className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-mono uppercase">V1</span>
            </div>
            <div className="h-12 border-b border-white/5 flex items-center px-2 gap-2 text-white/40">
              <Type className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-mono uppercase">T1</span>
            </div>
            <div className="h-12 border-b border-white/5 flex items-center px-2 gap-2 text-white/40">
              <Music className="w-3.5 h-3.5" />
              <span className="text-[0.65rem] font-mono uppercase">A1</span>
            </div>
          </div>

          {/* Tracks */}
          <div className="flex-1 relative overflow-x-auto overflow-y-hidden custom-scrollbar bg-surface-lowest">
            {/* Time Ruler */}
            <div className="h-6 border-b border-white/5 flex items-end px-4 text-[0.5rem] font-mono text-white/30 tracking-widest sticky top-0 bg-surface-lowest z-10">
              <div className="w-24 border-l border-white/10 pl-1">00:00:00:00</div>
              <div className="w-24 border-l border-white/10 pl-1">00:00:05:00</div>
              <div className="w-24 border-l border-white/10 pl-1">00:00:10:00</div>
              <div className="w-24 border-l border-white/10 pl-1">00:00:15:00</div>
            </div>

            {/* Playhead */}
            <div className="absolute top-0 bottom-0 left-[120px] w-px bg-primary z-20 pointer-events-none">
              <div className="w-3 h-3 bg-primary absolute -top-1.5 -left-1.5 rotate-45"></div>
            </div>

            {/* Track Content */}
            <div className="relative h-12 border-b border-white/5">
              {/* Empty V2 */}
            </div>
            <div className="relative h-12 border-b border-white/5 bg-white/5">
              {/* Clip on V1 */}
              <div className="absolute top-1 bottom-1 left-4 w-32 bg-blue-500/20 border border-blue-500/50 rounded-sm flex items-center px-2 overflow-hidden cursor-pointer hover:bg-blue-500/30">
                <span className="text-[0.6rem] font-mono truncate">ESTABLISHING_SHOT</span>
              </div>
              <div className="absolute top-1 bottom-1 left-[140px] w-48 bg-primary/20 border border-primary/50 rounded-sm flex items-center px-2 overflow-hidden cursor-pointer hover:bg-primary/30 ring-1 ring-primary">
                <span className="text-[0.6rem] font-mono truncate text-primary">SCENE_01_RENDER_v3</span>
              </div>
            </div>
            <div className="relative h-12 border-b border-white/5">
              {/* Empty T1 */}
            </div>
            <div className="relative h-12 border-b border-white/5">
              {/* Audio Clip on A1 */}
              <div className="absolute top-1 bottom-1 left-4 w-80 bg-emerald-500/20 border border-emerald-500/50 rounded-sm flex items-center px-2 overflow-hidden cursor-pointer hover:bg-emerald-500/30">
                <span className="text-[0.6rem] font-mono truncate text-emerald-400">CYBER_DRUM_LOOP</span>
                {/* Fake waveform */}
                <div className="absolute inset-0 opacity-20 flex items-center justify-between px-1 pointer-events-none">
                  {[...Array(40)].map((_, i) => (
                    <div key={i} className="w-0.5 bg-emerald-400" style={{ height: `${Math.random() * 80 + 20}%` }}></div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
