import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  icon: LucideIcon;
  description?: string;
}

export default function StatCard({ title, value, change, isPositive = true, icon: Icon, description }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-3xl border border-outline-variant/20 shadow-md hover:shadow-lg transition-all flex flex-col justify-between">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">{title}</span>
        <div className="p-3 bg-secondary/10 text-secondary rounded-2xl">
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-2">
          <span className="font-display font-extrabold text-3xl text-primary">{value}</span>
          {change && (
            <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
              isPositive ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
            }`}>
              {change}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-on-surface-variant mt-2 leading-relaxed">{description}</p>
        )}
      </div>
    </div>
  );
}
