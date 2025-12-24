import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Layers,
  MapPin,
  Users,
  TrendingUp,
  Plus,
  X,
  Thermometer,
  Droplets,
  AlertTriangle,
  Radio,
  Circle,
} from "lucide-react";
import Navigation from "@/components/desktop/Navigation";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "sonner";

// Mock data
const mockRegions = [
  { id: "yunnan", name: "Yunnan", x: 30, y: 60, heat: 95, posts: 127, humidity: 85, temp: 22, risk: "high" },
  { id: "sichuan", name: "Sichuan", x: 45, y: 45, heat: 78, posts: 89, humidity: 75, temp: 18, risk: "medium" },
  { id: "guizhou", name: "Guizhou", x: 38, y: 55, heat: 62, posts: 54, humidity: 80, temp: 20, risk: "medium" },
  { id: "guangxi", name: "Guangxi", x: 42, y: 72, heat: 45, posts: 31, humidity: 70, temp: 25, risk: "low" },
  { id: "tibet", name: "Tibet", x: 15, y: 35, heat: 12, posts: 8, humidity: 40, temp: 12, risk: "low" },
];

const mockPosts = [
  { id: 1, region: "yunnan", x: 32, y: 58, author: "Fungi Hunter", content: "Found lots of Lanmaoa asiatica, Location: Kunming Xishan", species: "Lanmaoa asiatica", time: "2h ago", avatar: "🍄" },
  { id: 2, region: "yunnan", x: 28, y: 62, author: "Mycologist", content: "Attention! Large appearance of fungi after rain this week", species: null, time: "5h ago", avatar: "🔬" },
  { id: 3, region: "sichuan", x: 46, y: 43, author: "Master Picker", content: "Rare Blue Puffball found at Mount Emei", species: "Puffball", time: "1d ago", avatar: "🌟" },
  { id: 4, region: "sichuan", x: 44, y: 47, author: "Explorer", content: "Matsutake season begins", species: "Matsutake", time: "2d ago", avatar: "🏔️" },
];

const mockTopRegions = [
  { rank: 1, name: "Kunming", posts: 99, trend: "+23%" },
  { rank: 2, name: "Mt Emei", posts: 84, trend: "+18%" },
  { rank: 3, name: "Chuxiong", posts: 67, trend: "+12%" },
  { rank: 4, name: "Dali", posts: 52, trend: "+8%" },
  { rank: 5, name: "Lijiang", posts: 48, trend: "+5%" },
];

const mockTopSpecies = [
  { rank: 1, name: "Lanmaoa asiatica", count: 234, risk: "Cook Well" },
  { rank: 2, name: "Matsutake", count: 189, risk: "Safe" },
  { rank: 3, name: "Chanterelle", count: 156, risk: "Safe" },
  { rank: 4, name: "Porcini", count: 142, risk: "Safe" },
  { rank: 5, name: "Morel", count: 128, risk: "Safe" },
];

const mockActiveUsers = [
  { id: 1, name: "Fungi Hunter", posts: 47, status: "online", lastSeen: "Just now" },
  { id: 2, name: "Mycologist", posts: 32, status: "online", lastSeen: "5m ago" },
  { id: 3, name: "Master Picker", posts: 28, status: "offline", lastSeen: "1h ago" },
  { id: 4, name: "Explorer", posts: 19, status: "online", lastSeen: "Just now" },
];

const MapPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [layerEnv, setLayerEnv] = useState(true);
  const [layerSpecies, setLayerSpecies] = useState(true);
  const [layerSignals, setLayerSignals] = useState(true);
  const [selectedRegion, setSelectedRegion] = useState(mockRegions[0]);
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [isPostModalOpen, setIsPostModalOpen] = useState(false);
  const [isPublishMode, setIsPublishMode] = useState(false);

  const handleRegionClick = (region: any) => {
    setSelectedRegion(region);
    toast.success(`Focused on ${region.name}`);
  };

  const handlePostClick = (post: any) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

  const handlePublish = () => {
    setIsPublishMode(true);
    toast.info("Click anywhere on map to publish");
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isPublishMode) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      toast.success(`Flag planted at (${x.toFixed(1)}, ${y.toFixed(1)})`);
      setIsPublishMode(false);
    }
  };

  return (
    <div className="h-screen bg-background overflow-hidden">
      <Navigation />

      {/* Main Map Container */}
      <div className="relative h-full pt-16">
        {/* Left Sidebar - Control Panel */}
        <aside className="absolute left-0 top-16 bottom-0 w-80 bg-background/80 backdrop-blur-md grid-line-r z-20 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Search */}
            <div>
              <h3 className="text-meta text-foreground/40 mb-3">Global Search</h3>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-foreground/30" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Region or species..."
                  className="w-full bg-card border border-border pl-10 pr-3 py-2 text-label text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-[hsl(var(--aurora-cyan))]"
                />
              </div>
            </div>

            {/* Layer Controls */}
            <div>
              <h3 className="text-meta text-foreground/40 mb-3 flex items-center gap-2">
                <Layers className="w-3 h-3 text-[hsl(var(--aurora-cyan))]" />
                Layer Control
              </h3>
              <div className="space-y-3">
                <LayerToggle
                  label="Environment"
                  sublabel="Temp/Humidity Heat"
                  checked={layerEnv}
                  onChange={setLayerEnv}
                />
                <LayerToggle
                  label="Species"
                  sublabel="Distribution Heat"
                  checked={layerSpecies}
                  onChange={setLayerSpecies}
                />
                <LayerToggle
                  label="Signals"
                  sublabel="User Posts"
                  checked={layerSignals}
                  onChange={setLayerSignals}
                />
              </div>
            </div>

            {/* Current Region Dashboard */}
            <div className="p-4 bg-card grid-line">
              <h3 className="text-meta text-foreground/40 mb-4">Region Dashboard</h3>

              <div className="mb-4">
                <span className="text-label text-foreground">{selectedRegion.name}</span>
                <span className="text-meta text-foreground/30 block mt-1">
                  {selectedRegion.posts} Signals
                </span>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-meta text-foreground/40 flex items-center gap-2">
                    <Droplets className="w-3 h-3" />
                    Humidity
                  </span>
                  <span className="text-label text-[hsl(var(--aurora-cyan))]">
                    {selectedRegion.humidity}%
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-meta text-foreground/40 flex items-center gap-2">
                    <Thermometer className="w-3 h-3" />
                    Temp
                  </span>
                  <span className="text-label text-foreground">
                    {selectedRegion.temp}°C
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-meta text-foreground/40 flex items-center gap-2">
                    <AlertTriangle className="w-3 h-3" />
                    Risk Level
                  </span>
                  <span className={`text-label ${selectedRegion.risk === "high"
                    ? "text-[hsl(var(--aurora-magenta))]"
                    : selectedRegion.risk === "medium"
                      ? "text-[hsl(var(--aurora-gold))]"
                      : "text-[hsl(var(--aurora-cyan))]"
                    }`}>
                    {selectedRegion.risk === "high" ? "High" : selectedRegion.risk === "medium" ? "Med" : "Low"}
                  </span>
                </div>

                <div className="pt-3 mt-3 grid-line-t">
                  <span className="text-meta text-foreground/30">Habitability Index</span>
                  <div className="h-2 bg-foreground/10 rounded-full mt-2 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[hsl(var(--aurora-cyan))] to-[hsl(var(--aurora-purple))]"
                      style={{ width: `${selectedRegion.humidity}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Right Sidebar - Rankings & Users */}
        <aside className="absolute right-0 top-16 bottom-0 w-80 bg-background/80 backdrop-blur-md grid-line-l z-20 overflow-y-auto">
          <Tabs defaultValue="hot" className="h-full">
            <TabsList className="w-full grid grid-cols-2 bg-card/50 p-1 m-4">
              <TabsTrigger value="hot" className="text-meta data-[state=active]:bg-background">
                Trending
              </TabsTrigger>
              <TabsTrigger value="users" className="text-meta data-[state=active]:bg-background">
                Contacts
              </TabsTrigger>
            </TabsList>

            <TabsContent value="hot" className="px-6 pb-6 space-y-6 mt-0">
              {/* Top Regions */}
              <div>
                <h3 className="text-meta text-foreground/40 mb-3 flex items-center gap-2">
                  <TrendingUp className="w-3 h-3" />
                  TOP 5 REGIONS
                </h3>
                <div className="space-y-2">
                  {mockTopRegions.map((region) => (
                    <button
                      key={region.rank}
                      onClick={() => {
                        const targetRegion = mockRegions.find(r => r.name.includes(region.name));
                        if (targetRegion) handleRegionClick(targetRegion);
                      }}
                      className="w-full p-3 bg-card hover:bg-card/70 grid-line flex items-center gap-3 transition-colors text-left"
                    >
                      <span className="text-xl font-display text-foreground/30 w-8">
                        {String(region.rank).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <span className="text-label text-foreground block">
                          {region.name}
                        </span>
                        <span className="text-meta text-foreground/40">
                          {region.posts} Signals
                        </span>
                      </div>
                      <span className="text-meta text-[hsl(var(--aurora-cyan))]">
                        {region.trend}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Top Species */}
              <div>
                <h3 className="text-meta text-foreground/40 mb-3">
                  Top Weekly Species
                </h3>
                <div className="space-y-2">
                  {mockTopSpecies.map((species) => (
                    <div
                      key={species.rank}
                      className="p-3 bg-card grid-line flex items-center gap-3"
                    >
                      <span className="text-xl font-display italic text-foreground/30 w-8">
                        {String(species.rank).padStart(2, "0")}
                      </span>
                      <div className="flex-1">
                        <span className="text-label text-foreground block">
                          {species.name}
                        </span>
                        <span className={`text-meta ${species.risk.includes("危险") || species.risk.includes("充分")
                          ? "text-[hsl(var(--aurora-magenta))]"
                          : "text-foreground/40"
                          }`}>
                          {species.risk}
                        </span>
                      </div>
                      <span className="text-meta text-foreground/30">
                        {species.count}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="users" className="px-6 pb-6 mt-0">
              <h3 className="text-meta text-foreground/40 mb-3 flex items-center gap-2">
                <Users className="w-3 h-3" />
                Active Users Nearby
              </h3>
              <div className="space-y-2">
                {mockActiveUsers.map((user) => (
                  <button
                    key={user.id}
                    className="w-full p-3 bg-card hover:bg-card/70 grid-line flex items-center gap-3 transition-colors text-left"
                  >
                    <div className="w-8 h-8 rounded-full bg-[hsl(var(--aurora-purple)/0.2)] flex items-center justify-center text-lg">
                      {user.name[0]}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-label text-foreground">
                          {user.name}
                        </span>
                        {user.status === "online" && (
                          <Circle className="w-2 h-2 fill-[hsl(var(--aurora-cyan))] text-[hsl(var(--aurora-cyan))]" />
                        )}
                      </div>
                      <span className="text-meta text-foreground/40">
                        {user.posts} Contributions · {user.lastSeen}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </aside>

        {/* Map Canvas */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-background via-background to-card/50"
          style={{ cursor: isPublishMode ? "crosshair" : "default" }}
          onClick={handleMapClick}
        >
          {/* Region Polygons with Heatmap */}
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
            {mockRegions.map((region) => {
              const heatOpacity = region.heat / 100;
              return (
                <g key={region.id}>
                  {/* Region Area (simplified polygon) */}
                  <circle
                    cx={region.x}
                    cy={region.y}
                    r="8"
                    fill={layerEnv ? `hsla(var(--aurora-${region.risk === "high" ? "magenta" : region.risk === "medium" ? "gold" : "cyan"}), ${heatOpacity * 0.3})` : "transparent"}
                    stroke="hsl(var(--aurora-gold))"
                    strokeWidth="0.2"
                    className="cursor-pointer hover:fill-opacity-50 transition-all"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRegionClick(region);
                    }}
                  />

                  {/* Region Label */}
                  <text
                    x={region.x}
                    y={region.y - 10}
                    textAnchor="middle"
                    className="text-[0.8px] fill-foreground/60 font-mono uppercase tracking-wider pointer-events-none"
                  >
                    {region.name}
                  </text>
                </g>
              );
            })}

            {/* Signal Posts */}
            {layerSignals && mockPosts.map((post) => (
              <g key={post.id}>
                <circle
                  cx={post.x}
                  cy={post.y}
                  r="1.5"
                  fill="hsl(var(--aurora-cyan))"
                  className="cursor-pointer animate-pulse"
                  style={{ animationDuration: "2s" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePostClick(post);
                  }}
                />
                <circle
                  cx={post.x}
                  cy={post.y}
                  r="2.5"
                  fill="none"
                  stroke="hsl(var(--aurora-cyan))"
                  strokeWidth="0.3"
                  opacity="0.5"
                  className="animate-ping"
                  style={{ animationDuration: "3s" }}
                />
              </g>
            ))}
          </svg>

          {/* Grid Overlay */}
          <div className="absolute inset-0 pointer-events-none opacity-10">
            <div className="w-full h-full grid grid-cols-10 grid-rows-10">
              {Array.from({ length: 100 }).map((_, i) => (
                <div key={i} className="border border-foreground/10" />
              ))}
            </div>
          </div>

          {/* Coordinate Label */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-meta text-foreground/30 pointer-events-none">
            MAP.VIEW.CHINA / Real-time Fungal Distribution Monitor
          </div>
        </div>

        {/* FAB - Publish Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePublish}
          className={`fixed bottom-8 right-8 w-16 h-16 rounded-full flex items-center justify-center z-30 transition-all ${isPublishMode
            ? "bg-[hsl(var(--aurora-magenta))] rotate-45"
            : "bg-[hsl(var(--aurora-cyan))] hover:glow-cyan"
            }`}
        >
          <Plus className="w-8 h-8 text-background" />
        </motion.button>

        {/* Post Modal */}
        <Dialog open={isPostModalOpen} onOpenChange={setIsPostModalOpen}>
          <DialogContent className="bg-background/95 backdrop-blur-md border-border max-w-2xl">
            {selectedPost && (
              <div className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-[hsl(var(--aurora-purple)/0.2)] flex items-center justify-center text-2xl">
                    {selectedPost.avatar}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-label text-foreground">
                        {selectedPost.author}
                      </span>
                      <span className="text-meta text-foreground/30">
                        {selectedPost.time}
                      </span>
                    </div>
                    <span className="text-meta text-foreground/40">
                      {selectedPost.region} ·
                      {selectedPost.species && ` #${selectedPost.species}`}
                    </span>
                  </div>
                </div>

                <p className="text-label text-foreground/80 leading-relaxed mb-6">
                  {selectedPost.content}
                </p>

                {/* Mock Image */}
                <div className="aspect-video bg-card grid-line mb-4 flex items-center justify-center">
                  <MapPin className="w-12 h-12 text-foreground/10" />
                </div>

                <div className="flex items-center justify-between text-meta text-foreground/40">
                  <span>Coords: {selectedPost.x.toFixed(2)}, {selectedPost.y.toFixed(2)}</span>
                  <span>27 Likes · 8 Comments</span>
                </div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

interface LayerToggleProps {
  label: string;
  sublabel: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const LayerToggle = ({ label, sublabel, checked, onChange }: LayerToggleProps) => {
  return (
    <button
      onClick={() => onChange(!checked)}
      className="w-full p-3 bg-card hover:bg-card/70 grid-line flex items-center justify-between transition-colors text-left"
    >
      <div>
        <span className="text-label text-foreground block">{label}</span>
        <span className="text-meta text-foreground/40">{sublabel}</span>
      </div>
      <div
        className={`w-10 h-5 rounded-full transition-colors ${checked ? "bg-[hsl(var(--aurora-cyan))]" : "bg-foreground/20"
          }`}
      >
        <motion.div
          animate={{ x: checked ? 20 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 rounded-full bg-background"
        />
      </div>
    </button>
  );
};

export default MapPage;
