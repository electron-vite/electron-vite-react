export interface Project {
    id: string;
    name: string;
    description?: string;
    isPinned: boolean;
    notes: string;
}

export interface Shortcut {
    id: string;
    projectId: string;
    name: string;
    path: string;
    type: 'file' | 'folder' | 'url';
    icon?: string; // Base64 or data URL
}
