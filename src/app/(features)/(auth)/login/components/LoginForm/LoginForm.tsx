"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginFormSchema, type LoginFormFields } from "@/app/(features)/(auth)/login/types/login-form-fields";
import { useState } from "react";
import { signIn } from "@/auth"; // Importamos nossa implementação customizada

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormFields>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(LoginFormSchema),
  });

  const onSubmit = async (data: LoginFormFields) => {
    setError("");
    setIsSubmitting(true);

    try {
      await signIn({
        email: data.email,
        password: data.password,
      });
      
      // Redireciona para a página inicial após login bem-sucedido
      router.replace("/");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Usuário ou senha inválidos");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <p className="text-red-500 text-sm">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <Input
          type="email"
          placeholder="Email"
          {...register("email")}
          className={errors.email ? "border-red-500" : ""}
        />
        {errors.email && (
          <p className="text-red-500 text-xs">
            {errors.email.message}
          </p>
        )}

        <Input
          type="password"
          placeholder="Digite sua senha"
          {...register("password")}
          className={errors.password ? "border-red-500" : ""}
        />
        {errors.password && (
          <p className="text-red-500 text-xs">
            {errors.password.message}
          </p>
        )}
      </div>

      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full"
      >
        {isSubmitting ? "Entrando..." : "Entrar"}
      </Button>

      <p className="text-sm text-center mt-2">
        Ainda não tem uma conta?
        <span
          className="text-blue-500 cursor-pointer hover:underline ml-1"
          onClick={() => router.push("/criar-conta")}
        >
          Criar conta
        </span>
      </p>
    </form>
  );
};