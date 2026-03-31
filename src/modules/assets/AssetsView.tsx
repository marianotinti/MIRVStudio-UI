import { useState } from 'react';
import { 
  Search, 
  Filter, 
  MoreVertical, 
  Image as ImageIcon, 
  Video, 
  Music, 
  FileBox,
  Download,
  Trash2,
  CheckCircle2,
  XCircle,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

const ASSETS = [
  { id: '1', name: 'Cyberpunk_City_01.png', type: 'image', status: 'approved', size: '4.2 MB', date: '2 hours ago', url: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop' },
  { id: '2', name: 'Neon_Car_Chase.mp4', type: 'video', status: 'pending', size: '124 MB', date: '5 hours ago', url: 'https://images.unsplash.com/photo-1535295972055-1c762f4483e5?q=80&w=2574&auto=format&fit=crop' },
  { id: '3', name: 'Synthwave_Beat.wav', type: 'audio', status: 'approved', size: '12 MB', date: '1 day ago' },
  { id: '4', name: 'Character_Ref_V2.jpg', type: 'image', status: 'rejected', size: '2.1 MB', date: '2 days ago', url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop' },
  { id: '5', name: 'Background_Plate.png', type: 'image', status: 'approved', size: '8.5 MB', date: '3 days ago', url: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop' },
  { id: '6', name: 'Voiceover_Take1.mp3', type: 'audio', status: 'pending', size: '4.5 MB', date: '4 days ago' },
];

export function AssetsView() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>('1');

  const activeAsset = ASSETS.find(a => a.id === selectedAsset);

  return (
    <div className="flex-1 flex overflow-hidden bg-background">
      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 border-r border-white/5">
        {/* Toolbar */}
        <div className="h-14 border-b border-white/5 flex items-center justify-between px-6 shrink-0 bg-surface">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
              <input 
                type="text" 
                placeholder="Search assets..." 
                className="bg-surface-low border border-white/10 rounded-full pl-9 pr-4 py-1.5 text-sm focus:outline-none focus:border-primary/50 transition-colors w-64"
              />
            </div>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded bg-surface-low border border-white/10 text-sm hover:bg-surface-high transition-colors">
              <Filter className="w-4 h-4" /> Filters
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex bg-surface-low rounded border border-white/10 p-0.5">
              <button className="px-3 py-1 rounded-sm bg-surface-highest text-xs font-medium shadow">All</button>
              <button className="px-3 py-1 rounded-sm text-white/60 hover:text-white text-xs font-medium transition-colors">Images</button>
              <button className="px-3 py-1 rounded-sm text-white/60 hover:text-white text-xs font-medium transition-colors">Video</button>
              <button className="px-3 py-1 rounded-sm text-white/60 hover:text-white text-xs font-medium transition-colors">Audio</button>
            </div>
          </div>
        </div>

        {/* Asset Grid */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {ASSETS.map((asset) => (
              <div 
                key={asset.id}
                onClick={() => setSelectedAsset(asset.id)}
                className={cn(
                  "group rounded-xl border bg-surface-low overflow-hidden cursor-pointer transition-all",
                  selectedAsset === asset.id ? "border-primary ring-1 ring-primary" : "border-white/5 hover:border-white/20"
                )}
              >
                {/* Thumbnail */}
                <div className="aspect-video bg-surface-highest relative flex items-center justify-center overflow-hidden">
                  {asset.type === 'image' || asset.type === 'video' ? (
                    <img src={asset.url} alt={asset.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  ) : (
                    <Music className="w-8 h-8 text-white/20" />
                  )}
                  
                  {asset.type === 'video' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur flex items-center justify-center border border-white/10">
                        <div className="w-0 h-0 border-t-[5px] border-t-transparent border-l-[8px] border-l-white border-b-[5px] border-b-transparent ml-1"></div>
                      </div>
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-2 left-2">
                    {asset.status === 'approved' && <div className="bg-emerald-500/90 text-white text-[0.6rem] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> Approved</div>}
                    {asset.status === 'pending' && <div className="bg-amber-500/90 text-white text-[0.6rem] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1"><Clock className="w-3 h-3" /> Pending</div>}
                    {asset.status === 'rejected' && <div className="bg-red-500/90 text-white text-[0.6rem] font-bold uppercase px-1.5 py-0.5 rounded flex items-center gap-1"><XCircle className="w-3 h-3" /> Rejected</div>}
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h4 className="text-sm font-medium truncate" title={asset.name}>{asset.name}</h4>
                    <button className="text-white/40 hover:text-white shrink-0">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between text-xs text-white/40 font-mono">
                    <span>{asset.size}</span>
                    <span>{asset.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Right Sidebar: Asset Details */}
      {activeAsset ? (
        <aside className="w-80 bg-surface flex flex-col shrink-0 animate-in slide-in-from-right-8 duration-300">
          <div className="p-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-on-surface-variant">Asset Details</h3>
            <button onClick={() => setSelectedAsset(null)} className="text-white/40 hover:text-white">
              <XCircle className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar">
            {/* Preview */}
            <div className="aspect-square bg-surface-highest flex items-center justify-center relative overflow-hidden">
              {activeAsset.type === 'image' || activeAsset.type === 'video' ? (
                <img src={activeAsset.url} alt={activeAsset.name} className="w-full h-full object-contain" />
              ) : (
                <Music className="w-16 h-16 text-white/20" />
              )}
            </div>

            <div className="p-6 space-y-6">
              {/* Header Info */}
              <div>
                <h2 className="text-lg font-medium break-words leading-tight mb-2">{activeAsset.name}</h2>
                <div className="flex items-center gap-2 text-xs font-mono text-white/40">
                  <span className="uppercase">{activeAsset.type}</span>
                  <span>•</span>
                  <span>{activeAsset.size}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="grid grid-cols-2 gap-2">
                <button className="flex items-center justify-center gap-2 py-2 bg-primary text-on-primary-container rounded text-xs font-bold hover:brightness-110 transition-colors">
                  <Download className="w-4 h-4" /> Download
                </button>
                <button className="flex items-center justify-center gap-2 py-2 border border-white/10 rounded text-xs font-bold hover:bg-white/5 transition-colors text-red-400 hover:text-red-300 hover:border-red-400/30">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>

              {/* Metadata */}
              <div>
                <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-3">Metadata</div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">ID</span>
                    <span className="font-mono text-xs">AST-{activeAsset.id.padStart(4, '0')}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Uploaded</span>
                    <span>{activeAsset.date}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Resolution</span>
                    <span className="font-mono text-xs">1920x1080</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-white/5">
                    <span className="text-white/40">Color Space</span>
                    <span className="font-mono text-xs">sRGB</span>
                  </div>
                </div>
              </div>

              {/* Lineage */}
              <div>
                <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-3">Lineage</div>
                <div className="p-3 bg-surface-low rounded border border-white/5">
                  <div className="flex items-center gap-2 text-xs mb-2">
                    <FileBox className="w-3.5 h-3.5 text-white/40" />
                    <span className="text-white/60">Generated from Job:</span>
                  </div>
                  <div className="font-mono text-xs text-primary hover:underline cursor-pointer">JOB-992-RENDER</div>
                </div>
              </div>

            </div>
          </div>
        </aside>
      ) : (
        <aside className="w-80 bg-surface flex flex-col shrink-0 items-center justify-center text-center p-8 border-l border-white/5">
          <FileBox className="w-12 h-12 text-white/10 mb-4" />
          <h3 className="text-sm font-medium text-white/60 mb-1">No Asset Selected</h3>
          <p className="text-xs text-white/40">Select an asset from the grid to view its details, metadata, and lineage.</p>
        </aside>
      )}
    </div>
  );
}
