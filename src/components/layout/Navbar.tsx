"use client";

import Link from "next/link";
import { ShoppingCart, UserCircle2, Menu, X } from "lucide-react";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import Logo from "@/components/common/Logo";
import { useCartStore } from "@/store/cart-store";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => (
  <Link
    href={href}
    onClick={onClick}
    className="text-foreground hover:text-primary transition-colors px-3 py-2 rounded-md text-sm font-medium"
  >
    {children}
  </Link>
);

export default function Navbar() {
  const getItemCount = useCartStore((state) => state.getItemCount);
  const setIsCartOpen = useCartStore((state) => state.setIsCartOpen);
  const [itemCount, setItemCount] = useState(0);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const { user } = useAuthStore();

  useEffect(() => {
    setItemCount(getItemCount());
  }, [getItemCount]);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    ...(user?.isAuthenticated
      ? [{ href: "/dashboard", label: "Dashboard" }]
      : []),
  ];

  return (
    <header className="bg-card shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          <nav className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <NavLink key={item.href} href={item.href}>
                {item.label}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-3 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsCartOpen(true)}
              aria-label="Open cart"
              className="relative"
            >
              <ShoppingCart className="h-6 w-6 text-foreground" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-primary-foreground bg-primary rounded-full">
                  {itemCount}
                </span>
              )}
            </Button>
            {user?.isAuthenticated ? (
              <Link href="/dashboard" passHref>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden md:inline-flex"
                  aria-label="Profile"
                >
                  <UserCircle2 className="h-6 w-6 text-foreground" />
                </Button>
              </Link>
            ) : (
              <Link href="/login" passHref>
                <Button
                  variant="outline"
                  size="icon"
                  className="hidden md:inline-flex"
                  aria-label="Login"
                >
                  <UserCircle2 className="h-6 w-6 text-foreground" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
