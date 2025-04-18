import DashboardLayout from "@/layout/dashboardLayout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <DashboardLayout
      title="Applicants"
      desc="Check Applicants Detials before Issuing"
    >
      {children}
    </DashboardLayout>
  );
}
