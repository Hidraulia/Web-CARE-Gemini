"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function EjecucionIntegral({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1rem", fontSize: "0.9rem" }}>Pilar de Servicio</motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: "2rem" }}>
        Ejecución Integral
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
        <div>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Ofrecemos un servicio global que va desde la medición al montaje ofreciendo un “llave en mano” para su total tranquilidad. Permítanos hacer lo mejor: conocerle a usted y a su estilo único para ejecutar una obra sin sobresaltos.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li>✓ Interlocutor único para promotoras y particulares</li>
            <li>✓ Relación calidad-precio inmejorable adaptada a su presupuesto</li>
            <li>✓ Trazabilidad del proyecto desde Dashboard VIP</li>
          </ul>
        </div>
        <div>
          <div style={{ padding: "2rem", background: "rgba(255,255,255,0.03)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
            <h3 style={{ marginBottom: "1rem", color: "var(--color-accent)", fontSize: "1.2rem" }}>Para Clientes Exclusivos</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              Con nuestro panel VIP B2C, le acompañamos a lo largo de cada fase del proyecto llave en mano.
            </p>
            <Link href={`/${locale}/auth/login`} style={{ color: "#fff", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Siga Su Proyecto</Link>
          </div>
        </div>
      </motion.div>
      <div style={{ height: "400px", background: "var(--color-bg-dark)", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "3rem" }}>
         <img src="/img/vestidor.jpg" alt="Ejecución Integral" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      </div>
    </div>
  );
}
