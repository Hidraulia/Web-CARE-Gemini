"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 1000], [0, 300]);

  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  return (
    <>
      <section className={styles.hero} style={{ overflow: "hidden", position: "relative" }}>
        <motion.div
          className={styles.heroBackground}
          style={{ y: y1 }}
        >
          <motion.div
            initial={{ scale: 1.15 }}
            animate={{ scale: 1 }}
            transition={{ duration: 12, ease: "easeOut" }}
            style={{ width: "100%", height: "100%" }}
          >
            <video 
              src="/videos/care-factory.mp4" 
              autoPlay 
              muted 
              loop 
              playsInline 
              controls={false} 
              style={{ width: "100%", height: "100%", objectFit: "cover" }} 
            />
          </motion.div>
          <div style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", background: "rgba(0,0,0,0.5)", zIndex: 1 }}></div>
        </motion.div>

        <motion.div
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.p variants={fadeIn} style={{ textTransform: "uppercase", letterSpacing: "0.2em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>
            Maison CARE
          </motion.p>
          <motion.h1 variants={fadeIn} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(2rem, 3.5vw, 3rem)", fontWeight: 400, lineHeight: 1.3, marginBottom: "1.5rem", letterSpacing: "0.02em", maxWidth: "850px", margin: "0 auto 1.5rem" }}>
            Mobiliario de autor diseñado para perdurar, <br />
            fabricado para exigir.
          </motion.h1>
          <motion.p variants={fadeIn} style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "850px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Nuestro Modelo 360º elimina los límites entre la imaginación y la ejecución final. Centralizamos toda la carpintería técnica y mobiliario a través de un Project Manager (Interlocutor Único) para maximizar la rentabilidad de su proyecto sin comprometer la excelencia.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link href={`/${locale}/quienes-somos`}>
              <button
                className={styles.ctaButton}
                style={{
                  padding: "1rem 2.5rem",
                  background: "transparent",
                  border: "1px solid var(--color-accent)",
                  color: "var(--color-accent)",
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                  transition: "all 0.3s ease"
                }}
                onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.color = "#fff"; }}
                onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; }}
              >
                Descubra el Método CARE
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </section>

      <section style={{ width: "100%", padding: "8rem 0", background: "#000000", color: "#FFFFFF", margin: 0 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            className={styles.sectionHeader}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <p className={styles.sectionSubtitle} style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Áreas de Experiencia</p>
            <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", color: "#FFFFFF" }}>Segmentos de Servicio</h2>
          </motion.div>

          <motion.div
            className={styles.grid}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}
          >
            {/* Contract */}
            <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "6px", border: "1px solid rgba(189,165,123,0.15)", cursor: "crosshair" }} className="hoverCard">
              <motion.div className="imgContainer" style={{ width: "100%", height: "100%" }}>
                <video src="/videos/Contract.mp4" autoPlay muted loop playsInline controls={false} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              </motion.div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}></div>
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                <h3 className="cardTitle" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.25rem", transition: "color 0.4s ease" }}>Contract</h3>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>PROMOTORES & GRANDES CUENTAS</p>
                <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                  <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Fabricación a gran escala y seguimiento integral para proyectos de gran volumen.</p>
                  <Link href={`/${locale}/auth/login?role=b2b`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Acceso Partners</Link>
                </div>
              </div>
            </motion.div>

            {/* Arquitectos */}
            <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "6px", border: "1px solid rgba(189,165,123,0.15)", cursor: "crosshair" }} className="hoverCard">
              <motion.div className="imgContainer" style={{ width: "100%", height: "100%" }}>
                <video src="/videos/Arquitectos.mp4" autoPlay muted loop playsInline controls={false} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              </motion.div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}></div>
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                <h3 className="cardTitle" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.25rem", transition: "color 0.4s ease" }}>Arquitectos</h3>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>PROYECTOS DE FIRMA</p>
                <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                  <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Colaboración técnica y sensibilidad al detalle constructivo en cada plano.</p>
                  <Link href={`/${locale}/auth/login?role=interiorista`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Centro Técnico</Link>
                </div>
              </div>
            </motion.div>

            {/* Reformistas */}
            <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "6px", border: "1px solid rgba(189,165,123,0.15)", cursor: "crosshair" }} className="hoverCard">
              <motion.div className="imgContainer" style={{ width: "100%", height: "100%" }}>
                <video src="/videos/Reformistas.mp4" autoPlay muted loop playsInline controls={false} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              </motion.div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}></div>
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                <h3 className="cardTitle" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.25rem", transition: "color 0.4s ease" }}>Reformistas</h3>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>CARPINTERÍA ESTRUCTURAL</p>
                <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                  <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Suministro y pre-montaje garantizando tiempos de entrega estrictos.</p>
                  <Link href={`/${locale}/auth/login?role=b2b`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Área Profesional</Link>
                </div>
              </div>
            </motion.div>

            {/* Interioristas */}
            <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "6px", border: "1px solid rgba(189,165,123,0.15)", cursor: "crosshair" }} className="hoverCard">
              <motion.div className="imgContainer" style={{ width: "100%", height: "100%" }}>
                <video src="/videos/Interioristas.mp4" autoPlay muted loop playsInline controls={false} style={{ width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              </motion.div>
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }}></div>
              <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
                <h3 className="cardTitle" style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.25rem", transition: "color 0.4s ease" }}>Interioristas</h3>
                <p style={{ fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.15em", color: "rgba(255,255,255,0.8)" }}>ESPACIOS DE AUTOR</p>
                <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                  <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Acompañamiento premium y personalización absoluta en acabados.</p>
                  <Link href={`/${locale}/auth/login?role=interiorista`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Centro de Diseño</Link>
                </div>
              </div>
            </motion.div>

            <style dangerouslySetInnerHTML={{
              __html: `
              .hoverCard video { transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1); }
              .hoverCard:hover video { transform: scale(1.06); }
              .hoverCard:hover .cardTitle { color: var(--color-accent) !important; }
              .hoverCard:hover .cardDetails { maxHeight: "200px"; opacity: 1; margin-top: "0"; }
              @media (pointer: coarse) {
                .cardDetails { maxHeight: "200px" !important; opacity: 1 !important; }
              }
            `}} />
          </motion.div>
        </div>
      </section>

      <section style={{ width: "100%", padding: "8rem 0", background: "#000000", color: "#FFFFFF", margin: 0 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            style={{ textAlign: "center", marginBottom: "5rem" }}
          >
            <p style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Ingeniería de Excelencia</p>
            <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", color: "#FFFFFF", letterSpacing: "0.02em" }}>Flujo Técnico Integral</h2>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "relative", flexWrap: "wrap", gap: "2rem" }}
          >
            {/* Timeline Line */}
            <div style={{ position: "absolute", top: "24px", left: "0", width: "100%", height: "1px", background: "rgba(189,165,123,0.5)", zIndex: 0, display: "none" }} className="desktop-timeline-line"></div>

            {[
              { num: "01", title: "Análisis", desc: "Estudio de viabilidad" },
              { num: "02", title: "Propuesta", desc: "Diseño y presupuesto" },
              { num: "03", title: "Desarrollo", desc: "Ingeniería de detalle" },
              { num: "04", title: "Medición", desc: "Toma de datos y pedido" },
              { num: "05", title: "Fabricación", desc: "Producción CNC propia" },
              { num: "06", title: "Instalación", desc: "Montaje con equipo propio" }
            ].map((step, idx) => (
              <motion.div key={idx} variants={fadeIn} style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", flex: "1 1 120px" }}>
                <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "#000000", border: "1px solid var(--color-accent)", marginBottom: "1.5rem", position: "relative" }}>
                  <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "4px", height: "4px", borderRadius: "50%", background: "var(--color-accent)" }}></div>
                </div>
                <h4 style={{ fontSize: "1.2rem", fontFamily: "var(--font-serif)", color: "#FFFFFF", marginBottom: "0.5rem" }}><span style={{ color: "var(--color-accent)", fontSize: "0.8rem", verticalAlign: "top" }}>{step.num}</span> {step.title}</h4>
                <p style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.6)", textTransform: "uppercase", letterSpacing: "0.05em" }}>{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
          <style dangerouslySetInnerHTML={{ __html: `
            @media (min-width: 768px) {
              .desktop-timeline-line { display: block !important; }
            }
          `}} />
        </div>
      </section>

      <section style={{ width: "100%", padding: "8rem 0", backgroundColor: '#000000', color: '#FFFFFF', margin: 0 }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 2rem", display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            <motion.p variants={fadeIn} style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Excelencia Operativa</motion.p>
            <motion.h2 variants={fadeIn} className={styles.sectionTitle} style={{ fontFamily: 'var(--font-serif)', fontSize: "2.5rem", marginBottom: "1.5rem", color: "#FFFFFF" }}>Fabricación Propia Avanzada</motion.h2>
            <motion.p variants={fadeIn} style={{ marginBottom: '2.5rem', fontSize: '1.05rem', color: "#CCCCCC", fontWeight: 400, lineHeight: 1.7 }}>
              Controlamos todo el proceso end-to-end. Desde la ingeniería de detalle hasta el canteado láser y la instalación final con operarios propios formados en la casa madre. Nada se delega al azar.
            </motion.p>
            <motion.ul variants={fadeIn} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', color: "#FFFFFF" }}>
              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "var(--color-accent)" }}>❖</span> Control Numérico de Alta Precisión
              </li>
              <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "var(--color-accent)" }}>❖</span> Acabados Premium y Técnicas Exclusivas
              </li>
              <li style={{ paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem" }}>
                <span style={{ color: "var(--color-accent)" }}>❖</span> Tiempos de Entrega Estrictamente Garantizados
              </li>
            </motion.ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            style={{ position: 'relative', height: '600px', borderRadius: '8px', overflow: 'hidden' }}
          >
            <img src="/img/imgservice.jpg" alt="Fábrica" loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.1) contrast(1.1)' }} />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(0,0,0,0.2), transparent)' }}></div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
