# Mockup: 04 - Analytics Page

หน้านี้ถูกออกแบบมาเพื่อการวิเคราะห์ข้อมูลเชิงลึก ผู้ใช้สามารถกรองและดูข้อมูลในมุมมองต่างๆ ผ่านกราฟและตาราง

**File Path:** `/mockups/04_analytics_page.md`

---

## 1. Page Layout & Structure

- **Main Container:**
    - `padding: 2rem`
- **Page Header:**
    - `<h1>Analytics</h1>`
        - _Component: Typography `<h1>`_

---

## 2. Global Filter Bar

นี่คือส่วนที่สำคัญที่สุดของหน้า Analytics ใช้สำหรับกำหนดข้อมูลที่จะแสดงผลในทุกส่วนของหน้า

- **Component:** `Card`
- **Card Header:**
    - `<h4>Filters</h4>`
- **Card Body:**
    - **Layout:** A horizontal form/flexbox layout.
    - **Filter 1: Date Range Picker**
        - `Label: Date Range`
        - A specialized input component for selecting a start and end date.
    - **Filter 2: Tenant Selector**
        - `Label: Tenant`
        - `<select>` dropdown with a list of all tenants. (e.g., "All Tenants", "Example Cafe", etc.)
        - _Component: `Select`_
    - **Filter 3: Metric to Display**
        - `Label: Metric`
        - `<select>` dropdown to choose the main data point (e.g., "Total Revenue", "Order Count", "New Customers").
        - _Component: `Select`_
    - **Action Button:**
        - `<button class="btn-primary">Apply Filters</button>`
        - _Component: `Button` (Primary)_

---

## 3. Main Chart Display

การ์ดขนาดใหญ่สำหรับแสดงผลกราฟหลักตามที่ผู้ใช้ได้กรองไว้

- **Component:** `Card`
- **Card Header:**
    - The title should be dynamic based on the filters. e.g., `<h4>Total Revenue from 1 Jan - 31 Jan 2024</h4>`.
- **Card Body:**
    - **Content:** A large Bar Chart or Line Chart. The chart type might change depending on the metric selected.
        - The chart should be interactive (e.g., tooltips on hover).
        - Chart colors should use the Design System palette (`Primary`, `Secondary`, etc.).

---

## 4. Data Breakdown Section

ส่วนสรุปข้อมูลย่อย วางอยู่ใต้กราฟหลัก (2-column grid)

### Column 1: Top Lists (Left Side)

- **Component:** `Card`
- **Card Header:**
    - Dynamic title, e.g., `<h4>Top 10 Products by Revenue</h4>`.
- **Card Body:**
    - **Component:** `Table` (a simple version).
    - **Columns:** `Product Name`, `Orders`, `Revenue`.
    - Shows a ranked list based on the filters.

### Column 2: Breakdown by Category (Right Side)

- **Component:** `Card`
- **Card Header:**
    - `<h4>Sales by Category</h4>`
- **Card Body:**
    - **Content:** A Pie Chart or Donut Chart showing the proportion of sales across different product categories.
    - Each slice of the chart should use a color from our palette.

---

ขั้นตอนต่อไป ซึ่งเป็น Mockup สุดท้าย: **Order List Page**.