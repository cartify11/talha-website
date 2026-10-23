import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Lock, Mail, KeyRound, Loader2, ArrowRight, ShieldCheck, Database, Info } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [showConfigGuide, setShowConfigGuide] = useState<boolean>(false);

  const { signIn, user, isConfigured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const destination = (location.state as any)?.from?.pathname || '/admin/projects';

  useEffect(() => {
    if (user) {
      navigate(destination, { replace: true });
    }
  }, [user, navigate, destination]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const { error } = await signIn(email, password);
      if (error) {
        setErrorMsg(error);
      } else {
        navigate(destination, { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col justify-center items-center px-4 relative overflow-hidden selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* Cinematic Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gold-500/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-gold-400/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-md">
        
        {/* Header Branding */}
        <div className="text-center mb-8 space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-gold-500/20 to-dark-900 border border-gold-500/40 shadow-[0_0_30px_rgba(198,164,119,0.25)] text-gold-400 mb-2">
            <Lock className="w-6 h-6" />
          </div>
          <h1 className="font-heading text-3xl font-bold tracking-tight text-white">
            Talha Portfolio Admin
          </h1>
          <p className="text-sm text-zinc-400">
            Secure authentication portal to manage live projects & case studies.
          </p>
        </div>

        {/* Login Card */}
        <div className="rounded-3xl p-8 sm:p-9 bg-dark-950/90 border border-white/[0.1] shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_25px_rgba(198,164,119,0.12)] backdrop-blur-xl">
          
          {errorMsg && (
            <div className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-3">
              <span className="w-2 h-2 rounded-full bg-red-400 mt-1 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Administrator Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@talha.dev"
                  className="w-full pl-10 pr-4 py-3 bg-dark-900/80 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all font-sans"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center justify-between">
                <span>Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-zinc-500">
                  <KeyRound className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 bg-dark-900/80 border border-white/[0.1] focus:border-gold-500/60 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:ring-1 focus:ring-gold-500/50 transition-all font-mono"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 px-4 rounded-xl bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all duration-300 shadow-[0_4px_20px_rgba(198,164,119,0.3)] hover:shadow-[0_4px_25px_rgba(198,164,119,0.45)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Connection Status Helper */}
          <div className="mt-6 pt-5 border-t border-white/[0.06] text-xs">
            {isConfigured ? (
              <div className="flex items-center gap-2 text-emerald-400 font-mono text-[11px]">
                <Database className="w-3.5 h-3.5 text-emerald-400" />
                <span>Supabase Database connection is active.</span>
              </div>
            ) : (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-amber-300 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5" />
                    <span>Supabase keys not yet set in .env</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowConfigGuide(!showConfigGuide)}
                    className="text-gold-400 hover:underline font-semibold"
                  >
                    {showConfigGuide ? 'Hide Guide' : 'Setup Guide'}
                  </button>
                </div>

                {showConfigGuide && (
                  <div className="p-3 rounded-lg bg-dark-900 border border-white/[0.08] text-[11px] text-zinc-300 space-y-1.5 leading-relaxed">
                    <p className="text-gold-300 font-semibold">Development Mode Active:</p>
                    <p>
                      You can enter any email (e.g. <code>m.talha204567@gmail.com</code>) and password right now to explore and test the dashboard!
                    </p>
                    <p className="text-zinc-400">
                      To connect your live Supabase project, execute <code>supabase/schema.sql</code> in your Supabase SQL editor and add your <code>VITE_SUPABASE_URL</code> & <code>VITE_SUPABASE_ANON_KEY</code> to <code>.env</code>.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-zinc-500 hover:text-gold-300 transition-colors"
          >
            ← Return to Public Portfolio
          </a>
        </div>

      </div>
    </div>
  );
};
