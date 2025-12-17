import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            removeToast(id);
        }, 3000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="fixed bottom-6 right-6 z-[60] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {toasts.map((toast) => (
                        <motion.div
                            key={toast.id}
                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.95 }}
                            layout
                            className={`pointer-events-auto min-w-[300px] p-4 rounded-xl shadow-2xl border flex items-center gap-3 backdrop-blur-md ${toast.type === 'success'
                                    ? 'bg-green-500/10 border-green-500/20 text-green-200'
                                    : toast.type === 'error'
                                        ? 'bg-red-500/10 border-red-500/20 text-red-200'
                                        : 'bg-blue-500/10 border-blue-500/20 text-blue-200'
                                }`}
                        >
                            {toast.type === 'success' && <CheckCircle className="w-5 h-5 text-green-400 shrink-0" />}
                            {toast.type === 'error' && <AlertCircle className="w-5 h-5 text-red-400 shrink-0" />}
                            {toast.type === 'info' && <Info className="w-5 h-5 text-blue-400 shrink-0" />}

                            <p className="text-sm font-medium flex-1">{toast.message}</p>

                            <button
                                onClick={() => removeToast(toast.id)}
                                className="p-1 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-4 h-4 opacity-70" />
                            </button>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </ToastContext.Provider>
    );
};
