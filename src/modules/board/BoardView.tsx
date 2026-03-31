import { 
  GripVertical as DragIndicator, 
  Plus as Add, 
  Pin as PushPin, 
  Pipette as Colorize, 
  MousePointer2 as NearMe, 
  Hand as PanTool, 
  ZoomIn, 
  Image as ImageIcon, 
  PenTool, 
  StickyNote, 
  Zap, 
  Info, 
  Layers as AutoAwesomeMotion, 
  Link as LinkIcon, 
  ExternalLink 
} from "lucide-react";
import { cn } from "@/lib/utils";

export function BoardView() {
  return (
    <div className="flex-1 flex relative overflow-hidden bg-surface-lowest">
      {/* Infinite Canvas Area */}
      <main className="flex-1 relative overflow-hidden" style={{
        backgroundImage: 'radial-gradient(circle, #353436 1px, transparent 1px)',
        backgroundSize: '32px 32px'
      }}>
        
        {/* Canvas Object: Scene Group */}
        <div className="absolute top-[10%] left-[5%] w-[600px] h-[450px] border-2 border-primary/20 rounded-lg p-4 bg-primary/5 group cursor-move">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <span className="bg-primary text-on-primary-container text-[0.6rem] px-1.5 py-0.5 font-mono font-bold rounded">SCENE_01</span>
              <span className="text-xs font-medium text-primary">Cyber-Industrial District</span>
            </div>
            <DragIndicator className="w-4 h-4 text-primary/40" />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            {/* Ref Image 1 */}
            <div className="relative rounded-md overflow-hidden border border-primary/40 ring-2 ring-primary ring-offset-2 ring-offset-surface-lowest">
              <img 
                src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop" 
                alt="Ref 1" 
                className="w-full h-32 object-cover opacity-80"
              />
              <div className="absolute bottom-1 right-1 px-1 bg-surface-highest/80 backdrop-blur rounded text-[0.5rem] font-mono">REF_STR_04</div>
            </div>
            
            {/* Ref Image 2 */}
            <div className="relative rounded-md overflow-hidden border border-white/10 hover:border-primary/40 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop" 
                alt="Ref 2" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-1 right-1 px-1 bg-surface-highest/80 backdrop-blur rounded text-[0.5rem] font-mono">REF_TECH_12</div>
            </div>
            
            {/* Ref Image 3 */}
            <div className="relative rounded-md overflow-hidden border border-white/10 hover:border-primary/40 transition-colors">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop" 
                alt="Ref 3" 
                className="w-full h-32 object-cover"
              />
              <div className="absolute bottom-1 right-1 px-1 bg-surface-highest/80 backdrop-blur rounded text-[0.5rem] font-mono">REF_PAT_09</div>
            </div>
            
            <div className="flex items-center justify-center border-2 border-dashed border-white/10 rounded-md hover:bg-white/5 transition-colors cursor-pointer group/add">
              <Add className="w-6 h-6 text-white/20 group-hover/add:text-primary transition-colors" />
            </div>
          </div>
        </div>

        {/* Canvas Object: Isolated Character Ref */}
        <div className="absolute top-[40%] left-[55%] w-[240px] border border-white/20 rounded bg-surface p-2 shadow-2xl rotate-3 hover:rotate-0 transition-transform cursor-pointer">
          <img 
            src="https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop" 
            alt="Character" 
            className="w-full rounded h-64 object-cover mb-2"
          />
          <div className="flex justify-between items-center px-1">
            <span className="text-[0.6875rem] font-mono text-on-surface-variant">CHAR_MODEL_V2</span>
            <PushPin className="w-3.5 h-3.5 text-primary fill-primary" />
          </div>
        </div>

        {/* Canvas Object: Palette Frame */}
        <div className="absolute bottom-[15%] left-[10%] p-4 glass-panel border border-white/5 rounded-xl shadow-xl">
          <div className="text-[0.6rem] font-mono uppercase tracking-[0.2em] mb-3 text-white/40">Active Color Profile</div>
          <div className="flex gap-2">
            <div className="w-10 h-10 bg-[#0E0E0F] rounded-sm border border-white/10"></div>
            <div className="w-10 h-10 bg-[#6366F1] rounded-sm border border-white/10"></div>
            <div className="w-10 h-10 bg-[#C0C1FF] rounded-sm border border-white/10"></div>
            <div className="w-10 h-10 bg-[#353436] rounded-sm border border-white/10"></div>
            <div className="w-10 h-10 flex items-center justify-center border border-dashed border-white/20 rounded-sm cursor-pointer hover:bg-white/5">
              <Colorize className="w-4 h-4 text-white/20" />
            </div>
          </div>
        </div>

        {/* Floating Toolbar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 glass-panel rounded-full px-4 py-2 border border-white/10 shadow-2xl flex items-center gap-4 z-50">
          <div className="flex items-center border-r border-white/10 pr-4 gap-1">
            <button className="p-2 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-primary">
              <NearMe className="w-5 h-5" />
            </button>
            <button className="p-2 rounded hover:bg-white/10 transition-colors text-white/60 hover:text-primary">
              <PanTool className="w-5 h-5" />
            </button>
            <button className="p-2 rounded bg-primary/20 text-primary">
              <ZoomIn className="w-5 h-5" />
            </button>
          </div>
          <div className="flex items-center gap-1">
            <button className="p-2 rounded hover:bg-white/10 transition-colors text-white/60">
              <ImageIcon className="w-5 h-5" />
            </button>
            <button className="p-2 rounded hover:bg-white/10 transition-colors text-white/60">
              <PenTool className="w-5 h-5" />
            </button>
            <button className="p-2 rounded hover:bg-white/10 transition-colors text-white/60">
              <StickyNote className="w-5 h-5" />
            </button>
          </div>
          <button className="ml-2 bg-primary text-on-primary-container px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20">
            <Zap className="w-4 h-4 fill-on-primary-container" />
            Launch Generation
          </button>
        </div>

        {/* Canvas Coordinates Display */}
        <div className="absolute bottom-6 left-6 font-mono text-[0.6rem] text-white/30 tracking-widest flex gap-4 pointer-events-none">
          <span>X: 1,402.55</span>
          <span>Y: -892.10</span>
          <span>ZOOM: 0.85x</span>
        </div>
      </main>

      {/* Right Inspector Panel */}
      <aside className="w-80 bg-surface border-l border-white/5 p-6 flex flex-col z-30 shrink-0">
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-widest text-on-surface-variant">Inspector</h3>
          <Info className="w-4 h-4 text-white/20" />
        </div>
        
        <div className="space-y-8 flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {/* Selected Object Info */}
          <section>
            <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-4">Selected Entity</div>
            <div className="bg-surface-low rounded-lg p-4 border border-white/5 mb-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded bg-surface-highest flex items-center justify-center">
                  <AutoAwesomeMotion className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <div className="text-sm font-medium">Scene_Group_01</div>
                  <div className="text-[0.6rem] font-mono text-white/40">ID: MIRV-SG-993</div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-4">
                <div className="p-2 rounded bg-surface-lowest border border-white/5">
                  <div className="text-[0.5rem] text-white/40 uppercase">Assets</div>
                  <div className="text-xs font-mono">03 Units</div>
                </div>
                <div className="p-2 rounded bg-surface-lowest border border-white/5">
                  <div className="text-[0.5rem] text-white/40 uppercase">Weight</div>
                  <div className="text-xs font-mono">1.2 GB</div>
                </div>
              </div>
            </div>
          </section>

          {/* Metadata/Tags */}
          <section>
            <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-4">Metadata Tags</div>
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 bg-surface-highest rounded text-[0.65rem] text-on-surface-variant border border-white/5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary"></span> industrial
              </span>
              <span className="px-2 py-1 bg-surface-highest rounded text-[0.65rem] text-on-surface-variant border border-white/5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary"></span> neon-noir
              </span>
              <span className="px-2 py-1 bg-surface-highest rounded text-[0.65rem] text-on-surface-variant border border-white/5 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary"></span> heavy-rain
              </span>
              <button className="px-2 py-1 bg-primary/10 rounded text-[0.65rem] text-primary border border-primary/20 hover:bg-primary/20 transition-colors">
                + add tag
              </button>
            </div>
          </section>

          {/* Scene Links */}
          <section>
            <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-4">Linked Pipelines</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-3 bg-surface-low rounded group hover:bg-surface-high transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-white/40" />
                  <span className="text-xs">3D Blockout v1</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-primary" />
              </div>
              <div className="flex items-center justify-between p-3 bg-surface-low rounded group hover:bg-surface-high transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <LinkIcon className="w-4 h-4 text-white/40" />
                  <span className="text-xs">Lighting Rig A</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-primary" />
              </div>
            </div>
          </section>
        </div>

        <div className="mt-auto pt-6 border-t border-white/5">
          <button className="w-full py-2 bg-surface-highest text-white rounded text-xs font-semibold hover:bg-surface-high transition-colors border border-white/5 mb-2">Delete Selection</button>
          <button className="w-full py-2 border border-primary/30 text-primary rounded text-xs font-semibold hover:bg-primary/10 transition-colors">Lock Layers</button>
        </div>
      </aside>
    </div>
  );
}
