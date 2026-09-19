export type Plan = {
  id: string;
  name: string;
  blurb: string;
  perMeal?: number;
  monthly: number;
  detail: string;
  diet: string;
  waitlist?: boolean;
};

/** Monthly prices are for 22 weekday lunches, except GLP-1 Companion which is a flat monthly plan. */
export const plans: Plan[] = [
  { id: "desk-fuel", name: "Desk Fuel", blurb: "Filling and light, so there's no 4pm slump.", perMeal: 199, monthly: 4378, detail: "22 lunches a month", diet: "Veg · Egg · Non-veg" },
  { id: "steady", name: "Steady", blurb: "Low-GI, no refined sugar, for steady blood sugar.", perMeal: 229, monthly: 5038, detail: "22 lunches a month", diet: "Non-veg", waitlist: true },
  { id: "protein-build", name: "Protein Build", blurb: "Protein-per-rupee that trains with you.", perMeal: 249, monthly: 5478, detail: "22 lunches a month", diet: "Veg · Egg · Non-veg" },
  { id: "glp1", name: "GLP-1 Companion", blurb: "Small portions, serious protein, for GLP-1 medication users.", monthly: 5999, detail: "Monthly plan", diet: "Egg · Non-veg", waitlist: true },
];
