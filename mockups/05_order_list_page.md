# Mockup: 05 - Order List Page

หน้านี้แสดงรายการคำสั่งซื้อ (Orders) ทั้งหมด ผู้ดูแลระบบสามารถค้นหา, กรอง, และจัดการคำสั่งซื้อจากหน้านี้ได้

**File Path:** `/mockups/05_order_list_page.md`

---

## 1. Page Layout & Structure

- **Main Container:**
    - `padding: 2rem`
- **Page Header:**
    - `<h1>Orders</h1>`
        - _Component: Typography `<h1>`_

---

## 2. Filter & Search Section

ส่วนสำหรับกรองข้อมูลที่ซับซ้อนและมีความสำคัญต่อการจัดการออเดอร์

- **Component:** `Card`
- **Card Body:**
    - **Layout:** 3-Column Grid to accommodate more filters.
    - **Column 1: Search**
        - `Label: Search`
        - `<input type="text" placeholder="Order ID, Customer Name...">`
        - _Component: `Input`_
    - **Column 2: Filter by Status**
        - `Label: Status`
        - `<select>` dropdown with options: `All`, `Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`.
        - _Component: `Select`_
    - **Column 3: Filter by Date**
        - `Label: Date Range`
        - A Date Range Picker component.
    - **Actions (below the grid):**
        - `<button class="btn-primary">Apply Filters</button>`
        - `<button class="btn-secondary-outline">Clear</button>`

---

## 3. Orders Data Table Section

ตารางแสดงข้อมูลคำสั่งซื้อแบบละเอียด

- **Component:** `Card` (to contain the table)
- **Card Body:**
    - **Component:** `Table` (with `table-striped` and `table-hover` classes)
    - The container should have `overflow-x: auto`.

- **Table Columns (`<thead>`):**
    - `<th><input type="checkbox"></th>` - For bulk actions.
    - `<th>Order ID</th>`
    - `<th>Customer</th>`
    - `<th>Tenant</th>`
    - `<th>Date</th>`
    - `<th>Total</th>`
    - `<th>Status</th>`
    - `<th>Actions</th>` (Right-aligned)

- **Table Body (`<tbody>`):**
    - Each `<tr>` represents an order.
    - **Checkbox Column:** For selecting rows.
    - **Order ID Column:** e.g., `#ORD-5821`
    - **Customer Column:** e.g., `Jane Doe`
    - **Tenant Column:** e.g., `Example Cafe`
    - **Date Column:** e.g., `2024-10-26 14:30`
    - **Total Column:** e.g., `฿890.00`
    - **Status Column:**
        - _Component: `Badge`_
        - `<span class="badge badge-warning">Processing</span>`
        - `<span class="badge badge-success">Shipped</span>`
        - `<span class="badge badge-danger">Cancelled</span>`
    - **Actions Column:** (Right-aligned)
        - `<button class="btn-secondary">View Details</button>`
            - _Component: `Button` (Secondary Style)_
            - This would link to a dedicated Order Detail page.

---

ตอนนี้ผมได้สร้าง Mockups/Wireframes ทั้งหมด 4 ส่วนตาม Task 2 ครบถ้วนแล้วครับ

ขั้นตอนต่อไปคือ **Task 3: Design guidelines document** ซึ่งจะเป็นการรวบรวมกฎการออกแบบต่างๆ เช่น Spacing, Layout, และ Accessibility ครับ