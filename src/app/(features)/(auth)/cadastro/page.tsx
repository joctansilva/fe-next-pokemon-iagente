import { SignUpForm } from "@/app/(features)/(auth)/cadastro/components/SignUpForm";

export default function SignUpPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-2xl font-bold">Criar Conta</span>
      </div>
      <SignUpForm />
    </div>
  );
}
