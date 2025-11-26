import React from 'react';
import Layout from './components/Layout';

import ShortcutGrid from './components/ShortcutGrid';
import NotesArea from './components/NotesArea';

import CalendarPanel from './components/CalendarPanel';

function App() {
  return (
    <Layout
      rightPanel={
        <div className="flex flex-col h-full">
          <div className="h-1/2 border-b border-gray-700">
            <CalendarPanel />
          </div>
          <div className="h-1/2">
            <NotesArea />
          </div>
        </div>
      }
    >
      <ShortcutGrid />
    </Layout>
  );
}

export default App;