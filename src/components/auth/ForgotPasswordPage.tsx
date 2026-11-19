import React, { useState } from 'react';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { taskflowLogo } from '../../assets/branding';

interface ForgotPasswordPageProps {
  onNavigateToLogin: () => void;
}

export const ForgotPasswordPage: React.FC<ForgotPasswordPageProps> = ({
  onNavigateToLogin,
}) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid email address');
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F4F6FA] dark:bg-[#0F172A] transition-colors">
      <div className="max-w-md w-full space-y-6">
        {/* Brand Logo Header */}
        <div className="text-center">
          <div className="flex justify-center mb-2">
            <img
              src={taskflowLogo}
              alt="TASKFLOW"
              className="h-16 w-auto object-contain drop-shadow-xs"
            />
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Reset Password
          </h2>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Enter your email to receive recovery instructions
          </p>
        </div>

        {/* Card */}
        <div className="spike-card p-8 bg-white dark:bg-[#1E2530]">
          {submitted ? (
            <div className="text-center py-4 space-y-3">
              <div className="w-12 h-12 rounded-full bg-[#E6FFFA] text-[#13DEB9] mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recovery Link Sent
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Instructions have been dispatched to <strong>{email}</strong>.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onNavigateToLogin}
                  className="w-full py-2.5 px-4 bg-[#5D87FF] hover:bg-[#4570EA] text-white text-xs font-bold rounded-xl transition-colors shadow-xs"
                >
                  Return to Sign In
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 rounded-xl bg-[#FDEEEB] border border-[#FA896B]/30 text-xs text-[#FA896B] font-semibold">
                  {error}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@taskflow.io"
                    className="w-full pl-10 pr-4 py-2 bg-[#F4F6FA] dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:outline-hidden focus:border-[#5D87FF]"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 bg-[#5D87FF] hover:bg-[#4570EA] active:scale-98 text-white text-sm font-bold rounded-xl shadow-md shadow-[#5D87FF]/25 transition-all disabled:opacity-50"
              >
                {isLoading ? 'Submitting...' : 'Send Reset Link'}
              </button>
            </form>
          )}
        </div>

        {/* Back Link */}
        <div className="text-center">
          <button
            onClick={onNavigateToLogin}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
          </button>
        </div>
      </div>
    </div>
  );
};
