"use client";

import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Stepper, Step } from "@/components/ui/Stepper";
import { useState } from "react";
import { z } from "zod";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import CartItemCard from "@/components/cart/CartItemCard";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

const steps: Step[] = [
  { label: "Details" },
  { label: "Review" },
  { label: "Payment" },
  { label: "Confirmation" },
];

const bookingDetailsSchema = z.object({
  date: z.date({ required_error: "Date is required" }),
  quantity: z
    .number({ invalid_type_error: "Quantity is required" })
    .min(1, "At least 1 required")
    .max(10, "Max 10 allowed"),
});

type BookingDetails = z.infer<typeof bookingDetailsSchema>;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const router = useRouter();

  // Booking Details form
  const form = useForm<BookingDetails>({
    resolver: zodResolver(bookingDetailsSchema),
    defaultValues: {
      date: undefined,
      quantity: 1,
    },
    mode: "onTouched",
  });

  const { cartItems, getCartTotal, clearCart } = useCart();

  function handleNext() {
    if (currentStep === 0) {
      form.handleSubmit(() => setCurrentStep((s) => s + 1))();
    } else {
      setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
    }
  }

  return (
    <MainLayout>
      <PageHeader
        title="Checkout"
        description="Complete your booking in a few easy steps."
      />
      <div className="max-w-2xl mx-auto py-8">
        <Stepper steps={steps} currentStep={currentStep} className="mb-10" />
        <div className="bg-card rounded-lg shadow p-6 min-h-[200px] flex flex-col items-center justify-center w-full">
          {currentStep === 0 && (
            <FormProvider {...form}>
              <Form {...form}>
                <form
                  className="space-y-6 w-full max-w-md"
                  onSubmit={form.handleSubmit(() => setCurrentStep(1))}
                >
                  <FormField
                    control={form.control}
                    name="date"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Date</FormLabel>
                        <FormControl>
                          <Calendar
                            mode="single"
                            selected={field.value}
                            onSelect={field.onChange}
                            fromDate={new Date()}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="quantity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quantity</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={10}
                            value={field.value}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormDescription>Max 10 per booking.</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    Next
                  </Button>
                </form>
              </Form>
            </FormProvider>
          )}
          {currentStep === 1 && (
            <div className="w-full">
              <h3 className="text-xl font-semibold mb-4">Review Your Cart</h3>
              {cartItems.length === 0 ? (
                <div className="text-center py-8">Your cart is empty.</div>
              ) : (
                <>
                  <div className="space-y-4 mb-6">
                    {cartItems.map((item) => (
                      <CartItemCard key={item.id} item={item} />
                    ))}
                  </div>
                  <div className="flex justify-between items-center border-t pt-4 mt-4">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-primary">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(getCartTotal())}
                    </span>
                  </div>
                </>
              )}
            </div>
          )}
          {currentStep === 2 && (
            <div className="w-full max-w-md text-center">
              <h3 className="text-xl font-semibold mb-4">Payment</h3>
              <div className="mb-6">
                <p className="text-lg">
                  Payment Method:{" "}
                  <span className="font-bold">Cash on Delivery (COD)</span>
                </p>
                <p className="text-muted-foreground mt-2">
                  You will pay at the time of service delivery.
                </p>
              </div>
              <Button className="w-full" onClick={() => setCurrentStep(3)}>
                Confirm Booking
              </Button>
            </div>
          )}
          {currentStep === 3 && (
            <div className="w-full max-w-md text-center">
              <h3 className="text-2xl font-bold mb-4 text-primary">
                Booking Confirmed!
              </h3>
              <p className="mb-4">
                Thank you for your booking. You will receive a confirmation
                email and voucher shortly.
              </p>
              <Button
                className="w-full mb-2"
                onClick={() => {
                  clearCart();
                  router.push("/services");
                }}
              >
                Back to Services
              </Button>
            </div>
          )}
        </div>
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {currentStep !== 0 && currentStep < 2 && (
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              Next
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
