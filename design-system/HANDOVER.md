# Frontend Handover Note

## Design System Implementation Guide

To the Frontend Team:
Here is the complete design system specification for the OrderUp Admin Dashboard.

### 1. Resources Location
All design files are located in: `/home/tun/workspace/orderup/design-system/`

- **Tokens:** `/tokens/` (Colors, Typography, Spacing) - *Implement these as Tailwind config or CSS Variables first.*
- **Components:** `/components/` (HTML/SCSS specs for core UI elements)
- **Mockups:** `/mockups/` (Layout structure for key pages)

### 2. Implementation Strategy

**Step 1: Foundation (Global Styles)**
- Set up the **Color Palette** (`tokens/colors.md`) in your `tailwind.config.ts` or global CSS variables.
- Configure the **Typography** (`tokens/typography.md`) font families (Inter/JetBrains Mono) and sizes.
- Define the **Spacing** scale (`tokens/spacing.md`).

**Step 2: Core Components**
Build these reusable React components first (in `frontend/components/admin/ui/`):
- `Button.tsx` (Primary, Secondary, Danger, Ghost variants)
- `Input.tsx`, `Select.tsx`, `Badge.tsx`
- `Card.tsx` (Header, Body, Footer)
- `Table.tsx` (Container, Header, Row, Cell)

**Step 3: Layouts**
- Implement the **Dashboard Shell** (Sidebar + Header) described in `mockups/dashboard.md`.

### 3. Key Requirements
- **Responsive:** Mobile-first approach. Check `tokens/spacing.md` for breakpoints.
- **Accessibility:** Strict adherence to `guidelines/accessibility.md`. Ensure focus states and aria-labels are present.
- **Theme:** The Admin theme is distinct (Green/Blue) from the consumer app.

### 4. Questions?
Check the `README.md` in the design-system folder for a full map of the specifications.

Happy coding!
