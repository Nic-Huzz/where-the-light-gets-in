'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  showNav?: boolean;
}

export function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-primary-dark flex items-center justify-center">
            <span className="text-white text-sm">✨</span>
          </div>
          <span className="font-semibold text-text hidden sm:inline">
            Where the Light Gets In
          </span>
        </Link>

        {/* Navigation */}
        {showNav && (
          <nav className="flex items-center gap-1 sm:gap-2">
            <NavLink href="/dashboard" active={pathname === '/dashboard'}>
              Home
            </NavLink>
            <NavLink href="/quick-wins" active={pathname?.startsWith('/quick-wins')}>
              Quick Wins
            </NavLink>
            <NavLink href="/deep-work" active={pathname?.startsWith('/deep-work')}>
              Deep Work
            </NavLink>
            <NavLink href="/crowey-snax" active={pathname === '/crowey-snax'}>
              🍪
            </NavLink>
          </nav>
        )}
      </div>
    </header>
  );
}

function NavLink({
  href,
  active,
  children,
}: {
  href: string;
  active: boolean;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className={`
        px-3 py-2 rounded-lg text-sm font-medium
        transition-colors duration-200
        ${active
          ? 'bg-primary/10 text-primary'
          : 'text-text-light hover:text-text hover:bg-gray-100'
        }
      `}
    >
      {children}
    </Link>
  );
}

export default Header;
