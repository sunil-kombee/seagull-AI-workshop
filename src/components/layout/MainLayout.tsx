import type { ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import CartSidebar from '@/components/cart/CartSidebar';

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <CartSidebar />
      <Footer />
    </>
  );
}
