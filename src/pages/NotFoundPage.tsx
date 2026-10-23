import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="pt-36 pb-24 min-h-[85vh] bg-black text-center flex flex-col items-center justify-center px-4">
      <div className="w-16 h-16 rounded-full bg-dark-900 border border-gold-500/30 flex items-center justify-center text-gold-400 mb-6">
        <Compass className="w-8 h-8" />
      </div>
      <h1 className="font-heading text-4xl sm:text-5xl font-bold text-white mb-3">
        404 — Page Not Found
      </h1>
      <p className="text-zinc-400 text-sm max-w-md mx-auto mb-8">
        The route you are looking for does not exist on Talha's developer portfolio.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Return to Homepage</span>
      </Link>
    </div>
  );
};
