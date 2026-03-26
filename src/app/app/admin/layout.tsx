import { SidebarNav } from "@/components/app/sidebar-nav";
import { MobileNav } from "@/components/app/mobile-nav";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav role="admin" />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileNav role="admin" />
    </div>
  );
}
