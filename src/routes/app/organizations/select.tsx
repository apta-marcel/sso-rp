import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useQuery, useMutation } from '@tanstack/react-query';
import { listOrganizationsQuery, setActiveOrganizationMutation } from '@/queries/organization.query';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/app/organizations/select')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();

  const { data: organizations, isLoading } = useQuery(listOrganizationsQuery());

  const { mutate: setActiveOrg, isPending } = useMutation(
    setActiveOrganizationMutation({
      onSuccess: () => {
        router.invalidate();
        navigate({ to: '/app' });
      },
      onError: (e) => console.log('e :>> ', e),
    })
  );

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Loading organizations...</p>
      </div>
    );
  }

  if (!organizations || organizations.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-2xl font-bold">No Organizations</h1>
          <p className="text-sm text-muted-foreground">
            You don't have any organizations yet. Create one to get started.
          </p>
          <Button onClick={() => navigate({ to: '/app/organizations/create' })}>
            Create Organization
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex w-full max-w-md flex-col gap-6">
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Select Organization</h1>
          <p className="text-sm text-muted-foreground">
            Choose an organization to continue
          </p>
        </div>
        <div className="flex flex-col gap-2">
          {organizations.map((org) => (
            <Button
              key={org.id}
              variant="outline"
              className="justify-start"
              disabled={isPending}
              onClick={() => setActiveOrg({
                id: org.id,
                slug: org.slug,
              })}
            >
              <div className="flex items-center gap-3">
                {org.logo && (
                  <img
                    src={org.logo}
                    alt={org.name}
                    className="h-6 w-6 rounded object-cover"
                  />
                )}
                <span>{org.name}</span>
              </div>
            </Button>
          ))}
        </div>
        <div className="flex justify-center">
          <Button
            variant="link"
            onClick={() => navigate({ to: '/app/organizations/create' })}
          >
            Create new organization
          </Button>
        </div>
      </div>
    </div>
  );
}
