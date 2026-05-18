"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import Logo from "@/components/Logo";

export default function Header({ locale }: { locale: string }) {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const isLoggedIn = status === "authenticated";
  
  // Ocultar Header global en el área privada para ceder protagonismo a la Sidebar
  if (pathname.includes("/privado")) {
    return null;
  }
  
  let privateLink = `/${locale}/auth/login`;
  if (isLoggedIn) {
    const role = (session?.user?.role || "").toLowerCase();
    if (role === "b2b" || role === "empresa") privateLink = `/${locale}/privado/empresa`;
    else if (role === "b2c" || role === "vip" || role === "residencial") privateLink = `/${locale}/privado/vip`;
    else if (role === "interiorista" || role === "pro" || role === "profesional") privateLink = `/${locale}/privado/interiorista`;
    else privateLink = `/${locale}/privado`;
  }

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
          padding: '1.5rem 2rem', 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          background: '#000000',
          borderBottom: '1px solid rgba(255,255,255,0.1)'
        }}
      >
        <div>
          <Logo locale={locale} />
        </div>
        
        {/* Desktop Nav */}
        <nav className="desktop-nav" style={{ display: 'none', gap: '2.5rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', alignItems: 'center' }}>
          {navLinks.map((link, i) => (
            <Link key={i} href={link.url} style={{ position: "relative", paddingBottom: "2px", textDecoration: "none" }} className="hover-underline">
              {link.name}
            </Link>
          ))}
          {isLoggedIn ? (
            <button onClick={() => window.location.href = privateLink} style={{ background: "transparent", border: "none", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", padding: 0, fontSize: "0.8rem" }} className="hover-underline">
              MI CUENTA
            </button>
          ) : (
            <Link href={privateLink} style={{ color: 'inherit' }} className="hover-underline">
              ÁREA PRIVADA
            </Link>
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
          .hover-underline {
            color: #FFFFFF;
            transition: color 0.4s ease;
          }
          .hover-underline:hover {
            color: var(--color-accent) !important;
          }
          .hover-underline::after {
            content: '';
            position: absolute;
            width: 100%;
            transform: scaleX(0);
            height: 1px;
            bottom: 0;
            left: 0;
            background-color: var(--color-accent);
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
              <Logo locale={locale} />
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
              {isLoggedIn ? (
                <button onClick={() => { setMobileMenuOpen(false); window.location.href = privateLink; }} style={{ background: "transparent", border: "none", color: "var(--color-accent)", textTransform: "uppercase", letterSpacing: "0.1em", cursor: "pointer", padding: "0 0 1rem 0", fontSize: "1.2rem", textAlign: "left", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  MI CUENTA
                </button>
              ) : (
                <Link href={privateLink} onClick={() => setMobileMenuOpen(false)} style={{ color: 'inherit', borderBottom: "1px solid rgba(255,255,255,0.05)", paddingBottom: "1rem" }}>
                  ÁREA PRIVADA
                </Link>
              )}

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
