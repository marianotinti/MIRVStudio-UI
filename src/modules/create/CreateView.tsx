import { 
  FileText, 
  Globe, 
  Image as ImageIcon, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft,
  UploadCloud,
  Settings2,
  Info,
  Zap,
  Trash2
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCreateProjectStore } from '@/stores/create-project-store';

const STEPS = [
  { id: 'brief', title: 'Brief & Format', icon: FileText },
  { id: 'profile', title: 'Profile & Geo', icon: Globe },
  { id: 'references', title: 'References', icon: ImageIcon },
  { id: 'review', title: 'Review & Launch', icon: CheckCircle2 },
];

export function CreateView() {
  const currentStep = useCreateProjectStore((state) => state.currentStep);
  const nextStep = useCreateProjectStore((state) => state.nextStep);
  const prevStep = useCreateProjectStore((state) => state.previousStep);

  const handleNextStep = () => nextStep(STEPS.length);

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Wizard Header */}
      <div className="h-20 border-b border-white/5 flex items-center justify-center px-8 shrink-0 bg-surface">
        <div className="flex items-center w-full max-w-3xl">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;

            return (
              <div key={step.id} className="flex items-center flex-1 last:flex-none">
                <div className={cn(
                  "flex flex-col items-center gap-2 relative z-10",
                  isActive ? "text-primary" : isCompleted ? "text-primary/60" : "text-white/20"
                )}>
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center border-2 transition-colors",
                    isActive ? "border-primary bg-primary/10" : 
                    isCompleted ? "border-primary/60 bg-primary/5" : "border-white/10 bg-surface-highest"
                  )}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[0.65rem] font-mono uppercase tracking-widest absolute -bottom-6 whitespace-nowrap">
                    {step.title}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className={cn(
                    "h-0.5 flex-1 mx-4 transition-colors",
                    isCompleted ? "bg-primary/40" : "bg-white/5"
                  )} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Wizard Content */}
      <div className="flex-1 overflow-y-auto p-8 flex justify-center custom-scrollbar">
        <div className="w-full max-w-2xl">
          
          {/* Step 1: Brief */}
          {currentStep === 0 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Project Brief</h2>
                <p className="text-sm text-white/40">Define the core objective and format for this generation.</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2">Project Name</label>
                  <input 
                    type="text" 
                    className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors"
                    placeholder="e.g., Cyberpunk Cityscape V2"
                    defaultValue="Neon Nights Promo"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-2">Creative Prompt</label>
                  <textarea 
                    className="w-full h-32 bg-surface-low border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none custom-scrollbar"
                    placeholder="Describe the scene, mood, and action..."
                    defaultValue="A high-speed chase through a neon-lit cyberpunk city. Heavy rain, reflections on the wet asphalt. The pursuing vehicle is a sleek, black hover-car."
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">Target Format</label>
                    <select className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                      <option>16:9 (Landscape)</option>
                      <option>9:16 (Portrait)</option>
                      <option>1:1 (Square)</option>
                      <option>21:9 (Cinematic)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-mono uppercase text-white/60 mb-2">Duration</label>
                    <select className="w-full bg-surface-low border border-white/10 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none">
                      <option>15 Seconds</option>
                      <option>30 Seconds</option>
                      <option>60 Seconds</option>
                      <option>Custom</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Profile & Geo */}
          {currentStep === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Profile & Geo Rules</h2>
                <p className="text-sm text-white/40">Select the brand profile and regional constraints.</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-3">Brand Profile</label>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-4 rounded-lg border border-primary bg-primary/5 cursor-pointer flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-primary flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                      </div>
                      <div>
                        <div className="text-sm font-medium text-primary">Tech Startup (Default)</div>
                        <div className="text-xs text-white/40 mt-1">Modern, clean, vibrant colors.</div>
                      </div>
                    </div>
                    <div className="p-4 rounded-lg border border-white/10 bg-surface-low hover:border-white/20 cursor-pointer transition-colors flex items-start gap-3">
                      <div className="w-4 h-4 rounded-full border-2 border-white/20 mt-0.5"></div>
                      <div>
                        <div className="text-sm font-medium">Luxury Brand</div>
                        <div className="text-xs text-white/40 mt-1">Minimalist, monochrome, elegant.</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase text-white/60 mb-3">Geo Constraints</label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 rounded bg-surface-low border border-white/5 cursor-pointer hover:bg-surface-high transition-colors">
                      <input type="checkbox" className="accent-primary" defaultChecked />
                      <span className="text-sm">Exclude specific cultural symbols (Global Safe)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded bg-surface-low border border-white/5 cursor-pointer hover:bg-surface-high transition-colors">
                      <input type="checkbox" className="accent-primary" />
                      <span className="text-sm">Enforce left-hand drive vehicles (UK/AU/JP)</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 rounded bg-surface-low border border-white/5 cursor-pointer hover:bg-surface-high transition-colors">
                      <input type="checkbox" className="accent-primary" defaultChecked />
                      <span className="text-sm">Use metric system in visual text</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: References */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Reference Material</h2>
                <p className="text-sm text-white/40">Upload images or videos to guide the AI generation.</p>
              </div>

              <div className="border-2 border-dashed border-white/10 rounded-xl p-12 flex flex-col items-center justify-center text-center hover:bg-white/5 hover:border-primary/30 transition-colors cursor-pointer group">
                <div className="w-16 h-16 rounded-full bg-surface-highest flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="w-8 h-8 text-white/40 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-sm font-medium mb-1">Drag & Drop Assets</h3>
                <p className="text-xs text-white/40 mb-4">Support for JPG, PNG, MP4 up to 50MB</p>
                <button className="px-4 py-2 bg-surface-highest border border-white/10 rounded text-xs font-medium hover:bg-white/10 transition-colors">
                  Browse Files
                </button>
              </div>

              <div>
                <label className="block text-xs font-mono uppercase text-white/60 mb-3">Uploaded Assets (2)</label>
                <div className="grid grid-cols-4 gap-4">
                  <div className="aspect-square rounded-lg bg-surface-highest border border-white/10 relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=2669&auto=format&fit=crop" alt="ref" className="w-full h-full object-cover opacity-80" />
                    <button className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                  <div className="aspect-square rounded-lg bg-surface-highest border border-white/10 relative overflow-hidden group">
                    <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=2670&auto=format&fit=crop" alt="ref" className="w-full h-full object-cover opacity-80" />
                    <button className="absolute top-2 right-2 w-6 h-6 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                      <Trash2 className="w-3 h-3 text-white" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div>
                <h2 className="text-2xl font-semibold mb-2">Review & Launch</h2>
                <p className="text-sm text-white/40">Verify project details before initiating the pipeline.</p>
              </div>

              <div className="bg-surface-low border border-white/5 rounded-xl p-6 space-y-6">
                <div className="flex justify-between items-start pb-6 border-b border-white/5">
                  <div>
                    <div className="text-[0.6rem] font-mono text-primary uppercase tracking-widest mb-1">Project Name</div>
                    <div className="text-lg font-medium">Neon Nights Promo</div>
                  </div>
                  <button className="text-xs text-white/40 hover:text-primary flex items-center gap-1">
                    <Settings2 className="w-3 h-3" /> Edit
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-6 pb-6 border-b border-white/5">
                  <div>
                    <div className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest mb-1">Format</div>
                    <div className="text-sm">16:9 (Landscape) • 15 Seconds</div>
                  </div>
                  <div>
                    <div className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest mb-1">Profile</div>
                    <div className="text-sm">Tech Startup (Default)</div>
                  </div>
                </div>

                <div>
                  <div className="text-[0.6rem] font-mono text-white/40 uppercase tracking-widest mb-2">Prompt Summary</div>
                  <p className="text-sm text-white/80 italic border-l-2 border-primary/50 pl-3">
                    "A high-speed chase through a neon-lit cyberpunk city. Heavy rain, reflections on the wet asphalt. The pursuing vehicle is a sleek, black hover-car."
                  </p>
                </div>
              </div>

              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-start gap-3">
                <Info className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                <div className="text-sm text-primary/90">
                  Launching this project will consume approximately <strong className="text-primary">45 compute credits</strong>. The initial generation phase will take ~2-3 minutes.
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Wizard Footer */}
      <div className="h-20 border-t border-white/5 flex items-center justify-between px-8 shrink-0 bg-surface">
        <button 
          onClick={prevStep}
          disabled={currentStep === 0}
          className="px-6 py-2.5 rounded text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>

        {currentStep < STEPS.length - 1 ? (
          <button 
            onClick={handleNextStep}
            className="px-6 py-2.5 bg-white text-black rounded text-sm font-semibold hover:bg-white/90 transition-colors flex items-center gap-2"
          >
            Continue <ChevronRight className="w-4 h-4" />
          </button>
        ) : (
          <button 
            className="px-8 py-2.5 bg-primary text-on-primary-container rounded text-sm font-bold uppercase tracking-wider hover:brightness-110 transition-all flex items-center gap-2 shadow-lg shadow-primary/20"
          >
            Launch Pipeline <Zap className="w-4 h-4 fill-on-primary-container" />
          </button>
        )}
      </div>
    </div>
  );
}
