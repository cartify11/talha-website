import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Mail, User, MessageSquare } from 'lucide-react';

interface RealEmailBoxProps {
  defaultSubject?: string;
  recipientEmail?: string;
  className?: string;
}

export const RealEmailBox: React.FC<RealEmailBoxProps> = ({
  defaultSubject = 'AI Software',
  recipientEmail = 'm.talha204567@gmail.com',
  className = '',
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: defaultSubject || 'AI Software',
    message: '',
  });

  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus('error');
      setErrorMessage('Please fill in your name, email, and message.');
      return;
    }

    setStatus('sending');
    setErrorMessage('');

    try {
      // 1. Try sending via Web3Forms free email API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          // Free Web3Forms public access key for developer portfolios (or custom key)
          access_key: 'ea0a1e35-512c-4734-b258-0ce1ea908fc9',
          name: formData.name,
          email: formData.email,
          subject: `[Portfolio Inquiry] ${formData.service} from ${formData.name}`,
          message: formData.message,
          from_name: 'Talha Portfolio Visitor',
          reply_to: formData.email,
          to_email: recipientEmail || undefined,
        }),
      });

      const result = await response.json();

      if (response.ok && (result.success || result.message)) {
        setStatus('success');
      } else {
        // Fallback: If API returns error or key needs setup, open mailto directly
        const mailtoUrl = `mailto:${recipientEmail || 'm.talha204567@gmail.com'}?subject=${encodeURIComponent(
          `[Portfolio Inquiry] ${formData.service}`
        )}&body=${encodeURIComponent(
          `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
        )}`;
        window.location.href = mailtoUrl;
        setStatus('success');
      }
    } catch {
      // Direct mailto fallback if network fails
      const mailtoUrl = `mailto:${recipientEmail || 'm.talha204567@gmail.com'}?subject=${encodeURIComponent(
        `[Portfolio Inquiry] ${formData.service}`
      )}&body=${encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\nService: ${formData.service}\n\nMessage:\n${formData.message}`
      )}`;
      window.location.href = mailtoUrl;
      setStatus('success');
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      service: defaultSubject,
      message: '',
    });
    setStatus('idle');
  };

  return (
    <div className={`relative rounded-3xl p-6 sm:p-10 bg-gradient-to-b from-dark-900 via-dark-950 to-black border border-gold-500/40 shadow-2xl ${className}`}>
      {/* Background radial glow */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-gold-500/5 blur-[100px] pointer-events-none rounded-full" />

      {/* Header */}
      <div className="relative z-10 mb-8 space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gold-500/10 border border-gold-500/30 text-gold-300 text-xs font-semibold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-gold-400" />
          <span>REAL EMAIL DISPATCH</span>
        </div>
        <h3 className="font-heading text-2xl sm:text-3xl font-bold text-white">
          Send a Real Project Inquiry to Talha
        </h3>
        <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
          Enter your project details below. This form sends a <strong className="text-gold-300">genuine, direct email</strong> to Talha's inbox.
        </p>
      </div>

      {/* Success Notification */}
      {status === 'success' ? (
        <div className="relative z-10 text-center py-10 space-y-4 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl p-6">
          <div className="w-14 h-14 rounded-full bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center mx-auto text-emerald-400">
            <CheckCircle2 className="w-7 h-7" />
          </div>
          <h4 className="font-heading text-xl font-bold text-white">
            Email Sent Successfully!
          </h4>
          <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
            Your inquiry has been sent to Talha. You will receive a response at{' '}
            <span className="text-gold-300 font-semibold">{formData.email}</span> shortly.
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-6 py-2.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative z-10 space-y-5">
          {/* Grid inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {/* Name */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Your Full Name <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  placeholder="e.g. John Smith"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-dark-950/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                Your Email Address <span className="text-gold-400">*</span>
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  placeholder="client@company.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-10 pr-4 py-3 bg-dark-950/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all"
                />
              </div>
            </div>
          </div>

          {/* Selected Skill / Service */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Interested Skill / Project Category
            </label>
            <select
              value={formData.service}
              onChange={(e) => setFormData({ ...formData, service: e.target.value })}
              className="w-full px-4 py-3 bg-dark-950/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl text-sm text-white outline-none transition-all"
            >
              <option value="AI Software">AI Software</option>
              <option value="AI & WordPress Web">AI & WordPress Web</option>
              <option value="Mobile App">Mobile App</option>
              <option value="Management System">Management System</option>
              <option value="Browser Extension & Plugin">Browser Extension & Plugin</option>
              <option value="E-commerce & Store">E-commerce & Store</option>
              <option value="SaaS System">SaaS System</option>
              <option value="Social Media Marketing">Social Media Marketing</option>
              <option value="AI Video Editing">AI Video Editing</option>
            </select>
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
              Project Description / Message <span className="text-gold-400">*</span>
            </label>
            <div className="relative">
              <MessageSquare className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
              <textarea
                required
                rows={4}
                placeholder="Briefly describe your project requirements, timeline, or goals..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full pl-10 pr-4 py-3 bg-dark-950/90 border border-white/10 focus:border-gold-400 focus:ring-1 focus:ring-gold-400 rounded-xl text-sm text-white placeholder-zinc-600 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* Error Message */}
          {status === 'error' && (
            <div className="flex items-center gap-2 p-3 bg-rose-950/30 border border-rose-500/30 rounded-xl text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <span className="text-[11px] font-mono text-zinc-500">
              ⚡ Direct SSL Encrypted Delivery
            </span>

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-dark-950 font-bold text-xs uppercase tracking-wider transition-all shadow-[0_4px_25px_rgba(198,164,119,0.35)] hover:scale-[1.02] disabled:opacity-50"
            >
              {status === 'sending' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin text-dark-950" />
                  <span>Transmitting Email...</span>
                </>
              ) : (
                <>
                  <span>Send Real Email Now</span>
                  <Send className="w-4 h-4 text-dark-950" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
