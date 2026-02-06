# Analytics Page Mockup

## Layout Structure
- **Layout:** Dashboard Layout.
- **Pattern:** Dashboard/Reporting grid with date range controls.

## Wireframe

```
+---------------------+-------------------------------------------------+
|  SIDEBAR            |  MAIN CONTENT                                   |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | HEADER & CONTROLS                         |  |
|                     |  | <h1>Analytics</h1>                        |  |
|                     |  | [Date Range Picker: Last 30 Days v]       |  |
|                     |  | [Btn-Secondary: Export PDF]               |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | KEY METRICS (4-Col Grid)                  |  |
|                     |  | +--------+ +--------+ +--------+ +------| |  |
|                     |  | | GMV    | | Orders | | AOV    | | User | |  |
|                     |  | | ฿5.2M  | | 12.5k  | | ฿415   | | 8.2k | |  |
|                     |  | +--------+ +--------+ +--------+ +------| |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | MAIN CHART (Revenue over time)            |  |
|                     |  | [ Title: Gross Merchandise Value        ] |  |
|                     |  | [ ....................................  ] |  |
|                     |  | [ ....................................  ] |  |
|                     |  | [ ....................................  ] |  |
|                     |  | [ x-axis: dates ----------------------  ] |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +----------------------+ +------------------+  |
|                     |  | TOP TENANTS (Table)  | | CATEGORY MIX   |  |
|                     |  | 1. Tenant A (฿1.2M)  | | [Pie Chart]    |  |
|                     |  | 2. Tenant B (฿0.8M)  | | Food: 60%      |  |
|                     |  | 3. Tenant C (฿0.5M)  | | Drink: 30%     |  |
|                     |  | ...                  | | Retail: 10%    |  |
|                     |  +----------------------+ +------------------+  |
|                     |                                                 |
+---------------------+-------------------------------------------------+
```

## Key Components
1.  **Date Range Picker:** Custom input component (using `inputs.md` styles).
2.  **Charts:** Placeholders for library implementation (e.g., Recharts/Chart.js).
    -   Container needs standardized padding/border (`card` style).
3.  **Metric Cards:** Simplified stats cards (just Label + Value).
4.  **Ranking List:** Simple table without pagination for top lists.

## Visual Hierarchy
1.  **Date Control:** Needs to be prominent as it controls all data.
2.  **Big Numbers:** Immediate visibility of health metrics.
3.  **Trends:** The large chart is the secondary focal point.
