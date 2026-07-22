"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Menu, Bell, Search, LogOut, ShieldCheck } from "lucide-react";
import { PASTORS } from "@/lib/constants";
import { signOut, getAuthUser } from "@/lib/services/authService";

interface AdminHeaderProps {
  onMenuClick?: () => void;
  title?: string;
}

export default function AdminHeader({ onMenuClick, title = "Tableau de bord" }: AdminHeaderProps) {
  const router = useRouter();
  const pastor = PASTORS[0];
  const authUser = getAuthUser();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await signOut();
    router.replace("/admin/login");
  };

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-outline-variant/20 px-4 md:px-8 py-3 flex items-center justify-between">
      
      <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0 mr-2">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 text-on-surface hover:text-primary transition-colors shrink-0"
          aria-label="Ouvrir le menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className="min-w-0">
          <h1 className="font-display font-bold text-base sm:text-lg md:text-xl text-primary leading-tight truncate">
            {title}
          </h1>
          <p className="text-[11px] text-on-surface-variant hidden sm:block truncate">
            Espace d'Administration • HOUEKIN MINISTRIES
          </p>
        </div>
      </div>

      {/* Right User Bar & Notifications */}
      <div className="flex items-center gap-2 sm:gap-4 shrink-0">
        {/* Search Bar */}
        <div className="hidden md:flex items-center bg-surface-container-low px-3 py-1.5 rounded-full border border-outline-variant/20 text-xs">
          <Search className="w-3.5 h-3.5 text-on-surface-variant mr-2" />
          <input
            type="text"
            placeholder="Rechercher..."
            className="bg-transparent focus:outline-none text-on-surface w-36"
          />
        </div>

        {/* Notifications */}
        <button className="relative p-2 text-on-surface-variant hover:text-primary transition-colors rounded-full hover:bg-surface-container-low">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </button>

        {/* Profile Avatar & Logout */}
        <div className="flex items-center gap-3 pl-3 border-l border-outline-variant/20">
          <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm border-2 border-primary/20 shadow-sm uppercase">
            {authUser?.email ? authUser.email.charAt(0) : "A"}
          </div>
          <div className="hidden md:block">
            <span className="font-display font-bold text-xs text-on-surface block leading-tight uppercase">
              {authUser?.email ? authUser.email.split('@')[0] : "Administrateur"}
            </span>
            <span className="text-[10px] text-secondary font-semibold flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" />
              {authUser?.email || "Admin"}
            </span>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            disabled={loggingOut}
            className="p-2 ml-2 text-on-surface-variant hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            title="Se déconnecter"
          >
            <LogOut className="w-4.5 h-4.5" />
          </button>
        </div>

      </div>

    </header>
  );
}
