import Image from "next/image";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { getServerSideServiceData } from "./service-data";
import {
  Star,
  Users,
  Car,
  Ticket,
  Smartphone,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";

const iconMap = {
  users: Users,
  car: Car,
  ticket: Ticket,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
};

export default async function ServiceDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const data = await getServerSideServiceData(params.id);
  if (!data?.service) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <PageHeader title="Service Not Found" />
          <p className="text-muted-foreground">
            The service you are looking for does not exist or has been moved.
          </p>
          <Link href="/services" passHref>
            <Button className="mt-4">Back to Services</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }
  const { service, relatedServices = [] } = data;
  // --- Booking widget state (client-side only) ---
  // This is a server component, so we will render a placeholder for the calendar and time picker.
  // For a real implementation, this would be a client component or use 'use client'.
  // For now, just render the calendar and time slots visually.
  const timeSlots = [
    "9:00 AM",
    "10:30 AM",
    "12:00 PM",
    "1:30 PM",
    "3:00 PM",
    "4:30 PM",
  ];
  return (
    <MainLayout>
      {/* HERO SECTION */}
      <section className="relative bg-gradient-to-b from-background to-muted/40 rounded-xl overflow-hidden mb-12">
        <div className="grid md:grid-cols-2 gap-8 items-center py-12 px-4 md:px-12">
          <div className="space-y-6">
            <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full mb-2">
              Highly Rated
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-2 leading-tight">
              {service.name}
            </h1>
            <p className="text-lg text-muted-foreground mb-4">
              {service.longDescription || service.description}
            </p>
            <Button size="lg" className="mt-2">
              Book Your {service.category.replace(/s$/, "")}
            </Button>
          </div>
          <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
            <Image
              src={service.image}
              alt={service.name}
              fill
              style={{ objectFit: "cover" }}
              className=""
            />
          </div>
        </div>
      </section>

      {/* FEATURES */}
      {service.features && (
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">
          {service.features.map((f) => {
            const Icon = iconMap[f.icon as keyof typeof iconMap] || ShieldCheck;
            return (
              <div
                key={f.title}
                className="flex flex-col items-center p-6 bg-card rounded-xl shadow"
              >
                <Icon className="w-10 h-10 text-primary mb-3" />
                <h3 className="font-semibold text-lg mb-1">{f.title}</h3>
                <p className="text-muted-foreground text-sm">{f.description}</p>
              </div>
            );
          })}
        </section>
      )}

      {/* SERVICE COVERAGE */}
      {service.serviceCoverage && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Service Coverage
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {service.serviceCoverage.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 bg-muted px-4 py-2 rounded-full text-sm font-medium"
              >
                <CheckCircle className="w-5 h-5 text-primary" />
                {item}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* PROCESSES */}
      {service.process && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">Our Process</h2>
          <ol className="flex flex-col md:flex-row justify-center items-center gap-6 md:gap-12">
            {service.process.map((step, idx) => (
              <li key={step} className="flex flex-col items-center">
                <span className="w-10 h-10 flex items-center justify-center rounded-full bg-primary text-white font-bold text-lg mb-2">
                  {idx + 1}
                </span>
                <span className="text-base text-center max-w-xs">{step}</span>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* REVIEWS */}
      {service.reviewsList && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-center mb-6">
            Customer Reviews
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {service.reviewsList.map((r) => (
              <div
                key={r.name + r.date}
                className="bg-card rounded-xl shadow p-6 max-w-xs min-w-[260px] flex flex-col"
              >
                <div className="flex items-center mb-2">
                  <Star className="w-5 h-5 text-amber-500 mr-1 fill-current" />
                  <span className="font-semibold text-lg">{r.rating}.0</span>
                </div>
                <p className="text-muted-foreground text-sm mb-4">{r.text}</p>
                <div className="mt-auto text-xs text-muted-foreground">
                  <span className="font-semibold">{r.name}</span> &middot;{" "}
                  {r.date}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* BOOKING WIDGET */}
      {service.booking && (
        <section className="mb-16 flex justify-center">
          <Card className="p-8 max-w-xl w-full shadow-xl">
            <h3 className="text-xl font-bold mb-4">
              Book Your {service.category.replace(/s$/, "")}
            </h3>
            <div className="mb-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <span>Price per session:</span>
                <span className="font-semibold">
                  {new Intl.NumberFormat("en-US", {
                    style: "currency",
                    currency: service.currency,
                  }).format(service.booking.pricePerSession)}
                </span>
              </div>
              {service.booking.discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount:</span>
                  <span>-{(service.booking.discount * 100).toFixed(0)}%</span>
                </div>
              )}
              {service.booking.specialOffer && (
                <div className="bg-green-50 text-green-700 rounded px-3 py-2 text-xs font-medium mt-2">
                  {service.booking.specialOffer}
                </div>
              )}
            </div>
            <Separator className="my-4" />
            {/* Calendar and Time Slot Picker */}
            <div className="mb-4">
              <span className="font-semibold block mb-2">Select Date</span>
              <div className="bg-muted rounded-lg p-4 flex justify-center">
                <div className="w-full max-w-xs">
                  {/* Calendar placeholder (replace with real Calendar in client component) */}
                  <div className="rounded border border-border bg-background p-2 text-center text-muted-foreground">
                    [ Calendar Here ]
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <span className="font-semibold block mb-2">Select Time</span>
              <div className="flex flex-wrap gap-2">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    className="px-4 py-2 rounded-md border text-sm font-medium transition-colors bg-background text-foreground border-border hover:bg-accent"
                    // onClick logic would go here
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
            <span className="font-semibold">Optional Add-ons:</span>
            <ul className="list-disc ml-6 mt-2 space-y-1">
              {service.booking.addOns.map((addon) => (
                <li key={addon.name} className="flex justify-between">
                  <span>{addon.name}</span>
                  <span className="text-muted-foreground">
                    +
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: service.currency,
                    }).format(addon.price)}
                  </span>
                </li>
              ))}
            </ul>
            <Button size="lg" className="w-full mt-4">
              Add to Cart
            </Button>
          </Card>
        </section>
      )}
    </MainLayout>
  );
}
