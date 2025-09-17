import React from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div
      className="flex items-center justify-center"
      aria-label="Theme toggle"
    >
      <div
        className="relative flex items-center bg-gray-200 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-full px-2 py-1 w-20 h-10 cursor-pointer transition-all duration-300"
        style={{ minWidth: '70px', minHeight: '40px' }}
        onClick={toggleTheme}
        title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        {/* Sun Icon */}
        <div className="relative z-10">
          <SunIcon
            className={`w-6 h-6 text-yellow-500 transition-all duration-300 ${theme === 'light' ? 'opacity-100' : 'opacity-60'}`}
          />
        </div>
        {/* Moon Icon */}
        <div className="relative z-10 ml-2">
          <MoonIcon
            className={`w-6 h-6 text-blue-400 transition-all duration-300 ${theme === 'dark' ? 'opacity-100' : 'opacity-60'}`}
          />
        </div>
        {/* Sliding Circle Indicator */}
        <span
          className={`absolute top-1 left-1 w-8 h-8 bg-white/80 dark:bg-gray-900/80 rounded-full shadow transition-all duration-300 border border-gray-300 dark:border-gray-600 ${theme === 'light' ? 'translate-x-0' : 'translate-x-8'}`}
          style={{ transform: theme === 'light' ? 'translateX(0)' : 'translateX(32px)', zIndex: 5 }}
        />
      </div>
    </div>
  );
};

export default ThemeToggle;
