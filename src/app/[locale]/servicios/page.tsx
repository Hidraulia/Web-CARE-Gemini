"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function Servicios({ params: { locale } }: { params: { locale: string } }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  const services = [
    {
      title: "Diseño Técnico",
      url: "diseno-tecnico",
      desc: "Traducción de ideas arquitectónicas a planos de ejecución y milimetraje preciso.",
      img: "/img/projects/img2.jpg"
    },
    {
      title: "Fabricación a medida",
      url: "fabricacion-a-medida",
      desc: "Materiales de la más alta calidad y tecnología avanzada al servicio de la comodidad y el espacio.",
      img: "/img/imgservice.jpg"
    },
    {
      title: "Desarrollo de Soluciones",
      url: "desarrollo-de-soluciones",
      desc: "Resolución de retos complejos. Formas y volúmenes no vistos hasta ahora.",
      img: "/img/company.jpg"
    },
    {
      title: "Logística e Instalación",
      url: "logistica-e-instalacion",
      desc: "Servicio de transporte y montaje realizado por profesionales que garantizan un servicio rápido y limpio.",
      img: "/images-slider/img-slide-3.jpg"
    },
    {
      title: "Ejecución Integral",
      url: "ejecucion-integral",
      desc: "Ofrecemos un servicio global llave en mano. Adaptación del producto al espacio existente con un aprovechamiento máximo.",
      img: "/img/vestidor.jpg"
    }
  ];

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <motion.div initial="hidden" animate="visible" variants={staggerContainer} style={{ textAlign: "center", marginBottom: "4rem" }}>
        <motion.h1 variants={fadeIn} style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", marginBottom: "1rem" }}>
          Nuestros Servicios
        </motion.h1>
        <motion.p variants={fadeIn} style={{ fontSize: "1.2rem", color: "var(--color-text-light)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.6 }}>
          Directamente de fábrica, sin distribuidores, ofrecemos una amplia gama de diseños y acabados ajustándonos a las necesidades técnicas con la mejor relación calidad-precio.
        </motion.p>
      </motion.div>

      <motion.div 
        initial="hidden" 
        whileInView="visible" 
        viewport={{ once: true, margin: "-50px" }} 
        variants={staggerContainer}
        style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}
      >
        {services.map((srv, index) => (
          <motion.div key={index} variants={fadeIn} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "200px", position: "relative" }}>
              <img src={srv.img} alt={srv.title} loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.8 }} />
            </div>
            <div style={{ padding: "2rem", flexGrow: 1, display: "flex", flexDirection: "column" }}>
              <h3 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>{srv.title}</h3>
              <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem", lineHeight: 1.5, marginBottom: "2rem", flexGrow: 1 }}>{srv.desc}</p>
              <Link href={`/${locale}/servicios/${srv.url}`} style={{ color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.85rem", letterSpacing: "0.1em", fontWeight: 500, textDecoration: "none" }}>
                Ver Detalles →
              </Link>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
