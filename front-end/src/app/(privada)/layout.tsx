import { ProtectedRoute } from "@/src/components/ProtectedRoute"
import { AppSidebar } from "@/src/components/appSidebar";
import { SiteHeader } from "@/src/components/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/src/components/ui/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider
      style={{ "--sidebar-width": "calc(var(--spacing) * 72)", "--header-height": "calc(var(--spacing) * 12)", } as React.CSSProperties}>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <main className="flex flex-1 flex-col @container/main gap-4 md:gap-6 px-4 py-6">
          <ProtectedRoute>
            {children}
          </ProtectedRoute>
        </main>
      </SidebarInset>
    </SidebarProvider >
  );
}
