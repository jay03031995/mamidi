# Artisan Dashboard Design System

## 1. Overview & Creative North Star: "The Digital Atelier"

This design system is built to bridge the gap between high-utility data management and the soulful, tactile world of craft. Our Creative North Star is **"The Digital Atelier."** 

Just as a physical studio is a place of both organization and inspiration, this UI must feel like a curated workspace. We move beyond "template" looks by rejecting rigid, boxy grids in favor of **intentional asymmetry** and **tonal depth**. The interface should feel as though it was composed on fine stationery rather than rendered in a browser. By using high-contrast typography scales and overlapping surface layers, we create a dashboard that respects the artisan's eye while providing the professional precision required for global order management.

---

## 2. Colors: Tonal Harmony

Our palette is rooted in the organic—olive greens and golden yellows—but refined for digital performance using a sophisticated Material-inspired hierarchy.

### The "No-Line" Rule
To achieve a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries between content areas must be defined exclusively through background color shifts. For example, a dashboard sidebar should sit on `surface-container-low`, while the primary workspace utilizes the `surface` background.

### Surface Hierarchy & Nesting
Think of the UI as layers of fine, handmade paper.
- **Base Layer:** `surface` (#fcfae6) - The canvas.
- **Elevated Sections:** `surface-container-low` (#f6f4e1) - Secondary information areas.
- **Interactive Cards:** `surface-container-lowest` (#ffffff) - High-priority items that need to pop.
- **Deep Wells:** `surface-container-highest` (#e5e3d0) - Used for search bars or "sunken" utility areas.

### The "Glass & Gradient" Rule
For floating elements, such as "Add Product" modals or status notifications, use **Glassmorphism**. Apply a semi-transparent `surface` color with a `backdrop-blur` (e.g., 16px to 24px). For primary CTAs, a subtle linear gradient from `primary` (#385419) to `primary_container` (#4f6d2f) adds a "signature" polish that feels bespoke.

---

## 3. Typography: Editorial Elegance

The typography pairs a serif for character and a sans-serif for utility, creating an "Art in Every Stroke" rhythm.

- **Display & Headlines (Noto Serif):** These are our "Artisan" moments. Use `display-lg` and `headline-md` for landing moments and high-level dashboard summaries. The serif adds authority and a sense of history.
- **Navigation & Labels (Manrope):** This is our "Precision" tool. `title-md` and `body-lg` in Manrope ensure that complex order tables and product forms remain legible.
- **The Hierarchy Strategy:** Large display text should feel bold and intentional, often paired with ample negative space. Small labels (`label-sm`) should use a slightly wider letter-spacing to maintain readability against colored backgrounds.

---

## 4. Elevation & Depth: Tonal Layering

Traditional shadows often feel "muddy." We convey hierarchy through the **Layering Principle**.

- **Ambient Shadows:** When a floating effect is necessary, use extra-diffused shadows.
  - *Color:* `on_surface` (#1c1c11) at 6% opacity.
  - *Blur:* 20px – 40px for a soft, natural glow.
- **The Ghost Border:** If a form field or container needs a boundary for accessibility, use a **Ghost Border**: `outline_variant` at 15% opacity. It provides a visual guide without the harshness of a standard line.
- **Atmospheric Depth:** Use `surface_tint` (#49672a) at very low opacities (2-4%) as an overlay for interactive elements to give them a "lustre" when hovered.

---

## 5. Components

### Buttons: The Tactile Touch
- **Primary:** Gradient from `primary` to `primary_container`. Text in `on_primary`. Radius: `md` (0.375rem).
- **Secondary:** Surface-only with a Ghost Border. Text in `primary`.
- **Tertiary:** Text-only in `secondary` (#735c00), underlined on hover with a 2px stroke of `secondary_container`.

### Form Fields (Product Management)
Input containers use `surface_container_highest` with no border. On focus, the container transitions to `surface_container_lowest` with a 2px Ghost Border in `primary`. The label (Manrope) sits elegantly above the field in `on_surface_variant`.

### Data Tables (Order Management)
- **Gridless Design:** Forbid horizontal and vertical divider lines.
- **Separation:** Use alternating row colors (`surface` and `surface_container_low`) or simply generous vertical spacing.
- **Status Indicators:** 
  - *Shipped:* `primary_fixed` background with `on_primary_fixed_variant` text.
  - *Pending:* `secondary_fixed` background with `on_secondary_fixed_variant` text.
  - *Issue:* `error_container` background with `on_error_container` text.
  - *Style:* Use a Pill shape (Radius: `full`) for status chips.

### Additional Signature Component: The "Artisan Story Card"
A custom component for the dashboard that displays "Recently Added Products." It features an asymmetrical layout: an image offset to the left, overlapping a `surface-container-lowest` card containing the product metadata.

---

## 6. Do's and Don'ts

### Do
- **Do** use white space as a structural element. If an interface feels cluttered, increase the margin rather than adding a border.
- **Do** use the `tertiary` (#7c3a07) and `tertiary_container` for "limited edition" or "special order" alerts to provide a warm contrast to the green/yellow core.
- **Do** ensure all interactive states (hover, active) have a subtle background shift of at least 5% to maintain a tactile feel.

### Don't
- **Don't** use 100% black text. Always use `on_surface` (#1c1c11) to maintain the "warm" artisan feel.
- **Don't** use "hard" corners. All containers must use at least a `DEFAULT` (0.25rem) or `md` (0.375rem) corner radius to align with the "organic" brand promise.
- **Don't** use default system shadows. Always tint shadows with the `on_surface` color to keep them atmospheric and integrated.