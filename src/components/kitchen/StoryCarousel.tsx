"use client";

import { PhotoSlot } from "@/components/ui/DishDisc";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";

const steps = [
  { eyebrow: "01 / The Order", title: "Cooked after you order", body: "No trays sitting under a lamp. Your plate is cooked when your order comes in, so it reaches you tasting like it was made for you.", cap: "never reheated", src: "/dishes/protein-1.jpg", tone: "bg-butter" },
  { eyebrow: "02 / The Pan", title: "Real ghee, cold-pressed oils", body: "Desi ghee and cold-pressed oils do the cooking. Home-style food with proper portions, not a sad salad.", cap: "the way home cooks it", src: "/kitchen/pan.jpg", tone: "bg-toffee" },
  { eyebrow: "03 / The Label", title: "Numbers on every dish", body: "Calories and protein are labelled on the dishes so you can eat to your goals, whether that is a lean bulk or steady blood sugar.", cap: "no guessing", src: "/kitchen/bowl.jpg", tone: "bg-blush" },
  { eyebrow: "04 / The Kitchen", title: "Certified and clean", body: `FSSAI registration ${site.fssai}, and an ${site.iso} certified kitchen for food safety, in Hazipur, Sector 104.`, cap: "safe by design", src: "/kitchen/chef.jpg", tone: "bg-accent-soft" },
] as const;

const clamp = (v: number) => Math.min(1, Math.max(0, v));

export function StoryCarousel() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = section.current;
      const tr = track.current;
      if (!el || !tr) return;
      const r = el.getBoundingClientRect();
      const next = clamp(-r.top / (r.height - window.innerHeight));
      const max = Math.max(0, tr.scrollWidth - window.innerWidth);
      tr.style.transform = `translate3d(${-next * max}px,0,0)`;
      setP(next);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const active = Math.min(steps.length - 1, Math.round(p * (steps.length - 1)));

  return (
    <section ref={section} className="relative h-[420svh]" aria-label="Our kitchen">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="mb-8 flex items-end justify-between px-6 sm:px-10">
          <div>
            <h2 className="display text-[clamp(3.5rem,9vw,8rem)]">Our kitchen</h2>
            <div className="mt-4 flex gap-2" aria-hidden>
              {steps.map((_, i) => {
                const w = i === 0 ? 1 : clamp(p * (steps.length - 1) - (i - 1));
                return (
                  <span key={i} className="h-1 w-12 overflow-hidden rounded-full bg-ink/15">
                    <span className="block h-full bg-accent" style={{ width: `${w * 100}%` }} />
                  </span>
                );
              })}
            </div>
          </div>
          <p className="display text-3xl tabular-nums tracking-normal" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}
          </p>
        </div>

        <div ref={track} className="flex w-max gap-6 px-6 will-change-transform sm:px-10">
          {steps.map((s) => (
            <article key={s.eyebrow} className="grid h-[56svh] w-[min(88vw,1080px)] shrink-0 grid-cols-1 overflow-hidden rounded-3xl bg-paper ring-1 ring-ink/10 md:grid-cols-2">
              <div className="relative min-h-0">
                <PhotoSlot label={s.cap} src={s.src} tone={s.tone} />
              </div>
              <div className={`flex flex-col justify-between p-6 sm:p-10 ${s.tone}`}>
                <span className="text-xs font-medium uppercase tracking-[0.18em]">{s.eyebrow}</span>
                <div>
                  <h3 className="display text-[clamp(2.5rem,5vw,4.5rem)]">{s.title}</h3>
                  <p className="mt-3 max-w-md text-[15px] leading-snug sm:text-base">{s.body}</p>
                </div>
                <span className="script text-2xl italic text-accent">{s.cap}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
