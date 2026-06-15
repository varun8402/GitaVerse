import { useLocation } from 'react-router-dom';
import { IconSun, IconMoon } from '@tabler/icons-react';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const location = useLocation();
  const { dark, toggle } = useTheme();

  // Light pages in light mode need black text; everything else (dark mode or dark-bg pages) uses white
  const isLightPage = location.pathname.startsWith('/browse') || location.pathname === '/signup';
  const needsDarkText = isLightPage && !dark;

  const textColor = needsDarkText ? 'text-black' : 'text-white';
  const hoverColor = needsDarkText ? 'hover:text-gray-500' : 'hover:text-gray-300';
  const logoColor = needsDarkText ? 'brightness-0' : '';

  return (
    <div className={`flex justify-between items-center p-4 z-50 w-full absolute ${textColor}`}>
      {/* Left Logo */}
      <div className="flex items-center gap-2">
        <img
          src="https://res.cloudinary.com/dwdsw96fy/image/upload/v1756266244/whtitegitaverselogo_kad7xz.png"
          className={`w-12 mb-2 ${logoColor}`}
          alt="GitaVerse Logo"
        />
        <span className="font-bold text-lg">GitaVerse</span>
      </div>

      {/* Right Nav */}
      <ul className="flex gap-10 items-center p-2">
        <li><a href="/" className={`${hoverColor} cursor-pointer`}>Home</a></li>
        <li><a href="/browse" className={`${hoverColor} cursor-pointer`}>Browse Gita</a></li>
        <li><a href="/chatbot" className={`${hoverColor} cursor-pointer`}>AI Chatbot</a></li>
        <li><a href="/random" className={`${hoverColor} cursor-pointer`}>Random Shloka</a></li>
        <li><a href="/contact" className={`${hoverColor} cursor-pointer`}>Contact</a></li>
        <li>
          <a
            href="/signup"
            className={`inline-block border rounded-[20%] px-3 py-2 cursor-pointer duration-300 ${
              needsDarkText ? 'hover:bg-black hover:text-white' : 'hover:bg-white hover:text-black'
            }`}
          >
            Signup
          </a>
        </li>
        <li>
          <button
            onClick={toggle}
            className={`w-8 h-8 flex items-center justify-center rounded-full border transition-all duration-200 cursor-pointer ${
              needsDarkText ? 'border-gray-300 hover:bg-gray-100' : 'border-white/20 hover:bg-white/10'
            }`}
            aria-label="Toggle dark mode"
          >
            {dark ? <IconSun size={15} /> : <IconMoon size={15} />}
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
