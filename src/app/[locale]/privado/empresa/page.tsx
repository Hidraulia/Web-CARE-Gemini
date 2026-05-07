import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Briefcase, FileCheck, CheckCircle2 } from "lucide-react";

export default async function EmpresaDashboard() {
  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toLowerCase();
  if (role !== "b2b") {
    redirect("/es/privado");
  }

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "var(--card-radius)",
    padding: "1.5rem",
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--color-accent)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    color: "#222222"
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>
          Bienvenido, {user?.empresa_nombre || "Empresa Colaboradora"}
        </h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>
          Panel Corporativo Partner B2B
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Proyectos en Fabricación</h3>
            <div style={{ padding: "0.5rem", background: "rgba(189,165,123,0.1)", borderRadius: "8px", color: "var(--color-accent)" }}>
              <Briefcase size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>3</p>
          <div style={{ width: "100%", background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "65%", background: "var(--color-accent)", height: "100%", borderRadius: "3px" }}></div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#666666", marginTop: "0.5rem" }}>Progreso global de fabricación al 65%</p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Presupuestos Pendientes</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <FileCheck size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>2</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Última actualización hace 2h</p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Proyectos Finalizados</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>14</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Ver histórico completo en facturación</p>
        </div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem", color: "#222222" }}>Actividad Reciente</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Residencial "Lumina" - Fase 2</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Nuevos planos técnicos subidos por el equipo de ingeniería.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Hoy, 10:30</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Hotel "Boutique Alma"</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Cotización #4028 aprobada. Iniciando fase de aprovisionamiento.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "#666666" }}>Ayer</span>
        </div>
      </section>
    </div>
  );
}
