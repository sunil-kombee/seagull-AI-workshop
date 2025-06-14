import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string | ReactNode;
  className?: string;
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={`mb-8 pb-4 border-b border-border ${className}`}>
      <h1 className="text-4xl font-bold font-headline text-primary">{title}</h1>
      {description && <p className="mt-2 text-lg text-muted-foreground">{description}</p>}
    </div>
  );
}
