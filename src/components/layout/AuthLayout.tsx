import type { ReactNode } from 'react';
import Logo from '@/components/common/Logo';

export default function AuthLayout({ children, title }: { children: ReactNode, title: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 p-4">
      <div className="mb-8">
        <Logo />
      </div>
      <div className="w-full max-w-md bg-card p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-bold font-headline text-center text-foreground mb-8">{title}</h2>
        {children}
      </div>
      <p className="mt-8 text-sm text-muted-foreground">
        &copy; {new Date().getFullYear()} Global Travel Hub. All rights reserved.
      </p>
    </div>
  );
}
