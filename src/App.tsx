import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { TaskProvider, useTask } from './context/TaskContext';

// Auth Components
import { LoginPage } from './components/auth/LoginPage';
import { RegisterPage } from './components/auth/RegisterPage';
import { ForgotPasswordPage } from './components/auth/ForgotPasswordPage';

// Common Components
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { AdminSidebar } from './components/common/AdminSidebar';
import { Footer } from './components/common/Footer';
import { DeleteConfirmModal } from './components/common/DeleteConfirmModal';

// Task Modals
import { TaskModal } from './components/tasks/TaskModal';
import { TaskDetailModal } from './components/tasks/TaskDetailModal';

// User Pages
import { DashboardOverview } from './pages/user/DashboardOverview';
import { MyTasksPage } from './pages/user/MyTasksPage';
import { CalendarPage } from './pages/user/CalendarPage';
import { KanbanPage } from './pages/user/KanbanPage';
import { CompletedTasksPage } from './pages/user/CompletedTasksPage';
import { AnalyticsPage } from './pages/user/AnalyticsPage';
import { NotificationsPage } from './pages/user/NotificationsPage';
import { SettingsPage } from './pages/user/SettingsPage';

// Admin Pages
import { AdminOverviewPage } from './pages/admin/AdminOverviewPage';
import { UserManagementPage } from './pages/admin/UserManagementPage';
import { AdminAllTasksPage } from './pages/admin/AdminAllTasksPage';
import { AdminReportsPage } from './pages/admin/AdminReportsPage';
import { AdminActivityLogsPage } from './pages/admin/AdminActivityLogsPage';
import { CategoriesPrioritiesPage } from './pages/admin/CategoriesPrioritiesPage';
import { AdminSettingsPage } from './pages/admin/AdminSettingsPage';

import { Task, TaskStatus } from './types';

