import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  FolderKanban, 
  PlusCircle, 
  Globe, 
  LogOut, 
  Database, 
  CheckCircle2, 
  AlertTriangle,
  UserCheck,
  ShieldAlert
} from 'lucide-react';

export const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut, isConfigured, isDevAdmin } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = async () => {
    await signOut();
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Projects Manager', path: '/admin/projects', icon: FolderKanban },
    { name: 'Add New Project', path: '/admin/projects/new', icon: PlusCircle },
  ];

  return (
    <div className="min-h-screen bg-black text-neutral-100 flex flex-col selection:bg-gold-500/30 selection:text-gold-200">
      
      {/* Top Admin Navigation Header */}
      <header className="sticky top-0 z-50 bg-dark-950/95 border-b border-white/[0.08] backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Brand Logo & Area Badge */}
          <div className="flex items-center gap-4">
            <Link to="/admin/projects" className="flex items-center gap-2 group">
              <span className="w-8 h-8 rounded-lg bg-gold-500/15 border border-gold-400/30 flex items-center justify-center text-gold-400 font-bold text-sm shadow-[0_0_15px_rgba(198,164,119,0.2)]">
                T
              </span>
              <div className="flex flex-col">
                <span className="font-heading text-sm font-bold text-white group-hover:text-gold-200 transition-colors">
                  TALHA PORTFOLIO
                </span>
                <span className="text-[10px] font-mono tracking-wider text-gold-400 uppercase">
                  Admin Dashboard
                </span>
              </div>
            </Link>

            {/* Supabase Connection Status Badge */}
            <div className="hidden md:flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono border backdrop-blur-md">
              {isConfigured ? (
                <div className="flex items-center gap-1.5 text-emerald-400 border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                  <Database className="w-3 h-3 text-emerald-400" />
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Supabase DB & Storage Connected</span>
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-amber-300 border-amber-500/30 bg-amber-500/10 px-2 py-0.5 rounded-full" title="To connect real Supabase database, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env">
                  <AlertTriangle className="w-3 h-3 text-amber-400" />
                  <span>Dev Mode (Awaiting .env Supabase keys)</span>
                </div>
              )}
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-2 sm:gap-4">
            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      isActive
                        ? 'bg-gold-500/20 text-gold-300 border border-gold-500/40 shadow-[0_0_15px_rgba(198,164,119,0.15)]'
                        : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                    }`}
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">{item.name}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="h-5 w-[1px] bg-white/[0.08] mx-1" />

            {/* Link to public website */}
            <Link
              to="/projects"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-zinc-400 hover:text-white hover:bg-white/[0.04] transition-colors"
              title="Open public portfolio in new tab"
            >
              <Globe className="w-3.5 h-3.5 text-gold-400" />
              <span className="hidden md:inline">View Public Site</span>
            </Link>

            {/* Current user & Logout */}
            <div className="flex items-center gap-2 pl-2">
              <span className="hidden lg:inline text-[11px] font-mono text-zinc-400 max-w-[140px] truncate" title={user?.email || 'Admin'}>
                {user?.email || 'Admin'}
              </span>
              <button
                onClick={handleSignOut}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/20 text-xs font-semibold transition-all"
                title="Sign out of Admin Dashboard"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

          </div>

        </div>
      </header>

      {/* Main Admin View Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {children}
      </main>

      {/* Slim Admin Footer */}
      <footer className="border-t border-white/[0.06] bg-dark-950 py-4 text-center text-xs text-zinc-400">
        <p>Talha Portfolio Administration Suite • Protected Environment</p>
      </footer>

    </div>
  );
};
