# Button Components

## Button Overview
Buttons are interactive elements that enable users to perform actions. They come in different styles, sizes, and states to communicate their purpose and importance.

## Button Types

### Primary Button
The main action button for the most important actions.

```scss
.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;  // 12px 24px
  background-color: var(--color-primary-600);  // Green
  color: white;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  border-radius: 0.5rem;  // 8px
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;  // Accessibility: minimum touch target

  &:hover {
    background-color: var(--color-primary-700);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:focus {
    outline: 2px solid var(--color-primary-500);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-gray-300);
    color: var(--color-gray-500);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
```

### Secondary Button
Secondary actions and less prominent options.

```scss
.btn-secondary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;  // 12px 24px
  background-color: white;
  color: var(--color-secondary-600);  // Blue
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  border-radius: 0.5rem;  // 8px
  border: 1px solid var(--color-gray-300);
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background-color: var(--color-gray-50);
    border-color: var(--color-secondary-500);
    color: var(--color-secondary-700);
  }

  &:active {
    background-color: var(--color-gray-100);
  }

  &:focus {
    outline: 2px solid var(--color-secondary-500);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-gray-50);
    color: var(--color-gray-400);
    border-color: var(--color-gray-200);
    cursor: not-allowed;
  }
}
```

### Danger Button
For destructive actions like delete, remove, or cancel.

```scss
.btn-danger {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;  // 12px 24px
  background-color: var(--color-error-600);
  color: white;
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  border-radius: 0.5rem;  // 8px
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background-color: var(--color-error-700);
    transform: translateY(-1px);
    box-shadow: 0 4px 6px rgba(239, 68, 68, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  &:focus {
    outline: 2px solid var(--color-error-500);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: var(--color-gray-300);
    color: var(--color-gray-500);
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
}
```

### Ghost Button
Minimal button style for subtle actions and tertiary options.

```scss
.btn-ghost {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 0.75rem 1.5rem;  // 12px 24px
  background-color: transparent;
  color: var(--color-gray-700);
  font-weight: var(--font-weight-medium);
  font-size: var(--font-size-base);
  border-radius: 0.5rem;  // 8px
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.2s ease;
  min-height: 44px;

  &:hover {
    background-color: var(--color-gray-100);
    color: var(--color-gray-900);
  }

  &:active {
    background-color: var(--color-gray-200);
  }

  &:focus {
    outline: 2px solid var(--color-gray-400);
    outline-offset: 2px;
  }

  &:disabled {
    color: var(--color-gray-400);
    cursor: not-allowed;
  }
}
```

## Button Sizes

### Small Button
For compact interfaces and when space is limited.

```scss
.btn-sm {
  padding: 0.5rem 1rem;  // 8px 16px
  font-size: var(--font-size-sm);  // 14px
  min-height: 36px;
  border-radius: 0.375rem;  // 6px
}

.btn-primary.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  min-height: 36px;
  border-radius: 0.375rem;
}

.btn-secondary.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  min-height: 36px;
  border-radius: 0.375rem;
}

.btn-danger.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  min-height: 36px;
  border-radius: 0.375rem;
}

.btn-ghost.btn-sm {
  padding: 0.5rem 1rem;
  font-size: var(--font-size-sm);
  min-height: 36px;
  border-radius: 0.375rem;
}
```

### Large Button
For prominent actions and hero sections.

```scss
.btn-lg {
  padding: 1rem 2rem;  // 16px 32px
  font-size: var(--font-size-lg);  // 18px
  min-height: 52px;
  border-radius: 0.5rem;  // 8px
}

.btn-primary.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  min-height: 52px;
  border-radius: 0.5rem;
}

.btn-secondary.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  min-height: 52px;
  border-radius: 0.5rem;
}

.btn-danger.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  min-height: 52px;
  border-radius: 0.5rem;
}

.btn-ghost.btn-lg {
  padding: 1rem 2rem;
  font-size: var(--font-size-lg);
  min-height: 52px;
  border-radius: 0.5rem;
}
```

