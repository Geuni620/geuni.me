import Link from 'next/link';

import { DarkModeToggle } from './DarkModeToggle';

export const Nav = () => {
  return (
    <ul data-animate className="flex items-center justify-between">
      <Link href="/">
        <div className="flex gap-2">
          <li>이근휘</li>
          <li>Geuni620</li>
        </div>
      </Link>
      <DarkModeToggle />
    </ul>
  );
};
