import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

export type SignUpFormFields = z.infer<typeof SignUpFormSchema>;