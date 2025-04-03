"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  LoginFormSchema,
  type LoginFormFields,
} from "@/app/(features)/(auth)/login/types/login-form-fields";
import { zodResolver } from "@hookform/resolvers/zod";


export const LoginForm = () => {
  const { replace } = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(LoginFormSchema),
  });

  return (
    <form className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <Input type="email" placeholder="Email" />
        <Input type="password" placeholder="Digite sua senha" />
      </div>
      <Button type="submit">Entrar</Button>
    </form>
  );
};
