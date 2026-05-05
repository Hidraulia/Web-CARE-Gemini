"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getSession } from "next-auth/react";
import { logoutAction } from "../login/actions";

export default function ChangePassword() {
  const router = useRouter();
  
  const [session, setSession] = useState<any>(null);
  const [status, setStatus] = useState("loading");
  
  const [formData, setFormData] = useState({
    current_password: "",
    new_password: "",
    confirm_password: ""
  });
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  useEffect(() => {
    getSession().then((sess) => {
      if (!sess) {
        setStatus("unauthenticated");
        router.push("/es/auth/login");
      } else {
        setSession(sess);
        setStatus("authenticated");
      }
    });
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    
    if (formData.new_password !== formData.confirm_password) {
      setError("Las contraseñas nuevas no coinciden.");
      return;
    }

    if (formData.new_password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    
    if (!session?.user?.email) {
      setError("Sesión inválida.");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const res = await fetch(`${API_URL}/api/auth/change-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: session.user.email,
          current_password: formData.current_password,
          new_password: formData.new_password
        })
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        setError(data.detail || "Error al actualizar la contraseña.");
      } else {
        setSuccess("Contraseña actualizada con éxito. Por favor, vuelve a iniciar sesión.");
        setTimeout(async () => {
          await logoutAction();
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

  if (status === "loading") {
    return <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>Cargando...</div>;
  }

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
          alt="Seguridad de Cuenta" 
          loading="eager"
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.5) saturate(0.8)" }} 
        />
        <div style={{ position: "absolute", bottom: "3rem", left: "3rem", color: "#fff", maxWidth: "80%" }}>
          <p style={{ textTransform: "uppercase", letterSpacing: "0.1em", fontSize: "0.8rem", color: "var(--color-accent)", marginBottom: "0.5rem" }}>Seguridad</p>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "1rem" }}>Acceso Seguro</h2>
          <p style={{ fontSize: "0.95rem", lineHeight: 1.6, opacity: 0.9 }}>Para garantizar la privacidad de sus proyectos, es obligatorio establecer una contraseña definitiva.</p>
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
              Configurar Contraseña
            </h1>
            <p style={{ color: "var(--color-text-light)", fontSize: "0.95rem" }}>
              Hola {session?.user?.email}. Has accedido con una contraseña temporal. Configura tu acceso definitivo.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            <div>
               <label htmlFor="current_password" style={labelStyle}>Contraseña Actual</label>
               <input 
                 type="password" 
                 id="current_password" 
                 required 
                 value={formData.current_password}
                 onChange={(e) => setFormData({...formData, current_password: e.target.value})}
                 placeholder="••••••••" 
                 onFocus={() => setFocusedField("current_password")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("current_password")} 
               />
            </div>

            <div>
               <label htmlFor="new_password" style={labelStyle}>Nueva Contraseña</label>
               <input 
                 type="password" 
                 id="new_password" 
                 required 
                 value={formData.new_password}
                 onChange={(e) => setFormData({...formData, new_password: e.target.value})}
                 placeholder="Mínimo 6 caracteres" 
                 onFocus={() => setFocusedField("new_password")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("new_password")} 
               />
            </div>
            
            <div>
               <label htmlFor="confirm_password" style={labelStyle}>Repetir Nueva Contraseña</label>
               <input 
                 type="password" 
                 id="confirm_password" 
                 required 
                 value={formData.confirm_password}
                 onChange={(e) => setFormData({...formData, confirm_password: e.target.value})}
                 placeholder="••••••••" 
                 onFocus={() => setFocusedField("confirm_password")}
                 onBlur={() => setFocusedField(null)}
                 style={inputStyle("confirm_password")} 
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
              Guardar Contraseña
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
