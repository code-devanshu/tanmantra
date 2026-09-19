import Image from "next/image";
import { BowlIcon } from "@/components/zine/icons";
import type { Dish } from "@/data/menu";

/**
 * A dish as a plate: the photo when there is one, otherwise a tinted stand-in with the macros.
 * Fill its parent (`absolute inset-0` or a sized wrapper).
 */
export function DishDisc({ dish, sizes, className = "" }: { dish: Dish; sizes: string; className?: string }) {
  if (dish.image) {
    return <Image src={dish.image} alt={dish.name} fill sizes={sizes} className={`object-cover ${className}`} />;
  }
  return (
    <div className={`absolute inset-0 grid place-items-center bg-accent-soft ${className}`} aria-label={dish.name} role="img">
      <div className="flex flex-col items-center gap-2 text-ink">
        <BowlIcon className="size-1/4 min-w-10 [--bowl-dot:var(--color-paper)]" />
        {dish.protein ? (
          <p className="display text-[clamp(2.5rem,7vw,4.5rem)] text-accent">
            {dish.protein}
            <span className="text-[0.45em]">g protein</span>
          </p>
        ) : dish.kcal ? (
          <p className="display text-[clamp(2.5rem,7vw,4.5rem)] text-accent">
            {dish.kcal}
            <span className="text-[0.45em]"> kcal</span>
          </p>
        ) : (
          <p className="script text-2xl text-ink/60">fresh, to order</p>
        )}
      </div>
    </div>
  );
}

/** Generic tinted block for photo slots that are not dishes (kitchen, packaging). */
export function PhotoSlot({ label, src, tone = "bg-accent-soft", className = "" }: { label: string; src?: string; tone?: string; className?: string }) {
  if (src) {
    return <Image src={src} alt={label} fill sizes="(min-width:1024px) 40vw, 90vw" className={`object-cover ${className}`} />;
  }
  return (
    <div className={`absolute inset-0 grid place-items-center ${tone} ${className}`} role="img" aria-label={label}>
      <BowlIcon className="size-1/4 min-w-10 text-ink/70 [--bowl-dot:var(--color-paper)]" />
    </div>
  );
}
