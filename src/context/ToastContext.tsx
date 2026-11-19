import React, { createContext, useContext, useState, useCallback } from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  title: string;
  message?: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  toasts: Toast[];
  showToast: (title: string, message?: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (title: string, message?: string, type: ToastType = 'info', duration: number = 4000) => {
      const id = 'toast-' + Math.random().toString(36).substring(2, 9);
      const newToast: Toast = { id, title, message, type, duration };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          removeToast(id);
        }, duration);
      }
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ toasts, showToast, removeToast }}>
      {children}
      {/* Toast Notification Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((toast) => {
          const typeConfig = {
            success: {
              icon: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />,
              border: 'border-emerald-500/20 dark:border-emerald-500/30',
              bg: 'bg-white dark:bg-slate-900',
              indicator: 'bg-emerald-500'
            },
            error: {
              icon: <AlertCircle className="w-5 h-5 text-rose-500 shrink-0 mt-0.5" />,
              border: 'border-rose-500/20 dark:border-rose-500/30',
              bg: 'bg-white dark:bg-slate-900',
              indicator: 'bg-rose-500'
            },
            warning: {
              icon: <AlertTriangle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />,
              border: 'border-amber-500/20 dark:border-amber-500/30',
              bg: 'bg-white dark:bg-slate-900',
              indicator: 'bg-amber-500'
            },
            info: {
              icon: <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />,
              border: 'border-blue-500/20 dark:border-blue-500/30',
              bg: 'bg-white dark:bg-slate-900',
              indicator: 'bg-blue-500'
            }
          }[toast.type];

          return (
            <div
              key={toast.id}
              className={`pointer-events-auto flex items-start gap-3 p-3.5 rounded-xl border shadow-lg backdrop-blur-md transition-all duration-200 animate-in fade-in slide-in-from-bottom-3 ${typeConfig.bg} ${typeConfig.border}`}
            >
              <div className={`w-1 self-stretch rounded-full ${typeConfig.indicator}`} />
              {typeConfig.icon}
              <div className="flex-1 min-w-0 pr-1">
                <div className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                  {toast.title}
                </div>
                {toast.message && (
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                    {toast.message}
                  </div>
                )}
              </div>
              <button
                onClick={() => removeToast(toast.id)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1 -mr-1"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
