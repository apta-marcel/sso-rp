import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useForm } from '@tanstack/react-form-start';
import { useMutation } from '@tanstack/react-query';
import { createOrganizationMutation } from '@/queries/organization.query';
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export const Route = createFileRoute('/app/organizations/create')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();
  const router = useRouter();

  const { mutate, isPending } = useMutation(
    createOrganizationMutation({
      onSuccess: () => {
        router.invalidate();
        navigate({ to: '/app/organizations/select' });
      },
      onError: (e) => console.log('e :>> ', e),
    })
  );

  const form = useForm({
    defaultValues: {
      name: '',
      slug: '',
      logo: '',
    },
    onSubmit: async ({ value }) => mutate(value),
  });

  return (
    <div className="flex min-h-screen items-center justify-center">
      <form
        className={cn("flex w-full max-w-md flex-col gap-6")}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Create Organization</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter the details to create a new organization
            </p>
          </div>
          <form.Field
            name="name"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Name</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="My Organization"
                    required
                    className="bg-background"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="slug"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Slug</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="text"
                    placeholder="my-organization"
                    required
                    className="bg-background"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <form.Field
            name="logo"
            children={(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Logo URL (optional)</FieldLabel>
                  <Input
                    id={field.name}
                    name={field.name}
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    type="url"
                    placeholder="https://example.com/logo.png"
                    className="bg-background"
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          />
          <Field>
            <Button disabled={isPending} type="submit" className="w-full">
              {isPending ? 'Creating...' : 'Create Organization'}
            </Button>
          </Field>
          <Field>
            <FieldDescription className="text-center">
              <button
                type="button"
                onClick={() => navigate({ to: '/app/organizations/select' })}
                className="underline underline-offset-4"
              >
                Back to organization selection
              </button>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
}
