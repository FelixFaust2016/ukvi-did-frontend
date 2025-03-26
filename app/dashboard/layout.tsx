import DashboardLayout from "@/layout/dashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      title="Dashboard"
      desc="Manage and issue credentials"
    >
      {children}
    </DashboardLayout>
  );
}
