"use client";

import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import CartItemCard from "./CartItemCard";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";

export default function CartSidebar() {
  const {
    cartItems,
    getCartTotal,
    getItemCount,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();

  return (
    <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
      <SheetContent className="w-full sm:max-w-md flex flex-col p-0 bg-card shadow-xl">
        <SheetHeader className="p-6 pb-4 border-b">
          <div className="flex justify-between items-center">
            <SheetTitle className="text-2xl  text-primary">
              Your Cart
            </SheetTitle>
            <SheetClose asChild>
              <Button variant="ghost" size="icon">
                <X className="h-6 w-6" />
              </Button>
            </SheetClose>
          </div>
          <p className="text-sm text-muted-foreground">
            {getItemCount()} item(s)
          </p>
        </SheetHeader>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-6">
            <ShoppingCart className="h-20 w-20 text-muted-foreground/50 mb-6" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Your cart is empty
            </h3>
            <p className="text-muted-foreground mb-6">
              Looks like you haven&apos;t added anything to your cart yet.
            </p>
            <SheetClose asChild>
              <Link href="/services" passHref>
                <Button>Start Shopping</Button>
              </Link>
            </SheetClose>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-grow p-6 pr-3">
              {" "}
              {/* pr-3 for scrollbar */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <CartItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
            <SheetFooter className="p-6 border-t bg-muted/50">
              <div className="w-full space-y-4">
                <div className="flex justify-between items-center text-xl font-semibold">
                  <span className="text-foreground">Subtotal:</span>
                  <span className="text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(getCartTotal())}
                    {/* Assuming USD, ideally use first item's currency or a global setting */}
                  </span>
                </div>
                {/* Example discount logic: $20 off if subtotal > $300 */}
                {getCartTotal() > 300 && (
                  <div className="flex justify-between items-center text-green-600 text-base">
                    <span>Discount</span>
                    <span>
                      -
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(20)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between items-center text-2xl font-bold border-t pt-4">
                  <span>Total</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(
                      getCartTotal() > 300
                        ? getCartTotal() - 20
                        : getCartTotal()
                    )}
                  </span>
                </div>
                {/* Promo code input UI */}
                <div className="flex items-center gap-2 mt-2">
                  <input
                    type="text"
                    className="flex-1 border border-border rounded-md px-3 py-2 text-sm"
                    placeholder="Add promo code"
                    disabled
                  />
                  <Button size="sm" disabled>
                    Apply
                  </Button>
                </div>
                <SheetClose asChild>
                  <Button
                    size="lg"
                    className="w-full text-lg py-3 mb-3"
                    asChild
                  >
                    <Link href="/checkout">Proceed to Checkout</Link>
                  </Button>
                </SheetClose>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={clearCart}
                >
                  Clear Cart
                </Button>
              </div>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
