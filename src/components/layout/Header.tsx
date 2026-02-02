'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface HeaderProps {
  showNav?: boolean;
}

export function Header({ showNav = true }: HeaderProps) {
  const pathname = usePathname();

  if (!showNav) return null;

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 safe-area-bottom">
      <div className="max-w-lg mx-auto px-2 h-16 flex items-center justify-around">
        <NavLink
          href="/dashboard"
          active={pathname === '/dashboard'}
          icon={<HomeIcon />}
          label="Home"
        />
        <NavLink
          href="/quick-wins"
          active={pathname?.startsWith('/quick-wins') ?? false}
          icon={<QuickWinsIcon />}
          label="Quick Wins"
        />
        <NavLink
          href="/deep-work"
          active={pathname?.startsWith('/deep-work') ?? false}
          icon={<DeepWorkIcon />}
          label="Deep Work"
        />
        <NavLink
          href="/crowey-snax"
          active={pathname === '/crowey-snax'}
          icon={<span className="text-xl">🍪</span>}
          label="Snax"
        />
      </div>
    </nav>
  );
}

function NavLink({
  href,
  active,
  icon,
  label,
}: {
  href: string;
  active: boolean;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className={`
        flex flex-col items-center justify-center gap-1
        px-3 py-2 rounded-xl min-w-[70px]
        transition-all duration-200
        ${active
          ? 'bg-[#E8F4F8] text-[#5FBDD6]'
          : 'text-gray-500 hover:text-[#5FBDD6] hover:bg-gray-50'
        }
      `}
    >
      <span className={active ? 'scale-110 transition-transform' : ''}>{icon}</span>
      <span className={`text-[10px] font-medium uppercase tracking-wide ${active ? 'text-[#5FBDD6]' : ''}`}>
        {label}
      </span>
    </Link>
  );
}

function HomeIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function QuickWinsIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function DeepWorkIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </svg>
  );
}

export default Header;
