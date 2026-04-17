"use client";

import { motion } from "framer-motion";

export default function DashboardB2C() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header style={{ marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "2rem", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>Área Cliente Premium</h1>
            <p style={{ color: "var(--color-text-light)" }}>Vestidor Principal a Medida - Residencia de Juan P.</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <span style={{ fontSize: "0.8rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-text-light)" }}>Estado Actual</span>
            <div style={{ fontSize: "1.2rem", fontWeight: 600, color: "var(--color-accent)" }}>En Fase de Lacado</div>
          </div>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2rem" }}>
          <div className="glass-panel" style={{ padding: "0", borderRadius: "8px", overflow: "hidden" }}>
             <img src="/img/vestidor.jpg" alt="Progreso" style={{ width: "100%", height: "400px", objectFit: "cover", filter: "brightness(0.8)" }} />
             <div style={{ padding: "2rem" }}>
               <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "0.5rem" }}>Diario de Fabricación</h3>
               <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)" }}>Actualización: Sus puertas escamoteables están recibiendo la segunda capa de laca artesanal mate.</p>
             </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
             <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px" }}>
               <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", marginBottom: "1rem" }}>Detalles del Pedido</h3>
               <ul style={{ listStyle: "none", fontSize: "0.9rem", color: "var(--color-text-light)", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                 <li><strong>Material:</strong> Roble Ahumado Macizo</li>
                 <li><strong>Acabado:</strong> Barniz Extra Mate</li>
                 <li><strong>Herrajes:</strong> Extracción Total Blum</li>
               </ul>
             </div>
             
             <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px", backgroundColor: "var(--color-bg-dark)", color: "#fff" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.2rem", marginBottom: "1rem", color: "var(--color-accent)" }}>Su Gestor Personal</h3>
                <p style={{ fontSize: "0.9rem", opacity: 0.8, marginBottom: "1rem" }}>Para cualquier modificación de última hora o consulta, contacte directamente.</p>
                <div style={{ fontSize: "0.9rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>✉</span> a.martin@care.es
                </div>
             </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
