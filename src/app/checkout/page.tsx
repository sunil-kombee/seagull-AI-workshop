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
import { Textarea } from "@/components/ui/textarea";
import CartItemCard from "@/components/cart/CartItemCard";
import { useCart } from "@/contexts/CartContext";
import { useRouter } from "next/navigation";

const steps: Step[] = [
  { label: "Details" },
  { label: "Payment" },
  { label: "Confirm" },
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

  const { cartItems, getCartTotal, clearCart } = useCart();

  function handleNext() {
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  }

  return (
    <MainLayout>
      <PageHeader
        title="Booking Confirmation"
        description="Complete your booking in a few easy steps."
      />
      <div className="max-w-4xl mx-auto py-8">
        <Stepper steps={steps} currentStep={currentStep} className="mb-10" />
        <div className="bg-card rounded-lg shadow p-0 md:p-6 min-h-[200px] flex flex-col md:flex-row gap-8 w-full">
          {/* Left column: summary and stepper on desktop */}
          <div className="flex-1 w-full md:max-w-md mx-auto md:mx-0">
            {/* Step 1: Details */}
            {currentStep === 0 && (
              <>
                {/* Cart summary card */}
                <div className="bg-background rounded-lg shadow p-4 mb-6">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-8">Your cart is empty.</div>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4 mb-4"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded object-cover"
                          />
                          <div className="flex-1">
                            <div className="font-semibold text-base">
                              {item.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {item.category}
                            </div>
                            {item.bookingDate && item.bookingTime && (
                              <div className="flex items-center gap-2 text-xs mt-1">
                                <span>
                                  📅{" "}
                                  {new Intl.DateTimeFormat("en-US", {
                                    year: "numeric",
                                    month: "short",
                                    day: "numeric",
                                  }).format(new Date(item.bookingDate))}
                                </span>
                                <span>⏰ {item.bookingTime}</span>
                              </div>
                            )}
                          </div>
                          <div className="font-bold text-lg text-primary">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: item.currency,
                            }).format(item.price * item.quantity)}
                          </div>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {/* Customer info */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="mb-3 font-semibold">Customer Information</div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Full Name
                    </label>
                    <Input defaultValue="John Smith" className="w-full" />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Email Address
                    </label>
                    <Input
                      defaultValue="john.smith@example.com"
                      className="w-full"
                    />
                  </div>
                  <div className="mb-2">
                    <label className="block text-sm font-medium mb-1">
                      Phone Number
                    </label>
                    <Input defaultValue="(555) 123-4567" className="w-full" />
                  </div>
                </div>
                {/* Special instructions */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="mb-2 font-semibold">Special Instructions</div>
                  <Textarea
                    className="w-full"
                    maxLength={200}
                    placeholder="Add any special requirements or notes for the service provider..."
                    disabled
                  />
                  <div className="text-xs text-muted-foreground mt-1">
                    Your cleaner will see these instructions before arrival
                  </div>
                </div>
                {/* Price summary */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between text-base mb-1">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(getCartTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-base mb-1">
                    <span>Service fee</span>
                    <span>$4.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(getCartTotal() + 4)}
                    </span>
                  </div>
                </div>
                {/* Continue button */}
                <div className="sticky bottom-0 bg-card py-4 z-10">
                  <Button className="w-full text-lg" onClick={handleNext}>
                    Continue to Payment
                  </Button>
                </div>
              </>
            )}
            {/* Step 2: Payment */}
            {currentStep === 1 && (
              <>
                {/* Cart summary card */}
                <div className="bg-background rounded-lg shadow p-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex items-center gap-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-base">
                          {item.name}
                        </div>
                        {item.bookingDate && item.bookingTime && (
                          <div className="flex items-center gap-2 text-xs mt-1">
                            <span>
                              📅{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }).format(new Date(item.bookingDate))}
                            </span>
                            <span>⏰ {item.bookingTime}</span>
                          </div>
                        )}
                      </div>
                      <div className="font-bold text-lg text-primary">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: item.currency,
                        }).format(item.price * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                {/* Payment method (COD only) */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="mb-2 font-semibold">
                    Select Payment Method
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <input
                      type="radio"
                      defaultChecked
                      className="accent-primary"
                    />
                    <span className="font-medium">Cash on Delivery (COD)</span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    You will pay at the time of service delivery.
                  </div>
                </div>
                {/* Payment summary */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between text-base mb-1">
                    <span>Subtotal</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(getCartTotal())}
                    </span>
                  </div>
                  <div className="flex justify-between text-base mb-1">
                    <span>Service fee</span>
                    <span>$4.00</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold mt-2">
                    <span>Total</span>
                    <span>
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: "USD",
                      }).format(getCartTotal() + 4)}
                    </span>
                  </div>
                </div>
                {/* Secure payment info */}
                <div className="bg-muted/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                      SSL Encrypted
                    </span>
                    <span className="inline-block bg-primary/10 text-primary px-2 py-1 rounded text-xs font-semibold">
                      PCI DSS Compliant
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Your payment information is encrypted and secure. We do not
                    store your credit card details.
                  </div>
                </div>
                {/* Complete Payment button */}
                <div className="sticky bottom-0 bg-card py-4 z-10">
                  <Button className="w-full text-lg" onClick={handleNext}>
                    Complete Payment
                  </Button>
                </div>
              </>
            )}
            {/* Step 3: Confirmation */}
            {currentStep === 2 && (
              <>
                <div className="text-center mb-6">
                  <div className="flex flex-col items-center justify-center mb-4">
                    <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mb-2">
                      <span className="text-4xl">✔️</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-2 text-primary">
                      Booking Confirmed!
                    </h3>
                    <div className="text-muted-foreground mb-2">
                      Your reservation has been successfully confirmed
                    </div>
                    <div className="bg-muted/50 rounded-lg p-3 mb-4 inline-block">
                      <span className="font-mono text-primary text-lg">
                        Confirmation # BK4582913
                      </span>
                      <button className="ml-2 text-xs text-primary underline">
                        Copy
                      </button>
                    </div>
                  </div>
                  {/* Booking summary */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-6 text-left max-w-md mx-auto">
                    <div className="font-semibold mb-1">Booking Summary</div>
                    {cartItems.map((item) => (
                      <div key={item.id} className="mb-2">
                        <div className="font-bold">{item.name}</div>
                        <div className="text-xs text-muted-foreground">
                          Premium Service • 3 hours
                        </div>
                        {item.bookingDate && item.bookingTime && (
                          <div className="flex items-center gap-2 text-xs mt-1">
                            <span>
                              📅{" "}
                              {new Intl.DateTimeFormat("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              }).format(new Date(item.bookingDate))}
                            </span>
                            <span>⏰ {item.bookingTime} - 1:30 PM</span>
                          </div>
                        )}
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <span>
                            📍 123 Main Street, Apt 4B, San Francisco, CA 94105
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs mt-1">
                          <span>💳 Total Paid</span>
                          <span className="font-bold text-primary">
                            {new Intl.NumberFormat("en-US", {
                              style: "currency",
                              currency: item.currency,
                            }).format(item.price * item.quantity + 4)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Visa •••• 4582
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* QR code (placeholder) */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="bg-white p-4 rounded-lg shadow mb-2">
                      <img
                        src="https://api.qrserver.com/v1/create-qr-code/?size=120x120&data=BookingConfirmed"
                        alt="QR Code"
                        className="w-28 h-28"
                      />
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Show this QR code for check-in
                    </div>
                  </div>
                  {/* Action buttons */}
                  <div className="flex flex-col gap-2 mb-4">
                    <Button className="w-full">Download Confirmation</Button>
                    <Button variant="outline" className="w-full">
                      Share Details
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Calendar
                    </Button>
                  </div>
                  <Button variant="link" className="w-full text-primary">
                    View My Bookings
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
        {/* Navigation buttons for desktop */}
        <div className="flex justify-between mt-8 max-w-2xl mx-auto">
          <Button
            variant="outline"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep((s) => Math.max(0, s - 1))}
          >
            Back
          </Button>
          {currentStep !== 2 && (
            <Button
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
            >
              {currentStep === 1 ? "Complete Payment" : "Next"}
            </Button>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
