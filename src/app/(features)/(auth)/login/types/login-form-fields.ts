import { z } from "zod";

export type LoginFormFields = z.infer<typeof LoginFormSchema>;

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(3, { message: "Digite sua senha" }),
});
