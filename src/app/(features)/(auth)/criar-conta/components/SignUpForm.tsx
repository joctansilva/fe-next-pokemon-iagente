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
} from "@/app/(features)/(auth)/criar-conta/types/sign-up-form-fields";
import { saveUser, getUsers } from "@/lib/users";
import { v4 as uuidv4 } from "uuid";

export const SignUpForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormFields>({
    reValidateMode: "onSubmit",
    resolver: zodResolver(SignUpFormSchema),
  });

  const onSubmit = (data: SignUpFormFields) => {
    setError("");

    const users = getUsers();
    const userExists = users.some((user) => user.email === data.email);

    if (userExists) {
      setError("E-mail já cadastrado!");
      return;
    }

    saveUser({ id: uuidv4(), ...data });
    router.push("/login");
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
