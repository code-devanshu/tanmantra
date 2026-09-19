export type MenuCategory =
  | "protein"
  | "bowls"
  | "wraps"
  | "sandwiches"
  | "salads"
  | "breakfast"
  | "pita"
  | "pasta"
  | "soups"
  | "drinks"
  | "dessert";

export const menuFilters: { id: "all" | MenuCategory; label: string }[] = [
  { id: "all", label: "Everything" },
  { id: "protein", label: "High-Protein" },
  { id: "bowls", label: "Bowls" },
  { id: "wraps", label: "Wraps" },
  { id: "sandwiches", label: "Sandwiches" },
  { id: "salads", label: "Salads" },
  { id: "breakfast", label: "Breakfast & Eggs" },
  { id: "pita", label: "Pita & Hummus" },
  { id: "pasta", label: "Pasta" },
  { id: "soups", label: "Soups" },
  { id: "drinks", label: "Smoothies & Drinks" },
  { id: "dessert", label: "Dessert" },
];

export type Dish = {
  id: string;
  category: MenuCategory;
  name: string;
  /** Rupees. */
  price: number;
  description?: string;
  kcal?: number;
  protein?: number;
  /** Drop a photo in /public/dishes and set this path; until then a tinted plate stands in. */
  image?: string;
};

const d = (category: MenuCategory, name: string, price: number, extra: Partial<Dish> = {}): Dish => ({
  id: `${category}-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/-$/, "")}`,
  category,
  name,
  price,
  ...extra,
});

/** Sample menu from the client's brief. Confirm current prices and macros before publishing. */
const base: Dish[] = [
  d("protein", "Grilled Chicken with Veggies & Mash", 299, { kcal: 388, protein: 42 }),
  d("protein", "Chicken Meal", 299, { description: "150g grilled chicken with veggies and rice." }),
  d("protein", "Boiled Chicken Breast", 199, { description: "150g.", kcal: 150, protein: 30 }),

  d("bowls", "Chicken Burrito Bowl", 299, { kcal: 540, protein: 34 }),
  d("bowls", "Paneer Burrito Bowl", 249),
  d("bowls", "Mushroom Burrito Bowl", 199),
  d("bowls", "Quinoa Khichdi", 179),

  d("wraps", "BBQ Chicken Tikka Wrap", 199),
  d("wraps", "Chicken Tikka Wrap", 199),
  d("wraps", "Paneer Tikka Wrap", 179),
  d("wraps", "Falafel Hummus Wrap", 179),
  d("wraps", "Mushroom Wrap", 159),

  d("sandwiches", "Grilled Veggie Sandwich with Ranch Yoghurt", 169),
  d("sandwiches", "Grilled Chicken Club", 199),
  d("sandwiches", "Chicken Tikka Sandwich", 189),
  d("sandwiches", "Grilled Paneer Sandwich", 179),

  d("salads", "Falafel Garden", 199),
  d("salads", "Broccoli Lemon Chicken", 249),
  d("salads", "Chicken Caesar", 249),
  d("salads", "Grilled Paneer", 199),
  d("salads", "Fruity Sprout", 199),
  d("salads", "Grilled Chicken", 249),
  d("salads", "Veg Caesar", 199),

  d("breakfast", "Avocado Toast", 299),
  d("breakfast", "Moong Dal Chilla with Curd", 129),
  d("breakfast", "High-Protein Chicken Omelette", 149),
  d("breakfast", "Spinach Mushroom Omelette", 159),
  d("breakfast", "Bread Omelette", 129),
  d("breakfast", "Exotic Egg Bhurji", 119),
  d("breakfast", "Classic Vegetable Poha", 129),

  d("pita", "Classic Hummus Pita", 179),
  d("pita", "Hummus Pita with Falafel", 219),
  d("pita", "Chicken Pita Pocket", 249),

  d("pasta", "Arrabbiata", 199),
  d("pasta", "Alfredo", 199),
  d("pasta", "Pesto", 199),

  d("soups", "Cream of Mushroom", 149),
  d("soups", "Hot & Sour", 79),
  d("soups", "Manchow", 79),
  d("soups", "Tomato Basil", 129),

  d("drinks", "Mixed Berry Protein Smoothie", 149),
  d("drinks", "Powerhouse (Oats & Banana)", 129, { kcal: 140, protein: 15 }),
  d("drinks", "Antioxidant Boost", 170),
  d("drinks", "Zero-Calorie Mint Mojito", 99),

  d("dessert", "Ragi & Dates Brownie", 99, { description: "Eggless.", kcal: 240, protein: 6 }),
];

/** Pexels stock photos in /public/dishes, three per category, cycled through the dishes in that category. Replace with real dish photography by setting `image` above. */
const photoCount: Record<MenuCategory, number> = { protein: 3, bowls: 4, wraps: 3, sandwiches: 3, salads: 3, breakfast: 3, pita: 3, pasta: 3, soups: 3, drinks: 3, dessert: 3 };
const seen: Partial<Record<MenuCategory, number>> = {};
export const dishes: Dish[] = base.map((dish) => {
  const n = seen[dish.category] ?? 0;
  seen[dish.category] = n + 1;
  return { image: `/dishes/${dish.category}-${(n % photoCount[dish.category]) + 1}.jpg`, ...dish };
});

export const categoryLabel = Object.fromEntries(menuFilters.map((f) => [f.id, f.label])) as Record<string, string>;

/** Three dishes surfaced on the home page. */
export const featuredIds = [
  "protein-grilled-chicken-with-veggies-mash",
  "bowls-chicken-burrito-bowl",
  "bowls-paneer-burrito-bowl",
];
export const featured = featuredIds.map((id) => dishes.find((x) => x.id === id)!);
