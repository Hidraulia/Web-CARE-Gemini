"use client";

import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Factory, PenTool, Sparkles, Settings } from "lucide-react";
import { useRef, useEffect, useState } from "react";

// Counter component for animated stats
function AnimatedCounter({ end, prefix = "", suffix = "" }: { end: number, prefix?: string, suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000; // ms
      const startTime = performance.now();
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // easeOutQuart
        const easeOut = 1 - Math.pow(1 - progress, 4);
        
        setCount(Math.floor(easeOut * end));
        
        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      requestAnimationFrame(animate);
    }
  }, [isInView, end]);

  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

export default function QuienesSomos({ params: { locale } }: { params: { locale: string } }) {
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
  };

  const pillars = [
    {
      title: "Solvencia Industrial B2B",
      desc: "Instalaciones con maquinaria de control numérico avanzada que garantizan entregas masivas sin comprometer la precisión milimétrica. Capacidad para proyectos de cualquier envergadura.",
      icon: <Settings size={32} strokeWidth={1.5} color="var(--color-accent)" />
    },
    {
      title: "Sensibilidad Interiorista",
      desc: "Trabajamos mano a mano con arquitectos para asegurar que la intención original del diseño se traduzca fielmente al producto final. Centro técnico CAD a su disposición.",
      icon: <PenTool size={32} strokeWidth={1.5} color="var(--color-accent)" />
    },
    {
      title: "Experiencia Residencial VIP",
      desc: "Acompañamiento personalizado desde el primer boceto hasta la instalación final. Un único interlocutor, cero subcontrataciones, trazabilidad total de su proyecto.",
      icon: <Sparkles size={32} strokeWidth={1.5} color="var(--color-accent)" />
    },
    {
      title: "Fabricación Propia",
      desc: "Control absoluto del proceso productivo. Desde la ingeniería de detalle hasta el canteado láser y el acabado superficial. Todo bajo un mismo techo, sin intermediarios.",
      icon: <Factory size={32} strokeWidth={1.5} color="var(--color-accent)" />
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section style={{ position: "relative", height: "60vh", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <img
          src="/img/imgservice2.jpg"
          alt="CARE Mobiliario — Quiénes Somos"
          loading="eager"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.3) saturate(0.8)" }}
        />
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ position: "relative", textAlign: "center", color: "#fff", padding: "2rem" }}
        >
          <p style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>
            Maison CARE
          </p>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2.5rem, 6vw, 5rem)", marginBottom: "1.5rem", fontWeight: 400 }}>
            Nuestra Esencia
          </h1>
          <p style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto", lineHeight: 1.7 }}>
            Artesanos contemporáneos de espacios con sólida base industrial. Nacimos de la necesidad 
            de combinar la delicadeza del interiorismo de autor con la solvencia técnica imprescindible en proyectos B2B.
          </p>
        </motion.div>
      </section>

      {/* Stats Bar */}
      <section style={{ background: "var(--color-bg-dark)", padding: "4rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          style={{ 
            maxWidth: "1000px", 
            margin: "0 auto", 
            display: "grid", 
            gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", 
            gap: "3rem", 
            textAlign: "center" 
          }}
        >
          <motion.div variants={fadeIn}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              <AnimatedCounter end={20} prefix="+" />
            </div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#a3a3a3", fontWeight: 500 }}>Años de experiencia</div>
          </motion.div>
          
          <motion.div variants={fadeIn}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              <AnimatedCounter end={500} prefix="+" />
            </div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#a3a3a3", fontWeight: 500 }}>Proyectos Entregados</div>
          </motion.div>

          <motion.div variants={fadeIn}>
            <div style={{ fontFamily: "var(--font-serif)", fontSize: "3.5rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>
              <AnimatedCounter end={100} suffix="%" />
            </div>
            <div style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "#a3a3a3", fontWeight: 500 }}>Fabricación Propia</div>
          </motion.div>
        </motion.div>
      </section>

      {/* Pillars */}
      <section style={{ padding: "8rem 2rem", maxWidth: "1200px", margin: "0 auto" }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={fadeIn}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Nuestras Fortalezas</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "3rem" }}>Los Pilares CARE</h2>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={stagger}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2.5rem" }}
        >
          {pillars.map((p, i) => (
            <motion.div
              key={i}
              variants={fadeIn}
              style={{
                padding: "3rem",
                border: "1px solid var(--color-border)",
                borderRadius: "8px",
                background: "rgba(255,255,255,0.01)",
                transition: "all 0.3s ease",
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-start"
              }}
              whileHover={{ borderColor: "var(--color-accent)", background: "rgba(189,165,123,0.02)", y: -6 } as any}
            >
              <div style={{ marginBottom: "1.5rem" }}>{p.icon}</div>
              <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", fontFamily: "var(--font-serif)", letterSpacing: "0.02em" }}>{p.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.7 }}>{p.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Image + texto de empresa */}
      <section style={{ background: "var(--color-bg-dark)", color: "#fff" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center" }}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ height: "600px", overflow: "hidden", display: "block" }}
            className="splitImage"
          >
            <img
              src="/img/company.jpg"
              alt="Instalaciones CARE"
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(0.1)" }}
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ padding: "4rem" }}
          >
            <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Instalaciones</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1.5rem" }}>Centro de Producción Propio</h2>
            <p style={{ fontSize: "1rem", opacity: 0.8, lineHeight: 1.8, marginBottom: "2.5rem" }}>
              Contamos con un centro de producción de última generación en el territorio nacional. Toda la cadena de valor — 
              diseño, corte CNC, canteado láser, lacado, ensamblaje e instalación — bajo un mismo techo.
              Esto nos permite garantizar calidad, precisión absoluta, plazos y una competitividad B2B inigualable.
            </p>
            <Link
              href={`/${locale}/servicios`}
              style={{
                display: "inline-block",
                padding: "1rem 2.5rem",
                border: "1px solid var(--color-accent)",
                color: "var(--color-accent)",
                textTransform: "uppercase",
                letterSpacing: "0.15em",
                fontSize: "0.85rem",
                borderRadius: "4px",
                textDecoration: "none",
                transition: "background 0.3s, color 0.3s"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.color = "#fff"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; }}
            >
              Ver Nuestras Capacidades Técnicas
            </Link>
          </motion.div>
          
          <style dangerouslySetInnerHTML={{__html: `
            @media (max-width: 1024px) {
              .splitImage { display: none !important; }
            }
          `}} />
        </div>
      </section>
    </>
  );
}
