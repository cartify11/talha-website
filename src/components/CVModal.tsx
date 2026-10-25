import React from 'react';
import { Download, FileText, CheckCircle, X } from 'lucide-react';

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    // Generate a downloadable CV file for Talha
    const cvContent = `TALHA — AI ENGINEER
Email: m.talha204567@gmail.com | Location: Pakistan, City Swabi (Worldwide Remote)

SUMMARY:
Results-driven AI Engineer specializing in building high-performance web applications, generative AI integrations, mobile apps, and scalable enterprise management platforms.

CORE COMPETENCIES:
• AI Development: LLMs, LangChain, RAG Systems, Vector Databases, Python, FastAPI
• Frontend: React, Next.js, TypeScript, Tailwind CSS, State Management
• Backend: Node.js, Express, Python, GraphQL, REST APIs, Microservices
• Mobile: React Native, iOS, Android, Expo
• Cloud & DevOps: Docker, PostgreSQL, MongoDB, Redis, AWS, CI/CD

EXPERIENCE HIGHLIGHTS:
• Built enterprise knowledge agents with hybrid vector search and sub-second retrieval latency.
• Engineered scalable SaaS portals serving hundreds of concurrent daily active users.
• Architected modern cross-platform mobile apps with native biometric telemetry.

EDUCATION & CERTIFICATIONS:
• BS in Computer Science
• Professional AI & Cloud Certifications
`;
    const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Talha_AI_Software_Developer_CV.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-dark-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.05]"
          aria-label="Close CV Dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/30 flex items-center justify-center text-gold-400">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-heading text-xl font-bold text-white">
              Talha's Curriculum Vitae
            </h3>
            <p className="text-xs text-zinc-400">
              Verified Developer & AI Engineer Profile (2026 Edition)
            </p>
          </div>
        </div>

        {/* Summary Details */}
        <div className="space-y-3.5 text-xs text-zinc-300 bg-dark-950/80 p-4 rounded-xl border border-white/[0.05] mb-6">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Full Stack Architecture (React, Next.js, TypeScript, Node.js)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>AI & Machine Learning (LLMs, Vector Search, FastAPI, Python)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Cloud & Microservices (PostgreSQL, MongoDB, Docker, AWS)</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>Cross-Platform Mobile Apps (React Native, Expo)</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleDownload}
            className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-all shadow-[0_4px_20px_rgba(198,164,119,0.3)]"
          >
            <Download className="w-4 h-4" />
            <span>Download Full CV (.txt / summary)</span>
          </button>
          <button
            onClick={onClose}
            className="px-5 py-3 rounded-full bg-dark-800 hover:bg-dark-700 text-zinc-300 hover:text-white font-medium text-xs border border-white/10 transition-colors"
          >
            Cancel
          </button>
        </div>

      </div>
    </div>
  );
};
