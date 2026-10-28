import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Download, Sparkles, ArrowRight } from 'lucide-react';

interface NavbarProps {
  onOpenCVModal?: () => void;
  onOpenContactModal?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCVModal, onOpenContactModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Features', path: '/features' },
    { name: 'Projects', path: '/projects' },
    { name: 'Services', path: '/services' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNavClick = (path: string) => {
    setMobileMenuOpen(false);
    navigate(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/85 backdrop-blur-md border-b border-white/[0.06] py-3.5 shadow-2xl'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo / Monogram */}
          <Link
            to="/"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-3 group focus:outline-none"
            aria-label="Talha Portfolio Home"
          >
            <div className="w-10 h-10 rounded-full border border-gold-500/40 bg-dark-900/80 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 group-hover:border-gold-400 group-hover:shadow-[0_0_15px_rgba(198,164,119,0.3)]">
              <span className="font-heading font-bold text-lg tracking-wider text-white group-hover:text-gold-300 transition-colors">
                T
              </span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-base tracking-[0.2em] text-white uppercase group-hover:text-gold-200 transition-colors">
                Talha
              </span>
              <span className="text-[10px] tracking-widest text-gold-500/80 uppercase font-medium">
                Portfolio
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full border border-white/[0.05] bg-dark-900/60 backdrop-blur-md">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 relative group ${
                    active
                      ? 'text-white bg-white/[0.08] shadow-sm font-semibold'
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
                  }`}
                >
                  <span className={active ? 'text-gold-300' : ''}>{link.name}</span>
                  {active ? (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gold-400 rounded-full" />
                  ) : (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-gold-500 rounded-full transition-all duration-200 group-hover:w-3" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden lg:flex items-center gap-2.5">
            <button
              onClick={onOpenCVModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-medium text-zinc-200 bg-dark-850/80 hover:bg-dark-800 border border-white/[0.08] hover:border-gold-500/40 rounded-full transition-all duration-300 group hover:shadow-[0_0_20px_rgba(198,164,119,0.2)]"
            >
              <span>Download CV</span>
              <Download className="w-3.5 h-3.5 text-gold-400 transition-transform group-hover:translate-y-0.5" />
            </button>

            <button
              onClick={onOpenContactModal}
              title="Let's Connect"
              className="w-9 h-9 rounded-full border border-white/[0.08] bg-dark-850/80 hover:bg-dark-800 flex items-center justify-center text-zinc-400 hover:text-gold-300 hover:border-gold-500/40 transition-all duration-300"
              aria-label="Connect"
            >
              <Sparkles className="w-4 h-4 text-gold-400/80" />
            </button>
          </div>

          {/* Mobile & Tablet Menu Button */}
          <div className="flex lg:hidden items-center gap-2 sm:gap-3">
            <button
              onClick={onOpenCVModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-zinc-200 border border-gold-500/30 rounded-full bg-dark-900/60 hover:bg-dark-850 transition-colors"
            >
              <span>CV</span>
              <Download className="w-3 h-3 text-gold-400" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.05] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-dark-950/95 backdrop-blur-xl border-b border-white/[0.08] px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col space-y-3">
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <button
                  key={link.name}
                  onClick={() => handleNavClick(link.path)}
                  className={`text-left text-sm font-medium py-2 border-b border-white/[0.03] transition-colors flex items-center justify-between ${
                    active ? 'text-gold-300 font-semibold' : 'text-zinc-300 hover:text-gold-300'
                  }`}
                >
                  <span>{link.name}</span>
                  {active && <span className="w-1.5 h-1.5 rounded-full bg-gold-400" />}
                </button>
              );
            })}
          </nav>

          <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col gap-3">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenCVModal?.();
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-dark-800 border border-gold-500/30 rounded-full"
            >
              <Download className="w-4 h-4 text-gold-400" />
              <span>Download CV</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleNavClick('/contact');
              }}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-dark-950 bg-gold-500 hover:bg-gold-400 rounded-full font-semibold transition-colors"
            >
              <span>Let's Work Together</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
