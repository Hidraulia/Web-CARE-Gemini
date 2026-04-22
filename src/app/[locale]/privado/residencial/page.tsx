import { auth } from "@/auth";

export default async function ResidencialDashboard() {
  const session = await auth();
  const user = session?.user;

  const milestones = [
    { fase: "Fase 1", titulo: "Diseño y Medición", estado: "completado", progreso: 100, detalle: "Planos aprobados el 12 de Marzo" },
    { fase: "Fase 2", titulo: "Producción en Taller", estado: "activo", progreso: 65, detalle: "Canteado láser y ensamblaje en curso" },
    { fase: "Fase 3", titulo: "Logística e Instalación", estado: "pendiente", progreso: 0, detalle: "Pendiente de finalizar producción" },
    { fase: "Fase 4", titulo: "Revisión Final", estado: "pendiente", progreso: 0, detalle: "Inspección conjunta + entrega de garantía" },
  ];

  const estadoColor: Record<string, string> = {
    completado: "#51cf66",
    activo: "var(--color-accent)",
    pendiente: "rgba(255,255,255,0.2)"
  };

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "900px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "2rem" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
          Panel Cliente VIP
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Área Cliente
        </h1>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Sesión activa: <strong>{user?.email}</strong>
        </p>
      </div>

      {/* Proyecto activo */}
      <section style={{ background: "rgba(255,255,255,0.03)", border: "1px solid var(--color-border)", padding: "2rem", borderRadius: "8px", marginBottom: "2rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h2 style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>Proyecto: Villa Horizonte</h2>
            <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>Reforma Integral · Armarios, Cocina y Vestidor · Madrid</p>
          </div>
          <span style={{ background: "var(--color-accent)", color: "#fff", padding: "0.4rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500, whiteSpace: "nowrap" }}>
            En Producción
          </span>
        </div>

        {/* Hitos del proyecto */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.2rem" }}>
          {milestones.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
              <div style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                background: estadoColor[m.estado],
                flexShrink: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.75rem",
                marginTop: "0.2rem"
              }}>
                {m.estado === "completado" ? "✓" : m.estado === "activo" ? "→" : ""}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", textTransform: "uppercase", letterSpacing: "0.05em", color: "var(--color-text-light)", marginRight: "0.5rem" }}>{m.fase}</span>
                    <span style={{ fontSize: "1rem" }}>{m.titulo}</span>
                  </div>
                  <span style={{ fontSize: "0.85rem", color: estadoColor[m.estado] }}>{m.progreso}%</span>
                </div>
                <div style={{ width: "100%", background: "rgba(255,255,255,0.08)", height: "4px", borderRadius: "2px", overflow: "hidden", marginBottom: "0.4rem" }}>
                  <div style={{ width: `${m.progreso}%`, background: estadoColor[m.estado], height: "100%", transition: "width 1s ease" }} />
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>{m.detalle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contacto directo */}
      <div style={{ padding: "1.5rem 2rem", background: "rgba(189,165,123,0.1)", border: "1px solid var(--color-accent)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontWeight: 500, marginBottom: "0.2rem" }}>¿Tiene alguna consulta sobre su proyecto?</p>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)" }}>Su asesor personal está disponible de Lunes a Viernes de 9h a 18h.</p>
        </div>
        <a
          href="mailto:proyectos@care.es"
          style={{ padding: "0.75rem 1.5rem", background: "var(--color-accent)", color: "#fff", borderRadius: "4px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Contactar Asesor
        </a>
      </div>
    </div>
  );
}
