import { 
  FolderOpen, 
  PlusSquare, 
  LayoutDashboard, 
  GitMerge, 
  Film, 
  Box, 
  CheckSquare, 
  Settings 
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  currentView: string;
  setView: (view: string) => void;
}

const navItems = [
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'create', label: 'Create', icon: PlusSquare },
  { id: 'board', label: 'Board', icon: LayoutDashboard },
  { id: 'pipeline', label: 'Pipeline', icon: GitMerge },
  { id: 'studio', label: 'Studio', icon: Film },
  { id: 'assets', label: 'Assets', icon: Box },
  { id: 'qa', label: 'QA', icon: CheckSquare },
];

export function Sidebar({ currentView, setView }: SidebarProps) {
  return (
    <aside className="h-screen w-64 border-r border-white/5 bg-background flex flex-col py-6 px-4 shrink-0 z-50">
      <div className="mb-8 px-2">
        <h1 className="font-mono font-bold text-primary tracking-tighter text-xl">MIRV OS</h1>
        <p className="text-[0.6875rem] font-mono text-white/40 uppercase tracking-widest mt-1">v1.0.4-stable</p>
      </div>
      
      <nav className="flex-1 space-y-1 overflow-y-auto no-scrollbar">
        {navItems.map((item) => {
          const isActive = currentView === item.id;
          const Icon = item.icon;
          
          return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer text-sm tracking-tight",
                isActive 
                  ? "text-primary bg-primary-container/10 font-semibold border-l-2 border-primary" 
                  : "text-[#A1A1AA] hover:text-primary hover:bg-surface-low border-l-2 border-transparent"
              )}
            >
              <Icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5 flex flex-col gap-4">
        <button
          onClick={() => setView('settings')}
          className={cn(
            "w-full flex items-center gap-3 px-3 py-2 transition-colors cursor-pointer text-sm tracking-tight",
            currentView === 'settings'
              ? "text-primary bg-primary-container/10 font-semibold border-l-2 border-primary" 
              : "text-[#A1A1AA] hover:text-primary hover:bg-surface-low border-l-2 border-transparent"
          )}
        >
          <Settings className="w-5 h-5" strokeWidth={currentView === 'settings' ? 2.5 : 2} />
          <span>Settings</span>
        </button>

        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-surface-highest flex items-center justify-center text-primary overflow-hidden border border-white/10">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix&backgroundColor=131314" 
              alt="User Profile" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-xs font-semibold text-white">System Admin</span>
            <span className="text-[0.6rem] text-white/40 font-mono">OPERATOR_ID: 992-X</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
