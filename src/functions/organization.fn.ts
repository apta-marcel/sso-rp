import type { CreateOrganizationInput, SetActiveOrganizationInput } from '@/@types/organization';
import { auth } from '@/lib/auth';
import { createServerFn } from '@tanstack/react-start';
import { getRequestHeaders } from '@tanstack/react-start/server';

export const listOrganization = createServerFn({ method: 'GET' }).handler(async () => {
  const headers = getRequestHeaders();
  const data = await auth.api.listOrganizations({
    // This endpoint requires session cookies.
    headers,
  });

  return data;
});

export const createOrganization = createServerFn({ method: 'POST' })
  .inputValidator((data: CreateOrganizationInput) => data)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const org = await auth.api.createOrganization({
      body: {
        name: data.name,
        slug: data.slug,
        logo: data.logo ?? '',
        //   metadata: data.metadata,
        keepCurrentActiveOrganization: false,
      },
      headers,
    });

    return org;
  });

export const setActiveOrganization = createServerFn({ method: 'POST' })
  .inputValidator((data: SetActiveOrganizationInput) => data)
  .handler(async ({ data }) => {
    const headers = getRequestHeaders();
    const org = await auth.api.setActiveOrganization({
      body: {
        organizationId: data.id,
        organizationSlug: data.slug,
      },
      headers,
    });

    return org;
  });
