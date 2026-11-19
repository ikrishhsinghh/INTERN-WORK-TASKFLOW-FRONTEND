import { Task, User, NotificationItem, ActivityLog } from '../types';

// Helper to format date YYYY-MM-DD
export const getRelativeDate = (offsetDays: number): string => {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
};

export const INITIAL_USERS: User[] = [
  {
    id: 'usr-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@taskflow.io',
    role: 'admin',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'Product & Engineering',
    registeredDate: '2026-01-15',
    totalTasks: 18,
    completedTasks: 12,
    phone: '+1 (555) 234-5678',
    bio: 'Lead Full-stack Architect at TaskFlow G7. Passionate about high performance web apps.'
  },
  {
    id: 'usr-2',
    name: 'Sarah Chen',
    email: 'sarah.chen@taskflow.io',
    role: 'user',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'Product Design',
    registeredDate: '2026-02-01',
    totalTasks: 14,
    completedTasks: 9,
    phone: '+1 (555) 345-6789',
    bio: 'Senior UI/UX Specialist crafting accessible SaaS interfaces.'
  },
  {
    id: 'usr-3',
    name: 'David Miller',
    email: 'david.m@taskflow.io',
    role: 'user',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Backend Infrastructure',
    registeredDate: '2026-02-12',
    totalTasks: 11,
    completedTasks: 7,
    phone: '+1 (555) 456-7890',
    bio: 'Cloud Systems Engineer optimizing microservice latency and uptime.'
  },
  {
    id: 'usr-4',
    name: 'Elena Rostova',
    email: 'elena.r@taskflow.io',
    role: 'user',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    department: 'Growth & Marketing',
    registeredDate: '2026-03-04',
    totalTasks: 9,
    completedTasks: 6,
    bio: 'Growth Marketer focused on customer retention and onboarding journeys.'
  },
  {
    id: 'usr-5',
    name: 'Marcus Vance',
    email: 'marcus.v@taskflow.io',
    role: 'user',
    status: 'Inactive',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Quality Assurance',
    registeredDate: '2026-03-10',
    totalTasks: 6,
    completedTasks: 2,
    bio: 'Automation QA Engineer testing end-to-end user workflows.'
  },
  {
    id: 'usr-6',
    name: 'Jessica Taylor',
    email: 'jessica.t@taskflow.io',
    role: 'user',
    status: 'Suspended',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    department: 'Data Analytics',
    registeredDate: '2026-03-18',
    totalTasks: 4,
    completedTasks: 1,
    bio: 'Data Scientist building analytics and predictive models.'
  }
];

