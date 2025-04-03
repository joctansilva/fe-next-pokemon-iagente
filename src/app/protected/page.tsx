import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return <p>Acesso negado. Faça login para acessar esta página.</p>;
  }

  return <div>Bem-vindo, {session.user?.name}!</div>;
}
