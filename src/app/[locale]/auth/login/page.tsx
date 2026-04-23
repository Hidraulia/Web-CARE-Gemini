"use client";

import { motion } from "framer-motion";
import { loginAction } from "./actions";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  const inputStyle = (fieldName: string) => ({
    width: "100%",
    padding: "1.2rem",
    borderRadius: "4px",
    border: focusedField === fieldName ? "1px solid var(--color-accent)" : "1px solid var(--color-border)",
    background: focusedField === fieldName ? "rgba(189,165,123,0.02)" : "var(--color-bg)",
    color: "var(--color-text-main)",
    outline: "none",
    transition: "all 0.3s ease",
    fontSize: "0.95rem"
  });

  const labelStyle = { 
    display: "block", 
    marginBottom: "0.5rem", 
    fontSize: "0.75rem", 
    textTransform: "uppercase" as const, 
    letterSpacing: "0.1em",
    color: "var(--color-text-light)" 
  };

  return (
    <div style={{ display: "flex", minHeight: "calc(100vh - 80px)", width: "100%" }}>
      {/* Split Image Side (Left) */}
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1 }}
        style={{ flex: 1, display: "none", position: "relative", overflow: "hidden", background: "var(--color-bg-dark)" }}
        className="splitScreenImage"
      >
        <img 
          src="/img/vestidor.jpg" 
          alt="Alta Costura en Mobiliario" 
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} 
        />
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "#fff", maxWidth: "80%" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Acceso Exclusivo</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>Precisión Transparente</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9 }}>Supervise el avance de su proyecto o acceda a la biblioteca de recursos técnicos desde su panel de gestión privado.</p>
        </div>
        <style dangerouslySetInnerHTML={{__html: `
          @media (min-width: 1024px) {
            .splitScreenImage { display: block !important; }
          }
        `}} />
      </motion.div>

      {/* Split Form Side (Right) */}
      <div style={{ flex: 1, padding: "4rem 2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", background: "var(--color-bg)" }}>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ width: "100%", maxWidth: "450px" }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              Área Privada
            </h1>
            <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem" }}>
              Suministre sus credenciales para acceder a su panel.
            </p>
          </div>

          <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
               <label htmlFor="email" style={labelStyle}>Identificador Corporativo / Email</label>
               <input 
                 type="email" 
                 id="email" 
                 name="email" 
                 required 
                 placeholder="ejemplo@care.es" 
                 onFocus={() => setFocusedField("email")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("email")} 
               />
            </div>

            <div>
               <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
                 <label htmlFor="password" style={{...labelStyle, marginBottom: 0}}>Contraseña de Acceso</label>
                 <a href="#" style={{ fontSize: "0.75rem", color: "var(--color-accent)", textDecoration: "none" }}>¿Problemas de acceso?</a>
               </div>
               <input 
                 type="password" 
                 id="password" 
                 name="password" 
                 required 
                 placeholder="••••••••" 
                 onFocus={() => setFocusedField("password")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("password")} 
               />
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ color: "#ff6b6b", fontSize: "0.9rem", textAlign: "center", padding: "0.8rem", background: "rgba(255, 107, 107, 0.1)", borderRadius: "4px", border: "1px solid rgba(255, 107, 107, 0.2)" }}
              >
                {error}
              </motion.p>
            )}

            <button 
              type="submit" 
              style={{ 
                marginTop: "1rem", 
                backgroundColor: "var(--color-accent)", 
                color: "#fff", 
                padding: "1.2rem", 
                border: "1px solid var(--color-accent)", 
                cursor: "pointer", 
                fontSize: "0.9rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.15em", 
                fontWeight: 600, 
                borderRadius: "4px",
                transition: "all 0.3s ease"
              }}
              onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; }}
              onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.color = "#fff"; }}
            >
              Autenticar
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
