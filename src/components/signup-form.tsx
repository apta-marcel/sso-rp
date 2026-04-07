import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { useForm } from '@tanstack/react-form-start';
import { useMutation } from '@tanstack/react-query';
import { registerMutation } from '@/queries/auth.query';
import { RegisterInputSchema, type RegisterInput } from '@/@types/user.d';
import { useNavigate } from '@tanstack/react-router';

export function SignupForm({ className, ...props }: React.ComponentProps<'form'>) {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation(registerMutation({
    onSuccess: () => {
      navigate({ to: '/auth/login' });
    },
    onError: (e) => console.log('e :>> ', e),
  }));

  const form = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validators: {
      onSubmit: RegisterInputSchema,
    },
    onSubmit: async ({ value }: { value: RegisterInput }) => mutate(value),
  });

  return (
    <form
      className={cn('flex flex-col gap-6', className)}
      onSubmit={(e) => {
        e.preventDefault();
        form.handleSubmit();
      }}
      {...props}
    >
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Create your account</h1>
          <p className="text-sm text-balance text-muted-foreground">Fill in the form below to create your account</p>
        </div>
        <form.Field
          name="username"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Username</FieldLabel>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  aria-invalid={isInvalid}
                  type="text"
                  placeholder="John Doe"
                  required
                  className="bg-background"
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
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
                <FieldDescription>We&apos;ll use this to contact you. We will not share your email with anyone else.</FieldDescription>
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
                <FieldLabel htmlFor={field.name}>Password</FieldLabel>
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
                <FieldDescription>Must be at least 8 characters long.</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <form.Field
          name="confirmPassword"
          children={(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm Password</FieldLabel>
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
                <FieldDescription>Please confirm your password.</FieldDescription>
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            );
          }}
        />
        <Field>
          <Button disabled={isPending} type="submit">
            {isPending ? 'Creating account...' : 'Create Account'}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="px-6 text-center">
            Already have an account? <a href="/auth/login">Sign in</a>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
