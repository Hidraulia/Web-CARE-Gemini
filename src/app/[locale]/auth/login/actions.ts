"use server";

import { signIn, signOut } from "@/auth";
import { AuthError } from "next-auth";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  try {
    // redirectTo /es/privado — middleware will intercept and forward to the correct role dashboard
    await signIn("credentials", { 
      email, 
      password, 
      redirectTo: `/es/privado/empresa`,
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
    throw error; // Next.js throws NEXT_REDIRECT — pass it through
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/es" });
}
