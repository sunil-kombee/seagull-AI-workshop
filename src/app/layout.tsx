import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/contexts/CartContext";
import { ClientOnly } from "@/components/utils/ClientOnly";

export const metadata: Metadata = {
  title: "Global Travel Hub",
  description: "Your one-stop solution for travel services worldwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&family=Playfair+Display:wght@400;700;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased bg-background text-foreground flex flex-col min-h-screen">
        <CartProvider>
          {children}
          <ClientOnly>
            <Toaster />
          </ClientOnly>
        </CartProvider>
      </body>
    </html>
  );
}
