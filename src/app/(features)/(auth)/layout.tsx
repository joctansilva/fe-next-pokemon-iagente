export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <main className="flex h-dvh items-center justify-center bg-purple-500">
        <div className="rounded-xl bg-gray-100 p-8 shadow-2xl w-[350px] h-[400px]">
          {children}
        </div>
      </main>
    </div>
  );
}
