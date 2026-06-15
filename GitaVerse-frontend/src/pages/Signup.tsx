import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconLoader2, IconEye, IconEyeOff, IconCheck } from '@tabler/icons-react';

type Mode = 'signup' | 'login';

const Signup = () => {
  const [mode, setMode] = useState<Mode>('signup');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email.trim() || !form.password.trim()) { setError('Please fill in all fields.'); return; }
    if (mode === 'signup' && !form.name.trim()) { setError('Please enter your name.'); return; }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSuccess(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-white dark:bg-zinc-900 pt-16">
      {/* ── Left panel — decorative ── */}
      <motion.div
        className="hidden md:flex flex-1 flex-col items-center justify-center relative overflow-hidden bg-amber-50 dark:bg-zinc-800 border-r border-amber-100 dark:border-zinc-700"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      >
        {/* Subtle geometric background */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full border border-amber-400"
              style={{
                width: `${(i + 1) * 120}px`,
                height: `${(i + 1) * 120}px`,
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />
          ))}
        </div>

        <div className="relative z-10 flex flex-col items-center gap-6 px-12 text-center ">
          <img
            src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756266244/whtitegitaverselogo_kad7xz.png"
            className="w-16 brightness-0 opacity-80 dark:brightness-100"
            alt="GitaVerse"
          />
          <h2 className="text-3xl font-semibold font-[Hind] dark:text-gray-200 leading-snug">
            Begin your journey<br />through the Gita
          </h2>
          <p className="text-sm text-gray-500 font-[Hind] leading-relaxed max-w-xs">
            Explore 700 verses, ask the AI companion, and receive daily wisdom from the Bhagavad Gita.
          </p>

          {/* Quote */}
          <div className="mt-4 border-l-2 border-amber-400/50 pl-4 text-left">
            <p className="text-sm text-gray-500 font-[Hind] italic leading-relaxed">
              "The soul is never born nor dies at any time. It has not come into being, does not come into being, and will not come into being."
            </p>
            <span className="text-xs text-amber-600/70 font-[Hind] mt-1 block">— Bhagavad Gita 2.20</span>
          </div>
        </div>
      </motion.div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-8 py-20">
        <motion.div
          className="w-full max-w-sm flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* Logo (mobile only) */}
          <div className="flex items-center gap-2 md:hidden">
            <img
              src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756266244/whtitegitaverselogo_kad7xz.png"
              className="w-8 brightness-0"
              alt="GitaVerse"
            />
            <span className="font-bold font-[Hind] text-gray-800">GitaVerse</span>
          </div>

          {/* Heading */}
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-semibold font-[Hind] dark:text-white">
              {mode === 'signup' ? 'Create your account' : 'Welcome back'}
            </h1>
            <p className="text-sm text-gray-400 font-[Hind]">
              {mode === 'signup' ? 'Join GitaVerse and start exploring.' : 'Sign in to continue your journey.'}
            </p>
          </div>

          {/* Mode toggle */}
          <div className="flex bg-gray-100 rounded-xl p-1">
            {(['signup', 'login'] as Mode[]).map((m) => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(''); setForm({ name: '', email: '', password: '' }); }}
                className={`flex-1 py-2 rounded-lg text-sm font-[Hind] font-medium transition-all duration-200 cursor-pointer capitalize ${
                  mode === m ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                {m === 'signup' ? 'Sign Up' : 'Log In'}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                className="flex flex-col items-center gap-4 py-8 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                >
                  <IconCheck size={24} className="text-amber-500" />
                </motion.div>
                <h2 className="text-gray-800 font-semibold font-[Hind]">
                  {mode === 'signup' ? 'Account Created!' : 'Logged In!'}
                </h2>
                <p className="text-gray-400 text-sm font-[Hind]">
                  {mode === 'signup' ? 'Welcome to GitaVerse.' : 'Welcome back.'}
                </p>
              </motion.div>
            ) : (
              <motion.form
                key={mode}
                onSubmit={handleSubmit}
                className="flex flex-col gap-4"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {mode === 'signup' && (
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-gray-500 font-[Hind] font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="border border-gray-200 focus:border-amber-400 rounded-xl px-4 py-3 text-gray-900 text-sm font-[Hind] outline-none placeholder-gray-300 bg-white transition-colors duration-200"
                    />
                  </div>
                )}

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-[Hind] font-medium">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="border border-gray-200 focus:border-amber-400 rounded-xl px-4 py-3 text-gray-900 text-sm font-[Hind] outline-none placeholder-gray-300 bg-white transition-colors duration-200"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 font-[Hind] font-medium">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full border border-gray-200 focus:border-amber-400 rounded-xl px-4 py-3 pr-11 text-gray-900 text-sm font-[Hind] outline-none placeholder-gray-300 bg-white transition-colors duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((p) => !p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500 transition-colors cursor-pointer"
                    >
                      {showPassword ? <IconEyeOff size={16} /> : <IconEye size={16} />}
                    </button>
                  </div>
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      className="text-red-400 text-xs font-[Hind]"
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <motion.button
                  type="submit"
                  disabled={loading}
                  className="mt-1 flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-200 text-white font-[Hind] font-medium text-sm transition-all duration-200 cursor-pointer disabled:cursor-not-allowed shadow-sm shadow-amber-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading
                    ? <><IconLoader2 size={16} className="animate-spin" /> Please wait...</>
                    : mode === 'signup' ? 'Create Account' : 'Log In'
                  }
                </motion.button>

                <p className="text-center text-gray-400 text-xs font-[Hind]">
                  {mode === 'signup' ? 'Already have an account?' : "Don't have an account?"}{' '}
                  <button
                    type="button"
                    onClick={() => { setMode(mode === 'signup' ? 'login' : 'signup'); setError(''); }}
                    className="text-amber-500 hover:text-amber-600 font-medium cursor-pointer transition-colors"
                  >
                    {mode === 'signup' ? 'Log in' : 'Sign up'}
                  </button>
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
