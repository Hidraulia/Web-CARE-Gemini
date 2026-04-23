"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { logoutAction } from "@/app/[locale]/auth/login/actions";

export default function Header({ locale, isLoggedIn, privateLink }: { locale: string, isLoggedIn: boolean, privateLink: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Maison", url: `/${locale}/quienes-somos` },
    { name: "Servicios", url: `/${locale}/servicios` },
    { name: "Contacto", url: `/${locale}/contacto` }
  ];

  return (
    <>
      <header 
        style={{ 
          position: 'fixed', 
          top: 0, 
          width: '100%', 
          zIndex: 100, 
          padding: scrolled ? '1rem 2rem' : '1.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          transition: 'all 0.3s ease',
          background: scrolled ? 'var(--color-glass)' : 'transparent',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid var(--color-border)' : '1px solid transparent'
        }}
      >
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>
          <Link href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>CARE</Link>
        </div>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'none', gap: '2.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <Link key={i} href={link.url} style={{ position: "relative", paddingBottom: "2px", textDecoration: "none" }} className="hover-underline">
              {link.name}
            </Link>
          ))}
          <Link href={privateLink} style={{ color: isLoggedIn ? 'var(--color-accent)' : 'inherit' }}>
            {isLoggedIn ? "Mi Cuenta" : "Área Privada"}
          </Link>
          {isLoggedIn && (
             <form action={logoutAction}>
               <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: 'var(--color-text-light)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem', textTransform: "uppercase", letterSpacing: "0.1em" }}>
                 SALIR
               </button>
             </form>
          )}
        </nav>

        {/* Mobile Toggle */}
        <div className="mobile-toggle" style={{ display: 'block', cursor: 'pointer' }} onClick={() => setMobileMenuOpen(true)}>
          <Menu size={24} />
        </div>

        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 768px) {
            .desktop-nav { display: flex !important; }
            .mobile-toggle { display: none !important; }
          }
          .hover-underline::after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: currentColor;
            transform-origin: bottom right;
            transition: transform 0.25s ease-out;
          }
          .hover-underline:hover::after {
            transform: scaleX(1);
            transform-origin: bottom left;
          }
        `}} />
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              maxWidth: "400px",
              background: "var(--color-bg-dark)",
              zIndex: 1000,
              padding: "2rem",
              display: "flex",
              flexDirection: "column",
              borderLeft: "1px solid var(--color-border)"
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3rem" }}>
              <span style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>CARE</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer" }}>
                <X size={32} />
              </button>
            </div>
            
            <nav style={{ display: "flex", flexDirection: "column", gap: "2rem", fontSize: "1.2rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>
              {navLinks.map((link, i) => (
                <Link key={i} href={link.url} onClick={() => setMobileMenuOpen(false)} style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>
                  {link.name}
                </Link>
              ))}
              <Link href={privateLink} onClick={() => setMobileMenuOpen(false)} style={{ color: isLoggedIn ? 'var(--color-accent)' : 'inherit', borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>
                {isLoggedIn ? "Mi Cuenta" : "Área Privada"}
              </Link>
              {isLoggedIn && (
                <form action={logoutAction}>
                  <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '1rem', color: 'var(--color-text-light)', textAlign: "left", padding: 0, textTransform: "uppercase", letterSpacing: "0.1em" }}>
                    Cerrar Sesión
                  </button>
                </form>
              )}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
