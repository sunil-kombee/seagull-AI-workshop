import Image from "next/image";
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
  Calendar,
} from "lucide-react";
import BookingWidget from "@/components/services/BookingWidget";

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
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = await getServerSideServiceData(id);
  if (!data?.service) {
    return (
      <div className="text-center py-10">
        <PageHeader title="Service Not Found" />
        <p className="text-muted-foreground">
          The service you are looking for does not exist or has been moved.
        </p>
        <Link href="/services" passHref>
          <Button className="mt-4">Back to Services</Button>
        </Link>
      </div>
    );
  }
  const { service, relatedServices = [] } = data;
  return (
    <>
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

      {/* BOOKING WIDGET */}
      {service.booking && <BookingWidget service={service} />}
    </>
  );
}
