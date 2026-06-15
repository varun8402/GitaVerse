import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconSend, IconLoader2, IconMail, IconBrandGithub, IconBrandTwitter, IconCheck } from '@tabler/icons-react';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await new Promise((res) => setTimeout(res, 1200));
      setSent(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const contactLinks = [
    { href: 'mailto:hello@gitaverse.com', icon: <IconMail size={16} />, label: 'hello@gitaverse.com' },
    { href: 'https://github.com', icon: <IconBrandGithub size={16} />, label: 'GitHub', external: true },
    { href: 'https://twitter.com', icon: <IconBrandTwitter size={16} />, label: 'Twitter / X', external: true },
  ];

  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center relative bg-no-repeat bg-cover bg-center bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1756488860/fd99f5c4-af20-41ca-bcf4-66a0f148a118.png')] dark:bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1781519684/c619d388-aaa6-40c1-a8c2-9b34af25d6d9_ayohqg.png')] "
    >
      <div className="absolute inset-0 bg-black/65 z-0" />

      <div className="relative z-10 w-full max-w-4xl px-6 py-24 grid md:grid-cols-2 gap-12 items-start">

        {/* ── Left — info ── */}
        <motion.div
          className="flex flex-col gap-6"
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
          >
            <h1 className="text-4xl font-semibold text-white font-[Hind] mb-2">Get in Touch</h1>
            <p className="text-white/50 text-sm font-[Hind] leading-relaxed">
              Have a question, suggestion, or just want to discuss the Gita? We'd love to hear from you.
            </p>
          </motion.div>

          <div className="flex flex-col gap-4 mt-2">
            {contactLinks.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                target={link.external ? '_blank' : undefined}
                rel={link.external ? 'noreferrer' : undefined}
                className="flex items-center gap-3 text-white/60 hover:text-amber-400 transition-colors duration-200 font-[Hind] text-sm"
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 + i * 0.08, duration: 0.35 }}
                whileHover={{ x: 4 }}
              >
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center">
                  {link.icon}
                </div>
                {link.label}
              </motion.a>
            ))}
          </div>

          <motion.blockquote
            className="mt-6 border-l-2 border-amber-500/40 pl-4 text-white/30 text-sm italic font-[Hind] leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            "Let a man lift himself by his own self alone, let him not lower himself; for this self alone is the friend of oneself, and this self alone is the enemy of oneself."
            <span className="block mt-1 not-italic text-amber-500/40">— Bhagavad Gita 6.5</span>
          </motion.blockquote>
        </motion.div>

        {/* ── Right — form ── */}
        <motion.div
          className="bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl p-8"
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
        >
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="success"
                className="flex flex-col items-center justify-center gap-4 py-10 text-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.1 }}
                >
                  <IconCheck size={26} className="text-amber-400" />
                </motion.div>
                <motion.h2
                  className="text-white font-semibold text-lg font-[Hind]"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  Message Sent!
                </motion.h2>
                <motion.p
                  className="text-white/40 text-sm font-[Hind]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.28 }}
                >
                  We'll get back to you as soon as possible.
                </motion.p>
                <button
                  onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }); }}
                  className="mt-2 text-xs text-amber-400/70 hover:text-amber-400 underline underline-offset-2 cursor-pointer font-[Hind]"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                className="flex flex-col gap-5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <motion.h2
                  className="text-white font-semibold text-lg font-[Hind]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  Send a Message
                </motion.h2>

                {[
                  { name: 'name', label: 'Name', type: 'text', placeholder: 'Your name' },
                  { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                ].map((field, i) => (
                  <motion.div
                    key={field.name}
                    className="flex flex-col gap-1"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + i * 0.07 }}
                  >
                    <label className="text-white/40 text-xs font-[Hind] uppercase tracking-wider">{field.label}</label>
                    <input
                      type={field.type}
                      name={field.name}
                      value={form[field.name as keyof typeof form]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      className="bg-white/5 border border-white/10 focus:border-amber-500/40 rounded-xl px-4 py-3 text-white text-sm font-[Hind] outline-none placeholder-white/20 transition-colors duration-200"
                    />
                  </motion.div>
                ))}

                <motion.div
                  className="flex flex-col gap-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.34 }}
                >
                  <label className="text-white/40 text-xs font-[Hind] uppercase tracking-wider">Message</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    placeholder="Write your message..."
                    className="bg-white/5 border border-white/10 focus:border-amber-500/40 rounded-xl px-4 py-3 text-white text-sm font-[Hind] outline-none placeholder-white/20 resize-none transition-colors duration-200"
                  />
                </motion.div>

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
                  className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:bg-amber-500/40 text-white font-[Hind] font-medium transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.42 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                >
                  {loading ? (
                    <><IconLoader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <><IconSend size={16} /> Send Message</>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
