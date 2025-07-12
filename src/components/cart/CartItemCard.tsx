"use client";

import Image from "next/image";
import type { CartItem } from "@/contexts/CartContext";
import { useCart } from "@/contexts/CartContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Minus, Plus, X } from "lucide-react";
import Link from "next/link";

interface CartItemCardProps {
  item: CartItem;
}

export default function CartItemCard({ item }: CartItemCardProps) {
  const { removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.id, newQuantity);
  };

  return (
    <div className="flex items-start space-x-4 p-4 border border-border rounded-lg shadow-sm bg-card mb-4">
      <Link href={`/services/${item.id}`} className="shrink-0">
        <Image
          src={item.image}
          alt={item.name}
          width={100}
          height={100}
          className="rounded-md object-cover aspect-square"
          data-ai-hint={item.dataAiHint}
        />
      </Link>
      <div className="flex-grow">
        <Link href={`/services/${item.id}`}>
          <h3 className="text-lg font-semibold  text-foreground hover:text-primary transition-colors">
            {item.name}
          </h3>
        </Link>
        <p className="text-sm text-muted-foreground">{item.category}</p>
        {item.selectedAddOns && item.selectedAddOns.length > 0 && (
          <div className="mt-1 space-y-1">
            {item.selectedAddOns.map((addon) => (
              <div
                key={addon.name}
                className="flex justify-between text-xs text-muted-foreground"
              >
                <span>+ {addon.name}</span>
                <span>
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: item.currency,
                  }).format(addon.price)}
                </span>
              </div>
            ))}
          </div>
        )}
        {/* Per-item subtotal */}
        <p className="text-xs font-semibold text-primary mt-1">
          Subtotal:{" "}
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.currency,
          }).format(
            (item.price +
              (item.selectedAddOns?.reduce((sum, a) => sum + a.price, 0) ||
                0)) *
              item.quantity
          )}
        </p>
        {item.bookingDate && item.bookingTime && (
          <p className="text-xs text-muted-foreground mt-1">
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "short",
              day: "numeric",
            }).format(new Date(item.bookingDate))}
            {" • "}
            {item.bookingTime}
          </p>
        )}
        <p className="text-lg font-medium text-primary mt-1">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.currency,
          }).format(item.price)}
        </p>
        <div className="flex items-center space-x-2 mt-2">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <Input
            type="number"
            className="h-8 w-12 text-center px-0"
            value={item.quantity}
            onChange={(e) => handleQuantityChange(parseInt(e.target.value, 10))}
            min="1"
          />
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="flex flex-col items-end justify-between h-full">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => removeFromCart(item.id)}
          className="text-muted-foreground hover:text-destructive"
        >
          <X className="h-5 w-5" />
          <span className="sr-only">Remove item</span>
        </Button>
        <p className="text-lg font-semibold text-foreground mt-auto">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: item.currency,
          }).format(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}
