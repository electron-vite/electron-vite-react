import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import ReactMarkdown from 'react-markdown';
import TextareaAutosize from 'react-textarea-autosize';
import { Save, FileText, Edit3, Eye, Bold, Italic, List, Code, Link as LinkIcon } from 'lucide-react';

const NotesArea: React.FC = () => {
    const { projects, activeProjectId, updateProjectNotes } = useApp();
    const activeProject = projects.find(p => p.id === activeProjectId);
    const [isPreview, setIsPreview] = useState(false);
    const [localNotes, setLocalNotes] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        if (activeProject) {
            setLocalNotes(activeProject.notes || '');
        }
    }, [activeProject?.id]);

    // Auto-save debounce
    useEffect(() => {
        if (!activeProject) return;

        const timer = setTimeout(() => {
            if (localNotes !== activeProject.notes) {
                updateProjectNotes(activeProject.id, localNotes);
            }
        }, 1000);

        return () => clearTimeout(timer);
    }, [localNotes, activeProject, updateProjectNotes]);

    const handleExport = async () => {
        if (!activeProject) return;
        try {
            // @ts-ignore
            await window.ipcRenderer.invoke('save-markdown', {
                content: localNotes,
                defaultPath: `${activeProject.name}_notes.md`
            });
        } catch (err) {
            console.error('Failed to export notes', err);
        }
    };

    const insertFormat = (prefix: string, suffix: string = '') => {
        if (!textareaRef.current) return;

        const start = textareaRef.current.selectionStart;
        const end = textareaRef.current.selectionEnd;
        const text = localNotes;
        const before = text.substring(0, start);
        const selection = text.substring(start, end);
        const after = text.substring(end);

        const newText = before + prefix + selection + suffix + after;
        setLocalNotes(newText);

        // Restore focus and selection
        setTimeout(() => {
            if (textareaRef.current) {
                textareaRef.current.focus();
                textareaRef.current.setSelectionRange(
                    start + prefix.length,
                    end + prefix.length
                );
            }
        }, 0);
    };

    if (!activeProject) return null;

    return (
        <div className="flex flex-col h-full bg-gray-800 border-t border-gray-700">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-700">
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                    <FileText size={16} />
                    <span>Project Notes</span>
                </div>
                <div className="flex items-center gap-2">
                    <button
                        onClick={handleExport}
                        className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white transition-colors"
                        title="Export to .md"
                    >
                        <Save size={16} />
                    </button>
                </div>
            </div>

            {/* Toolbar (only in edit mode) */}
            {!isPreview && (
                <div className="flex items-center gap-1 px-2 py-1.5 bg-gray-800 border-b border-gray-700">
                    <button onClick={() => insertFormat('**', '**')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Bold">
                        <Bold size={14} />
                    </button>
                    <button onClick={() => insertFormat('*', '*')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Italic">
                        <Italic size={14} />
                    </button>
                    <div className="w-px h-4 bg-gray-700 mx-1" />
                    <button onClick={() => insertFormat('- ')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="List">
                        <List size={14} />
                    </button>
                    <button onClick={() => insertFormat('`', '`')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Code">
                        <Code size={14} />
                    </button>
                    <button onClick={() => insertFormat('[', '](url)')} className="p-1.5 hover:bg-gray-700 rounded text-gray-400 hover:text-white" title="Link">
                        <LinkIcon size={14} />
                    </button>
                </div>
            )}

            {/* Editor / Preview */}
            <div className="flex-1 overflow-y-auto relative bg-gray-900/50">
                {isPreview ? (
                    <div className="h-full p-6 prose prose-invert max-w-none prose-sm">
                        <ReactMarkdown>{localNotes}</ReactMarkdown>
                    </div>
                ) : (
                    <TextareaAutosize
                        ref={textareaRef}
                        value={localNotes}
                        onChange={e => setLocalNotes(e.target.value)}
                        className="w-full min-h-full bg-transparent text-gray-200 p-6 outline-none resize-none font-mono text-sm leading-relaxed"
                        placeholder="# Project Notes\n\nStart writing..."
                        minRows={5}
                    />
                )}
            </div>
        </div>
    );
};

export default NotesArea;
