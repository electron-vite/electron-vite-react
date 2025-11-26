import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Folder, Plus, Trash2, Edit2, Pin, MoreVertical } from 'lucide-react';
import Modal from './Modal';

const Sidebar: React.FC = () => {
    const { projects, activeProjectId, setActiveProject, addProject, deleteProject, updateProject } = useApp();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
    const [editingId, setEditingId] = useState<string | null>(null);

    // Form State
    const [projectName, setProjectName] = useState('');
    const [projectDesc, setProjectDesc] = useState('');

    const openCreateModal = () => {
        setModalMode('create');
        setProjectName('');
        setProjectDesc('');
        setIsModalOpen(true);
    };

    const openEditModal = (e: React.MouseEvent, project: any) => {
        e.stopPropagation();
        setModalMode('edit');
        setEditingId(project.id);
        setProjectName(project.name);
        setProjectDesc(project.description || '');
        setIsModalOpen(true);
    };

    const handleSubmit = () => {
        if (!projectName.trim()) return;

        if (modalMode === 'create') {
            addProject(projectName.trim(), projectDesc.trim());
        } else if (modalMode === 'edit' && editingId) {
            updateProject(editingId, {
                name: projectName.trim(),
                description: projectDesc.trim()
            });
        }
        setIsModalOpen(false);
    };

    const togglePin = (e: React.MouseEvent, project: any) => {
        e.stopPropagation();
        updateProject(project.id, { isPinned: !project.isPinned });
    };

    const handleDelete = (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm('Are you sure you want to delete this project?')) {
            deleteProject(id);
        }
    };

    // Sort projects: Pinned first, then by name
    const sortedProjects = [...projects].sort((a, b) => {
        if (a.isPinned === b.isPinned) return a.name.localeCompare(b.name);
        return a.isPinned ? -1 : 1;
    });

    return (
        <div className="flex flex-col h-full p-4 bg-gray-900 text-gray-300">
            <h2 className="text-xl font-bold mb-6 text-blue-400 flex items-center gap-2">
                <Folder size={20} /> Projects
            </h2>

            <div className="flex-1 overflow-y-auto space-y-2">
                {sortedProjects.map(project => (
                    <div
                        key={project.id}
                        className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all duration-200 border ${activeProjectId === project.id
                            ? 'bg-blue-600/20 text-blue-400 border-blue-500/30'
                            : 'hover:bg-gray-800 border-transparent hover:border-gray-700'
                            }`}
                        onClick={() => setActiveProject(project.id)}
                    >
                        <div className="flex flex-col min-w-0 flex-1 mr-2">
                            <div className="flex items-center gap-2">
                                {project.isPinned && <Pin size={12} className="text-yellow-500 fill-yellow-500" />}
                                <span className="truncate font-medium">{project.name}</span>
                            </div>
                            {project.description && (
                                <span className="text-xs text-gray-500 truncate">{project.description}</span>
                            )}
                        </div>

                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button
                                onClick={(e) => togglePin(e, project)}
                                className={`p-1.5 rounded hover:bg-gray-700 ${project.isPinned ? 'text-yellow-500' : 'text-gray-400 hover:text-white'}`}
                                title={project.isPinned ? "Unpin" : "Pin"}
                            >
                                <Pin size={14} />
                            </button>
                            <button
                                onClick={(e) => openEditModal(e, project)}
                                className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white"
                                title="Edit"
                            >
                                <Edit2 size={14} />
                            </button>
                            <button
                                onClick={(e) => handleDelete(e, project.id)}
                                className="p-1.5 hover:bg-red-900/50 rounded text-gray-400 hover:text-red-400"
                                title="Delete"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <button
                onClick={openCreateModal}
                className="mt-4 w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20"
            >
                <Plus size={18} /> New Project
            </button>

            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={modalMode === 'create' ? 'Create New Project' : 'Edit Project'}
                footer={
                    <>
                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 rounded transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded transition-colors"
                        >
                            {modalMode === 'create' ? 'Create' : 'Save Changes'}
                        </button>
                    </>
                }
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Project Name</label>
                        <input
                            type="text"
                            value={projectName}
                            onChange={e => setProjectName(e.target.value)}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 focus:border-blue-500 transition-all"
                            placeholder="e.g., Work, Personal"
                            autoFocus
                            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1">Description (Optional)</label>
                        <textarea
                            value={projectDesc}
                            onChange={e => setProjectDesc(e.target.value)}
                            className="w-full bg-gray-700 text-white px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-500 border border-gray-600 focus:border-blue-500 transition-all h-24 resize-none"
                            placeholder="Brief details about this project..."
                        />
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default Sidebar;
