"use client"; // Needs to be client for useCart and useState

import Image from 'next/image';
import { useParams } from 'next/navigation'; // Use this if on older Next versions or if needed
// For Next.js 13+ App Router, params are passed as props to the page component.
import { getServiceById, mockServices, Service } from '@/data/services';
import MainLayout from '@/components/layout/MainLayout';
import PageHeader from '@/components/ui/PageHeader';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';
import { useState, useEffect } from 'react';
import { Minus, Plus, ShoppingCart, Star, Users, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import ServiceCard from '@/components/services/ServiceCard';


export default function ServiceDetailPage({ params }: { params: { id: string } }) {
  const { addToCart } = useCart();
  const [service, setService] = useState<Service | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedServices, setRelatedServices] = useState<Service[]>([]);

  useEffect(() => {
    if (params.id) {
      const foundService = getServiceById(params.id as string);
      if (foundService) {
        setService(foundService);
        // Load related services (simple example: other services in same category)
        const related = mockServices.filter(s => s.category === foundService.category && s.id !== foundService.id).slice(0, 3);
        setRelatedServices(related);
      }
    }
  }, [params.id]);

  if (!service) {
    return (
      <MainLayout>
        <div className="text-center py-10">
          <PageHeader title="Service Not Found" />
          <p className="text-muted-foreground">The service you are looking for does not exist or has been moved.</p>
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
    addToCart(service, quantity);
  };

  return (
    <MainLayout>
      <div className="mb-6">
        <Link href="/services" className="inline-flex items-center text-primary hover:underline">
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
              layout="fill"
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              data-ai-hint={service.dataAiHint}
              className="transition-transform duration-500 hover:scale-105"
            />
          </div>
        </Card>

        {/* Service Info */}
        <div className="space-y-6">
          <PageHeader title={service.name} className="pb-2 mb-0" />
          
          <div className="flex items-center space-x-4">
            <span className="text-sm bg-accent/20 text-accent-foreground px-3 py-1 rounded-full">{service.category}</span>
            {service.rating && service.reviews && (
              <div className="flex items-center text-amber-500">
                <Star className="w-5 h-5 mr-1 fill-current" /> {service.rating.toFixed(1)}
                <span className="text-muted-foreground ml-1">({service.reviews} reviews)</span>
              </div>
            )}
          </div>

          <p className="text-3xl font-bold text-primary">
            {new Intl.NumberFormat('en-US', { style: 'currency', currency: service.currency }).format(service.price)}
          </p>

          <p className="text-foreground/80 leading-relaxed text-base">
            {service.longDescription || service.description}
          </p>

          <Separator />
          
          <div className="flex items-center space-x-4">
            <p className="font-medium text-foreground">Quantity:</p>
            <div className="flex items-center border border-border rounded-md">
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="rounded-r-none">
                <Minus className="h-4 w-4" />
              </Button>
              <span className="px-4 w-12 text-center font-medium">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={() => setQuantity(q => q + 1)} className="rounded-l-none">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <Button size="lg" className="w-full text-lg py-6 shadow-md hover:shadow-lg transition-shadow" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
          </Button>
        </div>
      </div>
      
      {/* Related Services Section */}
      {relatedServices.length > 0 && (
        <section className="mt-16 pt-8 border-t">
          <h2 className="text-3xl font-bold font-headline text-foreground mb-8">You Might Also Like</h2>
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
