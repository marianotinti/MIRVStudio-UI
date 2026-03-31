import { Filter, Plus, ChevronLeft, ChevronRight, Download, Image as ImageIcon, Video } from "lucide-react";
import { cn } from "@/lib/utils";

const projects = [
  {
    id: "#MV-092",
    title: "Summer Campaign '24",
    meta: "12 Scenes • 4K HDR",
    client: "Mercado Libre",
    clientInitial: "M",
    clientColor: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    status: "Done",
    statusColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    dotColor: "bg-emerald-400",
    progress: 100,
    progressText: "12/12",
    progressColor: "bg-emerald-500",
    date: "12.08.2023"
  },
  {
    id: "#MV-104",
    title: "In-Flight Experience",
    meta: "48 Scenes • Dynamic 1080p",
    client: "LATAM Airlines",
    clientInitial: "L",
    clientColor: "bg-primary/20 text-primary border-primary/30",
    status: "Rendering",
    statusColor: "bg-primary/10 text-primary border-primary/20",
    dotColor: "bg-primary",
    progress: 64,
    progressText: "31/48",
    progressColor: "bg-primary",
    date: "24.08.2023"
  },
  {
    id: "#MV-112",
    title: "Brand Identity Void",
    meta: "8 Scenes • Raw V-Ray",
    client: "Nike Global",
    clientInitial: "N",
    clientColor: "bg-red-500/20 text-red-400 border-red-500/30",
    status: "Failed",
    statusColor: "bg-red-500/10 text-red-400 border-red-500/20",
    dotColor: "bg-red-400",
    progress: 12,
    progressText: "1/8",
    progressColor: "bg-red-500",
    date: "26.08.2023"
  },
  {
    id: "#MV-115",
    title: "Product Macro Reveal",
    meta: "5 Scenes • 8K Textures",
    client: "Apple Inc.",
    clientInitial: "A",
    clientColor: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    status: "Queued",
    statusColor: "bg-white/5 text-white/60 border-white/10",
    dotColor: "bg-white/20",
    progress: 0,
    progressText: "0/5",
    progressColor: "bg-white/10",
    date: "Yesterday"
  }
];

