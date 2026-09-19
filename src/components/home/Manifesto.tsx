"use client";

import { useEffect, useRef, useState } from "react";
import { CurvedArrow } from "@/components/zine/icons";
import { Scallop } from "@/components/zine/Scallop";

const words = ["Fresh", "Honest", "Filling"] as const;

function LineArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="100" cy="100" r="88" />
      <circle cx="100" cy="100" r="70" />
      {[0, 60, 120, 180, 240, 300].map((a) => (
        <line key={a} x1="100" y1="100" x2={+(100 + 70 * Math.cos((a * Math.PI) / 180)).toFixed(2)} y2={+(100 + 70 * Math.sin((a * Math.PI) / 180)).toFixed(2)} />
      ))}
      <circle cx="100" cy="100" r="8" />
    </svg>
  );
}

function LeafArt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 200 200" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" aria-hidden>
      <path d="M30 170C20 80 80 20 176 24c4 96-56 156-146 146Z" />
      <path d="M30 170C70 120 110 84 160 44" />
      <path d="M78 122c4-20 16-34 34-44M104 98c2-12 10-22 22-28" />
    </svg>
  );
}

export function Manifesto() {
  const ref = useRef<HTMLElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p = (vh - r.top) / (vh + r.height);
      // Snap instantly at thresholds rather than easing.
      setIdx(p < 0.5 ? 0 : p < 0.66 ? 1 : 2);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="bg-paper">
      <Scallop />
      <section ref={ref} data-invert className="relative -mt-px overflow-hidden bg-ink py-28 text-paper sm:py-40">
        <LineArt className="pointer-events-none absolute -left-24 top-10 size-[420px] text-paper/[0.07]" />
        <LeafArt className="pointer-events-none absolute -right-16 bottom-0 size-[480px] rotate-12 text-paper/[0.07]" />
        <div className="relative mx-auto max-w-[1300px] px-6 sm:px-10">
          <h2 className="display text-[clamp(3rem,8.4vw,8rem)] leading-[0.95]">
            Lunch cooked after you order. Real ghee, cold-pressed oils and macros on every dish, wonderfully{" "}
            <span className="relative inline-block rounded-xl bg-gold px-4 text-ink" aria-live="polite">
              <span className="inline-block min-w-[3ch] text-center">{words[idx]}</span>
            </span>
            , from our kitchen in Noida.
          </h2>
          <div className="mt-12 flex items-start gap-3 sm:ml-[52%]">
            <CurvedArrow className="mt-2 h-14 w-24 -scale-x-100 rotate-[200deg] text-paper/80" />
            <p className="script max-w-xs text-3xl leading-tight text-paper/90">no sad salads here!</p>
          </div>
        </div>
      </section>
    </div>
  );
}
