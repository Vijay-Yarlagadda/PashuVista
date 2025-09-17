import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative p-2 rounded-lg transition-all duration-300 ease-in-out
                 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700
                 border border-gray-200 dark:border-gray-600
                 shadow-sm hover:shadow-md
                 group"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="relative w-6 h-6">
        {/* Sun Icon */}
        <SunIcon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out
                     text-yellow-500 group-hover:text-yellow-600
                     ${theme === 'light' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 rotate-90 scale-75'
                     }`}
        />
        
        {/* Moon Icon */}
        <MoonIcon 
          className={`absolute inset-0 w-6 h-6 transition-all duration-300 ease-in-out
                     text-blue-400 group-hover:text-blue-500
                     ${theme === 'dark' 
                       ? 'opacity-100 rotate-0 scale-100' 
                       : 'opacity-0 -rotate-90 scale-75'
                     }`}
        />
      </div>
      
      {/* Subtle glow effect */}
      <div className={`absolute inset-0 rounded-lg transition-opacity duration-300
                      ${theme === 'light' 
                        ? 'bg-yellow-200 opacity-0 group-hover:opacity-20' 
                        : 'bg-blue-200 opacity-0 group-hover:opacity-20'
                      }`} />
    </button>
  );
};

export default ThemeToggle;
