import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Terminal, CheckCircle2, ChevronRight } from 'lucide-react';
import img1 from '../images/1.png';
import img2 from '../images/2.png';

export default function App() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus('submitting');
    setErrorMsg('');
    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        setStatus('success');
        setEmail('');
      } else {
        const data = await response.json().catch(() => ({}));
        setErrorMsg(data.error || 'Failed to subscribe. Please try again.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#0b101e] text-slate-200 font-sans selection:bg-[#00f0ff] selection:text-[#0b101e] overflow-x-hidden">
      {/* Background Grid Effect */}
      <div className="fixed inset-0 pointer-events-none bg-[linear-gradient(to_right,#121827_1px,transparent_1px),linear-gradient(to_bottom,#121827_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />

      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-24 relative z-10">
        {/* Header */}
        <header className="flex items-center justify-center lg:justify-start mb-12 lg:mb-24">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Terminal className="w-6 h-6 text-[#00f0ff]" />
            <span className="font-mono font-bold text-xl tracking-wider text-white">
              thealtar<span className="text-[#00f0ff]">.quest</span>
            </span>
          </motion.div>
        </header>

        <div className="flex flex-col gap-12 lg:gap-24">
          {/* Copy & Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[#00f0ff]/30 bg-[#00f0ff]/10 text-[#00f0ff] font-mono text-xs font-medium mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00f0ff] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00f0ff]"></span>
              </span>
              PROTOCOL PRE-LAUNCH ACTIVE
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 text-white leading-[1.1]">
              LEVEL UP YOUR <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00f0ff] to-[#b53471] text-glow-cyan">
                REALITY.
              </span>
            </h1>
            
            <p className="text-lg text-slate-400 mb-8 leading-relaxed">
              The ultimate gamified self-improvement system. Turn your life into a main character quest log. 
              Subscribe now to secure your spot in the beta and unlock a <strong className="text-[#00f0ff] font-mono">50% DISCOUNT</strong> for your first year.
            </p>

            {/* Opt-in Form */}
            <div className="bg-[#121827] p-6 rounded-lg border border-slate-800 relative overflow-hidden text-left mx-auto max-w-md lg:max-w-none lg:mx-0">
              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#00f0ff]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#00f0ff]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#00f0ff]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#00f0ff]" />

              {status === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-12 h-12 rounded-full bg-[#00f0ff]/20 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-6 h-6 text-[#00f0ff]" />
                  </div>
                  <h3 className="font-mono text-lg text-white mb-2">[ REGISTRATION CONFIRMED ]</h3>
                  <p className="text-slate-400 text-sm">
                    Your spot is secured. Awaiting protocol initialization. We will contact you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block font-mono text-xs text-[#00f0ff] mb-2 uppercase tracking-wider">
                      Enter Comm-Link (Email)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <ChevronRight className="h-4 w-4 text-slate-500" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full pl-10 pr-3 py-3 bg-[#0b101e] border border-slate-700 rounded-md text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#00f0ff] focus:border-[#00f0ff] font-mono text-sm transition-colors"
                        placeholder="player@system.net"
                        disabled={status === 'submitting'}
                      />
                    </div>
                  </div>
                  {status === 'error' && (
                    <p className="font-mono text-xs text-red-400 bg-red-900/20 border border-red-800 rounded px-3 py-2">
                      {errorMsg}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full relative group overflow-hidden rounded-md bg-[#00f0ff]/10 border border-[#00f0ff]/50 px-4 py-3 font-mono text-sm font-bold text-[#00f0ff] transition-all hover:bg-[#00f0ff]/20 hover:border-[#00f0ff] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {status === 'submitting' ? 'INITIALIZING...' : 'CLAIM 50% DISCOUNT'}
                    </span>
                    {/* Hover effect background */}
                    <div className="absolute inset-0 h-full w-0 bg-[#00f0ff]/20 transition-all duration-300 ease-out group-hover:w-full" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Images below everything */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col gap-6 max-w-xl mx-auto w-full"
          >
            <img src={img1} alt="" className="w-full rounded-lg object-contain" />
            <img src={img2} alt="" className="w-full rounded-lg object-contain" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
