import type { organization } from "@/db/schema";

export type OrganizationInput = typeof organization.$inferInsert;

export type CreateOrganizationInput = {
  name: string;
  slug: string;
  logo?: string;
};

export type SetActiveOrganizationInput = {
  id: string;
  slug: string;
};