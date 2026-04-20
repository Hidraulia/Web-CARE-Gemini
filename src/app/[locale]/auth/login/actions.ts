"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
    await signIn("credentials", { 
      email, 
      password, 
      redirectTo: `/es/auth/login` // Middleware will intercept this and forward to correct dashboard
    });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return { error: 'Email o contraseña incorrectos.' };
        default:
          return { error: 'Ocurrió un error al iniciar sesión.' };
      }
    }
    throw error; // Let Next.js handle the redirect exception thrown by signIn
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/es" });
}
