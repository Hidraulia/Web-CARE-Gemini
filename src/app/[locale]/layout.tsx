import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import { logoutAction } from "@/app/[locale]/auth/login/actions";

export const metadata: Metadata = {
  title: "CARE Mobiliario | Diseño, Fabricación y Soluciones a Medida",
  description: "Herramienta digital de posicionamiento híbrido. Especialistas en diseño técnico, fabricación de lujo y ejecución integral.",
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

function getRolePath(role?: string) {
  switch (role) {
    case 'b2b': return 'empresa';
    case 'interiorista': return 'profesional';
    case 'b2c': return 'residencial';
    default: return '';
  }
}

export default async function RootLayout({
  children,
  params: { locale }
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const session = await auth();
  const isLoggedIn = !!session;
  
  const privateLink = isLoggedIn 
    ? `/${locale}/privado/${getRolePath(session?.user?.role)}` 
    : `/${locale}/auth/login`;

  return (
    <html lang={locale}>
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <header className="glass-panel" style={{ position: 'fixed', top: 0, width: '100%', zIndex: 100, padding: '1.5rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', fontWeight: 600, letterSpacing: '0.05em' }}>
            <a href={`/${locale}`} style={{ color: 'inherit', textDecoration: 'none' }}>CARE</a>
          </div>
          <nav style={{ display: 'flex', gap: '2rem', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.1em', alignItems: 'center' }}>
            <a href={`/${locale}/quienes-somos`}>Maison</a>
            <a href={`/${locale}/servicios`}>Servicios</a>
            <a href={`/${locale}/contacto`}>Contacto</a>
            <a href={privateLink} style={{ color: isLoggedIn ? 'var(--color-accent)' : 'inherit' }}>
              {isLoggedIn ? "Mi Cuenta" : "Área Privada"}
            </a>
            {isLoggedIn && (
               <form action={logoutAction}>
                 <button type="submit" style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '0.7rem', color: 'var(--color-text-light)', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '1rem' }}>
                   SALIR
                 </button>
               </form>
            )}
          </nav>
        </header>
        <main style={{ flex: '1', paddingTop: '5rem' }}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
