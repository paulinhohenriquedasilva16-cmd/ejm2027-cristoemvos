import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Store from "@/pages/Store";

describe("Store page (/loja)", () => {
  it("applies /loja SEO metadata (canonical + Product JSON-LD), preselects size, and supports Back/Edit in Pix step", () => {
    window.scrollTo = () => {};

    render(
      <MemoryRouter initialEntries={["/loja"]}>
        <Store />
      </MemoryRouter>
    );

    // SEO checks: canonical points to /loja, single robots meta, Product JSON-LD present without FAQPage
    const canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    expect(canonical?.href).toBe("https://ejm.cristoemvos.com/loja");
    expect(document.head.querySelectorAll('meta[name="robots"]').length).toBe(1);
    const jsonLd = document.getElementById("ejm-route-jsonld")?.textContent ?? "";
    expect(jsonLd).toContain('"@type":"Product"');
    expect(jsonLd).not.toContain("FAQPage");

    // Preselect size "G" directly on the product card
    fireEvent.click(screen.getByRole("button", { name: "G" }));
    fireEvent.click(screen.getByRole("button", { name: /Reservar/i }));

    // Dialog opens with "G" already selected
    fireEvent.change(screen.getByLabelText(/Seu nome/i), { target: { value: "Natanael Vitorino" } });
    fireEvent.click(screen.getByRole("button", { name: /Continuar para o Pix/i }));

    expect(screen.getByText(/Pagamento via Pix/i)).toBeInTheDocument();
    expect(screen.getByText("177.965.118.09")).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /Enviar reserva e comprovante no WhatsApp/i })
    ).toBeInTheDocument();

    // Back / Edit button returns to form step
    fireEvent.click(screen.getByRole("button", { name: /Voltar e editar/i }));
    expect(screen.getByLabelText(/Seu nome/i)).toBeInTheDocument();
  });
});
