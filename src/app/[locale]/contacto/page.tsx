"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    client_type: "b2c"
  });
  const [status, setStatus] = useState("");
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");
    
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/leads`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });
      
      if (res.ok) {
        setStatus("Mensaje enviado con éxito. Nos pondremos en contacto pronto.");
        setFormData({ name: "", email: "", company: "", message: "", client_type: "b2c" });
      } else {
        setStatus("Hubo un error al enviar tu mensaje.");
      }
    } catch (error) {
      console.error(error);
      setStatus("Error de conexión con el servidor. (Verifica que FastAPI esté corriendo)");
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
        style={{ flex: 1, display: "none", position: "relative", overflow: "hidden" }}
        className="splitScreenImage"
      >
        <img 
          src="/img/imgservice.jpg" 
          alt="Proyecto de Alta Gama" 
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) contrast(1.1)" }} 
        />
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "#fff", maxWidth: "80%" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Ingeniería & Diseño</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>Iniciemos algo Extraordinario</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9 }}>Deje la precisión en nuestras manos. Cuéntenos los detalles fundamentales de su proyecto, y nuestro equipo técnico evaluará el caso en menos de 48 horas.</p>
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
          style={{ width: "100%", maxWidth: "500px" }}
        >
          <div style={{ marginBottom: "3rem" }}>
            <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "0.5rem" }}>
              Contacto Directo
            </h1>
            <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem" }}>
              Complete el siguiente formulario. Los campos marcados con (*) son obligatorios.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
              <label style={labelStyle}>Modalidad de Servicio *</label>
              <select 
                value={formData.client_type}
                onChange={(e) => setFormData({...formData, client_type: e.target.value})}
                onFocus={() => setFocusedField("client_type")}
                onBlur={() => setFocusedField(null)}
                style={inputStyle("client_type")}
              >
                <option value="b2c">Cliente Particular (Residencial)</option>
                <option value="interiorista">Estudio de Arquitectura / Interiorismo</option>
                <option value="b2b">Promotora / Constructora (B2B)</option>
              </select>
            </div>

            <div>
               <label style={labelStyle}>Nombre Completo *</label>
               <input 
                 required 
                 type="text" 
                 value={formData.name} 
                 onChange={(e) => setFormData({...formData, name: e.target.value})} 
                 onFocus={() => setFocusedField("name")}
                 onBlur={() => setFocusedField(null)}
                 placeholder="Ej. Laura Martínez" 
                 style={inputStyle("name")} 
               />
            </div>

            <div>
               <label style={labelStyle}>Email Profesional *</label>
               <input 
                 required 
                 type="email" 
                 value={formData.email} 
                 onChange={(e) => setFormData({...formData, email: e.target.value})} 
                 onFocus={() => setFocusedField("email")}
                 onBlur={() => setFocusedField(null)}
                 placeholder="ejemplo@dominio.com" 
                 style={inputStyle("email")} 
               />
            </div>

            {formData.client_type !== 'b2c' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}>
                 <label style={labelStyle}>Empresa / Estudio</label>
                 <input 
                   type="text" 
                   value={formData.company} 
                   onChange={(e) => setFormData({...formData, company: e.target.value})} 
                   onFocus={() => setFocusedField("company")}
                   onBlur={() => setFocusedField(null)}
                   placeholder="Nombre de la corporación" 
                   style={inputStyle("company")} 
                 />
              </motion.div>
            )}

            <div>
               <label style={labelStyle}>Detalle del Proyecto *</label>
               <textarea 
                 required 
                 rows={5} 
                 value={formData.message} 
                 onChange={(e) => setFormData({...formData, message: e.target.value})} 
                 onFocus={() => setFocusedField("message")}
                 onBlur={() => setFocusedField(null)}
                 placeholder="Cuéntenos acerca de los volúmenes, materiales deseados, ubicación y plazos estimados..." 
                 style={{...inputStyle("message"), resize: "vertical"}}
               ></textarea>
            </div>

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
              Enviar Solicitud
            </button>

            {status && (
              <motion.p 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem", color: status.includes("error") || status.includes("Error") ? "#ff6b6b" : "var(--color-accent)", padding: "1rem", border: `1px solid ${status.includes("error") || status.includes("Error") ? "#ff6b6b" : "var(--color-accent)"}`, borderRadius: "4px", background: "rgba(189,165,123,0.05)" }}
              >
                {status}
              </motion.p>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
}
