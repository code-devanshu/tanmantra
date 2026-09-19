"use client";

import { useState } from "react";
import { Bolt, Minus, Plus, ShoppingBag } from "lucide-react";
import { DishDisc } from "@/components/ui/DishDisc";
import { categoryLabel, dishes, menuFilters, type MenuCategory } from "@/data/menu";
import { kitchen, site, whatsappLink } from "@/data/site";
import { inr, orderMessage } from "@/lib/format";
import { validateContact, type FieldErrors } from "@/lib/validation";
import { Field } from "./Field";

export function OrderFlow() {
  const [filter, setFilter] = useState<"all" | MenuCategory>("all");
  const [qty, setQty] = useState<Record<string, number>>({});
  const [form, setForm] = useState({ name: "", phone: "", address: "" });
  const [errors, setErrors] = useState<FieldErrors & { address?: string }>({});
  const [serverError, setServerError] = useState("");

  const visible = dishes.filter((d) => filter === "all" || d.category === filter);
  const lines = dishes.filter((d) => (qty[d.id] ?? 0) > 0);
  const total = lines.reduce((s, d) => s + d.price * qty[d.id], 0);

  const change = (id: string, delta: number) =>
    setQty((q) => ({ ...q, [id]: Math.max(0, Math.min(12, (q[id] ?? 0) + delta)) }));

  function submit(e: React.FormEvent) {
    e.preventDefault();
    setServerError("");
    const found: FieldErrors & { address?: string } = validateContact(form, { requireEmail: false });
    if (form.address.trim().length < 8) found.address = "Please enter your delivery address.";
    setErrors(found);
    if (Object.keys(found).length > 0) return;
    if (lines.length === 0) {
      setServerError("Add at least one dish to your order.");
      return;
    }
    const msg = orderMessage(
      lines.map((d) => ({ label: d.name, qty: qty[d.id], amount: d.price * qty[d.id] })),
      total,
      form,
    );
    window.open(whatsappLink(msg), "_blank", "noopener");
  }

  return (
    <form onSubmit={submit} noValidate className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
      <div>
        <div className="mb-5 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]" role="group" aria-label="Menu categories">
          {menuFilters.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-pressed={filter === f.id}
              onClick={() => setFilter(f.id)}
              className={`h-10 shrink-0 rounded-full border px-5 text-title-sm transition ${
                filter === f.id ? "border-ink bg-ink text-paper" : "border-ink/20 text-ink/70 hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ul className="space-y-4">
          {visible.map((d) => (
            <li key={d.id} className="flex flex-col gap-4 rounded-2xl border border-ink/15 bg-white/70 p-4 sm:flex-row sm:items-center">
              <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-lg sm:w-32">
                <DishDisc dish={d} sizes="(min-width: 640px) 128px, 92vw" />
              </div>
              <div className="flex flex-1 flex-col gap-1">
                <span className="display text-2xl tracking-normal text-ink">{d.name}</span>
                <span className="text-label-sm uppercase text-ink/50">
                  {categoryLabel[d.category]}
                  {d.kcal ? ` · ${d.kcal} kcal` : ""}
                  {d.protein ? ` · ${d.protein}g protein` : ""}
                </span>
                <span className="text-title-md text-accent">{inr(d.price)}</span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center" role="group" aria-label={`Quantity ${d.name}`}>
                <button type="button" aria-label={`Remove one ${d.name}`} onClick={() => change(d.id, -1)} className="grid size-10 place-items-center rounded-full border border-ink/20 transition hover:bg-accent/10"><Minus className="size-4" /></button>
                <span className="display w-6 text-center text-2xl" aria-live="polite">{qty[d.id] ?? 0}</span>
                <button type="button" aria-label={`Add one ${d.name}`} onClick={() => change(d.id, 1)} className="grid size-10 place-items-center rounded-full border border-ink/20 transition hover:bg-accent/10"><Plus className="size-4" /></button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="relative overflow-hidden rounded-2xl border border-ink/15 bg-white/70 p-6 shadow-[0_18px_40px_-18px_rgba(28,22,19,0.35)]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent" />
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-label-sm uppercase text-accent">Delivery</span>
              <span className="display text-3xl tracking-normal">Your Order</span>
            </div>
            <span className="grid size-11 place-items-center rounded-full bg-accent/15 text-accent"><ShoppingBag className="size-5" /></span>
          </div>

          <ul className="space-y-3 text-body-sm">
            {lines.length === 0 && <li className="text-ink/65">Your order is empty.</li>}
            {lines.map((d) => (
              <li key={d.id} className="flex justify-between gap-4">
                <span className="text-ink/65">{qty[d.id]}x {d.name}</span>
                <span>{inr(d.price * qty[d.id])}</span>
              </li>
            ))}
            <li className="flex items-baseline justify-between gap-4 border-t border-ink/15 pt-4">
              <span className="text-label-md uppercase text-ink/50">Meals total</span>
              <span className="display text-3xl text-accent" aria-live="polite">{inr(total)}</span>
            </li>
          </ul>

          <div className="mt-6 space-y-4">
            <span className="block text-label-md uppercase text-accent">Where should it go?</span>
            <Field label="Name" autoComplete="name" placeholder="Your name" value={form.name} error={errors.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Field label="Phone number" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={form.phone} error={errors.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <Field label="Delivery address" autoComplete="street-address" placeholder="Flat, society, sector, Noida" value={form.address} error={errors.address} onChange={(e) => setForm({ ...form, address: e.target.value })} />
          </div>

          {serverError && <p role="alert" className="mt-4 rounded bg-[#b3261e]/10 p-3 text-body-sm text-[#b3261e]">{serverError}</p>}

          <button type="submit" className="mt-6 flex w-full items-center justify-between gap-3 rounded bg-accent px-5 py-4 text-title-md text-paper transition hover:bg-ink active:scale-[0.99]">
            <span>Order on WhatsApp ({inr(total)})</span>
            <Bolt className="size-5" />
          </button>
          <span className="mt-3 block text-center text-body-sm text-ink/50">Opens WhatsApp with your order. We confirm delivery and payment there.</span>
        </div>

        <div className="space-y-2 rounded-2xl border border-ink/15 bg-white/70 p-6 text-body-sm text-ink/65">
          <span className="text-label-sm uppercase text-accent">Kitchen • Sector 104, Noida</span>
          <p>{kitchen.lines.join(", ")}</p>
          <p>Delivering across {kitchen.serves}.</p>
          <a href={`tel:${site.phoneTel}`} className="block hover:text-accent">Call {site.phone}</a>
        </div>
      </aside>
    </form>
  );
}
