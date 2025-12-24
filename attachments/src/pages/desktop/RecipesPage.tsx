import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Trash2, ChefHat, Sparkles, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDrag } from "@use-gesture/react";
import Navigation from "@/components/desktop/Navigation";
import Footer from "@/components/desktop/Footer";
import SteamScene from "@/components/desktop/SteamScene";
import { toast } from "sonner";

// Mock edible species data
const mockEdibleSpecies = [
  { id: "1", name_cn: "Lanmaoa asiatica", name_scientific: "Boletus yunnanensis", imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format" },
  { id: "3", name_cn: "Chanterelle", name_scientific: "Cantharellus cibarius", imageUrl: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=400&auto=format" },
  { id: "4", name_cn: "Matsutake", name_scientific: "Tricholoma matsutake", imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format" },
  { id: "7", name_cn: "Morel", name_scientific: "Morchella esculenta", imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format" },
  { id: "11", name_cn: "Porcini", name_scientific: "Boletus edulis", imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format" },
  { id: "12", name_cn: "Bamboo Fungus", name_scientific: "Phallus indusiatus", imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format" },
];

const RecipesPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSpecies, setSelectedSpecies] = useState<any[]>([]);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  // const [isDraggingOver, setIsDraggingOver] = useState(false);
  const isDraggingOver = false; // Placeholder for now
  const navigate = useNavigate();

  const filteredSpecies = mockEdibleSpecies.filter(s =>
    s.name_cn.includes(searchQuery) || s.name_scientific.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDropOnPot = (species: any, x: number, y: number) => {
    if (selectedSpecies.find(s => s.id === species.id)) {
      toast.error("Ingredient already added");
      return;
    }
    if (selectedSpecies.length >= 5) {
      toast.error("Max 5 ingredients");
      return;
    }

    // Add ripple effect
    const rippleId = Date.now();
    setRipples(prev => [...prev, { id: rippleId, x, y }]);
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== rippleId));
    }, 1000);

    setSelectedSpecies(prev => [...prev, species]);
    toast.success(`${species.name_cn} added to pot`);
  };

  const handleRemoveSpecies = (speciesId: string) => {
    setSelectedSpecies(prev => prev.filter(s => s.id !== speciesId));
  };

  const handleGenerateRecipe = () => {
    if (selectedSpecies.length === 0) {
      toast.error("Please select at least one ingredient");
      return;
    }

    // Navigate to mock recipe detail page
    const ingredientIds = selectedSpecies.map(s => s.id).join(",");
    navigate(`/recipes/demo?ingredients=${ingredientIds}`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <section className="grid grid-cols-12 grid-line-b">
          <div className="col-span-12 px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-meta text-foreground/30 block mb-4">
                04 / AI RECIPES
              </span>
              <h1 className="text-7xl font-display mb-4">
                AI <span className="text-[hsl(var(--aurora-cyan))]">RECIPES</span>
              </h1>
              <p className="text-label text-foreground/50 max-w-xl">
                Drag edible fungi into the digital pot, and the AI chef will generate creative recipes for you. A complete safety guide from the wild to the table.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Search Library */}
        <section className="grid-line-b bg-card/30 backdrop-blur-sm">
          <div className="max-w-[1440px] mx-auto px-8 py-6">
            <div className="flex items-center gap-4 mb-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-foreground/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search edible species..."
                  className="w-full bg-background/60 border border-border/50 backdrop-blur-md pl-12 pr-4 py-3 text-label text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[hsl(var(--aurora-cyan))] transition-colors"
                />
              </div>
              <span className="text-meta text-foreground/40">
                {filteredSpecies.length} available
              </span>
            </div>

            {/* Species Cards - Draggable */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {filteredSpecies.map((species) => (
                <DraggableSpeciesCard
                  key={species.id}
                  species={species}
                  onDropOnPot={handleDropOnPot}
                  isSelected={selectedSpecies.find(s => s.id === species.id) !== undefined}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Cooking Area */}
        <section className="relative min-h-[70vh] grid grid-cols-12">


          {/* Left: Selected Ingredients */}
          <div className="relative col-span-4 grid-line-r p-8 z-10 bg-background/40 backdrop-blur-sm">
            <h3 className="text-label text-foreground/60 mb-6 flex items-center gap-2">
              <ChefHat className="w-4 h-4 text-[hsl(var(--aurora-cyan))]" />
              Selected Ingredients ({selectedSpecies.length}/5)
            </h3>

            <AnimatePresence mode="popLayout">
              {selectedSpecies.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 rounded-full border-2 border-dashed border-foreground/20 flex items-center justify-center mb-4">
                    <Plus className="w-8 h-8 text-[hsl(var(--aurora-cyan))/0.5]" />
                  </div>
                  <span className="text-meta text-foreground/30">
                    Drag ingredient cards to the pot on the right
                  </span>
                </motion.div>
              ) : (
                <motion.div layout className="space-y-3">
                  {selectedSpecies.map((species) => (
                    <motion.div
                      key={species.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      layout
                      className="p-4 bg-card/80 backdrop-blur-sm grid-line flex items-center gap-3 group"
                    >
                      <img
                        src={species.imageUrl}
                        alt={species.name_cn}
                        className="w-12 h-12 object-cover grid-line"
                      />
                      <div className="flex-1">
                        <span className="text-label text-foreground block">
                          {species.name_cn}
                        </span>
                        <span className="text-meta text-foreground/40">
                          {species.name_scientific}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveSpecies(species.id)}
                        className="p-2 text-foreground/30 hover:text-[hsl(var(--aurora-magenta))] transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Generate Button */}
            <motion.div layout className="mt-8 pt-8 grid-line-t">
              <button
                onClick={handleGenerateRecipe}
                disabled={selectedSpecies.length === 0}
                className="w-full btn-pill py-4 flex items-center justify-center gap-3 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Recipe</span>
              </button>
            </motion.div>
          </div>

          {/* Center/Right: Digital Pot - Drop Zone */}
          <DigitalPot
            ripples={ripples}
            ingredientCount={selectedSpecies.length}
            isDraggingOver={isDraggingOver}
          />
        </section>

        {/* Safety Notice */}
        <section className="grid-line-t bg-[hsl(var(--aurora-magenta)/0.05)]">
          <div className="max-w-[1440px] mx-auto px-8 py-6 flex items-start gap-4">
            <AlertTriangle className="w-5 h-5 text-[hsl(var(--aurora-magenta))] flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-label text-foreground/80 mb-2">Cooking Safety Notice</h4>
              <p className="text-meta text-foreground/50 leading-relaxed">
                AI generated recipes are for reference only. Some wild fungi contain toxins and must be fully cooked to be safe for consumption.
                <strong className="text-[hsl(var(--aurora-magenta))]">
                  Please strictly follow the safety warnings for each recipe
                </strong>
                , improper handling may cause serious consequences.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

interface DraggableSpeciesCardProps {
  species: any;
  onDropOnPot: (species: any, x: number, y: number) => void;
  isSelected: boolean;
}

const DraggableSpeciesCard = ({ species, onDropOnPot, isSelected }: DraggableSpeciesCardProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const bind = useDrag((state) => {
    setIsDragging(!!state.dragging);
    if (state.dragging) {
      setPosition({ x: state.offset[0], y: state.offset[1] });
    } else if (state.tap === false) {
      // Check if dropped on pot area (center-right region)
      const dropX = state.xy[0];
      const dropY = state.xy[1];
      const potArea = document.getElementById("digital-pot");

      if (potArea) {
        const rect = potArea.getBoundingClientRect();
        if (
          dropX >= rect.left &&
          dropX <= rect.right &&
          dropY >= rect.top &&
          dropY <= rect.bottom
        ) {
          const relativeX = ((dropX - rect.left) / rect.width) * 2 - 1;
          const relativeY = ((dropY - rect.top) / rect.height) * 2 - 1;
          onDropOnPot(species, relativeX, relativeY);
        }
      }
      setPosition({ x: 0, y: 0 });
    }
  });

  return (
    <motion.div
      {...(bind() as any)}
      style={{
        x: position.x,
        y: position.y,
        touchAction: "none",
      }}
      className={`flex-shrink-0 w-32 cursor-grab active:cursor-grabbing ${isDragging ? "z-50" : "z-0"
        }`}
    >
      <div className={`transition-all ${isDragging ? "scale-110 rotate-3" : ""}`}>
        <div className={`aspect-square bg-card grid-line mb-2 overflow-hidden relative group ${isSelected ? "opacity-50" : ""
          }`}>
          <img
            src={species.imageUrl}
            alt={species.name_cn}
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
          />
          {!isSelected && (
            <div className="absolute inset-0 bg-background/0 group-hover:bg-[hsl(var(--aurora-cyan)/0.1)] transition-colors flex items-center justify-center">
              <Plus className="w-6 h-6 text-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </div>
        <span className="text-meta text-foreground/60 block text-center">
          {species.name_cn}
        </span>
      </div>
    </motion.div>
  );
};

interface DigitalPotProps {
  ripples: { id: number; x: number; y: number }[];
  ingredientCount: number;
  isDraggingOver: boolean;
}

const DigitalPot = ({ ripples, ingredientCount, isDraggingOver }: DigitalPotProps) => {
  return (
    <div id="digital-pot" className="relative col-span-8 flex items-center justify-center p-8 z-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="relative"
      >
        {/* Pot Visualization */}
        <div className="relative w-[500px] h-[500px]">
          {/* Steam Background - Now strictly relative to Pot circle */}
          <div className="absolute inset-0 opacity-60 pointer-events-none z-[-1]">
            <SteamScene />
          </div>
          {/* Outer Circle - Pot Rim */}
          <motion.div
            animate={{ scale: isDraggingOver ? 1.05 : 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 rounded-full border-4 border-foreground/20"
          />

          {/* Inner Circles - Soup Layers */}
          <div className="absolute inset-8 rounded-full border-2 border-[hsl(var(--aurora-cyan)/0.2)] animate-pulse" style={{ animationDuration: '3s' }} />
          <div className="absolute inset-16 rounded-full border border-[hsl(var(--aurora-magenta)/0.15)] animate-pulse" style={{ animationDuration: '4s', animationDelay: '0.5s' }} />

          {/* Center Glow - Soup */}
          <div className="absolute inset-20 rounded-full bg-gradient-to-br from-[hsl(var(--aurora-cyan)/0.15)] via-[hsl(var(--aurora-magenta)/0.1)] to-[hsl(var(--aurora-purple)/0.08)] blur-xl" />

          {/* Ripple Effects */}
          <AnimatePresence>
            {ripples.map((ripple) => (
              <motion.div
                key={ripple.id}
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="absolute rounded-full border-2 border-[hsl(var(--aurora-cyan))]"
                style={{
                  left: `${(ripple.x + 1) * 50}%`,
                  top: `${(ripple.y + 1) * 50}%`,
                  width: "100px",
                  height: "100px",
                  marginLeft: "-50px",
                  marginTop: "-50px",
                }}
              />
            ))}
          </AnimatePresence>

          {/* Ingredient Count in Center */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <motion.span
                key={ingredientCount}
                initial={{ scale: 1.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.2 }}
                className="text-8xl font-display text-foreground"
              >
                {ingredientCount}
              </motion.span>
              <span className="block text-meta text-foreground/30 mt-2">
                INGREDIENTS
              </span>
            </div>
          </div>
        </div>

        {/* Pot Label */}
        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-center">
          <span className="text-meta text-foreground/40 block">
            数字汤锅 / DIGITAL POT
          </span>
          <span className="text-meta text-foreground/20 block mt-1">
            {ingredientCount > 0
              ? "准备就绪 · 点击生成"
              : "拖拽食材至此 · DRAG HERE"}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default RecipesPage;
