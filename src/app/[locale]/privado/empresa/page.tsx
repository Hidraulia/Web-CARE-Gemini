import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Briefcase, FileCheck, CheckCircle2 } from "lucide-react";

export default async function EmpresaDashboard() {
  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toLowerCase();
  if (role !== "b2b" && role !== "empresa") {
    redirect("/es/privado");
  }

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "var(--card-radius)",
    padding: "1.5rem",
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--color-border)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem"
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222", marginBottom: "0.5rem" }}>
          Bienvenido, {user?.empresa_nombre || "Empresa Colaboradora"}
        </h1>
        <p style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}>
          Panel Corporativo Partner B2B
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        {/* Metric 1 */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "var(--color-text-light)", fontWeight: 500 }}>Proyectos en Fabricación</h3>
            <div style={{ padding: "0.5rem", background: "rgba(189,165,123,0.1)", borderRadius: "8px", color: "var(--color-accent)" }}>
              <Briefcase size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222", margin: "0.5rem 0" }}>3</p>
          <div style={{ width: "100%", background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "65%", background: "var(--color-accent)", height: "100%", borderRadius: "3px" }}></div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginTop: "0.5rem" }}>Progreso global de fabricación al 65%</p>
        </div>

        {/* Metric 2 */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "var(--color-text-light)", fontWeight: 500 }}>Presupuestos Pendientes</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555" }}>
              <FileCheck size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222", margin: "0.5rem 0" }}>2</p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)" }}>Última actualización hace 2h</p>
        </div>

        {/* Metric 3 */}
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "var(--color-text-light)", fontWeight: 500 }}>Proyectos Finalizados</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555" }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222", margin: "0.5rem 0" }}>14</p>
          <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)" }}>Ver histórico completo en facturación</p>
        </div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "1rem" }}>Actividad Reciente</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem" }}>Residencial "Lumina" - Fase 2</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginTop: "0.25rem" }}>Nuevos planos técnicos subidos por el equipo de ingeniería.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Hoy, 10:30</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem" }}>Hotel "Boutique Alma"</h4>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginTop: "0.25rem" }}>Cotización #4028 aprobada. Iniciando fase de aprovisionamiento.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-text-light)" }}>Ayer</span>
        </div>
      </section>
    </div>
  );
}
