"use client";

import { motion } from "framer-motion";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        setError("Email o contraseña incorrectos.");
        setIsLoading(false);
      } else if (res?.ok) {
        const { getSession } = await import("next-auth/react");
        const session = await getSession();
        const user = session?.user;

        // 1. Prioridad absoluta: Cambio de contraseña obligatorio
        if (user?.must_change_password) {
          return router.push("/es/auth/change-password");
        }

        // 2. Si ya cambió la contraseña, calculamos su carpeta por rol
        const role = (user?.role || "").toLowerCase();
        console.log("ROL DETECTADO:", role);
        let destination = "";

        if (role === "b2b" || role === "empresa") destination = "/es/privado/empresa";
        else if (role === "b2c" || role === "vip" || role === "residencial") destination = "/es/privado/vip";
        else if (role === "interiorista" || role === "pro" || role === "profesional") destination = "/es/privado/interiorista";

        if (destination) {
          router.push(destination);
        } else {
          setError("Perfil no configurado. Contacte a soporte.");
          setIsLoading(false);
        }
      } else {
        setError("Error de conexión con el servidor");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("Error de conexión con el servidor");
      setIsLoading(false);
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

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
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
              disabled={isLoading}
              style={{ 
                marginTop: "1rem", 
                backgroundColor: isLoading ? "transparent" : "var(--color-accent)", 
                color: isLoading ? "var(--color-accent)" : "#fff", 
                padding: "1.2rem", 
                border: "1px solid var(--color-accent)", 
                cursor: isLoading ? "wait" : "pointer", 
                fontSize: "0.9rem", 
                textTransform: "uppercase", 
                letterSpacing: "0.15em", 
                fontWeight: 600, 
                borderRadius: "4px",
                transition: "all 0.3s ease",
                opacity: isLoading ? 0.7 : 1
              }}
              onMouseOver={(e) => { if (!isLoading) { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "var(--color-accent)"; } }}
              onMouseOut={(e) => { if (!isLoading) { e.currentTarget.style.backgroundColor = "var(--color-accent)"; e.currentTarget.style.color = "#fff"; } }}
            >
              {isLoading ? "Autenticando..." : "Autenticar"}
            </button>
            <div style={{ textAlign: "center", marginTop: "1rem" }}>
              <a href="/es/auth/register" style={{ fontSize: "0.85rem", color: "var(--color-text-light)", textDecoration: "none", transition: "color 0.3s ease" }} onMouseOver={(e) => e.currentTarget.style.color = "var(--color-accent)"} onMouseOut={(e) => e.currentTarget.style.color = "var(--color-text-light)"}>
                ¿No eres cliente aún? <span style={{ color: "var(--color-accent)" }}>Solicitar Alta / Crear Cuenta</span>
              </a>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
