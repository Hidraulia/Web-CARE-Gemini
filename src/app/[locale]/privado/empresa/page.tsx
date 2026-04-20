import { auth } from "@/auth";

export default async function EmpresaDashboard() {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Panel Partner B2B
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          {user?.empresa_nombre || "Empresa Colaboradora"}
        </p>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Conectado como: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Estado de Proyectos Activos</h2>
        
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Residencial "Lumina" - Fase 2</h3>
            <span style={{ background: "var(--color-accent)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500 }}>En Producción</span>
          </div>
          <div style={{ width: "100%", background: "rgba(255,255,255,0.1)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "0.5rem" }}>
            <div style={{ width: "65%", background: "var(--color-accent)", height: "100%" }}></div>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Progreso: 65% - Estimación de entrega: 15 de Noviembre</p>
        </div>

        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Hotel "Boutique Alma"</h3>
            <span style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>Planificación</span>
          </div>
          <div style={{ width: "100%", background: "rgba(255,255,255,0.1)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "0.5rem" }}>
            <div style={{ width: "10%", background: "var(--color-text-light)", height: "100%" }}></div>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Progreso: 10% - Pendiente validación de planos técnicos</p>
        </div>
      </section>
    </div>
  );
}
