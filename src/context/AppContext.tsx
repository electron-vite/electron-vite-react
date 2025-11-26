import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Project, Shortcut } from '../types';

interface AppContextType {
    projects: Project[];
    activeProjectId: string | null;
    shortcuts: Shortcut[];
    addProject: (name: string, description?: string) => void;
    deleteProject: (id: string) => void;
    updateProject: (id: string, updates: Partial<Project>) => void;
    setActiveProject: (id: string) => void;
    updateProjectNotes: (id: string, notes: string) => void;
    addShortcut: (shortcut: Omit<Shortcut, 'id'>) => void;
    removeShortcut: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const [shortcuts, setShortcuts] = useState<Shortcut[]>([]);

    // Load data from localStorage (mock persistence for now, will move to electron-store later)
    useEffect(() => {
        const savedProjects = localStorage.getItem('projects');
        const savedShortcuts = localStorage.getItem('shortcuts');

        if (savedProjects) {
            const parsedProjects = JSON.parse(savedProjects);
            setProjects(parsedProjects);
            if (parsedProjects.length > 0) {
                setActiveProjectId(parsedProjects[0].id);
            }
        } else {
            setProjects([]);
            setActiveProjectId(null);
        }

        if (savedShortcuts) {
            setShortcuts(JSON.parse(savedShortcuts));
        }
    }, []);

    // Save data
    useEffect(() => {
        localStorage.setItem('projects', JSON.stringify(projects));
    }, [projects]);

    useEffect(() => {
        localStorage.setItem('shortcuts', JSON.stringify(shortcuts));
    }, [shortcuts]);

    const addProject = (name: string, description?: string) => {
        const newProject: Project = {
            id: uuidv4(),
            name,
            description: description || '',
            isPinned: false,
            notes: ''
        };
        setProjects([...projects, newProject]);
        setActiveProjectId(newProject.id);
    };

    const deleteProject = (id: string) => {
        const newProjects = projects.filter(p => p.id !== id);
        setProjects(newProjects);
        if (activeProjectId === id && newProjects.length > 0) {
            setActiveProjectId(newProjects[0].id);
        } else if (newProjects.length === 0) {
            setActiveProjectId(null);
        }
    };

    const updateProject = (id: string, updates: Partial<Project>) => {
        setProjects(projects.map(p => p.id === id ? { ...p, ...updates } : p));
    };

    const setActiveProject = (id: string) => {
        setActiveProjectId(id);
    };

    const updateProjectNotes = (id: string, notes: string) => {
        setProjects(projects.map(p => p.id === id ? { ...p, notes } : p));
    };

    const addShortcut = (shortcut: Omit<Shortcut, 'id'>) => {
        const newShortcut = { ...shortcut, id: uuidv4() };
        setShortcuts([...shortcuts, newShortcut]);
    };

    const removeShortcut = (id: string) => {
        setShortcuts(shortcuts.filter(s => s.id !== id));
    };

    return (
        <AppContext.Provider value={{
            projects,
            activeProjectId,
            shortcuts,
            addProject,
            deleteProject,
            updateProject,
            setActiveProject,
            updateProjectNotes,
            addShortcut,
            removeShortcut
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useApp must be used within an AppProvider');
    }
    return context;
};
