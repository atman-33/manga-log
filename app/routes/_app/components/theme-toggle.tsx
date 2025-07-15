import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Toggle } from '~/components/ui/toggle';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Toggle
      onPressedChange={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label="Toggle theme"
      className="transition-all duration-300 transform hover:scale-105 cursor-pointer"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </Toggle>
  );
}
