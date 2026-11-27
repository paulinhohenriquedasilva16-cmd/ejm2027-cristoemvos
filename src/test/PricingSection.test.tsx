import { beforeEach, describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import PricingSection from "@/components/PricingSection";
import { captureAttribution } from "@/lib/attribution";

describe("PricingSection", () => {
  beforeEach(() => {
    window.sessionStorage.clear();
    window.localStorage.clear();
  });

  it("renders Ouro VIP and Ouro SEM ACOMODAÇÃO cards with VIP first and verified prices", () => {
    render(<PricingSection />);

    const vipHeading = screen.getByRole("heading", { name: /1º Lote - Ouro VIP/i });
    const noAccHeading = screen.getByRole("heading", { name: /1º Lote - Ouro SEM ACOMODAÇÃO/i });

    expect(vipHeading).toBeInTheDocument();
    expect(noAccHeading).toBeInTheDocument();
    expect(
      vipHeading.compareDocumentPosition(noAccHeading) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();

    expect(screen.getByText(/Experiência Completa • Vagas Limitadas/i)).toBeInTheDocument();
    expect(screen.getByText(/Ideal para Quem quer aproveitar sem ficar no local/i)).toBeInTheDocument();

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

  it("preserves children discounts, caravans WhatsApp, share-with-parents link, and UTM propagation", () => {
    captureAttribution("?utm_source=instagram&utm_campaign=lote1", "/", "");
    render(<PricingSection />);

    expect(screen.getByRole("heading", { name: /De 5 a 10 anos/i })).toBeInTheDocument();
    expect(screen.getByText("359")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /De 0 a 4 anos/i })).toBeInTheDocument();
    expect(screen.getByText("Grátis")).toBeInTheDocument();

    const vipCta = screen.getByRole("link", { name: /Garantir Ingresso Ouro VIP/i });
    const noAccCta = screen.getByRole("link", { name: /Garantir Ingresso Sem Acomodação/i });
    const whatsappLink = screen.getByRole("link", { name: /Falar no WhatsApp/i });
    const parentsLink = screen.getByRole("link", { name: /Enviar resumo para meus pais/i });

    expect(vipCta.getAttribute("href")).toContain("https://eisme.com.br/evento/ejm2027");
    expect(vipCta.getAttribute("href")).toContain("utm_source=instagram");
    expect(noAccCta.getAttribute("href")).toContain("utm_campaign=lote1");
    expect(whatsappLink.getAttribute("href")).toContain("https://wa.me/5515998162393");
    expect(parentsLink.getAttribute("href")).toContain("https://wa.me/?text=");
  });
});
