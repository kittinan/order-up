# Mockup: 03 - Tenant Management (Detail/Edit Page)

หน้านี้เป็นฟอร์มสำหรับสร้างผู้เช่าใหม่ หรือแก้ไขข้อมูลของผู้เช่าที่มีอยู่แล้ว จะมีการนำ Component ประเภท `Input`, `Select`, `Button` มาใช้งานเป็นหลัก

**File Path:** `/mockups/03_tenant_detail_page.md`

---

## 1. Page Layout & Structure

- **Main Container:**
    - `padding: 2rem`

- **Page Header:**
    - `<h1>Edit Tenant: Example Cafe & Bistro</h1>`
        - For new tenants: `<h1>Create New Tenant</h1>`
        - _Component: Typography `<h1>`_
    - A "Back to list" link/button should be present.

---

## 2. Main Form Card

ข้อมูลทั้งหมดจะถูกรวบรวมอยู่ใน Card ใบใหญ่ใบเดียวเพื่อความเป็นระเบียบ

- **Component:** `Card`
- **Card Header:**
    - `<h4>Tenant Information</h4>`

- **Card Body:**
    - **Layout:** 2-Column Grid for the form fields.

    ---

    ### **Column 1: Basic Information (Left Side)**

    - **Field 1: Tenant Name**
        - `Label: Tenant Name`
        - `<input type="text" value="Example Cafe & Bistro">`
        - _Component: `Input`_

    - **Field 2: Subdomain**
        - `Label: Subdomain`
        - An input with a prefix: `[ https:// ] [ example-cafe ] [ .orderup.app ]`
        - _Component: `Input` (with add-on/prefix)_

    - **Field 3: Contact Email**
        - `Label: Contact Email`
        - `<input type="email" value="contact@examplecafe.com">`
        - _Component: `Input`_

    - **Field 4: Phone Number**
        - `Label: Phone Number`
        - `<input type="tel" value="081-234-5678">`
        - _Component: `Input`_

    ---

    ### **Column 2: Configuration (Right Side)**

    - **Field 5: Status**
        - `Label: Status`
        - `<select>` with options: `Active`, `Inactive`, `Suspended`.
        - _Component: `Select` (styled like `Input`)_

    - **Field 6: Subscription Plan**
        - `Label: Subscription Plan`
        - `<select>` with options: `Free`, `Basic`, `Pro`.
        - _Component: `Select`_

    - **Field 7: Logo Upload**
        - `Label: Tenant Logo`
        - A file upload component.
        - Shows a preview of the current logo if it exists.
        - _Component: Custom file input component._

- **Card Footer:**
    - **Layout:** Flexbox with `justify-content: flex-end` (push buttons to the right).
    - **Actions:**
        - `<button class="btn-secondary">Cancel</button>`
            - _Component: `Button` (Secondary Style)_
            - Action: Navigates back to the tenant list page without saving.
        - `<button class="btn-primary">Save Changes</button>`
            - _Component: `Button` (Primary Style)_
            - Action: Submits the form.

---

ตอนนี้ Mockup สำหรับส่วน Tenant Management ทั้งหน้า List และ Detail/Edit ก็เสร็จสมบูรณ์แล้วครับ

ขั้นตอนต่อไป: **Mockup for Analytics Page**.