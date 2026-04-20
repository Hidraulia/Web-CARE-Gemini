export default function QuienesSomos() {
  return (
    <div style={{ padding: "6rem 2rem", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "3rem", marginBottom: "2rem" }}>
        Nuestra Esencia
      </h1>
      <p style={{ fontSize: "1.2rem", color: "var(--color-text-light)", lineHeight: 1.8, marginBottom: "3rem" }}>
        En CARE Mobiliario, no nos limitamos a fabricar muebles. Somos artesanos
        contemporáneos de espacios con una sólida base industrial. Nacimos de la necesidad
        de combinar la delicadeza del interiorismo de autor con la solvencia técnica
        imprescindible en proyectos B2B.
      </p>
      
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", textAlign: "left", marginTop: "4rem" }}>
        <div style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--color-accent)" }}>Solvencia B2B</h3>
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>Nuestras instalaciones cuentan con maquinaria de control numérico avanzada, garantizando entregas masivas sin comprometer la precisión.</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.02)", padding: "2rem", border: "1px solid rgba(255,255,255,0.05)", borderRadius: "8px" }}>
          <h3 style={{ fontSize: "1.2rem", marginBottom: "1rem", color: "var(--color-accent)" }}>Sensibilidad Interiorista</h3>
          <p style={{ fontSize: "0.95rem", color: "var(--color-text-light)", lineHeight: 1.6 }}>Trabajamos mano a mano con arquitectos para asegurar que la intención original del diseño se traduzca de forma fidedigna al producto final.</p>
        </div>
      </div>
    </div>
  );
}
