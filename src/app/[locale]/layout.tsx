import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer";
import { auth } from "@/auth";
import { logoutAction } from "@/app/[locale]/auth/login/actions";
import CustomCursor from "@/components/CustomCursor";
import Header from "./Header"; // We'll extract client-side header logic

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
        <CustomCursor />
        <Header 
          locale={locale} 
          isLoggedIn={isLoggedIn} 
          privateLink={privateLink} 
        />
        <main style={{ flex: '1', paddingTop: '5rem' }}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
