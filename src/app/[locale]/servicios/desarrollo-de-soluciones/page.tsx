"use client";

import { motion } from "framer-motion";

export default function DesarrolloSoluciones({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1rem", fontSize: "0.9rem" }}>Pilar de Servicio</motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: "2rem" }}>
        Desarrollo de Soluciones
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
        <div>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Incluso si no tiene un boceto listo de lo que quiere, le ayudamos a obtener el resultado que soñó. Afrontamos retos en ingeniería de sistemas embebidos, herrajes invisibles y control de procesos en espacios reducidos.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li>✓ Soluciones para cocinas, armarios, baños y divisiones</li>
            <li>✓ Adaptación del producto con aprovechamiento máximo</li>
            <li>✓ Calidad estética y funcional con herrajes premium</li>
          </ul>
        </div>
      </motion.div>
      <div style={{ height: "400px", background: "var(--color-bg-dark)", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "3rem" }}>
        <img src="/img/company.jpg" alt="Desarrollo de Soluciones" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      </div>
    </div>
  );
}
