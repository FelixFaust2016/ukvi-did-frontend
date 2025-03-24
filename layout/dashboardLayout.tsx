import { AppSidebar, Header } from "@/components/containers";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
  title,
  desc,
}: {
  children: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full">
        <Header title={title} desc={desc}>
          <SidebarTrigger className="block md:hidden lg:hidden" />
        </Header>
        <div className="px-5">{children}</div>
      </main>
    </SidebarProvider>
  );
}
