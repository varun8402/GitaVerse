import { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'motion/react';
import {
  IconSend,
  IconLoader2,
  IconSparkles,
  IconUser,
  IconRefresh,
  IconBook,
} from '@tabler/icons-react';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SUGGESTED_QUESTIONS = [
  'What is the main teaching of Bhagavad Gita?',
  'What does Krishna say about duty (dharma)?',
  'Explain the concept of karma yoga.',
  'How to attain inner peace according to the Gita?',
];

const formatMessage = (content: string): string => {
  return content.replace(/\n/g, '<br/>');
};

const TypingIndicator = ({ elapsed }: { elapsed: number }) => (
  <div className="flex items-center gap-2 px-4 py-3">
    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:0ms]" />
    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:150ms]" />
    <span className="w-2 h-2 rounded-full bg-amber-400 animate-bounce [animation-delay:300ms]" />
    {elapsed > 0 && (
      <span className="text-white/40 text-xs ml-1 font-[Hind]">
        {elapsed}s
      </span>
    )}
  </div>
);

const AIChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content:
        'Namaste 🙏 I am your Gita AI companion. Ask me anything about the Bhagavad Gita — its verses, teachings, or how to apply its wisdom in your life.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;
    ta.style.height = 'auto';
    ta.style.height = `${Math.min(ta.scrollHeight, 120)}px`;
  }, [input]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: 'user',
      content: trimmed,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);
    setElapsed(0);
    timerRef.current = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    try {
      const response = await axios.post('/api/v1/chatbot', { question: trimmed });
      const content =
        response.data.message ??
        (typeof response.data === 'string' ? response.data : null) ??
        JSON.stringify(response.data);
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: 'assistant',
        content,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMsg]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          content: 'Something went wrong. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsLoading(false);
      setElapsed(0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        content:
          'Namaste 🙏 I am your Gita AI companion. Ask me anything about the Bhagavad Gita — its verses, teachings, or how to apply its wisdom in your life.',
        timestamp: new Date(),
      },
    ]);
    setInput('');
  };

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div
      className="h-screen w-full flex flex-col overflow-hidden bg-no-repeat bg-cover bg-center  bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1756488860/fd99f5c4-af20-41ca-bcf4-66a0f148a118.png')] dark:bg-[url('https://res.cloudinary.com/dwdsw96fy/image/upload/v1781519684/c619d388-aaa6-40c1-a8c2-9b34af25d6d9_ayohqg.png')] "
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 z-0" />

      <div className="relative z-10 flex flex-col h-full max-w-4xl mx-auto w-full px-4 pt-24 pb-4">
        {/* Header */}
        <motion.div
          className="flex items-center justify-between mb-4"
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center">
              <IconBook size={20} className="text-amber-400" />
            </div>
            <div>
              <h1 className="text-white font-semibold text-lg leading-none font-[Hind]">
                Gita AI Companion
              </h1>
              <p className="text-amber-400/70 text-xs mt-0.5">Powered by the wisdom of Bhagavad Gita</p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs text-white/50 hover:text-white/80 border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-full transition-all duration-200 cursor-pointer"
          >
            <IconRefresh size={13} />
            New Chat
          </button>
        </motion.div>

        {/* Chat window */}
        <motion.div
          className="flex-1 overflow-y-auto rounded-2xl border border-white/10 bg-black/30 backdrop-blur-md p-4 space-y-4 scrollbar-thin"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
        >
          <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              layout
              initial={{ opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border ${
                  msg.role === 'assistant'
                    ? 'bg-amber-500/20 border-amber-500/40'
                    : 'bg-white/10 border-white/20'
                }`}
              >
                {msg.role === 'assistant' ? (
                  <IconSparkles size={15} className="text-amber-400" />
                ) : (
                  <IconUser size={15} className="text-white/70" />
                )}
              </div>

              {/* Bubble */}
              <div className={`max-w-[75%] ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
                <div
                  className={`px-4 py-3 rounded-2xl text-sm leading-relaxed font-[Hind] ${
                    msg.role === 'assistant'
                      ? 'bg-white/8 border border-white/10 text-white/90 rounded-tl-sm'
                      : 'bg-amber-500/80 text-white rounded-tr-sm'
                  }`}
                >
                  {msg.role === 'assistant' ? (
                    <span
                      className="[&_strong]:text-amber-300 [&_strong]:font-semibold [&_em]:italic [&_em]:text-white/70"
                      dangerouslySetInnerHTML={{ __html: formatMessage(msg.content) }}
                    />
                  ) : (
                    msg.content
                  )}
                </div>
                <span className="text-white/30 text-[10px] px-1">{formatTime(msg.timestamp)}</span>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <motion.div
              key="typing"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="flex gap-3"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center border bg-amber-500/20 border-amber-500/40">
                <IconSparkles size={15} className="text-amber-400" />
              </div>
              <div className="bg-white/8 border border-white/10 rounded-2xl rounded-tl-sm">
                <TypingIndicator elapsed={elapsed} />
              </div>
            </motion.div>
          )}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </motion.div>

        {/* Suggested questions — only show when only welcome message exists */}
        <AnimatePresence>
        {messages.length === 1 && (
          <motion.div
            className="mt-3 grid grid-cols-2 gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {SUGGESTED_QUESTIONS.map((q, i) => (
              <motion.button
                key={q}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 + i * 0.07, duration: 0.3 }}
                onClick={() => sendMessage(q)}
                className="text-left text-xs text-white/60 hover:text-white border border-white/10 hover:border-amber-500/40 bg-white/5 hover:bg-amber-500/10 px-3 py-2 rounded-xl transition-all duration-200 font-[Hind] cursor-pointer"
              >
                {q}
              </motion.button>
            ))}
          </motion.div>
        )}
        </AnimatePresence>

        {/* Input bar */}
        <motion.div
          className="mt-3 flex items-end gap-2 bg-black/40 backdrop-blur-md border border-white/10 rounded-2xl px-4 py-3 focus-within:border-amber-500/40 transition-colors duration-200"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.25, ease: 'easeOut' }}
        >
          <textarea
            ref={textareaRef}
            rows={1}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about a verse, teaching, or life guidance..."
            className="flex-1 bg-transparent text-white placeholder-white/30 text-sm resize-none outline-none font-[Hind] leading-relaxed"
            style={{ maxHeight: '120px' }}
            disabled={isLoading}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center bg-amber-500 hover:bg-amber-400 disabled:bg-white/10 disabled:text-white/20 text-white transition-all duration-200 cursor-pointer disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <IconLoader2 size={17} className="animate-spin" />
            ) : (
              <IconSend size={17} />
            )}
          </button>
        </motion.div>

        <p className="text-center text-white/20 text-[10px] mt-2 font-[Hind]">
          Press Enter to send · Shift + Enter for new line
        </p>
      </div>
    </div>
  );
};

export default AIChatbot;
