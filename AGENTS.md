# AGENTS.md

Rules for this project (EJM 2027 landing page).

- Entrance animations must translate vertically (`y`), never horizontally (`x`). Why: cards sliding in from the sides push the viewport wider than the device and create horizontal scroll on phones, which the user reported as a broken mobile view.
- Verify mobile layouts at a real phone width (around 390px) with the live preview before reporting a UI change complete, and confirm `document.documentElement.scrollWidth - window.innerWidth` is 0. Why: desktop-only checks hide overflow bugs the user sees first.
- Keep ticket/pricing emphasis neutral: age-based packages are presented with identical weight, so styling must not favor one package. Why: the user explicitly rejected popularity-based emphasis.
