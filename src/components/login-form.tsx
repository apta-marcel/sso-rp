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
import { useForm } from '@tanstack/react-form-start';
import { useMutation } from '@tanstack/react-query';
import { loginMutation } from '@/queries/auth.query';
import { LoginInputSchema, type LoginInput } from '@/@types/user.d';
import { useNavigate } from "@tanstack/react-router";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation(
    loginMutation({
      onSuccess: () => {
        navigate({ to: '/app/organizations/select' });
      },
      onError: (e) => console.log('e :>> ', e),
    })
  );

  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: LoginInputSchema,
    },
    onSubmit: async ({ value }: { value: LoginInput }) => mutate(value),
  });

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-sm text-balance text-muted-foreground">
            Enter your email below to login to your account
          </p>
        </div>
        <form.Field
          name="email"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-background"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="password"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <div className="flex items-center">
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="password"
                  required
                  className="bg-background"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Logging in...' : 'Login'}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <a href="/auth/register" className="underline underline-offset-4">
              Sign up
            </a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  )
}
