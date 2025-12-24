import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Users,
  Flame,
  AlertTriangle,
  Sparkles,
  Circle,
  CircleDot,
} from "lucide-react";
import Navigation from "@/components/desktop/Navigation";
import Footer from "@/components/desktop/Footer";

// Mock AI generated recipe
const mockRecipe = {
  title: "Matsutake & Chanterelle Supreme Soup",
  difficulty: "intermediate",
  difficultyLabel: "Intermediate",
  cookingTime: 45,
  servings: 2,
  description: "A fusion of two premium edible fungi. The clear soup base locks in the mushroom aroma, revealing true flavor in simplicity.",
  ingredients: [
    { name: "Matsutake", quantity: "150g", isMain: true },
    { name: "Chanterelle", quantity: "100g", isMain: true },
    { name: "Old Hen", quantity: "Half", isMain: false },
    { name: "Ginger", quantity: "3 slices", isMain: false },
    { name: "Water", quantity: "1500ml", isMain: false },
  ],
  steps: [
    {
      number: 1,
      instruction: "Gently wipe the mud off the Matsutake surface with a damp cloth and slice. Clean the Chanterelles and tear into small pieces.",
      duration: 10,
      temperature: null,
    },
    {
      number: 2,
      instruction: "Cut the hen into pieces, blanch in cold water to remove blood foam, then rinse clean.",
      duration: 15,
      temperature: "High Heat",
    },
    {
      number: 3,
      instruction: "Boil water, add chicken and ginger, then simmer on low heat for 30 minutes until the soup turns whitish.",
      duration: 30,
      temperature: "Low Heat",
    },
    {
      number: 4,
      instruction: "Add Chanterelles and continue simmering for 15 minutes to fully release the mushroom aroma.",
      duration: 15,
      temperature: "Low Heat",
    },
    {
      number: 5,
      instruction: "Finally add Matsutake slices, boil for 3-5 minutes then turn off heat. Season with salt only.",
      duration: 5,
      temperature: "Low Heat",
    },
  ],
  safetyWarnings: [
    {
      text: "Do not overcook Matsutake, or it will lose its unique aroma and texture.",
      isCritical: false,
    },
    {
      text: "Chanterelles must be fully cooked for at least 15 minutes.",
      isCritical: true,
    },
  ],
  safetyLevel: 5,
};

