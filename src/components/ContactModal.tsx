import React, { useState } from 'react';
import { Send, CheckCircle2, X, Sparkles } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      // Allow user to see confirmation before reset
    }, 1000);
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({ name: '', email: '', subject: 'Project Collaboration', message: '' });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-dark-900 border border-gold-500/30 p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={handleReset}
          className="absolute top-5 right-5 text-zinc-400 hover:text-white p-1 rounded-lg hover:bg-white/[0.05]"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-heading text-2xl font-bold text-white">
              Message Sent to Talha!
            </h3>
            <p className="text-sm text-zinc-300 max-w-sm mx-auto">
              Thank you for reaching out, <span className="text-gold-300 font-semibold">{formData.name || 'there'}</span>. Talha will review your message and reply within 24 hours.
            </p>
            <button
              onClick={handleReset}
              className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs"
            >
              Done
            </button>
          </div>
        ) : (
          <div>
            {/* Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/20 text-gold-300 text-[11px] font-semibold tracking-wider uppercase mb-2">
                <Sparkles className="w-3 h-3 text-gold-400" />
                <span>DIRECT INQUIRY</span>
              </div>
              <h3 className="font-heading text-2xl font-bold text-white">
                Let's Discuss Your Project
              </h3>
              <p className="text-xs text-zinc-400 mt-1">
                Share your requirements, timelines, or questions with Talha.
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Alex Morgan"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950/80 border border-white/[0.08] focus:border-gold-500/60 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. alex@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950/80 border border-white/[0.08] focus:border-gold-500/60 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Subject
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950/80 border border-white/[0.08] focus:border-gold-500/60 focus:outline-none text-xs text-white transition-colors"
                >
                  <option value="Project Collaboration">Project Collaboration</option>
                  <option value="AI / ML Development">AI / ML Development</option>
                  <option value="Full Stack Web App">Full Stack Web App</option>
                  <option value="Mobile App Development">Mobile App Development</option>
                  <option value="Consulting & Advisory">Consulting & Advisory</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Project Details
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder="Tell Talha about your project goals, scope, and target launch date..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-dark-950/80 border border-white/[0.08] focus:border-gold-500/60 focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors resize-none"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-full text-xs text-zinc-400 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-all shadow-[0_4px_15px_rgba(198,164,119,0.3)]"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};
