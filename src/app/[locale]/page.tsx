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
            <img src="/images-slider/img-slide-3.jpg" alt="Mobiliario de Diseño" loading="eager" style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.4) contrast(1.1) saturate(0.8)'}} />
          </motion.div>
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
          <motion.h1 variants={fadeIn} style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 400, leadingTrim: "both", textEdge: "cap", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Intensidad Real. <br />
            Precisión Milimétrica.
          </motion.h1>
          <motion.p variants={fadeIn} style={{ fontSize: "1.1rem", opacity: 0.85, maxWidth: "600px", margin: "0 auto 3rem", lineHeight: 1.7 }}>
            Soluciones de fabricación a medida para empresas, arquitectos y clientes exigentes. Superamos los estándares del lujo industrial integrando tecnología y diseño de vanguardia.
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

      <section className={styles.section} style={{ padding: "8rem 2rem" }}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p className={styles.sectionSubtitle} style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Áreas de Experiencia</p>
          <h2 className={styles.sectionTitle} style={{ fontFamily: "var(--font-serif)", fontSize: "3rem" }}>Segmentos de Servicio</h2>
        </motion.div>

        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem", maxWidth: "1200px", margin: "0 auto" }}
        >
          {/* B2B Empresas */}
          <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "8px", cursor: "crosshair" }} className="hoverCard">
            <motion.div className="imgContainer" style={{ width: "100%", height: "100%", transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
              <img src="/img/company.jpg" alt="B2B Empresas" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
            </motion.div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}></div>
            <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Empresas & Promotoras</h3>
              <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Capacidad operativa, solvencia industrial industrializada y seguimiento integral de fabricación a gran escala.</p>
                <Link href={`/${locale}/auth/login?role=b2b`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Acceso Partners</Link>
              </div>
            </div>
          </motion.div>

          {/* Interioristas */}
          <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "8px", cursor: "crosshair" }} className="hoverCard">
            <motion.div className="imgContainer" style={{ width: "100%", height: "100%", transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
              <img src="/img/projects/img2.jpg" alt="Arquitectos" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
            </motion.div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}></div>
            <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Arquitectos & Diseño</h3>
              <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Colaboración técnica, centro de recursos CAD y profunda sensibilidad al detalle constructivo en cada plano.</p>
                <Link href={`/${locale}/auth/login?role=interiorista`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Centro Técnico</Link>
              </div>
            </div>
          </motion.div>

          {/* B2C Selectivo */}
          <motion.div variants={fadeIn} style={{ position: "relative", height: "450px", overflow: "hidden", borderRadius: "8px", cursor: "crosshair" }} className="hoverCard">
            <motion.div className="imgContainer" style={{ width: "100%", height: "100%", transition: "transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)" }}>
              <img src="/img/vestidor.jpg" alt="B2C" loading="lazy" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6)" }} />
            </motion.div>
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)" }}></div>
            <div style={{ position: "absolute", bottom: "0", left: "0", width: "100%", padding: "2.5rem", color: "#fff", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: "100%" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", marginBottom: "0.5rem" }}>Clientes B2C VIP</h3>
              <div className="cardDetails" style={{ maxHeight: "0", overflow: "hidden", opacity: 0, transition: "all 0.5s ease" }}>
                <p style={{ marginBottom: "1.5rem", fontSize: "0.95rem", opacity: 0.9, lineHeight: 1.6, paddingTop: "1rem" }}>Acompañamiento premium, personalización absoluta y seguimiento detallado de la instalación final en su hogar.</p>
                <Link href={`/${locale}/auth/login?role=b2c`} style={{ display: "inline-block", color: "var(--color-accent)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", borderBottom: "1px solid var(--color-accent)", paddingBottom: "2px", textDecoration: "none" }}>Área Cliente</Link>
              </div>
            </div>
          </motion.div>
          
          <style dangerouslySetInnerHTML={{__html: `
            .hoverCard:hover .imgContainer { transform: scale(1.05); }
            .hoverCard:hover .cardDetails { maxHeight: "200px"; opacity: 1; margin-top: "0"; }
            @media (pointer: coarse) {
              .cardDetails { maxHeight: "200px" !important; opacity: 1 !important; }
            }
          `}} />
        </motion.div>
      </section>

      <section className={styles.section} style={{ backgroundColor: 'var(--color-bg-dark)', color: '#fff', borderRadius: '4px', padding: "8rem 2rem" }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center', maxWidth: "1200px", margin: "0 auto" }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={staggerContainer}
            >
              <motion.p variants={fadeIn} style={{ textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "0.85rem", color: "var(--color-accent)", marginBottom: "1rem" }}>Excelencia Operativa</motion.p>
              <motion.h2 variants={fadeIn} className={styles.sectionTitle} style={{fontFamily: 'var(--font-serif)', fontSize: "2.5rem", marginBottom: "1.5rem"}}>Fabricación Propia Avanzada</motion.h2>
              <motion.p variants={fadeIn} style={{marginBottom: '2.5rem', fontSize: '1.05rem', opacity: 0.8, fontWeight: 300, lineHeight: 1.7}}>
                Controlamos todo el proceso end-to-end. Desde la ingeniería de detalle hasta el canteado láser y la instalación final con operarios propios formados en la casa madre. Nada se delega al azar.
              </motion.p>
              <motion.ul variants={fadeIn} style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1.2rem', opacity: 0.9 }}>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem"}}>
                  <span style={{ color: "var(--color-accent)"}}>❖</span> Control Numérico de Alta Precisión
                </li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem"}}>
                  <span style={{ color: "var(--color-accent)"}}>❖</span> Acabados Premium y Técnicas Exclusivas
                </li>
                <li style={{ paddingBottom: '0.8rem', display: "flex", alignItems: "center", gap: "1rem"}}>
                  <span style={{ color: "var(--color-accent)"}}>❖</span> Tiempos de Entrega Estrictamente Garantizados
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
