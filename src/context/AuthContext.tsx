import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../mock/initialData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  activeRole: UserRole;
  login: (email: string, password?: string, remember?: boolean) => boolean;
  register: (name: string, email: string, password?: string) => boolean;
  logout: () => void;
  setActiveRole: (role: UserRole) => void;
  updateProfile: (updates: Partial<User>) => void;
  switchDemoUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('taskflow_auth_user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    // Default to the first admin user (Alex Morgan)
    return INITIAL_USERS[0];
  });

  const [activeRole, setActiveRoleState] = useState<UserRole>(() => {
    const savedRole = localStorage.getItem('taskflow_active_role');
    if (savedRole === 'admin' || savedRole === 'user') return savedRole;
    return currentUser?.role || 'user';
  });

  const isAuthenticated = currentUser !== null;

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('taskflow_auth_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('taskflow_auth_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('taskflow_active_role', activeRole);
  }, [activeRole]);

  const login = (email: string, _password?: string, _remember: boolean = true) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = INITIAL_USERS.find((u) => u.email.toLowerCase() === cleanEmail);
    if (existing) {
      setCurrentUser(existing);
      setActiveRoleState(existing.role);
      return true;
    }
    // If not in initial list, log in as custom user
    const newUser: User = {
      id: 'usr-' + Date.now().toString(36),
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
      email: email.trim(),
      role: 'user',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      department: 'Productivity',
      registeredDate: new Date().toISOString().split('T')[0],
      totalTasks: 0,
      completedTasks: 0,
    };
    setCurrentUser(newUser);
    setActiveRoleState('user');
    return true;
  };

  const register = (name: string, email: string, _password?: string) => {
    const newUser: User = {
      id: 'usr-' + Date.now().toString(36),
      name: name.trim(),
      email: email.trim(),
      role: 'user',
      status: 'Active',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      department: 'Productivity',
      registeredDate: new Date().toISOString().split('T')[0],
      totalTasks: 0,
      completedTasks: 0,
    };
    setCurrentUser(newUser);
    setActiveRoleState('user');
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('taskflow_auth_user');
  };

  const setActiveRole = (role: UserRole) => {
    setActiveRoleState(role);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
  };

  const switchDemoUser = (userId: string) => {
    const user = INITIAL_USERS.find((u) => u.id === userId);
    if (user) {
      setCurrentUser(user);
      setActiveRoleState(user.role);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated,
        activeRole,
        login,
        register,
        logout,
        setActiveRole,
        updateProfile,
        switchDemoUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
