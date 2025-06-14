import Image from 'next/image';
import Link from 'next/link';
import type { Service } from '@/data/services';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tag, Star, Users } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  const { id, name, description, price, currency, image, category, icon: Icon, dataAiHint, rating, reviews } = service;

  return (
    <Card className="flex flex-col overflow-hidden h-full shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
      <CardHeader className="p-0">
        <Link href={`/services/${id}`} passHref>
            <div className="relative w-full aspect-[16/9] cursor-pointer">
              <Image
                src={image}
                alt={name}
                layout="fill"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
                className="transition-transform duration-300 group-hover:scale-105"
                data-ai-hint={dataAiHint}
              />
            </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        {Icon && <Icon className="w-8 h-8 text-primary mb-2" />}
        <CardTitle className="text-xl font-headline mb-2 leading-tight">
          <Link href={`/services/${id}`} className="hover:text-primary transition-colors">
            {name}
          </Link>
        </CardTitle>
        <CardDescription className="text-sm text-muted-foreground mb-3 h-16 overflow-hidden">
          {description}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <Tag className="w-4 h-4 mr-1 text-accent" /> {category}
        </div>
        {rating && reviews && (
          <div className="flex items-center text-sm text-amber-500 mb-3">
            <Star className="w-4 h-4 mr-1 fill-current" /> {rating.toFixed(1)} 
            <span className="text-muted-foreground ml-1">({reviews} reviews)</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-semibold text-primary">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: currency }).format(price)}
        </p>
        <Link href={`/services/${id}`} passHref>
          <Button variant="default" size="sm">View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