## Button with Icons
Buttons that include icons for better visual communication.

```scss
.btn-with-icon {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;  // 8px
}

.btn-icon {
  width: 1.25rem;  // 20px
  height: 1.25rem;
  flex-shrink: 0;
}

.btn-icon-left {
  order: -1;
}

.btn-icon-right {
  order: 1;
}

// Icon-only button
.btn-icon-only {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.5rem;  // 40px
  height: 2.5rem;
  padding: 0;
  border-radius: 0.375rem;  // 6px
}

.btn-icon-only.btn-sm {
  width: 2rem;  // 32px
  height: 2rem;
}

.btn-icon-only.btn-lg {
  width: 3rem;  // 48px
  height: 3rem;
}
```

## Button Groups
Related buttons grouped together.

```scss
.btn-group {
  display: inline-flex;
  border-radius: 0.5rem;  // 8px
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.btn-group .btn {
  border-radius: 0;
  border-width: 1px 1px 1px 0;
  margin-left: -1px;
}

.btn-group .btn:first-child {
  border-top-left-radius: 0.5rem;
  border-bottom-left-radius: 0.5rem;
  border-left-width: 1px;
  margin-left: 0;
}

.btn-group .btn:last-child {
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
}

.btn-group-vertical {
  display: inline-flex;
  flex-direction: column;
  border-radius: 0.5rem;
  overflow: hidden;
}

.btn-group-vertical .btn {
  border-radius: 0;
  border-width: 1px 1px 0 1px;
  margin-top: -1px;
  margin-left: 0;
}

.btn-group-vertical .btn:first-child {
  border-top-left-radius: 0.5rem;
  border-top-right-radius: 0.5rem;
  border-top-width: 1px;
  margin-top: 0;
}

.btn-group-vertical .btn:last-child {
  border-bottom-left-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-bottom-width: 1px;
}
```

## Loading State
Button showing loading indication.

```scss
.btn-loading {
  position: relative;
  color: transparent !important;
  pointer-events: none;
}

.btn-loading::after {
  content: '';
  position: absolute;
  width: 1rem;  // 16px
  height: 1rem;
  top: 50%;
  left: 50%;
  margin: -0.5rem 0 0 -0.5rem;
  border: 2px solid transparent;
  border-top-color: currentColor;
  border-radius: 50%;
  animation: btn-spin 0.8s linear infinite;
}

@keyframes btn-spin {
  to {
    transform: rotate(360deg);
  }
}
```

## Usage Examples

### HTML Examples
```html
<!-- Primary Button -->
<button class="btn-primary">Primary Action</button>

<!-- Secondary Button with Icon -->
<button class="btn-secondary btn-with-icon">
  <svg class="btn-icon btn-icon-left" aria-hidden="true">
    <!-- Icon SVG -->
  </svg>
  Edit
</button>

<!-- Danger Button -->
<button class="btn-danger">Delete</button>

<!-- Ghost Button -->
<button class="btn-ghost">Cancel</button>

<!-- Button Group -->
<div class="btn-group">
  <button class="btn-primary">Save</button>
  <button class="btn-secondary">Save & Continue</button>
  <button class="btn-ghost">Cancel</button>
</div>

<!-- Loading Button -->
<button class="btn-primary btn-loading">Processing...</button>
```

## Accessibility Guidelines
1. **Touch Targets:** All buttons have minimum 44×44px touch target size
2. **Focus States:** Clear visual focus indicators with 2px outline
3. **Color Contrast:** All button styles meet WCAG 2.1 AA contrast requirements
4. **Keyboard Navigation:** Buttons are focusable and activatable with keyboard
5. **Screen Readers:** Use appropriate ARIA attributes when needed

## Best Practices
1. **Primary Action:** Use primary buttons for the main action in any interface
2. **Button Hierarchy:** Limit primary buttons to one per section/page
3. **Clear Labels:** Use clear, action-oriented button text
4. **Consistent Spacing:** Maintain consistent spacing around buttons
5. **State Feedback:** Provide visual feedback for all button states