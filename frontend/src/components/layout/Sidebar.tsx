import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  PhoneCall, 
  History, 
  BookOpen, 
  CloudSun, 
  Settings as SettingsIcon,
  X,
  Sprout
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Voice Consultation', path: '/consultation', icon: PhoneCall },
  { name: 'Call History', path: '/history', icon: History },
  { name: 'Knowledge Base', path: '/knowledge', icon: BookOpen },
  { name: 'Weather Alerts', path: '/weather', icon: CloudSun },
  { name: 'Settings', path: '/settings', icon: SettingsIcon },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden transition-opacity"
          onClick={onClose}
        />
      )}

      {/* Sidebar Navigation */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 glass-card border-r border-gray-200/80 dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200/80 dark:border-dark-border">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-agri-600 rounded-xl text-white shadow-md shadow-agri-600/30">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <h1 className="font-bold text-lg text-gray-900 dark:text-white leading-tight">
                AgriVoice <span className="text-agri-600 dark:text-agri-400">AI</span>
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Farmer Assistant</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="lg:hidden p-1 rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1.5 overflow-y-auto h-[calc(100vh-4rem)]">
          <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
            Main Navigation
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                    isActive
                      ? 'bg-agri-600 text-white shadow-md shadow-agri-600/25 dark:bg-agri-600'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-agri-50 dark:hover:bg-agri-950/40 hover:text-agri-700 dark:hover:text-agri-300'
                  }`
                }
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}

          <div className="pt-6 px-3">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-agri-500/10 to-agri-600/20 border border-agri-500/20 text-center">
              <p className="text-xs font-semibold text-agri-800 dark:text-agri-300">Toll-Free Telephony</p>
              <p className="text-sm font-bold text-gray-900 dark:text-white mt-1">+1 (800) 555-FARM</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 text-[10px] font-semibold bg-agri-600 text-white rounded-full">
                Active 24/7
              </span>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
};
