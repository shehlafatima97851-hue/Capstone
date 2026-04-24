import { FaMoon, FaSun } from 'react-icons/fa';

function ThemeToggle({ theme, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="inline-flex items-center gap-3 rounded-3xl border border-slate-800/80 bg-slate-950/80 px-4 py-3 text-sm text-slate-200 transition hover:border-sky-500"
    >
      {theme === 'dark' ? <FaMoon /> : <FaSun />} {theme === 'dark' ? 'Dark mode' : 'Light mode'}
    </button>
  );
}

export default ThemeToggle;
