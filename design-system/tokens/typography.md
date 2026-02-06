# Typography

## Font Families
The OrderUp Admin Dashboard uses a clean, modern font stack optimized for readability and professional appearance.

### Primary Font Stack
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
```

### Font Usage
- **Inter:** Primary font for all UI elements (requires import)
- **System fonts:** Fallback stack for maximum compatibility
- **Monospace font:** Used for code, data tables, and technical information

### Monospace Font Stack
```css
font-family: 'JetBrains Mono', 'Monaco', 'Consolas', 'Ubuntu Mono', monospace;
```

## Font Sizes
A modular type scale based on powers of two for consistency and hierarchy.

### Type Scale
```scss
$font-size-xs: 0.75rem;    // 12px - Small labels, captions
$font-size-sm: 0.875rem;   // 14px - Small text, secondary info
$font-size-base: 1rem;     // 16px - Base body text
$font-size-lg: 1.125rem;   // 18px - Large text, lead paragraphs
$font-size-xl: 1.25rem;    // 20px - Small headings, subheadings
$font-size-2xl: 1.5rem;    // 24px - Medium headings
$font-size-3xl: 1.875rem;  // 30px - Large headings
$font-size-4xl: 2.25rem;   // 36px - Page titles
$font-size-5xl: 3rem;      // 48px - Hero titles
```

### Responsive Font Sizes
Font sizes scale slightly on larger screens for better readability.

```scss
// Mobile (default)
$font-size-base: 1rem;

// Tablet and above
@media (min-width: 768px) {
  $font-size-base: 1.0625rem; // 17px
}

// Desktop and above
@media (min-width: 1024px) {
  $font-size-base: 1.125rem; // 18px
}
```

## Font Weights
A limited set of font weights for consistency and performance.

### Weight Scale
```scss
$font-weight-light: 300;     // Light - large headings, decorative
$font-weight-normal: 400;   // Normal/Regular - body text
$font-weight-medium: 500;   // Medium - emphasis, buttons
$font-weight-semibold: 600; // Semibold - headings, emphasis
$font-weight-bold: 700;     // Bold - strong emphasis
$font-weight-extrabold: 800; // Extra Bold - page titles
```

### Font Weight Usage
- **300 (Light):** Large display text, decorative elements
- **400 (Normal):** Body text, descriptions, standard content
- **500 (Medium):** Button text, labels, emphasis
- **600 (Semibold):** Headings, navigation items, important labels
- **700 (Bold):** Strong emphasis, critical information
- **800 (Extra Bold):** Page titles, hero sections

## Line Heights
Optimal line heights for readability and spacing.

### Line Height Scale
```scss
$leading-tight: 1.25;   // Tight spacing - headings
$leading-snug: 1.375;  // Snug spacing - compact text
$leading-normal: 1.5;   // Normal spacing - body text
$leading-relaxed: 1.625; // Relaxed spacing - paragraphs
$leading-loose: 2;      // Loose spacing - lead paragraphs
```

### Line Height Usage
- **1.25:** Display text, large headings
- **1.375:** Small headings, compact text
- **1.5:** Body text, standard paragraphs
- **1.625:** Lead paragraphs, introductory text
- **2.0:** Spacious text, emphasis paragraphs

## Letter Spacing
Subtle letter spacing for improved readability and style.

### Letter Spacing Scale
```scss
$tracking-tighter: -0.025em;  // Tighter - large headings
$tracking-tight: -0.01em;     // Tight - headings
$tracking-normal: 0;          // Normal - body text
$tracking-wide: 0.025em;      // Wide - small text
$tracking-wider: 0.05em;      // Wider - buttons, labels
$tracking-widest: 0.1em;      // Widest - decorative text
```

## Text Components

### Headings
```scss
h1, .heading-1 {
  font-size: $font-size-4xl;    // 36px
  font-weight: $font-weight-extrabold;
  line-height: $leading-tight;
  letter-spacing: $tracking-tighter;
  color: var(--color-gray-900);
}

h2, .heading-2 {
  font-size: $font-size-3xl;    // 30px
  font-weight: $font-weight-bold;
  line-height: $leading-tight;
  letter-spacing: $tracking-tight;
  color: var(--color-gray-900);
}

h3, .heading-3 {
  font-size: $font-size-2xl;    // 24px
  font-weight: $font-weight-semibold;
  line-height: $leading-snug;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-800);
}

h4, .heading-4 {
  font-size: $font-size-xl;     // 20px
  font-weight: $font-weight-semibold;
  line-height: $leading-snug;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-800);
}

h5, .heading-5 {
  font-size: $font-size-lg;     // 18px
  font-weight: $font-weight-medium;
  line-height: $leading-normal;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-700);
}

h6, .heading-6 {
  font-size: $font-size-base;   // 16px
  font-weight: $font-weight-bold;
  line-height: $leading-normal;
  letter-spacing: $tracking-wide;
  color: var(--color-gray-700);
}
```

### Body Text
```scss
.body-text {
  font-size: $font-size-base;   // 16px
  font-weight: $font-weight-normal;
  line-height: $leading-normal;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-700);
}

.body-text-sm {
  font-size: $font-size-sm;     // 14px
  font-weight: $font-weight-normal;
  line-height: $leading-relaxed;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-600;
}

.body-text-xs {
  font-size: $font-size-xs;     // 12px
  font-weight: $font-weight-normal;
  line-height: $leading-relaxed;
  letter-spacing: $tracking-wide;
  color: var(--color-gray-500);
}
```

### Labels and Captions
```scss
.label {
  font-size: $font-size-xs;     // 12px
  font-weight: $font-weight-medium;
  line-height: $leading-normal;
  letter-spacing: $tracking-wide;
  color: var(--color-gray-600);
  text-transform: uppercase;
}

.caption {
  font-size: $font-size-xs;     // 12px
  font-weight: $font-weight-normal;
  line-height: $leading-normal;
  letter-spacing: $tracking-normal;
  color: var(--color-gray-500);
}
```

## CSS Variables
```css
:root {
  /* Font Sizes */
  --font-size-xs: 0.75rem;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.125rem;
  --font-size-xl: 1.25rem;
  --font-size-2xl: 1.5rem;
  --font-size-3xl: 1.875rem;
  --font-size-4xl: 2.25rem;
  --font-size-5xl: 3rem;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-normal: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;

  /* Line Heights */
  --leading-tight: 1.25;
  --leading-snug: 1.375;
  --leading-normal: 1.5;
  --leading-relaxed: 1.625;
  --leading-loose: 2;

  /* Letter Spacing */
  --tracking-tighter: -0.025em;
  --tracking-tight: -0.01em;
  --tracking-normal: 0;
  --tracking-wide: 0.025em;
  --tracking-wider: 0.05em;
  --tracking-widest: 0.1em;
}
```

## Usage Guidelines
1. **Consistency:** Use the defined font sizes and weights consistently
2. **Hierarchy:** Create clear visual hierarchy with proper font size and weight combinations
3. **Readability:** Ensure adequate contrast and line height for body text
4. **Performance:** Use font-weight values that correspond to actual font files
5. **Accessibility:** Maintain minimum font sizes of 16px for body text on mobile