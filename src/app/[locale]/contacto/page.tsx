"use client";

import { useState } from "react";

export default function Contacto() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
    client_type: "b2c"
  });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("Enviando...");
    
    try {
      const res = await fetch("http://127.0.0.1:8000/api/leads", {
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

  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "2.5rem", marginBottom: "1rem", textAlign: "center" }}>
        Contacto
      </h1>
      <p style={{ textAlign: "center", color: "var(--color-text-light)", marginBottom: "3rem" }}>
        Cuéntanos sobre tu próximo proyecto.
      </p>

      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
        <div>
          <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Soy un...</label>
          <select 
            value={formData.client_type}
            onChange={(e) => setFormData({...formData, client_type: e.target.value})}
            style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)" }}
          >
            <option value="b2c">Cliente Particular</option>
            <option value="interiorista">Arquitecto / Interiorista</option>
            <option value="b2b">Empresa / Promotora</option>
          </select>
        </div>

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Nombre Completo</label>
           <input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)" }} />
        </div>

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Email Corporativo o Personal</label>
           <input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)" }} />
        </div>

        {formData.client_type !== 'b2c' && (
          <div>
             <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Empresa / Estudio</label>
             <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})} style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)" }} />
          </div>
        )}

        <div>
           <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Mensaje / Detalles del Proyecto</label>
           <textarea required rows={4} value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} style={{ width: "100%", padding: "1rem", borderRadius: "4px", border: "1px solid var(--color-border)", background: "var(--color-bg)", color: "var(--color-text-main)" }}></textarea>
        </div>

        <button type="submit" style={{ marginTop: "1rem", backgroundColor: "var(--color-accent)", color: "#fff", padding: "1rem", border: "none", cursor: "pointer", fontSize: "1rem", textTransform: "uppercase", letterSpacing: "0.1em", fontWeight: 500, borderRadius: "4px" }}>
          Enviar Consulta
        </button>

        {status && (
          <p style={{ marginTop: "1rem", textAlign: "center", fontSize: "0.9rem", color: status.includes("error") || status.includes("Error") ? "#ff6b6b" : "#51cf66" }}>
            {status}
          </p>
        )}
      </form>
    </div>
  );
}
