import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function InterioristaDashboard() {
  const session = await auth();
  const user = session?.user;

  const role = (user?.role || "").toLowerCase();
  if (role !== "interiorista" && role !== "pro" && role !== "profesional") {
    redirect("/es/privado");
  }

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Portal para Profesionales
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          {user?.especialidad || "Estudio de Interiorismo / Arquitectura"}
        </p>
        <p style={{ color: "var(--color-text-light)", fontSize: "0.9rem" }}>
          Conectado como: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Recursos Técnicos y Proyectos</h2>
        
        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px", marginBottom: "1rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Catálogo Técnico 2026</h3>
            <span style={{ background: "rgba(255,255,255,0.1)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem" }}>Descarga Disponible</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Accede a modelos 3D, texturas de alta resolución y planos constructivos de la nueva colección.</p>
        </div>

        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "6px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h3 style={{ fontSize: "1.2rem" }}>Proyecto: Ático "Diagonal"</h3>
            <span style={{ background: "var(--color-accent)", color: "white", padding: "0.25rem 0.75rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500 }}>Presupuesto Aprobado</span>
          </div>
          <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Los renders finales han sido validados por el cliente. En fase de pedido de materiales.</p>
        </div>
      </section>
    </div>
  );
}
