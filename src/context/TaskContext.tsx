import React, { createContext, useContext, useState, useEffect, useMemo, useCallback } from 'react';
import confetti from 'canvas-confetti';
import {
  Task,
  TaskStatus,
  TaskPriority,
  TaskCategory,
  User,
  NotificationItem,
  ActivityLog,
} from '../types';
import {
  INITIAL_TASKS,
  INITIAL_USERS,
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITY_LOGS,
} from '../mock/initialData';
import { useAuth } from './AuthContext';
import { useToast } from './ToastContext';

interface TaskContextType {
  tasks: Task[];
  users: User[];
  notifications: NotificationItem[];
  activityLogs: ActivityLog[];
  unreadNotificationCount: number;

  // Filter & Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  selectedPriority: string;
  setSelectedPriority: (prio: string) => void;
  selectedStatus: string;
  setSelectedStatus: (status: string) => void;
  sortBy: 'dueDate' | 'priority' | 'createdAt' | 'title';
  setSortBy: (sort: 'dueDate' | 'priority' | 'createdAt' | 'title') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;

  // Task Operations
  addTask: (data: Omit<Task, 'id' | 'createdAt' | 'ownerId' | 'ownerName'>) => Task;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  deleteTask: (taskId: string) => void;
  duplicateTask: (taskId: string) => void;
  toggleTaskComplete: (taskId: string) => void;
  moveTaskStatus: (taskId: string, newStatus: TaskStatus) => void;

  // Admin User Operations
  addUser: (userData: Omit<User, 'id' | 'registeredDate' | 'totalTasks' | 'completedTasks'>) => void;
  updateUser: (userId: string, updates: Partial<User>) => void;
  deleteUser: (userId: string) => void;

  // Notification Operations
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;

  // Computed metrics
  stats: {
    total: number;
    completed: number;
    pending: number;
    overdue: number;
    completionRate: number;
  };
  todayTasks: Task[];
  upcomingTasks: Task[];
  overdueTasks: Task[];
  filteredTasks: Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();
  const { showToast } = useToast();

