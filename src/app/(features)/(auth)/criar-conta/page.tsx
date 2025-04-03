import { SignUpForm } from "@/app/(features)/(auth)/criar-conta/components/SignUpForm";



export default function SignInPage() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <div className="flex flex-col items-center gap-3">
        <span className="text-2xl font-bold">Criar Conta</span>
      </div>
      <SignUpForm />
    </div>
  );
}
