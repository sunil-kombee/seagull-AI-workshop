"use client";

import MainLayout from "@/components/layout/MainLayout";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { X, Edit2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { cartItems, getCartTotal, clearCart, removeFromCart } = useCart();
  const router = useRouter();

  // Price details
  const serviceFee = 15;
  const taxes = 10;
  const subtotal = getCartTotal();
  const total = subtotal + serviceFee + taxes;

  return (
    <MainLayout>
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:gap-8">
          {/* Left: Service Summary */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <button onClick={() => router.back()} className="text-xl mr-2">
                  ←
                </button>
                <h1 className="text-2xl font-semibold">Your Cart</h1>
              </div>
              {cartItems.length > 0 && (
                <button
                  onClick={clearCart}
                  className="text-primary text-sm font-medium hover:underline"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="text-lg font-medium mb-4">Service Summary</div>
            <div className="space-y-4">
              {cartItems.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg shadow border">
                  <h2 className="text-2xl font-semibold mb-3">
                    Your cart is empty.
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Add some services to get started!
                  </p>
                  <Link href="/services" passHref>
                    <Button size="lg">Explore Services</Button>
                  </Link>
                </div>
              ) : (
                cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center bg-white rounded-lg shadow border p-4 gap-4"
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="rounded-md object-cover w-20 h-20"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="font-semibold text-base">
                          {item.name}
                        </div>
                        <div className="font-bold text-base text-foreground">
                          ${item.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="text-sm text-muted-foreground mb-1 truncate">
                        {item.category || item.description}
                      </div>
                      <div className="flex items-center text-xs text-muted-foreground gap-2 mb-1">
                        {item.bookingDate && (
                          <span>
                            {new Intl.DateTimeFormat("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            }).format(new Date(item.bookingDate))}
                          </span>
                        )}
                        {item.bookingTime && <span>{item.bookingTime}</span>}
                      </div>
                      <div className="flex gap-4 mt-1">
                        <button
                          onClick={() => router.push(`/services/${item.id}`)}
                          className="flex items-center gap-1 text-primary text-xs font-medium hover:underline"
                        >
                          <Edit2 className="w-4 h-4" /> Edit
                        </button>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="flex items-center gap-1 text-destructive text-xs font-medium hover:underline"
                        >
                          <X className="w-4 h-4" /> Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
          {/* Right: Price Details */}
          {cartItems.length > 0 && (
            <div className="w-full md:w-80 mt-10 md:mt-0 md:ml-4">
              <div className="bg-white rounded-lg shadow border p-6 sticky top-24">
                <div className="text-lg font-semibold mb-4">Price Details</div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Service fee</span>
                  <span>${serviceFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between mb-2 text-sm">
                  <span>Taxes</span>
                  <span>${taxes.toFixed(2)}</span>
                </div>
                <div className="border-t my-3" />
                <div className="flex justify-between mb-4 text-base font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between bg-gray-50 rounded px-3 py-2 mb-4 border">
                  <span className="text-sm">Have a promo code?</span>
                  <button className="text-primary text-sm font-medium hover:underline">
                    &gt;
                  </button>
                </div>
                <Button size="lg" className="w-full text-lg py-3 mb-2" asChild>
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
