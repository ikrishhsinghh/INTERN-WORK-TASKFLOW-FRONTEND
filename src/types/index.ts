export type TaskPriority = 'Low' | 'Medium' | 'High' | 'Urgent';
export type TaskStatus = 'To Do' | 'In Progress' | 'In Review' | 'Completed';
export type TaskCategory = 'Development' | 'Design' | 'Marketing' | 'Research' | 'Operations' | 'Productivity';

export interface Task {
  id: string;
  title: string;
  description: string;
  category: TaskCategory;
  priority: TaskPriority;
  status: TaskStatus;
  dueDate: string; // YYYY-MM-DD
  dueTime?: string; // HH:mm
  tags: string[];
  createdAt: string; // ISO date string
  completedAt?: string; // ISO date string
  ownerId: string;
  ownerName: string;
  assignedTo?: string;
  estimatedHours?: number;
}

export type UserRole = 'admin' | 'user';
export type UserAccountStatus = 'Active' | 'Inactive' | 'Suspended';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserAccountStatus;
  avatar: string;
  department: string;
  registeredDate: string; // YYYY-MM-DD
  totalTasks: number;
  completedTasks: number;
  phone?: string;
  bio?: string;
}

export type NotificationType = 'deadline' | 'overdue' | 'created' | 'completed' | 'system';

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  timestamp: string; // ISO string
  read: boolean;
  taskId?: string;
  link?: string;
}

export interface ActivityLog {
  id: string;
  timestamp: string;
  actor: string;
  actorAvatar?: string;
  action: string;
  target: string;
  type: 'task' | 'user' | 'auth' | 'system';
  ipAddress?: string;
}

export interface CategoryInfo {
  id: string;
  name: TaskCategory;
  color: string;
  bgLight: string;
  bgDark: string;
  borderLight: string;
  borderDark: string;
  description: string;
}

export interface PriorityInfo {
  level: TaskPriority;
  label: string;
  color: string;
  bgLight: string;
  bgDark: string;
  slaHours: number;
}

export type CalendarViewMode = 'month' | 'week' | 'day';

export interface UserPreferences {
  theme: 'light' | 'dark';
  defaultView: 'overview' | 'tasks' | 'kanban' | 'calendar';
  emailAlerts: boolean;
  deadlineReminders: boolean;
  weeklyReport: boolean;
  dateFormat: 'YYYY-MM-DD' | 'MM/DD/YYYY' | 'DD/MM/YYYY';
  timeFormat: '12h' | '24h';
}
