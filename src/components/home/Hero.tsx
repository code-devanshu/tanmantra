import { Branch, CurvedArrow } from "@/components/zine/icons";
import { CircleButton } from "@/components/zine/CircleButton";
import { site } from "@/data/site";
import { PlateBadge } from "./PlateBadge";

export function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden pt-24">
      <Branch className="pointer-events-none absolute -right-40 top-[6%] -z-10 h-[95%] rotate-[8deg] text-accent/15 sm:-right-12 sm:text-accent/50" />
      <div className="mx-auto grid min-h-[calc(100svh-6rem)] max-w-[1600px] grid-cols-1 items-center gap-4 px-6 pb-10 sm:px-10 lg:grid-cols-[1.15fr_0.95fr_0.75fr]">
        <div className="relative z-10 self-start lg:pt-6">
          <h1 className="display text-[clamp(3.8rem,9.6vw,9rem)]">
            Lunch you
            <br />
            look forward
            <br />
            to.
          </h1>
          <ul className="mt-8 space-y-2 text-lg">
            <li className="flex items-center gap-3"><span className="size-2 rounded-full bg-accent" />Cooked after you order, not hours before</li>
            <li className="flex items-center gap-3"><span className="size-2 rounded-full bg-accent" />Real desi ghee, cold-pressed oils</li>
            <li className="flex items-center gap-3"><span className="size-2 rounded-full bg-accent" />Calories and protein on every dish</li>
          </ul>
          <CurvedArrow className="mt-2 hidden h-16 w-28 -rotate-6 text-ink lg:block" />
        </div>

        <div className="relative order-first mx-auto w-[min(78vw,520px)] lg:order-none lg:w-full">
          <PlateBadge />
        </div>

        <div className="relative z-10 max-w-sm space-y-6 lg:justify-self-end">
          <p className="text-lg leading-snug">
            Home-style plates, never reheated from a tray. Real ghee, real portions. From ₹{site.fromPrice} a meal.
          </p>
          <div className="flex flex-col items-start gap-2">
            <CircleButton href="/menu">See today&apos;s menu</CircleButton>
            <CircleButton href="/plans">Try three lunches</CircleButton>
          </div>
          <p className="script text-xl text-ink/70">3.9 ★ on Zomato · Sector 104, Noida</p>
        </div>
      </div>
    </section>
  );
}
