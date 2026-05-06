import NextAuth, { type DefaultSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Extend NextAuth Session to include role and custom fields
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      empresa_nombre?: string | null;
      especialidad?: string | null;
      must_change_password?: boolean;
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
  cookies: {
    sessionToken: {
      name: process.env.NODE_ENV === "production" ? "__Secure-next-auth.session-token" : "next-auth.session-token",
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 30 * 24 * 60 * 60, // 30 days
      },
    },
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
          const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
          const res = await fetch(`${API_URL}/api/auth/login`, {
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
            must_change_password: user.must_change_password
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
      try {
        if (user) {
          token.role = ((user as any).role || "").toLowerCase();
          token.empresa_nombre = (user as any).empresa_nombre || null;
          token.especialidad = (user as any).especialidad || null;
          token.id = user.id;
          token.must_change_password = (user as any).must_change_password || false;
        }
      } catch (err) {
        console.error("JWT Error:", err);
      }
      return token;
    },
    session({ session, token }) {
      try {
        if (token && session.user) {
          session.user.id = token.id as string;
          session.user.role = token.role as string;
          session.user.must_change_password = token.must_change_password as boolean;
          session.user.empresa_nombre = (token.empresa_nombre as string) || null;
          session.user.especialidad = (token.especialidad as string) || null;
        }
      } catch (err) {
        console.error("Session Error:", err);
      }
      return session;
    },
  },
  pages: {
    signIn: "/es/auth/login",
  },
});
