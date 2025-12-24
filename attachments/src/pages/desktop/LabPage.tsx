import { motion } from "framer-motion";
import { FlaskConical, Play, Pause, RotateCcw, Settings } from "lucide-react";
import Navigation from "@/components/desktop/Navigation";
import Footer from "@/components/desktop/Footer";

const LabPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Header */}
        <section className="grid grid-cols-12 grid-line-b">
          <div className="col-span-8 grid-line-r px-8 py-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-meta text-foreground/30 block mb-4">
                03 / LABORATORY
              </span>
              <h1 className="text-7xl font-display mb-4">
                INTERACTIVE <span className="text-[hsl(var(--aurora-cyan))]">LAB</span>
              </h1>
              <p className="text-label text-foreground/50 max-w-xl">
                Mycelium growth simulation, spore dispersal visualization, ecological network modeling. Explore the mysteries of the fungal world in a digital environment.
              </p>
            </motion.div>
          </div>
          <div className="col-span-4 px-8 py-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-[hsl(var(--aurora-cyan))] animate-pulse" />
              <span className="text-label text-foreground/50">Online Users</span>
            </div>
            <span className="text-5xl font-display text-[hsl(var(--aurora-purple))]">127</span>
          </div>
        </section>

        {/* Lab Interface */}
        <section className="grid grid-cols-12 min-h-[70vh]">
          {/* Control Panel */}
          <div className="col-span-3 grid-line-r p-6">
            <h3 className="text-label text-foreground/60 mb-6">Parameters</h3>

            <div className="space-y-6">
              <div>
                <label className="text-meta text-foreground/30 block mb-2">Growth Rate</label>
                <div className="h-2 bg-card rounded-full overflow-hidden">
                  <div className="h-full w-2/3 bg-gradient-to-r from-[hsl(var(--aurora-cyan))] to-[hsl(var(--aurora-purple))]" />
                </div>
              </div>

              <div>
                <label className="text-meta text-foreground/30 block mb-2">Nutrient Density</label>
                <div className="h-2 bg-card rounded-full overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-[hsl(var(--aurora-magenta))] to-[hsl(var(--aurora-gold))]" />
                </div>
              </div>

              <div>
                <label className="text-meta text-foreground/30 block mb-2">Temperature (°C)</label>
                <input
                  type="number"
                  defaultValue={25}
                  className="w-full bg-card border border-border px-4 py-2 text-label text-foreground"
                  disabled
                />
              </div>

              <div>
                <label className="text-meta text-foreground/30 block mb-2">Humidity (%)</label>
                <input
                  type="number"
                  defaultValue={85}
                  className="w-full bg-card border border-border px-4 py-2 text-label text-foreground"
                  disabled
                />
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center gap-2 mt-8 pt-8 grid-line-t">
              <button className="flex-1 py-3 grid-line flex items-center justify-center gap-2 text-label text-foreground/50 hover:text-foreground hover:bg-card transition-colors">
                <Play className="w-4 h-4 text-[hsl(var(--aurora-cyan))]" />
              </button>
              <button className="flex-1 py-3 grid-line flex items-center justify-center gap-2 text-label text-foreground/50 hover:text-foreground hover:bg-card transition-colors">
                <Pause className="w-4 h-4 text-[hsl(var(--aurora-cyan))]" />
              </button>
              <button className="flex-1 py-3 grid-line flex items-center justify-center gap-2 text-label text-foreground/50 hover:text-foreground hover:bg-card transition-colors">
                <RotateCcw className="w-4 h-4 text-[hsl(var(--aurora-cyan))]" />
              </button>
            </div>
          </div>

          {/* Simulation Area */}
          <div className="col-span-9 relative bg-card flex items-center justify-center aurora-animated">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="text-center"
            >
              <FlaskConical className="w-24 h-24 text-foreground/10 mx-auto mb-6" />
              <span className="text-meta text-foreground/30 block">
                // Mycelium Simulation Coming Soon //
              </span>
              <span className="text-label text-foreground/20 block mt-2">
                SIMULATION.ENGINE.LOADING
              </span>
            </motion.div>

            {/* Decorative Grid */}
            <div className="absolute inset-8 grid grid-cols-8 grid-rows-8 pointer-events-none opacity-20">
              {Array.from({ length: 64 }).map((_, i) => (
                <div key={i} className="border border-foreground/10" />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default LabPage;
