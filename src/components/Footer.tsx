import Link from 'next/link';

export default function Footer({ locale }: { locale: string }) {
  return (
    <footer style={{ background: 'var(--color-bg-dark)', color: 'var(--color-text-light)', padding: '4rem 2rem', marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.05)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem' }}>
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: '#fff', marginBottom: '1rem' }}>CARE</h3>
          <p style={{ fontSize: '0.9rem', lineHeight: 1.6, opacity: 0.8 }}>
            Diseño técnico, fabricación de lujo y ejecución integral para proyectos exigentes.
          </p>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Mapa del Sitio</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <li><Link href={`/${locale}/quienes-somos`} style={{ color: 'inherit', textDecoration: 'none' }}>Quiénes Somos</Link></li>
            <li><Link href={`/${locale}/servicios/diseno-tecnico`} style={{ color: 'inherit', textDecoration: 'none' }}>Diseño Técnico</Link></li>
            <li><Link href={`/${locale}/servicios/fabricacion`} style={{ color: 'inherit', textDecoration: 'none' }}>Fabricación a Medida</Link></li>
            <li><Link href={`/${locale}/servicios/ejecucion-integral`} style={{ color: 'inherit', textDecoration: 'none' }}>Ejecución Integral</Link></li>
            <li><Link href={`/${locale}/contacto`} style={{ color: 'inherit', textDecoration: 'none' }}>Contacto</Link></li>
          </ul>
        </div>
        
        <div>
          <h4 style={{ color: '#fff', marginBottom: '1.2rem', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Legal & Redes</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.9rem' }}>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Política de Privacidad</a></li>
            <li><a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>Aviso Legal</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>Instagram</a></li>
            <li><a href="https://linkedin.com" target="_blank" rel="noreferrer" style={{ color: 'inherit', textDecoration: 'none' }}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
      
      <div style={{ maxWidth: '1200px', margin: '3rem auto 0', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)', textAlign: 'center', fontSize: '0.85rem', opacity: 0.7 }}>
        &copy; {new Date().getFullYear()} CARE Mobiliario. Todos los derechos reservados.
      </div>
    </footer>
  );
}
