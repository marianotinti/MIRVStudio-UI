import { Bell, Cloud, Search } from "lucide-react";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-14 w-full flex items-center justify-between px-6 sticky top-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex items-center gap-6">
        <span className="font-mono text-xs font-bold text-primary tracking-widest uppercase">
          {title}
        </span>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <span className="text-white/60 hover:text-white cursor-pointer transition-opacity">Project Alpha</span>
          <span className="text-primary border-b border-primary py-4">Status: Rendering</span>
          <span className="text-white/60 hover:text-white cursor-pointer transition-opacity">Share</span>
        </nav>
      </div>
      
      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40 w-4 h-4" />
          <input 
            type="text" 
            placeholder="Search projects..." 
            className="bg-surface-low border-none rounded text-xs pl-9 pr-4 py-1.5 w-64 focus:ring-1 focus:ring-primary/50 text-on-surface outline-none"
          />
        </div>
        <div className="flex items-center gap-4 border-l border-white/10 pl-4">
          <button className="text-white/60 hover:text-white transition-opacity">
            <Bell className="w-5 h-5" />
          </button>
          <button className="text-primary hover:brightness-110 transition-all">
            <Cloud className="w-5 h-5" />
          </button>
          <button className="ml-2 bg-primary-container text-on-primary-container px-4 py-1.5 rounded-sm text-xs font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.1)] hover:opacity-90 transition-all active:scale-95">
            Export
          </button>
        </div>
      </div>
    </header>
  );
}
