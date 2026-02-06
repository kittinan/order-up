# Table Components

## Table Overview
Tables are the primary method for displaying collections of data in the admin dashboard. They support sorting, filtering, and row actions.

## Base Table Styles
Standard table styling.

```scss
.table-container {
  width: 100%;
  overflow-x: auto; // Handle horizontal scroll on small screens
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  border: 1px solid var(--color-gray-200);
}

.table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  text-align: left;
  font-size: var(--font-size-sm);
  color: var(--color-gray-700);

  thead {
    background-color: var(--color-gray-50);
    
    th {
      padding: 0.75rem 1.5rem;
      font-weight: var(--font-weight-medium);
      color: var(--color-gray-500);
      text-transform: uppercase;
      font-size: var(--font-size-xs);
      letter-spacing: 0.05em;
      border-bottom: 1px solid var(--color-gray-200);
      white-space: nowrap;

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
      
      // Sortable headers
      &.sortable {
        cursor: pointer;
        user-select: none;
        
        &:hover {
          color: var(--color-gray-700);
          background-color: var(--color-gray-100);
        }

        &::after {
          content: '↕'; // Replace with icon
          margin-left: 0.5rem;
          opacity: 0.5;
        }
      }
    }
  }

  tbody {
    tr {
      background-color: white;
      transition: background-color 0.15s ease;

      &:not(:last-child) td {
        border-bottom: 1px solid var(--color-gray-100);
      }

      &:hover {
        background-color: var(--color-gray-50);
      }

      // Selected row state
      &.selected {
        background-color: var(--color-primary-50);
      }
    }

    td {
      padding: 1rem 1.5rem;
      vertical-align: middle;
      color: var(--color-gray-900);

      &:first-child {
        padding-left: 1.5rem;
      }

      &:last-child {
        padding-right: 1.5rem;
      }
    }
  }
}
```

## Cell Types

### Primary Cell
The main identifier for the row (e.g., Name, Order ID).

```scss
.cell-primary {
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-900);
}
```

### Secondary Cell
Less important details (e.g., Date, ID).

```scss
.cell-secondary {
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
}
```

### Numeric Cell
For financial or quantitative data.

```scss
.cell-numeric {
  text-align: right;
  font-variant-numeric: tabular-nums; // Aligns numbers
}
```

### Action Cell
Contains buttons or menus for row operations.

```scss
.cell-actions {
  text-align: right;
  white-space: nowrap;

  .btn-icon {
    color: var(--color-gray-400);
    
    &:hover {
      color: var(--color-primary-600);
    }
  }
}
```

## Table Footer / Pagination
Sticky footer for navigation controls.

```scss
.table-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  border-top: 1px solid var(--color-gray-200);
  background-color: white;

  .pagination-info {
    font-size: var(--font-size-sm);
    color: var(--color-gray-500);
  }

  .pagination-controls {
    display: flex;
    gap: 0.5rem;
  }
}
```

## Usage Example

```html
<div class="table-container">
  <table class="table">
    <thead>
      <tr>
        <th class="sortable">Order ID</th>
        <th class="sortable">Customer</th>
        <th>Status</th>
        <th class="sortable cell-numeric">Amount</th>
        <th>Date</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="cell-primary">#ORD-001</td>
        <td>
          <div class="font-medium">Somchai Jai-dee</div>
          <div class="cell-secondary">somchai@email.com</div>
        </td>
        <td><span class="badge badge-success">Completed</span></td>
        <td class="cell-numeric">฿450.00</td>
        <td class="cell-secondary">Feb 6, 2026</td>
        <td class="cell-actions">
          <button class="btn-ghost btn-sm">Edit</button>
        </td>
      </tr>
      <!-- More rows -->
    </tbody>
  </table>
  <div class="table-footer">
    <span class="pagination-info">Showing 1-10 of 45 results</span>
    <div class="pagination-controls">
      <button class="btn-secondary btn-sm" disabled>Previous</button>
      <button class="btn-secondary btn-sm">Next</button>
    </div>
  </div>
</div>
```

## Best Practices
1.  **Alignment:** Left-align text, right-align numbers/actions.
2.  **Density:** Use comfortable padding (1rem) for readability, tighter for high-density data.
3.  **Truncation:** Truncate long text with ellipses (`...`) and use tooltips.
4.  **Empty States:** Always provide a helpful "No data found" state if the table is empty.
