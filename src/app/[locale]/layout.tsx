import type { Metadata } from "next";
import "../globals.css";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Header from "./Header";
import NextAuthProvider from "@/components/SessionProvider";

export const metadata: Metadata = {
  title: "CARE Mobiliario | Diseño, Fabricación y Soluciones a Medida",
  description: "Herramienta digital de posicionamiento híbrido. Especialistas en diseño técnico, fabricación de lujo y ejecución integral.",
};

export function generateStaticParams() {
  return [{ locale: 'es' }, { locale: 'en' }];
}

export function getRolePath(role?: string) {
  const r = (role || '').toLowerCase();
  switch (r) {
    case 'b2b': 
    case 'empresa': return 'empresa';
    case 'interiorista':
    case 'pro': 
    case 'profesional': return 'interiorista';
    case 'b2c':
    case 'vip': 
    case 'residencial': return 'vip';
    default: return '';
  }
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
      <body style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NextAuthProvider>
          <CustomCursor />
          <Header locale={locale} />
          <main style={{ flex: '1', paddingTop: '5rem' }}>
            {children}
          </main>
          <Footer locale={locale} />
        </NextAuthProvider>
      </body>
    </html>
  );
}
