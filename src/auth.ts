import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth Session to include role and custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "b2b" | "interiorista" | "b2c";
      empresa_nombre?: string | null;
      especialidad?: string | null;
    } & DefaultSession["user"];
  }
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  providers: [
    CredentialsProvider({
      name: "CARE Privado",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Contraseña", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;
        
        try {
          // Call FastAPI backend to verify credentials
          const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
              email: credentials.email, 
              password: credentials.password 
            }),
          });

          if (!res.ok) {
            return null; // Invalid credentials
          }

          const user = await res.json();
          
          return {
            id: user.id.toString(),
            name: user.email,
            email: user.email,
            role: user.role,
            empresa_nombre: user.empresa_nombre,
            especialidad: user.especialidad,
          } as any;
          
        } catch (error) {
          console.error("Login verification failed", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
        token.empresa_nombre = (user as any).empresa_nombre;
        token.especialidad = (user as any).especialidad;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role as "b2b" | "interiorista" | "b2c";
        session.user.id = token.id as string;
        session.user.empresa_nombre = token.empresa_nombre as string | null;
        session.user.especialidad = token.especialidad as string | null;
      }
      return session;
    },
  },
  pages: {
    signIn: "/es/auth/login",
  },
});
