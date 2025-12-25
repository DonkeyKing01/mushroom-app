import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Clock, User, Share2, Bookmark, Newspaper } from "lucide-react";
import Navigation from "@/components/desktop/Navigation";
import Footer from "@/components/desktop/Footer";

const mockNewsDetails = {
    "1": {
        title: "Bio-luminescent Mycelium Networks Discovered in Deep Caves",
        date: "DEC 24, 2025",
        category: "Discovery",
        image: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&auto=format&fit=crop",
        author: "Dr. Elena Moss",
        content: `
      <p>Researchers exploring the deepest reaches of the karst cave systems in Southeast Asia have reported a breakthrough discovery: a vast, interconnected network of bio-luminescent mycelium. Unlike previously known luminous fungi, this strain, tentatively named <i>Mycena Astraeus</i>, emits a consistent cyan glow that pulses in rhythm with subterranean air currents.</p>
      
      <p>The discovery was made by a joint expedition featuring mycologists and speleologists. "The sight was ethereal," says Dr. Elena Moss, lead researcher on the project. "An entire cavern floor carpeted in soft, neon light. It wasn't just beautiful; it appeared to be a functional navigation system for the endemic cave fauna."</p>
      
      <h3>The Mechanism of Light</h3>
      <p>Initial analysis suggests that the luminescence is triggered by chemical reactions involving luciferase enzymes, much like fireflies. However, the scale of this network is unprecedented. Preliminary sensors indicate the mycelium spans several kilometers, linking disparate cave ecosystems through a "glowing highway" of fungal threads.</p>
      
      <h3>Ecological Implications</h3>
      <p>This discovery provides new insights into how life thrives in total darkness. The mycelium acts as a primary producer in an ecosystem devoid of sunlight, potentially supporting a complex food web of blind insects and crustaceans. Further research is planned to understand if the light pulses are a form of communication between colonies.</p>
    `
    },
    "2": {
        title: "Sustainable Architecture: Building with Mushroom Bricks",
        date: "DEC 22, 2025",
        category: "Technology",
        image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop",
        author: "Marcus Thorne",
        content: `
      <p>As the construction industry seeks carbon-neutral alternatives to concrete and steel, the answer might lie beneath our feet. MycoBuild, a biotechnology startup, has successfully demonstrated the use of fungal hyphae to create structural bricks that are not only sustainable but also possess remarkable insulating properties.</p>
      
      <h3>From Agricultural Waste to Bricks</h3>
      <p>The process involves inoculating agricultural waste—such as hemp husks or corn stalks—with specific mushroom spores. Within days, the mycelium binds the substrate into a dense, solid mass. The material is then heat-treated to stop growth and solidify the structure.</p>
      
      <h3>Performance Metrics</h3>
      <p>According to structural engineer Marcus Thorne, "Myco-bricks have a high strength-to-weight ratio and are naturally fire-resistant. They outperform traditional expanded polystyrene in thermal insulation and have a negative carbon footprint, as they sequester carbon during the growth phase."</p>
      
      <p>The first prototype structure, a small community pavilion, is currently under construction and is expected to be completed by early next year.</p>
    `
    },
    "3": {
        title: "AI-Driven Fungal Identification App Surpasses Human Accuracy",
        date: "DEC 21, 2025",
        category: "Innovation",
        image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1200&auto=format&fit=crop",
        author: "Network Core",
        content: `
      <p>The MycoNexus Network has officially launched its version 4.0 identification engine, marking a significant milestone in digital mycology. In a controlled field test, the AI-driven application achieved a 99.8% identification accuracy rate, outperforming a panel of expert mycologists in the field.</p>
      
      <h3>Deep Learning in the Dirt</h3>
      <p>The engine utilizes a sophisticated multi-modal deep learning model trained on over 100 million verified field samples. Unlike previous iterations, version 4.0 analyzes more than just visual data; it considers geological location, climate history, and even microscopic spore patterns via phone-attachable macro lenses.</p>
      
      <h3>Citizen Science Empowered</h3>
      <p>This tool is designed to empower citizen scientists and amateur foragers. By providing instant, high-accuracy identification, MycoNexus aims to reduce accidental poisonings and accelerate the mapping of global fungal biodiversity in the face of rapid climate change.</p>
    `
    },
    "4": {
        title: "Global Spore Dispersal Patterns Shift Due to Climate Change",
        date: "DEC 19, 2025",
        category: "Environmental",
        image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?w=1200&auto=format&fit=crop",
        author: "Prof. Silas Vane",
        content: `
      <p>A comprehensive study published this week in the Journal of Fungal Ecology has highlighted a dramatic shift in how mushroom spores are traveling across the planet. Rising global temperatures and shifting atmospheric currents are literal "winds of change" for the fungal kingdom.</p>
      
      <h3>Migration to the Poles</h3>
      <p>Tracking data from the MycoNexus global sensor array shows that species traditionally restricted to tropical and equatorial regions are now appearing in temperate and even sub-arctic zones. "We are seeing a massive northward migration," says Prof. Silas Vane, the study's lead author.</p>
      
      <h3>Ecological Disruptions</h3>
      <p>This migration isn't without its risks. Invasive fungal species can disrupt local symbiotic relationships between native fungi and forest trees. These shifts could have cascading effects on forest health and agriculture worldwide, necessitating a global monitoring strategy.</p>
    `
    }
};

