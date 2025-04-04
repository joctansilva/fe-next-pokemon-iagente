"use client";

import { Button } from "@/components/ui/button";
import { signOut } from "@/auth"; 
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push("/login"); 
    router.refresh(); 
  };

  return (
    <Button onClick={handleLogout} variant="destructive">
      Sair
    </Button>
  );
}