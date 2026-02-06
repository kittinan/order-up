# Spacing & Layout

## Spacing System
A consistent spacing system based on a 4px base unit for rhythm and harmony across all interfaces.

### Base Units
```scss
$spacing-unit: 0.25rem;  // 4px base unit
$spacing-0: 0;           // 0px
$spacing-1: 0.25rem;     // 4px
$spacing-2: 0.5rem;      // 8px
$spacing-3: 0.75rem;     // 12px
$spacing-4: 1rem;        // 16px
$spacing-5: 1.25rem;     // 20px
$spacing-6: 1.5rem;      // 24px
$spacing-8: 2rem;        // 32px
$spacing-10: 2.5rem;     // 40px
$spacing-12: 3rem;       // 48px
$spacing-16: 4rem;       // 64px
$spacing-20: 5rem;       // 80px
$spacing-24: 6rem;       // 96px
$spacing-32: 8rem;       // 128px
```

### Spacing Usage Guidelines

#### Component Padding
```scss
// Tight padding - compact components
.padding-tight {
  padding: $spacing-2;  // 8px
}

// Normal padding - cards, buttons
.padding-normal {
  padding: $spacing-4;  // 16px
}

// Comfortable padding - large components
.padding-comfortable {
  padding: $spacing-6;  // 24px
}

// Spacious padding - hero sections
.padding-spacious {
  padding: $spacing-8;  // 32px
}
```

#### Component Margins
```scss
// Component spacing
.margin-between {
  margin-bottom: $spacing-6;  // 24px between components
}

// Section spacing
.margin-section {
  margin-bottom: $spacing-10; // 40px between sections
}

// Page spacing
.margin-page {
  margin-bottom: $spacing-16; // 64px at page bottom
}
```

#### Inset Spacing (Content within containers)
```scss
// Tight insets
.inset-tight {
  padding: $spacing-2 $spacing-3;  // 8px 12px
}

// Normal insets
.inset-normal {
  padding: $spacing-4 $spacing-5;  // 16px 20px
}

// Comfortable insets
.inset-comfortable {
  padding: $spacing-6 $spacing-8;  // 24px 32px
}
```

## Layout System
A responsive grid system built with CSS Grid and Flexbox for modern layouts.

### Container System
```scss
// Max-width containers
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 $spacing-4;  // 16px
}

.container-fluid {
  width: 100%;
  padding: 0 $spacing-4;  // 16px
}

// Responsive containers
@media (min-width: 640px) {
  .container {
    padding: 0 $spacing-6;  // 24px
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 0 $spacing-8;  // 32px
  }
}
```

### Grid System
```scss
// 12-column grid system
.grid {
  display: grid;
  gap: $spacing-6;  // 24px gap
  grid-template-columns: repeat(12, 1fr);
}

// Common grid layouts
.grid-2-col {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3-col {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4-col {
  grid-template-columns: repeat(4, 1fr);
}

// Responsive grid
.grid-responsive {
  display: grid;
  gap: $spacing-4;  // 16px
  grid-template-columns: 1fr;
}

@media (min-width: 640px) {
  .grid-responsive {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .grid-responsive {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Layout Patterns

#### Dashboard Layout
```scss
.dashboard-layout {
  display: grid;
  grid-template-areas:
    "header header"
    "sidebar main"
    "sidebar main";
  grid-template-columns: 250px 1fr;
  grid-template-rows: auto 1fr;
  min-height: 100vh;
}

.dashboard-header {
  grid-area: header;
  padding: $spacing-4;  // 16px
  background: var(--color-white);
  border-bottom: 1px solid var(--color-gray-200);
}

.dashboard-sidebar {
  grid-area: sidebar;
  padding: $spacing-6;  // 24px
  background: var(--color-gray-50);
  border-right: 1px solid var(--color-gray-200);
}

.dashboard-main {
  grid-area: main;
  padding: $spacing-8;  // 32px
  background: var(--color-gray-50);
}
```

#### Card Layout
```scss
.card {
  background: var(--color-white);
  border-radius: 0.5rem;  // 8px
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.card-header {
  padding: $spacing-6 $spacing-6 $spacing-4;  // 24px 24px 16px
  border-bottom: 1px solid var(--color-gray-200);
}

.card-body {
  padding: $spacing-6;  // 24px
}

.card-footer {
  padding: $spacing-4 $spacing-6;  // 16px 24px
  background: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-200);
}
```

#### Form Layout
```scss
.form-group {
  margin-bottom: $spacing-5;  // 20px
}

