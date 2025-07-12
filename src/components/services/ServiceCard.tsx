import Image from "next/image";
import Link from "next/link";
import type { Service } from "@/data/services";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tag,
  Star,
  Users,
  PlaneTakeoff,
  Ticket,
  Car,
  Smartphone,
  ShieldCheck,
} from "lucide-react";
import { Tooltip } from "@/components/ui/tooltip";

interface ServiceCardProps {
  service: Service;
}

// Icon map for string keys to Lucide icons
const iconMap = {
  "plane-takeoff": PlaneTakeoff,
  ticket: Ticket,
  car: Car,
  users: Users,
  smartphone: Smartphone,
  "shield-check": ShieldCheck,
};

export default function ServiceCard({ service }: ServiceCardProps) {
  const {
    id,
    name,
    description,
    price,
    currency,
    image,
    category,
    icon,
    dataAiHint,
    rating,
    reviews,
  } = service;

  // Map icon string to component, with type safety
  const Icon = icon && iconMap[icon as keyof typeof iconMap];

  return (
    <Card
      className="flex flex-col overflow-hidden h-full shadow-lg transition-all duration-300
        hover:shadow-2xl hover:-translate-y-1
        md:hover:scale-[1.03] md:hover:shadow-2xl
        group"
      tabIndex={0}
      aria-label={`Service: ${name}`}
    >
      <CardHeader className="p-0">
        <Link href={`/services/${id}`} passHref>
          <div className="relative w-full aspect-[16/9] cursor-pointer">
            <Image
              src={image}
              alt={name}
              layout="fill"
              style={{
                objectFit: "cover",
                objectPosition: "center",
              }}
              className="transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={dataAiHint}
            />
          </div>
        </Link>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        {Icon && <Icon className="w-8 h-8 text-primary mb-2" />}
        <CardTitle className="text-xl  mb-2 leading-tight">
          <Link
            href={`/services/${id}`}
            className="hover:text-primary transition-colors"
          >
            {name}
          </Link>
        </CardTitle>
        <CardDescription
          className="text-sm text-muted-foreground mb-3 h-16 overflow-hidden"
          title={description}
        >
          {description}
        </CardDescription>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <span title={category} className="flex items-center">
            <Tag className="w-4 h-4 mr-1 text-accent" />
            <span
              className="truncate max-w-[120px] md:max-w-[180px]"
              title={category}
            >
              {category}
            </span>
          </span>
        </div>
        {rating && reviews && (
          <div className="flex items-center text-sm text-amber-500 mb-3">
            <span
              title={`Rating: ${rating.toFixed(1)} out of 5`}
              className="flex items-center"
            >
              <Star className="w-4 h-4 mr-1 fill-current" /> {rating.toFixed(1)}
            </span>
            <span className="text-muted-foreground ml-1">
              ({reviews} reviews)
            </span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-6 pt-0 flex justify-between items-center">
        <p className="text-2xl font-semibold text-primary">
          {new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: currency,
          }).format(price)}
        </p>
        <Link href={`/services/${id}`} passHref>
          <Button
            variant="default"
            size="sm"
            className="transition-colors duration-200 md:hover:bg-primary/80 md:focus:ring-2 md:focus:ring-primary/50"
            tabIndex={0}
            aria-label={`View details for ${name}`}
          >
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
