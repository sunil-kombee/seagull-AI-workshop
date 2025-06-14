import Image from "next/image";
import { headers } from "next/headers";
import { Service } from "@/data/services";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Minus,
  Plus,
  ShoppingCart,
  Star,
  Users,
  ArrowLeft,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import ServiceCard from "@/components/services/ServiceCard";
import { getServerSideServiceData } from "./service-data";
import { ServicePurchaseForm } from "@/components/services/ServicePurchaseForm";

export async function generateStaticParams() {
  const services = await import("@/data/services").then(
    (mod) => mod.mockServices
  );
  return services.map((service) => ({
    id: service.id.toString(),
  }));
}

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
            <Button className="mt-4">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
            </Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const { service, relatedServices = [] } = data;

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
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-start">
        {/* Image Gallery (simplified) */}
        <Card className="overflow-hidden shadow-xl">
          <div className="relative w-full aspect-[4/3]">
            <Image
              src={service.image}
              alt={service.name}
              fill
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              priority
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Card>

        {/* Service Info */}
        <div className="space-y-6">
          <PageHeader title={service.name} className="pb-2 mb-0" />

          <div className="flex items-center space-x-4">
            <span className="text-sm bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">
              {service.category}
            </span>
            {service.rating && service.reviews && (
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 mr-1 fill-current" />{" "}
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

          <ServicePurchaseForm service={service} />
        </div>
      </div>

      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-3xl font-bold font-headline text-foreground mb-8">
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
