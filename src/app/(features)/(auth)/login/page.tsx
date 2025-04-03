import { LoginForm } from "@/app/(features)/(auth)/login/components/LoginForm/LoginForm";

export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-2xl font-bold">Entrar</span>
        <p>Use sua Conta</p>
      </div>
      <LoginForm />
    </div>
  );
}
