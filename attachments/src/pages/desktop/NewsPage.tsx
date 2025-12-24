import { motion } from "framer-motion";
import Navigation from "@/components/desktop/Navigation";
import Footer from "@/components/desktop/Footer";
import { Newspaper, ArrowUpRight } from "lucide-react";

const NewsPage = () => {
    return (
        <div className="min-h-screen bg-background text-foreground">
            <Navigation />
            <main className="pt-24 pb-16">
                <section className="grid-line-b mb-12">
                    <div className="max-w-[1440px] mx-auto px-8 pb-8">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-meta text-foreground/30 block mb-4">
                                05 / NEWS
                            </span>
                            <h1 className="text-7xl font-display mb-6">
                                MYCO <span className="text-[hsl(var(--aurora-cyan))]">NEWS</span>
                            </h1>
                            <p className="text-label text-foreground/50 max-w-xl">
                                Latest discoveries in mycology, community updates, and project announcements from the MycoNexus network.
                            </p>
                        </motion.div>
                    </div>
                </section>

                <div className="max-w-[1440px] mx-auto px-8">
                    <div className="flex flex-col gap-6">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-card grid-line overflow-hidden flex flex-col md:flex-row items-stretch hover:border-[hsl(var(--aurora-cyan))] transition-colors border border-transparent min-h-[160px]"
                            >
                                {/* Left: Image Placeholder */}
                                <div className="w-full md:w-[280px] flex-shrink-0 bg-background/50 flex items-center justify-center grid-line-r overflow-hidden relative">
                                    <img
                                        src={`https://images.unsplash.com/photo-${[
                                            "1509358271058-acd22cc93898",
                                            "1504545102780-26774c1bb073",
                                            "1512411516752-7724a9bf942b",
                                            "1588666309990-d68f08e3d4a6"
                                        ][(i - 1) % 4]}?w=800&auto=format&fit=crop`}
                                        className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 opacity-40 group-hover:opacity-100"
                                        alt="News thumbnail"
                                    />
                                    <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-colors z-[1]" />
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/90 z-[2]" />
                                    <Newspaper className="w-10 h-10 text-[hsl(var(--aurora-cyan))/10] absolute z-0" />
                                    {/* Link Icon Overlay */}
                                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                                        <ArrowUpRight className="w-5 h-5 text-[hsl(var(--aurora-cyan))]" />
                                    </div>
                                </div>

                                {/* Right: Content */}
                                <div className="flex-1 p-6 flex flex-col justify-center">
                                    <div className="flex items-center gap-4 mb-2">
                                        <span className="text-meta text-[hsl(var(--aurora-cyan))]">
                                            DEC {24 - i}, 2025
                                        </span>
                                        <div className="w-1.5 h-1.5 rounded-full bg-border" />
                                        <span className="text-meta text-foreground/30 uppercase tracking-widest font-mono">
                                            Discovery
                                        </span>
                                    </div>
                                    <h3 className="text-xl font-display mb-3 group-hover:text-[hsl(var(--aurora-cyan))] transition-colors leading-tight">
                                        Advanced Mycelium Network Research in Southern Regions
                                    </h3>
                                    <p className="text-sm text-foreground/60 max-w-3xl line-clamp-1">
                                        Recent fieldwork has uncovered a complex subterranean communication bridge between several endangered fungal colonies, suggesting a higher level of ecological intelligence...
                                    </p>
                                </div>

                                {/* Hover Accent Line */}
                                <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-[hsl(var(--aurora-cyan))] group-hover:w-full transition-all duration-500" />
                            </motion.article>
                        ))}
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default NewsPage;
