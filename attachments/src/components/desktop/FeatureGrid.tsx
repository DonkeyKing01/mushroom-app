import { motion } from "framer-motion";
import { Archive, Map, FlaskConical, BookOpen, Users } from "lucide-react";
import { Link } from "react-router-dom";

interface FeatureCell {
  index: string;
  title: string;
  titleEn: string;
  description: string;
  icon: React.ReactNode;
  path: string;
  size: "large" | "medium" | "small";
  accent?: string;
  stats?: { label: string; value: string };
}

const features: FeatureCell[] = [
  {
    index: "01",
    title: "ARCHIVE",
    titleEn: "ARCHIVE",
    description: "Explore the complete database of 12,000+ species",
    icon: <Archive className="w-6 h-6" />,
    path: "/archive",
    size: "medium",
    accent: "aurora-cyan",
    stats: { label: "SPECIES", value: "12,847" },
  },
  {
    index: "02",
    title: "LIVE MAP",
    titleEn: "LIVE MAP",
    description: "Real-time visualization of global fungal distribution",
    icon: <Map className="w-6 h-6" />,
    path: "/map",
    size: "large",
    accent: "aurora-magenta",
    stats: { label: "MARKERS", value: "28,391" },
  },
  {
    index: "03",
    title: "LABORATORY",
    titleEn: "LABORATORY",
    description: "Mycelium growth simulation and data visualization",
    icon: <FlaskConical className="w-6 h-6" />,
    path: "/lab",
    size: "medium",
    accent: "aurora-purple",
    stats: { label: "ONLINE", value: "127" },
  },
  {
    index: "04",
    title: "RECIPES",
    titleEn: "RECIPES",
    description: "Safe consumption guide and culinary inspiration",
    icon: <BookOpen className="w-6 h-6" />,
    path: "/recipes",
    size: "small",
    accent: "aurora-gold",
    stats: { label: "RECIPES", value: "842" },
  },
  {
    index: "05",
    title: "COMMUNITY",
    titleEn: "COMMUNITY",
    description: "Connect with fungal enthusiasts worldwide",
    icon: <Users className="w-6 h-6" />,
    path: "/map",
    size: "small",
    accent: "aurora-cyan",
    stats: { label: "MEMBERS", value: "3,291" },
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const cellVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const FeatureGrid = () => {
  return (
    <section className="grid-line-t">
      {/* Section Header */}
      <div className="grid grid-cols-12 grid-line-b">
        <div className="col-span-12 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-meta text-foreground/30">02</span>
            <h2 className="text-label text-foreground/60">FEATURES</h2>
          </div>
          <span className="text-meta text-foreground/30">
            SELECT DESTINATION
          </span>
        </div>
      </div>

      {/* Bento Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-12 grid-rows-2 min-h-[500px]"
      >
        {/* Cell 1: Archive (Medium - 4 cols) */}
        <motion.div variants={cellVariants} className="col-span-4 row-span-1 grid-line-r grid-line-b">
          <FeatureCard feature={features[0]} />
        </motion.div>

        {/* Cell 2: Map (Large - 4 cols, 2 rows) */}
        <motion.div variants={cellVariants} className="col-span-4 row-span-2 grid-line-r">
          <FeatureCard feature={features[1]} isLarge />
        </motion.div>

        {/* Cell 3: Lab (Medium - 4 cols) */}
        <motion.div variants={cellVariants} className="col-span-4 row-span-1 grid-line-b">
          <FeatureCard feature={features[2]} />
        </motion.div>

        {/* Cell 4: Recipes (Small - 2 cols) */}
        <motion.div variants={cellVariants} className="col-span-2 row-span-1 grid-line-r">
          <FeatureCard feature={features[3]} isCompact />
        </motion.div>

        {/* Cell 5: Community (Small - 2 cols) */}
        <motion.div variants={cellVariants} className="col-span-2 row-span-1 grid-line-r">
          <FeatureCard feature={features[4]} isCompact />
        </motion.div>

        {/* Cell 6: Recipes continued (4 cols) */}
        <motion.div variants={cellVariants} className="col-span-4 row-span-1">
          <FeatureCard feature={features[3]} showDescription />
        </motion.div>
      </motion.div>
    </section>
  );
};

interface FeatureCardProps {
  feature: FeatureCell;
  isLarge?: boolean;
  isCompact?: boolean;
  showDescription?: boolean;
}

const FeatureCard = ({ feature, isLarge, isCompact, showDescription }: FeatureCardProps) => {
  const accentColor = `hsl(var(--${feature.accent}))`;

  return (
    <Link
      to={feature.path}
      className="group relative h-full flex flex-col p-6 transition-colors duration-500 hover:bg-card"
    >
      {/* Decorative Index */}
      <span
        className="cell-number absolute top-4 right-4 transition-opacity duration-500 group-hover:opacity-30"
        style={{ color: accentColor }}
      >
        {feature.index}
      </span>

      {/* Icon */}
      <div
        className="mb-4 transition-transform duration-500 group-hover:translate-x-1"
        style={{ color: accentColor }}
      >
        {feature.icon}
      </div>

      {/* Content */}
      <div className="mt-auto">
        {!isCompact && (
          <span className="text-meta text-foreground/30 block mb-1">
            {feature.titleEn}
          </span>
        )}
        <h3 className={`font-display ${isLarge ? 'text-display-lg' : 'text-2xl'} text-foreground mb-2`}>
          {feature.title}
        </h3>
        {(isLarge || showDescription) && (
          <p className="text-label text-foreground/40 leading-relaxed max-w-xs">
            {feature.description}
          </p>
        )}
      </div>

      {/* Stats */}
      {feature.stats && !isCompact && (
        <div className="mt-6 pt-4 grid-line-t">
          <span className="text-meta text-foreground/30">{feature.stats.label}</span>
          <span
            className="block text-2xl font-display mt-1"
            style={{ color: accentColor }}
          >
            {feature.stats.value}
          </span>
        </div>
      )}

      {/* Hover Indicator */}
      <div
        className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
        style={{ backgroundColor: accentColor }}
      />
    </Link>
  );
};

export default FeatureGrid;
