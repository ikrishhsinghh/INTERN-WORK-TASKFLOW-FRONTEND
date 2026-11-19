import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Plus,
  Shield,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import { useTask } from '../../context/TaskContext';
import { NotificationType } from '../../types';

interface NotificationsPageProps {
  onNavigateToTask?: (taskId: string) => void;
}

export const NotificationsPage: React.FC<NotificationsPageProps> = () => {
  const {
    notifications,
    markNotificationRead,
    markAllNotificationsRead,
    clearNotifications,
  } = useTask();

  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'deadlines' | 'system'>('all');

  const filtered = notifications.filter((n) => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'deadlines') return n.type === 'deadline' || n.type === 'overdue';
    if (activeFilter === 'system') return n.type === 'system';
    return true;
  });

  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'overdue':
        return <AlertTriangle className="w-4 h-4 text-rose-500" />;
      case 'deadline':
        return <Clock className="w-4 h-4 text-amber-500" />;
      case 'completed':
        return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'created':
        return <Plus className="w-4 h-4 text-blue-500" />;
      case 'system':
        return <Shield className="w-4 h-4 text-purple-500" />;
      default:
        return <Bell className="w-4 h-4 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-50 tracking-tight flex items-center gap-2">
            Notification Centre
            {notifications.filter((n) => !n.read).length > 0 && (
              <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-rose-50 text-rose-600 dark:bg-rose-950/60 dark:text-rose-400">
                {notifications.filter((n) => !n.read).length} new
              </span>
            )}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Stay informed about deadlines, task updates, and system events
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={markAllNotificationsRead}
            className="px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <CheckCheck className="w-4 h-4 text-blue-500" />
            Mark All Read
          </button>
          <button
            onClick={clearNotifications}
            className="px-3.5 py-2 text-xs font-semibold text-rose-600 dark:text-rose-400 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors flex items-center gap-1.5 shadow-xs"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200/80 dark:border-slate-800 pb-2 text-xs font-semibold">
        {(
          [
            { id: 'all', label: 'All Alerts' },
            { id: 'unread', label: 'Unread Only' },
            { id: 'deadlines', label: 'Deadlines & Overdue' },
            { id: 'system', label: 'System & Releases' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveFilter(tab.id)}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeFilter === tab.id
                ? 'bg-blue-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 mx-auto flex items-center justify-center text-slate-400 mb-3">
              <Bell className="w-6 h-6" />
            </div>
            <p className="text-base font-semibold text-slate-900 dark:text-slate-100">
              No notifications to display
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              You're all caught up with deadlines and system updates.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => markNotificationRead(item.id)}
                className={`p-4 sm:p-5 flex items-start gap-4 transition-colors cursor-pointer ${
                  !item.read
                    ? 'bg-blue-50/30 dark:bg-blue-950/20 hover:bg-blue-50/50'
                    : 'hover:bg-slate-50/60 dark:hover:bg-slate-800/40'
                }`}
              >
                <div className="w-9 h-9 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-2xs mt-0.5">
                  {getIcon(item.type)}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </h4>
                    <span className="text-[11px] text-slate-400">
                      {new Date(item.timestamp).toLocaleDateString()}{' '}
                      {new Date(item.timestamp).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                    {item.message}
                  </p>
                </div>

                {!item.read && (
                  <span className="w-2.5 h-2.5 bg-blue-600 rounded-full shrink-0 self-center" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
