"use client";

import { useState, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";
import { isAuthenticated } from "@/lib/services/authService";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  // Allow login page without auth
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) {
      setAuthChecked(true);
      return;
    }

    // Check authentication for all other admin pages
    if (!isAuthenticated()) {
      router.replace("/admin/login");
    } else {
      setAuthChecked(true);
    }
  }, [pathname, isLoginPage, router]);

  // If on login page, render full screen without sidebar/header
  if (isLoginPage) {
    return <div className="min-h-screen bg-background">{children}</div>;
  }

  // Show nothing while checking auth (prevents flash of dashboard)
  if (!authChecked) {
    return (
      <div className="min-h-screen bg-surface-container-low flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-xs text-on-surface-variant font-semibold">Vérification de l'accès...</p>
        </div>
      </div>
    );
  }

  const getTitleFromPath = () => {
    if (pathname.startsWith("/admin/members/new")) return "Enregistrement d'un Fidèle";
    switch (pathname) {
      case "/admin":
        return "Tableau de bord Général";
      case "/admin/members":
        return "Gestion des Fidèles & Bénévoles";
      case "/admin/sermons":
        return "Gestion des Prédications";
      case "/admin/programs":
        return "Gestion des Cultes & Événements";
      case "/admin/messages":
        return "Messagerie & Prières";
      case "/admin/gallery":
        return "Galerie Médias";
      case "/admin/settings":
        return "Paramètres de l'Église";
      default:
        return "Administration";
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-low flex w-full overflow-x-hidden">
      {/* Sidebar */}
      <AdminSidebar mobileOpen={mobileSidebarOpen} setMobileOpen={setMobileSidebarOpen} />

      {/* Main Content Area */}
      <div className="flex-1 lg:pl-64 flex flex-col min-h-screen w-full max-w-full">
        <AdminHeader
          title={getTitleFromPath()}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
