import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Download, Folders, Ruler } from "lucide-react";

export default async function InterioristaDashboard() {
  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toLowerCase();
  if (role !== "profesional") {
    redirect("/es/privado");
  }

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "var(--card-radius)",
    padding: "1.5rem",
    boxShadow: "var(--card-shadow)",
    border: "1px solid rgba(255,255,255,0.1)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    color: "#222222"
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>
          Portal para Profesionales
        </h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>
          {user?.especialidad || "Estudio de Interiorismo / Arquitectura"}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Descarga de Catálogos</h3>
            <div style={{ padding: "0.5rem", background: "rgba(189,165,123,0.1)", borderRadius: "8px", color: "var(--color-accent)" }}>
              <Download size={20} />
            </div>
          </div>
          <p style={{ fontSize: "1.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>Colección 2026</p>
          <button style={{ background: "var(--color-accent)", color: "#fff", border: "none", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontWeight: 500, fontSize: "0.9rem" }}>
            Descargar PDF (24MB)
          </button>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Modelos BIM / 3D</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <Folders size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>+150</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Archivos actualizados</p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Mis Especificaciones</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <Ruler size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>4</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Proyectos con productos CARE</p>
        </div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem", color: "#222222" }}>Estado de Proyectos Activos</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Ático "Diagonal"</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Presupuesto aprobado. Renders validados por cliente final.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Fase: Pedidos</span>
        </div>
      </section>
    </div>
  );
}
