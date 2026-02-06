# Mockup: 02 - Tenant Management (List Page)

หน้านี้ใช้สำหรับแสดงรายการผู้เช่า (Tenants) หรือร้านค้าทั้งหมดในระบบ ผู้ดูแลระบบสามารถค้นหา, กรอง, และจัดการผู้เช่าแต่ละรายจากหน้านี้ได้

**File Path:** `/mockups/02_tenant_list_page.md`

---

## 1. Page Layout & Structure

- **Main Container:**
    - `padding: 2rem`

- **Page Header (Flexbox Layout):**
    - Aligned with `space-between` to push items to opposite ends.
    - **Left Side:**
        - `<h1>Tenant Management</h1>`
            - _Component: Typography `<h1>`_
    - **Right Side:**
        - `<button class="btn-primary">Create New Tenant</button>`
            - _Component: `Button` (Primary Style)_
            - This button will lead to the Tenant Create/Edit page.

---

## 2. Filter & Search Section

ส่วนสำหรับกรองข้อมูลในตาราง จะอยู่ใน Card เพื่อให้ดูเป็นสัดส่วน

- **Component:** `Card`
- **Card Body:**
    - **Layout:** 2-Column Grid
    - **Column 1: Search Input**
        - `Label: Search by Name`
        - `<input type="text" placeholder="Enter tenant name...">`
            - _Component: `Input`_
    - **Column 2: Filter by Status**
        - `Label: Status`
        - `<select>` dropdown with options: `All`, `Active`, `Inactive`, `Suspended`.
            - _Should be styled similarly to the `Input` component._

---

## 3. Tenants Data Table Section

ส่วนหลักของหน้า แสดงผลผู้เช่าทั้งหมดในรูปแบบตาราง

- **Component:** `Card` (to contain the table)
- **Card Body:**
    - **Component:** `Table` (with `table-striped` and `table-hover` classes)
        - The container for this table should have `overflow-x: auto` for responsiveness.

- **Table Columns (`<thead>`):**
    - `<th>ID</th>`
    - `<th>Tenant Name</th>`
    - `<th>Status</th>`
    - `<th>Joined Date</th>`
    - `<th>Actions</th>` (Right-aligned text)

- **Table Body (`<tbody>`):**
    - Each `<tr>` represents a tenant.
    - **ID Column:** e.g., `T0001`
    - **Tenant Name Column:** e.g., `Example Cafe & Bistro`
    - **Status Column:**
        - _Component: `Badge`_
        - `<span class="badge badge-success">Active</span>`
        - `<span class="badge badge-warning">Inactive</span>`
        - `<span class="badge badge-danger">Suspended</span>`
    - **Joined Date Column:** e.g., `2024-10-25`
    - **Actions Column:** (Right-aligned)
        - A button group with:
        - `<button class="btn-secondary">Edit</button>`
            - _Component: `Button` (Secondary/Outline Style)_
            - Leads to the Tenant Detail/Edit page for that ID.
        - `<button class="btn-danger-outline">Delete</button>` (or an icon button)
            - _Component: A new button style might be needed, or use a `Danger` button but with an outline style for less visual weight._

---

ขั้นตอนต่อไป: **Mockup for Tenant Detail Page**.