import { PhotoSlot } from "@/components/ui/DishDisc";
import { CircleButton } from "@/components/zine/CircleButton";
import { WordReveal } from "@/components/zine/WordReveal";

const shots = [
  { tone: "bg-butter", cap: "cooked to order", src: "/kitchen/pan.jpg", cls: "left-0 top-6 -rotate-6 z-10" },
  { tone: "bg-accent-soft", cap: "real desi ghee", src: "/dishes/protein-3.jpg", cls: "left-[28%] top-24 rotate-3 z-20" },
  { tone: "bg-blush", cap: "macros on every dish", src: "/kitchen/bowl.jpg", cls: "left-[52%] top-0 rotate-[9deg] z-10" },
] as const;

export function Polaroids({ title = "Where your lunch is actually cooked", body = "Our ISO 22000 certified kitchen in Hazipur cooks each plate after you order it, with real ghee and cold-pressed oils. Eating well in Noida shouldn't mean a sad salad." }: { title?: string; body?: string }) {
  return (
    <section className="mx-auto grid max-w-[1600px] items-center gap-16 px-6 py-24 sm:px-10 lg:grid-cols-2 lg:py-36">
      <div className="space-y-8">
        <WordReveal as="h2" text={title} className="display text-[clamp(3rem,7vw,6.5rem)]" />
        <WordReveal text={body} className="max-w-xl text-xl leading-snug" />
        <CircleButton href="/order">Order lunch</CircleButton>
      </div>
      <div className="relative mx-auto h-[420px] w-full max-w-[640px] sm:h-[520px]">
        {shots.map((s) => (
          <figure
            key={s.cap}
            className={`absolute w-[46%] bg-paper p-3 pb-10 shadow-[0_14px_30px_rgba(28,22,19,.28)] outline outline-1 outline-ink/10 transition-transform duration-500 ease-[cubic-bezier(.4,0,.2,1)] hover:z-30 hover:rotate-0 hover:scale-105 ${s.cls}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <PhotoSlot label={s.cap} src={s.src} tone={s.tone} />
            </div>
            <figcaption className="script absolute inset-x-0 bottom-2 text-center text-lg italic">{s.cap}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
