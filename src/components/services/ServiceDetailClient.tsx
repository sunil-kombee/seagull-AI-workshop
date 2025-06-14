"use client";
import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { useCart } from "@/contexts/CartContext";
import { useState } from "react";
import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import type { Service } from "@/data/services";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";

interface ServiceDetailClientProps {
  service?: Omit<Service, "icon">;
  relatedServices: Omit<Service, "icon">[];
}

export default function ServiceDetailClient({
  service,
  relatedServices,
}: ServiceDetailClientProps) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "provider"
  >("description");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string | undefined>();

  if (!service) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <PageHeader title="Service Not Found" />
          <p className="text-muted-foreground">
            The service you are looking for does not exist or has been moved.
          </p>
          <Link href="/services" passHref>
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleAddToCart = () => {
    addToCart(service, quantity, selectedDate, selectedTime);
  };

  // Example service coverage (could be dynamic)
  const serviceCoverage = [
    "Floor cleaning",
    "Kitchen cleaning",
    "Window cleaning",
    "Bathroom cleaning",
    "Dusting",
    "Surface sanitization",
  ];

  // Example time slots
  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "1:30 PM",
    "3:00 PM",
    "4:30 PM",
  ];

  // Example discount logic
  const pricePerSession = service.price;
  const discount = quantity >= 2 ? 20 : 0; // $20 off for 2+ sessions (example)
  const total = pricePerSession * quantity - discount;

  return (
    <MainLayout>
      <div className="mb-6">
        <Link
          href="/services"
          className="inline-flex items-center text-primary hover:underline"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Services
        </Link>
      </div>
      <div className="grid md:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Image Gallery (simplified) */}
        <div className="md:col-span-5">
          <Card className="overflow-hidden shadow-xl">
            <div className="relative w-full aspect-[4/3]">
              <Image
                src={service.image}
                alt={service.name}
                fill
                style={{ objectFit: "cover" }}
                data-ai-hint={service.dataAiHint}
                className="transition-transform duration-500 hover:scale-105"
              />
            </div>
          </Card>
        </div>

        {/* Service Info + Booking */}
        <div className="md:col-span-7 flex flex-col gap-6">
          {/* Service Info */}
          <div className="space-y-4">
            <PageHeader title={service.name} className="pb-2 mb-0" />
            <div className="flex items-center space-x-4">
              <span
                className="text-sm bg-accent/20 text-accent-foreground px-3 py-1 rounded-full"
                title={service.category}
              >
                {service.category}
              </span>
              {service.rating && service.reviews && (
                <div
                  className="flex items-center text-amber-500"
                  title={`Rating: ${service.rating.toFixed(1)} out of 5`}
                >
                  <Star className="w-5 h-5 mr-1 fill-current" />
                  {service.rating.toFixed(1)}
                  <span className="text-muted-foreground ml-1">
                    ({service.reviews} reviews)
                  </span>
                </div>
              )}
            </div>
            <p className="text-3xl font-bold text-primary">
              {new Intl.NumberFormat("en-US", {
                style: "currency",
                currency: service.currency,
              }).format(service.price)}
            </p>
          </div>

          {/* Tabs */}
          <div>
            <div className="flex border-b mb-4">
              <button
                className={`px-4 py-2 text-base font-medium focus:outline-none border-b-2 transition-colors duration-200 ${
                  activeTab === "description"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("description")}
                aria-selected={activeTab === "description"}
                tabIndex={0}
              >
                Description
              </button>
              <button
                className={`px-4 py-2 text-base font-medium focus:outline-none border-b-2 transition-colors duration-200 ${
                  activeTab === "reviews"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("reviews")}
                aria-selected={activeTab === "reviews"}
                tabIndex={0}
              >
                Reviews
              </button>
              <button
                className={`px-4 py-2 text-base font-medium focus:outline-none border-b-2 transition-colors duration-200 ${
                  activeTab === "provider"
                    ? "border-primary text-primary"
                    : "border-transparent text-muted-foreground hover:text-primary"
                }`}
                onClick={() => setActiveTab("provider")}
                aria-selected={activeTab === "provider"}
                tabIndex={0}
              >
                Provider
              </button>
            </div>
            <div>
              {activeTab === "description" && (
                <div>
                  <p className="text-foreground/80 leading-relaxed text-base mb-4">
                    {service.longDescription || service.description}
                  </p>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Service Coverage</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                      {serviceCoverage.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-primary" />
                          <span className="sr-only">Included</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              {activeTab === "reviews" && (
                <div className="text-muted-foreground py-8 text-center">
                  Reviews coming soon.
                </div>
              )}
              {activeTab === "provider" && (
                <div className="text-muted-foreground py-8 text-center">
                  Provider info coming soon.
                </div>
              )}
            </div>
          </div>

          {/* Booking Widget (sticky on desktop) */}
          <div className="mt-6 lg:mt-0 lg:sticky lg:top-24">
            <Card className="p-6 shadow-lg">
              <h3 className="text-lg font-semibold mb-4">Book Your Cleaning</h3>
              {/* Date Picker */}
              <div className="mb-4">
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <span>Select Date</span>
                </label>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  fromDate={new Date()}
                />
              </div>
              {/* Time Slot Selector */}
              <div className="mb-4">
                <label className="block font-medium mb-2 flex items-center gap-2">
                  <span>Select Time</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      className={cn(
                        "px-4 py-2 rounded-md border text-sm font-medium transition-colors",
                        selectedTime === slot
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-background text-foreground border-border hover:bg-accent"
                      )}
                      onClick={() => setSelectedTime(slot)}
                      aria-pressed={selectedTime === slot}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
              {/* Session/Quantity Selector */}
              <div className="mb-4">
                <label className="block font-medium mb-2">
                  Number of sessions
                </label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease sessions"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 w-12 text-center font-medium">
                    {quantity}
                  </span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase sessions"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {/* Price Summary */}
              <div className="border-t pt-4 mt-4 space-y-1 text-sm">
                <div className="flex justify-between">
                  <span>Price per session:</span>
                  <span className="font-semibold">
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: service.currency,
                    }).format(pricePerSession)}
                  </span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
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
                <div className="flex justify-between text-lg font-bold mt-2">
                  <span>Total:</span>
                  <span>
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: service.currency,
                    }).format(total)}
                  </span>
                </div>
              </div>
              <Button
                size="lg"
                className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow mt-6"
                onClick={handleAddToCart}
                aria-label="Add to cart"
                disabled={!selectedDate || !selectedTime}
              >
                <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
              </Button>
            </Card>
          </div>
        </div>
      </div>
      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-3xl font-bold  text-foreground mb-8">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedServices.map((relatedService) => (
              <ServiceCard key={relatedService.id} service={relatedService} />
            ))}
          </div>
        </section>
      )}
    </MainLayout>
  );
}
