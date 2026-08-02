import React from 'react';
import { Menu, Sun, Moon, Radio, ShieldCheck } from 'lucide-react';
import { useTheme } from '@/theme/ThemeContext';

interface NavbarProps {
  onOpenSidebar: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenSidebar }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 h-16 glass-nav flex items-center justify-between px-4 lg:px-8">
      <div className="flex items-center space-x-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Open Sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>
        <div className="flex items-center space-x-2">
          <span className="flex h-2.5 w-2.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-agri-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-agri-500"></span>
          </span>
          <span className="text-xs font-semibold text-agri-700 dark:text-agri-400 bg-agri-100 dark:bg-agri-950/60 px-2.5 py-1 rounded-full border border-agri-200 dark:border-agri-900 flex items-center gap-1.5">
            <Radio className="w-3 h-3 animate-pulse" />
            Twilio Telephony Gateway Online
          </span>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        <div className="hidden sm:flex items-center space-x-2 text-xs font-medium text-gray-500 dark:text-gray-400 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
          <ShieldCheck className="w-4 h-4 text-agri-500" />
          <span>Explainable RCA Engine v1.0</span>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-600 dark:text-gray-300 hover:text-agri-600 dark:hover:text-agri-400 transition-colors"
          title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
        >
          {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
};
