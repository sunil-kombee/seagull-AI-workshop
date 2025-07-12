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
import { useCartStore } from "@/store/cart-store";
import { useRouter } from "next/navigation";
import { useRef } from "react";

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
  const confirmationRef = useRef<HTMLDivElement>(null);
  const { cartItems, getCartTotal, clearCart } = useCartStore();

  function handleNext() {
    setCurrentStep((s) => Math.min(steps.length - 1, s + 1));
  }

  // --- Button Handlers ---
  // 1. Download Confirmation (Print)
  function handleDownloadConfirmation() {
    if (!confirmationRef.current) return;
    const printContents = confirmationRef.current.innerHTML;
    const printWindow = window.open("", "", "height=600,width=400");
    if (printWindow) {
      printWindow.document.write(
        "<html><head><title>Booking Confirmation</title>"
      );
      // Add minimal styles for print
      printWindow.document.write(
        "<style>body{font-family:sans-serif;padding:24px;} .bg-green-100{background:#d1fae5;} .rounded-full{border-radius:9999px;} .font-bold{font-weight:bold;} .text-primary{color:#4f46e5;} .text-2xl{font-size:1.5rem;} .mb-2{margin-bottom:0.5rem;} .mb-4{margin-bottom:1rem;} .w-16{width:4rem;} .h-16{height:4rem;} .w-28{width:7rem;} .h-28{height:7rem;} .rounded-lg{border-radius:0.5rem;} .shadow{box-shadow:0 1px 3px rgba(0,0,0,0.1);} .text-center{text-align:center;} .mb-6{margin-bottom:1.5rem;} .flex{display:flex;} .items-center{align-items:center;} .justify-center{justify-content:center;} .gap-2{gap:0.5rem;} .gap-4{gap:1rem;} .font-mono{font-family:monospace;} .text-lg{font-size:1.125rem;} .inline-block{display:inline-block;} .p-3{padding:0.75rem;} .p-4{padding:1rem;} .max-w-md{max-width:28rem;} .mx-auto{margin-left:auto;margin-right:auto;} .text-xs{font-size:0.75rem;} .text-muted-foreground{color:#6b7280;} .bg-white{background:#fff;} .border{border:1px solid #e5e7eb;} .rounded{border-radius:0.25rem;}</style>"
      );
      printWindow.document.write("</head><body>");
      printWindow.document.write(printContents);
      printWindow.document.write("</body></html>");
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 300);
    }
  }

  // 2. Share Details (Web Share API or Clipboard)
  async function handleShareDetails() {
    const item = cartItems[0];
    if (!item) return;
    const details = `Booking Confirmation\nService: ${item.name}\nDate: ${
      item.bookingDate
    } ${item.bookingTime}\nTotal: $${item.price * item.quantity + 4}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: "Booking Confirmation", text: details });
      } catch (e) {}
    } else if (navigator.clipboard) {
      await navigator.clipboard.writeText(details);
      alert("Booking details copied to clipboard!");
    }
  }

  // 3. Add to Calendar (.ics download)
  function handleAddToCalendar() {
    const item = cartItems[0];
    if (!item) return;
    if (!item.bookingDate || !/^\d{4}-\d{2}-\d{2}$/.test(item.bookingDate)) {
      alert("Booking date is missing or invalid.");
      console.error("Invalid bookingDate:", item.bookingDate);
      return;
    }
    // Accept both valid time or fallback to 09:00
    const time =
      item.bookingTime && /^\d{1,2}:\d{2}$/.test(item.bookingTime)
        ? item.bookingTime
        : "09:00";
    if (!item.bookingTime || !/^\d{1,2}:\d{2}$/.test(item.bookingTime)) {
      console.warn(
        "Invalid or missing bookingTime, using fallback 09:00:",
        item.bookingTime
      );
    }
    const start = new Date(item.bookingDate + "T" + time);
    if (isNaN(start.getTime())) {
      alert("Could not create a valid start date for the calendar event.");
      console.error("Invalid start date:", item.bookingDate, time);
      return;
    }
    const end = new Date(start.getTime() + 3 * 60 * 60 * 1000); // 3 hours
    function formatICSDate(date: Date) {
      return date.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
    }
    const ics = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "BEGIN:VEVENT",
      `SUMMARY:${item.name}`,
      `DTSTART:${formatICSDate(start)}`,
      `DTEND:${formatICSDate(end)}`,
      `DESCRIPTION:Booking for ${item.name}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ].join("\r\n");
    try {
      const blob = new Blob([ics], { type: "text/calendar" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "booking.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch {
      const a = document.createElement("a");
      a.href = "data:text/calendar;charset=utf-8," + encodeURIComponent(ics);
      a.download = "booking.ics";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  }

  // 4. View My Bookings
  function handleViewBookings() {
    router.push("/dashboard");
  }

  // 5. Explore More Services
  function handleExploreServices() {
    router.push("/services");
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-2xl w-full mx-auto bg-white rounded-xl shadow p-4 sm:p-8">
        <PageHeader
          title="Booking Confirmation"
          description="Complete your booking in a few easy steps."
        />
        <Stepper steps={steps} currentStep={currentStep} className="mb-10" />
        {/* Stepper and content */}
        {/* Step 1: Details */}
        {currentStep === 0 && (
          <>
            {/* Service summary card */}
            <div className="bg-white rounded-lg shadow border p-4 mb-6 flex items-center gap-4">
              {cartItems.length > 0 && (
                <>
                  <img
                    src={cartItems[0].image}
                    alt={cartItems[0].name}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <div className="flex-1">
                    <div className="font-semibold text-lg">
                      {cartItems[0].name}
                    </div>
                    <div className="text-xs text-muted-foreground mb-1">
                      {cartItems[0].category}
                    </div>
                    {cartItems[0].bookingDate && cartItems[0].bookingTime && (
                      <div className="flex items-center gap-2 text-xs">
                        <span>
                          📅{" "}
                          {new Intl.DateTimeFormat("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          }).format(new Date(cartItems[0].bookingDate))}
                        </span>
                        <span>⏰ {cartItems[0].bookingTime}</span>
                      </div>
                    )}
                  </div>
                  <div className="font-bold text-xl text-primary">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: cartItems[0].currency,
                    }).format(cartItems[0].price * cartItems[0].quantity)}
                  </div>
                </>
              )}
            </div>
            {/* Customer info */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="mb-3 font-semibold text-lg">
                Customer Information
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Full Name
                </label>
                <Input defaultValue="John Smith" className="w-full bg-white" />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Email Address
                </label>
                <Input
                  defaultValue="john.smith@example.com"
                  className="w-full bg-white"
                />
              </div>
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">
                  Phone Number
                </label>
                <Input
                  defaultValue="(555) 123-4567"
                  className="w-full bg-white"
                />
              </div>
            </div>
            {/* Special instructions */}
            <div className="bg-blue-50 rounded-lg p-4 mb-6">
              <div className="mb-2 font-semibold text-lg">
                Special Instructions
              </div>
              <Textarea
                className="w-full bg-white"
                maxLength={200}
                placeholder="Add any special requirements or notes for the service provider..."
                disabled
              />
              <div className="text-xs text-muted-foreground mt-1">
                Your cleaner will see these instructions before arrival
              </div>
            </div>
            {/* Price summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 border">
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
            <div className="w-full flex justify-center">
              <Button className="w-full sm:w-2/3 text-lg" onClick={handleNext}>
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
                    <div className="font-semibold text-base">{item.name}</div>
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
              <div className="mb-2 font-semibold">Select Payment Method</div>
              <div className="flex items-center gap-2 mb-2">
                <input type="radio" defaultChecked className="accent-primary" />
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
            <div className="text-center mb-6" ref={confirmationRef}>
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
                <Button className="w-full" onClick={handleDownloadConfirmation}>
                  Download Confirmation
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleShareDetails}
                >
                  Share Details
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleAddToCalendar}
                >
                  Add to Calendar
                </Button>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleExploreServices}
                >
                  Explore More Services
                </Button>
              </div>
              <Button
                variant="link"
                className="w-full text-primary"
                onClick={handleViewBookings}
              >
                View My Bookings
              </Button>
            </div>
          </>
        )}
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
          <Button onClick={handleNext} disabled={currentStep === 2}>
            {currentStep === 1 ? "Complete Payment" : "Next"}
          </Button>
        )}
      </div>
    </div>
  );
}
