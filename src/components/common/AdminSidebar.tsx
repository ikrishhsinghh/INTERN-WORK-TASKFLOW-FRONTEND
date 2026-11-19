import React from 'react';
import {
  ShieldAlert,
  Users,
  Layers,
  TrendingUp,
  FileSpreadsheet,
  FileClock,
  SlidersHorizontal,
  ShieldCheck,
  ArrowLeft,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { taskflowIcon } from '../../assets/branding';

interface AdminSidebarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentPage,
  onNavigate,
  isCollapsed,
  onToggleCollapse,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { logout, setActiveRole } = useAuth();

  const navGroups = [
    {
      title: 'ORGANIZATION DASHBOARD',
      items: [
        { id: 'admin-overview', label: 'Admin Overview', icon: ShieldAlert },
        { id: 'admin-users', label: 'User Management', icon: Users },
      ],
    },
    {
      title: 'TASKS & WORKLOAD',
      items: [
        { id: 'admin-tasks', label: 'All Tasks Registry', icon: Layers },
        { id: 'admin-analytics', label: 'Task Velocity Analytics', icon: TrendingUp },
        { id: 'admin-reports', label: 'Reports & Data Exports', icon: FileSpreadsheet },
      ],
    },
    {
      title: 'GOVERNANCE & AUDIT',
      items: [
        { id: 'admin-logs', label: 'Activity Audit Trail', icon: FileClock },
        { id: 'admin-categories', label: 'Categories & SLA Rules', icon: SlidersHorizontal },
        { id: 'admin-settings', label: 'Enterprise Security', icon: ShieldCheck },
      ],
    },
  ];

  const handleItemClick = (pageId: string) => {
    onNavigate(pageId);
    if (isOpenMobile) onCloseMobile();
  };

  const handleSwitchToUser = () => {
    setActiveRole('user');
    onNavigate('overview');
    if (isOpenMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs md:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Admin Sidebar Container */}
      <aside
        className={`fixed md:sticky top-0 left-0 z-40 h-screen bg-[#111C2D] text-slate-100 border-r border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out ${
          isCollapsed ? 'md:w-20' : 'md:w-64'
        } ${isOpenMobile ? 'w-64 translate-x-0' : '-translate-x-full md:translate-x-0'}`}
      >
        <div className="overflow-y-auto overflow-x-hidden flex-1">
          {/* Top: Brand & Admin Badge */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-slate-800/80">
            <div
              onClick={() => handleItemClick('admin-overview')}
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
                    <span className="font-extrabold text-lg tracking-tight text-white">
                      TASKFLOW
                    </span>
                    <span className="text-[10px] font-bold bg-[#5D87FF] text-white px-1.5 py-0.2 rounded">
                      ADMIN
                    </span>
                  </div>
                  <span className="text-[10px] font-semibold text-slate-400">
                    Enterprise Console
                  </span>
                </div>
              )}
            </div>

            {/* Desktop Collapse Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4" />
              ) : (
                <ChevronLeft className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-6">
            {navGroups.map((group) => (
              <div key={group.title} className="space-y-1">
                {!isCollapsed && (
                  <div className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
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
                      className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        isActive
                          ? 'bg-[#5D87FF] text-white shadow-md shadow-[#5D87FF]/30'
                          : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                      } ${isCollapsed ? 'justify-center px-0' : ''}`}
                    >
                      <Icon
                        className={`w-5 h-5 shrink-0 ${
                          isActive ? 'text-white' : 'text-slate-400'
                        }`}
                      />
                      {!isCollapsed && <span className="truncate">{item.label}</span>}
                    </button>
                  );
                })}
              </div>
            ))}
          </nav>
        </div>

        {/* Bottom Section: Switch to User & Logout */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <button
            type="button"
            onClick={handleSwitchToUser}
            title={isCollapsed ? 'Switch to User View' : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-slate-200 hover:bg-slate-800 hover:text-white transition-colors ${
              isCollapsed ? 'justify-center px-0' : ''
            }`}
          >
            <ArrowLeft className="w-5 h-5 shrink-0 text-[#5D87FF]" />
            {!isCollapsed && <span>User Workspace</span>}
          </button>

          <button
            type="button"
            onClick={logout}
            title={isCollapsed ? 'Sign Out' : undefined}
            className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold text-rose-400 hover:bg-rose-950/40 transition-colors ${
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