const RecipeDetailPage = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const handleStepComplete = (stepNumber: number) => {
    if (!completedSteps.includes(stepNumber)) {
      setCompletedSteps(prev => [...prev, stepNumber]);
    }
  };

  const difficultyColors = {
    beginner: "aurora-cyan",
    intermediate: "aurora-purple",
    advanced: "aurora-magenta",
    master: "aurora-gold",
  };

  const difficultyColor = difficultyColors[mockRecipe.difficulty as keyof typeof difficultyColors];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main className="pt-16">
        {/* Recipe Header */}
        <section className="grid-line-b">
          <div className="max-w-[1440px] mx-auto grid grid-cols-12">
            {/* Left: AI Chef Notes */}
            <div className="col-span-7 grid-line-r p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="flex items-center gap-2 mb-6">
                  <Sparkles className="w-5 h-5 text-[hsl(var(--aurora-gold))]" />
                  <span className="text-meta text-foreground/40">
                    AI CHEF NOTES
                  </span>
                </div>

                {/* Typewriter Effect Simulation */}
                <motion.h1
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-display-lg font-display mb-6"
                >
                  {mockRecipe.title}
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-label text-foreground/60 leading-relaxed mb-8"
                >
                  {mockRecipe.description}
                </motion.p>

                {/* Meta Info */}
                <div className="grid grid-cols-3 gap-6 mb-8">
                  <div className="p-4 bg-card grid-line">
                    <span className="text-meta text-foreground/30 block mb-2">
                      Difficulty
                    </span>
                    <span className={`text-label text-[hsl(var(--${difficultyColor}))]`}>
                      {mockRecipe.difficultyLabel}
                    </span>
                  </div>
                  <div className="p-4 bg-card grid-line">
                    <span className="text-meta text-foreground/30 block mb-2 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {mockRecipe.cookingTime} Mins
                    </span>
                  </div>
                  <div className="p-4 bg-card grid-line">
                    <span className="text-meta text-foreground/30 block mb-2 flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {mockRecipe.servings} Servings
                    </span>
                  </div>
                </div>

                {/* Ingredients List */}
                <div>
                  <h3 className="text-label text-foreground/60 mb-4">Ingredients</h3>
                  <div className="space-y-2">
                    {mockRecipe.ingredients.map((ing, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                        className={`flex items-center justify-between p-3 ${ing.isMain
                          ? "bg-[hsl(var(--aurora-cyan)/0.1)] border border-[hsl(var(--aurora-cyan)/0.2)]"
                          : "bg-card"
                          }`}
                      >
                        <span className="text-label text-foreground/70">
                          {ing.name}
                        </span>
                        <span className="text-meta text-foreground/40">
                          {ing.quantity}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Right: Cooking Steps */}
            <div className="col-span-5 p-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h3 className="text-label text-foreground/60 mb-6 flex items-center gap-2">
                  <Flame className="w-4 h-4" />
                  COOKING STEPS
                </h3>

                {/* Step Navigation */}
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={() => setCurrentStep(prev => Math.max(0, prev - 1))}
                    disabled={currentStep === 0}
                    className="p-2 grid-line text-foreground/50 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex-1 flex items-center gap-1">
                    {mockRecipe.steps.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentStep(index)}
                        className="flex-1 h-1 bg-foreground/10 hover:bg-foreground/20 transition-colors"
                      >
                        <div
                          className={`h-full transition-all duration-300 ${index === currentStep
                            ? "bg-[hsl(var(--aurora-cyan))]"
                            : completedSteps.includes(index)
                              ? "bg-foreground/30"
                              : "bg-transparent"
                            }`}
                        />
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentStep(prev => Math.min(mockRecipe.steps.length - 1, prev + 1))}
                    disabled={currentStep === mockRecipe.steps.length - 1}
                    className="p-2 grid-line text-foreground/50 hover:text-foreground disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                {/* Current Step Display */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.4 }}
                    className="mb-6"
                  >
                    <div className="p-6 bg-card grid-line">
                      {/* Step Header */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-2xl font-display text-foreground/30">
                          {String(currentStep + 1).padStart(2, "0")}
                        </span>
                        <div className="flex items-center gap-4 text-meta text-foreground/40">
                          {mockRecipe.steps[currentStep].temperature && (
                            <span className="flex items-center gap-1">
                              <Flame className="w-3 h-3" />
                              {mockRecipe.steps[currentStep].temperature}
                            </span>
                          )}
                          {mockRecipe.steps[currentStep].duration && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {mockRecipe.steps[currentStep].duration}min
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Instruction */}
                      <p className="text-label text-foreground/80 leading-relaxed">
                        {mockRecipe.steps[currentStep].instruction}
                      </p>

                      {/* Complete Button */}
                      <button
                        onClick={() => handleStepComplete(currentStep)}
                        disabled={completedSteps.includes(currentStep)}
                        className="mt-6 w-full py-2 grid-line text-meta text-foreground/50 hover:text-foreground hover:bg-background transition-colors disabled:opacity-50"
                      >
                        {completedSteps.includes(currentStep) ? "✓ Completed" : "Mark as Complete"}
                      </button>
                    </div>
                  </motion.div>
                </AnimatePresence>

                {/* All Steps Overview */}
                <div className="space-y-2">
                  {mockRecipe.steps.map((step, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentStep(index)}
                      className={`w-full p-3 grid-line flex items-center gap-3 transition-all ${index === currentStep
                        ? "bg-card"
                        : "bg-transparent hover:bg-card/50"
                        }`}
                    >
                      {completedSteps.includes(index) ? (
                        <CircleDot className="w-4 h-4 text-[hsl(var(--aurora-cyan))] flex-shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-foreground/30 flex-shrink-0" />
                      )}
                      <span className={`text-meta flex-1 text-left ${index === currentStep
                        ? "text-foreground"
                        : "text-foreground/40"
                        }`}>
                        Step {index + 1}
                      </span>
                      {step.duration && (
                        <span className="text-meta text-foreground/30">
                          {step.duration}'
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Safety Guide Section */}
        <section className="grid-line-b bg-[hsl(var(--aurora-magenta)/0.05)]">
          <div className="max-w-[1440px] mx-auto p-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <h2 className="text-label text-foreground/60 mb-6 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-[hsl(var(--aurora-magenta))]" />
                SAFETY FIRST
              </h2>

              <div className="space-y-4">
                {mockRecipe.safetyWarnings.map((warning, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className={`p-6 border ${warning.isCritical
                      ? "bg-[hsl(var(--aurora-magenta)/0.1)] border-[hsl(var(--aurora-magenta)/0.5)]"
                      : "bg-card border-border"
                      }`}
                  >
                    <div className="flex items-start gap-4">
                      {warning.isCritical && (
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[hsl(var(--aurora-magenta))] flex items-center justify-center">
                          <span className="text-background font-mono text-xs font-bold">!</span>
                        </div>
                      )}
                      <div className="flex-1">
                        {warning.isCritical && (
                          <span className="text-meta text-[hsl(var(--aurora-magenta))] block mb-2">
                            CRITICAL
                          </span>
                        )}
                        <p className={`text-label ${warning.isCritical
                          ? "text-[hsl(var(--aurora-magenta))] font-medium"
                          : "text-foreground/70"
                          }`}>
                          {warning.text}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Safety Level Indicator */}
              <div className="mt-8 p-6 bg-card grid-line">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-meta text-foreground/40">Safety Level</span>
                  <span className="text-label text-foreground">
                    {mockRecipe.safetyLevel}/5
                  </span>
                </div>
                <div className="h-2 bg-foreground/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${(mockRecipe.safetyLevel / 5) * 100}%` }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full bg-gradient-to-r from-[hsl(var(--aurora-cyan))] to-[hsl(var(--aurora-purple))]"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Back to Recipes */}
        <section className="grid-line-t">
          <div className="max-w-[1440px] mx-auto px-8 py-8 flex items-center justify-between">
            <Link
              to="/recipes"
              className="inline-flex items-center gap-2 text-label text-foreground/50 hover:text-foreground transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to Recipes
            </Link>
            <button className="btn-pill flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Regenerate
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default RecipeDetailPage;
