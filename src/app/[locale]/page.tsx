"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";
// For prototype without real next/image config yet, we can use standard img tags or next/image with unoptimized if needed.
import Image from "next/image";

export default function Home({ params: { locale } }: { params: { locale: string } }) {
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
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
      <section className={styles.hero}>
        <motion.div 
          className={styles.heroBackground}
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, ease: "linear" }}
        >
          <div className={styles.imageWrapper}>
             <img src="/images-slider/img-slide-3.jpg" alt="Mobiliario de Diseño" style={{width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.5) contrast(1.1) saturate(0.8)'}} />
          </div>
        </motion.div>
        
        <motion.div 
          className={styles.heroContent}
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
        >
          <motion.h1 variants={fadeIn}>
            Intensidad Real. <br />
            Precisión Milimétrica.
          </motion.h1>
          <motion.p variants={fadeIn}>
            Soluciones de fabricación a medida para empresas, arquitectos y clientes exigentes. Superamos los estándares del lujo industrial.
          </motion.p>
          <motion.button variants={fadeIn} className={styles.ctaButton}>
            Descubra el Método CARE
          </motion.button>
        </motion.div>
      </section>

      <section className={styles.section}>
        <motion.div 
          className={styles.sectionHeader}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeIn}
        >
          <p className={styles.sectionSubtitle}>Nuestras Áreas de Experiencia</p>
          <h2 className={styles.sectionTitle}>Segmentos de Servicio</h2>
        </motion.div>

        <motion.div 
          className={styles.grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
        >
          {/* B2B Empresas */}
          <motion.div className={styles.card} variants={fadeIn}>
            <img src="/img/company.jpg" alt="B2B" className={styles.cardImage} />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>Empresas & Promotoras</h3>
              <p style={{marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.9}}>Capacidad operativa, solvencia industrial y seguimiento de fabricación a gran escala.</p>
              <a href={`/${locale}/auth/login?role=b2b`} className={styles.cardLink}>Acceso Partners</a>
            </div>
          </motion.div>

          {/* Interioristas */}
          <motion.div className={styles.card} variants={fadeIn}>
            <img src="/img/projects/img2.jpg" alt="Arquitectos" className={styles.cardImage} />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>Arquitectos & Diseño</h3>
              <p style={{marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.9}}>Colaboración técnica, centro de recursos CAD y sensibilidad al detalle constructivo.</p>
              <a href={`/${locale}/auth/login?role=interiorista`} className={styles.cardLink}>Centro Técnico</a>
            </div>
          </motion.div>

          {/* B2C Selectivo */}
          <motion.div className={styles.card} variants={fadeIn}>
            <img src="/img/vestidor.jpg" alt="B2C" className={styles.cardImage} />
            <div className={styles.cardOverlay}>
              <h3 className={styles.cardTitle}>Clientes B2C VIP</h3>
              <p style={{marginBottom: "1rem", fontSize: "0.9rem", opacity: 0.9}}>Acompañamiento premium, personalización absoluta y seguimiento de su proyecto.</p>
              <a href={`/${locale}/auth/login?role=b2c`} className={styles.cardLink}>Área Cliente</a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Another section showing production intensity */}
      <section className={styles.section} style={{ backgroundColor: 'var(--color-bg-dark)', color: '#fff', borderRadius: '4px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeIn}
            >
              <h2 className={styles.sectionTitle} style={{fontFamily: 'var(--font-serif)'}}>Fabricación Propia Avanzada</h2>
              <p style={{marginBottom: '2rem', fontSize: '1.1rem', opacity: 0.8, fontWeight: 300}}>
                Controlamos todo el proceso. Desde la ingeniería de detalle hasta el canteado láser y la instalación final con operarios propios. Nada se delega al azar.
              </p>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '1rem', opacity: 0.9 }}>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>✓ Control Numérico de Alta Precisión</li>
                <li style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem'}}>✓ Acabados Premium y Técnicas Exclusivas</li>
                <li style={{ paddingBottom: '0.5rem'}}>✓ Tiempos de Entrega Garantizados</li>
              </ul>
            </motion.div>
            
            <motion.div
               initial={{ opacity: 0, x: 50 }}
               whileInView={{ opacity: 1, x: 0 }}
               transition={{ duration: 0.8 }}
               viewport={{ once: true }}
               style={{ position: 'relative', height: '500px', borderRadius: '4px', overflow: 'hidden' }}
            >
               <img src="/img/imgservice.jpg" alt="Fábrica" style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(0.3) contrast(1.1)' }} />
               <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(45deg, rgba(0,0,0,0.4), transparent)' }}></div>
            </motion.div>
          </div>
      </section>
    </>
  );
}
