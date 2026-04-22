"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function LogisticaInstalacion({ params: { locale } }: { params: { locale: string } }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const steps = [
    {
      step: "01",
      title: "Planificación y Medición",
      desc: "Nuestros técnicos realizan la medición milimétrica in situ antes de cualquier fabricación para garantizar el encaje perfecto del mobiliario."
    },
    {
      step: "02",
      title: "Transporte Sincronizado",
      desc: "Coordinamos la entrega directamente desde fábrica con vehículos propios, optimizando los tiempos y evitando manipulaciones innecesarias."
    },
    {
      step: "03",
      title: "Instalación Especializada",
      desc: "Equipos de montaje propios — no subcontratados. Garantizamos una instalación rápida, limpia y sin sobresaltos en cualquier ubicación."
    },
    {
      step: "04",
      title: "Revisión y Entrega",
      desc: "Inspección final con el cliente. Ajustes en el acto, certificado de garantía y soporte post-instalación incluido."
    }
  ];

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "1rem", fontSize: "0.9rem" }}>
        Pilar de Servicio
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
      >
        Logística e Instalación
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "4rem", maxWidth: "700px" }}
      >
        Contamos con profesionales con dilatada experiencia. El servicio de medición, transporte y montaje 
        es realizado por nuestros propios operarios, garantizando una instalación rápida, limpia y milimétrica 
        sin importar la envergadura del proyecto.
      </motion.p>

      {/* Process Steps */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.2 } } }}
        style={{ display: "flex", flexDirection: "column", gap: "0px", marginBottom: "4rem", borderLeft: "2px solid var(--color-accent)", paddingLeft: "2rem" }}
      >
        {steps.map((s, i) => (
          <motion.div key={i} variants={fadeIn} style={{ marginBottom: "2.5rem", position: "relative" }}>
            <div style={{
              position: "absolute",
              left: "-2.9rem",
              top: "0.1rem",
              width: "1.6rem",
              height: "1.6rem",
              background: "var(--color-accent)",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.65rem",
              color: "#fff",
              fontWeight: 700
            }}>
              {i + 1}
            </div>
            <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.4rem" }}>{s.step}</p>
            <h3 style={{ fontSize: "1.2rem", marginBottom: "0.6rem" }}>{s.title}</h3>
            <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.7 }}>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Banner */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ height: "400px", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "3rem" }}
      >
        <img src="/images-slider/img-slide-3.jpg" alt="Logística e Instalación" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", top: "50%", left: "2.5rem", transform: "translateY(-50%)", color: "#fff", maxWidth: "400px" }}>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "1rem" }}>Equipo propio, sin subcontrataciones</h2>
          <p style={{ opacity: 0.85, fontSize: "0.95rem", lineHeight: 1.6 }}>Rapidez de entrega frente a demanda ágil, con total control de calidad de extremo a extremo.</p>
        </div>
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <Link
          href={`/${locale}/contacto`}
          style={{ display: "inline-block", padding: "1rem 2.5rem", background: "var(--color-accent)", color: "#fff", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}
        >
          Solicitar Instalación
        </Link>
      </div>
    </div>
  );
}
