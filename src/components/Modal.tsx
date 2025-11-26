import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, footer }) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        if (isOpen) {
            window.addEventListener('keydown', handleEsc);
        }
        return () => window.removeEventListener('keydown', handleEsc);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md mx-4 overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700 bg-gray-900/50">
                    <h3 className="text-lg font-semibold text-white">{title}</h3>
                    <button
                        onClick={onClose}
                        className="p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-4">
                    {children}
                </div>

                {footer && (
                    <div className="px-4 py-3 bg-gray-900/50 border-t border-gray-700 flex justify-end gap-2">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Modal;
