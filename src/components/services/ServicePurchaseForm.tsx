"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Minus, Plus, ShoppingCart } from "lucide-react";
import { useCartStore } from "@/store/cart-store";
import { Service } from "@/data/services";
import { Separator } from "@/components/ui/separator";

interface ServicePurchaseFormProps {
  service: Service;
}

export function ServicePurchaseForm({ service }: ServicePurchaseFormProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    addToCart(service, quantity);
  };

  return (
    <div className="space-y-4">
      <p className="text-muted-foreground">{service.description}</p>

      <Separator />

      <div className="flex items-center space-x-4">
        <p className="font-medium text-foreground">Quantity:</p>
        <div className="flex items-center border border-border rounded-md">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
            className="rounded-r-none"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="px-4 w-12 text-center font-medium">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setQuantity((prev) => prev + 1)}
            className="rounded-l-none"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Button
        size="lg"
        className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow"
        onClick={handleAddToCart}
      >
        <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
      </Button>
    </div>
  );
}
