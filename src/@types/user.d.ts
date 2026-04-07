import z, { email } from 'zod';

export const RegisterInputSchema = z
  .object({
    email: z.email('Invalid email address'),
    username: z.string(),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Password must be at least 8 characters long'),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['password'],
      });
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords do not match',
        path: ['confirmPassword'],
      });
    }
  });
export type RegisterInput = z.infer<typeof RegisterInputSchema>;

export const LoginInputSchema = z.object({
  email: z.email(),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});
export type LoginInput = z.infer<typeof LoginInputSchema>;

export type LoginResponse = {
  redirect: boolean;
  token: string;
  url?: string | undefined;
  user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    email: string;
    emailVerified: boolean;
    name: string;
    image?: string | null | undefined;
    username?: string | null | undefined;
    displayUsername?: string | null | undefined;
  };
};
