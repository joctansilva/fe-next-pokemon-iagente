
export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div className="min-h-[calc(100svh-80px)] p-6">
        {children}
      </div>
    </div>
  );
}
