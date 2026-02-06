# Order List Page Mockup

## Layout Structure
- **Layout:** Dashboard Layout.
- **Pattern:** Advanced Data Table with complex filtering.

## Wireframe

```
+---------------------+-------------------------------------------------+
|  SIDEBAR            |  MAIN CONTENT                                   |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | HEADER                                    |  |
|                     |  | <h1>Orders</h1>                           |  |
|                     |  | [Tabs: All | Pending | Completed | Cancel]|  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | ADVANCED FILTERS (Collapsible Panel)      |  |
|                     |  | [Search Order ID...]                      |  |
|                     |  | [Date From] - [Date To]                   |  |
|                     |  | [Tenant Select v] [Min Amount]            |  |
|                     |  |                          [Reset] [Apply]  |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
|                     |  +-------------------------------------------+  |
|                     |  | ORDER TABLE                               |  |
|                     |  |                                           |  |
|                     |  | [] ID    | Date   | Tenant | Cust | St | $|  |
|                     |  | --|-------|--------|--------|------|----|-|  |
|                     |  | [] #9991 | 2m ago | Burger | John | [P] |$|  |
|                     |  | [] #9992 | 5m ago | Sushi  | Jane | [S] |$|  |
|                     |  | [] #9993 | 1h ago | Coffee | Bob  | [C] |$|  |
|                     |  |                                           |  |
|                     |  | [Bulk Actions: Print, Refund v]           |  |
|                     |  | [Pagination]                              |  |
|                     |  +-------------------------------------------+  |
|                     |                                                 |
+---------------------+-------------------------------------------------+
```

## Order Detail Drawer (Slide-over)
When clicking an order ID:

```
+-------------------------------------------------------------+---------+
| (Main page dimmed)                                          | DRAWER  |
|                                                             | [X]     |
|                                                             |         |
|                                                             | Order   |
|                                                             | #9991   |
|                                                             | [Badge] |
|                                                             |         |
|                                                             | Items:  |
|                                                             | 1x A    |
|                                                             | 2x B    |
|                                                             | ------  |
|                                                             | T: ฿500 |
|                                                             |         |
|                                                             | Cust:   |
|                                                             | John D  |
|                                                             |         |
|                                                             | [Btns]  |
|                                                             | [Print] |
|                                                             | [Void]  |
+-------------------------------------------------------------+---------+
```

## Key Components
1.  **Tabs:** For quick status filtering (very common use case).
2.  **Filter Panel:** Needs to support multiple inputs without cluttering.
3.  **Bulk Actions:** Appears when rows are selected via checkbox.
4.  **Drawer:** Standard pattern for quick preview without leaving context.
