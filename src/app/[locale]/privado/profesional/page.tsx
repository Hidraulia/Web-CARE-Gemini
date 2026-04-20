import { auth } from "@/auth";

export default async function ProfesionalDashboard() {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Centro Técnico
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          Especialidad: {user?.especialidad || "Interiorismo & Arquitectura"}
        </p>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Profesional: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Biblioteca de Recursos Técnicos</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
          
          <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", borderLeft: "4px solid var(--color-accent)" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Catálogo de Materiales 2026</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginBottom: "1rem" }}>PDF - Alta resolución (24MB)</p>
            <button style={{ background: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-accent)", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.85rem", cursor: "pointer" }}>Descargar PDF</button>
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", borderLeft: "4px solid #6c757d" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Bloques CAD - Mobiliario Baño</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginBottom: "1rem" }}>DWG / DXF / SKP</p>
            <button style={{ background: "transparent", border: "1px solid #6c757d", color: "#adb5bd", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.85rem", cursor: "pointer" }}>Descargar ZIP</button>
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", borderLeft: "4px solid #6c757d" }}>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.5rem" }}>Fichas Técnicas de Herrajes</h3>
            <p style={{ fontSize: "0.85rem", color: "var(--color-text-light)", marginBottom: "1rem" }}>PDF - Especificaciones técnicas de instalación</p>
            <button style={{ background: "transparent", border: "1px solid #6c757d", color: "#adb5bd", padding: "0.5rem 1rem", borderRadius: "4px", fontSize: "0.85rem", cursor: "pointer" }}>Descargar PDF</button>
          </div>

        </div>
      </section>
    </div>
  );
}
