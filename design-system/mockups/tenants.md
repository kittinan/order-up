# Tenant Management Page Mockup

## Layout Structure
- **Layout:** Standard Dashboard Layout.
- **Pattern:** List View with Filters + Detail Modal/Page.

## Wireframe

```
+---------------------+-------------------------------------------------+
|  SIDEBAR            |  MAIN CONTENT                                   |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | HEADER SECTION                            |  |
|                     |  | <h1>Tenants</h1>                          |  |
|                     |  | <div class="actions">                     |  |
|                     |  |   [Btn-Secondary: Export]                 |  |
|                     |  |   [Btn-Primary: + Add Tenant]             |  |
|                     |  | </div>                                    |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | FILTER BAR (Card or Toolbar)              |  |
|                     |  | [Search Input...] [Status Dropdown v]     |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | DATA TABLE                                |  |
|                     |  |                                           |  |
|                     |  | Tenant Name      | Plan    | Status  | $  |  |
|                     |  | -----------------|---------|---------|----|  |
|                     |  | [Avatar] BurgerK | Pro     | [Active]| 5k |  |
|                     |  | [Avatar] SushiYi | Starter | [Active]| 2k |  |
|                     |  | [Avatar] CoffeeX | Pro     | [Warn]  | 0  |  |
|                     |  | ...                                       |  |
|                     |  |                                           |  |
|                     |  | [Pagination: < 1 2 3 > ]                  |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
+---------------------+-------------------------------------------------+
```

## Detail View (Drill-down)
When clicking on a tenant row:

```
+-----------------------------------------------------------------------+
|  < Back to Tenants                                                    |
|                                                                       |
|  [Logo] Burger King Demo     [Badges: Active] [Badges: Pro Plan]      |
|                                                                       |
|  +------------------------+  +-------------------------------------+  |
|  | CARD: Company Details  |  | CARD: Usage Stats                   |  |
|  |                        |  |                                     |  |
|  | Contact: John Doe      |  | Total Orders: 1,200                 |  |
|  | Email: john@bk.com     |  | This Month: ฿45,000                 |  |
|  | Phone: 081-234-5678    |  | API Calls: 45k/50k                  |  |
|  | Address: Bangkok...    |  |                                     |  |
|  +------------------------+  +-------------------------------------+  |
|                                                                       |
|  +-----------------------------------------------------------------+  |
|  | TABS: [Overview] [Orders] [Users] [Settings]                    |  |
|  |                                                                 |
|  | (Tab Content Area)                                              |  |
|  +-----------------------------------------------------------------+  |
+-----------------------------------------------------------------------+
```

## Key Components
1.  **Filter Bar:** Combination of `Input Text` (Search) and `Select` (Status filter).
2.  **Table:** Full featured `components/tables.md` with avatar support in primary cell.
3.  **Status Badges:** Critical for showing Account Status (Active/Suspended).
4.  **Detail Layout:** 2-column grid for details vs stats. Tabs for sub-resources.
