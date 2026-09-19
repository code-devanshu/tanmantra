export const site = {
  name: "Tanmatra",
  city: "Noida",
  tagline: "For A Healthy Soul",
  headline: "Lunch you look forward to.",
  description:
    "Fresh lunch delivery in Noida. Home-style plates cooked after you order, never reheated from a tray, with real ghee, cold-pressed oils and calories and protein on every dish. From ₹199 a meal.",
  phone: "+91 92892 13115",
  phoneTel: "+919289213115",
  whatsapp: "https://wa.me/919289213115",
  instagram: { handle: "@tanmatra_1", url: "https://www.instagram.com/tanmatra_1/" },
  grievance: { email: "grievance@tanmatra.food", officer: "Anuradha" },
  fssai: "22725926001018",
  iso: "ISO 22000",
  fromPrice: 199,
  trial: { meals: 3, price: 399 },
} as const;

export const nav = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/plans", label: "Plans" },
  { href: "/kitchen", label: "Our Kitchen" },
  { href: "/order", label: "Order" },
] as const;

export const kitchen = {
  name: "Tanmatra Kitchen",
  badge: "Cloud kitchen · Delivery",
  lines: ["237, Hazipur, Sector 104", "Noida, Uttar Pradesh 201301"],
  serves: "Noida and nearby serviceable pincodes, Delhi NCR",
  map: "https://www.google.com/maps/search/?api=1&query=237+Hazipur+Sector+104+Noida",
} as const;

/** Hours as listed on delivery apps. Confirm with the client before launch. */
export const hours = [{ days: "Every day", time: "8:00 AM – 11:58 PM" }] as const;

/** Fullscreen menu and footer links. */
export const megaLinks = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/plans", label: "Plans" },
  { href: "/kitchen", label: "Kitchen" },
  { href: "/order", label: "Order" },
  { href: "/#contact", label: "Contact" },
] as const;

/** Ratings shown on delivery apps. Refresh before launch. */
export const ratings = [
  { source: "Zomato", score: "3.9", count: "2,005 ratings", note: "Hajipur, Noida" },
  { source: "Swiggy", score: "3.9", count: "395 ratings", note: "Noida" },
  { source: "Magicpin", score: "3.5", count: "38 reviews", note: "Noida" },
] as const;

/** Builds a wa.me link with a prefilled message. */
export function whatsappLink(message: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(message)}`;
}
