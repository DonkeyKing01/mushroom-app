import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import NotFound from "@/pages/NotFound";
import DiscoveryHome from "@/pages/desktop/DiscoveryHome";
import ArchivePage from "@/pages/desktop/ArchivePage";
import SpeciesDetailPage from "@/pages/desktop/SpeciesDetailPage";
import MapPage from "@/pages/desktop/MapPage";
import LabPage from "@/pages/desktop/LabPage";
import RecipesPage from "@/pages/desktop/RecipesPage";
import RecipeDetailPage from "@/pages/desktop/RecipeDetailPage";

const queryClient = new QueryClient();

const App = () => (
  <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false} disableTransitionOnChange>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DiscoveryHome />} />
            <Route path="/archive" element={<ArchivePage />} />
            <Route path="/archive/:id" element={<SpeciesDetailPage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/lab" element={<LabPage />} />
            <Route path="/recipes" element={<RecipesPage />} />
            <Route path="/recipes/:id" element={<RecipeDetailPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ThemeProvider>
);

export default App;
