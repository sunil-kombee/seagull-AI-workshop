"use client";

import PageHeader from "@/components/ui/PageHeader";
import CartItemCard from "@/components/cart/CartItemCard";
import { useCartStore } from "@/store/cart-store";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";

export default function CartPage() {
  const cartItems = useCartStore((state) => state.cartItems);
  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const clearCart = useCartStore((state) => state.clearCart);

  return (
    <>
      <PageHeader
        title="Your Shopping Cart"
        description="Review items in your cart and proceed to checkout."
      />
      {cartItems.length === 0 ? (
        <div className="text-center py-16 bg-card rounded-lg shadow-md">
          <ShoppingCart className="h-24 w-24 text-muted-foreground/50 mx-auto mb-6" />
          <h2 className="text-2xl font-semibold  text-foreground mb-3">
            Your cart is empty.
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some amazing travel services to get started!
          </p>
          <Link href="/services" passHref>
            <Button size="lg">Explore Services</Button>
          </Link>
        </div>
      ) :
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-6">
            {cartItems.map((item) => (
              <CartItemCard key={item.id} item={item} />
            ))}
          </div>
          <Card className="lg:col-span-1 p-6 shadow-lg sticky top-24">
            <h2 className="text-2xl font-bold  text-primary mb-6">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-foreground">
                <span>Subtotal</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(getCartTotal())}
                  {/* Assuming USD, adjust as needed */}
                </span>
              </div>
              <div className="flex justify-between text-foreground">
                <span>Shipping/Fees</span>
                <span>Calculated at checkout</span>
              </div>
              <hr className="my-2 border-border" />
              <div className="flex justify-between text-xl font-semibold text-foreground">
                <span>Total</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: "USD",
                  }).format(getCartTotal())}
                </span>
              </div>
            </div>
            <Button size="lg" className="w-full text-lg py-3 mb-3" asChild>
              <Link href="/checkout">Proceed to Checkout</Link>
            </Button>
            <Button variant="outline" className="w-full" onClick={clearCart}>
              Clear Cart
            </Button>
          </Card>
        </div>
      )}
    </>
  );
}
