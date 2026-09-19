import type { Metadata } from "next";
import { PhotoSlot } from "@/components/ui/DishDisc";
import { CtaPair } from "@/components/home/CtaPair";
import { Polaroids } from "@/components/home/Polaroids";
import { StoryCarousel } from "@/components/kitchen/StoryCarousel";
import { WordReveal } from "@/components/zine/WordReveal";

export const metadata: Metadata = {
  title: "Our Kitchen",
  description:
    "Where Tanmatra lunch is cooked: to order, with real ghee and cold-pressed oils, in an FSSAI registered, ISO 22000 certified kitchen in Hazipur, Noida.",
};

function ClipHeadline({ text }: { text: string }) {
  return (
    <span aria-label={text}>
      {Array.from(text).map((ch, i) => (
        <span key={i} aria-hidden className="clip-l" style={{ ["--i" as string]: i }}>
          <span>{ch === " " ? " " : ch}</span>
        </span>
      ))}
    </span>
  );
}

export default function KitchenPage() {
  return (
    <>
      <section className="grid min-h-[100svh] lg:grid-cols-2">
        <div className="flex flex-col justify-center gap-8 px-6 pb-16 pt-32 sm:px-10 lg:pl-16">
          <h1 className="display text-[clamp(4.5rem,11vw,10.5rem)]">
            <ClipHeadline text="Cooked to" />
            <br />
            <ClipHeadline text="order..." />
          </h1>
          <WordReveal
            text="Eating well in Noida shouldn't mean a sad salad. Tanmatra is home-style food, cooked fresh after you order and labelled so you know what's on your plate."
            className="max-w-md text-lg leading-snug"
          />
        </div>
        <div className="relative min-h-[50svh]">
          <PhotoSlot label="A chef cooking in the Tanmatra kitchen" src="/kitchen/chef.jpg" tone="bg-butter" />
        </div>
      </section>

      <StoryCarousel />
      <Polaroids title="Made fresh, made for you" body="Order on WhatsApp, pick a plan, or try three lunches for ₹399. We handle the cooking; you get to look forward to lunch." />
      <CtaPair />
    </>
  );
}
