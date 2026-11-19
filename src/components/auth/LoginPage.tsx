import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, ShieldCheck, UserCheck, CheckCircle2, TrendingUp, Sparkles, Calendar, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { taskflowLogo, taskflowIcon } from '../../assets/branding';

interface LoginPageProps {
  onNavigateToRegister: () => void;
  onNavigateToForgot: () => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({
  onNavigateToRegister,
  onNavigateToForgot,
}) => {
  const { login } = useAuth();
  const [email, setEmail] = useState('alex.morgan@taskflow.io');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your email address');
      return;
    }
    if (!password) {
      setError('Please enter your password');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      login(email, password, rememberMe);
      setIsLoading(false);
    }, 300);
  };

  const handleQuickLogin = (demoEmail: string) => {
    setEmail(demoEmail);
    setPassword('demopassword123');
    login(demoEmail, 'demopassword123', true);
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-[#1E2530] text-slate-900 dark:text-slate-100 transition-colors">
      {/* ================= LEFT SHOWCASE PANEL (Spike Auth1 Signature) ================= */}
      <div className="hidden lg:flex lg:w-[56%] xl:w-[58%] bg-[#F2F6FA] dark:bg-[#111C2D] border-r border-[#EEF2F6] dark:border-slate-800 p-10 xl:p-14 flex-col justify-between relative overflow-hidden select-none">
        {/* Subtle background decorative circle */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#5D87FF]/5 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-[#49BEFF]/5 blur-3xl pointer-events-none" />

        {/* Top: Brand Logo */}
        <div className="flex items-center gap-3 relative z-10">
          <img
            src={taskflowIcon}
            alt="TASKFLOW"
            className="w-10 h-10 rounded-xl object-contain shadow-xs"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-2xl tracking-tight text-slate-900 dark:text-white">
                TASKFLOW
              </span>
              <span className="text-[10px] font-bold bg-[#ECF2FF] text-[#5D87FF] dark:bg-blue-950/60 dark:text-blue-300 px-2 py-0.5 rounded-md">
                PRO SaaS
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-400">
              Designed & Developed by Internship Team G7
            </p>
          </div>
        </div>

        {/* Center: SaaS Product Showcase Card */}
        <div className="my-auto py-10 relative z-10 max-w-xl mx-auto w-full space-y-8">
          {/* Mock Dashboard Preview Widget */}
          <div className="bg-white dark:bg-[#1E2530] rounded-2xl p-6 border border-[#EEF2F6] dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-[#EEF2F6] dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#ECF2FF] text-[#5D87FF] flex items-center justify-center font-bold">
                  <TrendingUp className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100">
                    Sprint 4 Delivery Velocity
                  </h4>
                  <p className="text-[10px] text-slate-400">Team G7 Workspace</p>
                </div>
              </div>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E6FFFA] text-[#13DEB9]">
                94.2% On-Time
              </span>
            </div>

            {/* Micro-metrics Grid */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-xl bg-[#F4F6FA] dark:bg-slate-800/60">
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Total Tasks</span>
                <span className="text-lg font-extrabold text-slate-900 dark:text-slate-100">18 Active</span>
              </div>
              <div className="p-3 rounded-xl bg-[#E6FFFA]/50 dark:bg-emerald-950/30">
                <span className="text-[10px] font-bold uppercase text-[#13DEB9] block">Completed</span>
                <span className="text-lg font-extrabold text-[#13DEB9]">12 Resolved</span>
              </div>
              <div className="p-3 rounded-xl bg-[#ECF2FF]/60 dark:bg-blue-950/30">
                <span className="text-[10px] font-bold uppercase text-[#5D87FF] block">Backlog</span>
                <span className="text-lg font-extrabold text-[#5D87FF]">5 In Flow</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>Milestone Progress</span>
                <span className="text-slate-800 dark:text-slate-200">78% Complete</span>
              </div>
              <div className="w-full h-2.5 bg-[#F4F6FA] dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-[#5D87FF] to-[#13DEB9] rounded-full w-[78%]" />
              </div>
            </div>

            {/* Feature Pills */}
            <div className="flex items-center justify-between text-xs pt-1 text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#13DEB9]" /> Kanban Board
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#5D87FF]" /> 3-Mode Calendar
              </span>
              <span className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-[#FFAE1F]" /> Enterprise Admin
              </span>
            </div>
          </div>

          {/* Marketing Copy */}
          <div className="space-y-3">
            <h2 className="text-2xl xl:text-3xl font-extrabold text-slate-900 dark:text-white leading-tight">
              A smarter way to organise tasks and manage productivity.
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              TASKFLOW provides modern engineering and product teams with visual Kanban workflows, calendar timelines, and automated SLA tracking built with production SaaS standards.
            </p>
          </div>
        </div>

        {/* Bottom Left Footer */}
        <div className="text-xs text-slate-400 font-medium relative z-10">
          © 2026 TASKFLOW | Internship Team G7. All Rights Reserved.
        </div>
      </div>

      {/* ================= RIGHT FORM PANEL (Spike Auth1 Login Form) ================= */}
      <div className="w-full lg:w-[44%] xl:w-[42%] flex flex-col justify-center px-6 sm:px-12 xl:px-16 py-12 bg-white dark:bg-[#1E2530] overflow-y-auto">
        <div className="max-w-md w-full mx-auto space-y-6">
          {/* Mobile Header Logo */}
          <div className="lg:hidden flex justify-center mb-2">
            <img
              src={taskflowLogo}
              alt="TASKFLOW"
              className="h-14 w-auto object-contain"
            />
          </div>

          {/* Title Header */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Welcome to TASKFLOW
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Your Admin & Team Productivity Workspace
            </p>
          </div>

          {/* Social Auth Buttons (Spike Auth1 Signature) */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => handleQuickLogin('alex.morgan@taskflow.io')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#F4F6FA] dark:hover:bg-slate-750 transition-colors text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              onClick={() => handleQuickLogin('sarah.chen@taskflow.io')}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-[#F4F6FA] dark:hover:bg-slate-750 transition-colors text-xs font-bold text-slate-700 dark:text-slate-200 shadow-2xs"
            >
              <svg className="w-4 h-4 fill-current text-slate-800 dark:text-white" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center my-4">
            <div className="border-t border-[#EEF2F6] dark:border-slate-800 w-full" />
            <span className="bg-white dark:bg-[#1E2530] px-3 text-xs text-slate-400 font-semibold absolute">
              or sign in with email
            </span>
          </div>

          {/* Error Message */}
          {error && (
            <div className="p-3 rounded-xl bg-[#FDEEEB] border border-[#FA896B]/30 text-xs text-[#FA896B] font-bold">
              {error}
            </div>
          )}

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                Work Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@taskflow.io"
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[#5D87FF] focus:ring-2 focus:ring-[#5D87FF]/15 transition-all"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  Password
                </label>
                <button
                  type="button"
                  onClick={onNavigateToForgot}
                  className="text-xs font-bold text-[#5D87FF] hover:underline"
                >
                  Forgot Password?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-10 py-2.5 bg-transparent border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-hidden focus:border-[#5D87FF] focus:ring-2 focus:ring-[#5D87FF]/15 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-3 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="remember-device"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 rounded border-slate-300 text-[#5D87FF] focus:ring-[#5D87FF]"
              />
              <label
                htmlFor="remember-device"
                className="ml-2 block text-xs text-slate-600 dark:text-slate-400 font-medium cursor-pointer"
              >
                Remember this device
              </label>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#5D87FF] hover:bg-[#4570EA] active:scale-98 text-white text-sm font-bold rounded-xl shadow-md shadow-[#5D87FF]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                'Authenticating...'
              ) : (
                <>
                  Sign In <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Access Switchers */}
          <div className="pt-4 border-t border-[#EEF2F6] dark:border-slate-800">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block text-center mb-2">
              Instant 1-Click Evaluation Logins
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                type="button"
                onClick={() => handleQuickLogin('alex.morgan@taskflow.io')}
                className="p-2.5 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-[#F4F6FA] dark:bg-slate-800/60 hover:border-[#5D87FF] text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#5D87FF]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#5D87FF]" />
                  Admin Portal
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">Alex Morgan (Admin)</div>
              </button>

              <button
                type="button"
                onClick={() => handleQuickLogin('sarah.chen@taskflow.io')}
                className="p-2.5 rounded-xl border border-[#EEF2F6] dark:border-slate-700 bg-[#F4F6FA] dark:bg-slate-800/60 hover:border-[#13DEB9] text-left transition-all group"
              >
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white group-hover:text-[#13DEB9]">
                  <UserCheck className="w-3.5 h-3.5 text-[#13DEB9]" />
                  Member View
                </div>
                <div className="text-[10px] text-slate-400 mt-0.5 truncate">Sarah Chen (UI/UX)</div>
              </button>
            </div>
          </div>

          {/* Register Link */}
          <div className="text-center text-xs text-slate-500 pt-2">
            New to TASKFLOW?{' '}
            <button
              onClick={onNavigateToRegister}
              className="font-bold text-[#5D87FF] hover:underline"
            >
              Create an account
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
