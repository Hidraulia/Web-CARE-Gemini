import { auth } from "@/auth";

export default async function ProfesionalDashboard() {
  const session = await auth();
  const user = session?.user;

  const recursos = [
    {
      titulo: "Catálogo de Materiales 2026",
      subtitulo: "PDF · Alta resolución (24MB)",
      tipo: "PDF",
      disponible: true,
      color: "var(--color-accent)"
    },
    {
      titulo: "Bloques CAD — Mobiliario Baño",
      subtitulo: "DWG / DXF / SKP",
      tipo: "CAD",
      disponible: true,
      color: "var(--color-accent)"
    },
    {
      titulo: "Fichas Técnicas de Herrajes",
      subtitulo: "PDF · Especificaciones de instalación",
      tipo: "PDF",
      disponible: true,
      color: "var(--color-accent)"
    },
    {
      titulo: "Muestras de Acabados Premium",
      subtitulo: "Lacas, chapas, piedras y cristales",
      tipo: "MUESTRAS",
      disponible: false,
      color: "#6c757d"
    },
    {
      titulo: "Manual de Carpintería Técnica",
      subtitulo: "PDF · Tolerancias, herrajes y CNC",
      tipo: "PDF",
      disponible: false,
      color: "#6c757d"
    },
    {
      titulo: "Kit BIM — Revit 2024",
      subtitulo: "RFA · Familias actualizadas",
      tipo: "BIM",
      disponible: false,
      color: "#6c757d"
    }
  ];

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      {/* Header */}
      <div style={{ marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "2rem" }}>
        <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
          Centro Técnico Profesional
        </p>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Bienvenido, Interiorista
        </h1>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Especialidad: <strong>{user?.especialidad || "Arquitectura & Interiorismo"}</strong> · {user?.email}
        </p>
      </div>

      {/* Biblioteca de Recursos */}
      <section style={{ marginBottom: "3rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
          <h2 style={{ fontSize: "1.3rem" }}>Biblioteca de Recursos Técnicos</h2>
          <span style={{ fontSize: "0.8rem", color: "var(--color-text-light)" }}>
            {recursos.filter(r => r.disponible).length} de {recursos.length} disponibles
          </span>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1rem" }}>
          {recursos.map((r, i) => (
            <div
              key={i}
              style={{
                padding: "1.5rem",
                background: "rgba(255,255,255,0.02)",
                border: `1px solid ${r.disponible ? "var(--color-border)" : "rgba(255,255,255,0.04)"}`,
                borderLeft: `4px solid ${r.color}`,
                borderRadius: "6px",
                opacity: r.disponible ? 1 : 0.5,
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
              }}
            >
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <h3 style={{ fontSize: "1rem", marginBottom: "0.3rem", flex: 1 }}>{r.titulo}</h3>
                  <span style={{
                    background: r.disponible ? "rgba(189,165,123,0.15)" : "rgba(255,255,255,0.05)",
                    color: r.color,
                    padding: "0.2rem 0.5rem",
                    borderRadius: "3px",
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                    flexShrink: 0,
                    marginLeft: "0.5rem"
                  }}>
                    {r.tipo}
                  </span>
                </div>
                <p style={{ fontSize: "0.82rem", color: "var(--color-text-light)" }}>{r.subtitulo}</p>
              </div>
              <button
                disabled={!r.disponible}
                style={{
                  background: r.disponible ? "transparent" : "transparent",
                  border: `1px solid ${r.color}`,
                  color: r.color,
                  padding: "0.5rem 1rem",
                  borderRadius: "4px",
                  fontSize: "0.82rem",
                  cursor: r.disponible ? "pointer" : "not-allowed",
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-sans)"
                }}
              >
                {r.disponible ? "Descargar" : "Próximamente"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Contacto técnico */}
      <div style={{ padding: "1.5rem 2rem", background: "rgba(189,165,123,0.1)", border: "1px solid var(--color-accent)", borderRadius: "8px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <p style={{ fontWeight: 500, marginBottom: "0.2rem" }}>¿Necesita asesoramiento técnico en un proyecto?</p>
          <p style={{ fontSize: "0.88rem", color: "var(--color-text-light)" }}>Nuestro equipo de diseño técnico está disponible para consultas específicas.</p>
        </div>
        <a
          href="mailto:tecnico@care.es"
          style={{ padding: "0.75rem 1.5rem", background: "var(--color-accent)", color: "#fff", borderRadius: "4px", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.08em", textDecoration: "none", whiteSpace: "nowrap" }}
        >
          Consulta Técnica
        </a>
      </div>
    </div>
  );
}
