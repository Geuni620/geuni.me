import { DarkModeToggle } from './DarkModeToggle';

export const Nav = () => {
  return (
    <ul className="flex items-center justify-between">
      <div className="flex gap-2">
        <li>이근휘</li>
        <li>Geuni620</li>
      </div>
      <DarkModeToggle />
    </ul>
  );
};
