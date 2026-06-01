import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import AdminNav from "@/components/admin/AdminNav";

export const dynamic = "force-dynamic";

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!isAuthenticated()) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[var(--color-nude-light)]">
      <AdminNav />
      <main className="section py-8">{children}</main>
    </div>
  );
}
