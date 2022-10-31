import z from "zod";

export const LoginCredentialsValidator = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export type LoginCredentialsSchema = z.infer<typeof LoginCredentialsValidator>;
