import { listOrganization, createOrganization, setActiveOrganization } from "@/functions/organization.fn";
import type { CreateOrganizationInput, SetActiveOrganizationInput } from "@/@types/organization";
import { mutationOptions, queryOptions } from "@tanstack/react-query";
import type { MutationCallbacks } from ".";

export function listOrganizationsQuery() {
  return queryOptions({
    queryKey: ['organizations'],
    queryFn: () => listOrganization(),
  });
}

export function createOrganizationMutation({ onSuccess, onError }: MutationCallbacks<unknown>) {
  return mutationOptions({
    mutationFn: (input: CreateOrganizationInput) => createOrganization({ data: input }),
    onSuccess,
    onError,
  });
}

export function setActiveOrganizationMutation({ onSuccess, onError }: MutationCallbacks<unknown>) {
  return mutationOptions({
    mutationFn: (input: SetActiveOrganizationInput) => setActiveOrganization({ data: input }),
    onSuccess,
    onError,
  });
}
