"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "b2b",
    empresa_nombre: "",
    especialidad: ""
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.detail || "Error al crear la cuenta.");
      } else {
        setSuccess("Cuenta creada con éxito. Redirigiendo al login...");
        setTimeout(() => {
          router.push("/es/auth/login");
        }, 2000);
      }
    } catch (err) {
      setError("Error de conexión. Intente más tarde.");
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
          src="/img/imgservice.jpg" 
          alt="Registro Exclusivo" 
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.6) saturate(0.8)" }} 
        />
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "#fff", maxWidth: "80%" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Partnership B2B</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>Únete a la Red CARE</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9 }}>Al crear tu cuenta obtendrás acceso a precios de profesional, documentación técnica, y seguimiento detallado de pedidos.</p>
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
              Alta Profesional
            </h1>
            <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem" }}>
              Rellena los datos para configurar tu perfil.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Tipo de Perfil *</label>
              <select 
                value={formData.role}
                onChange={(e) => setFormData({...formData, role: e.target.value})}
                onFocus={() => setFocusedField("role")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("role")}
              >
                <option value="b2b" style={{ background: "var(--color-bg)", color: "var(--color-text-main)" }}>Empresa / Promotora (B2B)</option>
                <option value="interiorista" style={{ background: "var(--color-bg)", color: "var(--color-text-main)" }}>Interiorista / Arquitecto</option>
              </select>
            </div>

            <div>
               <label htmlFor="email" style={labelStyle}>Email Profesional *</label>
               <input 
                 type="email" 
                 id="email" 
                 required 
                 value={formData.email}
                 onChange={(e) => setFormData({...formData, email: e.target.value})}
                 placeholder="ejemplo@care.es" 
                 onFocus={() => setFocusedField("email")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("email")} 
               />
            </div>

            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
               <label htmlFor="empresa" style={labelStyle}>
                 {formData.role === "b2b" ? "Nombre de la Empresa *" : "Estudio de Interiorismo (Opcional)"}
               </label>
               <input 
                 type="text" 
                 id="empresa" 
                 required={formData.role === "b2b"}
                 value={formData.empresa_nombre}
                 onChange={(e) => setFormData({...formData, empresa_nombre: e.target.value})}
                 placeholder="Razón Social" 
                 onFocus={() => setFocusedField("empresa")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("empresa")} 
               />
            </motion.div>

            {formData.role === "interiorista" && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                 <label htmlFor="especialidad" style={labelStyle}>Especialidad Principal *</label>
                 <input 
                   type="text" 
                   id="especialidad" 
                   required
                   value={formData.especialidad}
                   onChange={(e) => setFormData({...formData, especialidad: e.target.value})}
                   placeholder="Ej. Diseño Residencial, Retail..." 
                   onFocus={() => setFocusedField("especialidad")}
                   onBlur={() => setFocusedField(null)}
                   style={inputStyle("especialidad")} 
                 />
              </motion.div>
            )}

            <div>
               <label htmlFor="password" style={labelStyle}>Contraseña *</label>
               <input 
                 type="password" 
                 id="password" 
                 required 
                 value={formData.password}
                 onChange={(e) => setFormData({...formData, password: e.target.value})}
                 placeholder="••••••••" 
                 onFocus={() => setFocusedField("password")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("password")} 
               />
               <p style={{ fontSize: "0.7rem", marginTop: "0.5rem", color: "var(--color-text-light)" }}>
                 Por política de seguridad, se te pedirá cambiarla en el primer inicio de sesión.
               </p>
            </div>

            {error && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ color: "#ff6b6b", fontSize: "0.9rem", textAlign: "center", padding: "0.8rem", background: "rgba(255, 107, 107, 0.1)", borderRadius: "4px", border: "1px solid rgba(255, 107, 107, 0.2)" }}
              >
                {error}
              </motion.p>
            )}

            {success && (
              <motion.p 
                initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ color: "var(--color-accent)", fontSize: "0.9rem", textAlign: "center", padding: "0.8rem", background: "rgba(189,165,123, 0.1)", borderRadius: "4px", border: "1px solid var(--color-accent)" }}
              >
                {success}
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
              Crear Cuenta
            </button>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <a href="/es/auth/login" style={{ fontSize: "0.85rem", color: "var(--color-text-light)", textDecoration: "none", transition: "color 0.3s ease" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--color-accent)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-light)"}>
                ¿Ya tienes una cuenta? <span style={{ color: "var(--color-accent)" }}>Iniciar Sesión</span>
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
