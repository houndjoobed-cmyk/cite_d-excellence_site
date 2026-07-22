import { supabase, isSupabaseConfigured } from "@/lib/supabase/client";

export interface AuthUser {
  id: string;
  email: string;
}

/// Connexion avec email et mot de passe via Supabase Auth.
export async function signIn(email: string, password: string): Promise<{ success: boolean; user?: AuthUser; error?: string }> {
  if (!isSupabaseConfigured()) {
    // Mode hors-ligne : accepter les identifiants de démonstration
    if (email === "admin@houekin.org" && password === "admin2026") {
      const demoUser: AuthUser = { id: "demo-admin", email };
      if (typeof window !== 'undefined') {
        sessionStorage.setItem("hm_auth_user", JSON.stringify(demoUser));
      }
      return { success: true, user: demoUser };
    }
    return { success: false, error: "Identifiants incorrects." };
  }

  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (error || !data.user) {
      return { success: false, error: error?.message || "Identifiants incorrects." };
    }

    const user: AuthUser = { id: data.user.id, email: data.user.email || email };
    if (typeof window !== 'undefined') {
      sessionStorage.setItem("hm_auth_user", JSON.stringify(user));
    }
    return { success: true, user };
  } catch (err: any) {
    return { success: false, error: err?.message || "Erreur de connexion." };
  }
}

/// Déconnexion.
export async function signOut(): Promise<void> {
  if (typeof window !== 'undefined') {
    sessionStorage.removeItem("hm_auth_user");
  }

  if (isSupabaseConfigured()) {
    try {
      await supabase.auth.signOut();
    } catch {
      // Ignorer l'erreur silencieusement
    }
  }
}

/// Vérifier si un utilisateur est connecté.
export function getAuthUser(): AuthUser | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = sessionStorage.getItem("hm_auth_user");
    if (stored) {
      return JSON.parse(stored) as AuthUser;
    }
  } catch {
    // Ignorer l'erreur
  }
  return null;
}

/// Vérifier si un utilisateur est connecté (booléen simple).
export function isAuthenticated(): boolean {
  return getAuthUser() !== null;
}
