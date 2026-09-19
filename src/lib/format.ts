export const inr = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;
export const surcharge = (value: number) => (value > 0 ? `+${inr(value)}` : "Included");

export function referenceCode(prefix: string) {
  const n = Math.floor(1000 + Math.random() * 9000);
  return `#${prefix}-${n}`;
}

export type OrderLine = { label: string; qty: number; amount: number };

/** Plain-text order for WhatsApp. Optional customer details go on top. */
export function orderMessage(lines: OrderLine[], total: number, customer?: { name: string; phone: string; address: string }) {
  const rows = lines.map((l) => `${l.qty} x ${l.label} - ${inr(l.amount)}`);
  const head = customer ? [`Hi Tanmatra, I'd like to order lunch.`, `Name: ${customer.name}`, `Phone: ${customer.phone}`, `Address: ${customer.address}`, ""] : [`Hi Tanmatra, I'd like to order lunch.`, ""];
  return [...head, ...rows, "", `Total: ${inr(total)}`].join("\n");
}
