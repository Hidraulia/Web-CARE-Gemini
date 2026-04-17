"use client";

import { motion } from "framer-motion";

export default function DashboardB2B() {
  return (
    <div style={{ minHeight: "100vh", background: "var(--color-bg)", padding: "4rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <header style={{ marginBottom: "3rem", borderBottom: "1px solid var(--color-border)", paddingBottom: "2rem" }}>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>Panel Corporativo B2B</h1>
          <p style={{ color: "var(--color-text-light)" }}>Promociones Residenciales Norte S.L.</p>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem" }}>Seguimiento de Proyecto</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", marginBottom: "1.5rem" }}>Estado de fabricación de los 120 armarios para el Bloque Residencial A.</p>
            
            {/* Mock Progress Bar */}
            <div style={{ width: "100%", background: "var(--color-border)", height: "8px", borderRadius: "4px", overflow: "hidden", marginBottom: "0.5rem" }}>
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "65%" }} 
                transition={{ duration: 1, delay: 0.5 }} 
                style={{ background: "var(--color-accent)", height: "100%" }} 
              />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8rem", color: "var(--color-text-light)", fontWeight: 600 }}>
              <span>Canteado y Mecanizado (65%)</span>
              <span>Entrega Est: 14 Mayo</span>
            </div>
          </div>

          <div className="glass-panel" style={{ padding: "2rem", borderRadius: "8px" }}>
             <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "1rem" }}>Auditoría de Solvencia</h3>
             <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.9rem" }}>
               <li style={{ display: "flex", justifyContent: "space-between" }}><span>Certificado de Materiales ignífugos</span> <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>Descargar PDF</span></li>
               <li style={{ display: "flex", justifyContent: "space-between" }}><span>ISO 9001 - Fabricación</span> <span style={{ color: "var(--color-accent)", cursor: "pointer" }}>Descargar PDF</span></li>
             </ul>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
