import { auth } from "@/auth";

export default async function ResidencialDashboard() {
  const session = await auth();
  const user = session?.user;

  return (
    <div style={{ padding: "4rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Área Cliente VIP
        </h1>
        <p style={{ color: "var(--color-accent)", fontSize: "1.1rem", fontWeight: 500 }}>
          Cliente: {user?.email}
        </p>
      </div>

      <section style={{ background: "rgba(255, 255, 255, 0.05)", padding: "2rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem" }}>Tu Proyecto: Villa Horizonte</h2>
        
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "1.5rem" }}>
          <div style={{ padding: "1.5rem", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "6px", display: "flex", gap: "2rem", alignItems: "center" }}>
             <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>
               ✨
             </div>
             <div>
               <h3 style={{ fontSize: "1.2rem", marginBottom: "0.5rem" }}>Fase 3: Ejecución en Taller</h3>
               <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem" }}>
                 Tus armarios y vestidores ya están en la fase de canteado láser y ensamblaje manual. Te avisaremos pronto para agendar la logística e instalación en tu domicilio.
               </p>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
