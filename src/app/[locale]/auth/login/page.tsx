"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function MockLogin({ params: { locale } }: { params: { locale: string } }) {
  const [role, setRole] = useState("b2b");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulating authentication by setting a mock cookie
    document.cookie = `mock_session=${role}; path=/; max-age=3600`;
    
    // Redirect to respective dashboard
    router.push(`/${locale}/dashboard/${role}`);
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
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2rem", marginBottom: "0.5rem", textAlign: "center" }}>Acceso Privado</h1>
        <p style={{ textAlign: "center", color: "var(--color-text-light)", marginBottom: "2rem", fontSize: "0.9rem" }}>
          Simulación de Login (Keycloak Mock)
        </p>

        <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Selecciona un Perfil de Prueba</label>
            <select 
              value={role} 
              onChange={(e) => setRole(e.target.value)}
              style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-main)", fontSize: "1rem" }}
            >
              <option value="b2b">Empresa / Promotora (B2B)</option>
              <option value="interiorista">Interiorista / Arquitecto</option>
              <option value="b2c">Cliente VIP (B2C)</option>
            </select>
          </div>

          <div>
             <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email (Simulado)</label>
             <input type="email" value={`demo@${role}.com`} readOnly style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "transparent", color: "var(--color-text-light)", fontSize: "1rem", cursor: "not-allowed" }} />
          </div>

          <button type="submit" style={{ marginTop: "1rem", backgroundColor: "var(--color-accent)", color: "#fff", padding: "1rem", border: "none", cursor: "pointer", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, borderRadius: "4px", transition: "background 0.3s" }} onMouseOver={(e) => e.currentTarget.style.backgroundColor = "#a48e65"} onMouseOut={(e) => e.currentTarget.style.backgroundColor = "var(--color-accent)"}>
            Iniciar Sesión
          </button>
        </form>
      </motion.div>
    </div>
  );
}
