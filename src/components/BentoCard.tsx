import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface BentoCardProps {
  icon: LucideIcon;
  label: string;
  value: string | number;
  subtitle?: string;
  className?: string;
  color?: "mint" | "pink" | "default";
  delay?: number;
}

const colorMap = {
  mint: "text-primary",
  pink: "text-accent-foreground",
  default: "text-foreground",
};

const BentoCard = ({ icon: Icon, label, value, subtitle, className = "", color = "default", delay = 0 }: BentoCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className={`glass rounded-3xl p-6 shadow-card hover:shadow-elevated transition-shadow duration-300 ${className}`}
  >
    <div className="flex items-start justify-between mb-4">
      <div className="p-2.5 rounded-2xl bg-muted">
        <Icon size={20} className={colorMap[color]} />
      </div>
    </div>
    <p className="text-sm text-muted-foreground font-medium mb-1">{label}</p>
    <p className={`text-3xl font-display font-bold ${colorMap[color]}`}>{value}</p>
    {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
  </motion.div>
);

export default BentoCard;
