"use client";

import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Download, Folders, Ruler, Send, MessageSquare, FileCheck, Bot } from "lucide-react";
import { useEffect, Suspense } from "react";

function InterioristaDashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/es/auth/login");
    } else if (status === "authenticated") {
      const role = (session?.user?.role || "").toLowerCase();
      if (role !== "profesional") {
        router.push("/es/privado");
      }
    }
  }, [status, session, router]);

  if (status === "loading" || status === "unauthenticated") {
    return <div style={{ padding: "2rem", color: "#222" }}>Cargando su panel seguro...</div>;
  }

  const user = session?.user;

  const cardStyle = {
    background: "#FFFFFF",
    borderRadius: "var(--card-radius)",
    padding: "1.5rem",
    boxShadow: "var(--card-shadow)",
    border: "1px solid var(--color-accent)",
    display: "flex",
    flexDirection: "column" as const,
    gap: "1rem",
    color: "#222222"
  };

  const renderDashboard = () => (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-card { transition: all 0.3s ease; }
        .dashboard-card:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(189,165,123,0.15) !important; border-color: rgba(189,165,123,0.5) !important; }
      `}} />
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem", letterSpacing: "0.02em" }}>
          Bienvenido de nuevo, {user?.name || "Profesional"}
        </h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>
          {user?.especialidad || "Estudio de Interiorismo / Arquitectura"}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <div className="dashboard-card" style={cardStyle}>
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

        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Modelos BIM / 3D</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <Folders size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>+150</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Archivos actualizados</p>
        </div>

        <div className="dashboard-card" style={cardStyle}>
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

      <section className="dashboard-card" style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem", color: "#222222" }}>Estado de Proyectos Activos</h2>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Ático "Diagonal"</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Presupuesto aprobado. Renders validados por cliente final.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Fase: Pedidos</span>
        </div>
      </section>
    </>
  );

  const renderProyectos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Repositorio de Proyectos</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Acceso directo a ficheros BIM, modelos 3D y especificaciones por obra.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>Ático "Diagonal"</h3>
              <p style={{ color: "#666666", marginTop: "0.25rem" }}>ID: PRJ-40501</p>
            </div>
            <button style={{ background: "transparent", color: "var(--color-accent)", border: "1px solid var(--color-accent)", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500, height: "fit-content", display: "flex", gap: "0.5rem", alignItems: "center" }}><Download size={16} /> Descargar Paquete BIM</button>
          </div>
          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(0,0,0,0.02)", borderRadius: "8px" }}>
             <p style={{ fontSize: "0.9rem", color: "#666666" }}>Contiene: Planos de distribución, Modelos Sketchup y Texturas.</p>
          </div>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>Restaurante "El Faro"</h3>
              <p style={{ color: "#666666", marginTop: "0.25rem" }}>ID: PRJ-40533</p>
            </div>
            <button style={{ background: "transparent", color: "var(--color-accent)", border: "1px solid var(--color-accent)", padding: "0.5rem 1rem", borderRadius: "6px", cursor: "pointer", fontSize: "0.85rem", fontWeight: 500, height: "fit-content", display: "flex", gap: "0.5rem", alignItems: "center" }}><Download size={16} /> Descargar Paquete BIM</button>
          </div>
        </div>
      </div>
    </>
  );

  const renderPresupuestos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Generador de Cotizaciones</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Crea y gestiona presupuestos para tus clientes finales con tus márgenes aplicados.</p>
      </div>
      <div className="dashboard-card" style={{ ...cardStyle, background: "#FFFFFF", padding: "3rem", textAlign: "center", alignItems: "center", justifyContent: "center" }}>
        <FileCheck size={48} color="var(--color-accent)" style={{ marginBottom: "1rem" }} />
        <h3 style={{ fontSize: "1.5rem", fontWeight: 600, color: "#222" }}>Nuevo Presupuesto</h3>
        <p style={{ color: "#666", maxWidth: "400px", marginTop: "0.5rem", marginBottom: "2rem" }}>Añade referencias de catálogo y aplica tus márgenes profesionales en tiempo real.</p>
        <button style={{ background: "var(--color-accent)", color: "#222", border: "none", padding: "1rem 2rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600, fontSize: "1rem" }}>
          Crear Cotización
        </button>
      </div>
    </>
  );

  const renderIA = () => (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Calculadora Inteligente</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Asistencia inmediata para cálculo de materiales, medidas y compatibilidad técnica.</p>
      </div>
      <div className="dashboard-card" style={{ ...cardStyle, height: "500px", justifyContent: "space-between", padding: 0, overflow: "hidden" }}>
        <div style={{ padding: "2rem", overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div style={{ display: "flex", gap: "1rem", maxWidth: "80%" }}>
            <div style={{ width: "40px", height: "40px", borderRadius: "50%", background: "var(--color-accent)", display: "flex", alignItems: "center", justifyContent: "center", color: "#222222", flexShrink: 0 }}>
              <Bot size={20} />
            </div>
            <div style={{ background: "rgba(0,0,0,0.05)", padding: "1rem 1.5rem", borderRadius: "0 16px 16px 16px", color: "#222222", fontSize: "0.95rem", lineHeight: 1.5 }}>
              Hola, soy tu consultor técnico de CARE. ¿En qué puedo ayudarte con tu proyecto hoy?
            </div>
          </div>
        </div>
        <div style={{ padding: "1.5rem", borderTop: "1px solid rgba(0,0,0,0.05)", background: "#FFFFFF", display: "flex", gap: "1rem" }}>
          <input type="text" placeholder="Ej: ¿Cuántos m2 de madera necesito para un salón de 40m2 con panelado?..." style={{ flex: 1, padding: "1rem", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", fontSize: "0.95rem" }} />
          <button style={{ background: "var(--color-accent)", color: "#222222", border: "none", padding: "0 1.5rem", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }}>
            <Send size={18} />
          </button>
        </div>
      </div>
    </>
  );

  const renderSoporte = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Soporte para Profesionales</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Contacta con la oficina técnica o tu Project Manager.</p>
      </div>
      <form className="dashboard-card" style={{ ...cardStyle, maxWidth: "600px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Asunto</label>
          <input type="text" placeholder="Ej: Consulta técnica sobre herrajes" style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Referencia de Proyecto (Opcional)</label>
          <input type="text" placeholder="Ej: PRJ-40501" style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Mensaje</label>
          <textarea rows={5} placeholder="Describe tu consulta..." style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none", resize: "vertical" }} />
        </div>
        <button type="button" style={{ background: "var(--color-accent)", color: "#222222", border: "none", padding: "1rem", borderRadius: "6px", cursor: "pointer", fontWeight: 600, fontSize: "1rem", marginTop: "1rem", display: "flex", justifyContent: "center", gap: "0.5rem", alignItems: "center" }}>
          <MessageSquare size={18} /> Enviar Mensaje
        </button>
      </form>
    </>
  );

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
      {tab === "dashboard" && renderDashboard()}
      {tab === "proyectos" && renderProyectos()}
      {tab === "presupuestos" && renderPresupuestos()}
      {tab === "ia" && renderIA()}
      {tab === "soporte" && renderSoporte()}
    </div>
  );
}

export default function InterioristaDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", color: "#222" }}>Cargando su panel seguro...</div>}>
      <InterioristaDashboardContent />
    </Suspense>
  );
}
