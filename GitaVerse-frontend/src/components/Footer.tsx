import { IconBrandGithub } from '@tabler/icons-react';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 dark:border-zinc-700 bg-white dark:bg-zinc-900 py-8 px-10">
      <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img
            src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756266244/whtitegitaverselogo_kad7xz.png"
            className="w-7 brightness-0 dark:brightness-100 "
            alt="GitaVerse"
          />
          <span className="font-semibold font-[Hind] text-sm text-gray-800 dark:text-zinc-200">
            GitaVerse
          </span>
        </div>

        <p className="text-xs font-[Hind] text-center text-gray-400 dark:text-zinc-500">
          Built with devotion · Bhagavad Gita content is in the public domain
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors"
          >
            <IconBrandGithub size={17} />
          </a>
          <a href="/contact" className="text-xs font-[Hind] text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors">
            Contact
          </a>
          <a href="/signup" className="text-xs font-[Hind] text-gray-400 dark:text-zinc-500 hover:text-gray-700 dark:hover:text-zinc-300 transition-colors">
            Sign up
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
