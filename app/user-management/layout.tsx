import DashboardLayout from "@/layout/dashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      title="Issue Credential"
      desc="Manage and issue credentials"
    >
      {children}
    </DashboardLayout>
  );
}
