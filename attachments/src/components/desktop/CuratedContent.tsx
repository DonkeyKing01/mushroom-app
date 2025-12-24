import { motion } from "framer-motion";
import { AlertTriangle, Sparkles, ChevronRight } from "lucide-react";

const dailyFungus = {
  name: "Chanterelle",
  nameEn: "Cantharellus cibarius",
  classification: "Basidiomycota / Cantharellaceae",
  description: "Golden edible fungus with a unique apricot aroma. Commonly found in mixed coniferous forests in summer and autumn.",
  edibility: "Edible",
  imageUrl: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=800&auto=format",
};

const alerts = [
  {
    type: "warning",
    region: "YUNNAN",
    content: "High season for wild mushroom poisoning, avoid unknown species",
    time: "2h ago",
  },
  {
    type: "discovery",
    region: "SICHUAN",
    content: "Discovery: Rare Blue Net Puffball recorded at Mount Emei",
    time: "5h ago",
  },
  {
    type: "info",
    region: "GLOBAL",
    content: "Spore density index increased by 23% this week",
    time: "1d ago",
  },
];

const CuratedContent = () => {
  return (
    <section className="grid-line-t">
      {/* Section Header */}
      <div className="grid grid-cols-12 grid-line-b">
        <div className="col-span-12 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-meta text-foreground/30">03</span>
            <h2 className="text-label text-foreground/60">CURATED</h2>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-12">
        {/* Daily Fungus Card - 8 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="col-span-8 grid-line-r p-8"
        >
          <div className="flex items-start gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-[hsl(var(--aurora-gold))]" />
            <span className="text-meta text-foreground/40">DAILY SPECIMEN</span>
          </div>

          <div className="grid grid-cols-2 gap-8">
            {/* Image */}
            <div className="relative aspect-[4/3] overflow-hidden grid-line group">
              <img
                src={dailyFungus.imageUrl}
                alt={dailyFungus.name}
                className="absolute inset-0 w-full h-full object-cover grayscale-hover"
              />
              {/* Overlay Grid */}
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div key={i} className="border border-foreground/5" />
                ))}
              </div>
              {/* Corner Label */}
              <span className="absolute bottom-3 left-3 text-meta text-foreground/60 bg-background/80 px-2 py-1">
                SPECIMEN.{String(Math.floor(Math.random() * 9000) + 1000)}
              </span>
            </div>

            {/* Info */}
            <div className="flex flex-col">
              <span className="text-meta text-foreground/30 mb-2">
                {dailyFungus.classification}
              </span>
              <h3 className="text-display-lg font-display mb-1">
                {dailyFungus.name}
              </h3>
              <span className="text-label text-foreground/40 italic mb-4">
                {dailyFungus.nameEn}
              </span>
              <p className="text-label text-foreground/50 leading-relaxed mb-6">
                {dailyFungus.description}
              </p>
              <div className="mt-auto flex items-center justify-between">
                <span className="text-meta px-3 py-1 bg-[hsl(var(--aurora-cyan)/0.1)] text-[hsl(var(--aurora-cyan))]">
                  {dailyFungus.edibility}
                </span>
                <button className="text-label text-foreground/40 hover:text-foreground transition-colors inline-flex items-center gap-1 group">
                  VIEW DETAILS
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Alert Stream - 4 columns */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="col-span-4 p-8"
        >
          <div className="flex items-start gap-2 mb-6">
            <AlertTriangle className="w-4 h-4 text-[hsl(var(--aurora-magenta))]" />
            <span className="text-meta text-foreground/40">LIVE FEED</span>
          </div>

          <div className="space-y-4">
            {alerts.map((alert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="group p-4 grid-line hover:bg-card transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`text-meta px-2 py-0.5 ${alert.type === "warning"
                        ? "bg-[hsl(var(--aurora-magenta)/0.1)] text-[hsl(var(--aurora-magenta))]"
                        : alert.type === "discovery"
                          ? "bg-[hsl(var(--aurora-cyan)/0.1)] text-[hsl(var(--aurora-cyan))]"
                          : "bg-foreground/5 text-foreground/40"
                      }`}
                  >
                    {alert.region}
                  </span>
                  <span className="text-meta text-foreground/30">{alert.time}</span>
                </div>
                <p className="text-label text-foreground/60 group-hover:text-foreground transition-colors">
                  {alert.content}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ticker */}
      <div className="grid-line-t overflow-hidden py-3 bg-card/50">
        <div className="animate-ticker whitespace-nowrap">
          <span className="text-meta text-foreground/30 inline-block">
            INFO: Spore Density Index 84% ↑ — New Assets Uploaded — Yunnan High Risk Alert — 47 New Records Found This Week —
            INFO: Spore Density Index 84% ↑ — New Assets Uploaded — Yunnan High Risk Alert — 47 New Records Found This Week —
          </span>
        </div>
      </div>
    </section>
  );
};

export default CuratedContent;
