export interface Species {
  id: string;
  nameCn: string;
  nameEn: string;
  nameScientific: string;
  category: string;
  edibility: "edible" | "toxic" | "deadly" | "medicinal" | "unknown";
  description: string;
  imageUrl: string;
  colorChange?: string; // 变色特征
  season: string[];
  habitat: string[];
  capShape: string;
  odor: string;
  sporeColor: string;
  similarSpecies?: {
    id: string;
    name: string;
    warning: string;
    imageUrl: string;
  }[];
  anatomy?: {
    kohReaction?: string;
    sporePrint?: string;
    ringType?: string;
    gillAttachment?: string;
  };
  ecology?: {
    relationship: string;
    hostTrees: string[];
  };
  cookingNotes?: {
    method: string;
    warning?: string;
  };
}

export const mockSpeciesData: Species[] = [
  {
    id: "1",
    nameCn: "Blue Staining Boletus",
    nameEn: "Lanmaoa asiatica",
    nameScientific: "Lanmaoa asiatica",
    category: "Boletales",
    edibility: "edible",
    description: "A precious edible fungus unique to Yunnan. It turns blue immediately upon touch and must be fully cooked before consumption.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    colorChange: "Turns blue on touch",
    season: ["Summer", "Autumn"],
    habitat: ["Mixed Coniferous Broad-leaved Forest", "Pine Forest"],
    capShape: "Hemispherical to Flat",
    odor: "Mild Fungus Scent",
    sporeColor: "Olive Brown",
    similarSpecies: [
      {
        id: "2",
        name: "Satan's Bolete",
        warning: "Hallucinogenic if undercooked",
        imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format"
      }
    ],
    anatomy: {
      kohReaction: "Turns Red",
      sporePrint: "Olive Brown",
      ringType: "No Ring",
      gillAttachment: "Adnate"
    },
    ecology: {
      relationship: "Ectomycorrhizal",
      hostTrees: ["Yunnan Pine", "Armand Pine", "Oak"]
    },
    cookingNotes: {
      method: "Stir-fry",
      warning: "⚠️ Must be stir-fried thoroughly for at least 15 minutes, otherwise it may cause neurological discomfort."
    }
  },
  {
    id: "3",
    nameCn: "Chanterelle",
    nameEn: "Golden Chanterelle",
    nameScientific: "Cantharellus cibarius",
    category: "Cantharellaceae",
    edibility: "edible",
    description: "A golden-yellow delicious edible fungus with a unique apricot aroma.",
    imageUrl: "https://images.unsplash.com/photo-1504545102780-26774c1bb073?w=800&auto=format",
    season: ["Summer", "Autumn"],
    habitat: ["Mixed Forest", "Beech Forest"],
    capShape: "Funnel-shaped",
    odor: "Apricot Aroma",
    sporeColor: "White to Pale Yellow",
    anatomy: {
      sporePrint: "White",
      gillAttachment: "Decurrent"
    },
    ecology: {
      relationship: "Ectomycorrhizal",
      hostTrees: ["Pine", "Oak", "Beech"]
    },
    cookingNotes: {
      method: "Stir-fry, Soup"
    }
  },
  {
    id: "4",
    nameCn: "Matsutake",
    nameEn: "Pine Mushroom",
    nameScientific: "Tricholoma matsutake",
    category: "Tricholomataceae",
    edibility: "edible",
    description: "A world-class rare edible fungus with a unique aroma and high nutritional value.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    season: ["Autumn"],
    habitat: ["Coniferous Forest", "Pine Forest"],
    capShape: "Hemispherical to Flat",
    odor: "Strong Pine Scent",
    sporeColor: "White",
    ecology: {
      relationship: "Ectomycorrhizal",
      hostTrees: ["Red Pine", "Hemlock", "Spruce"]
    },
    cookingNotes: {
      method: "Sashimi, Charcoal Grilled, Soup"
    }
  },
  {
    id: "5",
    nameCn: "Fly Agaric",
    nameEn: "Fly Amanita",
    nameScientific: "Amanita muscaria",
    category: "Amanitaceae",
    edibility: "toxic",
    description: "Iconic red-capped white-spotted poisonous mushroom containing hallucinogenic toxins. Strictly forbidden to eat.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    season: ["Summer", "Autumn"],
    habitat: ["Coniferous Forest", "Birch Forest"],
    capShape: "Hemispherical to Flat",
    odor: "Slightly Unpleasant",
    sporeColor: "White",
    similarSpecies: [
      {
        id: "6",
        name: "Caesar's Mushroom",
        warning: "Highly Toxic",
        imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format"
      }
    ],
    anatomy: {
      sporePrint: "White",
      ringType: "Membranous Ring",
      gillAttachment: "Free"
    },
    cookingNotes: {
      method: "Do Not Eat",
      warning: "⚠️ Contains ibotenic acid and muscimol, can cause hallucinations, vomiting, and nervous system damage."
    }
  },
  {
    id: "7",
    nameCn: "Morel",
    nameEn: "True Morel",
    nameScientific: "Morchella esculenta",
    category: "Morchellaceae",
    edibility: "edible",
    description: "Precious edible fungus with honeycomb-like cap, one of the four famous mushrooms in the world.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    season: ["Spring"],
    habitat: ["Broad-leaved Forest", "River Bank", "Burned Area"],
    capShape: "Honeycomb",
    odor: "Pleasant",
    sporeColor: "Pale Yellow",
    ecology: {
      relationship: "Saprophytic",
      hostTrees: ["Various Broad-leaved Trees"]
    },
    cookingNotes: {
      method: "Soup, Stir-fry",
      warning: "⚠️ Must be cooked, never eat raw."
    }
  },
  {
    id: "8",
    nameCn: "Reishi",
    nameEn: "Lingzhi",
    nameScientific: "Ganoderma lucidum",
    category: "Ganodermataceae",
    edibility: "medicinal",
    description: "Traditional Chinese medicine material, known for strengthening the body and prolonging life.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    season: ["All Year"],
    habitat: ["Broad-leaved Forest", "Decaying Wood"],
    capShape: "Fan to Kidney Shaped",
    odor: "Slightly Bitter",
    sporeColor: "Brown",
    ecology: {
      relationship: "Wood-decaying",
      hostTrees: ["Oak", "Birch", "Willow"]
    },
    cookingNotes: {
      method: "Decoction, Tea, Soup"
    }
  },
  {
    id: "9",
    nameCn: "Death Cap",
    nameEn: "Death Cup",
    nameScientific: "Amanita phalloides",
    category: "Amanitaceae",
    edibility: "deadly",
    description: "One of the most poisonous mushrooms in the world, containing deadly amatoxins.",
    imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=800&auto=format",
    season: ["Summer", "Autumn"],
    habitat: ["Broad-leaved Forest", "Mixed Forest"],
    capShape: "Hemispherical to Flat",
    odor: "First Odorless",
    sporeColor: "White",
    similarSpecies: [
      {
        id: "10",
        name: "Straw Mushroom",
        warning: "Easily confused, requires professional identification",
        imageUrl: "https://images.unsplash.com/photo-1509358271058-acd22cc93898?w=400&auto=format"
      }
    ],
    anatomy: {
      sporePrint: "White",
      ringType: "Membranous Ring",
      gillAttachment: "Free"
    },
    cookingNotes: {
      method: "Do Not Eat",
      warning: "⚠️ Deadly Toxic! Contains alpha-amanitin, extremely high mortality rate, no specific antidote."
    }
  }
];
