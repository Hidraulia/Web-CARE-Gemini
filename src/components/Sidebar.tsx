"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Bot, Settings, LogOut, Globe } from "lucide-react";
import { signOut } from "next-auth/react";
import { Suspense } from "react";

function SidebarContent({ locale }: { locale: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentTab = searchParams.get("tab") || "dashboard";

  const navItems = [
    { name: "Dashboard", href: "?tab=dashboard", tab: "dashboard", icon: LayoutDashboard },
    { name: "Mis Proyectos", href: "?tab=proyectos", tab: "proyectos", icon: FolderKanban },
    { name: "Presupuestos", href: "?tab=presupuestos", tab: "presupuestos", icon: FileText },
    { name: "Consultor IA", href: "?tab=ia", tab: "ia", icon: Bot },
  ];

  return (
    <aside style={{
      width: "260px",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      background: "#000000",
      color: "#F9F9F9",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      zIndex: 1000
    }}>
      <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <button onClick={() => window.location.href = `/${locale}`} style={{ textDecoration: "none", background: "transparent", border: "none", cursor: "pointer", textAlign: "left", padding: 0 }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-accent)", margin: 0, letterSpacing: "0.05em" }}>CARE</h2>
          <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "#F9F9F9", opacity: 0.5, marginTop: "0.25rem", margin: 0 }}>Portal Colaborativo</p>
        </button>
      </div>

      <nav style={{ flex: 1, padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <button onClick={() => window.location.href = `/${locale}`} style={{
          display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", color: "rgba(255,255,255,0.7)", background: "transparent", border: "none", fontSize: "0.95rem", transition: "all 0.2s ease", cursor: "pointer", textAlign: "left"
        }}>
          <Globe size={18} strokeWidth={2} />
          Ver Sitio Web
        </button>

        {navItems.map((item) => {
          const isActive = currentTab === item.tab;

          return (
            <Link key={item.name} href={item.href} style={{
              display: "flex",
              alignItems: "center",
              gap: "1rem",
              padding: "0.85rem 1rem",
              borderRadius: "8px",
              color: isActive ? "var(--color-accent)" : "rgba(255,255,255,0.7)",
              background: isActive ? "rgba(189,165,123,0.1)" : "transparent",
              textDecoration: "none",
              fontSize: "0.95rem",
              transition: "all 0.2s ease",
              fontWeight: isActive ? 500 : 400
            }}>
              <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <div style={{ padding: "1.5rem 1rem", borderTop: "1px solid rgba(255,255,255,0.05)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <Link href="?tab=soporte" style={{
          display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", color: currentTab === "soporte" ? "var(--color-accent)" : "rgba(255,255,255,0.7)", background: currentTab === "soporte" ? "rgba(189,165,123,0.1)" : "transparent", textDecoration: "none", fontSize: "0.95rem", transition: "all 0.2s ease"
        }}>
          <Settings size={18} /> Soporte / Ajustes
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/', redirect: true })} style={{
          display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", color: "#ff6b6b", background: "rgba(255, 107, 107, 0.05)", border: "1px solid transparent", width: "100%", cursor: "pointer", fontSize: "0.95rem", textAlign: "left", transition: "all 0.2s ease"
        }}>
          <LogOut size={18} /> Cerrar sesión
        </button>
      </div>
    </aside>
  );
}

export default function Sidebar({ locale }: { locale: string }) {
  return (
    <Suspense fallback={<div style={{ width: "260px", background: "#000" }}></div>}>
      <SidebarContent locale={locale} />
    </Suspense>
  );
}
