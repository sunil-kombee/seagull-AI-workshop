import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories } from "@/data/services";
import {
  CheckCircle,
  MapPin,
  Users,
  Zap,
  Sparkles,
  Scissors,
  Home,
  PawPrint,
} from "lucide-react";
import { images } from "@/data/images";

export default function HomePage() {
  const whyChooseUsItems = [
    {
      icon: Zap,
      title: "Trusted Professionals",
      description:
        "All our service providers are background-checked and highly rated.",
    },
    {
      icon: CheckCircle,
      title: "Easy Online Booking",
      description:
        "Book cleaning, haircuts, laundry, and more in just a few clicks.",
    },
    {
      icon: MapPin,
      title: "At Your Doorstep",
      description: "Enjoy convenient, on-time service at home or office.",
    },
  ];

  const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    cleaning: Sparkles,
    haircut: Scissors,
    laundry: Home,
    "pet-grooming": PawPrint,
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/70 to-accent/70 text-white py-20 md:py-32 rounded-lg shadow-xl overflow-hidden mb-16">
        {/* Replace with a relevant daily services image if available */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold  drop-shadow-md">
            Book Trusted Daily Services Online
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-sm">
            From deep cleaning to haircuts, laundry, and pet care—get
            professional help at your doorstep.
          </p>
          <Link href="/services" passHref>
            <Button
              size="lg"
              className="mt-10 bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Explore Services
            </Button>
          </Link>
        </div>
      </section>

      {/* Service Categories Section */}
      <PageHeader
        title="Explore Our Services"
        description="Find everything you need for your home and daily life."
        className="text-center border-none"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {serviceCategories.map((category) => {
          const Icon =
            iconMap[category.slug as keyof typeof iconMap] || Sparkles;
          return (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              passHref
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col group transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <Icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                  <CardTitle className=" text-2xl text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">
                    Click to explore {category.name.toLowerCase()} options.
                  </p>
                  {/* Optionally update images to match daily services */}
                </CardContent>
              </Card>
            </Link>
          );
        })}
      </div>

      {/* Why Choose Us Section */}
      <PageHeader
        title="Why Choose Our Platform?"
        description="We make your daily life easier, safer, and more convenient."
        className="text-center border-none"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        {whyChooseUsItems.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 bg-background rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            <item.icon className="h-12 w-12 text-primary mb-4" />
            <h3 className="text-xl  font-semibold text-foreground mb-2">
              {item.title}
            </h3>
            <p className="text-muted-foreground text-sm">{item.description}</p>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="relative z-10 mt-16 text-center">
        <h2 className="text-4xl font-bold  mb-6">Ready to Book?</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Sign up today and enjoy hassle-free daily services from trusted
          professionals.
        </p>
        <div className="space-x-4">
          <Link href="/register" passHref>
            <Button
              size="lg"
              className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Sign Up Now
            </Button>
          </Link>
          <Link href="/services" passHref>
            <Button
              variant="outline"
              size="lg"
              className="border-white text-primary hover:bg-white hover:text-primary text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Browse Services
            </Button>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
