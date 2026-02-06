# Mockup: 01 - Dashboard Main Page

หน้านี้เป็นหน้าสรุปภาพรวม (Overview) สำหรับ Admin โดยจะแสดง Key Metrics และกิจกรรมล่าสุดเพื่อให้เห็นภาพรวมของระบบได้อย่างรวดเร็ว

**File Path:** `/mockups/01_dashboard_main_page.md`

---

## 1. Page Layout & Structure

- **Main Container:**
    - `padding: 2rem`

- **Page Header:**
    - `<h1>Dashboard</h1>`
        - _Component: Typography `<h1>`_

---

## 2. Stat Cards Section (แถบสถิติ)

ส่วนนี้จะแสดงผล Key Metrics ที่สำคัญในรูปแบบของ Card ที่วางเรียงกันในแถวเดียว (4-column grid)

- **Layout:** 4-Column Grid

### Card 1: Total Revenue
- **Component:** `Card`
- **Body:**
    - Text: `TOTAL REVENUE` (small, gray text)
    - Value: `฿1,250,450` (`<h2>` style)
    - Icon: (Optional) A currency icon floated to the right.

### Card 2: Total Orders
- **Component:** `Card`
- **Body:**
    - Text: `TOTAL ORDERS` (small, gray text)
    - Value: `8,420` (`<h2>` style)
    - Icon: (Optional) A shopping cart icon.

### Card 3: New Customers (This Month)
- **Component:** `Card`
- **Body:**
    - Text: `NEW CUSTOMERS (THIS MONTH)` (small, gray text)
    - Value: `312` (`<h2>` style)
    - Icon: (Optional) A user icon.

### Card 4: Pending Orders
- **Component:** `Card`
- **Body:**
    - Text: `PENDING ORDERS` (small, gray text)
    - Value: `45` (`<h2>` style)
    - Icon: (Optional) An hourglass icon.

---

## 3. Main Content Section

ส่วนของเนื้อหาหลัก แบ่งเป็น 2 ส่วนซ้าย-ขวา (2-column grid, 70%-30%)

### Column 1: Sales Analytics (Left Side)

- **Component:** `Card`
- **Card Header:**
    - `<h4>Sales Analytics</h4>`
- **Card Body:**
    - **Content:** A line chart showing revenue over the last 30 days.
        - X-axis: Date
        - Y-axis: Revenue (in ฿)
        - The line should use the `Primary` color.

### Column 2: Recent Orders (Right Side)

- **Component:** `Card`
- **Card Header:**
    - `<h4>Recent Orders</h4>`
- **Card Body:**
    - **Component:** A simplified `Table` (no header, no borders for a list-like feel)
    - **Rows:** Each row represents an order and contains:
        - Order ID & Customer Name (`#1234 by John Doe`)
        - Total Price (`฿550.00`) floated to the right.
        - Status Badge below the name (`<span class="badge badge-success">Completed</span>`)
            - _Component: `Badge` (Success, Warning, etc.)_
- **Card Footer:**
    - A `Secondary Button` linking to the full order list page.
    - `<button class="btn-secondary">View All Orders</button>`
        - _Component: `Button` (Secondary Style)_

---

ขั้นตอนต่อไป: **Mockup for Tenant Management Page**.