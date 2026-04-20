"use client";

import { motion } from "framer-motion";

export default function LogisticaInstalacion({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1rem", fontSize: "0.9rem" }}>Pilar de Servicio</motion.p>
      <motion.h1 
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: "2rem" }}>
        Logística e Instalación
      </motion.h1>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "3rem", marginBottom: "4rem" }}>
        <div>
          <p style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "1.5rem" }}>
            Contamos con profesionales con dilatada experiencia. El servicio de medición, transporte y montaje es realizado por nuestros propios operarios, garantizando una instalación rápida, limpia y milimétrica sin importar la envergadura del proyecto residencial o B2B.
          </p>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "1rem" }}>
            <li>✓ Transporte sincronizado desde fábrica</li>
            <li>✓ Equipos de montaje especializados (No subcontratados)</li>
            <li>✓ Rapidez de entrega frente a demanda ágil</li>
          </ul>
        </div>
      </motion.div>
      <div style={{ height: "400px", background: "var(--color-bg-dark)", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "3rem" }}>
         <img src="/images-slider/img-slide-3.jpg" alt="Logística" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
      </div>
    </div>
  );
}
