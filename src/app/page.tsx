import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { serviceCategories } from "@/data/services";
import { CheckCircle, MapPin, Users, Zap } from "lucide-react";

export default function HomePage() {
  const whyChooseUsItems = [
    {
      icon: Zap,
      title: "One-Stop Shop",
      description:
        "All your travel needs in one place, from transfers to tours.",
    },
    {
      icon: CheckCircle,
      title: "Real-Time Booking",
      description:
        "Instant confirmations and seamless coordination for your peace of mind.",
    },
    {
      icon: MapPin,
      title: "Global Reach",
      description:
        "Discover and book services in destinations all around the world.",
    },
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/70 to-accent/70 text-white py-20 md:py-32 rounded-lg shadow-xl overflow-hidden mb-16">
        <Image
          src="https://placehold.co/1920x1080.png"
          alt="Travel background"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-30"
          data-ai-hint="travel landscape"
          priority
        />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold  drop-shadow-md">
            Your Journey Begins Here
          </h1>
          <p className="mt-6 text-xl md:text-2xl max-w-3xl mx-auto drop-shadow-sm">
            Discover and book airport transfers, activity tickets, car rentals,
            tour guides, and more. All in one place.
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
      <section className="mb-16">
        <PageHeader
          title="Explore Our Services"
          description="Find everything you need for your next adventure."
          className="text-center border-none"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCategories.map((category) => (
            <Link
              key={category.slug}
              href={`/services?category=${category.slug}`}
              passHref
            >
              <Card className="hover:shadow-xl transition-shadow duration-300 cursor-pointer h-full flex flex-col group transform hover:-translate-y-1">
                <CardHeader className="flex flex-row items-center space-x-4 pb-2">
                  <category.icon className="h-10 w-10 text-primary group-hover:text-accent transition-colors" />
                  <CardTitle className=" text-2xl text-foreground group-hover:text-primary transition-colors">
                    {category.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground text-sm">
                    Click to explore {category.name.toLowerCase()} options.
                  </p>
                  <div data-ai-hint={category.dataAiHint} className="mt-4">
                    <Image
                      src={`https://placehold.co/300x200.png`}
                      alt={category.name}
                      width={300}
                      height={200}
                      className="rounded-md object-cover aspect-[3/2]"
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="mb-16 bg-card p-8 md:p-12 rounded-lg shadow-lg">
        <PageHeader
          title="Why Choose Global Travel Hub?"
          description="We make your travel planning simple and reliable."
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
              <p className="text-muted-foreground text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="text-center py-16 bg-gradient-to-r from-accent/70 to-primary/70 text-white rounded-lg shadow-xl">
        <Image
          src="https://placehold.co/1200x400.png"
          alt="CTA background"
          layout="fill"
          objectFit="cover"
          className="absolute z-0 opacity-20 rounded-lg"
          data-ai-hint="happy travelers"
        />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold  mb-6">Ready to Plan Your Trip?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Sign up today and unlock exclusive deals and a seamless booking
            experience.
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
                className="border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                Browse Services
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
}