const MainAppContent: React.FC = () => {
  const { isAuthenticated, activeRole } = useAuth();
  const { deleteTask } = useTask();

  // Navigation page state
  const [currentPage, setCurrentPage] = useState<string>('overview');
  const [authView, setAuthView] = useState<'login' | 'register' | 'forgot'>('login');

  // Sidebar responsive state
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Task Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState<Task | null>(null);
  const [defaultTaskDate, setDefaultTaskDate] = useState<string | undefined>(undefined);
  const [defaultTaskStatus, setDefaultTaskStatus] = useState<TaskStatus | undefined>('To Do');

  const [viewingTask, setViewingTask] = useState<Task | null>(null);
  const [deletingTask, setDeletingTask] = useState<Task | null>(null);

  // If not authenticated, render auth views
  if (!isAuthenticated) {
    if (authView === 'register') {
      return <RegisterPage onNavigateToLogin={() => setAuthView('login')} />;
    }
    if (authView === 'forgot') {
      return <ForgotPasswordPage onNavigateToLogin={() => setAuthView('login')} />;
    }
    return (
      <LoginPage
        onNavigateToRegister={() => setAuthView('register')}
        onNavigateToForgot={() => setAuthView('forgot')}
      />
    );
  }

  // Handlers for task creation & editing
  const handleOpenAddTask = () => {
    setTaskToEdit(null);
    setDefaultTaskDate(undefined);
    setDefaultTaskStatus('To Do');
    setIsTaskModalOpen(true);
  };

  const handleAddTaskWithDate = (date: string) => {
    setTaskToEdit(null);
    setDefaultTaskDate(date);
    setDefaultTaskStatus('To Do');
    setIsTaskModalOpen(true);
  };

  const handleAddTaskToColumn = (status: TaskStatus) => {
    setTaskToEdit(null);
    setDefaultTaskDate(undefined);
    setDefaultTaskStatus(status);
    setIsTaskModalOpen(true);
  };

  const handleEditTask = (task: Task) => {
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleViewTask = (task: Task) => {
    setViewingTask(task);
  };

  const handleDeleteTask = (task: Task) => {
    setDeletingTask(task);
  };

  // Render current active page
  const renderPage = () => {
    // Admin routes
    if (activeRole === 'admin') {
      switch (currentPage) {
        case 'admin-overview':
          return (
            <AdminOverviewPage
              onNavigate={(page) => setCurrentPage(page)}
              onOpenAddUser={() => setCurrentPage('admin-users')}
            />
          );
        case 'admin-users':
          return <UserManagementPage />;
        case 'admin-tasks':
          return (
            <AdminAllTasksPage
              onViewTask={handleViewTask}
              onDeleteTask={handleDeleteTask}
            />
          );
        case 'admin-analytics':
          return <AnalyticsPage />;
        case 'admin-reports':
          return <AdminReportsPage />;
        case 'admin-logs':
          return <AdminActivityLogsPage />;
        case 'admin-categories':
          return <CategoriesPrioritiesPage />;
        case 'admin-settings':
          return <AdminSettingsPage />;
        default:
          return (
            <AdminOverviewPage
              onNavigate={(page) => setCurrentPage(page)}
              onOpenAddUser={() => setCurrentPage('admin-users')}
            />
          );
      }
    }

    // User routes
    switch (currentPage) {
      case 'overview':
        return (
          <DashboardOverview
            onOpenAddTask={handleOpenAddTask}
            onViewTask={handleViewTask}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
      case 'tasks':
        return (
          <MyTasksPage
            onAddTask={handleOpenAddTask}
            onViewTask={handleViewTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'calendar':
        return (
          <CalendarPage
            onViewTask={handleViewTask}
            onAddTaskWithDate={handleAddTaskWithDate}
            onOpenAddTask={handleOpenAddTask}
          />
        );
      case 'kanban':
        return (
          <KanbanPage
            onViewTask={handleViewTask}
            onEditTask={handleEditTask}
            onDeleteTask={handleDeleteTask}
            onAddTaskToColumn={handleAddTaskToColumn}
            onOpenAddTask={handleOpenAddTask}
          />
        );
      case 'completed':
        return (
          <CompletedTasksPage
            onViewTask={handleViewTask}
            onDeleteTask={handleDeleteTask}
          />
        );
      case 'analytics':
        return <AnalyticsPage />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return (
          <DashboardOverview
            onOpenAddTask={handleOpenAddTask}
            onViewTask={handleViewTask}
            onNavigate={(page) => setCurrentPage(page)}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 dark:bg-slate-950 flex flex-col transition-colors">
      <div className="flex flex-1">
        {/* Appropriate Sidebar based on active role */}
        {activeRole === 'admin' ? (
          <AdminSidebar
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        ) : (
          <Sidebar
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
            isCollapsed={isSidebarCollapsed}
            onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            isOpenMobile={isMobileSidebarOpen}
            onCloseMobile={() => setIsMobileSidebarOpen(false)}
          />
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Header
            onToggleSidebar={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
            onOpenAddTask={handleOpenAddTask}
            currentPage={currentPage}
            onNavigate={(page) => setCurrentPage(page)}
          />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {renderPage()}
          </main>

          <Footer />
        </div>
      </div>

      {/* Global Modals */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
        defaultDate={defaultTaskDate}
        defaultStatus={defaultTaskStatus}
      />

      <TaskDetailModal
        isOpen={viewingTask !== null}
        onClose={() => setViewingTask(null)}
        task={viewingTask}
        onEdit={(task) => {
          setViewingTask(null);
          handleEditTask(task);
        }}
        onDelete={(task) => {
          setViewingTask(null);
          handleDeleteTask(task);
        }}
      />

      {deletingTask && (
        <DeleteConfirmModal
          isOpen={true}
          onClose={() => setDeletingTask(null)}
          onConfirm={() => {
            deleteTask(deletingTask.id);
            setDeletingTask(null);
          }}
          title="Delete Task?"
          message={`Are you sure you want to permanently delete "${deletingTask.title}"?`}
          confirmLabel="Delete Task"
        />
      )}
    </div>
  );
};

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <TaskProvider>
            <MainAppContent />
          </TaskProvider>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;
