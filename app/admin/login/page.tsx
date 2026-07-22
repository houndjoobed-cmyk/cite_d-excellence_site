"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { CHURCH_INFO } from "@/lib/constants";
import { signIn } from "@/lib/services/authService";
import { Lock, Mail, ArrowRight, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email.trim() || !password.trim()) {
      setError("Veuillez remplir l'email et le mot de passe.");
      return;
    }

    setLoading(true);
    const result = await signIn(email.trim(), password);
    setLoading(false);

    if (result.success) {
      router.push("/admin");
    } else {
      setError(result.error || "Échec de la connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-inverse-surface relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />

      <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl relative z-10 space-y-6 border border-white/20">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-block group">
            <img
              src="/logo.png"
              alt="Logo HOUEKIN MINISTRIES"
              className="w-16 h-16 object-contain mx-auto group-hover:scale-105 transition-transform"
            />
          </Link>
          <h1 className="font-display font-bold text-2xl text-primary leading-tight">
            Espace d'Administration
          </h1>
          <p className="text-xs text-on-surface-variant">
            {CHURCH_INFO.name} — {CHURCH_INFO.subtitle}
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-rose-50 border border-rose-300 rounded-2xl p-3 flex items-start gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 mt-0.5 shrink-0" />
            <span className="text-xs text-rose-800 font-medium">{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-4 pt-2">
          
          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">Identifiant / Email</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3.5" />
              <input
                type="email"
                placeholder="admin@houekin.org"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(""); }}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl pl-10 pr-4 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-on-surface mb-1">Mot de passe</label>
            <div className="relative">
              <Lock className="w-4 h-4 text-on-surface-variant absolute left-3.5 top-3.5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Votre mot de passe"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                className="w-full bg-surface-container-low border border-outline-variant/30 rounded-2xl pl-10 pr-10 py-3 text-xs text-on-surface focus:outline-none focus:ring-2 focus:ring-secondary font-medium"
                required
                autoComplete="current-password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-3 text-on-surface-variant hover:text-on-surface"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-primary hover:bg-primary-container text-white font-bold rounded-2xl text-xs transition-all shadow-md flex items-center justify-center gap-2 active:scale-95 disabled:opacity-70"
          >
            {loading ? (
              <span>Connexion en cours...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Se connecter au Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

        <div className="pt-4 border-t border-outline-variant/20 text-center">
          <Link href="/" className="text-xs text-on-surface-variant hover:text-primary font-semibold transition-colors">
            ← Retourner au site public
          </Link>
        </div>

      </div>
    </div>
  );
}
