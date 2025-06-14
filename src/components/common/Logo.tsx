import Link from 'next/link';

const Logo = ({ className = "" }: { className?: string }) => {
  return (
    <Link href="/" className={`text-2xl md:text-3xl font-bold font-headline text-primary hover:text-primary/90 transition-colors ${className}`}>
      Global Travel Hub
    </Link>
  );
};
export default Logo;
