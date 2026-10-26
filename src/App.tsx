import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CVModal } from './components/CVModal';
import { ContactModal } from './components/ContactModal';
import { CinematicWallCrashIntro } from './components/CinematicWallCrashIntro';

// Public Pages
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { SkillsPage } from './pages/SkillsPage';
import { FeaturesPage } from './pages/FeaturesPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { ServicesPage } from './pages/ServicesPage';
import { ExperiencePage } from './pages/ExperiencePage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Admin Architecture
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './components/admin/ProtectedRoute';
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './pages/admin/AdminLoginPage';
import { AdminProjectsPage } from './pages/admin/AdminProjectsPage';
import { AdminProjectFormPage } from './pages/admin/AdminProjectFormPage';

// Scroll to top helper on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Main App Inner Shell allowing useLocation hook
const AppContent: React.FC = () => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');

  const [showIntro, setShowIntro] = useState<boolean>(!isAdminRoute);
  const [isCVModalOpen, setIsCVModalOpen] = useState<boolean>(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState<boolean>(false);

  return (
    <>
      <ScrollToTop />
      
      {/* 6-Second Cinematic Wall Crash Intro Overlay (Only on initial public visit) */}
      {!isAdminRoute && showIntro && (
        <CinematicWallCrashIntro
          onComplete={() => setShowIntro(false)}
        />
      )}

      <div className="min-h-screen bg-black text-neutral-100 selection:bg-gold-500/30 selection:text-gold-200 flex flex-col relative">
        
        {/* Cinematic Ambient Atmosphere Overlays */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold-500/[0.04] blur-[150px] rounded-full" />
          <div className="absolute bottom-0 inset-x-0 h-96 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col min-h-screen">
          
          {/* Top Slim Navigation (Only on public routes) */}
          {!isAdminRoute && (
            <Navbar
              onOpenCVModal={() => setIsCVModalOpen(true)}
              onOpenContactModal={() => setIsContactModalOpen(true)}
            />
          )}

          {/* Main Content Area: Multi-Page Routes */}
          <main key={location.pathname} className="flex-1">
            <Routes>
              {/* Public Portfolio Routes */}
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenContactModal={() => setIsContactModalOpen(true)}
                  />
                }
              />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/skills" element={<SkillsPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/projects/:slug" element={<ProjectDetailPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/contact" element={<ContactPage />} />

              {/* Private Admin Dashboard Routes */}
              <Route path="/admin/login" element={<AdminLoginPage />} />
              <Route
                path="/admin/projects"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProjectsPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/new"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProjectFormPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/projects/:id/edit"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <AdminProjectFormPage />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />

              {/* 404 Unknown Route Handling */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>

          {/* Public Footer (Only on public routes) */}
          {!isAdminRoute && <Footer />}

        </div>



        {/* CV Download / Preview Modal */}
        <CVModal
          isOpen={isCVModalOpen}
          onClose={() => setIsCVModalOpen(false)}
        />

        {/* Interactive Contact / Collaboration Modal */}
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
        />

      </div>
    </>
  );
};

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
