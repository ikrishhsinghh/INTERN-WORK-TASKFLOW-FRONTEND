import React from 'react';
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  Kanban,
  CheckCircle,
  BarChart3,
  Bell,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTask } from '../../context/TaskContext';
import { taskflowIcon } from '../../assets/branding';

interface SidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: any;
  badge?: number;
  badgeColor?: string;
}

interface NavGroup {
  title: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { logout, activeRole, setActiveRole } = useAuth();
  const { unreadNotificationCount, tasks } = useTask();

  const taskCount = tasks.filter((t) => t.status !== 'Completed').length;

  const navGroups: NavGroup[] = [
    {
      title: 'HOME',
      items: [
        { id: 'overview', label: 'Dashboard', icon: LayoutDashboard },
      ],
    },
    {
      title: 'APPS',
      items: [
        { id: 'tasks', label: 'My Tasks', icon: CheckSquare, badge: taskCount },
        { id: 'calendar', label: 'Calendar Schedule', icon: Calendar },
        { id: 'kanban', label: 'Kanban Board', icon: Kanban },
        { id: 'completed', label: 'Completed Archive', icon: CheckCircle },
      ],
    },
    {
      title: 'ANALYTICS & ALERTS',
      items: [
        { id: 'analytics', label: 'Productivity Analytics', icon: BarChart3 },
        {
          id: 'notifications',
          label: 'Notification Centre',
          icon: Bell,
          badge: unreadNotificationCount > 0 ? unreadNotificationCount : undefined,
          badgeColor: 'bg-[#FA896B] text-white',
        },
      ],
    },
    {
      title: 'PREFERENCES',
      items: [
        { id: 'settings', label: 'Profile & Settings', icon: Settings },
      ],
    },
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    if (isOpenMobile) onCloseMobile();
  };

  const handleSwitchToAdmin = () => {
    setActiveRole('admin');
    onNavigate('admin-overview');
    if (isOpenMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen bg-white dark:bg-[#1E2530] border-r border-[#EEF2F6] dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${isOpenMobile ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          {/* Top Brand Header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-[#EEF2F6] dark:border-slate-800/80">
            <div
              onClick={() => handleItemClick('overview')}
              className="flex items-center gap-3 cursor-pointer select-none"
            >
              <img
                src={taskflowIcon}
                alt="TASKFLOW"
                className="w-9 h-9 rounded-xl object-contain shrink-0 drop-shadow-xs"
              />
              {!isCollapsed && (
                <div className="flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                      TASKFLOW
                    </span>
                    <span className="text-[10px] font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300 px-1.5 py-0.5 rounded-md">
                      PRO
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Team G7 SaaS
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Groups (Spike Signature) */}
          <nav className="p-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    {group.title}
                  </div>
                )}

                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = currentPage === item.id;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handleItemClick(item.id)}
                      title={isCollapsed ? item.label : undefined}
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-150 relative ${
                        isActive
                          ? 'bg-[#5D87FF] text-white shadow-md shadow-[#5D87FF]/25'
                          : 'text-slate-600 dark:text-slate-300 hover:bg-[#ECF2FF] dark:hover:bg-slate-800/80 hover:text-[#5D87FF] dark:hover:text-[#5D87FF]'
                      } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}

                      {/* Badge */}
                      {item.badge !== undefined && !isCollapsed && (
                        <span
                          className={`ml-auto px-2 py-0.5 rounded-full text-[11px] font-bold ${
                            item.badgeColor ||
                            'bg-[#E8F7FF] text-[#49BEFF] dark:bg-blue-950/60 dark:text-blue-300'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                      {item.badge !== undefined && isCollapsed && (
                        <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FA896B]" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Spike-style Team Card & Quick Role Switch */}
        <div className="p-4 border-t border-[#EEF2F6] dark:border-slate-800 space-y-2.5">
          {!isCollapsed && (
            <div className="p-3.5 rounded-2xl bg-[#F6F9FD] dark:bg-slate-800/60 border border-[#E8F1FC] dark:border-slate-700/60">
              <div className="flex items-center gap-2 mb-1">
                <div className="w-6 h-6 rounded-lg bg-[#5D87FF] text-white flex items-center justify-center text-xs">
                  <Sparkles className="w-3.5 h-3.5" />
                </div>
                <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                  Internship Team G7
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-snug">
                TASKFLOW SaaS Architecture v2.4
              </p>

              <button
                type="button"
                onClick={handleSwitchToAdmin}
                className="mt-2.5 w-full py-1.5 text-[11px] font-bold text-[#5D87FF] bg-white dark:bg-slate-900 rounded-lg hover:bg-blue-50 transition-colors border border-[#E8F1FC] dark:border-slate-700 flex items-center justify-center gap-1.5 shadow-2xs"
              >
                <Shield className="w-3 h-3" /> Switch to Admin View
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={logout}
            title={isCollapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <LogOut className="w-5 h-5 shrink-0" />
            {!isCollapsed && <span>Sign Out</span>}
          </button>
        </div>
      </aside>
    </>
  );
};
