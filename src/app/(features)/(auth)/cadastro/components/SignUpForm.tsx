"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  SignUpFormSchema,
  type SignUpFormFields,
} from "@/app/(features)/(auth)/cadastro/types/sign-up-form-fields";
import { register as authRegister } from "@/auth";

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormFields>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = async (data: SignUpFormFields) => {
    setError("");
    setIsSubmitting(true);

    try {
      await authRegister({
        name: data.name,
        email: data.email,
        password: data.password
      });
      
      router.push("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao criar conta");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <div className="flex flex-col gap-2">
        <Input 
          type="text" 
          placeholder="Nome" 
          {...register("name")} 
          className={errors.name ? "border-red-500" : ""}
        />
        {errors.name && <p className="text-red-500 text-xs">{errors.name.message}</p>}

        <Input 
          type="email" 
          placeholder="E-mail" 
          {...register("email")} 
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}

        <Input 
          type="password" 
          placeholder="Senha" 
          {...register("password")} 
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && <p className="text-red-500 text-xs">{errors.password.message}</p>}
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting ? "Criando conta..." : "Criar Conta"}
      </Button>

      <p className="text-sm text-center mt-2">
        Já tem uma conta?{" "}
        <span
          className="text-blue-500 cursor-pointer hover:underline"
          onClick={() => router.push("/login")}
        >
          Fazer login
        </span>
      </p>
    </form>
  );
};