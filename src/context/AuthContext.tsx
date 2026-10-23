import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isConfigured: boolean;
  signIn: (email: string, password: string) => Promise<{ error: string | null }>;
  signOut: () => Promise<void>;
  isDevAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEV_AUTH_STORAGE_KEY = 'talha_portfolio_admin_auth';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDevAdmin, setIsDevAdmin] = useState<boolean>(false);
  const configured = isSupabaseConfigured();

  useEffect(() => {
    if (configured) {
      // Real Supabase session management
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setIsLoading(false);
      });

      return () => subscription.unsubscribe();
    } else {
      // Development mode when Supabase credentials are not yet entered into .env
      const localAuth = localStorage.getItem(DEV_AUTH_STORAGE_KEY);
      if (localAuth) {
        try {
          const parsed = JSON.parse(localAuth);
          if (parsed && parsed.email) {
            setUser({
              id: 'dev-admin-id',
              email: parsed.email,
              app_metadata: {},
              user_metadata: { role: 'admin', name: 'Talha Admin' },
              aud: 'authenticated',
              created_at: new Date().toISOString(),
            } as User);
            setIsDevAdmin(true);
          }
        } catch {
          localStorage.removeItem(DEV_AUTH_STORAGE_KEY);
        }
      }
      setIsLoading(false);
    }
  }, [configured]);

  const signIn = async (email: string, password: string): Promise<{ error: string | null }> => {
    if (!email || !password) {
      return { error: 'Please provide both email and password.' };
    }

    if (configured) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { error: error.message };
      }

      setSession(data.session);
      setUser(data.user);
      return { error: null };
    } else {
      // Local dev authentication fallback
      // Allows user to test the dashboard directly while setting up their Supabase project
      const simulatedAdminUser = {
        id: 'dev-admin-id',
        email,
        app_metadata: {},
        user_metadata: { role: 'admin', name: 'Talha Admin' },
        aud: 'authenticated',
        created_at: new Date().toISOString(),
      } as User;

      localStorage.setItem(DEV_AUTH_STORAGE_KEY, JSON.stringify({ email, loggedAt: new Date().toISOString() }));
      setUser(simulatedAdminUser);
      setIsDevAdmin(true);
      return { error: null };
    }
  };

  const signOut = async (): Promise<void> => {
    if (configured) {
      await supabase.auth.signOut();
    } else {
      localStorage.removeItem(DEV_AUTH_STORAGE_KEY);
      setIsDevAdmin(false);
    }
    setUser(null);
    setSession(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isConfigured: configured,
        signIn,
        signOut,
        isDevAdmin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
