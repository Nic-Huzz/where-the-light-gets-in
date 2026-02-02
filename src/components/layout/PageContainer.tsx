'use client';

import { ReactNode } from 'react';

interface PageContainerProps {
  children: ReactNode;
  className?: string;
  centered?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
  animate?: boolean;
}

const maxWidthStyles = {
  sm: 'max-w-md',
  md: 'max-w-2xl',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
};

export function PageContainer({
  children,
  className = '',
  centered = false,
  maxWidth = 'lg',
  animate = true,
}: PageContainerProps) {
  return (
    <main
      className={`
        ${maxWidthStyles[maxWidth]}
        mx-auto
        px-4 py-8
        min-h-[calc(100vh-4rem)]
        ${centered ? 'flex flex-col items-center justify-center' : ''}
        ${animate ? 'page-transition' : ''}
        ${className}
      `}
    >
      {children}
    </main>
  );
}

export default PageContainer;