  // Tasks state
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('taskflow_tasks_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_TASKS;
  });

  // Users state
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('taskflow_users_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_USERS;
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('taskflow_notifications_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_NOTIFICATIONS;
  });

  // Activity logs state
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>(() => {
    const saved = localStorage.getItem('taskflow_activity_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return INITIAL_ACTIVITY_LOGS;
  });

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedPriority, setSelectedPriority] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'createdAt' | 'title'>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Persistence effects
  useEffect(() => {
    localStorage.setItem('taskflow_tasks_v2', JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem('taskflow_users_v2', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('taskflow_notifications_v2', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('taskflow_activity_v2', JSON.stringify(activityLogs));
  }, [activityLogs]);

  // Log activity helper
  const logActivity = useCallback(
    (action: string, target: string, type: 'task' | 'user' | 'auth' | 'system' = 'task') => {
      const newLog: ActivityLog = {
        id: 'log-' + Date.now().toString(36),
        timestamp: new Date().toISOString(),
        actor: currentUser?.name || 'Current User',
        actorAvatar: currentUser?.avatar,
        action,
        target,
        type,
        ipAddress: '192.168.1.104',
      };
      setActivityLogs((prev) => [newLog, ...prev.slice(0, 49)]); // keep last 50
    },
    [currentUser]
  );

  // Add Task
  const addTask = useCallback(
    (data: Omit<Task, 'id' | 'createdAt' | 'ownerId' | 'ownerName'>): Task => {
      const newTask: Task = {
        ...data,
        id: 'tsk-' + Date.now().toString(36),
        createdAt: new Date().toISOString(),
        ownerId: currentUser?.id || 'usr-1',
        ownerName: currentUser?.name || 'Alex Morgan',
      };

      setTasks((prev) => [newTask, ...prev]);
      logActivity('created task', newTask.title, 'task');

      // Add Notification
      const newNotif: NotificationItem = {
        id: 'notif-' + Date.now().toString(36),
        title: 'New Task Created',
        message: `"${newTask.title}" scheduled for ${newTask.dueDate}`,
        type: 'created',
        timestamp: new Date().toISOString(),
        read: false,
        taskId: newTask.id,
      };
      setNotifications((prev) => [newNotif, ...prev]);

      showToast('Task Created', `"${newTask.title}" has been successfully added.`, 'success');
      return newTask;
    },
    [currentUser, logActivity, showToast]
  );

  // Update Task
  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId) {
            const updated = { ...t, ...updates };
            if (updates.status === 'Completed' && t.status !== 'Completed') {
              updated.completedAt = new Date().toISOString();
            }
            return updated;
          }
          return t;
        })
      );

      const task = tasks.find((t) => t.id === taskId);
      logActivity('updated task', task ? task.title : 'Task ' + taskId, 'task');
      showToast('Task Updated', 'Changes saved successfully.', 'info');
    },
    [tasks, logActivity, showToast]
  );

  // Delete Task
  const deleteTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      setTasks((prev) => prev.filter((t) => t.id !== taskId));
      logActivity('deleted task', task ? task.title : 'Task ' + taskId, 'task');
      showToast('Task Deleted', 'The task has been permanently removed.', 'info');
    },
    [tasks, logActivity, showToast]
  );

  // Duplicate Task
  const duplicateTask = useCallback(
    (taskId: string) => {
      const task = tasks.find((t) => t.id === taskId);
      if (!task) return;

      const duplicated: Task = {
        ...task,
        id: 'tsk-' + Date.now().toString(36),
        title: `${task.title} (Copy)`,
        status: 'To Do',
        createdAt: new Date().toISOString(),
        completedAt: undefined,
      };

      setTasks((prev) => [duplicated, ...prev]);
      logActivity('duplicated task', duplicated.title, 'task');
      showToast('Task Duplicated', `Created a copy of "${task.title}".`, 'success');
    },
    [tasks, logActivity, showToast]
  );

  // Toggle Task Complete
  const toggleTaskComplete = useCallback(
    (taskId: string) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId) {
            const isNowCompleted = t.status !== 'Completed';
            const updatedStatus: TaskStatus = isNowCompleted ? 'Completed' : 'To Do';

            if (isNowCompleted) {
              // Trigger Confetti!
              try {
                confetti({
                  particleCount: 70,
                  spread: 60,
                  origin: { y: 0.75 },
                  colors: ['#2563eb', '#3b82f6', '#10b981', '#6366f1'],
                });
              } catch (e) {
                console.error(e);
              }

              showToast('Task Completed! 🎉', `"${t.title}" is marked as done.`, 'success');

              const completeNotif: NotificationItem = {
                id: 'notif-' + Date.now().toString(36),
                title: 'Task Completed',
                message: `You marked "${t.title}" as completed. Great job!`,
                type: 'completed',
                timestamp: new Date().toISOString(),
                read: false,
                taskId: t.id,
              };
              setNotifications((n) => [completeNotif, ...n]);
            } else {
              showToast('Task Reopened', `"${t.title}" moved back to To Do.`, 'info');
            }

            return {
              ...t,
              status: updatedStatus,
              completedAt: isNowCompleted ? new Date().toISOString() : undefined,
            };
          }
          return t;
        })
      );
    },
    [showToast]
  );

  // Move Task Status (For Kanban and inline moves)
  const moveTaskStatus = useCallback(
    (taskId: string, newStatus: TaskStatus) => {
      setTasks((prev) =>
        prev.map((t) => {
          if (t.id === taskId) {
            if (t.status === newStatus) return t;

            if (newStatus === 'Completed') {
              try {
                confetti({
                  particleCount: 60,
                  spread: 50,
                  origin: { y: 0.8 },
                });
              } catch (e) {
                console.error(e);
              }
            }

            return {
              ...t,
              status: newStatus,
              completedAt: newStatus === 'Completed' ? new Date().toISOString() : undefined,
            };
          }
          return t;
        })
      );

      const task = tasks.find((t) => t.id === taskId);
      showToast('Status Updated', `Moved to "${newStatus}"`, 'info');
      logActivity('moved status of', `${task?.title || 'task'} to ${newStatus}`, 'task');
    },
    [tasks, showToast, logActivity]
  );

  // Admin User CRUD
  const addUser = useCallback(
    (userData: Omit<User, 'id' | 'registeredDate' | 'totalTasks' | 'completedTasks'>) => {
      const newUser: User = {
        ...userData,
        id: 'usr-' + Date.now().toString(36),
        registeredDate: new Date().toISOString().split('T')[0],
        totalTasks: 0,
        completedTasks: 0,
      };
      setUsers((prev) => [newUser, ...prev]);
      logActivity('registered new user', newUser.name, 'user');
      showToast('User Created', `User account for ${newUser.name} created.`, 'success');
    },
    [logActivity, showToast]
  );

  const updateUser = useCallback(
    (userId: string, updates: Partial<User>) => {
      setUsers((prev) => prev.map((u) => (u.id === userId ? { ...u, ...updates } : u)));
      const targetUser = users.find((u) => u.id === userId);
      logActivity('updated account for', targetUser ? targetUser.name : userId, 'user');
      showToast('User Updated', 'Account details updated successfully.', 'info');
    },
    [users, logActivity, showToast]
  );

  const deleteUser = useCallback(
    (userId: string) => {
      const targetUser = users.find((u) => u.id === userId);
      setUsers((prev) => prev.filter((u) => u.id !== userId));
      logActivity('deleted user account', targetUser ? targetUser.name : userId, 'user');
      showToast('User Removed', 'User account permanently deleted.', 'info');
    },
    [users, logActivity, showToast]
  );

  // Notification actions
  const markNotificationRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('Notifications Marked Read', 'All notifications cleared.', 'info');
  }, [showToast]);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
    showToast('Notifications Cleared', 'Notification tray is now empty.', 'info');
  }, [showToast]);

  const unreadNotificationCount = useMemo(() => {
    return notifications.filter((n) => !n.read).length;
  }, [notifications]);

  // Today string YYYY-MM-DD
  const todayStr = useMemo(() => new Date().toISOString().split('T')[0], []);

  // Filtered tasks
  const filteredTasks = useMemo(() => {
    return tasks
      .filter((task) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = task.title.toLowerCase().includes(q);
          const matchDesc = task.description.toLowerCase().includes(q);
          const matchCategory = task.category.toLowerCase().includes(q);
          const matchTags = task.tags.some((t) => t.toLowerCase().includes(q));
          if (!matchTitle && !matchDesc && !matchCategory && !matchTags) return false;
        }

        // Category filter
        if (selectedCategory !== 'All' && task.category !== selectedCategory) {
          return false;
        }

        // Priority filter
        if (selectedPriority !== 'All' && task.priority !== selectedPriority) {
          return false;
        }

        // Status filter
        if (selectedStatus !== 'All' && task.status !== selectedStatus) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        let comp = 0;
        if (sortBy === 'dueDate') {
          comp = a.dueDate.localeCompare(b.dueDate);
        } else if (sortBy === 'priority') {
          const priorityWeights: Record<TaskPriority, number> = {
            Urgent: 4,
            High: 3,
            Medium: 2,
            Low: 1,
          };
          comp = priorityWeights[b.priority] - priorityWeights[a.priority];
        } else if (sortBy === 'createdAt') {
          comp = new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        } else if (sortBy === 'title') {
          comp = a.title.localeCompare(b.title);
        }
        return sortOrder === 'asc' ? comp : -comp;
      });
  }, [tasks, searchQuery, selectedCategory, selectedPriority, selectedStatus, sortBy, sortOrder]);

  // Computed metrics
  const stats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === 'Completed').length;
    const pending = total - completed;
    const overdue = tasks.filter(
      (t) => t.status !== 'Completed' && t.dueDate < todayStr
    ).length;
    const completionRate = total > 0 ? Math.round((completed / total) * 100) : 0;

    return { total, completed, pending, overdue, completionRate };
  }, [tasks, todayStr]);

  const todayTasks = useMemo(() => {
    return tasks.filter((t) => t.dueDate === todayStr);
  }, [tasks, todayStr]);

  const upcomingTasks = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate > todayStr && t.status !== 'Completed')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }, [tasks, todayStr]);

  const overdueTasks = useMemo(() => {
    return tasks
      .filter((t) => t.dueDate < todayStr && t.status !== 'Completed')
      .sort((a, b) => a.dueDate.localeCompare(b.dueDate));
  }, [tasks, todayStr]);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        users,
        notifications,
        activityLogs,
        unreadNotificationCount,

        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedPriority,
        setSelectedPriority,
        selectedStatus,
        setSelectedStatus,
        sortBy,
        setSortBy,
        sortOrder,
        setSortOrder,

        addTask,
        updateTask,
        deleteTask,
        duplicateTask,
        toggleTaskComplete,
        moveTaskStatus,

        addUser,
        updateUser,
        deleteUser,

        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,

        stats,
        todayTasks,
        upcomingTasks,
        overdueTasks,
        filteredTasks,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }
  return context;
};
