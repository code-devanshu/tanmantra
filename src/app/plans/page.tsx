import type { Metadata } from "next";
import { CtaPair } from "@/components/home/CtaPair";
import { CircleButton } from "@/components/zine/CircleButton";
import { plans } from "@/data/plans";
import { site, whatsappLink } from "@/data/site";
import { inr } from "@/lib/format";

export const metadata: Metadata = {
  title: "Plans",
  description: "Pick a Tanmatra lunch plan, or try three lunches for ₹399. Cooked to order, delivered across Noida.",
};

const tones = ["bg-butter", "bg-accent-soft", "bg-toffee", "bg-blush"];

export default function PlansPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 sm:px-10">
        <span className="script text-2xl text-accent">every weekday</span>
        <h1 className="display mt-2 text-[clamp(4rem,11vw,10rem)]">Pick a plan, we cook the rest</h1>
        <p className="mt-6 max-w-2xl text-lg text-ink/70">
          Monthly plans cover 22 lunches, cooked to order and delivered across Noida. Not sure yet? Start with a trial.
        </p>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-16 sm:px-10">
        <div className="relative flex flex-col justify-between gap-8 rounded-3xl bg-ink p-8 text-paper sm:p-12 lg:flex-row lg:items-center" data-invert>
          <div>
            <span className="script text-2xl text-gold">the easy start</span>
            <h2 className="display mt-2 text-[clamp(3rem,7vw,6.5rem)]">Try three lunches for {inr(site.trial.price)}</h2>
            <p className="mt-3 max-w-lg text-lg text-paper/80">Credited toward a full plan if you subscribe.</p>
          </div>
          <CircleButton tone="light" href={whatsappLink("Hi Tanmatra, I'd like to try three lunches for ₹399.")}>
            Try three lunches
          </CircleButton>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-10">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((p, i) => (
            <article key={p.id} className={`relative flex min-h-[440px] flex-col justify-between gap-8 rounded-3xl p-7 ${tones[i % tones.length]}`}>
              {p.waitlist && (
                <span className="script absolute right-5 top-5 rotate-6 rounded-full bg-ink px-3 py-1 text-lg text-paper">waitlist</span>
              )}
              <div>
                <h2 className="display text-4xl sm:text-5xl">{p.name}</h2>
                <p className="mt-3 text-lg leading-snug">{p.blurb}</p>
                <p className="script mt-3 text-xl text-ink/70">{p.diet}</p>
              </div>
              <div>
                {p.perMeal && (
                  <p className="display text-6xl">
                    {inr(p.perMeal)}
                    <span className="text-[0.4em]"> / meal</span>
                  </p>
                )}
                <p className={p.perMeal ? "script mt-1 text-2xl" : "display text-6xl"}>
                  {inr(p.monthly)}
                  <span className={p.perMeal ? "" : "text-[0.4em]"}> / month</span>
                </p>
                <p className="mt-1 text-sm text-ink/70">{p.detail}</p>
                <a
                  href={whatsappLink(`Hi Tanmatra, I'm interested in the ${p.name} plan${p.waitlist ? " (waitlist)" : ""}.`)}
                  target="_blank"
                  rel="noreferrer"
                  className="display mt-5 block rounded-xl bg-ink py-3 text-center text-2xl tracking-normal text-paper transition duration-300 active:scale-95 hover:bg-accent"
                >
                  {p.waitlist ? "Join the waitlist" : "Start this plan"}
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <CtaPair />
    </>
  );
}
