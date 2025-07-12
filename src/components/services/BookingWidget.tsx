"use client";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as RadCalendar } from "@/components/ui/calendar";
import { Calendar, CheckCircle } from "lucide-react";
import { Service } from "@/data/services";
import { useCartStore } from "@/store/cart-store";

export default function BookingWidget({ service }: { service: Service }) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();
  const [sessions, setSessions] = useState(1);
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const addToCart = useCartStore((state) => state.addToCart);

  const timeSlots = ["9:00 AM", "10:30 AM", "12:00 PM", "1:30 PM"];

  const handleAddOnToggle = (name: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(name) ? prev.filter((n) => n !== name) : [...prev, name]
    );
  };

  const addOnTotal =
    service.booking?.addOns
      .filter((a) => selectedAddOns.includes(a.name))
      .reduce((sum, a) => sum + a.price, 0) || 0;

  const baseTotal = (service.booking?.pricePerSession || 0) + addOnTotal;
  const subtotal = baseTotal * sessions;
  const discount =
    service.booking && sessions >= 3
      ? Math.round(subtotal * (service.booking.discount || 0))
      : 0;
  const total = subtotal - discount;

  const handleAddToCart = () => {
    if (!selectedDate) {
      setError("Please select a date.");
      return;
    }
    if (!selectedTime) {
      setError("Please select a time.");
      return;
    }
    setError(null);
    // Prepare add-ons as array of { name, price }
    const addOnsArr =
      service.booking?.addOns.filter((a) => selectedAddOns.includes(a.name)) ||
      [];
    addToCart(service, sessions, selectedDate, selectedTime, addOnsArr);
    // Optionally reset form or show a message
  };

  // Button should only be disabled if date or time is not selected
  const isAddToCartDisabled = !selectedDate || !selectedTime;

  // Clear error if both are selected
  if (!isAddToCartDisabled && error) setError(null);

  // Custom calendar styling for today
  const calendarClassNames = {
    day_today:
      "bg-[#e5eaff] text-primary font-bold rounded-full border border-[#bfcfff]",
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#f7f8fa] py-10">
      <Card className="w-full max-w-lg rounded-2xl shadow-xl border border-[#ececec] bg-white">
        <div className="p-8">
          <h3 className="text-2xl font-bold mb-6">Book Your Cleaning</h3>
          <div className="mb-6">
            <div className="font-semibold flex items-center gap-2 mb-2 text-base">
              <Calendar className="w-5 h-5 text-primary" />
              <span>Select Date</span>
              <span className="ml-auto text-sm text-muted-foreground font-normal">
                {selectedDate
                  ? selectedDate.toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })
                  : new Date().toLocaleString("default", {
                      month: "long",
                      year: "numeric",
                    })}
              </span>
            </div>
            <div className="rounded-xl border border-[#ececec] bg-[#fafbfc] p-4">
              <RadCalendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                fromDate={new Date()}
                className="rounded-lg border-none"
                classNames={calendarClassNames}
              />
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold flex items-center gap-2 mb-2 text-base">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span>Select Time</span>
            </div>
            <div className="flex flex-wrap gap-4">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  className={`flex items-center justify-center px-6 py-2 rounded-lg border text-base font-medium transition-colors focus:outline-none min-w-[120px] h-12 ${
                    selectedTime === slot
                      ? "bg-[#5b5ce2] text-white border-[#5b5ce2] shadow"
                      : "bg-white text-foreground border-[#ececec] hover:bg-accent"
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {slot}
                  {slot === "10:30 AM" && (
                    <span className="ml-2 text-xs bg-[#e5e7ff] text-[#5b5ce2] px-2 py-0.5 rounded-full font-semibold">
                      Popular
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-2 text-base">
              Number of sessions
            </div>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSessions((s) => Math.max(1, s - 1))}
                aria-label="Decrease sessions"
                className="rounded-full border-[#ececec]"
              >
                -
              </Button>
              <span className="text-lg font-semibold w-8 text-center">
                {sessions}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSessions((s) => s + 1)}
                aria-label="Increase sessions"
                className="rounded-full border-[#ececec]"
              >
                +
              </Button>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold mb-2 text-base">Optional Add-ons</div>
            <div className="flex flex-col gap-2">
              {service.booking?.addOns.map((addon) => {
                const isSelected = selectedAddOns.includes(addon.name);
                return (
                  <label
                    key={addon.name}
                    className={`flex items-center justify-between border border-[#ececec] rounded-lg px-4 py-3 cursor-pointer transition-colors text-base ${
                      isSelected
                        ? "bg-[#e5eaff] border-[#bfcfff]"
                        : "bg-white hover:bg-accent"
                    }`}
                    onClick={() => handleAddOnToggle(addon.name)}
                  >
                    <span className="flex items-center gap-2">
                      <span
                        className={`inline-block w-5 h-5 rounded border-2 ${
                          isSelected
                            ? "bg-[#5b5ce2] border-[#5b5ce2]"
                            : "border-[#bfcfff] bg-white"
                        }`}
                      ></span>
                      {addon.name}
                    </span>
                    <span className="font-medium">
                      +
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: service.currency,
                      }).format(addon.price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </div>
          {service.booking?.specialOffer && (
            <div className="bg-[#f4f7ff] text-[#5b5ce2] rounded-lg px-4 py-3 text-base font-medium mb-4 border border-[#e5e7ff]">
              <div className="font-semibold">Special Offer</div>
              <div className="underline cursor-pointer">
                {service.booking.specialOffer}
              </div>
            </div>
          )}
          <div className="mb-4">
            <div className="flex justify-between text-base">
              <span className="text-[#6b7280]">Price per session:</span>
              <span className="font-semibold">
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: service.currency,
                }).format(service.booking?.pricePerSession || 0)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-green-600 text-base">
                <span>Discount applied:</span>
                <span>
                  -
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: service.currency,
                  }).format(discount)}
                </span>
              </div>
            )}
            <div className="flex justify-between text-xl font-bold mt-2">
              <span>Total:</span>
              <span>
                {new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: service.currency,
                }).format(total)}
              </span>
            </div>
          </div>
          {error && <div className="text-red-600 text-base mb-2">{error}</div>}
          <Button
            size="lg"
            className="w-full mt-2 text-base h-12 rounded-lg bg-[#5b5ce2] hover:bg-[#4a4acb]"
            onClick={handleAddToCart}
            disabled={isAddToCartDisabled}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    </div>
  );
}
