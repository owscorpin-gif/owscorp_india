'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

export interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    addToast: (message: string, type?: ToastType) => void;
    removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    const addToast = useCallback((message: string, type: ToastType = 'success') => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3 seconds
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, [removeToast]);

    return (
        <ToastContext.Provider value={{ addToast, removeToast }}>
            {children}
            {/* Toast Container */}
            <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-3 pointer-events-none">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
                            pointer-events-auto flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md min-w-[300px] animate-slide-up
                            ${toast.type === 'success' ? 'bg-white/90 dark:bg-slate-900/90 border border-green-500/50 text-green-600 dark:text-green-400' : ''}
                            ${toast.type === 'error' ? 'bg-white/90 dark:bg-slate-900/90 border border-red-500/50 text-red-600 dark:text-red-400' : ''}
                            ${toast.type === 'info' ? 'bg-white/90 dark:bg-slate-900/90 border border-blue-500/50 text-blue-600 dark:text-blue-400' : ''}
                        `}
                    >
                        <div className={`
                            p-2 rounded-full 
                            ${toast.type === 'success' ? 'bg-green-100 dark:bg-green-900/30' : ''}
                            ${toast.type === 'error' ? 'bg-red-100 dark:bg-red-900/30' : ''}
                            ${toast.type === 'info' ? 'bg-blue-100 dark:bg-blue-900/30' : ''}
                        `}>
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5" />}
                            {toast.type === 'info' && <Info className="w-5 h-5" />}
                        </div>

                        <p className="font-medium text-sm flex-1 text-gray-800 dark:text-gray-100">{toast.message}</p>

                        <button
                            onClick={() => removeToast(toast.id)}
                            className="p-1 hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X className="w-4 h-4 opacity-50" />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}

export function useToast() {
    const context = useContext(ToastContext);
    if (context === undefined) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
}
