"use client";

import { motion } from "framer-motion";

export default function DashboardInteriorista() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header style={{ marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>Centro de Recursos Técnicos</h1>
          <p style={{ color: "var(--color-text-light)" }}>Área de Arquitectos e Interioristas</p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem" }}>Librería CAD / BIM</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginBottom: "1.5rem" }}>Descarga bloques técnicos de nuestras soluciones de almacenamiento modular.</p>
            
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem" }}>
               <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}><span>Sistema Armario Corredera Mod. Exellence</span> <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>.DWG</span></li>
               <li style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid var(--color-border)", paddingBottom: "0.5rem" }}><span>Cocina Isla Integral Mod. Zen</span> <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>.RVT</span></li>
               <li style={{ display: "flex", justifyContent: "space-between" }}><span>Detalle Constructivo - Herrajes Suspendidos</span> <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>.PDF</span></li>
             </ul>
          </div>

          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px" }}>
             <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem" }}>Colaboración Técnica</h3>
             <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginBottom: "1.5rem" }}>Consulta directa con nuestro departamento de ingeniería de producto.</p>
             <button style={{ backgroundColor: "transparent", border: "1px solid var(--color-accent)", color: "var(--color-text-main)", padding: "0.8rem 1.5rem", cursor: "pointer", transition: "all 0.3s" }}>
               Programar Revisión de Planos
             </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
