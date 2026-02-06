# Status Badges

## Badge Overview
Badges are used to highlight the status, state, or value of an item. They are commonly used in tables, cards, and headers.

## Base Badge Style
```scss
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.125rem 0.625rem; // 2px 10px
  border-radius: 9999px; // Pill shape
  font-size: 0.75rem; // 12px
  font-weight: var(--font-weight-medium);
  line-height: 1.25rem;
  white-space: nowrap;
}
```

## Badge Variants

### Success (Green)
Used for: Completed, Active, Paid, Success.
```scss
.badge-success {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}
```

### Warning (Yellow/Amber)
Used for: Pending, Processing, Review Needed, Warning.
```scss
.badge-warning {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}
```

### Error / Danger (Red)
Used for: Cancelled, Failed, Rejected, Deleted, Critical.
```scss
.badge-danger {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}
```

### Info (Blue)
Used for: Draft, In Progress, Info, New.
```scss
.badge-info {
  background-color: var(--color-info-100);
  color: var(--color-info-700);
}
```

### Neutral (Gray)
Used for: Inactive, Archived, Offline, Unknown.
```scss
.badge-neutral {
  background-color: var(--color-gray-100);
  color: var(--color-gray-700);
}
```

## Badge with Dot
Adds a small status dot for extra visual cue.

```scss
.badge-dot-container {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem; // 6px
}

.badge-dot {
  width: 0.5rem; // 8px
  height: 0.5rem;
  border-radius: 50%;
  
  &.dot-success { background-color: var(--color-success-500); }
  &.dot-warning { background-color: var(--color-warning-500); }
  &.dot-danger  { background-color: var(--color-error-500); }
  &.dot-neutral { background-color: var(--color-gray-400); }
}
```

## Usage Examples

```html
<!-- Standard Badges -->
<span class="badge badge-success">Active</span>
<span class="badge badge-warning">Pending Payment</span>
<span class="badge badge-danger">Cancelled</span>

<!-- Dot Badges (cleaner look for some contexts) -->
<div class="badge-dot-container">
  <span class="badge-dot dot-success"></span>
  <span>Online</span>
</div>
```

## Accessibility
- Ensure the contrast ratio between the text and background color is at least 4.5:1.
- Do not rely on color alone to convey meaning (the text label "Active" does this, but if using only a dot, provide aria-label).

## Best Practices
1.  **Concise Labels:** Keep text short (1-2 words).
2.  **Consistent Colors:** Always use Green for good states and Red for bad states.
3.  **Context:** Badges should be close to the item they describe (e.g., next to the name or in a dedicated Status column).