export function ProjectsView() {
  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
      {/* Header Section */}
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Production Pipeline</h2>
          <p className="text-sm text-on-surface-variant font-medium mt-1">Managing 24 active AI production environments</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-surface rounded-lg p-1 border border-white/5">
            <button className="px-3 py-1.5 text-xs font-semibold bg-surface-highest rounded text-on-surface shadow-sm">Grid</button>
            <button className="px-3 py-1.5 text-xs font-semibold text-white/40 hover:text-white transition-colors">Table</button>
          </div>
          <button className="flex items-center gap-2 bg-primary text-on-primary-container px-4 py-2 rounded font-bold text-sm shadow-lg shadow-primary/10 hover:brightness-110 transition-all active:scale-95">
            <Plus className="w-4 h-4" />
            New Project
          </button>
        </div>
      </div>

      {/* Dashboard Layout */}
      <div className="grid grid-cols-12 gap-6">
        {/* Main Data Table Container */}
        <div className="col-span-12 lg:col-span-9 space-y-4">
          {/* Filters Row */}
          <div className="flex items-center gap-3 pb-2 overflow-x-auto no-scrollbar">
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-high rounded border border-white/5 text-xs text-on-surface font-medium whitespace-nowrap hover:bg-surface-highest transition-colors">
              <Filter className="w-3.5 h-3.5" />
              All Clients
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-high rounded border border-white/5 text-xs text-on-surface font-medium whitespace-nowrap hover:bg-surface-highest transition-colors">
              Status: Active
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 bg-surface-high rounded border border-white/5 text-xs text-on-surface font-medium whitespace-nowrap hover:bg-surface-highest transition-colors">
              Sort: Newest
            </button>
            <div className="ml-auto flex items-center gap-4 text-[10px] font-mono text-white/40 uppercase tracking-widest">
              <span>24 Projects Found</span>
              <span>Last Updated 2m ago</span>
            </div>
          </div>

          {/* High Density Table */}
          <div className="bg-surface-low rounded border border-white/5 overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface text-[10px] font-mono text-white/40 uppercase tracking-widest border-b border-white/5">
                  <th className="px-4 py-3 font-medium">ID</th>
                  <th className="px-4 py-3 font-medium">Project Title</th>
                  <th className="px-4 py-3 font-medium">Client / Profile</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium">Jobs / Progress</th>
                  <th className="px-4 py-3 font-medium text-right">Created</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-white/5">
                {projects.map((project) => (
                  <tr key={project.id} className="hover:bg-surface transition-colors group cursor-pointer">
                    <td className="px-4 py-4 font-mono text-xs text-white/30">{project.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex flex-col">
                        <span className="font-semibold text-on-surface">{project.title}</span>
                        <span className="text-[10px] text-white/40 mt-0.5">{project.meta}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className={cn("w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold border", project.clientColor)}>
                          {project.clientInitial}
                        </div>
                        <span className="text-xs">{project.client}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={cn("inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", project.statusColor)}>
                        <span className={cn("w-1.5 h-1.5 rounded-full", project.dotColor, project.status === 'Rendering' || project.status === 'Done' ? 'animate-pulse' : '')}></span>
                        {project.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="w-32">
                        <div className="flex justify-between text-[10px] mb-1 font-mono">
                          <span>{project.progress}%</span>
                          <span className="text-white/40">{project.progressText}</span>
                        </div>
                        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                          <div className={cn("h-full", project.progressColor)} style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-right text-xs text-white/40 font-mono">{project.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {/* Pagination */}
            <div className="p-4 flex items-center justify-between bg-surface/30 border-t border-white/5">
              <span className="text-xs text-white/40">Showing 1-4 of 24 projects</span>
              <div className="flex items-center gap-2">
                <button className="p-1 text-white/40 hover:text-white transition-opacity"><ChevronLeft className="w-4 h-4" /></button>
                <span className="px-3 py-1 bg-surface-highest text-[10px] font-bold rounded">1</span>
                <button className="p-1 text-white/40 hover:text-white transition-opacity"><ChevronRight className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        </div>

        {/* Side Widget Column */}
        <div className="col-span-12 lg:col-span-3 space-y-6">
          {/* Recent Outputs Card */}
          <div className="bg-surface-high rounded border border-white/5 overflow-hidden flex flex-col h-fit">
            <div className="p-4 border-b border-white/5 flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-primary">Recent Outputs</h3>
            </div>
            <div className="p-3 space-y-3">
              <div className="relative group cursor-pointer overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" 
                  alt="Recent output" 
                  className="w-full h-24 object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-[10px] font-bold text-white uppercase tracking-tight">View Render</span>
                </div>
                <div className="absolute top-2 right-2 flex gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                </div>
              </div>
              
              <div className="flex items-center justify-between px-1">
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-on-surface">shot_02_v04.mp4</span>
                  <span className="text-[9px] text-white/40 mt-0.5">Project Alpha • 4s ago</span>
                </div>
                <button className="text-white/40 hover:text-white transition-opacity">
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="pt-2 border-t border-white/5 space-y-2">
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors group cursor-pointer">
                  <div className="w-8 h-8 rounded bg-surface-highest border border-white/5 flex items-center justify-center text-white/40">
                    <ImageIcon className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-medium text-on-surface truncate">poster_main_alt.png</span>
                    <span className="text-[8px] text-white/40 uppercase font-mono mt-0.5">Asset Uploaded</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-2 hover:bg-white/5 rounded transition-colors group cursor-pointer">
                  <div className="w-8 h-8 rounded bg-surface-highest border border-white/5 flex items-center justify-center text-white/40">
                    <Video className="w-4 h-4" />
                  </div>
                  <div className="flex flex-col flex-1 overflow-hidden">
                    <span className="text-[10px] font-medium text-on-surface truncate">color_grade_lut_01</span>
                    <span className="text-[8px] text-white/40 uppercase font-mono mt-0.5">Update Applied</span>
                  </div>
                </div>
              </div>
            </div>
            <button className="w-full py-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40 hover:text-primary transition-colors border-t border-white/5 bg-white/[0.02]">
              Browse Media Store
            </button>
          </div>

          {/* System Health Widget */}
          <div className="bg-surface-low rounded p-4 border border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Engine Status</h3>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-emerald-400">98%</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-medium uppercase tracking-tighter">
                  <span>GPU Load</span>
                  <span className="text-white/40">RTX 4090 x4</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[72%]"></div>
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] font-medium uppercase tracking-tighter">
                  <span>Cache Usage</span>
                  <span className="text-white/40">1.2 TB / 4 TB</span>
                </div>
                <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-white/20 w-[30%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
