import { auth } from "@/auth";

export default async function InterioristaDashboard() {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Panel Profesional
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          {user?.especialidad || "Interiorismo / Arquitectura"}
        </p>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Conectado como: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Tus Recursos Profesionales</h2>
        
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Biblioteca CAD & 3D</h3>
            <span style={{ background: "var(--color-accent)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500 }}>Descargar</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Accede a nuestros modelos 3D y texturas para integrarlos en tus renders.</p>
        </div>

        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Proyectos en Curso</h3>
            <span style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>Ver todos</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Revisa el estado de producción de tus pedidos personalizados.</p>
        </div>
      </section>
    </div>
  );
}
