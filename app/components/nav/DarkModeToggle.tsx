'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export const DarkModeToggle = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const toggleDarkMode = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const ThemeIcon = () => (theme === 'light' ? <SunIcon /> : <MoonIcon />);

  return (
    <li onClick={toggleDarkMode} className="cursor-pointer">
      <ThemeIcon />
    </li>
  );
};
