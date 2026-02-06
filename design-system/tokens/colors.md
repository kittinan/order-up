# Color Palette

## Primary Colors (Green Theme)
The primary colors use green as the main brand color, representing growth and success.

### Green Shades
```scss
$green-50: #f0fdf4;   // Very light green - backgrounds
$green-100: #dcfce7;  // Light green - subtle backgrounds
$green-200: #bbf7d0;  // Soft green - hover states
$green-300: #86efac;  // Light green - borders
$green-400: #4ade80;  // Medium green - secondary buttons
$green-500: #22c55e;  // Primary green - main brand color
$green-600: #16a34a;  // Dark green - primary buttons
$green-700: #15803d;  // Very dark green - text, active states
$green-800: #166534;  // Deep green - headings
$green-900: #14532d;  // Deepest green - accents
```

## Secondary Colors (Blue Theme)
Secondary colors use blue for trust, stability, and professional appearance.

### Blue Shades
```scss
$blue-50: #eff6ff;    // Very light blue - backgrounds
$blue-100: #dbeafe;    // Light blue - subtle backgrounds
$blue-200: #bfdbfe;    // Soft blue - hover states
$blue-300: #93c5fd;    // Light blue - borders
$blue-400: #60a5fa;    // Medium blue - secondary buttons
$blue-500: #3b82f6;    // Primary blue - links, secondary actions
$blue-600: #2563eb;    // Dark blue - primary buttons
$blue-700: #1d4ed8;    // Very dark blue - text, active states
$blue-800: #1e40af;    // Deep blue - headings
$blue-900: #1e3a8a;    // Deepest blue - accents
```

## Semantic Colors
Colors used for specific meanings and actions.

### Success (Green-based)
```scss
$success-50: #f0fdf4;
$success-100: #dcfce7;
$success-500: #22c55e;
$success-600: #16a34a;
$success-700: #15803d;
```

### Warning (Amber-based)
```scss
$warning-50: #fffbeb;
$warning-100: #fef3c7;
$warning-500: #f59e0b;
$warning-600: #d97706;
$warning-700: #b45309;
```

### Error (Red-based)
```scss
$error-50: #fef2f2;
$error-100: #fee2e2;
$error-500: #ef4444;
$error-600: #dc2626;
$error-700: #b91c1c;
```

### Info (Blue-based)
```scss
$info-50: #eff6ff;
$info-100: #dbeafe;
$info-500: #3b82f6;
$info-600: #2563eb;
$info-700: #1d4ed8;
```

## Neutral Colors
For text, backgrounds, and subtle elements.

### Gray Shades
```scss
$gray-50: #f9fafb;    // Off-white - main backgrounds
$gray-100: #f3f4f6;   // Light gray - card backgrounds
$gray-200: #e5e7eb;   // Medium gray - borders, dividers
$gray-300: #d1d5db;   // Soft gray - disabled states
$gray-400: #9ca3af;   // Medium gray - secondary text
$gray-500: #6b7280;   // Medium gray - body text
$gray-600: #4b5563;   // Dark gray - headings
$gray-700: #374151;   // Very dark gray - important text
$gray-800: #1f2937;   // Deep gray - UI elements
$gray-900: #111827;   // Darkest gray - primary text
```

## Color Usage Guidelines

### Primary Color Applications
- **$green-500:** Main brand color, primary navigation
- **$green-600:** Primary buttons, active states
- **$green-700:** Hover states for primary buttons
- **$blue-500:** Secondary actions, links
- **$blue-600:** Secondary buttons

### Background Colors
- **$gray-50:** Main background color
- **$white:** Card backgrounds, content areas
- **$gray-100:** Alternative backgrounds, striped rows

### Text Colors
- **$gray-900:** Primary text, headings
- **$gray-700:** Secondary text, labels
- **$gray-500:** Body text, descriptions
- **$gray-400:** Disabled text, placeholders

### Status Colors
- **$success-500:** Success states, positive indicators
- **$warning-500:** Warning states, attention needed
- **$error-500:** Error states, critical issues
- **$info-500:** Information states, neutral indicators

## Accessibility Compliance
All color combinations meet WCAG 2.1 AA standards for contrast ratios:
- Normal text: 4.5:1 minimum contrast
- Large text: 3:1 minimum contrast
- UI components: 3:1 minimum contrast

## CSS Variables
```css
:root {
  /* Primary Colors */
  --color-primary-50: #f0fdf4;
  --color-primary-100: #dcfce7;
  --color-primary-200: #bbf7d0;
  --color-primary-300: #86efac;
  --color-primary-400: #4ade80;
  --color-primary-500: #22c55e;
  --color-primary-600: #16a34a;
  --color-primary-700: #15803d;
  --color-primary-800: #166534;
  --color-primary-900: #14532d;

  /* Secondary Colors */
  --color-secondary-50: #eff6ff;
  --color-secondary-100: #dbeafe;
  --color-secondary-200: #bfdbfe;
  --color-secondary-300: #93c5fd;
  --color-secondary-400: #60a5fa;
  --color-secondary-500: #3b82f6;
  --color-secondary-600: #2563eb;
  --color-secondary-700: #1d4ed8;
  --color-secondary-800: #1e40af;
  --color-secondary-900: #1e3a8a;

  /* Semantic Colors */
  --color-success-500: #22c55e;
  --color-warning-500: #f59e0b;
  --color-error-500: #ef4444;
  --color-info-500: #3b82f6;

  /* Neutral Colors */
  --color-gray-50: #f9fafb;
  --color-gray-100: #f3f4f6;
  --color-gray-200: #e5e7eb;
  --color-gray-300: #d1d5db;
  --color-gray-400: #9ca3af;
  --color-gray-500: #6b7280;
  --color-gray-600: #4b5563;
  --color-gray-700: #374151;
  --color-gray-800: #1f2937;
  --color-gray-900: #111827;
}
```