import { useId } from "react";
import { BowlIcon } from "@/components/zine/icons";

/** A plate with a lettered ring. `rotate` (deg) turns the ring with scroll; without it the ring drifts slowly. */
export function PlateBadge({ rotate, className = "" }: { rotate?: number; className?: string }) {
  const id = useId();
  const driven = rotate !== undefined;
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg
        viewBox="0 0 200 200"
        aria-hidden
        className={`absolute inset-0 size-full text-ink ${driven ? "" : "animate-spin-slow"}`}
        style={driven ? { transform: `rotate(${rotate}deg)` } : undefined}
      >
        <defs>
          <path id={id} d="M100 100m-82 0a82 82 0 1 1 164 0a82 82 0 1 1-164 0" />
        </defs>
        <text className="display" fontSize="17" fill="currentColor" textLength="512" lengthAdjust="spacing">
          <textPath href={`#${id}`}>COOKED AFTER YOU ORDER • NEVER REHEATED • FOR A HEALTHY SOUL •</textPath>
        </text>
      </svg>
      <div className="absolute inset-[15%] grid place-items-center rounded-full border-4 border-ink bg-butter shadow-[10px_12px_0_rgba(28,22,19,.9)]">
        <BowlIcon className="size-[58%] text-ink [--bowl-dot:var(--color-paper)]" />
        <span className="script absolute -right-3 top-[12%] rotate-12 rounded-full bg-accent px-4 py-2 text-lg text-paper sm:text-2xl">
          from ₹199
        </span>
      </div>
    </div>
  );
}
