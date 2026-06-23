import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

interface HeaderProps {
  setActivePage: (page: string) => void;
  activePage: string;
}

const Header: React.FC<HeaderProps> = ({ setActivePage, activePage }) => {
  const { t, i18n } = useTranslation();
  const { theme, toggleTheme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLanguageToggle = () => {
    i18n.changeLanguage(i18n.language === 'tr' ? 'en' : 'tr');
  };

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'projects', label: t('nav.projects') },
    { id: 'contact', label: t('nav.contact') },
    { id: 'game', label: t('nav.game') },
  ];

  const handleNavClick = (id: string) => {
    setActivePage(id);
    setIsMobileMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 md:p-6 backdrop-blur-md bg-white/10 dark:bg-black/10 border-b border-gray-200/20 dark:border-gray-800/20">
      {/* Left: Name */}
      <div
        className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-tighter cursor-pointer text-sys-indigo dark:text-sys-neon truncate max-w-[50%]"
        onClick={() => handleNavClick('home')}
      >
        Burak Can Ulusoy
      </div>

      {/* Center (Desktop only): Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="hidden md:block p-2.5 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors absolute left-1/2 -translate-x-1/2"
        aria-label="Toggle Theme"
      >
        {theme === 'dark' ? (
          <Sun className="w-7 h-7 text-yellow-400" />
        ) : (
          <Moon className="w-7 h-7 text-slate-700" />
        )}
      </button>

      {/* Right: Nav Links, Theme Toggle (Mobile), Lang Toggle, Hamburger */}
      <div className="flex items-center space-x-3 sm:space-x-6">
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-4">
          {navItems.map(item => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`text-sm font-medium transition-colors ${
                activePage === item.id
                  ? 'text-sys-indigo dark:text-sys-neon'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Theme Toggle (Mobile only - Desktop is centered) */}
        <button
          onClick={toggleTheme}
          className="md:hidden p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? (
            <Sun className="w-5 sm:w-6 h-5 sm:h-6 text-yellow-400" />
          ) : (
            <Moon className="w-5 sm:w-6 h-5 sm:h-6 text-slate-700" />
          )}
        </button>

        {/* Language Toggle */}
        <button
          onClick={handleLanguageToggle}
          className="text-xs sm:text-sm font-bold px-2 py-1 sm:px-3 sm:py-1 rounded-md bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors flex-shrink-0"
        >
          {i18n.language.toUpperCase()}
        </button>

        {/* Mobile Hamburger Icon */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-1 rounded-md hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex-shrink-0 text-slate-700 dark:text-slate-200"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 bg-white/95 dark:bg-sys-darker/95 backdrop-blur-xl border-b border-gray-200 dark:border-gray-800 shadow-xl md:hidden flex flex-col py-4 px-6 gap-4"
          >
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg font-bold py-2 transition-colors ${
                  activePage === item.id
                    ? 'text-sys-indigo dark:text-sys-neon'
                    : 'text-slate-600 dark:text-slate-400'
                }`}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
