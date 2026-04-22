"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function DesarrolloSoluciones({ params: { locale } }: { params: { locale: string } }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const solutions = [
    {
      title: "Cocinas de Diseño",
      desc: "Sistemas de apertura inteligente, perfil sin tirador, integración de electrodomésticos y campanas ocultas.",
      icon: "🍳"
    },
    {
      title: "Armarios y Vestidores",
      desc: "Puertas escamoteables, correderas, abatibles y suspendidas. Soluciones a medida para techos inclinados o espacios irregulares.",
      icon: "🪞"
    },
    {
      title: "Baños y Sanitarios",
      desc: "Muebles de baño lacados, vanities flotantes y cajoneras con herrajes de extracción silenciosa Blum o Häfele.",
      icon: "🛁"
    },
    {
      title: "Divisiones y Librerías",
      desc: "Módulos estructurales personalizados para separar ambientes, librerías a medida con iluminación integrada.",
      icon: "📚"
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
        Desarrollo de Soluciones
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
        style={{ fontSize: "1.1rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "3rem", maxWidth: "700px" }}
      >
        Incluso si no tiene un boceto listo de lo que quiere, le ayudamos a obtener el resultado que soñó. Afrontamos retos en ingeniería de sistemas embebidos, herrajes invisibles y control de procesos en espacios reducidos.
      </motion.p>

      {/* Solutions Grid */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15 } } }}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1.5rem", marginBottom: "4rem" }}
      >
        {solutions.map((s, i) => (
          <motion.div
            key={i}
            variants={fadeIn}
            style={{ padding: "2rem", border: "1px solid var(--color-border)", borderRadius: "8px", background: "rgba(255,255,255,0.02)" }}
            whileHover={{ borderColor: "var(--color-accent)", y: -4 } as any}
          >
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>{s.icon}</div>
            <h3 style={{ fontSize: "1.1rem", marginBottom: "0.8rem", color: "var(--color-accent)" }}>{s.title}</h3>
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
        style={{ height: "450px", background: "var(--color-bg-dark)", borderRadius: "8px", overflow: "hidden", position: "relative", marginBottom: "3rem" }}
      >
        <img src="/img/company.jpg" alt="Desarrollo de Soluciones" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)" }} />
        <div style={{ position: "absolute", bottom: "2rem", left: "2rem", color: "#fff" }}>
          <p style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Nuestro enfoque</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem" }}>Ingeniería al servicio del diseño</h2>
        </div>
      </motion.div>

      <div style={{ textAlign: "center" }}>
        <Link
          href={`/${locale}/contacto`}
          style={{ display: "inline-block", padding: "1rem 2.5rem", background: "var(--color-accent)", color: "#fff", borderRadius: "4px", textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.9rem", fontWeight: 500, textDecoration: "none" }}
        >
          Cuéntanos tu Proyecto
        </Link>
      </div>
    </div>
  );
}
