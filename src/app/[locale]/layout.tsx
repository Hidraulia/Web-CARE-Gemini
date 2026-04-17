import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "CARE Mobiliario | Diseño, Fabricación y Soluciones a Medida",
  description: "Herramienta digital de posicionamiento híbrido. Especialistas en diseño técnico, fabricación de lujo y ejecución integral.",
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export default function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale}>
      <body>
        {/* Navigation placeholder */}
        <header className="glass-panel" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            CARE
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            <a href={`/${locale}/servicios`}>Servicios</a>
            <a href={`/${locale}/auth/login`}>Área Privada</a>
          </nav>
        </header>
        <main style={{ paddingTop: '80px' }}>
          {children}
        </main>
      </body>
    </html>
  );
}
