# TASKFLOW — Modern Productivity & Task Management SaaS
**Designed & Developed by Internship Team G7**

A complete, premium-quality, modern, and professional frontend web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Vite**, taking UI/UX inspiration from the Spike SaaS dashboard architecture.

---

## 🌟 Key Highlights & Features

### 1. Dual Application Experience
- **User Dashboard**: Personalized productivity workstation with active sprint metrics, task queues, deadline warnings, and quick-add actions.
- **Enterprise Admin Console**: Complete organization-wide governance, user account management (Activate / Suspend / Delete), master task registry, audit logs, SLA frameworks, and system health controls.
- **One-Click Role Switching**: Seamlessly toggle between **User Mode** and **Admin Mode** directly from the header badge or user menu.

### 2. Complete Task Management Module
- **Full Task Lifecycle (CRUD)**: Create, View Details, Edit, Duplicate, Reopen, and Delete (with confirmation dialog).
- **Comprehensive Fields**: Title, Description, Category, Priority (*Low*, *Medium*, *High*, *Urgent*), Due Date, Due Time, Status (*To Do*, *In Progress*, *In Review*, *Completed*), Tags, and Assignee.
- **Advanced Table**: Multi-parameter search, sorting, category/priority/status filters, pagination, and one-click **CSV Export**.

### 3. Interactive Calendar View (3 Viewing Modes)
- **Monthly View**: Full month grid with scheduled task pills, status color legend, and click-to-add for any calendar date.
- **Weekly View**: 7-day breakdown with time slots and clear visual deadline flags.
- **Daily View**: Hour-by-hour agenda view with scheduled task cards and quick task creation.
- **Navigation Controls**: Month/Week/Day toggle, *Today* shortcut, and previous/next period controls.

### 4. Polished Kanban Board (Drag & Drop)
- **4 Workflow Stages**: *To Do*, *In Progress*, *In Review*, and *Completed*.
- **Drag-and-Drop**: Drag task cards between columns with immediate real-time synchronization across all pages, task lists, and analytics.
- **Micro-Interactions**: Celebratory confetti effects and toast notifications when moving tasks to *Completed*.
- **Board Controls**: Real-time card filtering by priority and category, and live search.

### 5. Application-wide Dark & Light Mode
- True system-wide theme toggle supporting both crisp light surfaces and deep dark charcoal palettes with comfortable WCAG AA contrast.
- Persistent theme preference saved in `localStorage`.

### 6. Productivity Analytics & Data Visualization
- **Velocity Trends**: Weekly task creation vs. completion trend chart.
- **Distribution Donut**: Proportional breakdown across workflow states.
- **Priority Urgency Matrix**: Workload allocation by severity level.
- **Category Benchmarks**: Throughput per department (Development, Design, Marketing, etc.).

### 7. Notification Centre
- Live header notification bell with unread badge counter.
- Interactive dropdown + dedicated notification management page.
- Categorized alerts: Overdue warnings, deadline reminders, task assignments, and system releases.
- Bulk actions: *Mark All Read* and *Clear Notifications*.

### 8. User Profile & Preferences
- Profile info, department assignment, and password change form.
- Application preferences (theme, default view, notification alerts, time format).
- Danger Zone: Safe account deletion confirmation dialog.

### 9. Enterprise Admin Suite
- **Admin Overview**: High-level KPI statistics, user registration growth chart, workflow distribution, and recent activity.
- **User Management**: User directory with status toggles (*Active*, *Inactive*, *Suspended*), role assignment, and edit/delete modals.
- **Master Task Registry**: Inspect and manage every employee's tasks across the organization.
- **Reports & Data Exports**: Export structured CSV reports and raw JSON backups with a single click.
- **Activity Audit Logs**: Cryptographically timestamped operational log tracking actor actions, mutated targets, and client IPs.
- **Categories & SLA Policies**: Configure organizational categories, priority labels, and resolution SLA deadlines.

### 10. Minimal Branding & Team Identification
- Includes the provided **TASKFLOW logo** for the browser favicon, auth pages, sidebar, and header.
- Includes the **Internship Team G7 logo** in the minimal, professional footer:
  > *"A smarter way to organise tasks and manage productivity."*  
  > *"Designed & Developed by Internship Team G7."*  
  > *"© 2026 TASKFLOW | Internship Team G7. All Rights Reserved."*

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ or v24+)
- npm or pnpm

### Installation
```bash
# Clone or navigate to the directory
cd TASKFLOW

# Install dependencies
npm install

# Run Vite development server
npm run dev
```

### Production Build & Preview
```bash
# Build production bundle
npm run build

# Preview production build locally
npm run preview
```
Open **`http://localhost:5173`** in your browser.

---

## 👥 Demo Test Accounts

You can test both the User and Admin experiences instantly:

| Role | Name | Email | Password |
|---|---|---|---|
| **Admin** | Alex Morgan | `alex.morgan@taskflow.io` | *Any password or use Quick Login button* |
| **Workspace Member** | Sarah Chen | `sarah.chen@taskflow.io` | *Any password or use Quick Login button* |

> *Tip: On the Login page, click the **Admin** or **Member** quick test button to sign in with one click.*

---

## 🛠️ Technology Stack
- **Framework:** React 19 + TypeScript
- **Bundler & Dev Server:** Vite 8
- **Styling:** Tailwind CSS v4
- **Icons:** Lucide React (100% SVG, Zero Emojis)
- **Effects:** Canvas Confetti for task completion celebration
- **Storage:** Browser `localStorage` for offline persistence and state broadcasting
