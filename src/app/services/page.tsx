import MainLayout from "@/components/layout/MainLayout";
import PageHeader from "@/components/ui/PageHeader";
import ServiceCard from "@/components/services/ServiceCard";
import { mockServices, serviceCategories } from "@/data/services";
import type { Service } from "@/data/services";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";

interface ServicesPageProps {
  searchParams?: Promise<{
    category?: string;
    search?: string;
    sort?: string;
  }>;
}

export default async function ServicesPage({
  searchParams,
}: ServicesPageProps) {
  const params = searchParams ? await searchParams : {};
  const selectedCategory = params.category || "all";
  const searchTerm = params.search || "";
  const sortBy = params.sort || "name_asc";

  let filteredServices: Service[] = mockServices;

  if (selectedCategory !== "all") {
    const categoryObject = serviceCategories.find(
      (cat) => cat.slug === selectedCategory
    );
    if (categoryObject) {
      filteredServices = filteredServices.filter(
        (service) => service.category === categoryObject.name
      );
    }
  }

  if (searchTerm) {
    filteredServices = filteredServices.filter(
      (service) =>
        service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Basic sorting
  filteredServices.sort((a, b) => {
    if (sortBy === "price_asc") return a.price - b.price;
    if (sortBy === "price_desc") return b.price - a.price;
    if (sortBy === "name_asc") return a.name.localeCompare(b.name);
    if (sortBy === "name_desc") return b.name.localeCompare(a.name);
    return 0;
  });

  // TODO: Implement actual filtering and sorting based on searchParams

  return (
    <MainLayout>
      <PageHeader
        title="Our Travel Services"
        description="Explore a wide range of services to make your travel unforgettable. From airport transfers to exciting activity tickets, we have you covered."
      />

      <div className="mb-8 p-6 bg-card rounded-lg shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search services (e.g., Eiffel Tower, Airport Transfer)"
              className="pl-10 w-full"
              defaultValue={searchTerm}
              // onChange={(e) => router.push(`/services?search=${e.target.value}`)} // Needs client component for this
            />
          </div>
          <Select defaultValue={selectedCategory}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {serviceCategories.map((cat) => (
                <SelectItem key={cat.slug} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {/* Add sort by select later if needed */}
        </div>
      </div>

      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold font-headline text-muted-foreground">
            No services found
          </h2>
          <p className="mt-2 text-foreground">
            Try adjusting your search or filters.
          </p>
        </div>
      )}
    </MainLayout>
  );
}
