"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { LayoutTemplate, Layers, Grid, Archive } from "lucide-react";

export default function DesarrolloSoluciones({ params: { locale } }: { params: { locale: string } }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const solutions = [
    {
      title: "Cocinas de Diseño",
      desc: "Sistemas de apertura inteligente, perfil sin tirador, integración de paneles retroiluminados.",
      icon: <LayoutTemplate size={28} strokeWidth={1.5} />
    },
    {
      title: "Armarios y Vestidores",
      desc: "Puertas escamoteables, correderas de gran formato y sistemas suspendidos sin carril inferior.",
      icon: <Archive size={28} strokeWidth={1.5} />
    },
    {
      title: "Sistemas de Baño",
      desc: "Vanities flotantes minimalistas y módulos mecanizados en compacto o Krion.",
      icon: <Layers size={28} strokeWidth={1.5} />
    },
    {
      title: "Divisiones Modulares",
      desc: "Celosías y librerías divisorias con anclaje a presión e iluminación magnética.",
      icon: <Grid size={28} strokeWidth={1.5} />
    }
  ];

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1100px", margin: "0 auto" }}>
      <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-accent)", marginBottom: "1rem", fontSize: "0.85rem" }}>
        Pilar de Servicio
      </motion.p>
      <motion.h1
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
        style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 4vw, 3rem)", marginBottom: "1rem" }}
      >
        Desarrollo de Soluciones
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "4rem", maxWidth: "700px" }}
      >
        Afrontamos retos en ingeniería de sistemas embebidos, herrajes de gama extra con extracción total y control de tolerancias técnicas. Lo que la arquitectura visualiza, nosotros lo mecanizamos.
      </motion.p>

      {/* Solutions Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "5rem" }}
      >
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            style={{ 
              padding: "2.5rem 2rem", 
              border: "1px solid var(--color-border)", 
              borderRadius: "8px", 
              background: "rgba(255,255,255,0.01)",
              transition: "all 0.3s ease",
            }}
            whileHover={{ borderColor: "var(--color-accent)", y: -4, background: "rgba(189,165,123,0.02)" } as any}
          >
            <div style={{ marginBottom: "1.5rem", color: "var(--color-accent)" }}>{s.icon}</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.8rem", fontFamily: "var(--font-serif)" }}>{s.title}</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Image Banner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ height: "450px", background: "var(--color-bg-dark)", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "4rem" }}
      >
        <img src="/img/company.jpg" alt="Desarrollo de Soluciones" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) contrast(1.1)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "#fff", maxWidth: "80%" }}>
          <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Ingeniería de Producción</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem" }}>Viabilidad sin compromisos</h2>
        </div>
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <Link
          href={`/${locale}/contacto`}
          style={{ 
             display: "inline-block", 
             padding: "1rem 2.5rem", 
             background: "var(--color-accent)", 
             color: "#fff", 
             borderRadius: "4px", 
             textTransform: "uppercase", 
             letterSpacing: "0.15em", 
             fontSize: "0.85rem", 
             fontWeight: 500, 
             textDecoration: "none",
             transition: "opacity 0.3s ease" 
          }}
          onMouseOver={(e) => e.currentTarget.style.opacity = "0.8"}
          onMouseOut={(e) => e.currentTarget.style.opacity = "1"}
        >
          Consultar Viabilidad Técnica
        </Link>
      </div>
    </div>
  );
}
