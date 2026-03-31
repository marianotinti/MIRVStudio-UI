import { useState } from 'react';
import { Sidebar } from './components/layout/Sidebar';
import { Topbar } from './components/layout/Topbar';
import { ProjectsView } from './modules/projects/ProjectsView';
import { PipelineView } from './modules/pipeline/PipelineView';
import { BoardView } from './modules/board/BoardView';
import { StudioView } from './modules/studio/StudioView';
import { CreateView } from './modules/create/CreateView';
import { AssetsView } from './modules/assets/AssetsView';
import { QAView } from './modules/qa/QAView';
import { SettingsView } from './modules/settings/SettingsView';

export default function App() {
  const [currentView, setCurrentView] = useState('projects');

  const renderView = () => {
    switch (currentView) {
      case 'projects':
        return <ProjectsView />;
      case 'create':
        return <CreateView />;
      case 'pipeline':
        return <PipelineView />;
      case 'board':
        return <BoardView />;
      case 'studio':
        return <StudioView />;
      case 'assets':
        return <AssetsView />;
      case 'qa':
        return <QAView />;
      case 'settings':
        return <SettingsView />;
      default:
        return (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-xl font-bold text-white/40 mb-2">View Under Construction</h2>
              <p className="text-sm text-white/20 font-mono">Module: {currentView}</p>
            </div>
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case 'projects': return 'Project Index';
      case 'create': return 'New Project Setup';
      case 'pipeline': return 'Pipeline Operations';
      case 'board': return 'Board Workspace';
      case 'studio': return 'Studio Assembly';
      case 'assets': return 'Asset Library';
      case 'qa': return 'Quality Assurance';
      case 'settings': return 'Workspace Settings';
      default: return 'MIRV Tool';
    }
  };

  return (
    <div className="flex h-screen bg-background text-on-surface font-sans overflow-hidden selection:bg-primary-container/30">
      <Sidebar currentView={currentView} setView={setCurrentView} />
      
      <div className="flex-1 flex flex-col relative overflow-hidden">
        <Topbar title={getTitle()} />
        
        <main className="flex-1 overflow-hidden flex flex-col">
          {renderView()}
        </main>
      </div>
    </div>
  );
}
