import type { TicketSkuId } from "@/lib/analytics/types";

export type AdultTicketId = Extract<TicketSkuId, "ouro-vip" | "ouro-sem-acomodacao">;

const EVENT = "ejm-quiz-match";
let currentMatch: AdultTicketId | null = null;

export function publishQuizMatch(ticketId: AdultTicketId | null): void {
  currentMatch = ticketId;
  window.dispatchEvent(new CustomEvent<AdultTicketId | null>(EVENT, { detail: ticketId }));
}

export function getQuizMatch(): AdultTicketId | null {
  return currentMatch;
}

export function onQuizMatch(handler: (ticketId: AdultTicketId | null) => void): () => void {
  const listener = (e: Event) => {
    handler((e as CustomEvent<AdultTicketId | null>).detail ?? null);
  };
  window.addEventListener(EVENT, listener);
  return () => window.removeEventListener(EVENT, listener);
}
