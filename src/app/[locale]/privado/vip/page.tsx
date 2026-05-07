import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { Home, Package, Truck } from "lucide-react";

export default async function VIPDashboard() {
  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toLowerCase();
  if (role !== "residencial") {
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
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "var(--color-text-main)", marginBottom: "0.5rem" }}>
          Mi Residencia Exclusiva
        </h1>
        <p style={{ color: "var(--color-text-light)", fontSize: "1.05rem" }}>
          Bienvenido, {user?.email}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Estado de mi Hogar</h3>
            <div style={{ padding: "0.5rem", background: "rgba(189,165,123,0.1)", borderRadius: "8px", color: "var(--color-accent)" }}>
              <Home size={20} />
            </div>
          </div>
          <p style={{ fontSize: "1.8rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>Fase de Acabados</p>
          <div style={{ width: "100%", background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "85%", background: "var(--color-accent)", height: "100%", borderRadius: "3px" }}></div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#666666", marginTop: "0.5rem" }}>Progreso: 85%</p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Mobiliario a Medida</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <Package size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>12</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Piezas en producción</p>
        </div>

        <div style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Próximas Entregas</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <Truck size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>1</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Programada para el 15 de Nov.</p>
        </div>
      </div>

      <section style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem", color: "#222222" }}>Últimas Actualizaciones</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Villa "La Roca"</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Selección de mármol calacatta confirmada por el diseñador.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Hace 2 días</span>
        </div>
      </section>
    </div>
  );
}