const NewsDetailPage = () => {
    const { id } = useParams();
    const news = id ? (mockNewsDetails as Record<string, any>)[id] : null;

    if (!news) {
        return (
            <div className="min-h-screen bg-background flex flex-col items-center justify-center p-8">
                <h1 className="text-4xl font-display mb-4">Article Not Found</h1>
                <Link to="/news" className="btn-pill px-6 py-2">Back to News</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navigation />

            <main className="pt-24 pb-32">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Breadcrumbs / Back */}
                    <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-12"
                    >
                        <Link to="/news" className="group flex items-center gap-2 text-meta text-foreground/40 hover:text-[hsl(var(--aurora-cyan))] transition-colors">
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            BACK TO NETWORK NEWS
                        </Link>
                    </motion.div>

                    {/* Article Header */}
                    <header className="mb-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <span className="px-3 py-1 bg-[hsl(var(--aurora-cyan)/0.1)] text-[hsl(var(--aurora-cyan))] text-[10px] font-mono tracking-widest uppercase rounded-full border border-[hsl(var(--aurora-cyan)/0.2)]">
                                    {news.category}
                                </span>
                                <div className="flex items-center gap-2 text-meta text-foreground/30">
                                    <Clock className="w-3.5 h-3.5" />
                                    {news.date}
                                </div>
                            </div>

                            <h1 className="text-5xl md:text-6xl font-display leading-[1.1] mb-8">
                                {news.title}
                            </h1>

                            <div className="flex items-center justify-between py-6 grid-line-y">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-[hsl(var(--aurora-cyan)/0.1)] flex items-center justify-center border border-border">
                                        <User className="w-5 h-5 text-[hsl(var(--aurora-cyan))]" />
                                    </div>
                                    <div>
                                        <span className="block text-meta text-foreground/40 uppercase tracking-wider leading-none mb-1">Written By</span>
                                        <span className="text-label text-foreground">{news.author}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <button className="p-3 rounded-full border border-border hover:bg-card/50 transition-colors">
                                        <Bookmark className="w-5 h-5 text-foreground/40" />
                                    </button>
                                    <button className="p-3 rounded-full border border-border hover:bg-card/50 transition-colors">
                                        <Share2 className="w-5 h-5 text-foreground/40" />
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </header>

                    {/* Hero Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="aspect-[21/9] bg-card grid-line overflow-hidden mb-16 relative"
                    >
                        <img
                            src={news.image}
                            className="w-full h-full object-cover"
                            alt={news.title}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
                    </motion.div>

                    {/* Article Content */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="prose prose-invert prose-emerald max-w-none text-lg leading-relaxed text-foreground/70"
                    >
                        <div dangerouslySetInnerHTML={{ __html: news.content }} />
                    </motion.div>

                    {/* Footer Navigation */}
                    <footer className="mt-24 pt-12 grid-line-t">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                            <div className="flex items-center gap-4">
                                <Newspaper className="w-8 h-8 text-[hsl(var(--aurora-cyan)/0.2)]" />
                                <span className="text-meta text-foreground/30 uppercase tracking-widest">
                                    MYCONEXUS RESEARCH JOURNAL NO. 042-X
                                </span>
                            </div>
                            <Link to="/news" className="btn-pill px-8 py-3 flex items-center gap-3">
                                <span>View More Articles</span>
                                <ArrowLeft className="w-4 h-4 rotate-180" />
                            </Link>
                        </div>
                    </footer>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default NewsDetailPage;
