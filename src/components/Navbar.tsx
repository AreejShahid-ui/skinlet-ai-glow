import { Link, useLocation } from "react-router-dom";
import { Scan, LayoutDashboard, ShoppingBag, Home } from "lucide-react";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "Home", icon: Home },
  { path: "/scan", label: "Scan", icon: Scan },
  { path: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { path: "/recommendations", label: "Products", icon: ShoppingBag },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 glass rounded-3xl px-2 py-2 shadow-glass"
    >
      <div className="flex items-center gap-1">
        <Link to="/" className="px-3 py-1.5 font-display font-bold text-primary text-lg mr-2">
          Skinlet
        </Link>
        {navItems.map(({ path, label, icon: Icon }) => {
          const isActive = location.pathname === path;
          return (
            <Link
              key={path}
              to={path}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-2xl text-sm font-medium transition-all duration-300 ${
                isActive
                  ? "text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="nav-active"
                  className="absolute inset-0 bg-primary rounded-2xl"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={16} />
                <span className="hidden sm:inline">{label}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default Navbar;
