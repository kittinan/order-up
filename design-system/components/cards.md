# Card & Panel Components

## Card Overview
Cards are the fundamental building blocks of the admin interface. They group related information and actions into a distinct container.

## Base Card Style
Standard card style used throughout the application.

```scss
.card {
  background-color: white;
  border-radius: 0.5rem;  // 8px
  border: 1px solid var(--color-gray-200);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: box-shadow 0.2s ease;

  &:hover {
    // Optional hover state for interactive cards
    // box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
}
```

## Card Anatomy

### Card Header
Contains the title, subtitle, and optional actions.

```scss
.card-header {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: space-between;
  min-height: 3.5rem; // 56px

  h3 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-semibold);
    color: var(--color-gray-900);
    margin: 0;
  }

  .card-subtitle {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
    margin-top: 0.25rem;
  }
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  align-items: center;
}
```

### Card Body
The main content area of the card.

```scss
.card-body {
  padding: 1.5rem;
  flex: 1;
  color: var(--color-gray-700);

  // Remove padding for full-bleed content (like tables)
  &.no-padding {
    padding: 0;
  }
}
```

### Card Footer
Optional footer for actions or summary information.

```scss
.card-footer {
  padding: 1rem 1.5rem;
  background-color: var(--color-gray-50);
  border-top: 1px solid var(--color-gray-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.75rem;
}
```

## Card Variants

### Stats Card
Used for displaying key metrics on the dashboard.

```scss
.stats-card {
  @extend .card;
  padding: 1.5rem;
  position: relative;

  .stats-label {
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);
    color: var(--color-gray-500);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .stats-value {
    font-size: var(--font-size-3xl);
    font-weight: var(--font-weight-bold);
    color: var(--color-gray-900);
    margin: 0.5rem 0;
  }

  .stats-trend {
    display: flex;
    align-items: center;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-medium);

    &.trend-up {
      color: var(--color-success-600);
    }

    &.trend-down {
      color: var(--color-error-600);
    }

    &.trend-neutral {
      color: var(--color-gray-500);
    }

    svg {
      width: 1rem;
      height: 1rem;
      margin-right: 0.25rem;
    }
  }

  .stats-icon {
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
    width: 3rem;
    height: 3rem;
    border-radius: 0.5rem;
    background-color: var(--color-primary-50);
    color: var(--color-primary-600);
    display: flex;
    align-items: center;
    justify-content: center;

    svg {
      width: 1.5rem;
      height: 1.5rem;
    }
  }
}
```

### Interactive Card
Used for selection or navigation.

```scss
.interactive-card {
  @extend .card;
  cursor: pointer;
  border: 2px solid transparent; // Reserve space for border

  &:hover {
    border-color: var(--color-primary-300);
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }

  &.selected {
    border-color: var(--color-primary-500);
    background-color: var(--color-primary-50);
  }
}
```

## Usage Examples

### Standard Content Card
```html
<div class="card">
  <div class="card-header">
    <h3>Recent Orders</h3>
    <div class="card-actions">
      <button class="btn-secondary btn-sm">Export</button>
    </div>
  </div>
  <div class="card-body">
    <!-- Content goes here -->
  </div>
  <div class="card-footer">
    <a href="#" class="link-primary">View all orders</a>
  </div>
</div>
```

### Dashboard Stats Card
```html
<div class="stats-card">
  <div class="stats-label">Total Revenue</div>
  <div class="stats-value">฿1,240,500</div>
  <div class="stats-trend trend-up">
    <svg>...</svg>
    <span>12% vs last month</span>
  </div>
  <div class="stats-icon">
    <svg>...</svg>
  </div>
</div>
```

## Best Practices
1.  **Hierarchy:** Use the Card Header for clear context.
2.  **Consistency:** Keep padding consistent (Standard is 1.5rem/24px).
3.  **Grouping:** Use cards to group logically related information.
4.  **Elevation:** Use shadow sparingly; flat borders are preferred for dense interfaces.
