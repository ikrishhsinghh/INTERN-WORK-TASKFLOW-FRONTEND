import React, { useState, useRef, useEffect } from 'react';
import {
  Sun,
  Moon,
  Bell,
  Plus,
  Shield,
  User as UserIcon,
  LogOut,
  Settings,
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';

interface HeaderProps {
  onToggleSidebar?: () => void;
  onOpenAddTask: () => void;
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  onOpenAddTask,
  currentPage,
  onNavigate,
}) => {
  const { theme, toggleTheme } = useTheme();
  const { currentUser, logout, activeRole, setActiveRole } = useAuth();
  const {
    notifications,
    unreadNotificationCount,
    markNotificationRead,
    markAllNotificationsRead,
  } = useTask();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggleRole = () => {
    const nextRole = activeRole === 'admin' ? 'user' : 'admin';
    setActiveRole(nextRole);
    if (nextRole === 'admin') {
      onNavigate('admin-overview');
    } else {
      onNavigate('overview');
    }
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case 'overview':
        return 'Dashboard Overview';
      case 'tasks':
        return 'My Tasks';
      case 'calendar':
        return 'Calendar Schedule';
      case 'kanban':
        return 'Kanban Board';
      case 'completed':
        return 'Completed Archive';
      case 'analytics':
        return 'Productivity Analytics';
      case 'notifications':
        return 'Notification Centre';
      case 'settings':
        return 'Settings & Preferences';
      case 'admin-overview':
        return 'Admin Portal Overview';
      case 'admin-users':
        return 'User Management';
      case 'admin-tasks':
        return 'All System Tasks';
      case 'admin-analytics':
        return 'System Performance';
      case 'admin-reports':
        return 'Compliance & Reports';
      case 'admin-logs':
        return 'Security & Audit Logs';
      case 'admin-categories':
        return 'Categories & Priorities';
      case 'admin-settings':
        return 'System Settings';
      default:
        return 'Dashboard';
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-[#1E2530]/90 backdrop-blur-md border-b border-[#EEF2F6] dark:border-slate-800 transition-colors">
      <div className="px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Left: Active Section & Status (Clean Header without Search or Hamburger) */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#13DEB9] ring-4 ring-[#13DEB9]/20" />
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              {getPageTitle()}
            </h1>
            <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300">
              {activeRole === 'admin' ? 'Admin Portal' : 'G7 Workspace'}
            </span>
          </div>
        </div>

        {/* Right Actions (Spike Clean Architecture) */}
        <div className="flex items-center gap-2 sm:gap-3 ml-auto">
          {/* Quick Add Task Button */}
          <button
            type="button"
            onClick={onOpenAddTask}
            className="px-4 py-2 bg-[#5D87FF] hover:bg-[#4570EA] active:scale-95 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-md shadow-[#5D87FF]/25 transition-all flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">Add Task</span>
          </button>

          {/* Mode Switcher Button */}
          <button
            type="button"
            onClick={handleToggleRole}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all flex items-center gap-1.5 ${
              activeRole === 'admin'
                ? 'bg-[#111C2D] text-white border-slate-700 shadow-xs'
                : 'bg-[#F4F6FA] text-slate-700 border-[#EEF2F6] dark:bg-slate-800 dark:text-slate-200 dark:border-slate-700 hover:bg-slate-200/70'
            }`}
          >
            {activeRole === 'admin' ? (
              <>
                <ShieldCheck className="w-3.5 h-3.5 text-[#5D87FF]" />
                <span className="hidden md:inline">Admin Mode</span>
              </>
            ) : (
              <>
                <Shield className="w-3.5 h-3.5 text-slate-500" />
                <span className="hidden md:inline">User Mode</span>
              </>
            )}
          </button>

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="w-4.5 h-4.5 text-amber-400" />
            ) : (
              <Moon className="w-4.5 h-4.5 text-slate-600" />
            )}
          </button>

          {/* Notification Bell */}
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              onClick={() => setShowNotifications(!showNotifications)}
              className="w-9 h-9 rounded-full relative flex items-center justify-center text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 transition-colors"
              aria-label="Notifications"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotificationCount > 0 && (
                <span className="absolute top-2 right-2 w-2 h-2 bg-[#FA896B] rounded-full ring-2 ring-white dark:ring-[#1E2530]" />
              )}
            </button>

            {/* Notification Menu Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 spike-dropdown py-3">
                <div className="px-4 pb-2.5 flex items-center justify-between border-b border-[#EEF2F6] dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-slate-100">
                      Notifications
                    </span>
                    {unreadNotificationCount > 0 && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#FDEEEB] text-[#FA896B]">
                        {unreadNotificationCount} unread
                      </span>
                    )}
                  </div>
                  {unreadNotificationCount > 0 && (
                    <button
                      onClick={markAllNotificationsRead}
                      className="text-xs text-[#5D87FF] hover:underline font-semibold"
                    >
                      Mark all as read
                    </button>
                  )}
                </div>

                <div className="max-h-80 overflow-y-auto divide-y divide-[#EEF2F6] dark:divide-slate-800">
                  {notifications.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No notifications yet
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((n) => {
                      const iconMap = {
                        overdue: <AlertTriangle className="w-4 h-4 text-[#FA896B] shrink-0" />,
                        deadline: <Clock className="w-4 h-4 text-[#FFAE1F] shrink-0" />,
                        completed: <CheckCircle2 className="w-4 h-4 text-[#13DEB9] shrink-0" />,
                        created: <Plus className="w-4 h-4 text-[#5D87FF] shrink-0" />,
                        system: <Shield className="w-4 h-4 text-[#49BEFF] shrink-0" />,
                      }[n.type];

                      return (
                        <div
                          key={n.id}
                          onClick={() => markNotificationRead(n.id)}
                          className={`p-3.5 flex items-start gap-3 hover:bg-[#F4F6FA] dark:hover:bg-slate-800/60 transition-colors cursor-pointer ${
                            !n.read ? 'bg-[#ECF2FF]/40 dark:bg-blue-950/20' : ''
                          }`}
                        >
                          <div className="mt-0.5">{iconMap}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                                {n.title}
                              </span>
                              {!n.read && (
                                <span className="w-1.5 h-1.5 bg-[#5D87FF] rounded-full" />
                              )}
                            </div>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                              {n.message}
                            </p>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                <div className="pt-2 px-4 border-t border-[#EEF2F6] dark:border-slate-800 text-center">
                  <button
                    onClick={() => {
                      setShowNotifications(false);
                      onNavigate('notifications');
                    }}
                    className="text-xs font-semibold text-[#5D87FF] hover:underline flex items-center justify-center gap-1 mx-auto"
                  >
                    View All Notifications <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Avatar with Presence Indicator */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 p-1 rounded-xl hover:bg-[#F4F6FA] dark:hover:bg-slate-800 transition-colors"
            >
              <div className="relative">
                <img
                  src={
                    currentUser?.avatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt={currentUser?.name || 'User'}
                  className="w-9 h-9 rounded-xl object-cover ring-2 ring-[#5D87FF]/20"
                />
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-[#13DEB9] rounded-full ring-2 ring-white dark:ring-[#1E2530]" />
              </div>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 top-12 z-50 w-64 spike-dropdown py-2">
                <div className="px-4 py-3 border-b border-[#EEF2F6] dark:border-slate-800">
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {currentUser?.name || 'Alex Morgan'}
                  </p>
                  <p className="text-xs text-slate-500 truncate">
                    {currentUser?.email || 'alex.morgan@taskflow.io'}
                  </p>
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300">
                      {activeRole === 'admin' ? 'Enterprise Admin' : 'Workspace Member'}
                    </span>
                  </div>
                </div>

                <div className="py-1.5">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('settings');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <UserIcon className="w-4 h-4 text-slate-400" />
                    My Profile & Settings
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      handleToggleRole();
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-slate-400" />
                    Switch to {activeRole === 'admin' ? 'User Dashboard' : 'Admin Console'}
                  </button>

                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      onNavigate('settings');
                    }}
                    className="w-full px-4 py-2 text-left text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-[#F4F6FA] dark:hover:bg-slate-800 flex items-center gap-2"
                  >
                    <Settings className="w-4 h-4 text-slate-400" />
                    App Preferences
                  </button>
                </div>

                <div className="pt-1.5 border-t border-[#EEF2F6] dark:border-slate-800">
                  <button
                    onClick={() => {
                      setShowProfileMenu(false);
                      logout();
                    }}
                    className="w-full px-4 py-2 text-left text-xs text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center gap-2 font-bold"
                  >
                    <LogOut className="w-4 h-4 text-rose-500" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
