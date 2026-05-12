"use client";

import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import { Home, Package, Truck, Image as ImageIcon, Send, MessageSquare, Bot } from "lucide-react";
import { useEffect, Suspense } from "react";

function VIPDashboardContent() {
  const { data: session, status } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab") || "dashboard";

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/es/auth/login");
    } else if (status === "authenticated") {
      const role = (session?.user?.role || "").toLowerCase();
      if (role !== "residencial") {
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
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>
          Mi Residencia Exclusiva
        </h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>
          Bienvenido, {user?.email || "Cliente VIP"}
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
    </>
  );

  const renderProyectos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Galería de Obra</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Fotografías del avance de fabricación y montaje.</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "1.5rem" }}>
        <div style={{ ...cardStyle, padding: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", height: "200px", background: "rgba(0,0,0,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={40} color="#ccc" />
          </div>
          <h4 style={{ marginTop: "1rem", fontWeight: 600 }}>Salón Principal</h4>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Panelados instalados (Hace 3 días)</p>
        </div>
        <div style={{ ...cardStyle, padding: "1rem", alignItems: "center" }}>
          <div style={{ width: "100%", height: "200px", background: "rgba(0,0,0,0.05)", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <ImageIcon size={40} color="#ccc" />
          </div>
          <h4 style={{ marginTop: "1rem", fontWeight: 600 }}>Dormitorio Suite</h4>
          <p style={{ fontSize: "0.85rem", color: "#666666" }}>Vestidor a medida (Ayer)</p>
        </div>
      </div>
    </>
  );

  const renderPresupuestos = () => (
    <>
      <div style={{ marginBottom: "3rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Estado de Pagos</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Próximas cuotas y extras contratados.</p>
      </div>
      <div style={cardStyle}>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0", borderBottom: "1px solid rgba(0,0,0,0.05)" }}>
           <div>
             <h4 style={{ fontWeight: 600 }}>Cuota #2 - Certificación Acabados</h4>
             <p style={{ fontSize: "0.85rem", color: "#666666" }}>Vencimiento: 20 Nov 2026</p>
           </div>
           <span style={{ fontWeight: 600, color: "var(--color-accent)" }}>Pendiente</span>
         </div>
         <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 0" }}>
           <div>
             <h4 style={{ fontWeight: 600 }}>Reserva Inicial y Proyecto</h4>
             <p style={{ fontSize: "0.85rem", color: "#666666" }}>Abonado el 15 Mar 2026</p>
           </div>
           <span style={{ fontWeight: 600, color: "#27ae60" }}>Pagado</span>
         </div>
      </div>
    </>
  );

  const renderIA = () => (
    <>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Asistente de Estilismo</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Consulta sobre materiales, limpieza y decoración.</p>
      </div>
      <div style={{ ...cardStyle, height: "500px", justifyContent: "space-between", padding: 0, overflow: "hidden" }}>
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
          <input type="text" placeholder="Ej: ¿Cómo limpio el mármol del salón?..." style={{ flex: 1, padding: "1rem", borderRadius: "8px", border: "1px solid rgba(0,0,0,0.1)", outline: "none", fontSize: "0.95rem" }} />
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
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", color: "#222222", marginBottom: "0.5rem" }}>Atención al Cliente</h1>
        <p style={{ color: "#666666", fontSize: "1.05rem" }}>Contacta directamente con tu Project Manager.</p>
      </div>
      <form style={{ ...cardStyle, maxWidth: "600px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ fontSize: "0.85rem", fontWeight: 600, color: "#666666" }}>Asunto</label>
          <input type="text" placeholder="Ej: Duda sobre acabados" style={{ padding: "0.85rem", borderRadius: "6px", border: "1px solid rgba(0,0,0,0.1)", fontSize: "0.95rem", outline: "none" }} />
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

export default function VIPDashboard() {
  return (
    <Suspense fallback={<div style={{ padding: "2rem", color: "#222" }}>Cargando su panel seguro...</div>}>
      <VIPDashboardContent />
    </Suspense>
  );
}
