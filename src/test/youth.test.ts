import { describe, expect, it } from "vitest";
import { recommend } from "@/components/PassportQuiz";
import { MEMORIES, STORY_IDS, VIBE_FILTERS } from "@/data/memories";

describe("recommend", () => {
  it("sends overnight guests to Ouro VIP", () => {
    expect(recommend("ficar", "amigos").ticketId).toBe("ouro-vip");
  });
  it("sends day visitors to Sem Acomodação", () => {
    expect(recommend("voltar", "familia").ticketId).toBe("ouro-sem-acomodacao");
  });
});

describe("memories data", () => {
  it("has 21 photos and every story id exists", () => {
    expect(MEMORIES).toHaveLength(21);
    for (const id of STORY_IDS) expect(MEMORIES.some((m) => m.id === id)).toBe(true);
  });
  it("every vibe filter has photos", () => {
    for (const f of VIBE_FILTERS.filter((x) => x.id !== "todos")) {
      expect(MEMORIES.some((m) => m.vibe === f.id)).toBe(true);
    }
  });
});
