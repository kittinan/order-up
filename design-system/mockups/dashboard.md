# Dashboard Main Page Mockup

## Layout Structure
- **Layout:** Dashboard Layout (Sidebar + Top Navigation + Main Content)
- **Grid:** 3-column responsive grid for stats cards.

## Wireframe

```
+-----------------------------------------------------------------------+
|  [Logo] OrderUp Admin         [Search...]        [Notif] [Profile v]  |
+---------------------+-------------------------------------------------+
|  SIDEBAR            |  MAIN CONTENT PADDING                           |
|                     |                                                 |
|  [Icon] Dashboard   |  <h1>Dashboard Overview</h1>                    |
|  [Icon] Tenants     |  <p>Welcome back, Admin</p>                     |
|  [Icon] Orders      |                                                 |
|  [Icon] Analytics   |  +-------------------------------------------+  |
|  [Icon] Settings    |  | [STATS GRID]                              |  |
|                     |  |                                           |  |
|                     |  | +-----------+  +-----------+  +-----------+| |
|                     |  | | Revenue   |  | Orders    |  | Tenants   || |
|                     |  | | ฿1.2M ^12%|  | 1,450 ^5% |  | 24 ^2     || |
|                     |  | +-----------+  +-----------+  +-----------+| |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | [SECTION: Recent Activity & Charts]       |  |
|                     |  |                                           |  |
|                     |  | +-----------------------+  +-------------+|  |
|                     |  | | CARD: Revenue Trend   |  | CARD: Quick ||  |
|                     |  | | [Graph Placeholder]   |  | Actions     ||  |
|                     |  | |                       |  | [Btn: Add]  ||  |
|                     |  | |                       |  | [Btn: Rept] ||  |
|                     |  | +-----------------------+  +-------------+|  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | CARD: Recent Orders Table                 |  |
|                     |  | [Header: Recent Orders | View All ->]     |  |
|                     |  | ----------------------------------------- |  |
|                     |  | ID      | Customer | Amount | Status      |  |
|                     |  | #1234   | John D.  | ฿500   | [Success]   |  |
|                     |  | #1235   | Jane S.  | ฿120   | [Pending]   |  |
|                     |  | #1236   | Bob M.   | ฿1,200 | [Success]   |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
+---------------------+-------------------------------------------------+
```

## Key Components
1.  **Stats Cards:** Use `components/cards.md` (Stats Card Variant). Green for revenue, Blue for orders.
2.  **Chart Card:** Large card spanning 2 columns (on desktop).
3.  **Recent Orders Table:** Simplified version of `components/tables.md` (limit 5 rows, no pagination).
4.  **Quick Actions:** Card containing a list of `btn-secondary` or links for common tasks (Add Tenant, Export Report).

## Responsive Behavior
- **Mobile:** Sidebar collapses to hamburger menu. Grid becomes 1 column.
- **Tablet:** Grid becomes 2 columns.
- **Desktop:** Full 3-4 column grid.
