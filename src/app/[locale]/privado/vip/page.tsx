import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function VIPDashboard() {
  const session = await auth();
  const user = session?.user;

  // If you are not vip/b2c/residencial, kick them back
  const role = (user?.role || "").toLowerCase();
  if (role !== "vip" && role !== "b2c" && role !== "residencial") {
    redirect("/es/privado");
  }

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Mi Residencia Exclusiva
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          Cliente VIP Residencial
        </p>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Conectado como: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Estado de Proyecto Residencial</h2>
        
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Villa "La Roca" - Diseño de Interiores</h3>
            <span style={{ background: "var(--color-accent)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500 }}>Fase de Acabados</span>
          </div>
          <div style={{ width: "100%", background: "rgba(255,255,255,0.1)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "0.5rem" }}>
            <div style={{ width: "85%", background: "var(--color-accent)", height: "100%" }}></div>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Progreso: 85% - Preparando envío de mobiliario a medida.</p>
        </div>
      </section>
    </div>
  );
}
