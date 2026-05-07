"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, FolderKanban, FileText, Bot, Settings, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function Sidebar({ locale }: { locale: string }) {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: `/${locale}/privado`, icon: LayoutDashboard },
    { name: "Mis Proyectos", href: `/${locale}/privado/proyectos`, icon: FolderKanban },
    { name: "Presupuestos", href: `/${locale}/privado/presupuestos`, icon: FileText },
    { name: "Consultor IA", href: `/${locale}/privado/consultor-ia`, icon: Bot },
  ];

  return (
    <aside style={{
      width: "260px",
      height: "100vh",
      position: "fixed",
      top: 0,
      left: 0,
      background: "#1A1A1A",
      color: "#F9F9F9",
      display: "flex",
      flexDirection: "column",
      borderRight: "1px solid rgba(255,255,255,0.05)",
      zIndex: 1000
    }}>
      <div style={{ padding: "2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: "var(--color-accent)", margin: 0, letterSpacing: "0.05em" }}>CARE</h2>
        <p style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.1em", opacity: 0.5, marginTop: "0.25rem" }}>Portal Colaborativo</p>
      </div>

      <nav style={{ flex: 1, padding: "2rem 1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        {navItems.map((item) => {
          // A simple check to highlight Dashboard ONLY if exact, and others if included
          const isDashboard = item.name === "Dashboard";
          const isActive = isDashboard 
            ? pathname === item.href 
            : pathname?.includes(item.href);

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
        <Link href={`/${locale}/privado/ajustes`} style={{
          display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.95rem", transition: "all 0.2s ease"
        }}>
          <Settings size={18} /> Soporte / Ajustes
        </Link>
        <button onClick={() => signOut({ callbackUrl: '/', redirect: true })} style={{
          display: "flex", alignItems: "center", gap: "1rem", padding: "0.85rem 1rem", borderRadius: "8px", color: "#ff6b6b", background: "rgba(255, 107, 107, 0.05)", border: "1px solid transparent", width: "100%", cursor: "pointer", fontSize: "0.95rem", textAlign: "left", transition: "all 0.2s ease"
        }}>
          <LogOut size={18} /> Salir Sesión
        </button>
      </div>
    </aside>
  );
}
