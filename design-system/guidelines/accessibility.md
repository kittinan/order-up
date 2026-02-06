# Accessibility Guidelines (WCAG 2.1 AA)

## Overview
The OrderUp Admin Dashboard must be accessible to all users, including those with disabilities. We target **WCAG 2.1 Level AA** compliance.

## 1. Color & Contrast

### Contrast Ratios
- **Text:** Minimum **4.5:1** for normal text, **3:1** for large text (18pt+ or 14pt bold).
- **UI Components:** Minimum **3:1** for borders of inputs, buttons, and icons.
- **Tools:** Use the design system tokens; they are pre-checked for compliance.

### Color Dependence
- **Rule:** Never rely on color alone to convey meaning.
- **Example (Bad):** "Red items are out of stock."
- **Example (Good):** "Items marked 'Out of Stock' (and colored red) are unavailable."
- **Status Badges:** Always include text labels inside badges, or strict aria-labels if using dot-only indicators.

## 2. Typography & Layout

### Text Resizing
- The interface must remain usable when text is zoomed up to **200%**.
- Avoid fixed heights on text containers (allow expansion).

### Hierarchy
- Use heading levels (`h1` through `h6`) in logical order. Do not skip levels (e.g., don't jump from `h1` to `h3`).

## 3. Keyboard Navigation

### Focus Management
- All interactive elements (buttons, inputs, links) must be reachable via `Tab`.
- **Focus Indicator:** A visible outline (2px solid) must appear on focused elements. Never use `outline: none` without a replacement.
- **Order:** Tab order must match the visual reading order.

### Keyboard Shortcuts
- Support standard keys: `Enter` / `Space` to activate buttons, `Esc` to close modals/drawers.

## 4. Forms & Inputs

### Labels
- Every input must have a visible `<label>` or `aria-label`.
- Placeholders are **not** replacements for labels (they disappear when typing).

### Error Identification
- Validation errors must be described in text, not just by turning the border red.
- Associate error messages with inputs using `aria-describedby`.

## 5. Screen Readers (ARIA)

### Semantic HTML
- Use native HTML elements (`<button>`, `<nav>`, `<table>`) whenever possible before reaching for `<div>` with ARIA.

### ARIA Attributes
- Use `aria-expanded="true/false"` for dropdowns and accordions.
- Use `aria-current="page"` for the active link in navigation.
- Use `aria-live="polite"` for dynamic content updates (like toast notifications).

## 6. Images & Icons

### Alt Text
- Informative images need `alt` text describing the content.
- Decorative icons should use `aria-hidden="true"` or empty `alt=""`.

## Checklist for Developers
- [ ] Can you navigate the entire page using only `Tab` and `Enter`?
- [ ] Is the focus indicator always visible?
- [ ] Does resizing the browser text to 200% break the layout?
- [ ] Do all form inputs have associated labels?
- [ ] Are status messages read out by screen readers?
