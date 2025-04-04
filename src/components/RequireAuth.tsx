"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect } from "react";

export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { user, status } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status !== "authenticated") {
    return <div>Carregando...</div>;
  }

  return <>{children}</>;
}