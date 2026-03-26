import { SidebarNav } from "@/components/app/sidebar-nav";
import { MobileNav } from "@/components/app/mobile-nav";

export default function FamilyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <SidebarNav role="family" />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <MobileNav role="family" />
    </div>
  );
}
