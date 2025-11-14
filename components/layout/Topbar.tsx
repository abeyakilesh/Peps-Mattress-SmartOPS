
import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../../App';
import { SearchIcon, BellIcon, ChevronDownIcon, SunIcon, MoonIcon } from '../../constants';

export const ThemeToggle: React.FC = () => {
    const { theme, toggleTheme } = useTheme();
    return (
        <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
            {theme === 'light' ? <MoonIcon className="h-5 w-5" /> : <SunIcon className="h-5 w-5" />}
        </button>
    );
};


export const Topbar: React.FC = () => {
  return (
    <header className="h-20 flex-shrink-0 flex items-center justify-between px-8 bg-light-card dark:bg-dark-card border-b border-gray-200 dark:border-gray-700">
        {/* Search */}
        <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input 
                type="text"
                placeholder="Search for metrics, trucks..."
                className="bg-gray-100 dark:bg-gray-800 rounded-lg pl-10 pr-4 py-2 w-80 focus:ring-2 focus:ring-siemens-teal focus:outline-none transition"
            />
        </div>
        
        {/* User section */}
        <div className="flex items-center gap-4">
            <ThemeToggle />
            <div className="relative">
                <BellIcon className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                </span>
            </div>
            
            <div className="flex items-center gap-3">
                <img src="https://picsum.photos/id/1027/40/40" alt="User Avatar" className="rounded-full h-10 w-10 border-2 border-siemens-teal" />
                <div>
                    <p className="font-semibold text-sm">Alex Turner</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Manager</p>
                </div>
                <ChevronDownIcon className="h-5 w-5 text-gray-400 cursor-pointer" />
            </div>
        </div>
    </header>
  );
};
