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
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <motion.article
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative bg-card grid-line overflow-hidden p-6 hover:border-[hsl(var(--aurora-cyan))] transition-colors border border-transparent"
                            >
                                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity">
                                    <ArrowUpRight className="w-5 h-5 text-[hsl(var(--aurora-cyan))]" />
                                </div>
                                <div className="aspect-video bg-background/50 mb-6 flex items-center justify-center">
                                    <Newspaper className="w-8 h-8 text-[hsl(var(--aurora-cyan))/20]" />
                                </div>
                                <span className="text-meta text-[hsl(var(--aurora-cyan))] block mb-2">
                                    DEC 24, 2025
                                </span>
                                <h3 className="text-2xl font-display mb-3 group-hover:text-[hsl(var(--aurora-cyan))] transition-colors">
                                    New Fungal Species Discovered in Yunnan
                                </h3>
                                <p className="text-label text-foreground/60">
                                    Researchers have identified a bioluminescent mushroom previously unknown to science...
                                </p>
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
