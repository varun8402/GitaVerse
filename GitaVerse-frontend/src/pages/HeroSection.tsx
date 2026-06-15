import { useEffect, useState, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Feature } from '../components/box';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import {
  IconBook,
  IconSparkles,
  IconMessageCircle,
  IconStar,
  IconArrowRight,
} from '@tabler/icons-react';

const LIGHT_BG = "https://res.cloudinary.com/dwdsw96fy/image/upload/v1756488860/fd99f5c4-af20-41ca-bcf4-66a0f148a118.png";
const DARK_BG  = "https://cdn.discordapp.com/attachments/979640570794369064/1516020770789134356/c619d388-aaa6-40c1-a8c2-9b34af25d6d9.png?ex=6a311fde&is=6a2fce5e&hm=9e6a502d3808b8a136968690f18f94daf703504ac2ef582fedf249f06f8890a1&";

gsap.registerPlugin(ScrollTrigger);

interface HeroSectionProps {
  onLoaded?: () => void;
  loading?: boolean;
}

interface IDailyShloka {
  text: string;
  meaning: string;
}

// Scroll-triggered fade-up wrapper
const FadeUp = ({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(
      el,
      { opacity: 0, y: 36 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        delay,
        ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      }
    );
  }, [delay]);
  return <div ref={ref} className={className}>{children}</div>;
};

