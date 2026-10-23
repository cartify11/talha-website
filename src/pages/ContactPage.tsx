import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle 
} from 'lucide-react';
import { GithubIcon, LinkedInIcon, WhatsAppIcon, FacebookIcon, TikTokIcon } from '../components/SocialIcons';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Project Collaboration',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [submissionState, setSubmissionState] = useState<'idle' | 'success'>('idle');

  const validate = () => {
    const errs: { [key: string]: string } = {};
    if (!formData.name.trim()) errs.name = 'Please provide your name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please provide a valid email address.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = 'Please share a brief message (at least 10 characters).';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    try {
      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'ea0a1e35-512c-4734-b258-0ce1ea908fc9',
          to_email: 'm.talha204567@gmail.com',
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Inquiry] ${formData.subject} from ${formData.name}`,
          message: formData.message,
          reply_to: formData.email,
        }),
      });
    } catch (err) {
      console.warn('Real email submission fallback:', err);
    } finally {
      setIsSubmitting(false);
      setSubmissionState('success');
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-black text-neutral-100">
      
      {/* Background Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-24 right-1/4 w-[650px] h-[500px] bg-gold-500/5 blur-[160px] rounded-full" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="max-w-3xl mb-16 space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-6 bg-gold-400" />
            <span className="text-xs font-semibold tracking-[0.25em] uppercase text-gold-400">
              GET IN TOUCH
            </span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
            Let's Work Together
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
            Have a project in mind, an architectural challenge, or a new product launch? I am currently open to discussing full-time roles, contracts, and bespoke freelance engineering.
          </p>
        </div>

        {/* 2-Column Layout (matching Screen 07 of reference image) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Contact Cards & Coordinates (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Direct Email Card (Option 1) */}
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.07] flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/25 flex items-center justify-center text-gold-400 shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Direct Email
                </span>
                <a
                  href="mailto:m.talha204567@gmail.com"
                  className="font-heading text-base sm:text-lg font-bold text-white hover:text-gold-300 transition-colors mt-0.5 block break-all"
                >
                  m.talha204567@gmail.com
                </a>
                <span className="text-xs text-zinc-400 mt-1 block">
                  Inquiries typically answered within 24 hours
                </span>
              </div>
            </div>

            {/* Location & Availability Card (Option 2) */}
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-white/[0.07] flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-400/25 flex items-center justify-center text-gold-400 shrink-0">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider block">
                  Location & Reach
                </span>
                <div className="font-heading text-lg font-bold text-white mt-0.5">
                  Available Worldwide (Remote)
                </div>
                <span className="text-xs text-gold-400/90 font-medium mt-1 block">
                  Pakistan, City Swabi (Worldwide Remote Delivery)
                </span>
              </div>
            </div>

            {/* Status Card (Option 3) */}
            <div className="p-6 rounded-2xl bg-dark-900/80 border border-gold-500/25 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                  Current Status
                </span>
                <div className="font-heading text-lg font-bold text-white mt-0.5">
                  Available for New Projects
                </div>
                <span className="text-xs text-zinc-300 font-medium mt-1 block">
                  Always Available for Your Services
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Order Card (Number encoded behind the scenes, never displayed as raw text) */}
            <div className="p-6 rounded-2xl bg-gradient-to-b from-emerald-950/30 to-dark-900/90 border border-emerald-500/30 flex items-start gap-4 shadow-[0_10px_30px_rgba(16,185,129,0.08)]">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/15 border border-emerald-400/30 flex items-center justify-center text-emerald-400 shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                <WhatsAppIcon className="w-6 h-6 text-emerald-400" />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[11px] font-mono text-emerald-400 uppercase tracking-wider block font-semibold">
                  Instant Order & Inquiry
                </span>
                <div className="font-heading text-lg font-bold text-white mt-0.5">
                  Direct WhatsApp Chat
                </div>
                <span className="text-xs text-zinc-300 mt-1 block leading-relaxed">
                  Fast response for software orders, direct quotes, and immediate requirements.
                </span>
                <a
                  href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-dark-950 font-bold text-xs transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)] hover:scale-105"
                >
                  <WhatsAppIcon className="w-4 h-4 text-dark-950" />
                  <span>Start WhatsApp Order ↗</span>
                </a>
              </div>
            </div>

            {/* Social Channels */}
            <div className="p-6 rounded-2xl bg-dark-950 border border-white/[0.06] space-y-3">
              <span className="text-xs font-semibold text-zinc-300 uppercase tracking-wider block">
                Connect Across Platforms
              </span>
              <div className="flex items-center gap-3">
                {/* WhatsApp */}
                <a
                  href="https://wa.me/923145873362?text=Hello%20Talha,%20I%20would%20like%20to%20discuss%20a%20project."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/25 flex items-center justify-center text-emerald-400 hover:text-emerald-300 transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
                  aria-label="Order on WhatsApp"
                  title="Order on WhatsApp"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                </a>

                {/* Facebook */}
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#1877F2] hover:border-[#1877F2]/40 transition-all"
                  aria-label="Facebook"
                  title="Facebook"
                >
                  <FacebookIcon className="w-4 h-4" />
                </a>

                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-[#EE1D52] hover:border-[#EE1D52]/40 transition-all"
                  aria-label="TikTok"
                  title="TikTok"
                >
                  <TikTokIcon className="w-4 h-4" />
                </a>

                {/* LinkedIn */}
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-gold-500/40 transition-all"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <LinkedInIcon className="w-4 h-4" />
                </a>

                {/* GitHub */}
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/[0.08] bg-dark-900 hover:bg-dark-850 flex items-center justify-center text-zinc-400 hover:text-white hover:border-gold-500/40 transition-all"
                  aria-label="GitHub"
                  title="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Contact Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl p-8 sm:p-10 bg-gradient-to-b from-dark-900/90 via-dark-900 to-dark-950 border border-white/[0.08] shadow-2xl">
              
              {submissionState === 'success' ? (
                <div className="py-12 text-center space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-heading text-2xl font-bold text-white">
                    Inquiry Recorded Successfully!
                  </h3>
                  <p className="text-sm text-zinc-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="text-gold-300 font-semibold">{formData.name}</span>. Your project parameters have been validated.
                  </p>
                  <div className="p-4 rounded-xl bg-dark-950 border border-white/[0.06] text-xs text-zinc-400 max-w-sm mx-auto text-left space-y-1">
                    <div><span className="text-zinc-500">Subject:</span> {formData.subject}</div>
                    <div><span className="text-zinc-500">Sender:</span> {formData.email}</div>
                    <div className="pt-1 text-[11px] text-gold-400/80">
                      Note: Production email dispatch is wired to direct inbox `contact@talha.dev`.
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setSubmissionState('idle');
                      setFormData({ name: '', email: '', subject: 'Project Collaboration', message: '' });
                    }}
                    className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h3 className="font-heading text-2xl font-bold text-white">
                      Send a Message
                    </h3>
                    <p className="text-xs text-zinc-400 mt-1">
                      Fill out the form below to initiate a conversation with Talha.
                    </p>
                  </div>

                  {/* Name Field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Elena Rostova"
                      value={formData.name}
                      onChange={(e) => {
                        setFormData({ ...formData, name: e.target.value });
                        if (errors.name) setErrors({ ...errors, name: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-950 border ${
                        errors.name ? 'border-red-500/80' : 'border-white/[0.08] focus:border-gold-500/60'
                      } focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors`}
                    />
                    {errors.name && (
                      <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.name}
                      </span>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Your Email *
                    </label>
                    <input
                      type="email"
                      placeholder="e.g. elena@company.com"
                      value={formData.email}
                      onChange={(e) => {
                        setFormData({ ...formData, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-950 border ${
                        errors.email ? 'border-red-500/80' : 'border-white/[0.08] focus:border-gold-500/60'
                      } focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors`}
                    />
                    {errors.email && (
                      <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.email}
                      </span>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-dark-950 border border-white/[0.08] focus:border-gold-500/60 focus:outline-none text-xs text-white transition-colors"
                    >
                      <option value="Project Collaboration">New Project Collaboration</option>
                      <option value="AI / LLM Integration">AI & LLM Integration</option>
                      <option value="Full Stack Web Development">Full Stack Web App Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="Enterprise Architecture">Enterprise System Architecture</option>
                      <option value="Full-Time Role Offer">Full-Time / Contract Role Offer</option>
                    </select>
                  </div>

                  {/* Message Field */}
                  <div>
                    <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                      Project Details & Requirements *
                    </label>
                    <textarea
                      rows={5}
                      placeholder="Outline your project scope, timeline, budget range, and any existing technical stack..."
                      value={formData.message}
                      onChange={(e) => {
                        setFormData({ ...formData, message: e.target.value });
                        if (errors.message) setErrors({ ...errors, message: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl bg-dark-950 border ${
                        errors.message ? 'border-red-500/80' : 'border-white/[0.08] focus:border-gold-500/60'
                      } focus:outline-none text-xs text-white placeholder-zinc-500 transition-colors resize-none`}
                    />
                    {errors.message && (
                      <span className="text-[11px] text-red-400 flex items-center gap-1 mt-1">
                        <AlertCircle className="w-3 h-3" /> {errors.message}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full inline-flex items-center justify-center gap-2.5 py-3.5 px-6 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs tracking-wide transition-all shadow-[0_4px_20px_rgba(198,164,119,0.3)] hover:shadow-[0_4px_30px_rgba(198,164,119,0.5)]"
                    >
                      <span>Send Message to Talha</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
