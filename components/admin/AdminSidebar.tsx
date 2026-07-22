"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { CHURCH_INFO } from "@/lib/constants";
import { signOut } from "@/lib/services/authService";
import { 
  LayoutDashboard, 
  Video, 
  Calendar, 
  MessageSquare, 
  Image, 
  Settings, 
  ExternalLink,
  Users,
  LogOut,
  X
} from "lucide-react";

interface AdminSidebarProps {
  mobileOpen?: boolean;
  setMobileOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ mobileOpen, setMobileOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.replace("/admin/login");
  };

  const menuItems = [
    { label: "Tableau de bord", href: "/admin", icon: LayoutDashboard },
    { label: "Fidèles & Bénévoles", href: "/admin/members", icon: Users },
    { label: "Prédications", href: "/admin/sermons", icon: Video },
    { label: "Programmes & Cultes", href: "/admin/programs", icon: Calendar },
    { label: "RDV Pastoraux", href: "/admin/appointments", icon: Calendar },
    { label: "Galerie Médias", href: "/admin/gallery", icon: Image },
    { label: "Paramètres Église", href: "/admin/settings", icon: Settings },
  ];

  const sidebarContent = (
    <div className="flex flex-col h-full bg-inverse-surface text-white border-r border-white/10 w-64 p-5">
      
      {/* Sidebar Header */}
      <div className="flex items-center justify-between pb-6 mb-6 border-b border-white/10">
        <Link href="/admin" className="flex items-center gap-3 group">
          <img
            src="/logo.png"
            alt="Logo HOUEKIN MINISTRIES"
            className="w-9 h-9 object-contain group-hover:scale-105 transition-transform"
          />
          <div>
            <span className="font-display font-bold text-sm text-white block leading-tight">
              HOUEKIN ADMIN
            </span>
            <span className="font-display text-[9px] text-secondary-fixed tracking-wider uppercase block font-semibold">
              Espace CMS
            </span>
          </div>
        </Link>
        {setMobileOpen && (
          <button onClick={() => setMobileOpen(false)} className="lg:hidden text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="space-y-1.5 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={() => setMobileOpen && setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-secondary text-white shadow-lg font-bold"
                  : "text-white/70 hover:bg-white/10 hover:text-white"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-secondary-fixed"}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer Quick Links & Logout */}
      <div className="pt-6 border-t border-white/10 space-y-3">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-4 py-2.5 rounded-xl text-xs text-white/70 hover:bg-white/10 hover:text-white transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-secondary-fixed" />
            <span>Voir le site public</span>
          </span>
        </Link>

        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-bold"
        >
          <LogOut className="w-4 h-4" />
          <span>Se déconnecter</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed left-0 top-0 bottom-0 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen && setMobileOpen(false)} />
          <div className="relative z-10">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
}
