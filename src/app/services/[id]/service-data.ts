import { headers } from 'next/headers';
import { getServiceById, mockServices } from '@/data/services';

export async function getServerSideServiceData(id: string) {
  // Get user info from headers if available
  const headersList = headers();
  const userEmail = headersList.get('x-user-email');
  const userId = headersList.get('x-user-id');

  // Get service data
  const service = getServiceById(id);
  if (!service) {
    return null;
  }

  // Get related services (other services in the same category)
  const relatedServices = mockServices
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3);

  return {
    service,
    relatedServices,
    userEmail: userEmail || null,
    userId: userId || null,
  };
}
