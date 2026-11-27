import { describe, it, expect, beforeAll } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PricingSection from "@/components/PricingSection";

beforeAll(() => {
  class MockIntersectionObserver implements IntersectionObserver {
    readonly root: Element | null = null;
    readonly rootMargin: string = "";
    readonly thresholds: ReadonlyArray<number> = [];
    disconnect() {}
    observe() {}
    takeRecords(): IntersectionObserverEntry[] {
      return [];
    }
    unobserve() {}
  }

  global.IntersectionObserver = MockIntersectionObserver;
});

describe("PricingSection", () => {
  it("renders Ouro VIP and Ouro SEM ACOMODAÇÃO cards with VIP first and verified prices", () => {
    render(<PricingSection />);

    const vipHeading = screen.getByRole("heading", { name: /1º Lote – Ouro VIP/i });
    const noAccHeading = screen.getByRole("heading", { name: /1º Lote – Ouro SEM ACOMODAÇÃO/i });

    expect(vipHeading).toBeInTheDocument();
    expect(noAccHeading).toBeInTheDocument();
    expect(
      vipHeading.compareDocumentPosition(noAccHeading) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(screen.getByText(/Experiência Completa • Vagas Limitadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Ideal para Sorocaba e Região/i)).toBeInTheDocument();

    expect(screen.getByText("599")).toBeInTheDocument();
    expect(screen.getByText(/em até 3x de R\$ 200,00 sem juros/i)).toBeInTheDocument();
    expect(screen.getByText("480")).toBeInTheDocument();
    expect(screen.getByText(/em até 3x de R\$ 160,00 sem juros/i)).toBeInTheDocument();

    expect(screen.getByText(/Não inclui/i)).toBeInTheDocument();
    expect(screen.getByText(/hospedagem\/pernoite no local/i)).toBeInTheDocument();
  });

  it("expands the 9-meals accordion when clicked", () => {
    render(<PricingSection />);

    const trigger = screen.getByRole("button", {
      name: /O que está incluso na alimentação \(9 refeições\)\?/i,
    });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);

    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Almoço de boas-vindas, café da tarde e jantar\./i)).toBeInTheDocument();
    expect(screen.getByText(/Café da manhã, almoço, café da tarde e jantar\./i)).toBeInTheDocument();
    expect(screen.getByText(/Café da manhã e almoço de despedida\./i)).toBeInTheDocument();
  });

  it("preserves children discounts and links to checkout and caravans WhatsApp", () => {
    render(<PricingSection />);

    expect(screen.getByText(/De 5 a 10 anos/i)).toBeInTheDocument();
    expect(screen.getByText("359")).toBeInTheDocument();
    expect(screen.getByText(/De 0 a 4 anos/i)).toBeInTheDocument();
    expect(screen.getByText("Grátis")).toBeInTheDocument();

    const vipCta = screen.getByRole("link", { name: /Garantir Ingresso Ouro VIP/i });
    const noAccCta = screen.getByRole("link", { name: /Garantir Ingresso Sem Acomodação/i });
    const whatsappLink = screen.getByRole("link", { name: /Falar no WhatsApp/i });

    expect(vipCta).toHaveAttribute("href", "https://eisme.com.br/evento/ejm2027");
    expect(noAccCta).toHaveAttribute("href", "https://eisme.com.br/evento/ejm2027");
    expect(whatsappLink).toHaveAttribute("href", "https://wa.me/5515998162393");
  });
});
