import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const navItems = [
  { path: "/", label: "DISCOVER", index: "00" },
  { path: "/archive", label: "ARCHIVE", index: "01" },
  { path: "/map", label: "MAP", index: "02" },
  { path: "/lab", label: "LAB", index: "03" },
  { path: "/recipes", label: "RECIPES", index: "04" },
];

const Navigation = () => {
  const location = useLocation();

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 grid-line-b bg-background/80 backdrop-blur-md"
    >
      <div className="max-w-[1440px] mx-auto px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <span className="text-label text-foreground/60 group-hover:text-foreground transition-colors">
            MYCO
          </span>
          <span className="text-foreground/30">//</span>
          <span className="text-label text-foreground group-hover:text-[hsl(var(--aurora-cyan))] transition-colors">
            NEXUS
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  relative px-4 py-2 text-meta tracking-widest
                  transition-colors duration-300
                  ${isActive
                    ? "text-foreground"
                    : "text-foreground/40 hover:text-foreground/70"
                  }
                `}
              >
                <span className="text-foreground/20 mr-1">{item.index}</span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-4 right-4 h-px bg-[hsl(var(--aurora-cyan))]"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Status Indicator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-[hsl(var(--aurora-cyan))] animate-pulse" />
            <span className="text-meta text-foreground/40">LIVE</span>
          </div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navigation;
