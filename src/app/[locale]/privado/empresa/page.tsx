"use client";

import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Briefcase, FileCheck, CheckCircle2, Download, Send, MessageSquare, Bot } from "lucide-react";
import { useEffect, Suspense } from "react";

function EmpresaDashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/es/auth/login");
    } else if (status === "authenticated") {
      const role = (session?.user?.role || "").toLowerCase();
      if (role !== "b2b") {
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
          Bienvenido de nuevo, {user?.name || user?.empresa_nombre || "Partner"}
        </h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>
          Panel Corporativo Partner B2B
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", marginBottom: "3rem" }}>
        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Proyectos en Fabricación</h3>
            <div style={{ padding: "0.5rem", background: "rgba(189,165,123,0.1)", borderRadius: "8px", color: "var(--color-accent)" }}>
              <Briefcase size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>3</p>
          <div style={{ width: "100%", background: "rgba(0,0,0,0.05)", height: "6px", borderRadius: "3px", overflow: "hidden" }}>
            <div style={{ width: "65%", background: "var(--color-accent)", height: "100%", borderRadius: "3px" }}></div>
          </div>
          <p style={{ fontSize: "0.85rem", color: "#666666", marginTop: "0.5rem" }}>Progreso global de fabricación al 65%</p>
        </div>

        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Presupuestos Pendientes</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <FileCheck size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>2</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Última actualización hace 2h</p>
        </div>

        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <h3 style={{ fontSize: "1rem", color: "#666666", fontWeight: 500 }}>Proyectos Finalizados</h3>
            <div style={{ padding: "0.5rem", background: "rgba(0,0,0,0.03)", borderRadius: "8px", color: "#555555" }}>
              <CheckCircle2 size={20} />
            </div>
          </div>
          <p style={{ fontSize: "2.5rem", fontWeight: 600, color: "#222222", margin: "0.5rem 0" }}>14</p>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Ver histórico completo en facturación</p>
        </div>
      </div>

      <section className="dashboard-card" style={cardStyle}>
        <h2 style={{ fontSize: "1.3rem", marginBottom: "1rem", borderBottom: "1px solid rgba(0,0,0,0.1)", paddingBottom: "1rem", color: "#222222" }}>Actividad Reciente</h2>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Residencial "Lumina" - Fase 2</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Nuevos planos técnicos subidos por el equipo de ingeniería.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "var(--color-accent)", fontWeight: 500 }}>Hoy, 10:30</span>
        </div>
        
        <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0" }}>
          <div>
            <h4 style={{ fontWeight: 500, fontSize: "1.1rem", color: "#222222" }}>Hotel "Boutique Alma"</h4>
            <p style={{ fontSize: "0.9rem", color: "#666666", marginTop: "0.25rem" }}>Cotización #4028 aprobada. Iniciando fase de aprovisionamiento.</p>
          </div>
          <span style={{ fontSize: "0.85rem", color: "#666666" }}>Ayer</span>
        </div>
      </section>
    </>
  );

  const renderProyectos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Mis Proyectos</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Listado de promociones y estado logístico.</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>Promoción "Vistas del Mar"</h3>
              <p style={{ color: "#666666", marginTop: "0.25rem" }}>ID: PRJ-40291 | 12 Viviendas</p>
            </div>
            <span style={{ background: "rgba(189,165,123,0.1)", color: "var(--color-accent)", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500, height: "fit-content" }}>En Tránsito</span>
          </div>
          <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(0,0,0,0.02)", borderRadius: "8px" }}>
             <p style={{ fontSize: "0.9rem", color: "#666666" }}>Llegada estimada a obra: 15 de Noviembre.</p>
          </div>
        </div>
        <div className="dashboard-card" style={cardStyle}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: "1.2rem", fontWeight: 600 }}>Hotel Boutique Centro</h3>
              <p style={{ color: "#666666", marginTop: "0.25rem" }}>ID: PRJ-40305 | 45 Habitaciones</p>
            </div>
            <span style={{ background: "rgba(0,0,0,0.05)", color: "#555", padding: "0.5rem 1rem", borderRadius: "20px", fontSize: "0.85rem", fontWeight: 500, height: "fit-content" }}>Fase de Ensamblaje</span>
          </div>
        </div>
      </div>
    </>
  );

  const renderPresupuestos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Historial de Facturación</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Presupuestos emitidos y facturas consolidadas.</p>
      </div>
      <div className="dashboard-card" style={cardStyle}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
           <div>
             <h4 style={{ fontWeight: 600 }}>Factura F-2026-089</h4>
             <p style={{ fontSize: "0.85rem", color: "#666666" }}>Emitida: 01 Nov 2026</p>
           </div>
           <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
             <span style={{ fontWeight: 600 }}>€12,450.00</span>
             <button style={{ background: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-accent)", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}><Download size={16} /></button>
           </div>
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" }}>
           <div>
             <h4 style={{ fontWeight: 600 }}>Cotización C-2026-112</h4>
             <p style={{ fontSize: "0.85rem", color: "#666666" }}>Pendiente de Aprobación</p>
           </div>
           <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
             <span style={{ fontWeight: 600 }}>€45,200.00</span>
             <button style={{ background: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-accent)", padding: "0.5rem", borderRadius: "4px", cursor: "pointer" }}><Download size={16} /></button>
           </div>
         </div>
      </div>
    </>
  );

  const renderIA = () => (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Consultor Técnico IA</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Resolución instantánea de dudas sobre optimización técnica y materiales.</p>
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
          <input type="text" placeholder="Escribe tu consulta técnica..." style={{ flex: 1, padding: "1rem", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", fontSize: "0.95rem" }} />
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
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Soporte Corporativo</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Contacta directamente con tu Account Manager asignado.</p>
      </div>
      <form className="dashboard-card" style={{ ...cardStyle, maxWidth: "600px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Asunto</label>
          <input type="text" placeholder="Ej: Retraso en entrega" style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none" }} />
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Referencia de Proyecto (Opcional)</label>
          <input type="text" placeholder="Ej: PRJ-40291" style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none" }} />
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

export default function EmpresaDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", color: "#222" }}>Cargando su panel seguro...</div>}>
      <EmpresaDashboardContent />
    </Suspense>
  );
}