export const INITIAL_TASKS: Task[] = [
  {
    id: 'tsk-101',
    title: 'Design System Token Unification',
    description: 'Harmonize semantic color tokens, typography scales, and corner radii between light and dark themes in Figma.',
    category: 'Design',
    priority: 'High',
    status: 'In Progress',
    dueDate: getRelativeDate(0), // Today
    dueTime: '15:30',
    tags: ['Figma', 'UI Kit', 'Spike Pro'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Sarah Chen',
    estimatedHours: 6
  },
  {
    id: 'tsk-102',
    title: 'Kanban Column Drag & Drop Reordering',
    description: 'Implement drag preview states, drop indicator lines, and smooth column transitions for task status workflow.',
    category: 'Development',
    priority: 'Urgent',
    status: 'In Progress',
    dueDate: getRelativeDate(0), // Today
    dueTime: '18:00',
    tags: ['Frontend', 'Kanban', 'UX'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 8
  },
  {
    id: 'tsk-103',
    title: 'Audit Postgres Indexing on Task Queries',
    description: 'Analyze slow query logs on task filtering by status and due date. Add compound composite indexes to reduce latency.',
    category: 'Operations',
    priority: 'Medium',
    status: 'To Do',
    dueDate: getRelativeDate(1), // Tomorrow
    dueTime: '12:00',
    tags: ['Database', 'Optimization', 'PostgreSQL'],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'David Miller',
    estimatedHours: 4
  },
  {
    id: 'tsk-104',
    title: 'Implement Dark Mode Contrast Compliance',
    description: 'Ensure all card borders, text elements, and chart tooltips meet WCAG AA contrast ratios in dark mode surfaces.',
    category: 'Productivity',
    priority: 'High',
    status: 'In Review',
    dueDate: getRelativeDate(2),
    dueTime: '16:00',
    tags: ['Accessibility', 'Dark Mode', 'CSS'],
    createdAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Sarah Chen',
    estimatedHours: 5
  },
  {
    id: 'tsk-105',
    title: 'User Onboarding Flow Redesign',
    description: 'Draft interactive product tour guiding new workspace members through task creation, calendar scheduling, and team boards.',
    category: 'Marketing',
    priority: 'Medium',
    status: 'To Do',
    dueDate: getRelativeDate(3),
    dueTime: '14:00',
    tags: ['Growth', 'Onboarding', 'Conversion'],
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Elena Rostova',
    estimatedHours: 10
  },
  {
    id: 'tsk-106',
    title: 'Setup SLA Monitoring & Overdue Alerts',
    description: 'Build automated email and in-app triggers notifying managers when high or urgent priority tasks exceed their due deadline.',
    category: 'Operations',
    priority: 'Urgent',
    status: 'To Do',
    dueDate: getRelativeDate(-1), // Overdue!
    dueTime: '10:00',
    tags: ['SLA', 'Notifications', 'Backend'],
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 6
  },
  {
    id: 'tsk-107',
    title: 'Interactive Productivity Velocity Charts',
    description: 'Integrate dynamic weekly and monthly velocity charts showing tasks completed, backlog burn-down, and department benchmarks.',
    category: 'Development',
    priority: 'High',
    status: 'Completed',
    dueDate: getRelativeDate(-2),
    dueTime: '17:00',
    tags: ['Analytics', 'Charts', 'Recharts'],
    createdAt: new Date(Date.now() - 86400000 * 6).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 12
  },
  {
    id: 'tsk-108',
    title: 'Security Audit & Role-Based Access Controls',
    description: 'Verify admin permissions boundary: regular users cannot alter system categories or access global user modification actions.',
    category: 'Operations',
    priority: 'Urgent',
    status: 'Completed',
    dueDate: getRelativeDate(-3),
    dueTime: '11:00',
    tags: ['Security', 'RBAC', 'Auth'],
    createdAt: new Date(Date.now() - 86400000 * 7).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 7
  },
  {
    id: 'tsk-109',
    title: 'Mobile Calendar View Touch Navigation',
    description: 'Optimize weekly and daily calendar views for touch screens with responsive horizontal date switching and swipeable days.',
    category: 'Development',
    priority: 'Low',
    status: 'To Do',
    dueDate: getRelativeDate(4),
    dueTime: '13:00',
    tags: ['Mobile', 'Calendar', 'Responsive'],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 6
  },
  {
    id: 'tsk-110',
    title: 'Q4 Product Roadmap Presentation',
    description: 'Prepare executive slide deck highlighting TASKFLOW feature delivery, customer satisfaction scores, and G7 team milestones.',
    category: 'Research',
    priority: 'Medium',
    status: 'In Review',
    dueDate: getRelativeDate(2),
    dueTime: '15:00',
    tags: ['Roadmap', 'Executive', 'G7 Team'],
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Elena Rostova',
    estimatedHours: 5
  },
  {
    id: 'tsk-111',
    title: 'Export Reports to CSV and PDF Data Pipeline',
    description: 'Allow administrators and managers to download filtered task logs and productivity reports in structured format.',
    category: 'Development',
    priority: 'Low',
    status: 'Completed',
    dueDate: getRelativeDate(-4),
    dueTime: '18:00',
    tags: ['Export', 'Reports', 'CSV'],
    createdAt: new Date(Date.now() - 86400000 * 8).toISOString(),
    completedAt: new Date(Date.now() - 86400000 * 4).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'David Miller',
    estimatedHours: 4
  },
  {
    id: 'tsk-112',
    title: 'Notification Centre Real-time Toast Sync',
    description: 'Ensure notification badges update dynamically across active browser tabs when a task status changes.',
    category: 'Productivity',
    priority: 'Medium',
    status: 'In Progress',
    dueDate: getRelativeDate(0), // Today
    dueTime: '19:30',
    tags: ['Notifications', 'WebSockets', 'Frontend'],
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    ownerId: 'usr-1',
    ownerName: 'Alex Morgan',
    assignedTo: 'Alex Morgan',
    estimatedHours: 5
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Task Overdue Warning',
    message: '"Setup SLA Monitoring & Overdue Alerts" passed its scheduled deadline.',
    type: 'overdue',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    read: false,
    taskId: 'tsk-106'
  },
  {
    id: 'notif-2',
    title: 'Upcoming Deadline Today',
    message: '"Design System Token Unification" is due today at 15:30.',
    type: 'deadline',
    timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    read: false,
    taskId: 'tsk-101'
  },
  {
    id: 'notif-3',
    title: 'Task Marked Completed',
    message: 'Alex Morgan completed "Security Audit & Role-Based Access Controls".',
    type: 'completed',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    read: true,
    taskId: 'tsk-108'
  },
  {
    id: 'notif-4',
    title: 'Task Assigned',
    message: 'You were assigned to "Kanban Column Drag & Drop Reordering".',
    type: 'created',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    read: true,
    taskId: 'tsk-102'
  },
  {
    id: 'notif-5',
    title: 'System Update Completed',
    message: 'TASKFLOW v2.4 successfully deployed by Internship Team G7.',
    type: 'system',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    read: true
  }
];

export const INITIAL_ACTIVITY_LOGS: ActivityLog[] = [
  {
    id: 'log-1',
    timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    actor: 'Alex Morgan',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'updated status of',
    target: 'Design System Token Unification to In Progress',
    type: 'task',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-2',
    timestamp: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    actor: 'Sarah Chen',
    actorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    action: 'submitted for review',
    target: 'Implement Dark Mode Contrast Compliance',
    type: 'task',
    ipAddress: '192.168.1.112'
  },
  {
    id: 'log-3',
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
    actor: 'David Miller',
    actorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    action: 'completed task',
    target: 'Export Reports to CSV and PDF Data Pipeline',
    type: 'task',
    ipAddress: '192.168.1.125'
  },
  {
    id: 'log-4',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    actor: 'Alex Morgan (Admin)',
    actorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    action: 'activated account for',
    target: 'Elena Rostova (Growth & Marketing)',
    type: 'user',
    ipAddress: '192.168.1.104'
  },
  {
    id: 'log-5',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    actor: 'System Automation',
    action: 'executed scheduled audit',
    target: 'Weekly Task Velocity and SLA Health Check',
    type: 'system',
    ipAddress: '127.0.0.1'
  }
];
