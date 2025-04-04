import { RequireAuth } from "@/components/RequireAuth";
import LogoutButton from "../(auth)/logout/Logout";

export default function Home() {
  return (
    <RequireAuth>
      <div className="flex h-dvh items-center justify-center bg-atl-sys-color-background">
        <div className="rounded-atl-sys-shape-border-radius-l bg-atl-sys-color-surface p-atl-sys-spacing-36 shadow-atl-sys-elevation-s-bottom-blue-700">
          <h1 className="text-atl-sys-color-on-surface-high-emphasis">Home</h1>
          <LogoutButton />
        </div>
      </div>
    </RequireAuth>
  );
}
