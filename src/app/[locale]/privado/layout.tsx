import Sidebar from "@/components/Sidebar";

export default function PrivadoLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--color-bg)", color: "var(--color-text-main)" }}>
      {/* Sidebar acts as the global navigation for this section */}
      <Sidebar locale={locale} />
      
      {/* Main Content Area */}
      <div style={{ marginLeft: "260px", flex: 1, display: "flex", flexDirection: "column" }}>
        <main style={{ flex: 1, padding: "2rem 3rem" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
