"use client";

import { motion } from "framer-motion";
import { loginAction } from "./actions";
import { useState } from "react";

export default function Login() {
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (formData: FormData) => {
    setError(null);
    const result = await loginAction(formData);
    if (result?.error) {
      setError(result.error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "var(--color-bg)", padding: "2rem" }}>
      <motion.div 
        className="glass-panel" 
        style={{ padding: "4rem", maxWidth: "500px", width: "100%", borderRadius: "8px", boxShadow: "0 10px 30px rgba(0,0,0,0.05)" }}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "0.5rem", textAlign: "center" }}>Área Privada</h1>
        <p style={{ textAlign: "center", color: "var(--color-text-light)", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Inicia sesión para acceder a tu panel de gestión
        </p>

        <form action={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
             <label htmlFor="email" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Correo Electrónico</label>
             <input type="email" id="email" name="email" required placeholder="ejemplo@care.es" style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)", fontSize: "1rem" }} />
          </div>

          <div>
             <label htmlFor="password" style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Contraseña</label>
             <input type="password" id="password" name="password" required placeholder="••••••••" style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)", fontSize: "1rem" }} />
          </div>

          {error && <p style={{ color: "#ff6b6b", fontSize: "0.9rem", textAlign: "center" }}>{error}</p>}

          <button type="submit" style={{ marginTop: "1rem", backgroundColor: "var(--color-accent)", color: "#fff", padding: "1rem", border: "none", cursor: "pointer", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, borderRadius: "4px", transition: "background 0.3s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#a48e65"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--color-accent)"}>
            Entrar
          </button>
        </form>
      </motion.div>
    </div>
  );
}
