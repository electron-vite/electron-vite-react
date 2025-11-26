import React, { useState } from 'react';
import Sidebar from './Sidebar';
import { PanelLeft, PanelRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface LayoutProps {
  children: React.ReactNode;
  rightPanel: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children, rightPanel }) => {
  const [leftPanelOpen, setLeftPanelOpen] = useState(true);
  const [rightPanelOpen, setRightPanelOpen] = useState(false);
  const { projects, activeProjectId } = useApp();

  const activeProject = projects.find(p => p.id === activeProjectId);

  return (
    <div className="flex h-screen w-screen bg-gray-900 text-white overflow-hidden">
      {/* Left Panel */}
      <div
        className={`transition-all duration-300 ease-in-out border-r border-gray-700 flex flex-col ${leftPanelOpen ? 'w-64' : 'w-0 opacity-0 overflow-hidden'
          }`}
      >
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 bg-gray-800 relative">
        {/* Header / Toolbar */}
        <div className="h-14 border-b border-gray-700 flex items-center px-4 justify-between bg-gray-900/50 backdrop-blur shrink-0">
          <button
            onClick={() => setLeftPanelOpen(!leftPanelOpen)}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            title="Toggle Sidebar"
          >
            <PanelLeft size={20} />
          </button>

          <div className="flex flex-col justify-center flex-1 mx-4 overflow-hidden">
            {activeProject ? (
              <>
                <h1 className="font-bold text-2xl leading-none truncate w-full text-left mb-0.5">{activeProject.name}</h1>
                {activeProject.description && (
                  <span className="text-sm text-gray-400 truncate w-full text-left leading-none">{activeProject.description}</span>
                )}
              </>
            ) : (
              <div className="font-semibold text-lg text-gray-500">No Project Selected</div>
            )}
          </div>

          <button
            onClick={() => setRightPanelOpen(!rightPanelOpen)}
            className="p-2 hover:bg-gray-700 rounded-md transition-colors"
            title="Toggle Calendar"
          >
            <PanelRight size={20} />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {children}
        </div>
      </div>

      {/* Right Panel */}
      <div
        className={`transition-all duration-300 ease-in-out border-l border-gray-700 bg-gray-900 flex flex-col ${rightPanelOpen ? 'w-96' : 'w-0 opacity-0 overflow-hidden'
          }`}
      >
        {rightPanel}
      </div>
    </div>
  );
};

export default Layout;
