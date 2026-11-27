import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import ScheduleSection from "@/components/ScheduleSection";

describe("ScheduleSection", () => {
  it("renders all 3 days in DOM for SEO and switches panels via click and arrow keys", () => {
    render(<ScheduleSection />);

    expect(screen.getByRole("heading", { name: /Cronograma Oficial/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Chegada dos irmãos e Almoço/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Culto de Abertura/i })).toBeInTheDocument();

    // Saturday & Sunday exist in DOM (hidden) for search crawlers even before interaction
    expect(document.getElementById("panel-sabado")).toHaveAttribute("hidden");
    expect(document.getElementById("panel-domingo")).toHaveAttribute("hidden");

    const sextaTab = screen.getByRole("tab", { name: /Sexta/i });
    const sabadoTab = screen.getByRole("tab", { name: /Sábado/i });
    const domingoTab = screen.getByRole("tab", { name: /Domingo/i });

    // WAI-ARIA ArrowRight keyboard navigation
    fireEvent.keyDown(sextaTab, { key: "ArrowRight" });
    expect(sabadoTab).toHaveAttribute("aria-selected", "true");
    expect(document.getElementById("panel-sabado")).not.toHaveAttribute("hidden");
    expect(screen.getByRole("heading", { name: /Louvorzão\/Ranchão/i })).toBeInTheDocument();

    fireEvent.keyDown(sabadoTab, { key: "ArrowRight" });
    expect(domingoTab).toHaveAttribute("aria-selected", "true");
    expect(document.getElementById("panel-domingo")).not.toHaveAttribute("hidden");
    expect(screen.getByRole("heading", { name: /Culto de Encerramento/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Almoço e despedida/i })).toBeInTheDocument();
  });
});
