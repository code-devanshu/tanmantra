import type { Metadata } from "next";
import { CtaPair } from "@/components/home/CtaPair";
import { OrderFlow } from "@/components/order/OrderFlow";

export const metadata: Metadata = {
  title: "Order",
  description: "Order fresh lunch from Tanmatra on WhatsApp. Cooked after you order, delivered across Noida.",
};

export default function OrderPage() {
  return (
    <>
      <section className="mx-auto max-w-[1600px] px-6 pb-12 pt-32 sm:px-10">
        <span className="script text-2xl text-accent">cooked after you order</span>
        <h1 className="display mt-2 text-[clamp(4rem,11vw,10rem)]">Order lunch</h1>
        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <p className="max-w-2xl text-lg text-ink/70">
            Pick your dishes, add your address and send it on WhatsApp. Prefer a plan? See the weekday plans.
          </p>
          <div className="flex items-center gap-3 self-start rounded-full bg-butter px-5 py-3 lg:self-auto">
            <span className="size-2.5 animate-pulse rounded-full bg-accent" />
            <span className="script text-xl">Every day · 8 AM – 11:58 PM</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-6 pb-24 sm:px-10">
        <OrderFlow />
      </section>

      <div className="pt-8">
        <CtaPair />
      </div>
    </>
  );
}