const HeroSection = ({ onLoaded, loading }: HeroSectionProps) => {
  const navigate = useNavigate();
  const { dark } = useTheme();
  const [dailyShloka, setDailyShloka] = useState<IDailyShloka>({ text: '', meaning: '' });

  // Fix: add [] so it only runs once
  useEffect(() => {
    axios
      .get('/api/v1/daily-shloka')
      .then((res) => setDailyShloka(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const bgImg = new window.Image();
    const fgImg = new window.Image();
    let count = 0;
    const check = () => { if (++count === 2 && onLoaded) onLoaded(); };
    bgImg.src = 'https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263112/b67f3bfc246180e199de2cbc60af33301a560e00de56f6699bffc110bcdc02d3_1_1_hpvqaz.png';
    fgImg.src = 'https://res.cloudinary.com/dwdsw96fy/image/upload/v1756263851/erasebg-transformed_-_Copy_fyt99x.png';
    bgImg.complete ? check() : (bgImg.onload = check);
    fgImg.complete ? check() : (fgImg.onload = check);
  }, []);

  useGSAP(() => {
    const main = document.querySelector('.main');
    main?.addEventListener('mousemove', (e: Event) => {
      const me = e as MouseEvent;
      gsap.to('.move', {
        x: (me.clientX / window.innerWidth - 0.5) * 20,
        y: (me.clientY / window.innerHeight - 0.5) * 20,
      });
    });
  }, [loading]);

  return (
    <>
      {/* ── HERO ── */}
      <div className="w-full h-screen relative overflow-hidden">
        <div className="w-full h-full absolute z-0">
          <div
            className="w-full h-full absolute bg-no-repeat bg-cover bg-center"
            style={{ backgroundImage: `url('${dark ? LIGHT_BG : DARK_BG}')` }}
          />
          <AnimatePresence initial={false}>
            <motion.div
              key={dark ? 'dark' : 'light'}
              className="w-full h-full absolute bg-no-repeat bg-cover bg-center"
              style={{ backgroundImage: `url('${dark ? DARK_BG : LIGHT_BG}')` }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: 'easeInOut' }}
            />
          </AnimatePresence>
        </div>
        <div className="absolute inset-0 z-10 bg-black/40 pointer-events-none" />
        <div className="relative z-20 flex items-center justify-center h-full text-white main">
          <div className="move absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
            <img
              src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756545852/image_3_1_b1xnmf.png"
              className={`h-full w-auto pointer-events-none mt-16 dark:brightness-[80%]  ${loading ? '' : 'animated fadeIn'}`}
            />
          </div>
          <div className="relative z-40 flex flex-col items-center justify-center mb-[7%] pointer-events-none">
            <h1 className="text-8xl font-[Hind] font-semibold drop-shadow-[2px_2px_6px_rgba(0,0,0,0.5)] animated fadeInUp duration-700 text-center">
              Welcome to GitaVerse
            </h1>
            <h3 className="text-2xl font-[Hind] font-light drop-shadow-[1px_1px_4px_rgba(0,0,0,0.6)] animated fadeInUp duration-700 text-center">
              Explore the spiritual wisdom of Bhagavad Gita
            </h3>
          </div>
        </div>
      </div>

      {/* ── DAILY SHLOKA ── */}
      <section className="border-t border-gray-200 dark:border-zinc-700 bg-card/50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto p-10">
          <FadeUp>
            <h2 className="text-2xl font-semibold mb-5 font-[Hind] dark:text-white">Daily Shloka</h2>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="rounded-xl border border-zinc-200 dark:border-zinc-700 bg-card dark:bg-zinc-800 p-6 shadow-sm flex flex-col md:flex-row gap-6 items-start">
              <img
                src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756545852/image_3_1_b1xnmf.png"
                className="w-24 h-24 object-cover border rounded-full shrink-0"
              />
              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-semibold font-[Hind] dark:text-white">{dailyShloka.text || '—'}</h3>
                <p className="text-sm text-muted-foreground dark:text-zinc-400 font-[Hind] leading-relaxed">{dailyShloka.meaning}</p>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="dark:bg-zinc-900 pb-16">
        <div className="max-w-5xl mx-auto px-10">
          <FadeUp>
            <div className="pt-12 mb-2">
              <h2 className="text-2xl font-semibold font-[Hind] dark:text-white">Everything you need to explore the Gita</h2>
              <p className="text-base text-muted-foreground dark:text-zinc-400 font-[Hind] mt-2 leading-relaxed">
                Browse chapters and verses, view an image-backed shloka page with simple explanations,
                and ask an AI for guidance by theme or verse number.
              </p>
            </div>
          </FadeUp>
          <div className="py-10 grid gap-5 md:grid-cols-3 dark:text-white">
            {[
              { title: 'Chapters', body: 'Read concise summaries for all 18 chapters and dive into verses with context.', delay: 0 },
              { title: 'Search & Discover', body: 'Quick filters help you find teachings by theme, chapter, or Sanskrit keywords.', delay: 0.07 },
              { title: 'AI Companion', body: 'Ask questions and get helpful guidance grounded in the Gita.', delay: 0.14 },
              { title: 'Daily Wisdom', body: 'One verse each day with translation and short commentary to start your morning.', delay: 0.21 },
              { title: 'Unfold a Shloka', body: 'Let destiny guide you to a verse. A random shloka awaits, carrying timeless wisdom.', delay: 0.28 },
              { title: 'Reflection', body: 'Short guided reflections and prompts tied to the Gita\'s teachings.', delay: 0.35 },
            ].map((f) => (
              <FadeUp key={f.title} delay={f.delay}>
                <Feature title={f.title} body={f.body} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUOTE BANNER ── */}
      <section
        className="relative py-24 flex items-center justify-center overflow-hidden"
        style={{
          backgroundImage: `url('${dark ?  DARK_BG : LIGHT_BG }')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
        }}
      >
        <div className="absolute inset-0 bg-black/70" />
        <FadeUp className="relative z-10 max-w-2xl mx-auto px-8 text-center flex flex-col gap-4">
          <IconSparkles size={28} className="text-amber-400 mx-auto" />
          <blockquote className="text-2xl md:text-3xl font-[Hind] font-light text-white leading-relaxed italic">
            "You have the right to perform your actions, but you are not entitled to the fruits of your actions."
          </blockquote>
          <p className="text-amber-400/70 text-sm font-[Hind] tracking-wide">— Bhagavad Gita 2.47</p>
        </FadeUp>
      </section>

      {/* ── EXPLORE CTA ── */}
      <section className="py-20 bg-card/50 dark:bg-zinc-900">
        <div className="max-w-4xl mx-auto px-10 flex flex-col md:flex-row gap-6">
          {[
            {
              icon: <IconBook size={22} className="text-amber-600" />,
              title: 'Browse All Chapters',
              desc: 'Explore all 18 chapters with verse-by-verse Sanskrit, transliteration and meaning.',
              action: () => navigate('/browse'),
              label: 'Browse Gita',
            },
            {
              icon: <IconStar size={22} className="text-amber-600" />,
              title: 'Random Shloka',
              desc: 'Let the Gita speak to you. Discover a verse chosen by chance.',
              action: () => navigate('/random'),
              label: 'Reveal a Verse',
            },
            {
              icon: <IconMessageCircle size={22} className="text-amber-600" />,
              title: 'Ask the AI',
              desc: 'Have a question about the Gita? Get guidance from your AI companion.',
              action: () => navigate('/chatbot'),
              label: 'Open Chatbot',
            },
          ].map((card, i) => (
            <FadeUp key={card.title} delay={i * 0.1} className="flex-1">
              <div className="h-full rounded-xl border border-zinc-200 dark:border-zinc-700 bg-card dark:bg-zinc-800 p-6 shadow-sm flex flex-col gap-4">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
                  {card.icon}
                </div>
                <h3 className="text-base font-semibold font-[Hind] dark:text-white">{card.title}</h3>
                <p className="text-sm text-muted-foreground dark:text-zinc-400 font-[Hind] leading-relaxed flex-1">{card.desc}</p>
                <button
                  onClick={card.action}
                  className="flex items-center gap-1.5 text-sm text-amber-600 hover:text-amber-500 font-[Hind] font-medium cursor-pointer transition-colors w-fit"
                >
                  {card.label} <IconArrowRight size={14} />
                </button>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
      <Footer />
    </>
  );
};

export default HeroSection;
