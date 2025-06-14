import ServiceDetailClient from "@/components/services/ServiceDetailClient";
import { getServiceById, mockServices, Service } from "@/data/services";

function stripIcon(service?: Service): Omit<Service, "icon"> | undefined {
  if (!service) return undefined;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { icon, ...rest } = service;
  return rest;
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const service = getServiceById(id);
  let relatedServices: Omit<Service, "icon">[] = [];
  if (service) {
    relatedServices = mockServices
      .filter((s) => s.category === service.category && s.id !== service.id)
      .slice(0, 3)
      .map(stripIcon)
      .filter(Boolean) as Omit<Service, "icon">[];
  }
  return (
    <ServiceDetailClient
      service={stripIcon(service)}
      relatedServices={relatedServices}
    />
  );
}