.form-label {
  display: block;
  margin-bottom: $spacing-2;  // 8px
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-700);
}

.form-input {
  width: 100%;
  padding: $spacing-3 $spacing-4;  // 12px 16px
  border: 1px solid var(--color-gray-300);
  border-radius: 0.375rem;  // 6px
  font-size: var(--font-size-base);
}

.form-actions {
  display: flex;
  gap: $spacing-3;  // 12px
  margin-top: $spacing-8;  // 32px
  padding-top: $spacing-6;  // 24px
  border-top: 1px solid var(--color-gray-200);
}
```

## Responsive Breakpoints
Mobile-first approach with clear breakpoints for different device sizes.

### Breakpoint System
```scss
// Mobile first (default)
$breakpoint-sm: 640px;   // Small tablets
$breakpoint-md: 768px;   // Tablets
$breakpoint-lg: 1024px;  // Small desktops
$breakpoint-xl: 1280px;  // Desktops
$breakpoint-2xl: 1536px; // Large desktops
```

### Responsive Mixins
```scss
// Mobile first approach
@mixin mobile-only {
  @media (max-width: #{$breakpoint-sm - 1}) {
    @content;
  }
}

@mixin sm {
  @media (min-width: $breakpoint-sm) {
    @content;
  }
}

@mixin md {
  @media (min-width: $breakpoint-md) {
    @content;
  }
}

@mixin lg {
  @media (min-width: $breakpoint-lg) {
    @content;
  }
}

@mixin xl {
  @media (min-width: $breakpoint-xl) {
    @content;
  }
}

@mixin 2xl {
  @media (min-width: $breakpoint-2xl) {
    @content;
  }
}

// Ranges
@mixin sm-only {
  @media (min-width: $breakpoint-sm) and (max-width: #{$breakpoint-md - 1}) {
    @content;
  }
}

@mixin md-only {
  @media (min-width: $breakpoint-md) and (max-width: #{$breakpoint-lg - 1}) {
    @content;
  }
}

@mixin lg-only {
  @media (min-width: $breakpoint-lg) and (max-width: #{$breakpoint-xl - 1}) {
    @content;
  }
}
```

### Responsive Patterns

#### Responsive Grid
```scss
.responsive-grid {
  display: grid;
  gap: $spacing-4;  // 16px
  grid-template-columns: 1fr;

  @include md {
    grid-template-columns: repeat(2, 1fr);
  }

  @include lg {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

#### Responsive Spacing
```scss
.responsive-padding {
  padding: $spacing-4;  // 16px mobile

  @include md {
    padding: $spacing-6;  // 24px tablet
  }

  @include lg {
    padding: $spacing-8;  // 32px desktop
  }
}
```

## CSS Variables
```css
:root {
  /* Spacing */
  --spacing-0: 0;
  --spacing-1: 0.25rem;
  --spacing-2: 0.5rem;
  --spacing-3: 0.75rem;
  --spacing-4: 1rem;
  --spacing-5: 1.25rem;
  --spacing-6: 1.5rem;
  --spacing-8: 2rem;
  --spacing-10: 2.5rem;
  --spacing-12: 3rem;
  --spacing-16: 4rem;
  --spacing-20: 5rem;
  --spacing-24: 6rem;
  --spacing-32: 8rem;

  /* Breakpoints */
  --breakpoint-sm: 640px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 1024px;
  --breakpoint-xl: 1280px;
  --breakpoint-2xl: 1536px;
}
```

## Usage Guidelines
1. **Consistency:** Use the defined spacing units consistently throughout the interface
2. **Hierarchy:** Larger spacing for more important elements and sections
3. **Responsiveness:** Test all layouts at different breakpoints
4. **Performance:** Use CSS Grid for complex layouts, Flexbox for component alignment
5. **Accessibility:** Ensure adequate touch targets (minimum 44x44px) on mobile devices