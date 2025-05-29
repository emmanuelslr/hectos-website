export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  sizes: string[];
  colors: { name: string; code: string }[];
}

export const products: Product[] = [
  {
    id: "tshirt-basic-1",
    name: "T-shirt Basique Premium",
    description: "T-shirt basique en coton bio de haute qualité",
    price: 29.99,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800",
    ],
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: [
      { name: "Noir", code: "#000000" },
      { name: "Blanc", code: "#FFFFFF" },
      { name: "Gris", code: "#808080" },
    ],
  },
  {
    id: "hoodie-classic-1",
    name: "Sweat à Capuche Classic",
    description: "Sweat à capuche confortable en coton molletonné",
    price: 59.99,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=800",
      "https://images.unsplash.com/photo-1578768079052-aa76e52ff62e?w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir", code: "#000000" },
      { name: "Gris", code: "#808080" },
      { name: "Bleu Marine", code: "#000080" },
    ],
  },
  {
    id: "pants-cargo-1",
    name: "Pantalon Cargo Premium",
    description: "Pantalon cargo moderne avec poches multiples",
    price: 79.99,
    images: [
      "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800",
      "https://images.unsplash.com/photo-1638394440667-aa54a7c0a703?w=800",
    ],
    sizes: ["28", "30", "32", "34", "36"],
    colors: [
      { name: "Kaki", code: "#806B2A" },
      { name: "Noir", code: "#000000" },
      { name: "Beige", code: "#F5F5DC" },
    ],
  },
  {
    id: "jacket-urban-1",
    name: "Veste Urban Style",
    description: "Veste légère parfaite pour la mi-saison",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800",
      "https://images.unsplash.com/photo-1592878904946-b3cd8ae243d0?w=800",
    ],
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Noir", code: "#000000" },
      { name: "Bleu Marine", code: "#000080" },
    ],
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find((product) => product.id === id);
};
