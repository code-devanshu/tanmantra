import type { Metadata } from "next";
import { CtaPair } from "@/components/home/CtaPair";
import { MenuExperience } from "@/components/menu/MenuExperience";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "High-protein plates, bowls, wraps, salads, soups and smoothies, cooked to order by Tanmatra in Noida. From ₹79.",
};

export default function MenuPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-16 pt-32 sm:px-10">
        <span className="script text-2xl text-accent">cooked after you order</span>
        <h1 className="display mt-2 text-[clamp(4rem,11vw,10rem)]">On the menu today</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/70">
          Home-style plates, never reheated from a tray. Real ghee, cold-pressed oils and calories and protein
          labelled on every dish we have numbers for.
        </p>
      </section>
      <MenuExperience />
      <div className="pt-20">
        <CtaPair />
      </div>
    </>
  );
}
